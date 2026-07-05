import {
  Activity,
  Cloud,
  Database,
  Eye,
  Fingerprint,
  FileLock2,
  Network,
  Radar,
  ServerCog,
  ShieldCheck,
} from "lucide-react";

export type SystemItem = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  Icon: typeof ShieldCheck;
  gradient: string;
  accent: string;
  metrics: { label: string; value: string }[];
};

export const systems: SystemItem[] = [
  {
    id: "sentinel",
    name: "Sentinel SOC",
    tagline: "مركز عمليات أمنية ذكي",
    description:
      "منصة مراقبة لحظية على مدار 24/7 ترصد الأنشطة المشبوهة، وتربط الإنذارات تلقائياً عبر الخوادم والشبكات والسحابة، مع استجابة تلقائية للحوادث الحرجة.",
    Icon: Radar,
    gradient: "from-sky-500/30 via-cyan-500/20 to-transparent",
    accent: "#48AAC8",
    metrics: [
      { label: "تنبيهات/يوم", value: "12,480" },
      { label: "حوادث محتواة", value: "98.7%" },
    ],
  },
  {
    id: "vaultx",
    name: "VaultX Encrypt",
    tagline: "تشفير وحماية البيانات",
    description:
      "نظام تشفير من طرف إلى طرف لجميع بياناتك الحساسة، مع إدارة مفاتيح مركزية متوافقة مع معايير AES-256 و FIPS 140-2 لضمان السرية الكاملة.",
    Icon: FileLock2,
    gradient: "from-indigo-500/30 via-blue-500/20 to-transparent",
    accent: "#7C8CFF",
    metrics: [
      { label: "خوارزمية", value: "AES-256" },
      { label: "ملفات محمية", value: "+1.2M" },
    ],
  },
  {
    id: "nethawk",
    name: "NetHawk Firewall",
    tagline: "جدار حماية الجيل التالي",
    description:
      "حماية متقدمة للشبكات تعتمد على الذكاء الاصطناعي لتحليل حركة البيانات لحظياً، وتمنع التهديدات قبل وصولها لأنظمتك الداخلية.",
    Icon: Network,
    gradient: "from-emerald-500/30 via-teal-500/20 to-transparent",
    accent: "#42D6B0",
    metrics: [
      { label: "سرعة الفحص", value: "40 Gbps" },
      { label: "قواعد نشطة", value: "+8,000" },
    ],
  },
  {
    id: "cloudguard",
    name: "CloudGuard 360",
    tagline: "حماية البيئات السحابية",
    description:
      "إدارة شاملة لأمن AWS و Azure و Google Cloud، مع كشف الإعدادات الخاطئة، تقييم الامتثال، وحماية حسابات الهوية والوصول.",
    Icon: Cloud,
    gradient: "from-cyan-500/30 via-sky-500/20 to-transparent",
    accent: "#5BC0EB",
    metrics: [
      { label: "مزودون", value: "AWS · Azure · GCP" },
      { label: "تقييم الامتثال", value: "ISO/NCA" },
    ],
  },
  {
    id: "phishshield",
    name: "PhishShield AI",
    tagline: "كشف هجمات التصيد",
    description:
      "محرك ذكاء اصطناعي يفحص الرسائل والروابط لكشف محاولات التصيد والاحتيال الإلكتروني قبل أن تصل إلى موظفيك.",
    Icon: Eye,
    gradient: "from-fuchsia-500/30 via-purple-500/20 to-transparent",
    accent: "#C57BFF",
    metrics: [
      { label: "دقة الكشف", value: "99.4%" },
      { label: "نماذج AI", value: "+15" },
    ],
  },
  {
    id: "idtrust",
    name: "IDTrust IAM",
    tagline: "إدارة الهوية والصلاحيات",
    description:
      "منصة مركزية لإدارة هويات المستخدمين والصلاحيات، مع دعم MFA، Single Sign-On، وتطبيق سياسة Zero Trust في كل المؤسسة.",
    Icon: Fingerprint,
    gradient: "from-amber-500/30 via-orange-500/20 to-transparent",
    accent: "#F5A65B",
    metrics: [
      { label: "MFA", value: "مفعّل" },
      { label: "تطبيقات مدمجة", value: "+200" },
    ],
  },
  {
    id: "backupcore",
    name: "BackupCore Vault",
    tagline: "نسخ احتياطي مقاوم للفدية",
    description:
      "حلول نسخ احتياطي مشفّرة وموزعة جغرافياً مع لقطات غير قابلة للحذف (Immutable Snapshots)، تضمن استعادة كاملة بعد أي هجوم فدية.",
    Icon: Database,
    gradient: "from-rose-500/30 via-pink-500/20 to-transparent",
    accent: "#FF7A8A",
    metrics: [
      { label: "RPO", value: "≤ 5 دقائق" },
      { label: "RTO", value: "≤ 30 دقيقة" },
    ],
  },
];

