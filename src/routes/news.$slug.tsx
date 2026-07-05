import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Calendar } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import WhatsAppWidget from "@/components/WhatsAppWidget";
import { getNews, news } from "@/lib/news";

export const Route = createFileRoute("/news/$slug")({
  loader: ({ params }) => {
    const item = getNews(params.slug);
    if (!item) throw notFound();
    return item;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.title} — LamhaSec` },
          { name: "description", content: loaderData.excerpt },
          { property: "og:title", content: loaderData.title },
          { property: "og:description", content: loaderData.excerpt },
          { property: "og:image", content: loaderData.image },
        ]
      : [],
  }),
  notFoundComponent: () => (
    <div className="min-h-screen font-arabic bg-white text-[var(--ink)]" dir="rtl">
      <SiteHeader active="home" />
      <div className="mx-auto max-w-2xl px-5 py-32 text-center">
        <h1 className="text-3xl font-black text-[var(--purple)]">الخبر غير موجود</h1>
        <Link to="/" className="mt-6 inline-flex items-center gap-2 text-[var(--brand)] font-bold">
          <ArrowLeft className="h-4 w-4" /> العودة للرئيسية
        </Link>
      </div>
      <SiteFooter />
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="p-10 text-center" dir="rtl">حدث خطأ: {error.message}</div>
  ),
  component: NewsDetail,
});

function NewsDetail() {
  const item = Route.useLoaderData();
  const others = news.filter((n) => n.slug !== item.slug).slice(0, 2);

  return (
    <div className="min-h-screen font-arabic bg-white text-[var(--ink)]" dir="rtl">
      <SiteHeader active="home" />

      <article className="mx-auto max-w-[1000px] px-5 py-12 md:px-10 md:py-16">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-bold text-[var(--brand)] hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          العودة إلى الأخبار
        </Link>

        <div className="mt-6 flex items-center gap-3">
          <span className="rounded bg-[var(--brand)] px-3 py-1 text-xs font-bold text-white">
            {item.tag}
          </span>
          <span className="inline-flex items-center gap-1 text-sm text-[var(--ink-soft)]">
            <Calendar className="h-4 w-4" />
            {item.date}
          </span>
        </div>

        <h1 className="mt-4 text-3xl font-black leading-tight text-[var(--purple)] md:text-5xl">
          {item.title}
        </h1>

        <div className="mt-8 overflow-hidden rounded-2xl border border-[var(--line)]">
          <img
            src={item.image}
            alt={item.title}
            width={1024}
            height={1024}
            className="h-auto w-full object-cover"
          />
        </div>

        <div className="prose prose-lg mt-8 max-w-none space-y-5 text-base leading-loose text-[var(--ink)] md:text-lg">
          {item.content.map((p: string, i: number) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </article>

      {others.length > 0 && (
        <section className="border-t border-[var(--line)] bg-[oklch(0.98_0.005_270)] py-14">
          <div className="mx-auto max-w-[1200px] px-5 md:px-10">
            <h2 className="mb-8 text-2xl font-black text-[var(--purple)]">أخبار ذات صلة</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {others.map((n) => (
                <Link
                  key={n.slug}
                  to="/news/$slug"
                  params={{ slug: n.slug }}
                  className="group overflow-hidden rounded-2xl border border-[var(--line)] bg-white shadow-sm transition hover:shadow-lg"
                >
                  <div className="h-44 overflow-hidden">
                    <img
                      src={n.image}
                      alt={n.title}
                      loading="lazy"
                      width={1024}
                      height={1024}
                      className="h-full w-full object-cover transition group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5">
                    <span className="rounded bg-[var(--brand)]/10 px-2 py-0.5 text-xs font-bold text-[var(--brand)]">
                      {n.tag}
                    </span>
                    <h3 className="mt-3 text-lg font-bold text-[var(--purple)]">{n.title}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <SiteFooter />
      <WhatsAppWidget />
    </div>
  );
}