import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/context/AuthContext';
import { 
  CreditCard, 
  MessageCircle, 
  Users, 
  Bell, 
  ArrowLeft, 
  CheckCircle, 
  ChevronLeft
} from 'lucide-react';

const LandingPage = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleStartNow = () => {
    if (isAuthenticated) {
      navigate('/dashboard');
    } else {
      navigate('/register');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link to="/" className="text-2xl font-bold">
              موتوبي
            </Link>
          </div>
          
          <nav className="hidden md:flex items-center gap-6">
            <Link to="#features" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
              المميزات
            </Link>
            <Link to="#pricing" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
              الأسعار
            </Link>
            <Link to="#faq" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
              الأسئلة الشائعة
            </Link>
          </nav>
          
          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <Button onClick={() => navigate('/dashboard')}>
                لوحة التحكم
              </Button>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost">تسجيل الدخول</Button>
                </Link>
                <Link to="/register">
                  <Button>سجل الآن</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 md:py-28 container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="space-y-6 animate-fade-in">
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
              👋 نظام إدارة مدفوعات متكامل
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              تذكير عملائك بمواعيد الدفع <span className="text-primary">أصبح أسهل</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              منصة موتوبي توفر لوكالات الدراجات النارية نظام سهل ومتكامل لإدارة مدفوعات العملاء وتذكيرهم بالمواعيد عبر واتساب
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="w-full sm:w-auto" onClick={handleStartNow}>
                ابدأ الآن مجاناً
                <ArrowLeft className="mr-2 h-4 w-4" />
              </Button>
              <Link to="#features">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  استكشف المميزات
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="relative rounded-lg border bg-background p-4 shadow-xl animate-fade-in">
            <div className="aspect-video overflow-hidden rounded-lg">
              <img 
                src="https://placehold.co/800x500/f5f5f5/a0a0a0?text=موتوبي+-+نظام+إدارة+المدفوعات" 
                alt="موتوبي لإدارة المدفوعات" 
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-muted">
        <div className="container">
          <div className="text-center max-w-[800px] mx-auto mb-16 animate-fade-in">
            <h2 className="text-3xl font-bold mb-4">مميزات نظام موتوبي</h2>
            <p className="text-xl text-muted-foreground">
              كل ما تحتاجه لإدارة مدفوعات عملائك في مكان واحد
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
            <div className="bg-background rounded-xl p-6 border shadow-sm hover-scale">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Users className="text-primary h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">إدارة العملاء</h3>
              <p className="text-muted-foreground">
                إضافة وتعديل ومتابعة بيانات جميع عملائك بسهولة تامة
              </p>
            </div>
            
            <div className="bg-background rounded-xl p-6 border shadow-sm hover-scale">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <MessageCircle className="text-primary h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">تذكيرات واتساب</h3>
              <p className="text-muted-foreground">
                إرسال تذكيرات آلية للعملاء عبر واتساب ويب بضغطة زر واحدة
              </p>
            </div>
            
            <div className="bg-background rounded-xl p-6 border shadow-sm hover-scale">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <CreditCard className="text-primary h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">تتبع المدفوعات</h3>
              <p className="text-muted-foreground">
                سجل دقيق لجميع المدفوعات ومواعيدها وحالتها (مسددة أو غير مسددة)
              </p>
            </div>
            
            <div className="bg-background rounded-xl p-6 border shadow-sm hover-scale">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Bell className="text-primary h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">إشعارات تلقائية</h3>
              <p className="text-muted-foreground">
                تلقي إشعارات فورية عن مواعيد الدفع المستحقة والمتأخرة
              </p>
            </div>
            
            <div className="bg-background rounded-xl p-6 border shadow-sm hover-scale">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <CheckCircle className="text-primary h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">سهولة الاستخدام</h3>
              <p className="text-muted-foreground">
                واجهة مستخدم بسيطة وسهلة الاستخدام بدون أي تعقيدات تقنية
              </p>
            </div>
            
            <div className="bg-background rounded-xl p-6 border shadow-sm hover-scale">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Users className="text-primary h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">خاص بكل وكالة</h3>
              <p className="text-muted-foreground">
                بيانات منفصلة لكل وكالة مع لوحة تحكم خاصة تضمن الخصوصية والأمان
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20">
        <div className="container">
          <div className="text-center max-w-[800px] mx-auto mb-16 animate-fade-in">
            <h2 className="text-3xl font-bold mb-4">أسعار بسيطة وشفافة</h2>
            <p className="text-xl text-muted-foreground">
              اختر الخطة المناسبة لاحتياجات وكالتك
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in">
            <div className="rounded-xl border bg-background shadow-sm hover-scale overflow-hidden">
              <div className="p-6 flex flex-col h-full">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-2xl font-bold">خطة شهرية</h3>
                  <Badge variant="outline">اشتراك شهري</Badge>
                </div>
                <div className="mb-6">
                  <span className="text-3xl font-bold">299</span> 
                  <span className="text-muted-foreground">ريال / شهرياً</span>
                </div>
                <ul className="space-y-2 mb-6 flex-1">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="text-primary h-5 w-5" />
                    <span>إدارة حتى 50 عميل</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="text-primary h-5 w-5" />
                    <span>تذكيرات واتساب غير محدودة</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="text-primary h-5 w-5" />
                    <span>تتبع المدفوعات</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="text-primary h-5 w-5" />
                    <span>لوحة تحكم خاصة</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="text-primary h-5 w-5" />
                    <span>دعم فني</span>
                  </li>
                </ul>
                <Button className="w-full" onClick={handleStartNow}>
                  ابدأ الآن
                  <ChevronLeft className="mr-2 h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="rounded-xl border bg-background shadow-sm hover-scale overflow-hidden relative lg:scale-105 z-10">
              <div className="absolute inset-x-0 top-0 h-2 bg-primary" />
              <div className="p-6 flex flex-col h-full">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-2xl font-bold">خطة سنوية</h3>
                  <Badge className="bg-primary">أفضل قيمة</Badge>
                </div>
                <div className="mb-6">
                  <div className="flex items-center gap-2">
                    <span className="text-3xl font-bold">2599</span> 
                    <span className="text-muted-foreground">ريال / سنوياً</span>
                  </div>
                  <div className="text-sm text-primary mt-1">وفّر 789 ريال</div>
                </div>
                <ul className="space-y-2 mb-6 flex-1">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="text-primary h-5 w-5" />
                    <span>إدارة حتى 100 عميل</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="text-primary h-5 w-5" />
                    <span>تذكيرات واتساب غير محدودة</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="text-primary h-5 w-5" />
                    <span>تتبع المدفوعات</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="text-primary h-5 w-5" />
                    <span>لوحة تحكم خاصة</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="text-primary h-5 w-5" />
                    <span>دعم فني ممتاز</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="text-primary h-5 w-5" />
                    <span>تقارير متقدمة</span>
                  </li>
                </ul>
                <Button className="w-full" onClick={handleStartNow}>
                  ابدأ الآن
                  <ChevronLeft className="mr-2 h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="rounded-xl border bg-background shadow-sm hover-scale overflow-hidden">
              <div className="p-6 flex flex-col h-full">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-2xl font-bold">خطة مخصصة</h3>
                  <Badge variant="outline">للوكالات الكبيرة</Badge>
                </div>
                <div className="mb-6">
                  <span className="text-3xl font-bold">تواصل معنا</span>
                </div>
                <ul className="space-y-2 mb-6 flex-1">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="text-primary h-5 w-5" />
                    <span>عدد عملاء غير محدود</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="text-primary h-5 w-5" />
                    <span>تذكيرات واتساب غير محدودة</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="text-primary h-5 w-5" />
                    <span>تتبع المدفوعات</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="text-primary h-5 w-5" />
                    <span>لوحة تحكم متقدمة</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="text-primary h-5 w-5" />
                    <span>دعم فني ممتاز ومخصص</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="text-primary h-5 w-5" />
                    <span>تدريب لفريق العمل</span>
                  </li>
                </ul>
                <Button className="w-full" variant="outline">
                  تواصل معنا
                  <ChevronLeft className="mr-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-muted">
        <div className="container">
          <div className="text-center max-w-[800px] mx-auto mb-16 animate-fade-in">
            <h2 className="text-3xl font-bold mb-4">الأسئلة الشائعة</h2>
            <p className="text-xl text-muted-foreground">
              إجابات لأكثر الأسئلة شيوعاً حول منصة موتوبي
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
            <div className="bg-background rounded-xl p-6 border shadow-sm">
              <h3 className="text-xl font-bold mb-2">ما هي منصة موتوبي؟</h3>
              <p className="text-muted-foreground">
                موتوبي هي منصة مخصصة لوكالات الدراجات النارية لإدارة مدفوعات العملاء وإرسال تذكيرات عبر واتساب لتنبيههم بمواعيد الدفع المستحقة.
              </p>
            </div>
            
            <div className="bg-background rounded-xl p-6 border shadow-sm">
              <h3 className="text-xl font-bold mb-2">كيف يعمل نظام التذكير؟</h3>
              <p className="text-muted-foreground">
                يتيح النظام للوكالة إرسال تذكيرات عبر واتساب ويب (وليس واتساب Cloud API) بضغطة زر واحدة. يجب على الوكالة تسجيل الدخول لواتساب ويب عبر النظام.
              </p>
            </div>
            
            <div className="bg-background rounded-xl p-6 border shadow-sm">
              <h3 className="text-xl font-bold mb-2">هل يمكنني تجربة المنصة قبل الاشتراك؟</h3>
              <p className="text-muted-foreground">
                نعم، يمكنك التواصل معنا للحصول على فترة تجريبية مجانية لمدة 7 أيام لاختبار جميع مميزات المنصة.
              </p>
            </div>
            
            <div className="bg-background rounded-xl p-6 border shadow-sm">
              <h3 className="text-xl font-bold mb-2">هل بياناتي آمنة على المنصة؟</h3>
              <p className="text-muted-foreground">
                نعم، نحن نضمن خصوصية وأمان بيانات وكالتك وعملائك بشكل كامل. كل وكالة لها بيانات منفصلة ولا يمكن لأي وكالة أخرى الاطلاع عليها.
              </p>
            </div>
            
            <div className="bg-background rounded-xl p-6 border shadow-sm">
              <h3 className="text-xl font-bold mb-2">كيف يتم الدفع؟</h3>
              <p className="text-muted-foreground">
                يتم الدفع نقداً، ويمكنك تحميل صورة إيصال الدفع على المنصة ليتم مراجعتها وتفعيل اشتراكك من قبل مشرف النظام.
              </p>
            </div>
            
            <div className="bg-background rounded-xl p-6 border shadow-sm">
              <h3 className="text-xl font-bold mb-2">هل يمكنني تغيير خطة الاشتراك؟</h3>
              <p className="text-muted-foreground">
                نعم، يمكنك الترقية أو تغيير خطة الاشتراك في أي وقت. عند الترقية، سيتم احتساب المبلغ المتبقي من اشتراكك الحالي.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Contact Section */}
      <section id="contact" className="py-20">
        <div className="container">
          <div className="text-center max-w-[800px] mx-auto mb-16 animate-fade-in">
            <h2 className="text-3xl font-bold mb-4">تواصل معنا</h2>
            <p className="text-xl text-muted-foreground">
              نحن هنا للإجابة على جميع استفساراتك
            </p>
          </div>
          
          <div className="bg-background rounded-xl p-8 border shadow-sm max-w-2xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4">معلومات الاتصال</h3>
                <div className="space-y-4">
                  <p className="flex items-center gap-2">
                    <span className="font-medium">البريد الإلكتروني:</span> 
                    <a href="mailto:info@motopay.com" className="text-primary hover:underline">info@motopay.com</a>
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="font-medium">الهاتف:</span> 
                    <a href="tel:+966501234567" className="text-primary hover:underline ltr">+966 50 123 4567</a>
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="font-medium">العنوان:</span> 
                    <span>الرياض، المملكة العربية السعودية</span>
                  </p>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-bold mb-4">ساعات العمل</h3>
                <div className="space-y-2">
                  <p className="flex justify-between">
                    <span>الأحد - الخميس</span>
                    <span className="ltr">9:00 AM - 5:00 PM</span>
                  </p>
                  <p className="flex justify-between">
                    <span>الجمعة</span>
                    <span className="ltr">مغلق</span>
                  </p>
                  <p className="flex justify-between">
                    <span>السبت</span>
                    <span className="ltr">10:00 AM - 2:00 PM</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-10 bg-background">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between gap-8">
            <div className="md:w-1/3">
              <h2 className="text-2xl font-bold mb-4">موتوبي</h2>
              <p className="text-muted-foreground mb-4">
                منصة متكاملة لإدارة مدفوعات العملاء وإرسال تذكيرات عبر واتساب لوكالات الدراجات النارية.
              </p>
              <div className="flex space-x-4">
                {/* Social Media Icons */}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">روابط سريعة</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="#features" className="text-muted-foreground hover:text-primary">
                    المميزات
                  </Link>
                </li>
                <li>
                  <Link to="#pricing" className="text-muted-foreground hover:text-primary">
                    الأسعار
                  </Link>
                </li>
                <li>
                  <Link to="#faq" className="text-muted-foreground hover:text-primary">
                    الأسئلة الشائعة
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">تواصل معنا</h3>
              <ul className="space-y-2">
                <li className="text-muted-foreground">
                  البريد الإلكتروني: info@motopay.com
                </li>
                <li className="text-muted-foreground">
                  الهاتف: +966 50 123 4567
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t mt-10 pt-6 text-center">
            <p className="text-muted-foreground">
              &copy; {new Date().getFullYear()} موتوبي. جميع الحقوق محفوظة.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
