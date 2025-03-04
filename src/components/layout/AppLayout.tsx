
import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import Header from './Header';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useAuth } from '@/context/AuthContext';
import { toast } from '@/components/ui/use-toast';

type AppLayoutProps = {
  title?: string;
};

const AppLayout = ({ title = 'الرئيسية' }: AppLayoutProps) => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const userRole = user?.role || 'agency';

  // Effect to redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      // Welcome toast when entering dashboard
      toast({
        title: `مرحباً بك ${user?.name}`,
        description: "تم تسجيل الدخول بنجاح إلى لوحة التحكم",
      });
    }
  }, [isAuthenticated, navigate, user]);

  return (
    <div className="flex h-screen bg-background">
      <Sidebar userRole={userRole as 'admin' | 'agency' | 'super-admin'} />
      
      <main className="flex-1 flex flex-col overflow-hidden">
        <Header title={title} userRole={userRole as 'admin' | 'agency' | 'super-admin'} username={user?.name} />
        
        <ScrollArea className="flex-1">
          <div className="container py-6 px-4 sm:px-6 transition-all">
            <Outlet />
          </div>
        </ScrollArea>
      </main>
    </div>
  );
};

export default AppLayout;
