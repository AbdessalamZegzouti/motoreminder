
import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
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
  const location = useLocation();
  const userRole = user?.role || 'agency';
  const [pageTitle, setPageTitle] = useState(title);

  // Function to get page title based on pathname
  const getPageTitle = (pathname: string) => {
    const path = pathname.split('/')[1];
    switch (path) {
      case 'dashboard':
        return 'الرئيسية';
      case 'clients':
        return 'العملاء';
      case 'payments':
        return 'المدفوعات';
      case 'reminders':
        return 'التذكيرات';
      case 'settings':
        return 'الإعدادات';
      case 'agencies':
        return 'الوكالات';
      case 'subscriptions':
        return 'الاشتراكات';
      case 'statistics':
        return 'الإحصائيات';
      default:
        return 'الرئيسية';
    }
  };

  // Update page title when location changes
  useEffect(() => {
    const newTitle = getPageTitle(location.pathname);
    setPageTitle(newTitle);
    document.title = `${newTitle} | موتوبي`;
  }, [location.pathname]);

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
        <Header title={pageTitle} userRole={userRole as 'admin' | 'agency' | 'super-admin'} username={user?.name} />
        
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
