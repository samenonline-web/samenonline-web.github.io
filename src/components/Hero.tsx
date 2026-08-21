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
    { label: '🛒 Webshops & E-commerce', category: 'Webshops & E-commerce', query: '' },
    { label: '🚀 SaaS & Tech', category: 'Tech & SaaS', query: '' },
    { label: '🎨 Creatief & Bureau', category: 'Creative & Agencies', query: '' },
    { label: '🌱 Duurzaam & Groen', category: 'Sustainable & Green', query: '' },
    { label: '🥐 Horeca & Ambacht', category: 'Food & Hospitality', query: '' },
  ];

  return (
    <section className="bg-white py-14 lg:py-18 border-b border-orange-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-50 border border-orange-200 text-orange-800 font-extrabold text-xs mb-6">
          <Sparkles className="w-3.5 h-3.5 text-orange-600" />
          <span>
            {lang === 'nl' 
              ? 'Samen Online • Website Concepts & Templates' 
              : 'Samen Online • Website Concepts & Templates'}
          </span>
        </div>

        {/* Hero Title (Solid, crisp, friendly typography) */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight mb-6">
          {lang === 'nl' ? (
            <>
              Originele <span className="text-orange-600">Website Concepts</span> voor Nederlandse bedrijven
            </>
          ) : (
            <>
              Original <span className="text-orange-600">Website Concepts</span> for Dutch web projects
            </>
          )}
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto mb-8 leading-relaxed font-normal">
          {lang === 'nl'
            ? 'Bekijk onze kant-en-klare webdesign concepten voor Nederlandse webwinkels, creatieve bureaus, duurzame initiatieven en SaaS platforms. Volledig op maat aanpasbaar!'
            : 'Explore our tailor-made website concepts for Dutch e-commerce, agencies, sustainable ventures, and tech startups. Built for conversion & compliance!'}
        </p>

        {/* Hero Search Box */}
        <div className="max-w-2xl mx-auto bg-white p-2.5 rounded-2xl border-2 border-orange-100 shadow-lg shadow-orange-500/5 flex flex-col sm:flex-row items-center gap-2 mb-8">
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
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-transparent text-slate-900 placeholder-slate-400 font-medium focus:outline-none text-sm sm:text-base"
            />
          </div>
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="text-xs text-orange-600 hover:text-orange-800 px-3 py-1 font-bold cursor-pointer"
            >
              {lang === 'nl' ? 'Wis' : 'Clear'}
            </button>
          )}
        </div>

        {/* Quick Filter Tag Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 max-w-3xl mx-auto">
          <span className="text-xs font-semibold text-slate-500 mr-1">
            {lang === 'nl' ? 'Filter op type:' : 'Filter by type:'}
          </span>
          {quickTags.map((tag, idx) => (
            <button
              key={idx}
              onClick={() => {
                if (tag.category !== 'All') onSelectCategory(tag.category);
                if (tag.query) onSearchChange(tag.query);
              }}
              className="px-3.5 py-1.5 rounded-xl bg-orange-50/70 hover:bg-orange-100 border border-orange-200/80 text-orange-950 text-xs font-bold transition-all cursor-pointer shadow-2xs hover:border-orange-300"
            >
              {tag.label}
            </button>
          ))}
        </div>

      </div>
    </section>
  );
};
