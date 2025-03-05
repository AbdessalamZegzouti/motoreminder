
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
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
import { Search, CreditCard, Plus, Check, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/components/ui/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Payments = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [openDialog, setOpenDialog] = useState(false);

  // Mock data for payments
  const [payments, setPayments] = useState([
    { id: 1, client: 'عبدالله أحمد', amount: 500, date: '2024-04-01', status: 'مكتمل' },
    { id: 2, client: 'محمد خالد', amount: 750, date: '2024-04-02', status: 'مكتمل' },
    { id: 3, client: 'فهد سعيد', amount: 600, date: '2024-04-05', status: 'معلق' },
    { id: 4, client: 'سلطان عبدالعزيز', amount: 800, date: '2024-04-07', status: 'معلق' },
    { id: 5, client: 'نايف سلمان', amount: 550, date: '2024-04-10', status: 'مكتمل' },
    { id: 6, client: 'سعد محمد', amount: 700, date: '2024-04-12', status: 'مكتمل' },
  ]);

  // Mock client list for payment form
  const clients = [
    { id: 1, name: 'عبدالله أحمد' },
    { id: 2, name: 'محمد خالد' },
    { id: 3, name: 'فهد سعيد' },
    { id: 4, name: 'سلطان عبدالعزيز' },
    { id: 5, name: 'نايف سلمان' },
    { id: 6, name: 'سعد محمد' },
  ];

  const [formData, setFormData] = useState({
    client: '',
    amount: '',
    date: '',
    status: 'معلق'
  });

  const filteredPayments = payments.filter(payment => 
    payment.client.includes(searchQuery) || 
    payment.amount.toString().includes(searchQuery) ||
    payment.date.includes(searchQuery)
  );

  const pendingPayments = payments.filter(payment => payment.status === 'معلق');
  const completedPayments = payments.filter(payment => payment.status === 'مكتمل');

  const totalAmount = payments.reduce((sum, payment) => {
    if (payment.status === 'مكتمل') {
      return sum + payment.amount;
    }
    return sum;
  }, 0);

  const handleAddPayment = () => {
    if (!formData.client || !formData.amount || !formData.date) {
      toast({
        title: "خطأ",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive"
      });
      return;
    }

    const newPayment = {
      id: payments.length + 1,
      client: formData.client,
      amount: Number(formData.amount),
      date: formData.date,
      status: formData.status
    };

    setPayments([...payments, newPayment]);
    setFormData({ client: '', amount: '', date: '', status: 'معلق' });
    setOpenDialog(false);
    
    toast({
      title: "تم إضافة الدفعة",
      description: `تم إضافة دفعة بقيمة ${formData.amount} ريال`
    });
  };

  const approvePayment = (id: number) => {
    setPayments(payments.map(payment => 
      payment.id === id ? { ...payment, status: 'مكتمل' } : payment
    ));
    
    toast({
      title: "تم تأكيد الدفعة",
      description: "تم تأكيد الدفعة بنجاح"
    });
  };

  const rejectPayment = (id: number) => {
    setPayments(payments.filter(payment => payment.id !== id));
    
    toast({
      title: "تم رفض الدفعة",
      description: "تم رفض الدفعة وحذفها من النظام"
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">المدفوعات</h2>
          <p className="text-muted-foreground mt-1">
            إدارة مدفوعات العملاء والإيرادات
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative">
            <Search className="absolute right-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="بحث في المدفوعات..."
              className="pl-8 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="ml-2 h-4 w-4" />
                إضافة دفعة جديدة
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>إضافة دفعة جديدة</DialogTitle>
                <DialogDescription>
                  أدخل بيانات الدفعة الجديدة، ثم اضغط إضافة
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="client">اسم العميل</Label>
                  <Select onValueChange={(value) => setFormData({...formData, client: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر العميل" />
                    </SelectTrigger>
                    <SelectContent>
                      {clients.map((client) => (
                        <SelectItem key={client.id} value={client.name}>
                          {client.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="amount">المبلغ (ريال)</Label>
                  <Input 
                    id="amount" 
                    placeholder="أدخل المبلغ" 
                    type="number"
                    value={formData.amount}
                    onChange={(e) => setFormData({...formData, amount: e.target.value})}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="date">تاريخ الدفعة</Label>
                  <Input 
                    id="date" 
                    type="date" 
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="status">الحالة</Label>
                  <Select 
                    defaultValue={formData.status}
                    onValueChange={(value) => setFormData({...formData, status: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="اختر الحالة" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="مكتمل">مكتمل</SelectItem>
                      <SelectItem value="معلق">معلق</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpenDialog(false)}>إلغاء</Button>
                <Button onClick={handleAddPayment}>إضافة</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">إجمالي المدفوعات</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalAmount} ريال</div>
            <p className="text-xs text-muted-foreground mt-1">
              من {completedPayments.length} دفعة مكتملة
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">الدفعات المعلقة</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingPayments.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              تنتظر التأكيد
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">متوسط قيمة الدفعة</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {payments.length > 0 
                ? Math.round(totalAmount / completedPayments.length) 
                : 0} ريال
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              لكل دفعة مكتملة
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="all">جميع المدفوعات</TabsTrigger>
          <TabsTrigger value="pending">المدفوعات المعلقة</TabsTrigger>
          <TabsTrigger value="completed">المدفوعات المكتملة</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all">
          <Card>
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>العميل</TableHead>
                    <TableHead>المبلغ</TableHead>
                    <TableHead>التاريخ</TableHead>
                    <TableHead>الحالة</TableHead>
                    <TableHead>إجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPayments.length > 0 ? (
                    filteredPayments.map((payment) => (
                      <TableRow key={payment.id}>
                        <TableCell className="font-medium">{payment.client}</TableCell>
                        <TableCell>{payment.amount} ريال</TableCell>
                        <TableCell>{payment.date}</TableCell>
                        <TableCell>
                          <Badge variant={payment.status === 'مكتمل' ? 'outline' : 'secondary'}>
                            {payment.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            {payment.status === 'معلق' && (
                              <>
                                <Button variant="ghost" size="icon" onClick={() => approvePayment(payment.id)}>
                                  <Check className="h-4 w-4 text-green-500" />
                                </Button>
                                <Button variant="ghost" size="icon" onClick={() => rejectPayment(payment.id)}>
                                  <X className="h-4 w-4 text-red-500" />
                                </Button>
                              </>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-4">
                        لا توجد مدفوعات مطابقة لبحثك
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="pending">
          <Card>
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>العميل</TableHead>
                    <TableHead>المبلغ</TableHead>
                    <TableHead>التاريخ</TableHead>
                    <TableHead>إجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendingPayments.length > 0 ? (
                    pendingPayments.map((payment) => (
                      <TableRow key={payment.id}>
                        <TableCell className="font-medium">{payment.client}</TableCell>
                        <TableCell>{payment.amount} ريال</TableCell>
                        <TableCell>{payment.date}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="icon" onClick={() => approvePayment(payment.id)}>
                              <Check className="h-4 w-4 text-green-500" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => rejectPayment(payment.id)}>
                              <X className="h-4 w-4 text-red-500" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-4">
                        لا توجد مدفوعات معلقة
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="completed">
          <Card>
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>العميل</TableHead>
                    <TableHead>المبلغ</TableHead>
                    <TableHead>التاريخ</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {completedPayments.length > 0 ? (
                    completedPayments.map((payment) => (
                      <TableRow key={payment.id}>
                        <TableCell className="font-medium">{payment.client}</TableCell>
                        <TableCell>{payment.amount} ريال</TableCell>
                        <TableCell>{payment.date}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={3} className="text-center py-4">
                        لا توجد مدفوعات مكتملة
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

export default Payments;
