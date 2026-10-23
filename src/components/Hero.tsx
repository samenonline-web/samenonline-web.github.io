'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Search, Sparkles, ArrowRight, Zap, ShieldCheck, Clock } from 'lucide-react';
import { CategoryType, Language } from '../types/company';

interface HeroProps {
  lang: Language;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: CategoryType;
  onSelectCategory: (category: CategoryType) => void;
}

export const Hero: React.FC<HeroProps> = ({
  lang,
  searchQuery,
  onSearchChange,
  selectedCategory,
  onSelectCategory,
}) => {
  const [mounted, setMounted] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Stagger mount for entrance animations
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  const quickTags: { label: string; category: CategoryType }[] = [
    { label: '🏗️ Bouw & Diensten', category: 'Local Services & Healthcare' },
    { label: '🍽️ Horeca', category: 'Food & Hospitality' },
    { label: '🛒 Webshops', category: 'Webshops & E-commerce' },
    { label: '⚖️ Bureaus', category: 'Creative & Agencies' },
    { label: '🚀 SaaS & Tech', category: 'Tech & SaaS' },
    { label: '🌱 Duurzaam', category: 'Sustainable & Green' },
  ];

  const scrollToTemplates = () => {
    const el = document.getElementById('filter-section') || document.getElementById('templates-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative overflow-hidden bg-white dark:bg-[#080D1A] transition-colors border-b border-slate-200/70 dark:border-slate-800/80">
      {/* ── Background mesh gradients ── */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Soft slate-blue/orange radial top-left */}
        <div className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full bg-orange-500/5 dark:bg-blue-600/10 blur-3xl" />
        {/* Subtle indigo bottom-right */}
        <div className="absolute -bottom-24 right-0 w-[500px] h-[500px] rounded-full bg-slate-300/20 dark:bg-indigo-600/10 blur-3xl" />
        {/* Subtle grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03]"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg,transparent,transparent 39px,#64748b 39px,#64748b 40px),repeating-linear-gradient(90deg,transparent,transparent 39px,#64748b 39px,#64748b 40px)',
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-10 lg:pt-20 lg:pb-14">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* ── LEFT: Copy ── */}
          <div
            className={`transition-all duration-700 ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            {/* Eyebrow badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-50 dark:bg-blue-950/60 border border-orange-200/80 dark:border-blue-800/50 text-orange-800 dark:text-blue-300 font-extrabold text-xs mb-6 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-orange-500 dark:text-blue-400" />
              <span>Samen Online — Website Concepts voor Nederland</span>
            </div>

            {/* Headline — typographic contrast */}
            <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-black text-stone-900 dark:text-white tracking-tight leading-[1.05] mb-5">
              {lang === 'nl' ? (
                <>
                  Originele{' '}
                  <span className="relative inline-block">
                    <span className="relative z-10 text-orange-700 dark:text-blue-400">Website Concepts</span>
                    {/* underline accent */}
                    <span
                      aria-hidden
                      className="absolute bottom-0 left-0 right-0 h-[4px] rounded-full bg-gradient-to-r from-orange-500 to-amber-400 dark:from-blue-500 dark:to-cyan-400 opacity-60"
                    />
                  </span>
                  <br />
                  <span className="font-thin text-stone-400 dark:text-slate-500 text-3xl sm:text-4xl lg:text-[2.8rem]">
                    voor Nederlandse bedrijven
                  </span>
                </>
              ) : (
                <>
                  Original{' '}
                  <span className="relative inline-block">
                    <span className="relative z-10 text-orange-700 dark:text-blue-400">Website Concepts</span>
                    <span
                      aria-hidden
                      className="absolute bottom-0 left-0 right-0 h-[4px] rounded-full bg-gradient-to-r from-orange-500 to-amber-400 dark:from-blue-500 dark:to-cyan-400 opacity-60"
                    />
                  </span>
                  <br />
                  <span className="font-thin text-stone-400 dark:text-slate-500 text-3xl sm:text-4xl lg:text-[2.8rem]">
                    for Dutch businesses
                  </span>
                </>
              )}
            </h1>

            {/* 3 benefit pills */}
            <div className="flex flex-wrap gap-2.5 mb-6">
              {[
                { icon: <Zap className="w-3.5 h-3.5" />, label: lang === 'nl' ? '100/100 Vitals' : '100/100 Vitals' },
                { icon: <Clock className="w-3.5 h-3.5" />, label: lang === 'nl' ? '2–5 dagen live' : '2–5 days live' },
                { icon: <ShieldCheck className="w-3.5 h-3.5" />, label: lang === 'nl' ? '100% jouw eigendom' : '100% your ownership' },
              ].map((b) => (
                <div
                  key={b.label}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-100 dark:bg-slate-800/80 text-stone-700 dark:text-slate-300 text-xs font-bold border border-stone-200 dark:border-slate-700"
                >
                  <span className="text-orange-600 dark:text-blue-400">{b.icon}</span>
                  {b.label}
                </div>
              ))}
            </div>

            <p className="text-base sm:text-lg text-stone-600 dark:text-slate-300 max-w-lg mb-7 leading-relaxed">
              {lang === 'nl'
                ? 'Bekijk interactieve voorbeeldconcepten ter inspiratie. Elk ontwerp wordt 100% op maat ingericht voor jouw bedrijf — geen abonnement, geen verborgen kosten.'
                : 'Explore interactive showcase concepts for your project. Every layout is customised entirely for your brand — no subscriptions, no hidden costs.'}
            </p>

            {/* Search bar — full width on mobile, max 480px on desktop */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                scrollToTemplates();
              }}
              className="flex items-center gap-2 p-2 rounded-2xl bg-white dark:bg-slate-900/90 border-2 border-orange-100 dark:border-slate-700 shadow-lg shadow-orange-500/5 mb-6 max-w-lg"
            >
              <div className="relative flex-1 flex items-center">
                <Search className="w-4.5 h-4.5 text-orange-500 dark:text-blue-400 absolute left-3.5 pointer-events-none" />
                <input
                  ref={searchRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  placeholder={
                    lang === 'nl'
                      ? 'Zoek op branche of concept...'
                      : 'Search by industry or concept...'
                  }
                  className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-transparent text-stone-900 dark:text-white placeholder-stone-400 dark:placeholder-slate-500 font-medium focus:outline-none text-sm"
                />
              </div>
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => onSearchChange('')}
                  className="text-xs text-stone-500 dark:text-slate-400 hover:text-stone-700 dark:hover:text-slate-200 px-2 font-bold cursor-pointer transition-colors"
                >
                  ✕
                </button>
              )}
              <button
                type="submit"
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-orange-700 dark:bg-blue-600 hover:bg-orange-800 dark:hover:bg-blue-500 text-white font-bold text-xs shadow-md shadow-orange-700/20 dark:shadow-blue-900/30 transition-all cursor-pointer whitespace-nowrap"
              >
                {lang === 'nl' ? 'Zoeken' : 'Search'}
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>

            {/* Quick category pills */}
            <div className="flex flex-wrap gap-2">
              <span className="text-xs font-bold text-stone-400 dark:text-slate-500 self-center mr-0.5">
                {lang === 'nl' ? 'Snel filter:' : 'Quick filter:'}
              </span>
              {quickTags.map((tag, idx) => {
                const isActive = selectedCategory === tag.category;
                return (
                  <button
                    key={idx}
                    onClick={() => {
                      onSelectCategory(isActive ? 'All' : tag.category);
                      scrollToTemplates();
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                      isActive
                        ? 'bg-orange-700 dark:bg-blue-600 text-white border-orange-700 dark:border-blue-600 shadow-sm scale-105'
                        : 'bg-orange-50/80 dark:bg-slate-800/60 text-stone-700 dark:text-slate-300 border-orange-200/70 dark:border-slate-700 hover:bg-orange-100 dark:hover:bg-slate-700 hover:border-orange-300'
                    }`}
                  >
                    {tag.label}
                  </button>
                );
              })}
            </div>

            {/* Disclaimer */}
            <div className="mt-5 flex items-center gap-1.5 text-xs text-stone-400 dark:text-slate-500 font-medium">
              <span>💡</span>
              <span>
                {lang === 'nl'
                  ? 'Alle getoonde bedrijfsnamen en sjablonen zijn fictieve voorbeeldconcepten.'
                  : 'All company names and templates are fictional showcase concepts.'}
              </span>
            </div>
          </div>

          {/* ── RIGHT: Visual mockup stack ── */}
          <div
            className={`hidden lg:flex items-center justify-center transition-all duration-700 delay-150 ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <div className="relative w-full max-w-sm xl:max-w-md">
              {/* Back card */}
              <div className="absolute -top-4 -right-4 w-full h-full rounded-3xl bg-gradient-to-br from-amber-100 to-orange-100 dark:from-slate-800 dark:to-slate-700 border-2 border-orange-200/50 dark:border-slate-600 rotate-3 shadow-sm" />
              {/* Middle card */}
              <div className="absolute -top-2 -right-2 w-full h-full rounded-3xl bg-gradient-to-br from-orange-50 to-amber-50 dark:from-slate-900 dark:to-slate-800 border-2 border-orange-200/70 dark:border-slate-700 rotate-1 shadow-md" />
              {/* Front card — browser mockup */}
              <div className="relative rounded-3xl bg-white dark:bg-slate-900 border-2 border-orange-200 dark:border-slate-700 shadow-2xl shadow-orange-500/10 dark:shadow-blue-900/20 overflow-hidden">
                {/* Browser bar */}
                <div className="bg-slate-700 dark:bg-slate-800 px-4 py-3 flex items-center gap-2 border-b border-slate-600 dark:border-slate-700">
                  <div className="flex gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-rose-400" />
                    <span className="w-3 h-3 rounded-full bg-amber-400" />
                    <span className="w-3 h-3 rounded-full bg-emerald-400" />
                  </div>
                  <div className="flex-1 bg-slate-600/80 dark:bg-slate-700/80 rounded-lg px-3 py-1 text-[11px] font-mono text-slate-300 truncate">
                    samenonline.nl
                  </div>
                  <span className="text-[10px] font-bold text-orange-300 dark:text-blue-400 shrink-0">100/100</span>
                </div>
                {/* Content preview */}
                <div className="p-5">
                  {/* Fake headline skeleton */}
                  <div className="h-5 w-3/4 bg-stone-900 dark:bg-white rounded-md mb-2" />
                  <div className="h-3 w-full bg-stone-200 dark:bg-slate-700 rounded mb-1" />
                  <div className="h-3 w-5/6 bg-stone-200 dark:bg-slate-700 rounded mb-4" />
                  {/* Fake button */}
                  <div className="h-9 w-32 bg-orange-600 dark:bg-blue-600 rounded-xl mb-4" />
                  {/* Fake cards row */}
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { h: '48px', bg: 'bg-orange-50 dark:bg-slate-800', border: 'border-orange-200 dark:border-slate-700' },
                      { h: '48px', bg: 'bg-amber-50 dark:bg-slate-800', border: 'border-amber-200 dark:border-slate-700' },
                      { h: '48px', bg: 'bg-stone-50 dark:bg-slate-800', border: 'border-stone-200 dark:border-slate-700' },
                    ].map((c, i) => (
                      <div key={i} className={`rounded-xl border ${c.bg} ${c.border}`} style={{ height: c.h }} />
                    ))}
                  </div>
                  {/* Performance bar */}
                  <div className="mt-4 flex items-center gap-2">
                    <span className="text-[10px] font-bold text-stone-500 dark:text-slate-400 whitespace-nowrap">PageSpeed</span>
                    <div className="flex-1 h-2 bg-stone-100 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div className="h-full w-[95%] bg-gradient-to-r from-orange-500 to-amber-400 dark:from-blue-500 dark:to-cyan-400 rounded-full" />
                    </div>
                    <span className="text-[10px] font-black text-emerald-600 dark:text-emerald-400">100</span>
                  </div>
                </div>
                {/* Bottom CTA strip */}
                <div className="px-5 pb-5">
                  <div className="h-10 w-full bg-orange-700 dark:bg-blue-600 rounded-xl flex items-center justify-center">
                    <span className="text-white text-xs font-bold">Bekijk Live Demo →</span>
                  </div>
                </div>
              </div>

              {/* Floating stat bubbles */}
              <div className="absolute -top-5 -left-6 bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-orange-100 dark:border-slate-700 px-3 py-2 flex items-center gap-2 text-xs font-black text-stone-900 dark:text-white">
                <span className="text-emerald-500 text-base">✓</span>
                <div>
                  <div className="text-sm">40+</div>
                  <div className="text-[10px] text-stone-500 dark:text-slate-400 font-medium">Concepten</div>
                </div>
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-orange-100 dark:border-slate-700 px-3 py-2 flex items-center gap-2 text-xs font-black">
                <span className="text-2xl">⚡</span>
                <div>
                  <div className="text-sm text-stone-900 dark:text-white">2–5 dagen</div>
                  <div className="text-[10px] text-stone-500 dark:text-slate-400 font-medium">Bouwtijd</div>
                </div>
              </div>
              <div className="absolute -bottom-4 right-2 bg-orange-700 dark:bg-blue-600 text-white rounded-2xl shadow-lg px-3 py-2 text-xs font-black">
                <div className="text-sm">iDEAL</div>
                <div className="text-[10px] opacity-80 font-medium">Ready</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Existing site redesign banner — clean, compact ribbon */}
      <div className="relative bg-slate-50 dark:bg-slate-900/90 border-t border-slate-200/80 dark:border-slate-800 transition-colors">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-orange-100 dark:bg-blue-950/80 text-orange-600 dark:text-blue-400 flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <span className="font-semibold text-stone-700 dark:text-slate-300 text-xs sm:text-sm">
              {lang === 'nl'
                ? 'Heb je al een bestaande site of eigen Figma schets? Wij migreren naar bliksemsnelle Next.js.'
                : 'Already have an existing site or Figma wireframe? We migrate to blazing-fast Next.js.'}
            </span>
          </div>
          <button
            type="button"
            onClick={() => {
              const el = document.getElementById('waarom-nextjs');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="shrink-0 px-3.5 py-1.5 rounded-xl bg-white dark:bg-slate-800 text-orange-700 dark:text-orange-400 border border-slate-200 dark:border-slate-700 font-extrabold text-xs shadow-2xs hover:bg-orange-50 dark:hover:bg-slate-700 transition-all cursor-pointer whitespace-nowrap"
          >
            {lang === 'nl' ? 'Redesign Scan Aanvragen →' : 'Request Redesign Scan →'}
          </button>
        </div>
      </div>
    </section>
  );
};
