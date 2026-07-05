import { useRef, useState } from "react";
import { Shield, Loader2, AlertCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export function AdminLogin({ forbidden }: { forbidden?: boolean }) {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = formRef.current;
    if (!form || loading) return;

    const formData = new FormData(form);
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");

    setLoading(true);
    setError(null);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setError("بيانات الدخول غير صحيحة. تأكد من البريد وكلمة المرور.");
      }
    } catch {
      setError("تعذّر تسجيل الدخول الآن. جرّب مرة أخرى.");
    } finally {
      setLoading(false);
    }
  };

  const onSignOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div
      dir="rtl"
      className="flex min-h-screen items-center justify-center bg-background p-4 font-[family-name:var(--font-arabic)]"
    >
      <div className="w-full max-w-[380px] rounded-xl border border-border bg-card p-7 shadow-sm">
        <div className="mb-6 flex flex-col items-center text-center">
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Shield className="h-6 w-6" />
          </div>
          <h1 className="text-xl font-bold text-foreground">لوحة تحكم لمحة سيك</h1>
          <p className="mt-1 text-sm text-muted-foreground">سجّل الدخول للوصول إلى لوحة التحكم</p>
        </div>

        {forbidden ? (
          <div className="space-y-4 text-center">
            <div className="flex items-center justify-center gap-2 rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
              <AlertCircle className="h-4 w-4" />
              هذا الحساب لا يملك صلاحية مدير.
            </div>
            <button
              type="button"
              className="h-11 w-full rounded-lg border border-border bg-card px-4 text-sm font-semibold text-foreground transition hover:bg-muted"
              onClick={onSignOut}
            >
              تسجيل الخروج والدخول بحساب آخر
            </button>
          </div>
        ) : (
          <form ref={formRef} onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground" htmlFor="email">
                البريد الإلكتروني
              </label>
              <input
                id="email"
                name="email"
                type="email"
                dir="ltr"
                autoComplete="email"
                className="h-11 w-full rounded-lg border border-input bg-background px-3 text-left text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-70"
                defaultValue="admin@lamhasec.com"
                disabled={loading}
                placeholder="admin@lamhasec.com"
                required
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground" htmlFor="password">
                كلمة المرور
              </label>
              <input
                id="password"
                name="password"
                type="password"
                dir="ltr"
                autoComplete="current-password"
                className="h-11 w-full rounded-lg border border-input bg-background px-3 text-left text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-70"
                disabled={loading}
                required
              />
            </div>
            {error && (
              <div className="flex items-center gap-2 rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
                <AlertCircle className="h-4 w-4 shrink-0" />
                {error}
              </div>
            )}
            <button
              type="submit"
              className="flex h-11 w-full items-center justify-center rounded-lg bg-primary px-4 text-sm font-bold text-primary-foreground transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-70"
              disabled={loading}
            >
              {loading && <Loader2 className="ms-2 h-4 w-4 animate-spin" aria-hidden="true" />}
              دخول
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
