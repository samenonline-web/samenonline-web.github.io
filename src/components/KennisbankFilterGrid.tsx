'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { ArticleItem } from '../data/articles';
import { Search, Clock, ArrowRight, X, Sparkles, Filter } from 'lucide-react';

interface KennisbankFilterGridProps {
  articles: ArticleItem[];
}

export const KennisbankFilterGrid: React.FC<KennisbankFilterGridProps> = ({ articles }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('alles');

  // Extract unique categories
  const categories = useMemo(() => {
    const cats = Array.from(new Set(articles.map((a) => a.category)));
    return ['alles', ...cats];
  }, [articles]);

  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      const matchesCategory =
        selectedCategory === 'alles' ||
        article.category.toLowerCase() === selectedCategory.toLowerCase();

      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !query ||
        article.title.toLowerCase().includes(query) ||
        article.excerpt.toLowerCase().includes(query) ||
        article.keyTakeaways.some((t) => t.toLowerCase().includes(query)) ||
        article.content.some((c) => c.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });
  }, [articles, selectedCategory, searchQuery]);

  return (
    <div className="space-y-8">
      {/* Search and Filters Bar */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-6 border border-slate-200/90 dark:border-slate-800 shadow-md space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Zoek in 10 gidsen (bijv. Google SEO, laadtijd, prijzen, AVG)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-10 py-3 rounded-2xl bg-stone-50 dark:bg-slate-800 border border-stone-200 dark:border-slate-700 text-xs sm:text-sm font-semibold text-stone-900 dark:text-white placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-orange-500/30 transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 p-1 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Results count pill */}
          <div className="text-xs font-bold text-stone-500 dark:text-slate-400 shrink-0 self-center">
            {filteredArticles.length} van {articles.length} artikelen gevonden
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-slate-100 dark:border-slate-800">
          <span className="text-[11px] font-black uppercase tracking-wider text-stone-400 flex items-center gap-1 mr-1">
            <Filter className="w-3.5 h-3.5" />
            Categorie:
          </span>
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                type="button"
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all capitalize cursor-pointer ${
                  isSelected
                    ? 'bg-orange-600 text-white shadow-xs'
                    : 'bg-stone-100 dark:bg-slate-800 text-stone-600 dark:text-slate-300 hover:bg-stone-200 dark:hover:bg-slate-700'
                }`}
              >
                {cat === 'alles' ? 'Alle Thema’s' : cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Articles Grid */}
      {filteredArticles.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-12 text-center border border-slate-200 dark:border-slate-800 space-y-4 max-w-md mx-auto">
          <Search className="w-10 h-10 text-stone-300 dark:text-slate-600 mx-auto" />
          <h3 className="font-black text-lg text-stone-900 dark:text-white">Geen artikelen gevonden</h3>
          <p className="text-xs text-stone-500 dark:text-slate-400">
            Er zijn geen gidsen die overeenkomen met je zoekopdracht &ldquo;{searchQuery}&rdquo;.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('alles');
            }}
            className="px-4 py-2 rounded-xl bg-orange-600 text-white text-xs font-bold hover:bg-orange-500 cursor-pointer shadow-xs"
          >
            Filters resetten
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article) => (
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
        </div>
      )}
    </div>
  );
};
