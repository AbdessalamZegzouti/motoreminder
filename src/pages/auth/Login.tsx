
import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useToast } from "@/components/ui/use-toast";
import AuthLayout from '@/components/layout/AuthLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff, LogIn, Mail } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const Login = () => {
  const { login, isAuthenticated, isLoading: authLoading } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Check if redirected from another page
  const from = location.state?.from?.pathname || '/dashboard';

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      console.log("User is authenticated, redirecting to:", from);
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      console.log("Attempting login with:", email);
      await login(email, password);
      toast({
        title: "تم تسجيل الدخول بنجاح",
        description: "مرحباً بك في منصة موتوبي",
      });
      
      // The redirect will be handled by the useEffect above
      console.log("Login successful, redirect will happen via useEffect");
    } catch (error: any) {
      console.error("Login error:", error);
      toast({
        variant: "destructive",
        title: "فشل تسجيل الدخول",
        description: error.message || "بيانات الدخول غير صحيحة",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <AuthLayout>
      <div className="mb-6">
        <div className="h-16 w-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
          <LogIn className="h-8 w-8 text-primary" />
        </div>
        <h2 className="text-2xl font-bold text-center">تسجيل الدخول</h2>
        <p className="text-muted-foreground text-center mt-2">أدخل بياناتك للوصول إلى حسابك</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-base">البريد الإلكتروني</Label>
            <div className="relative">
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="ltr text-left pl-10 pr-4 transition-all duration-200 border-input hover:border-primary focus:border-primary"
              />
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="text-base">كلمة المرور</Label>
              <Link to="/forgot-password" className="text-sm text-primary hover:underline transition-colors">
                نسيت كلمة المرور؟
              </Link>
            </div>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="ltr text-left pr-10 transition-all duration-200 border-input hover:border-primary focus:border-primary"
              />
              <button 
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? 
                  <EyeOff className="h-5 w-5" /> : 
                  <Eye className="h-5 w-5" />
                }
              </button>
            </div>
          </div>
        </div>
        
        <Button 
          type="submit" 
          className="w-full relative overflow-hidden transition-all hover:scale-[1.02] active:scale-[0.98] h-11"
          disabled={isLoading}
        >
          {isLoading ? "جاري تسجيل الدخول..." : (
            <>
              تسجيل الدخول
              <LogIn className="mr-2 h-4 w-4" />
            </>
          )}
        </Button>
        
        <div className="text-center mt-6">
          <div className="text-sm">
            ليس لديك حساب؟{" "}
            <Link to="/register" className="text-primary font-medium hover:underline transition-colors">
              سجل الآن
            </Link>
          </div>
          
          <div className="mt-8 text-center text-sm text-muted-foreground border-t pt-6">
            <p>يمكنك تسجيل حساب جديد والبدء في استخدام النظام مباشرة</p>
          </div>
        </div>
      </form>
    </AuthLayout>
  );
};

export default Login;
