import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { AdminSection } from "@/components/admin/AdminSection";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface System {
  id: string;
  title: string;
  description: string;
  category: string;
  image?: string;
}

const seed: System [] = [
  { id: "1", title: "نظام إدارة الحوادث", category: "SOC", description: "منصة متكاملة لإدارة الحوادث الأمنية والاستجابة لها." },
  { id: "2", title: "بوابة العملاء", category: "خدمات", description: "لوحة تحكم للعميل لمتابعة التقارير والفواتير." },
  { id: "3", title: "نظام مراقبة الشبكة", category: "شبكات", description: "مراقبة الأداء والاختراقات في الوقت الفعلي." },
];

export const Route = createFileRoute("/adminpanel/systems")({
  component: SystemsAdmin,
});

function SystemsAdmin() {
  const [items, setItems] = useState<System[]>(seed);
  const update = (id: string, patch: Partial<System>) =>
    setItems((s) => s.map((x) => (x.id === id ? { ...x, ...patch } : x)));
  const remove = (id: string) => setItems((s) => s.filter((x) => x.id !== id));
  const add = () =>
    setItems((s) => [
      ...s,
      { id: crypto.randomUUID(), title: "نظام جديد", description: "", category: "" },
    ]);

  return (
    <AdminSection
      title="التطبيقات والأنظمة"
      description="أدر التطبيقات والأنظمة الظاهرة في صفحة الأنظمة."
      action={
        <Button onClick={add}>
          <Plus className="ms-2 h-4 w-4" /> إضافة نظام
        </Button>
      }
    >
      <div className="grid gap-4 md:grid-cols-2">
        {items.map((it) => (
          <div key={it.id} className="rounded-xl border border-border bg-card p-5 shadow-sm">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-xs font-medium text-muted-foreground">نظام</span>
              <Button variant="ghost" size="icon" onClick={() => remove(it.id)} className="text-destructive">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            <ImageUpload
              value={it.image}
              onChange={(url) => update(it.id, { image: url })}
              aspect="video"
              label="صورة/شعار النظام"
            />
            <div className="mt-4 space-y-3">
              <div>
                <Label>اسم النظام</Label>
                <Input value={it.title} onChange={(e) => update(it.id, { title: e.target.value })} />
              </div>
              <div>
                <Label>التصنيف</Label>
                <Input value={it.category} onChange={(e) => update(it.id, { category: e.target.value })} />
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
