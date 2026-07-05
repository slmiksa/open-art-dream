import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, Trash2, Tag } from "lucide-react";
import { AdminSection } from "@/components/admin/AdminSection";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface Offer {
  id: string;
  title: string;
  description: string;
  badge: string;
  validUntil: string;
  image?: string;
}

const seed: Offer[] = [
  { id: "1", title: "خصم 25% على اختبار الاختراق", description: "لفترة محدودة على باقات الشركات المتوسطة.", badge: "خصم 25%", validUntil: "2026-08-30" },
  { id: "2", title: "باقة SOC مجانية شهر", description: "جرّب مراقبة SOC لمدة شهر عند الاشتراك السنوي.", badge: "شهر مجاني", validUntil: "2026-09-15" },
];

export const Route = createFileRoute("/adminpanel/offers")({
  component: OffersAdmin,
});

function OffersAdmin() {
  const [items, setItems] = useState<Offer[]>(seed);
  const update = (id: string, patch: Partial<Offer>) =>
    setItems((s) => s.map((x) => (x.id === id ? { ...x, ...patch } : x)));
  const remove = (id: string) => setItems((s) => s.filter((x) => x.id !== id));
  const add = () =>
    setItems((s) => [
      ...s,
      { id: crypto.randomUUID(), title: "عرض جديد", description: "", badge: "", validUntil: "" },
    ]);

  return (
    <AdminSection
      title="أحدث العروض"
      description="أضف أو عدّل العروض الترويجية الظاهرة على الموقع."
      action={
        <Button onClick={add}>
          <Plus className="ms-2 h-4 w-4" /> إضافة عرض
        </Button>
      }
    >
      <div className="grid gap-4 md:grid-cols-2">
        {items.map((it) => (
          <div key={it.id} className="rounded-xl border border-border bg-card p-5 shadow-sm">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                <Tag className="h-3.5 w-3.5" />
                عرض ترويجي
              </div>
              <Button variant="ghost" size="icon" onClick={() => remove(it.id)} className="text-destructive">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            <ImageUpload
              value={it.image}
              onChange={(url) => update(it.id, { image: url })}
              aspect="video"
              label="صورة العرض"
            />
            <div className="mt-4 space-y-3">
              <div>
                <Label>عنوان العرض</Label>
                <Input value={it.title} onChange={(e) => update(it.id, { title: e.target.value })} />
              </div>
              <div>
                <Label>الوصف</Label>
                <Textarea rows={3} value={it.description} onChange={(e) => update(it.id, { description: e.target.value })} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label>الشارة</Label>
                  <Input value={it.badge} placeholder="خصم 20%" onChange={(e) => update(it.id, { badge: e.target.value })} />
                </div>
                <div>
                  <Label>ساري حتى</Label>
                  <Input type="date" value={it.validUntil} onChange={(e) => update(it.id, { validUntil: e.target.value })} />
                </div>
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
