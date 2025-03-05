
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useToast } from "@/components/ui/use-toast";
import AuthLayout from '@/components/layout/AuthLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/context/AuthContext';

const Register = () => {
  const { register } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [agencyName, setAgencyName] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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
      await register(agencyName, name, email, password);
      toast({
        title: "تم إنشاء الحساب بنجاح",
        description: "تم تسجيل الدخول تلقائياً",
      });
      navigate('/dashboard');
    } catch (error: any) {
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
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="agencyName">اسم الوكالة</Label>
            <Input
              id="agencyName"
              type="text"
              placeholder="اسم وكالتك"
              value={agencyName}
              onChange={(e) => setAgencyName(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="name">اسم المدير</Label>
            <Input
              id="name"
              type="text"
              placeholder="اسمك الكامل"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          
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
            <Label htmlFor="password">كلمة المرور</Label>
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
          
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">تأكيد كلمة المرور</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="ltr text-left"
            />
          </div>
        </div>
        
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "جاري إنشاء الحساب..." : "إنشاء حساب"}
        </Button>
        
        <div className="text-center text-sm">
          لديك حساب بالفعل؟{" "}
          <Link to="/login" className="text-primary hover:underline">
            تسجيل الدخول
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
};

export default Register;
