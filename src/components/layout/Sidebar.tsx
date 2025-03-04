
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  Home, 
  Users, 
  CreditCard, 
  Settings, 
  LogOut, 
  ChevronRight, 
  ChevronLeft,
  MessageCircle,
  BarChart
} from 'lucide-react';
import { Button } from '@/components/ui/button';

type SidebarLinkProps = {
  to: string;
  icon: React.ElementType;
  label: string;
  isCollapsed: boolean;
};

const SidebarLink = ({ to, icon: Icon, label, isCollapsed }: SidebarLinkProps) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          "flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-300 group",
          isActive 
            ? "bg-sidebar-accent text-sidebar-accent-foreground" 
            : "text-sidebar-foreground/80 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
        )
      }
    >
      <Icon size={20} />
      <span className={cn(
        "transition-all duration-300",
        isCollapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100"
      )}>
        {label}
      </span>
    </NavLink>
  );
};

type SidebarProps = {
  userRole?: 'admin' | 'agency' | 'super-admin';
};

export const Sidebar = ({ userRole = 'agency' }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div 
      className={cn(
        "h-screen bg-sidebar sticky top-0 transition-all duration-300 border-l border-sidebar-border flex flex-col",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="p-4 flex items-center justify-between border-b border-sidebar-border">
        <div className={cn(
          "flex items-center gap-2 transition-all duration-300",
          collapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100"
        )}>
          <span className="font-bold text-xl text-sidebar-foreground">موتوبي</span>
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleSidebar} 
          className="text-sidebar-foreground hover:bg-sidebar-accent rounded-full flex-shrink-0"
        >
          {collapsed ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
        <SidebarLink to="/dashboard" icon={Home} label="الرئيسية" isCollapsed={collapsed} />
        <SidebarLink to="/clients" icon={Users} label="العملاء" isCollapsed={collapsed} />
        <SidebarLink to="/payments" icon={CreditCard} label="المدفوعات" isCollapsed={collapsed} />
        <SidebarLink to="/reminders" icon={MessageCircle} label="التذكيرات" isCollapsed={collapsed} />
        
        {/* Super Admin Only */}
        {userRole === 'super-admin' && (
          <>
            <div className={cn(
              "mt-6 mb-2 px-3 text-xs font-semibold text-sidebar-foreground/60 transition-all duration-300",
              collapsed ? "opacity-0" : "opacity-100"
            )}>
              لوحة المشرف
            </div>
            <SidebarLink to="/agencies" icon={Users} label="الوكالات" isCollapsed={collapsed} />
            <SidebarLink to="/subscriptions" icon={CreditCard} label="الاشتراكات" isCollapsed={collapsed} />
            <SidebarLink to="/statistics" icon={BarChart} label="الإحصائيات" isCollapsed={collapsed} />
          </>
        )}
      </nav>

      {/* Footer */}
      <div className="p-2 border-t border-sidebar-border">
        <SidebarLink to="/settings" icon={Settings} label="الإعدادات" isCollapsed={collapsed} />
        <SidebarLink to="/logout" icon={LogOut} label="تسجيل الخروج" isCollapsed={collapsed} />
      </div>
    </div>
  );
};