export function SystemMock({ system, large = false }: { system: SystemItem; large?: boolean }) {
  const { Icon, accent, name, tagline } = system;
  return (
    <div
      className={`relative w-full overflow-hidden rounded-2xl border border-white/10 bg-[oklch(0.18_0.02_240)] shadow-[0_20px_50px_-20px_rgba(0,0,0,0.6)] ${
        large ? "h-56" : "h-40"
      }`}
      dir="ltr"
    >
      <div className="flex items-center gap-1.5 border-b border-white/10 bg-white/[0.04] px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-red-400/70" />
        <span className="h-2 w-2 rounded-full bg-yellow-400/70" />
        <span className="h-2 w-2 rounded-full bg-green-400/70" />
        <div className="ml-auto h-1.5 w-24 rounded-full bg-white/10" />
      </div>
      <div className="grid h-[calc(100%-28px)] grid-cols-[88px_1fr]">
        <div className="flex flex-col items-center gap-2 border-r border-white/10 bg-white/[0.02] py-3">
          <div
            className="flex h-9 w-9 items-center justify-center rounded-lg"
            style={{ background: `${accent}33`, color: accent }}
          >
            <Icon className="h-5 w-5" strokeWidth={2.2} />
          </div>
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="h-1.5 w-10 rounded-full bg-white/10" />
          ))}
        </div>
        <div className="space-y-2 p-3">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[11px] font-bold text-white">{name}</div>
              <div className="text-[9px] text-white/50">{tagline}</div>
            </div>
            <div
              className="rounded-full px-2 py-0.5 text-[9px] font-bold"
              style={{ background: `${accent}26`, color: accent }}
            >
              ACTIVE
            </div>
          </div>
          <div className="grid grid-cols-3 gap-1.5">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="rounded-md border border-white/10 bg-white/[0.04] p-1.5"
              >
                <div className="h-1 w-6 rounded-full bg-white/15" />
                <div className="mt-1 h-2 w-10 rounded-full" style={{ background: accent, opacity: 0.6 }} />
              </div>
            ))}
          </div>
          <div className="space-y-1 pt-1">
            {[70, 50, 85].map((w, i) => (
              <div key={i} className="h-1.5 rounded-full bg-white/10">
                <div
                  className="h-full rounded-full"
                  style={{ width: `${w}%`, background: accent, opacity: 0.75 }}
                />
              </div>
            ))}
          </div>
          <div className="flex items-center gap-1 pt-1 text-[9px] text-white/50">
            <Activity className="h-3 w-3" style={{ color: accent }} />
            <span>Live monitoring</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function SystemCard({ system, onOpen }: { system: SystemItem; onOpen: () => void }) {
  const { Icon, name, tagline, accent, gradient } = system;
  return (
    <button
      onClick={onOpen}
      className="group w-full rounded-2xl border border-[var(--line)] bg-white p-4 text-right shadow-sm transition hover:-translate-y-1 hover:border-[var(--brand)]/40 hover:shadow-[0_18px_40px_-20px_color-mix(in_oklab,var(--brand)_30%,transparent)]"
    >
      <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-bl from-[var(--purple)] to-[var(--purple-dark)] p-3`}>
        <SystemMock system={system} />
      </div>
      <div className="mt-4 flex items-center gap-3 px-1">
        <div
          className="flex h-10 w-10 items-center justify-center rounded-xl"
          style={{ background: `${accent}22`, color: accent }}
        >
          <Icon className="h-5 w-5" strokeWidth={2.2} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="truncate text-sm font-bold text-[var(--purple)]">{name}</div>
          <div className="truncate text-[11px] text-[var(--ink-soft)]">{tagline}</div>
        </div>
        <ServerCog className="h-4 w-4 text-[var(--ink-soft)] transition group-hover:text-[var(--brand)]" />
      </div>
    </button>
  );
}

export function SystemDialogContent({ system }: { system: SystemItem }) {
  return (
    <>
      <div
        className={`relative overflow-hidden rounded-t-3xl bg-gradient-to-bl from-[var(--purple)] to-[var(--purple-dark)] p-8`}
      >
        <SystemMock system={system} large />
      </div>
      <div className="space-y-5 p-8 pt-6">
        <div className="space-y-2 text-right">
          <div className="text-xs font-bold tracking-widest text-[var(--brand)]">
            {system.tagline}
          </div>
          <h2 className="text-2xl font-black text-[var(--purple)]">{system.name}</h2>
          <p className="text-base leading-loose text-[var(--ink-soft)]">{system.description}</p>
        </div>
        <div className="grid grid-cols-2 gap-3 border-t border-[var(--line)] pt-5">
          {system.metrics.map((m) => (
            <div key={m.label} className="rounded-2xl border border-[var(--line)] bg-[oklch(0.98_0.005_270)] p-4">
              <div className="text-[11px] tracking-wider text-[var(--ink-soft)]">{m.label}</div>
              <div className="mt-1 text-lg font-bold text-[var(--purple)]">{m.value}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
