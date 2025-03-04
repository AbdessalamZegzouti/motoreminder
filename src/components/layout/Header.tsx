
import React from 'react';
import { Bell, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

type HeaderProps = {
  title: string;
  userRole?: 'admin' | 'agency' | 'super-admin';
  username?: string;
};

const Header = ({ title, userRole = 'agency', username = 'أحمد محمد' }: HeaderProps) => {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  const getRoleText = (role: string) => {
    switch(role) {
      case 'admin': return 'مدير';
      case 'agency': return 'وكالة';
      case 'super-admin': return 'مشرف النظام';
      default: return 'مستخدم';
    }
  };

  return (
    <header className="h-16 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-10 px-4">
      <div className="flex h-full items-center justify-between">
        <h1 className="text-xl font-semibold">{title}</h1>
        
        <div className="flex items-center gap-2 md:gap-4">
          <div className="relative hidden sm:block">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="بحث..."
              className="w-[200px] pl-8 pr-10 rounded-full bg-muted/50 focus:bg-white"
            />
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <Badge className="absolute -top-1 -left-1 h-5 w-5 p-0 flex items-center justify-center bg-primary text-white">
                  3
                </Badge>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[300px]">
              <DropdownMenuLabel>الإشعارات</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="max-h-[300px] overflow-y-auto">
                <DropdownMenuItem className="cursor-pointer">
                  <div className="flex flex-col gap-1">
                    <span className="font-medium">موعد دفع مستحق</span>
                    <span className="text-sm text-muted-foreground">
                      لديك موعد دفع مستحق لعميل: عبدالرحمن أحمد
                    </span>
                    <span className="text-xs text-muted-foreground">منذ ساعتين</span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <div className="flex flex-col gap-1">
                    <span className="font-medium">طلب اشتراك جديد</span>
                    <span className="text-sm text-muted-foreground">
                      تم تقديم طلب اشتراك جديد من وكالة: الفارس للدراجات
                    </span>
                    <span className="text-xs text-muted-foreground">منذ 4 ساعات</span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <div className="flex flex-col gap-1">
                    <span className="font-medium">تم تأكيد الدفع</span>
                    <span className="text-sm text-muted-foreground">
                      تم تأكيد دفع اشتراكك الشهري
                    </span>
                    <span className="text-xs text-muted-foreground">منذ يوم واحد</span>
                  </div>
                </DropdownMenuItem>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer justify-center text-center text-primary">
                عرض كل الإشعارات
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="gap-2 ml-2" size="sm">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="" />
                  <AvatarFallback>{getInitials(username)}</AvatarFallback>
                </Avatar>
                <span className="hidden md:inline-block">{username}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>
                <div className="flex flex-col">
                  <span>{username}</span>
                  <span className="text-xs text-muted-foreground">{getRoleText(userRole)}</span>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>الملف الشخصي</DropdownMenuItem>
              <DropdownMenuItem>الإعدادات</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">تسجيل الخروج</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
