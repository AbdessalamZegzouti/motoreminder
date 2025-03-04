
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { useAuth } from '@/context/AuthContext';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Settings = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Update the document title
    document.title = 'الإعدادات | موتوبي';
    
    // Redirect if not authenticated
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">الإعدادات</h2>
        <p className="text-muted-foreground mt-1">
          إدارة إعدادات حسابك والتفضيلات
        </p>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="profile">الملف الشخصي</TabsTrigger>
          <TabsTrigger value="notifications">الإشعارات</TabsTrigger>
          <TabsTrigger value="appearance">المظهر</TabsTrigger>
          {user?.role === 'agency' && (
            <TabsTrigger value="agency">الوكالة</TabsTrigger>
          )}
          {user?.role === 'super-admin' && (
            <TabsTrigger value="system">إعدادات النظام</TabsTrigger>
          )}
        </TabsList>
        
        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>الملف الشخصي</CardTitle>
              <CardDescription>
                تعديل معلومات الملف الشخصي
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">الاسم</Label>
                  <Input id="name" defaultValue={user?.name || ''} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">البريد الإلكتروني</Label>
                  <Input id="email" type="email" defaultValue={user?.email || ''} readOnly />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">رقم الهاتف</Label>
                <Input id="phone" placeholder="05XXXXXXXX" />
              </div>
              <Button>حفظ التغييرات</Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>تغيير كلمة المرور</CardTitle>
              <CardDescription>
                يمكنك تغيير كلمة المرور الخاصة بك هنا
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">كلمة المرور الحالية</Label>
                <Input id="current-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">كلمة المرور الجديدة</Label>
                <Input id="new-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">تأكيد كلمة المرور</Label>
                <Input id="confirm-password" type="password" />
              </div>
              <Button>تغيير كلمة المرور</Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>إعدادات الإشعارات</CardTitle>
              <CardDescription>
                تخصيص كيفية تلقي الإشعارات
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="notify-payments">إشعارات المدفوعات</Label>
                  <p className="text-sm text-muted-foreground">
                    تلقي إشعارات عند تسجيل مدفوعات جديدة
                  </p>
                </div>
                <Switch id="notify-payments" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="notify-reminders">إشعارات التذكيرات</Label>
                  <p className="text-sm text-muted-foreground">
                    تلقي إشعارات عند إرسال تذكيرات للعملاء
                  </p>
                </div>
                <Switch id="notify-reminders" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="notify-system">إشعارات النظام</Label>
                  <p className="text-sm text-muted-foreground">
                    تلقي إشعارات حول تحديثات النظام والصيانة
                  </p>
                </div>
                <Switch id="notify-system" defaultChecked />
              </div>
              <Button>حفظ التفضيلات</Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="appearance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>المظهر</CardTitle>
              <CardDescription>
                تخصيص مظهر التطبيق
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>الوضع</Label>
                <div className="grid grid-cols-3 gap-4">
                  <Button variant="outline" className="justify-start">
                    <span className="ml-2 h-4 w-4 rounded-full bg-background border"></span>
                    فاتح
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <span className="ml-2 h-4 w-4 rounded-full bg-slate-900"></span>
                    داكن
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <span className="ml-2 h-4 w-4 rounded-full bg-background border border-slate-900/50"></span>
                    تلقائي
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label>اللغة</Label>
                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" className="justify-start w-full">
                    العربية
                  </Button>
                  <Button variant="outline" className="justify-start w-full">
                    English
                  </Button>
                </div>
              </div>
              <Button>حفظ التفضيلات</Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        {user?.role === 'agency' && (
          <TabsContent value="agency" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>معلومات الوكالة</CardTitle>
                <CardDescription>
                  تعديل معلومات وكالتك
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="agency-name">اسم الوكالة</Label>
                  <Input id="agency-name" defaultValue={user?.agencyName || ''} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="agency-phone">رقم هاتف الوكالة</Label>
                  <Input id="agency-phone" placeholder="05XXXXXXXX" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="agency-address">عنوان الوكالة</Label>
                  <Input id="agency-address" placeholder="المدينة، الحي، الشارع" />
                </div>
                <Button>حفظ المعلومات</Button>
              </CardContent>
            </Card>
          </TabsContent>
        )}
        
        {user?.role === 'super-admin' && (
          <TabsContent value="system" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>إعدادات النظام</CardTitle>
                <CardDescription>
                  إدارة إعدادات النظام العامة
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="maintenance-mode">وضع الصيانة</Label>
                    <p className="text-sm text-muted-foreground">
                      تفعيل وضع الصيانة لمنع الوصول إلى النظام
                    </p>
                  </div>
                  <Switch id="maintenance-mode" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="new-registrations">التسجيلات الجديدة</Label>
                    <p className="text-sm text-muted-foreground">
                      السماح بتسجيل وكالات جديدة
                    </p>
                  </div>
                  <Switch id="new-registrations" defaultChecked />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="max-clients">الحد الأقصى للعملاء (للوكالة الواحدة)</Label>
                  <Input id="max-clients" type="number" defaultValue="50" />
                </div>
                <Button>حفظ الإعدادات</Button>
              </CardContent>
            </Card>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};

export default Settings;
