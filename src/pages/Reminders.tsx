
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, BellRing, Check, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';
import { Badge } from '@/components/ui/badge';

type Reminder = {
  id: string;
  title: string;
  date: Date;
  completed: boolean;
};

const Reminders = () => {
  const [reminders, setReminders] = useState<Reminder[]>([
    {
      id: '1',
      title: 'تجديد اشتراك العميل أحمد',
      date: new Date(2023, 11, 15),
      completed: false,
    },
    {
      id: '2',
      title: 'متابعة مدفوعات شركة الفارس',
      date: new Date(2023, 11, 20),
      completed: true,
    },
    {
      id: '3',
      title: 'تحديث معلومات العملاء',
      date: new Date(2023, 11, 30),
      completed: false,
    },
  ]);
  
  const [newReminder, setNewReminder] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const handleAddReminder = () => {
    if (!newReminder.trim()) {
      toast({
        title: "خطأ",
        description: "الرجاء إدخال عنوان للتذكير",
        variant: "destructive",
      });
      return;
    }

    if (!selectedDate) {
      toast({
        title: "خطأ",
        description: "الرجاء اختيار تاريخ للتذكير",
        variant: "destructive",
      });
      return;
    }

    const newItem: Reminder = {
      id: Date.now().toString(),
      title: newReminder,
      date: selectedDate,
      completed: false,
    };

    setReminders([...reminders, newItem]);
    setNewReminder('');
    
    toast({
      title: "تم إضافة التذكير",
      description: "تمت إضافة التذكير بنجاح",
    });
  };

  const toggleReminder = (id: string) => {
    setReminders(reminders.map(reminder => 
      reminder.id === id ? { ...reminder, completed: !reminder.completed } : reminder
    ));
    
    const reminder = reminders.find(r => r.id === id);
    if (reminder) {
      toast({
        title: reminder.completed ? "تم إعادة التذكير" : "تم إكمال التذكير",
        description: `تم ${reminder.completed ? 'إعادة' : 'إكمال'} التذكير "${reminder.title}"`,
      });
    }
  };

  const deleteReminder = (id: string) => {
    const reminder = reminders.find(r => r.id === id);
    setReminders(reminders.filter(reminder => reminder.id !== id));
    
    if (reminder) {
      toast({
        title: "تم حذف التذكير",
        description: `تم حذف التذكير "${reminder.title}"`,
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">التذكيرات</h2>
        <BellRing className="h-8 w-8 text-primary" />
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>إضافة تذكير جديد</CardTitle>
          <CardDescription>أضف تذكيرًا جديدًا ليتم تنبيهك في الوقت المحدد</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4">
            <Input
              placeholder="عنوان التذكير"
              value={newReminder}
              onChange={(e) => setNewReminder(e.target.value)}
            />
            <div className="flex items-center space-x-4">
              <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-right"
                    onClick={() => setIsCalendarOpen(true)}
                  >
                    <CalendarIcon className="ml-2 h-4 w-4" />
                    {selectedDate ? (
                      format(selectedDate, 'PPP', { locale: ar })
                    ) : (
                      <span>اختر تاريخ</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) => {
                      setSelectedDate(date);
                      setIsCalendarOpen(false);
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleAddReminder}>إضافة تذكير</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>قائمة التذكيرات</CardTitle>
          <CardDescription>جميع التذكيرات المضافة</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {reminders.length === 0 ? (
              <div className="text-center py-6 text-muted-foreground">
                لا توجد تذكيرات حتى الآن
              </div>
            ) : (
              reminders.map((reminder) => (
                <div
                  key={reminder.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full h-8 w-8"
                      onClick={() => toggleReminder(reminder.id)}
                    >
                      {reminder.completed ? (
                        <Check className="h-4 w-4 text-primary" />
                      ) : (
                        <div className="h-4 w-4 rounded-full border-2" />
                      )}
                    </Button>
                    <div className="space-y-1 ml-4">
                      <p className={`font-medium ${reminder.completed ? 'line-through text-muted-foreground' : ''}`}>
                        {reminder.title}
                      </p>
                      <div className="flex items-center">
                        <CalendarIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          {format(reminder.date, 'PPP', { locale: ar })}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {reminder.completed ? (
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        مكتمل
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                        قيد الانتظار
                      </Badge>
                    )}
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => deleteReminder(reminder.id)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Reminders;
