
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useToast } from "@/components/ui/use-toast";
import AuthLayout from '@/components/layout/AuthLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User, Mail, Eye, EyeOff, UserPlus, Store } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const Register = () => {
  const { register, isAuthenticated, isLoading: authLoading } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [agencyName, setAgencyName] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Redirect if already authenticated
  useEffect(() => {
    console.log("Register: Authentication state changed. isAuthenticated:", isAuthenticated);
    if (isAuthenticated) {
      console.log("User is authenticated, redirecting to dashboard");
      setTimeout(() => {
        navigate('/dashboard', { replace: true });
      }, 500); // Small delay to ensure state is updated
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast({
        variant: "destructive",
        title: "كلمة المرور غير متطابقة",
        description: "يرجى التأكد من تطابق كلمة المرور",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      console.log("Attempting registration with:", email);
      await register(agencyName, name, email, password);
      
      toast({
        title: "تم إنشاء الحساب بنجاح",
        description: "تم تسجيل الدخول تلقائياً",
      });
      
      // Redirect will happen in useEffect when isAuthenticated changes
      console.log("Registration successful, will be redirected via useEffect");
    } catch (error: any) {
      console.error("Registration error:", error);
      toast({
        variant: "destructive",
        title: "فشل إنشاء الحساب",
        description: error.message || "حدث خطأ أثناء إنشاء حسابك",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="mb-6">
        <div className="h-16 w-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
          <UserPlus className="h-8 w-8 text-primary" />
        </div>
        <h2 className="text-2xl font-bold text-center">إنشاء حساب جديد</h2>
        <p className="text-muted-foreground text-center mt-2">أدخل بياناتك لإنشاء حساب في منصة موتوبي</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="agencyName" className="text-base">اسم الوكالة</Label>
            <div className="relative">
              <Store className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                id="agencyName"
                type="text"
                placeholder="اسم وكالتك"
                value={agencyName}
                onChange={(e) => setAgencyName(e.target.value)}
                required
                className="text-right pr-10 transition-all duration-200 border-input hover:border-primary focus:border-primary"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="name" className="text-base">اسم المدير</Label>
            <div className="relative">
              <User className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                id="name"
                type="text"
                placeholder="اسمك الكامل"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="text-right pr-10 transition-all duration-200 border-input hover:border-primary focus:border-primary"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email" className="text-base">البريد الإلكتروني</Label>
            <div className="relative">
              <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="text-right pr-10 transition-all duration-200 border-input hover:border-primary focus:border-primary"
                dir="ltr"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password" className="text-base">كلمة المرور</Label>
            <div className="relative">
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                tabIndex={-1}
              >
                {showPassword ? 
                  <EyeOff className="h-5 w-5" /> : 
                  <Eye className="h-5 w-5" />
                }
              </button>
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="text-right pr-4 pl-10 transition-all duration-200 border-input hover:border-primary focus:border-primary"
                dir="ltr"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-base">تأكيد كلمة المرور</Label>
            <div className="relative">
              <button 
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                tabIndex={-1}
              >
                {showConfirmPassword ? 
                  <EyeOff className="h-5 w-5" /> : 
                  <Eye className="h-5 w-5" />
                }
              </button>
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="text-right pr-4 pl-10 transition-all duration-200 border-input hover:border-primary focus:border-primary"
                dir="ltr"
              />
            </div>
          </div>
        </div>
        
        <Button 
          type="submit" 
          className="w-full relative overflow-hidden transition-all hover:scale-[1.02] active:scale-[0.98] h-11 mt-2"
          disabled={isLoading}
        >
          {isLoading ? "جاري إنشاء الحساب..." : (
            <>
              <UserPlus className="ml-2 h-4 w-4" />
              إنشاء حساب
            </>
          )}
        </Button>
        
        <div className="text-center mt-4">
          <div className="text-sm">
            لديك حساب بالفعل؟{" "}
            <Link to="/login" className="text-primary font-medium hover:underline transition-colors">
              تسجيل الدخول
            </Link>
          </div>
        </div>
      </form>
    </AuthLayout>
  );
};

export default Register;
