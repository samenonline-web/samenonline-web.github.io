'use client';

import React from 'react';
import { Search, Sparkles } from 'lucide-react';
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
  const quickTags: { label: string; category: CategoryType; query: string }[] = [
    { label: '🏗️ Bouw & Lokale Diensten', category: 'Local Services & Healthcare', query: '' },
    { label: '🍽️ Horeca & Restaurant', category: 'Food & Hospitality', query: '' },
    { label: '🛒 Webshops & E-commerce', category: 'Webshops & E-commerce', query: '' },
    { label: '⚖️ Boekhouding & Bureaus', category: 'Creative & Agencies', query: '' },
    { label: '🚀 SaaS & Tech', category: 'Tech & SaaS', query: '' },
    { label: '🌱 Duurzaam & Energie', category: 'Sustainable & Green', query: '' },
  ];

  return (
    <section className="bg-white dark:bg-[#07090e] py-14 lg:py-18 border-b border-orange-100 dark:border-slate-800 transition-colors">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-50 dark:bg-orange-950/70 border border-orange-200 dark:border-orange-800/60 text-orange-800 dark:text-orange-300 font-extrabold text-xs mb-6">
          <Sparkles className="w-3.5 h-3.5 text-orange-600" />
          <span>
            {lang === 'nl' 
              ? 'Samen Online • Website Concepts & Templates' 
              : 'Samen Online • Website Concepts & Templates'}
          </span>
        </div>

        {/* Hero Title (Solid, crisp, friendly typography) */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-stone-900 dark:text-white tracking-tight leading-tight mb-6">
          {lang === 'nl' ? (
            <>
              Originele <span className="text-orange-700 dark:text-orange-500">Website Concepts</span> voor Nederlandse bedrijven
            </>
          ) : (
            <>
              Original <span className="text-orange-700 dark:text-orange-500">Website Concepts</span> for Dutch web projects
            </>
          )}
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl text-stone-600 dark:text-slate-300 max-w-2xl mx-auto mb-4 leading-relaxed font-normal">
          {lang === 'nl'
            ? 'Bekijk onze interactieve voorbeeldconcepten ter inspiratie voor jouw eigen website. Alle ontwerpen zijn demonstratie-modellen en worden 100% op maat ingericht voor jouw eigen bedrijf!'
            : 'Explore our interactive showcase concepts for your web project. All layouts are demonstration models customized entirely for your brand!'}
        </p>

        {/* Transparency Disclaimer Badge */}
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-stone-100 dark:bg-slate-900 border border-stone-200 dark:border-slate-800 text-stone-600 dark:text-slate-400 text-xs font-medium mb-8">
          <span>💡</span>
          <span>
            {lang === 'nl'
              ? 'Transparantie: Alle getoonde bedrijfsnamen en sjablonen zijn fictieve voorbeeldconcepten.'
              : 'Transparency: All company names and templates are fictional showcase concepts.'}
          </span>
        </div>

        {/* Hero Search Box */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const element = document.getElementById('filter-section') || document.getElementById('templates-section');
            if (element) {
              element.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          className="max-w-2xl mx-auto bg-white dark:bg-slate-900/90 p-2.5 rounded-2xl border-2 border-orange-100 dark:border-slate-800 shadow-lg shadow-orange-500/5 flex flex-col sm:flex-row items-center gap-2 mb-8 backdrop-blur-md"
        >
          <div className="relative flex-1 w-full flex items-center">
            <Search className="w-5 h-5 text-orange-500 absolute left-4 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={
                lang === 'nl'
                  ? 'Zoek op concept, branche of zoekterm...'
                  : 'Search by concept, industry or keyword...'
              }
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-transparent text-stone-900 dark:text-white placeholder-stone-400 dark:placeholder-slate-400 font-medium focus:outline-none text-sm sm:text-base"
            />
          </div>
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className="text-xs text-orange-700 dark:text-orange-400 hover:text-orange-900 dark:hover:text-orange-300 px-3 py-1 font-bold cursor-pointer"
            >
              {lang === 'nl' ? 'Wis' : 'Clear'}
            </button>
          )}
          <button
            type="submit"
            className="w-full sm:w-auto px-5 py-3 rounded-xl bg-orange-700 hover:bg-orange-800 text-white font-bold text-xs shadow-md shadow-orange-700/20 transition-all cursor-pointer whitespace-nowrap"
          >
            {lang === 'nl' ? 'Bekijk Resultaten' : 'View Results'}
          </button>
        </form>

        {/* Quick Filter Tag Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 max-w-3xl mx-auto">
          <span className="text-xs font-bold text-stone-500 mr-1">
            {lang === 'nl' ? 'Filter op type:' : 'Filter by type:'}
          </span>
          {quickTags.map((tag, idx) => {
            const isActive = selectedCategory === tag.category;
            return (
              <button
                key={idx}
                onClick={() => {
                  const newCat = isActive ? 'All' : tag.category;
                  onSelectCategory(newCat);
                  if (tag.query) onSearchChange(tag.query);
                  const element = document.getElementById('filter-section') || document.getElementById('templates-section');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-2xs ${
                  isActive
                    ? 'bg-orange-700 text-white border border-orange-700 shadow-md scale-105'
                    : 'bg-orange-50/70 dark:bg-slate-900 hover:bg-orange-100 dark:hover:bg-slate-800 border border-orange-200/80 dark:border-slate-800 text-orange-950 dark:text-slate-200 hover:border-orange-300 dark:hover:border-slate-700'
                }`}
              >
                {tag.label}
              </button>
            );
          })}
        </div>

        {/* Quick Transition Redesign Card (Stitch Pattern) */}
        <div className="mt-8 max-w-3xl mx-auto p-4 sm:p-5 rounded-2xl bg-orange-50/70 dark:bg-slate-900 border border-orange-200/90 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-left shadow-xs">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-orange-100 dark:bg-orange-950/80 text-orange-700 dark:text-orange-400 flex items-center justify-center shrink-0 shadow-2xs">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="font-extrabold text-sm sm:text-base text-stone-900 dark:text-white block">
                {lang === 'nl' 
                  ? 'Heb je al een bestaande website of een eigen Figma schets?' 
                  : 'Already have an existing site or your own custom plan?'}
              </span>
              <span className="text-xs text-stone-600 dark:text-slate-400 font-medium">
                {lang === 'nl'
                  ? 'Wij migreren jouw inhoud zonder rankingverlies naar bliksemsnelle Next.js technologie.'
                  : 'We migrate your content without losing Google ranking to lightning-fast Next.js.'}
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              const el = document.getElementById('waarom-nextjs');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="shrink-0 px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 text-orange-700 dark:text-orange-400 border border-orange-200 dark:border-slate-700 hover:border-orange-300 dark:hover:border-slate-600 font-extrabold text-xs shadow-xs hover:bg-orange-50 dark:hover:bg-slate-700 transition-all cursor-pointer whitespace-nowrap"
          >
            {lang === 'nl' ? 'Vraag Redesign Scan Aan →' : 'Request Redesign Scan →'}
          </button>
        </div>

      </div>
    </section>
  );
};
