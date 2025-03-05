
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
import { Label } from '@/components/ui/label';
import { Search, Building, Plus, Check, X, UserCog } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { toast } from '@/components/ui/use-toast';
import { useAuth } from '@/context/AuthContext';

const Agencies = () => {
  const { user } = useAuth();
  const isSuperAdmin = user?.role === 'super-admin';
  const [searchQuery, setSearchQuery] = useState('');
  const [openDialog, setOpenDialog] = useState(false);

  // Mock data for agencies
  const [agencies, setAgencies] = useState([
    { id: 1, name: 'الفارس للدراجات', owner: 'أحمد محمد', email: 'ahmed@alfarismoto.com', status: 'نشط', clients: 24, subscriptionEnd: '2024-05-15' },
    { id: 2, name: 'النجمة الذهبية', owner: 'خالد عبدالله', email: 'khalid@goldenstarmoto.com', status: 'نشط', clients: 18, subscriptionEnd: '2024-06-01' },
    { id: 3, name: 'الصقر للدراجات', owner: 'سعيد ناصر', email: 'saeed@saqrmoto.com', status: 'معلق', clients: 0, subscriptionEnd: 'غير نشط' },
    { id: 4, name: 'المستقبل', owner: 'فهد سعد', email: 'fahad@futuremoto.com', status: 'نشط', clients: 12, subscriptionEnd: '2024-05-20' },
    { id: 5, name: 'الأصيل للدراجات', owner: 'عبدالرحمن محمد', email: 'abdulrahman@alaseelmoto.com', status: 'نشط', clients: 31, subscriptionEnd: '2024-07-10' },
  ]);

  const [formData, setFormData] = useState({
    name: '',
    owner: '',
    email: '',
    status: 'معلق'
  });

  const filteredAgencies = agencies.filter(agency => 
    agency.name.includes(searchQuery) || 
    agency.owner.includes(searchQuery) ||
    agency.email.includes(searchQuery)
  );

  const activeAgencies = agencies.filter(agency => agency.status === 'نشط').length;
  const pendingAgencies = agencies.filter(agency => agency.status === 'معلق').length;

  const handleAddAgency = () => {
    if (!formData.name || !formData.owner || !formData.email) {
      toast({
        title: "خطأ",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive"
      });
      return;
    }

    const newAgency = {
      id: agencies.length + 1,
      name: formData.name,
      owner: formData.owner,
      email: formData.email,
      status: formData.status,
      clients: 0,
      subscriptionEnd: formData.status === 'نشط' ? '2024-05-30' : 'غير نشط'
    };

    setAgencies([...agencies, newAgency]);
    setFormData({ name: '', owner: '', email: '', status: 'معلق' });
    setOpenDialog(false);
    
    toast({
      title: "تم إضافة الوكالة",
      description: `تم إضافة وكالة ${formData.name} بنجاح`
    });
  };

  const toggleAgencyStatus = (id: number) => {
    setAgencies(agencies.map(agency => {
      if (agency.id === id) {
        const newStatus = agency.status === 'نشط' ? 'معلق' : 'نشط';
        const newSubscriptionEnd = newStatus === 'نشط' ? '2024-06-30' : 'غير نشط';
        
        return { 
          ...agency, 
          status: newStatus,
          subscriptionEnd: newSubscriptionEnd
        };
      }
      return agency;
    }));
    
    const agency = agencies.find(a => a.id === id);
    const newStatus = agency?.status === 'نشط' ? 'تعليق' : 'تفعيل';
    
    toast({
      title: `تم ${newStatus} الوكالة`,
      description: `تم ${newStatus} وكالة ${agency?.name} بنجاح`
    });
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
          <h2 className="text-3xl font-bold tracking-tight">الوكالات</h2>
          <p className="text-muted-foreground mt-1">
            إدارة الوكالات المسجلة في النظام
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative">
            <Search className="absolute right-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="بحث عن وكالة..."
              className="pl-8 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="ml-2 h-4 w-4" />
                إضافة وكالة جديدة
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>إضافة وكالة جديدة</DialogTitle>
                <DialogDescription>
                  أدخل بيانات الوكالة الجديدة، ثم اضغط إضافة
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">اسم الوكالة</Label>
                  <Input 
                    id="name" 
                    placeholder="أدخل اسم الوكالة" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="owner">اسم المالك</Label>
                  <Input 
                    id="owner" 
                    placeholder="أدخل اسم المالك" 
                    value={formData.owner}
                    onChange={(e) => setFormData({...formData, owner: e.target.value})}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">البريد الإلكتروني</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="example@domain.com" 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Label htmlFor="status">تفعيل الوكالة</Label>
                  <Switch 
                    id="status" 
                    checked={formData.status === 'نشط'}
                    onCheckedChange={(checked) => setFormData({...formData, status: checked ? 'نشط' : 'معلق'})}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpenDialog(false)}>إلغاء</Button>
                <Button onClick={handleAddAgency}>إضافة</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">إجمالي الوكالات</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{agencies.length}</div>
            <div className="flex items-center gap-1 mt-1">
              <span className="text-xs text-muted-foreground">
                نشط: <Badge variant="outline" className="text-xs">{activeAgencies}</Badge>
              </span>
              <span className="text-xs text-muted-foreground">
                معلق: <Badge variant="outline" className="text-xs">{pendingAgencies}</Badge>
              </span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">إجمالي العملاء</CardTitle>
            <UserCog className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {agencies.reduce((sum, agency) => sum + agency.clients, 0)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              في جميع الوكالات النشطة
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">متوسط العملاء</CardTitle>
            <UserCog className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {activeAgencies > 0 
                ? Math.round(agencies.reduce((sum, agency) => sum + agency.clients, 0) / activeAgencies)
                : 0}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              لكل وكالة نشطة
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>قائمة الوكالات</CardTitle>
          <CardDescription>
            جميع الوكالات المسجلة في النظام
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>اسم الوكالة</TableHead>
                <TableHead>المالك</TableHead>
                <TableHead>البريد الإلكتروني</TableHead>
                <TableHead>الحالة</TableHead>
                <TableHead>العملاء</TableHead>
                <TableHead>انتهاء الاشتراك</TableHead>
                <TableHead>إجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAgencies.length > 0 ? (
                filteredAgencies.map((agency) => (
                  <TableRow key={agency.id}>
                    <TableCell className="font-medium">{agency.name}</TableCell>
                    <TableCell>{agency.owner}</TableCell>
                    <TableCell>{agency.email}</TableCell>
                    <TableCell>
                      <Badge variant={agency.status === 'نشط' ? 'outline' : 'secondary'}>
                        {agency.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{agency.clients}</TableCell>
                    <TableCell>{agency.subscriptionEnd}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Switch 
                          checked={agency.status === 'نشط'}
                          onCheckedChange={() => toggleAgencyStatus(agency.id)}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-4">
                    لا توجد وكالات مطابقة لبحثك
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Agencies;
