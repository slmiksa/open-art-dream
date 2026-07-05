import { createFileRoute, Link } from "@tanstack/react-router";
import { Images, Sparkles, Tag, AppWindow, Users, Newspaper, Share2 } from "lucide-react";
import { AdminSection } from "@/components/admin/AdminSection";

export const Route = createFileRoute("/adminpanel/")({
  component: AdminHome,
});

const cards = [
  { to: "/adminpanel/slides", label: "السلايدات", icon: Images, count: "3 سلايدات", color: "bg-blue-500/10 text-blue-600" },
  { to: "/adminpanel/services", label: "خدماتنا", icon: Sparkles, count: "6 خدمات", color: "bg-emerald-500/10 text-emerald-600" },
  { to: "/adminpanel/offers", label: "أحدث العروض", icon: Tag, count: "2 عرض", color: "bg-amber-500/10 text-amber-600" },
  { to: "/adminpanel/systems", label: "التطبيقات والأنظمة", icon: AppWindow, count: "4 أنظمة", color: "bg-violet-500/10 text-violet-600" },
  { to: "/adminpanel/clients", label: "عملاؤنا", icon: Users, count: "8 عملاء", color: "bg-rose-500/10 text-rose-600" },
  { to: "/adminpanel/news", label: "الأخبار", icon: Newspaper, count: "3 مقالات", color: "bg-cyan-500/10 text-cyan-600" },
  { to: "/adminpanel/social", label: "وسائل التواصل", icon: Share2, count: "5 حسابات", color: "bg-fuchsia-500/10 text-fuchsia-600" },
] as const;

function AdminHome() {
  return (
    <AdminSection
      title="أهلاً بك في لوحة التحكم"
      description="اختر القسم الذي تريد إدارته من الأقسام التالية أو من القائمة الجانبية."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((c) => {
          const Icon = c.icon;
          return (
            <Link
              key={c.to}
              to={c.to}
              className="group rounded-xl border border-border bg-card p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className={`mb-4 inline-flex h-11 w-11 items-center justify-center rounded-lg ${c.color}`}>
                <Icon className="h-5 w-5" />
              </div>
              <div className="text-base font-semibold text-foreground">{c.label}</div>
              <div className="mt-1 text-sm text-muted-foreground">{c.count}</div>
            </Link>
          );
        })}
      </div>
    </AdminSection>
  );
}
