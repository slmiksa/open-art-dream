import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, Trash2, Pencil, ArrowRight } from "lucide-react";
import { AdminSection } from "@/components/admin/AdminSection";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  cover?: string;
  published: boolean;
}

const seed: Article[] = [
  {
    id: "1",
    title: "أفضل ممارسات حماية البريد الإلكتروني للشركات",
    slug: "email-security-best-practices",
    excerpt: "دليل عملي لتأمين البريد الإلكتروني ضد التصيد وهجمات التسوية.",
    content: "المحتوى الكامل للمقال يظهر هنا...",
    date: "2026-06-15",
    author: "فريق لمحة سيك",
    published: true,
  },
  {
    id: "2",
    title: "مركز عمليات الأمن SOC — لماذا هو ضروري؟",
    slug: "why-you-need-a-soc",
    excerpt: "شرح مبسط لدور مركز عمليات الأمن وقيمته للأعمال.",
    content: "المحتوى الكامل...",
    date: "2026-06-01",
    author: "قسم الأبحاث",
    published: true,
  },
];

export const Route = createFileRoute("/adminpanel/news")({
  component: NewsAdmin,
});

function slugify(s: string) {
  return s
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\p{L}\p{N}-]/gu, "");
}

function NewsAdmin() {
  const [items, setItems] = useState<Article[]>(seed);
  const [editing, setEditing] = useState<string | null>(null);

  const update = (id: string, patch: Partial<Article>) =>
    setItems((s) => s.map((x) => (x.id === id ? { ...x, ...patch } : x)));
  const remove = (id: string) => setItems((s) => s.filter((x) => x.id !== id));
  const add = () => {
    const id = crypto.randomUUID();
    setItems((s) => [
      { id, title: "مقال جديد", slug: "new-post", excerpt: "", content: "", date: new Date().toISOString().slice(0, 10), author: "", published: false },
      ...s,
    ]);
    setEditing(id);
  };

  const current = items.find((x) => x.id === editing);

  if (current) {
    return (
      <AdminSection
        title="تحرير المقال"
        description={current.title}
        action={
          <Button variant="ghost" onClick={() => setEditing(null)}>
            <ArrowRight className="ms-2 h-4 w-4" /> رجوع
          </Button>
        }
      >
        <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <div className="space-y-4 rounded-xl border border-border bg-card p-5 shadow-sm">
            <div>
              <Label>عنوان المقال</Label>
              <Input
                value={current.title}
                onChange={(e) =>
                  update(current.id, { title: e.target.value, slug: slugify(e.target.value) || current.slug })
                }
              />
            </div>
            <div>
              <Label>الرابط (slug)</Label>
              <Input value={current.slug} onChange={(e) => update(current.id, { slug: e.target.value })} />
            </div>
            <div>
              <Label>ملخص قصير</Label>
              <Textarea rows={2} value={current.excerpt} onChange={(e) => update(current.id, { excerpt: e.target.value })} />
            </div>
            <div>
              <Label>المحتوى</Label>
              <Textarea
                rows={12}
                value={current.content}
                onChange={(e) => update(current.id, { content: e.target.value })}
                placeholder="اكتب محتوى المقال هنا..."
              />
            </div>
          </div>
          <div className="space-y-4">
            <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
              <ImageUpload
                value={current.cover}
                onChange={(url) => update(current.id, { cover: url })}
                aspect="video"
                label="صورة الغلاف"
              />
            </div>
            <div className="space-y-3 rounded-xl border border-border bg-card p-5 shadow-sm">
              <div>
                <Label>الكاتب</Label>
                <Input value={current.author} onChange={(e) => update(current.id, { author: e.target.value })} />
              </div>
              <div>
                <Label>تاريخ النشر</Label>
                <Input type="date" value={current.date} onChange={(e) => update(current.id, { date: e.target.value })} />
              </div>
              <label className="flex items-center gap-2 pt-2 text-sm">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-border"
                  checked={current.published}
                  onChange={(e) => update(current.id, { published: e.target.checked })}
                />
                منشور
              </label>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setEditing(null)}>إلغاء</Button>
              <Button onClick={() => setEditing(null)}>حفظ</Button>
            </div>
          </div>
        </div>
      </AdminSection>
    );
  }

  return (
    <AdminSection
      title="الأخبار (مدونة)"
      description="إدارة مقالات المدونة: إضافة، تحرير، وحذف."
      action={
        <Button onClick={add}>
          <Plus className="ms-2 h-4 w-4" /> مقال جديد
        </Button>
      }
    >
      <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
        <table className="w-full text-right text-sm">
          <thead className="bg-muted/40 text-muted-foreground">
            <tr>
              <th className="px-4 py-3 font-medium">العنوان</th>
              <th className="px-4 py-3 font-medium">التاريخ</th>
              <th className="px-4 py-3 font-medium">الحالة</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {items.map((it) => (
              <tr key={it.id} className="hover:bg-muted/30">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    {it.cover ? (
                      <img src={it.cover} alt="" className="h-10 w-14 rounded object-cover" />
                    ) : (
                      <div className="h-10 w-14 rounded bg-muted" />
                    )}
                    <div>
                      <div className="font-medium text-foreground">{it.title}</div>
                      <div className="text-xs text-muted-foreground">/{it.slug}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-muted-foreground">{it.date}</td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                      it.published
                        ? "bg-emerald-500/10 text-emerald-600"
                        : "bg-amber-500/10 text-amber-600"
                    }`}
                  >
                    {it.published ? "منشور" : "مسودة"}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-1">
                    <Button variant="ghost" size="icon" onClick={() => setEditing(it.id)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => remove(it.id)} className="text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminSection>
  );
}
