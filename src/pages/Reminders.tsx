
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, BellRing, Check, Trash2, Send, MessageSquare } from 'lucide-react';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import WhatsAppMessageTemplate from '@/components/reminders/WhatsAppMessageTemplate';

type Reminder = {
  id: string;
  title: string;
  date: Date;
  completed: boolean;
  clientName?: string;
  clientPhone?: string;
  amountDue?: number;
};

const Reminders = () => {
  const [reminders, setReminders] = useState<Reminder[]>([
    {
      id: '1',
      title: 'تجديد اشتراك العميل أحمد',
      date: new Date(2023, 11, 15),
      completed: false,
      clientName: 'أحمد محمد',
      clientPhone: '966512345678',
      amountDue: 500
    },
    {
      id: '2',
      title: 'متابعة مدفوعات شركة الفارس',
      date: new Date(2023, 11, 20),
      completed: true,
      clientName: 'شركة الفارس',
      clientPhone: '966523456789',
      amountDue: 1200
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
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [amountDue, setAmountDue] = useState<string>('');
  const [messageTemplate, setMessageTemplate] = useState<string>(
    'مرحباً {{clientName}}،\nنذكركم بموعد دفع المبلغ المستحق {{amountDue}} ريال.\nشكراً لتعاونكم.'
  );

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
      clientName: clientName || undefined,
      clientPhone: clientPhone || undefined,
      amountDue: amountDue ? Number(amountDue) : undefined
    };

    setReminders([...reminders, newItem]);
    setNewReminder('');
    setClientName('');
    setClientPhone('');
    setAmountDue('');
    
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

  const sendWhatsAppReminder = (reminder: Reminder) => {
    if (!reminder.clientPhone) {
      toast({
        title: "خطأ",
        description: "لا يوجد رقم هاتف للعميل",
        variant: "destructive",
      });
      return;
    }

    // Format phone number for WhatsApp (remove leading 0 if exists and add country code if needed)
    let phoneNumber = reminder.clientPhone;
    if (phoneNumber.startsWith('0')) {
      phoneNumber = phoneNumber.substring(1);
    }
    if (!phoneNumber.startsWith('966') && !phoneNumber.startsWith('+966')) {
      phoneNumber = '966' + phoneNumber;
    }
    
    // Replace template variables with actual values
    let message = messageTemplate;
    if (reminder.clientName) {
      message = message.replace(/{{clientName}}/g, reminder.clientName);
    }
    if (reminder.amountDue) {
      message = message.replace(/{{amountDue}}/g, reminder.amountDue.toString());
    }
    
    // Encode message for URL
    const encodedMessage = encodeURIComponent(message);
    
    // Create WhatsApp web link
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    // Open WhatsApp web in new tab
    window.open(whatsappUrl, '_blank');
    
    toast({
      title: "تم فتح واتساب",
      description: "تم فتح واتساب ويب لإرسال الرسالة",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">التذكيرات</h2>
        <BellRing className="h-8 w-8 text-primary" />
      </div>
      
      <Tabs defaultValue="reminders" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="reminders">قائمة التذكيرات</TabsTrigger>
          <TabsTrigger value="add">إضافة تذكير</TabsTrigger>
          <TabsTrigger value="template">قالب الرسائل</TabsTrigger>
        </TabsList>
        
        <TabsContent value="reminders">
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
                      className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg gap-4"
                    >
                      <div className="flex items-start gap-4">
                        <Button
                          variant="outline"
                          size="icon"
                          className="rounded-full h-8 w-8 shrink-0 mt-1"
                          onClick={() => toggleReminder(reminder.id)}
                        >
                          {reminder.completed ? (
                            <Check className="h-4 w-4 text-primary" />
                          ) : (
                            <div className="h-4 w-4 rounded-full border-2" />
                          )}
                        </Button>
                        <div className="space-y-2">
                          <p className={`font-medium ${reminder.completed ? 'line-through text-muted-foreground' : ''}`}>
                            {reminder.title}
                          </p>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <CalendarIcon className="h-4 w-4 ml-2" />
                            <span>{format(reminder.date, 'PPP', { locale: ar })}</span>
                          </div>
                          {reminder.clientName && (
                            <div className="text-sm">
                              <span className="font-medium">العميل: </span>
                              <span>{reminder.clientName}</span>
                            </div>
                          )}
                          {reminder.clientPhone && (
                            <div className="text-sm ltr">
                              <span className="font-medium ml-1">الهاتف: </span>
                              <span dir="ltr">{reminder.clientPhone}</span>
                            </div>
                          )}
                          {reminder.amountDue && (
                            <div className="text-sm">
                              <span className="font-medium">المبلغ المستحق: </span>
                              <span>{reminder.amountDue} ريال</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mt-2 sm:mt-0">
                        {reminder.completed ? (
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            مكتمل
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                            قيد الانتظار
                          </Badge>
                        )}
                        
                        {reminder.clientPhone && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="gap-1"
                            onClick={() => sendWhatsAppReminder(reminder)}
                          >
                            <MessageSquare className="h-4 w-4" />
                            <span>واتساب</span>
                          </Button>
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
        </TabsContent>
        
        <TabsContent value="add">
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
                
                <div className="border p-4 rounded-md">
                  <h3 className="font-medium mb-2">معلومات العميل (اختياري)</h3>
                  <div className="space-y-3">
                    <Input
                      placeholder="اسم العميل"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                    />
                    <Input
                      placeholder="رقم الهاتف (مثال: 966512345678)"
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      dir="ltr"
                    />
                    <Input
                      placeholder="المبلغ المستحق"
                      type="number"
                      value={amountDue}
                      onChange={(e) => setAmountDue(e.target.value)}
                      dir="ltr"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleAddReminder}>إضافة تذكير</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="template">
          <WhatsAppMessageTemplate 
            template={messageTemplate} 
            onTemplateChange={setMessageTemplate} 
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Reminders;
