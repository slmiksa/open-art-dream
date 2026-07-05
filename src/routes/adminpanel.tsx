import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Images,
  Sparkles,
  Tag,
  AppWindow,
  Users,
  Newspaper,
  Share2,
  Shield,
} from "lucide-react";

export const Route = createFileRoute("/adminpanel")({
  head: () => ({
    meta: [
      { title: "لوحة التحكم — LamhaSec" },
      { name: "description", content: "لوحة تحكم لإدارة محتوى موقع لمحة سيك." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminLayout,
});

const navItems = [
  { to: "/adminpanel", label: "الرئيسية", icon: LayoutDashboard, exact: true },
  { to: "/adminpanel/slides", label: "السلايدات", icon: Images, exact: false },
  { to: "/adminpanel/services", label: "خدماتنا", icon: Sparkles, exact: false },
  { to: "/adminpanel/offers", label: "أحدث العروض", icon: Tag, exact: false },
  { to: "/adminpanel/systems", label: "التطبيقات والأنظمة", icon: AppWindow, exact: false },
  { to: "/adminpanel/clients", label: "عملاؤنا", icon: Users, exact: false },
  { to: "/adminpanel/news", label: "الأخبار (مدونة)", icon: Newspaper, exact: false },
  { to: "/adminpanel/social", label: "وسائل التواصل", icon: Share2, exact: false },
] as const;

function AdminLayout() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const isActive = (to: string, exact?: boolean) =>
    exact ? pathname === to : pathname === to || pathname.startsWith(`${to}/`);

  return (
    <div dir="rtl" className="min-h-screen bg-muted/30 font-[family-name:var(--font-arabic)]">
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="sticky top-0 hidden h-screen w-64 shrink-0 border-l border-border bg-card lg:block">
          <div className="flex h-16 items-center gap-2 border-b border-border px-6">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Shield className="h-5 w-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-foreground">لوحة التحكم</div>
              <div className="text-xs text-muted-foreground">LamhaSec Admin</div>
            </div>
          </div>
          <nav className="space-y-1 p-3">
            {navItems.map((item) => {
              const active = isActive(item.to, item.exact);
              const Icon = item.icon;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                    active
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Main */}
        <div className="flex min-w-0 flex-1 flex-col">
          {/* Mobile nav */}
          <div className="sticky top-0 z-10 flex items-center gap-2 overflow-x-auto border-b border-border bg-card px-3 py-2 lg:hidden">
            {navItems.map((item) => {
              const active = isActive(item.to, item.exact);
              const Icon = item.icon;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`flex shrink-0 items-center gap-2 rounded-md px-3 py-2 text-xs font-medium transition ${
                    active
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {item.label}
                </Link>
              );
            })}
          </div>

          <main className="flex-1 p-4 md:p-8">
            <div className="mx-auto max-w-6xl">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
