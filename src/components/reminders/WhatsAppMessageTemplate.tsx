
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MessageSquare, Save, Copy, RotateCcw } from 'lucide-react';

interface WhatsAppMessageTemplateProps {
  template: string;
  onTemplateChange: (template: string) => void;
}

const DEFAULT_TEMPLATE = 'مرحباً {{clientName}}،\nنذكركم بموعد دفع المبلغ المستحق {{amountDue}} درهم.\nشكراً لتعاونكم.';

const WhatsAppMessageTemplate: React.FC<WhatsAppMessageTemplateProps> = ({
  template,
  onTemplateChange
}) => {
  const handleResetTemplate = () => {
    onTemplateChange(DEFAULT_TEMPLATE);
    toast({
      title: "تم إعادة تعيين القالب",
      description: "تم إعادة القالب إلى الوضع الافتراضي",
    });
  };

  const handleSaveTemplate = () => {
    // Here you would typically save to a database
    // For now, we'll just show a toast notification
    toast({
      title: "تم حفظ القالب",
      description: "تم حفظ قالب الرسالة بنجاح",
    });
  };

  const handleCopyTemplate = () => {
    navigator.clipboard.writeText(template);
    toast({
      title: "تم النسخ",
      description: "تم نسخ القالب إلى الحافظة",
    });
  };

  const previewTemplate = () => {
    // Replace template variables with example values
    return template
      .replace(/{{clientName}}/g, 'محمد أحمد')
      .replace(/{{amountDue}}/g, '500');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>قالب رسائل واتساب</CardTitle>
        <CardDescription>تخصيص قالب الرسائل المرسلة للعملاء</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="edit" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="edit">تحرير</TabsTrigger>
            <TabsTrigger value="preview">معاينة</TabsTrigger>
            <TabsTrigger value="help">المساعدة</TabsTrigger>
          </TabsList>
          
          <TabsContent value="edit">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <MessageSquare className="mr-2 h-4 w-4 text-primary" />
                  <span className="font-medium">تحرير القالب</span>
                </div>
                <Button variant="ghost" size="sm" onClick={handleResetTemplate}>
                  <RotateCcw className="mr-1 h-4 w-4" />
                  إعادة تعيين
                </Button>
              </div>
              <Textarea
                value={template}
                onChange={(e) => onTemplateChange(e.target.value)}
                className="min-h-32 font-medium"
                dir="rtl"
                placeholder="اكتب قالب الرسالة هنا..."
              />
              <div className="text-sm text-muted-foreground">
                استخدم <code className="bg-muted px-1 rounded">{'{{clientName}}'}</code> لاسم العميل و <code className="bg-muted px-1 rounded">{'{{amountDue}}'}</code> للمبلغ المستحق.
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="preview">
            <div className="space-y-4">
              <div className="flex items-center">
                <MessageSquare className="mr-2 h-4 w-4 text-primary" />
                <span className="font-medium">معاينة الرسالة</span>
              </div>
              <div className="bg-green-50 p-4 rounded-lg border border-green-200 whitespace-pre-wrap">
                {previewTemplate()}
              </div>
              <p className="text-sm text-muted-foreground">
                هذه معاينة للرسالة كما ستظهر للعميل في واتساب
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="help">
            <div className="space-y-4">
              <div className="flex items-center">
                <MessageSquare className="mr-2 h-4 w-4 text-primary" />
                <span className="font-medium">كيفية استخدام قوالب الرسائل</span>
              </div>
              <div className="space-y-2 text-sm">
                <p>يمكنك استخدام المتغيرات التالية في قالب الرسالة:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li><code className="bg-muted px-1 rounded">{'{{clientName}}'}</code> - سيتم استبداله باسم العميل</li>
                  <li><code className="bg-muted px-1 rounded">{'{{amountDue}}'}</code> - سيتم استبداله بالمبلغ المستحق</li>
                </ul>
                <p className="mt-4">يمكنك إرسال رسائل واتساب للعملاء مباشرة من خلال:</p>
                <ol className="list-decimal list-inside space-y-1">
                  <li>إضافة تذكير مع معلومات العميل (الاسم، رقم الهاتف، المبلغ)</li>
                  <li>الضغط على زر "واتساب" بجانب التذكير</li>
                  <li>سيتم فتح واتساب ويب مع الرسالة المخصصة</li>
                </ol>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div>
          <Button variant="outline" onClick={handleCopyTemplate} className="gap-1">
            <Copy className="h-4 w-4" />
            نسخ
          </Button>
        </div>
        <Button onClick={handleSaveTemplate} className="gap-1">
          <Save className="h-4 w-4" />
          حفظ القالب
        </Button>
      </CardFooter>
    </Card>
  );
};

export default WhatsAppMessageTemplate;
