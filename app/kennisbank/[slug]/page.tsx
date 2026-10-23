import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ARTICLES_DATA } from '../../../src/data/articles';
import { 
  ArrowLeft, 
  Clock, 
  Calendar, 
  User, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight,
  ChevronRight,
  Share2
} from 'lucide-react';

export function generateStaticParams() {
  return ARTICLES_DATA.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = ARTICLES_DATA.find((a) => a.slug === slug);

  if (!article) {
    return { title: 'Artikel | Samen Online Kennisbank' };
  }

  return {
    title: `${article.title} | Samen Online Kennisbank`,
    description: article.excerpt,
    alternates: {
      canonical: `https://samenonline-web.github.io/kennisbank/${article.slug}`,
    },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: 'article',
      publishedTime: article.publishedAt,
      authors: [article.author],
      url: `https://samenonline-web.github.io/kennisbank/${article.slug}`,
    },
  };
}

export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = ARTICLES_DATA.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    author: {
      '@type': 'Person',
      name: article.author,
    },
    datePublished: article.publishedAt,
    publisher: {
      '@type': 'Organization',
      name: 'Samen Online Webdesign',
      url: 'https://samenonline-web.github.io',
    },
  };

  const otherArticles = ARTICLES_DATA.filter((a) => a.slug !== article.slug);

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-slate-950 text-stone-900 dark:text-stone-100 selection:bg-orange-500 selection:text-white">
      {/* Schema.org Article Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Header */}
      <header className="border-b border-slate-200/80 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <nav className="flex items-center gap-2 text-xs font-semibold text-stone-600 dark:text-slate-400 truncate">
            <Link
              href="/kennisbank"
              className="hover:text-orange-600 dark:hover:text-orange-400 transition-colors flex items-center gap-1.5 shrink-0"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Kennisbank</span>
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-stone-400 shrink-0" />
            <span className="text-orange-600 dark:text-orange-400 font-bold truncate">
              {article.category}
            </span>
          </nav>

          <Link
            href="/#website-vragenlijst"
            className="px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-500 text-white text-xs font-black transition-all shadow-xs shrink-0 ml-4"
          >
            Start Vragenlijst
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-10">
        {/* ARTICLE HEADER */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-950 text-orange-800 dark:text-orange-300">
              {article.category}
            </span>
            <span className="text-xs text-stone-500 dark:text-slate-400 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              <span>{article.readTime}</span>
            </span>
            <span className="text-xs text-stone-500 dark:text-slate-400 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              <span>{article.publishedAt}</span>
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-stone-900 dark:text-white tracking-tight leading-tight">
            {article.title}
          </h1>

          <div className="flex items-center gap-2 pt-1 text-xs text-stone-600 dark:text-slate-400 font-medium border-b border-slate-200/80 dark:border-slate-800 pb-6">
            <User className="w-4 h-4 text-orange-600" />
            <span>Geschreven door <strong>{article.author}</strong></span>
          </div>
        </div>

        {/* KEY TAKEAWAYS BOX */}
        <div className="bg-orange-50/70 dark:bg-orange-950/40 p-6 sm:p-8 rounded-3xl border border-orange-200 dark:border-orange-800/60 space-y-3">
          <span className="text-xs font-black uppercase tracking-wider text-orange-800 dark:text-orange-300 block">
            💡 De Belangrijkste Inzichten Samengevat:
          </span>
          <ul className="space-y-2.5">
            {article.keyTakeaways.map((point, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-stone-800 dark:text-slate-200 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* ARTICLE BODY */}
        <div className="prose prose-stone dark:prose-invert max-w-none space-y-6 text-sm sm:text-base text-stone-700 dark:text-slate-300 leading-relaxed font-normal">
          {article.content.map((paragraph, index) => (
            <p key={index} className="leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>

        {/* AUTHOR & CTA BOX */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-md space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-black text-stone-900 dark:text-white">
                Wil je dit toepassen op jouw eigen website?
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 dark:text-slate-300 font-medium mt-1">
                Laat binnen 5 werkdagen een moderne, razendsnelle Next.js website bouwen vanaf €195 all-in.
              </p>
            </div>
            <Link
              href="/#website-vragenlijst"
              className="px-6 py-3 rounded-2xl bg-orange-600 hover:bg-orange-500 text-white font-black text-xs transition-all shadow-md shrink-0 flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Start Vragenlijst</span>
            </Link>
          </div>
        </div>

        {/* OTHER ARTICLES */}
        <div className="pt-8 border-t border-slate-200 dark:border-slate-800 space-y-4">
          <h3 className="text-sm font-black uppercase tracking-wider text-stone-500">
            Gerelateerde Gidsen uit de Kennisbank
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {otherArticles.slice(0, 4).map((other) => (
              <Link
                key={other.slug}
                href={`/kennisbank/${other.slug}`}
                className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-orange-500 transition-all group flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-bold text-orange-600 uppercase tracking-wider">
                    {other.category}
                  </span>
                  <h4 className="font-bold text-xs sm:text-sm text-stone-900 dark:text-white group-hover:text-orange-600 transition-colors mt-1">
                    {other.title}
                  </h4>
                </div>
                <div className="flex items-center justify-between pt-3 text-[11px] text-stone-400">
                  <span>{other.readTime}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-stone-400 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200/80 dark:border-slate-800 py-8 bg-white dark:bg-slate-900 text-center text-xs text-stone-500">
        <p>© 2026 Samen Online · Kennisbank Webdesign &amp; SEO voor MKB Nederland.</p>
      </footer>
    </div>
  );
}
