
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Search, Plus, Edit, Trash2, Phone } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/components/ui/use-toast';

const Clients = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [openDialog, setOpenDialog] = useState(false);

  // Mock data for clients
  const [clients, setClients] = useState([
    { id: 1, name: 'عبدالله أحمد', phone: '0512345678', status: 'نشط', nextPayment: '2024-04-15' },
    { id: 2, name: 'محمد خالد', phone: '0523456789', status: 'نشط', nextPayment: '2024-04-18' },
    { id: 3, name: 'فهد سعيد', phone: '0534567890', status: 'متأخر', nextPayment: '2024-04-05' },
    { id: 4, name: 'سلطان عبدالعزيز', phone: '0545678901', status: 'متأخر', nextPayment: '2024-04-02' },
    { id: 5, name: 'نايف سلمان', phone: '0556789012', status: 'نشط', nextPayment: '2024-04-25' },
    { id: 6, name: 'سعد محمد', phone: '0567890123', status: 'نشط', nextPayment: '2024-04-30' },
  ]);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    nextPayment: ''
  });

  const filteredClients = clients.filter(client => 
    client.name.includes(searchQuery) || client.phone.includes(searchQuery)
  );

  const handleAddClient = () => {
    if (!formData.name || !formData.phone || !formData.nextPayment) {
      toast({
        title: "خطأ",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive"
      });
      return;
    }

    const newClient = {
      id: clients.length + 1,
      name: formData.name,
      phone: formData.phone,
      status: 'نشط',
      nextPayment: formData.nextPayment
    };

    setClients([...clients, newClient]);
    setFormData({ name: '', phone: '', nextPayment: '' });
    setOpenDialog(false);
    
    toast({
      title: "تم إضافة العميل",
      description: `تم إضافة ${formData.name} بنجاح`
    });
  };

  const handleDeleteClient = (id: number) => {
    const clientToDelete = clients.find(client => client.id === id);
    setClients(clients.filter(client => client.id !== id));
    
    toast({
      title: "تم حذف العميل",
      description: `تم حذف ${clientToDelete?.name} بنجاح`
    });
  };

  const callClient = (phone: string) => {
    toast({
      title: "جاري الاتصال",
      description: `جاري الاتصال بالرقم ${phone}`
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">العملاء</h2>
          <p className="text-muted-foreground mt-1">
            إدارة عملاء الوكالة والمدفوعات
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative">
            <Search className="absolute right-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="بحث عن عميل..."
              className="pl-8 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="ml-2 h-4 w-4" />
                إضافة عميل جديد
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>إضافة عميل جديد</DialogTitle>
                <DialogDescription>
                  أدخل بيانات العميل الجديد، ثم اضغط إضافة
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">اسم العميل</Label>
                  <Input 
                    id="name" 
                    placeholder="أدخل اسم العميل" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone">رقم الهاتف</Label>
                  <Input 
                    id="phone" 
                    placeholder="05XXXXXXXX" 
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="nextPayment">تاريخ الدفعة القادمة</Label>
                  <Input 
                    id="nextPayment" 
                    type="date" 
                    value={formData.nextPayment}
                    onChange={(e) => setFormData({...formData, nextPayment: e.target.value})}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpenDialog(false)}>إلغاء</Button>
                <Button onClick={handleAddClient}>إضافة</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>قائمة العملاء</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>الاسم</TableHead>
                <TableHead>رقم الهاتف</TableHead>
                <TableHead>الحالة</TableHead>
                <TableHead>الدفعة القادمة</TableHead>
                <TableHead>إجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredClients.length > 0 ? (
                filteredClients.map((client) => (
                  <TableRow key={client.id}>
                    <TableCell className="font-medium">{client.name}</TableCell>
                    <TableCell>{client.phone}</TableCell>
                    <TableCell>
                      <Badge variant={client.status === 'نشط' ? 'outline' : 'destructive'}>
                        {client.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{client.nextPayment}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon" onClick={() => callClient(client.phone)}>
                          <Phone className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDeleteClient(client.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-4">
                    لا يوجد عملاء مطابقين لبحثك
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

export default Clients;
