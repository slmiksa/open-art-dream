import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { AdminSection } from "@/components/admin/AdminSection";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface Item {
  id: string;
  title: string;
  description: string;
  image?: string;
}

function useCards(seed: Item[]) {
  const [items, setItems] = useState<Item[]>(seed);
  return {
    items,
    add: () =>
      setItems((s) => [
        ...s,
        { id: crypto.randomUUID(), title: "عنصر جديد", description: "" },
      ]),
    update: (id: string, patch: Partial<Item>) =>
      setItems((s) => s.map((x) => (x.id === id ? { ...x, ...patch } : x))),
    remove: (id: string) => setItems((s) => s.filter((x) => x.id !== id)),
  };
}

export const Route = createFileRoute("/adminpanel/services")({
  component: ServicesAdmin,
});

const seed: Item[] = [
  { id: "1", title: "اختبار الاختراق", description: "فحص شامل لأنظمتك لاكتشاف الثغرات قبل المهاجمين." },
  { id: "2", title: "مركز عمليات الأمن (SOC)", description: "مراقبة أمنية على مدار الساعة." },
  { id: "3", title: "حماية البريد الإلكتروني", description: "تصفية متقدمة ضد التصيد والبرمجيات الخبيثة." },
  { id: "4", title: "الحوسبة السحابية", description: "بنية سحابية آمنة وقابلة للتوسع." },
];

function ServicesAdmin() {
  const { items, add, update, remove } = useCards(seed);

  return (
    <AdminSection
      title="خدماتنا"
      description="أضف أو عدّل الخدمات التي تظهر في قسم (خدماتنا)."
      action={
        <Button onClick={add}>
          <Plus className="ms-2 h-4 w-4" /> إضافة خدمة
        </Button>
      }
    >
      <div className="grid gap-4 md:grid-cols-2">
        {items.map((it) => (
          <div key={it.id} className="rounded-xl border border-border bg-card p-5 shadow-sm">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-xs font-medium text-muted-foreground">خدمة</span>
              <Button variant="ghost" size="icon" onClick={() => remove(it.id)} className="text-destructive">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            <ImageUpload
              value={it.image}
              onChange={(url) => update(it.id, { image: url })}
              aspect="video"
              label="أيقونة/صورة الخدمة"
            />
            <div className="mt-4 space-y-3">
              <div>
                <Label>عنوان الخدمة</Label>
                <Input value={it.title} onChange={(e) => update(it.id, { title: e.target.value })} />
              </div>
              <div>
                <Label>الوصف</Label>
                <Textarea rows={3} value={it.description} onChange={(e) => update(it.id, { description: e.target.value })} />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-end gap-2 pt-4">
        <Button variant="outline">إلغاء</Button>
        <Button>حفظ التغييرات</Button>
      </div>
    </AdminSection>
  );
}
