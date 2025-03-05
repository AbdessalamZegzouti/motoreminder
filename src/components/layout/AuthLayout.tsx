
import React from 'react';
import { cn } from '@/lib/utils';

type AuthLayoutProps = {
  children: React.ReactNode;
  image?: string;
  title?: string;
  description?: string;
};

const AuthLayout = ({ 
  children, 
  image = "/auth-bg.jpg", 
  title = "موتوبي", 
  description = "منصة إدارة مدفوعات العملاء لوكالات الدراجات" 
}: AuthLayoutProps) => {
  return (
    <div className="flex min-h-screen bg-background">
      {/* Left side - Content */}
      <div className="flex w-full flex-col justify-center md:w-1/2 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 py-12">
        <div className="mx-auto w-full max-w-md">
          <div className="flex flex-col space-y-2 text-center mb-6">
            <h1 className="text-3xl font-bold tracking-tight text-primary">{title}</h1>
            <p className="text-muted-foreground">{description}</p>
          </div>
          
          <div className={cn(
            "animate-fade-in bg-card rounded-2xl shadow-sm border border-border/40 p-6 sm:p-8",
            "hover:shadow-md transition-all duration-300"
          )}>
            {children}
          </div>
        </div>
      </div>
      
      {/* Right side - Image */}
      <div className="hidden md:block md:w-1/2 bg-muted relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-background/20" />
        <img 
          src={image} 
          alt="Authentication" 
          className="h-full w-full object-cover opacity-90"
        />
        
        <div className="absolute bottom-0 right-0 left-0 p-16 text-white">
          <blockquote className="space-y-4">
            <div className="h-10 w-2 bg-primary mr-4 mb-2 rounded-full"></div>
            <p className="text-xl font-medium">
              "منصة موتوبي ساعدت وكالتنا على متابعة مدفوعات العملاء بكل سهولة ويسر."
            </p>
            <footer className="text-base mt-2 opacity-90">أحمد السالم - وكالة الصفوة للدراجات</footer>
          </blockquote>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
