
import React from 'react';
import { 
  User, 
  CreditCard, 
  ArrowDown, 
  ArrowUp, 
  Users, 
  Calendar, 
  ChevronLeft
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

const Dashboard = () => {
  const { user } = useAuth();
  const isAgency = user?.role === 'agency';
  const isSuperAdmin = user?.role === 'super-admin';

  // Mock data for agency dashboard
  const agencyStats = {
    totalClients: 24,
    activeReminders: 8,
    pendingPayments: 12,
    completedPayments: 42,
    subscriptionStatus: 'نشط',
    subscriptionEnds: '15 مايو 2024',
    recentClients: [
      { id: 1, name: 'عبدالله أحمد', phone: '0512345678', nextPayment: '2024-04-12', status: 'متأخر' },
      { id: 2, name: 'محمد خالد', phone: '0523456789', nextPayment: '2024-04-18', status: 'نشط' },
      { id: 3, name: 'فهد سعيد', phone: '0534567890', nextPayment: '2024-04-20', status: 'نشط' },
      { id: 4, name: 'سلطان عبدالعزيز', phone: '0545678901', nextPayment: '2024-04-10', status: 'متأخر' },
    ],
    recentPayments: [
      { id: 1, client: 'عبدالله أحمد', amount: 500, date: '2024-04-01', status: 'مكتمل' },
      { id: 2, name: 'محمد خالد', amount: 750, date: '2024-04-02', status: 'مكتمل' },
      { id: 3, name: 'عمر ياسر', amount: 600, date: '2024-04-05', status: 'مكتمل' },
    ]
  };

  // Mock data for super admin dashboard
  const adminStats = {
    totalAgencies: 8,
    activeAgencies: 6,
    pendingAgencies: 2,
    totalRevenue: 4500,
    pendingSubscriptions: 3,
    recentAgencies: [
      { id: 1, name: 'الفارس للدراجات', status: 'نشط', subscriptionEnd: '2024-05-15' },
      { id: 2, name: 'النجمة الذهبية', status: 'نشط', subscriptionEnd: '2024-06-02' },
      { id: 3, name: 'الصقر للدراجات', status: 'معلق', subscriptionEnd: 'غير نشط' },
    ]
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">مرحباً، {user?.name}!</h2>
          <p className="text-muted-foreground mt-1">
            {isAgency 
              ? `هذه لوحة معلومات ${user?.agencyName}`
              : 'هذه لوحة معلومات المشرف'}
          </p>
        </div>
        
        {isAgency && (
          <div className="flex flex-col sm:flex-row gap-2">
            <Button variant="outline">
              <Calendar className="ml-2 h-4 w-4" />
              استعراض التقويم
            </Button>
            <Button>
              <User className="ml-2 h-4 w-4" />
              إضافة عميل جديد
            </Button>
          </div>
        )}
        
        {isSuperAdmin && (
          <div className="flex flex-col sm:flex-row gap-2">
            <Button variant="outline">
              <Calendar className="ml-2 h-4 w-4" />
              تصدير التقرير
            </Button>
            <Button>
              تفعيل الاشتراكات
              <ChevronLeft className="mr-2 h-4 w-4" />
            </Button>
          </div>
        )}
      </div>

      {/* Stats Cards */}
      {isAgency && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="hover-scale">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">إجمالي العملاء</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{agencyStats.totalClients}</div>
              <p className="text-xs text-muted-foreground mt-1">
                +2 منذ الشهر الماضي
              </p>
            </CardContent>
          </Card>
          
          <Card className="hover-scale">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">التذكيرات النشطة</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{agencyStats.activeReminders}</div>
              <p className="text-xs text-muted-foreground mt-1">
                للأسبوع القادم
              </p>
            </CardContent>
          </Card>
          
          <Card className="hover-scale">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">المدفوعات المعلقة</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{agencyStats.pendingPayments}</div>
              <p className="text-xs text-muted-foreground mt-1">
                <span className="text-destructive inline-flex items-center">
                  <ArrowUp className="ml-1 h-3 w-3" />
                  +4
                </span>{" "}
                منذ الأسبوع الماضي
              </p>
            </CardContent>
          </Card>
          
          <Card className="hover-scale">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">المدفوعات المكتملة</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{agencyStats.completedPayments}</div>
              <p className="text-xs text-muted-foreground mt-1">
                <span className="text-primary inline-flex items-center">
                  <ArrowUp className="ml-1 h-3 w-3" />
                  +12
                </span>{" "}
                منذ الشهر الماضي
              </p>
            </CardContent>
          </Card>
        </div>
      )}
      
      {isSuperAdmin && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="hover-scale">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">إجمالي الوكالات</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{adminStats.totalAgencies}</div>
              <div className="flex items-center gap-1 mt-1">
                <span className="text-xs text-muted-foreground">
                  نشط: <Badge variant="outline" className="text-xs">{adminStats.activeAgencies}</Badge>
                </span>
                <span className="text-xs text-muted-foreground">
                  معلق: <Badge variant="outline" className="text-xs">{adminStats.pendingAgencies}</Badge>
                </span>
              </div>
            </CardContent>
          </Card>
          
          <Card className="hover-scale">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">طلبات الاشتراك</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{adminStats.pendingSubscriptions}</div>
              <p className="text-xs text-muted-foreground mt-1">
                تنتظر المراجعة
              </p>
            </CardContent>
          </Card>
          
          <Card className="hover-scale">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">إجمالي الإيرادات</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{adminStats.totalRevenue} ريال</div>
              <p className="text-xs text-muted-foreground mt-1">
                <span className="text-primary inline-flex items-center">
                  <ArrowUp className="ml-1 h-3 w-3" />
                  +15%
                </span>{" "}
                منذ الشهر الماضي
              </p>
            </CardContent>
          </Card>
          
          <Card className="hover-scale">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">معدل النمو</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+24%</div>
              <Progress value={24} className="h-2 mt-2" />
            </CardContent>
          </Card>
        </div>
      )}

      {/* Recent Clients & Payments for Agency */}
      {isAgency && (
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>العملاء الأخيرون</CardTitle>
              <CardDescription>
                آخر 4 عملاء مضافين إلى النظام
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {agencyStats.recentClients.map((client) => (
                  <div key={client.id} className="flex items-center justify-between border-b pb-2">
                    <div>
                      <p className="font-medium">{client.name}</p>
                      <p className="text-sm text-muted-foreground ltr">{client.phone}</p>
                    </div>
                    <div className="text-left">
                      <Badge 
                        variant={client.status === 'نشط' ? 'outline' : 'destructive'}
                        className="mb-1 ltr"
                      >
                        {client.status}
                      </Badge>
                      <p className="text-xs text-muted-foreground ltr">{client.nextPayment}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="ghost" className="w-full mt-4">
                عرض كل العملاء
                <ChevronLeft className="mr-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
          
          <Card className="col-span-1">
            <CardHeader className="pb-3">
              <CardTitle>حالة الاشتراك</CardTitle>
              <CardDescription>
                تفاصيل اشتراكك الحالي
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="flex items-center gap-4 border rounded-lg p-4">
                <div className="bg-primary/20 p-2 rounded-full">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">الخطة الشهرية</p>
                  <p className="text-sm text-muted-foreground">
                    الحالة: <Badge variant="outline">{agencyStats.subscriptionStatus}</Badge>
                  </p>
                </div>
                <div className="text-left">
                  <p className="text-sm text-muted-foreground">ينتهي في</p>
                  <p className="font-medium">{agencyStats.subscriptionEnds}</p>
                </div>
              </div>

              <div className="grid gap-2">
                <div className="flex items-center justify-between text-sm">
                  <span>المستخدمين</span>
                  <span>1 من 1</span>
                </div>
                <Progress value={100} className="h-2" />
                
                <div className="flex items-center justify-between text-sm mt-2">
                  <span>العملاء</span>
                  <span>{agencyStats.totalClients} من 50</span>
                </div>
                <Progress value={agencyStats.totalClients * 2} className="h-2" />
                
                <div className="flex items-center justify-between text-sm mt-2">
                  <span>التذكيرات</span>
                  <span>غير محدود</span>
                </div>
                <Progress value={100} className="h-2" />
              </div>

              <Button>
                تجديد الاشتراك
                <ChevronLeft className="mr-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
      
      {/* Recent Agencies for Super Admin */}
      {isSuperAdmin && (
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="col-span-1 md:col-span-2">
            <CardHeader>
              <CardTitle>الوكالات الأخيرة</CardTitle>
              <CardDescription>
                آخر الوكالات المنضمة إلى النظام
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {adminStats.recentAgencies.map((agency) => (
                  <div key={agency.id} className="flex flex-col border rounded-lg p-4 hover-scale">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="font-semibold">{agency.name}</h3>
                      <Badge variant={agency.status === 'نشط' ? 'outline' : 'destructive'}>
                        {agency.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-auto pt-4 border-t">
                      ينتهي الاشتراك: {agency.subscriptionEnd}
                    </p>
                  </div>
                ))}
              </div>
              <Button variant="ghost" className="w-full mt-4">
                عرض كل الوكالات
                <ChevronLeft className="mr-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
