
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
          <div className="flex flex-col space-y-2 text-center mb-8">
            <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
            <p className="text-muted-foreground">{description}</p>
          </div>
          
          <div className={cn("grid gap-6", "animate-fade-in")}>
            {children}
          </div>
        </div>
      </div>
      
      {/* Right side - Image */}
      <div className="hidden md:block md:w-1/2 bg-muted relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-background/20" />
        <img 
          src={image} 
          alt="Authentication" 
          className="h-full w-full object-cover opacity-90"
        />
        
        <div className="absolute bottom-0 right-0 left-0 p-16 text-white">
          <blockquote className="space-y-2">
            <p className="text-lg">
              "منصة موتوبي ساعدت وكالتنا على متابعة مدفوعات العملاء بكل سهولة ويسر."
            </p>
            <footer className="text-sm">أحمد السالم - وكالة الصفوة للدراجات</footer>
          </blockquote>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
