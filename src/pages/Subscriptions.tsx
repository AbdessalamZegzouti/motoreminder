
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Search, CreditCard, Plus, Check, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/components/ui/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/context/AuthContext';

const Subscriptions = () => {
  const { user } = useAuth();
  const isSuperAdmin = user?.role === 'super-admin';
  const [searchQuery, setSearchQuery] = useState('');
  const [openDialog, setOpenDialog] = useState(false);

  // Mock data for subscription plans
  const [plans, setPlans] = useState([
    { id: 1, name: 'باقة شهرية', price: 299, duration: 30, maxClients: 50, isActive: true },
    { id: 2, name: 'باقة سنوية', price: 2999, duration: 365, maxClients: 500, isActive: true },
    { id: 3, name: 'باقة للشركات', price: 5999, duration: 365, maxClients: -1, isActive: true },
  ]);

  // Mock data for subscription requests
  const [requests, setRequests] = useState([
    { id: 1, agency: 'الصقر للدراجات', plan: 'باقة شهرية', requestDate: '2024-04-02', status: 'معلق' },
    { id: 2, name: 'الأمير للدراجات', plan: 'باقة سنوية', requestDate: '2024-04-05', status: 'معلق' },
    { id: 3, name: 'النجم الأزرق', plan: 'باقة شهرية', requestDate: '2024-04-10', status: 'معلق' },
  ]);

  // Mock data for active subscriptions
  const [subscriptions, setSubscriptions] = useState([
    { id: 1, agency: 'الفارس للدراجات', plan: 'باقة شهرية', startDate: '2024-03-15', endDate: '2024-04-15', status: 'نشط' },
    { id: 2, agency: 'النجمة الذهبية', plan: 'باقة سنوية', startDate: '2023-06-01', endDate: '2024-06-01', status: 'نشط' },
    { id: 3, agency: 'المستقبل', plan: 'باقة شهرية', startDate: '2024-03-20', endDate: '2024-04-20', status: 'نشط' },
    { id: 4, agency: 'الأصيل للدراجات', plan: 'باقة للشركات', startDate: '2023-07-10', endDate: '2024-07-10', status: 'نشط' },
  ]);

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    duration: '',
    maxClients: ''
  });

  const filteredRequests = requests.filter(request => 
    request.agency?.includes(searchQuery) || 
    request.plan.includes(searchQuery)
  );

  const filteredSubscriptions = subscriptions.filter(subscription => 
    subscription.agency.includes(searchQuery) || 
    subscription.plan.includes(searchQuery)
  );

  const handleAddPlan = () => {
    if (!formData.name || !formData.price || !formData.duration || !formData.maxClients) {
      toast({
        title: "خطأ",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive"
      });
      return;
    }

    const newPlan = {
      id: plans.length + 1,
      name: formData.name,
      price: Number(formData.price),
      duration: Number(formData.duration),
      maxClients: Number(formData.maxClients),
      isActive: true
    };

    setPlans([...plans, newPlan]);
    setFormData({ name: '', price: '', duration: '', maxClients: '' });
    setOpenDialog(false);
    
    toast({
      title: "تم إضافة الباقة",
      description: `تم إضافة باقة ${formData.name} بنجاح`
    });
  };

  const approveRequest = (id: number) => {
    const request = requests.find(req => req.id === id);
    
    if (request) {
      // Remove from requests
      setRequests(requests.filter(req => req.id !== id));
      
      // Add to active subscriptions
      const startDate = new Date().toISOString().split('T')[0];
      const endDate = new Date();
      const plan = plans.find(p => p.name === request.plan);
      
      if (plan) {
        endDate.setDate(endDate.getDate() + plan.duration);
      } else {
        endDate.setDate(endDate.getDate() + 30); // Default to 30 days if plan not found
      }
      
      const newSubscription = {
        id: subscriptions.length + 1,
        agency: request.agency || 'وكالة جديدة',
        plan: request.plan,
        startDate: startDate,
        endDate: endDate.toISOString().split('T')[0],
        status: 'نشط'
      };
      
      setSubscriptions([...subscriptions, newSubscription]);
      
      toast({
        title: "تم تفعيل الاشتراك",
        description: `تم تفعيل اشتراك ${request.agency} بنجاح`
      });
    }
  };

  if (!isSuperAdmin) {
    return (
      <div className="flex items-center justify-center min-h-[40vh]">
        <p className="text-xl">لا يمكنك الوصول إلى هذه الصفحة</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">الاشتراكات</h2>
          <p className="text-muted-foreground mt-1">
            إدارة باقات واشتراكات الوكالات
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative">
            <Search className="absolute right-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="بحث..."
              className="pl-8 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="ml-2 h-4 w-4" />
                إضافة باقة جديدة
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>إضافة باقة جديدة</DialogTitle>
                <DialogDescription>
                  أدخل بيانات الباقة الجديدة، ثم اضغط إضافة
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">اسم الباقة</Label>
                  <Input 
                    id="name" 
                    placeholder="اسم الباقة" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="price">السعر (ريال)</Label>
                  <Input 
                    id="price" 
                    type="number"
                    placeholder="299" 
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="duration">المدة (بالأيام)</Label>
                  <Input 
                    id="duration" 
                    type="number"
                    placeholder="30" 
                    value={formData.duration}
                    onChange={(e) => setFormData({...formData, duration: e.target.value})}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="maxClients">الحد الأقصى للعملاء</Label>
                  <Input 
                    id="maxClients" 
                    type="number"
                    placeholder="50 (أدخل -1 لعدد غير محدود)" 
                    value={formData.maxClients}
                    onChange={(e) => setFormData({...formData, maxClients: e.target.value})}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpenDialog(false)}>إلغاء</Button>
                <Button onClick={handleAddPlan}>إضافة</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs defaultValue="plans" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="plans">الباقات</TabsTrigger>
          <TabsTrigger value="requests">طلبات الاشتراك</TabsTrigger>
          <TabsTrigger value="active">الاشتراكات النشطة</TabsTrigger>
        </TabsList>
        
        <TabsContent value="plans">
          <Card>
            <CardHeader>
              <CardTitle>الباقات المتاحة</CardTitle>
              <CardDescription>
                جميع باقات الاشتراك المتاحة في النظام
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>اسم الباقة</TableHead>
                    <TableHead>السعر</TableHead>
                    <TableHead>المدة</TableHead>
                    <TableHead>الحد الأقصى للعملاء</TableHead>
                    <TableHead>الحالة</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {plans.map((plan) => (
                    <TableRow key={plan.id}>
                      <TableCell className="font-medium">{plan.name}</TableCell>
                      <TableCell>{plan.price} ريال</TableCell>
                      <TableCell>
                        {plan.duration === 30 && 'شهر واحد'}
                        {plan.duration === 90 && '3 أشهر'}
                        {plan.duration === 180 && '6 أشهر'}
                        {plan.duration === 365 && 'سنة كاملة'}
                        {![30, 90, 180, 365].includes(plan.duration) && `${plan.duration} يوم`}
                      </TableCell>
                      <TableCell>
                        {plan.maxClients === -1 ? 'غير محدود' : plan.maxClients}
                      </TableCell>
                      <TableCell>
                        <Badge variant={plan.isActive ? 'outline' : 'secondary'}>
                          {plan.isActive ? 'نشطة' : 'معطلة'}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="requests">
          <Card>
            <CardHeader>
              <CardTitle>طلبات الاشتراك</CardTitle>
              <CardDescription>
                طلبات الاشتراكات الجديدة أو تجديد الاشتراكات
              </CardDescription>
            </CardHeader>
            <CardContent>
              {filteredRequests.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>اسم الوكالة</TableHead>
                      <TableHead>الباقة</TableHead>
                      <TableHead>تاريخ الطلب</TableHead>
                      <TableHead>إجراءات</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredRequests.map((request) => (
                      <TableRow key={request.id}>
                        <TableCell className="font-medium">{request.agency}</TableCell>
                        <TableCell>{request.plan}</TableCell>
                        <TableCell>{request.requestDate}</TableCell>
                        <TableCell>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => approveRequest(request.id)}
                          >
                            <Check className="ml-2 h-4 w-4" />
                            تفعيل
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  لا توجد طلبات اشتراك معلقة
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="active">
          <Card>
            <CardHeader>
              <CardTitle>الاشتراكات النشطة</CardTitle>
              <CardDescription>
                جميع الاشتراكات النشطة للوكالات
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>اسم الوكالة</TableHead>
                    <TableHead>الباقة</TableHead>
                    <TableHead>تاريخ البدء</TableHead>
                    <TableHead>تاريخ الانتهاء</TableHead>
                    <TableHead>الحالة</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSubscriptions.length > 0 ? (
                    filteredSubscriptions.map((subscription) => (
                      <TableRow key={subscription.id}>
                        <TableCell className="font-medium">{subscription.agency}</TableCell>
                        <TableCell>{subscription.plan}</TableCell>
                        <TableCell>{subscription.startDate}</TableCell>
                        <TableCell>{subscription.endDate}</TableCell>
                        <TableCell>
                          <Badge className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {subscription.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-4">
                        لا توجد اشتراكات مطابقة لبحثك
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Subscriptions;
