
import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useToast } from "@/components/ui/use-toast";
import AuthLayout from '@/components/layout/AuthLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/context/AuthContext';

const Login = () => {
  const { login, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Check if redirected from another page
  const from = location.state?.from?.pathname || '/dashboard';

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await login(email, password);
      toast({
        title: "تم تسجيل الدخول بنجاح",
        description: "مرحباً بك في منصة موتوبي",
      });
      // Navigate to dashboard or original destination
      navigate(from, { replace: true });
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

  return (
    <AuthLayout>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">البريد الإلكتروني</Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="ltr text-left"
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">كلمة المرور</Label>
              <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                نسيت كلمة المرور؟
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="ltr text-left"
            />
          </div>
        </div>
        
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
        </Button>
        
        <div className="text-center text-sm">
          ليس لديك حساب؟{" "}
          <Link to="/register" className="text-primary hover:underline">
            سجل الآن
          </Link>
        </div>
      </form>

      <div className="mt-8 text-center text-sm text-muted-foreground">
        <div className="flex flex-col gap-1 border-t pt-4">
          <p>يمكنك تسجيل حساب جديد والبدء في استخدام النظام</p>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Login;
