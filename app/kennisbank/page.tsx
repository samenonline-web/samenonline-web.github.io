import type { Metadata } from 'next';
import Link from 'next/link';
import { ARTICLES_DATA } from '../../src/data/articles';
import { 
  BookOpen, 
  ArrowLeft, 
  Clock, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  ChevronRight,
  Search
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Kennisbank Webdesign & SEO | Eerlijk Advies voor MKB | Samen Online',
  description: 'Praktische gidsen en eerlijke antwoorden over webdesign kosten, Next.js voordelen, Google SEO en iDEAL webshops voor Nederlandse ondernemers.',
  alternates: {
    canonical: 'https://samenonline-web.github.io/kennisbank',
  },
};

export default function KnowledgeBasePage() {
  return (
    <div className="min-h-screen bg-stone-50 dark:bg-slate-950 text-stone-900 dark:text-stone-100 selection:bg-orange-500 selection:text-white">
      {/* Header */}
      <header className="border-b border-slate-200/80 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <nav className="flex items-center gap-2 text-xs font-semibold text-stone-600 dark:text-slate-400">
            <Link
              href="/"
              className="hover:text-orange-600 dark:hover:text-orange-400 transition-colors flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Samen Online</span>
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
            <span className="text-orange-600 dark:text-orange-400 font-black">Kennisbank</span>
          </nav>

          <Link
            href="/#website-vragenlijst"
            className="px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-500 text-white text-xs font-black transition-all shadow-xs"
          >
            Start Vragenlijst
          </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-12">
        {/* HERO */}
        <section className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-100 dark:bg-orange-950/70 text-orange-800 dark:text-orange-300 border border-orange-200 dark:border-orange-800/60 text-xs font-black uppercase tracking-wider">
            <BookOpen className="w-4 h-4 text-orange-600 dark:text-orange-400" />
            <span>Kennisbank &amp; Advies</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-stone-900 dark:text-white tracking-tight">
            Eerlijke Gidsen over{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-600">
              Webdesign &amp; SEO
            </span>
          </h1>

          <p className="text-base sm:text-lg text-stone-600 dark:text-slate-300 font-medium">
            Geen vakjargon of verkooppraatjes, maar heldere uitleg over laadtijden, vaste tarieven, Google vindbaarheid en slimme technieken voor het Nederlandse MKB.
          </p>
        </section>

        {/* ARTICLES GRID */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ARTICLES_DATA.map((article) => (
            <article
              key={article.slug}
              className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/90 dark:border-slate-800 shadow-md hover:shadow-xl transition-all flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-orange-100 dark:bg-orange-950 text-orange-800 dark:text-orange-300">
                    {article.category}
                  </span>
                  <span className="text-xs text-stone-500 dark:text-slate-400 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{article.readTime}</span>
                  </span>
                </div>

                <h2 className="text-lg font-black text-stone-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors leading-snug">
                  <Link href={`/kennisbank/${article.slug}`}>
                    {article.title}
                  </Link>
                </h2>

                <p className="text-xs text-stone-600 dark:text-slate-300 leading-relaxed font-medium line-clamp-3">
                  {article.excerpt}
                </p>

                <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80">
                  <span className="text-[10px] font-bold text-stone-400 block mb-1">Kerninzicht:</span>
                  <p className="text-xs text-stone-800 dark:text-slate-200 font-semibold line-clamp-2">
                    💡 {article.keyTakeaways[0]}
                  </p>
                </div>
              </div>

              <div className="pt-6">
                <Link
                  href={`/kennisbank/${article.slug}`}
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-orange-50 hover:text-orange-600 dark:bg-slate-800 dark:hover:bg-slate-700 text-stone-900 dark:text-white text-xs font-bold transition-all flex items-center justify-between"
                >
                  <span>Lees Volledige Gids</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </section>

        {/* BOTTOM CTA */}
        <section className="bg-gradient-to-r from-orange-600 to-amber-600 rounded-3xl p-8 sm:p-12 text-white text-center space-y-4 shadow-xl">
          <span className="text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full bg-white/20 inline-block">
            Direct Zelf Ervaren?
          </span>
          <h2 className="text-2xl sm:text-4xl font-black">
            Krijg Binnen 2 Minuten een Vaste Prijsindicatie
          </h2>
          <p className="text-sm max-w-xl mx-auto opacity-90 font-medium">
            Beantwoord 5 korte vragen over jouw onderneming en ontdek welk website-concept het beste bij jouw doelen past.
          </p>
          <div className="pt-2">
            <Link
              href="/#website-vragenlijst"
              className="px-8 py-4 rounded-2xl bg-white text-orange-700 hover:bg-orange-50 font-black text-sm transition-all shadow-lg inline-flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Start de Vrijblijvende Vragenlijst</span>
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200/80 dark:border-slate-800 py-8 bg-white dark:bg-slate-900 text-center text-xs text-stone-500">
        <p>© 2026 Samen Online · Kennisbank Webdesign &amp; SEO voor Ondernemend Nederland.</p>
      </footer>
    </div>
  );
}
