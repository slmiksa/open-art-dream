import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Facebook, Instagram, Twitter, Linkedin, Youtube, Send, Phone, Mail, Globe } from "lucide-react";
import { AdminSection } from "@/components/admin/AdminSection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface SocialLink {
  key: string;
  label: string;
  icon: typeof Facebook;
  value: string;
  placeholder: string;
}

const initial: SocialLink[] = [
  { key: "facebook", label: "فيسبوك", icon: Facebook, value: "", placeholder: "https://facebook.com/..." },
  { key: "instagram", label: "إنستغرام", icon: Instagram, value: "", placeholder: "https://instagram.com/..." },
  { key: "twitter", label: "X (تويتر)", icon: Twitter, value: "", placeholder: "https://x.com/..." },
  { key: "linkedin", label: "لينكدإن", icon: Linkedin, value: "", placeholder: "https://linkedin.com/company/..." },
  { key: "youtube", label: "يوتيوب", icon: Youtube, value: "", placeholder: "https://youtube.com/@..." },
  { key: "telegram", label: "تيليجرام", icon: Send, value: "", placeholder: "https://t.me/..." },
  { key: "whatsapp", label: "واتساب", icon: Phone, value: "", placeholder: "+9665xxxxxxxx" },
  { key: "email", label: "البريد الإلكتروني", icon: Mail, value: "", placeholder: "info@example.com" },
  { key: "website", label: "الموقع الإلكتروني", icon: Globe, value: "", placeholder: "https://" },
];

export const Route = createFileRoute("/adminpanel/social")({
  component: SocialAdmin,
});

function SocialAdmin() {
  const [links, setLinks] = useState<SocialLink[]>(initial);

  const update = (key: string, value: string) =>
    setLinks((s) => s.map((x) => (x.key === key ? { ...x, value } : x)));

  return (
    <AdminSection
      title="وسائل التواصل"
      description="روابط حسابات التواصل الاجتماعي وطرق التواصل التي تظهر في الفوتر."
    >
      <div className="grid gap-4 md:grid-cols-2">
        {links.map((l) => {
          const Icon = l.icon;
          return (
            <div key={l.key} className="rounded-xl border border-border bg-card p-4 shadow-sm">
              <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-foreground">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="h-4 w-4" />
                </span>
                {l.label}
              </div>
              <Label className="sr-only">{l.label}</Label>
              <Input
                dir="ltr"
                value={l.value}
                placeholder={l.placeholder}
                onChange={(e) => update(l.key, e.target.value)}
              />
            </div>
          );
        })}
      </div>
      <div className="flex justify-end gap-2 pt-4">
        <Button variant="outline">إلغاء</Button>
        <Button>حفظ التغييرات</Button>
      </div>
    </AdminSection>
  );
}
