import { Mail, Phone, MapPin } from "lucide-react";
import { LogoMark } from "./LogoMark";

export function SiteFooter() {
  return (
    <footer className="bg-[var(--purple-dark)] font-arabic text-white" dir="rtl">
      <div className="mx-auto grid max-w-[1400px] gap-10 px-5 py-14 md:grid-cols-4 md:px-10">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--brand)] to-[var(--brand-dark)]">
              <LogoMark className="h-7 w-7 text-white" />
            </div>
            <div className="leading-tight">
              <div className="text-base font-extrabold tracking-wider">LamhaSec</div>
              <div className="text-[10px] tracking-[0.12em] text-white/70">لمحة الآمنة للحلول التقنية</div>
            </div>
          </div>
          <p className="mt-4 text-sm leading-loose text-white/70">
            شريكك الموثوق في الخدمات السيبرانية والحلول التقنية والبرمجية والاستشارات؛ نبني حماية مستدامة لمؤسستك في عالم رقمي متطور.
          </p>
        </div>

        <div>
          <h4 className="border-b border-white/15 pb-3 text-sm font-bold text-white">روابط سريعة</h4>
          <ul className="mt-4 space-y-2.5 text-sm text-white/70">
            <li><a href="/" className="transition hover:text-[var(--brand)]">الرئيسية</a></li>
            <li><a href="/#services" className="transition hover:text-[var(--brand)]">خدماتنا</a></li>
            <li><a href="/systems" className="transition hover:text-[var(--brand)]">تطبيقاتنا</a></li>
            <li><a href="/clients" className="transition hover:text-[var(--brand)]">عملاؤنا</a></li>
            <li><a href="/#contact" className="transition hover:text-[var(--brand)]">تواصل معنا</a></li>
          </ul>
        </div>

        <div>
          <h4 className="border-b border-white/15 pb-3 text-sm font-bold text-white">خدماتنا</h4>
          <ul className="mt-4 space-y-2.5 text-sm text-white/70">
            <li>اختبار الاختراق</li>
            <li>أمن الشبكات</li>
            <li>أمن السحابة</li>
            <li>الاستجابة للحوادث</li>
            <li>الاستشارات التقنية</li>
          </ul>
        </div>

        <div>
          <h4 className="border-b border-white/15 pb-3 text-sm font-bold text-white">تواصل معنا</h4>
          <ul className="mt-4 space-y-3 text-sm text-white/70">
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-[var(--brand)]" />
              <span dir="ltr">800 304 0304</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-[var(--brand)]" />
              <a href="mailto:info@lamhasec.com" className="hover:text-[var(--brand)]">info@lamhasec.com</a>
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-[var(--brand)]" />
              <span>الرياض، المملكة العربية السعودية</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-2 px-5 py-5 text-xs text-white/60 md:flex-row md:px-10">
          <div>© {new Date().getFullYear()} LamhaSec for Technical Solutions. جميع الحقوق محفوظة.</div>
          <div>لمحة الآمنة للحلول التقنية</div>
        </div>
      </div>
    </footer>
  );
}
