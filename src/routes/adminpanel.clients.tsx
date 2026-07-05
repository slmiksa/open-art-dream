import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { AdminSection } from "@/components/admin/AdminSection";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Client {
  id: string;
  name: string;
  website: string;
  logo?: string;
}

const seed: Client[] = [
  { id: "1", name: "شركة الاتصالات", website: "https://example.com" },
  { id: "2", name: "بنك التنمية", website: "https://example.com" },
  { id: "3", name: "مجموعة النخبة", website: "https://example.com" },
  { id: "4", name: "مؤسسة الرؤية", website: "https://example.com" },
];

export const Route = createFileRoute("/adminpanel/clients")({
  component: ClientsAdmin,
});

function ClientsAdmin() {
  const [items, setItems] = useState<Client[]>(seed);
  const update = (id: string, patch: Partial<Client>) =>
    setItems((s) => s.map((x) => (x.id === id ? { ...x, ...patch } : x)));
  const remove = (id: string) => setItems((s) => s.filter((x) => x.id !== id));
  const add = () =>
    setItems((s) => [...s, { id: crypto.randomUUID(), name: "عميل جديد", website: "" }]);

  return (
    <AdminSection
      title="عملاؤنا"
      description="أدر شعارات وأسماء العملاء الظاهرة في قسم عملاؤنا."
      action={
        <Button onClick={add}>
          <Plus className="ms-2 h-4 w-4" /> إضافة عميل
        </Button>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((it) => (
          <div key={it.id} className="rounded-xl border border-border bg-card p-4 shadow-sm">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-xs font-medium text-muted-foreground">عميل</span>
              <Button variant="ghost" size="icon" onClick={() => remove(it.id)} className="text-destructive">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            <ImageUpload
              value={it.logo}
              onChange={(url) => update(it.id, { logo: url })}
              aspect="square"
              label="شعار العميل"
            />
            <div className="mt-3 space-y-3">
              <div>
                <Label>اسم العميل</Label>
                <Input value={it.name} onChange={(e) => update(it.id, { name: e.target.value })} />
              </div>
              <div>
                <Label>الموقع الإلكتروني</Label>
                <Input value={it.website} placeholder="https://" onChange={(e) => update(it.id, { website: e.target.value })} />
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
