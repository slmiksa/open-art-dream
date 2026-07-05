import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, Trash2, MoveUp, MoveDown } from "lucide-react";
import { AdminSection } from "@/components/admin/AdminSection";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/adminpanel/slides")({
  component: SlidesAdmin,
});

interface Slide {
  id: string;
  title: string;
  subtitle: string;
  cta: string;
  image?: string;
}

const initial: Slide[] = [
  { id: "1", title: "حلول الأمن السيبراني المتقدمة", subtitle: "نحمي بنيتك التحتية على مدار الساعة", cta: "اعرف المزيد" },
  { id: "2", title: "SOC 24/7", subtitle: "مراقبة واستجابة فورية للحوادث الأمنية", cta: "احجز عرضاً" },
  { id: "3", title: "الحوسبة السحابية الآمنة", subtitle: "بيئات سحابية موثوقة ومرنة", cta: "ابدأ الآن" },
];

function SlidesAdmin() {
  const [slides, setSlides] = useState<Slide[]>(initial);

  const update = (id: string, patch: Partial<Slide>) =>
    setSlides((s) => s.map((x) => (x.id === id ? { ...x, ...patch } : x)));

  const remove = (id: string) => setSlides((s) => s.filter((x) => x.id !== id));

  const move = (id: string, dir: -1 | 1) => {
    setSlides((s) => {
      const i = s.findIndex((x) => x.id === id);
      const j = i + dir;
      if (i < 0 || j < 0 || j >= s.length) return s;
      const copy = [...s];
      [copy[i], copy[j]] = [copy[j], copy[i]];
      return copy;
    });
  };

  const add = () =>
    setSlides((s) => [
      ...s,
      { id: crypto.randomUUID(), title: "سلايد جديد", subtitle: "", cta: "" },
    ]);

  return (
    <AdminSection
      title="السلايدات الرئيسية"
      description="إدارة السلايدات التي تظهر في أعلى الصفحة الرئيسية."
      action={
        <Button onClick={add}>
          <Plus className="ms-2 h-4 w-4" /> إضافة سلايد
        </Button>
      }
    >
      <div className="space-y-4">
        {slides.map((slide, i) => (
          <div key={slide.id} className="rounded-xl border border-border bg-card p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <div className="text-sm font-semibold text-muted-foreground">سلايد #{i + 1}</div>
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon" onClick={() => move(slide.id, -1)} disabled={i === 0}>
                  <MoveUp className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => move(slide.id, 1)} disabled={i === slides.length - 1}>
                  <MoveDown className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => remove(slide.id)} className="text-destructive">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="grid gap-5 md:grid-cols-[1fr_1.2fr]">
              <ImageUpload
                value={slide.image}
                onChange={(url) => update(slide.id, { image: url })}
                aspect="wide"
                label="صورة السلايد"
              />
              <div className="space-y-3">
                <div>
                  <Label>العنوان</Label>
                  <Input value={slide.title} onChange={(e) => update(slide.id, { title: e.target.value })} />
                </div>
                <div>
                  <Label>النص التوضيحي</Label>
                  <Textarea rows={3} value={slide.subtitle} onChange={(e) => update(slide.id, { subtitle: e.target.value })} />
                </div>
                <div>
                  <Label>نص زر الدعوة (CTA)</Label>
                  <Input value={slide.cta} onChange={(e) => update(slide.id, { cta: e.target.value })} />
                </div>
              </div>
            </div>
          </div>
        ))}
        <div className="flex justify-end gap-2 pt-2">
          <Button variant="outline">إلغاء</Button>
          <Button>حفظ التغييرات</Button>
        </div>
      </div>
    </AdminSection>
  );
}
