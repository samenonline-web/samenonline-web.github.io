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
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-stone-900 tracking-tight leading-tight mb-6">
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
        <p className="text-lg sm:text-xl text-stone-600 max-w-2xl mx-auto mb-4 leading-relaxed font-normal">
          {lang === 'nl'
            ? 'Bekijk onze interactieve voorbeeldconcepten ter inspiratie voor jouw eigen website. Alle ontwerpen zijn demonstratie-modellen en worden 100% op maat ingericht voor jouw eigen bedrijf!'
            : 'Explore our interactive showcase concepts for your web project. All layouts are demonstration models customized entirely for your brand!'}
        </p>

        {/* Transparency Disclaimer Badge */}
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-stone-100 border border-stone-200 text-stone-600 text-xs font-medium mb-8">
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
          className="max-w-2xl mx-auto bg-white p-2.5 rounded-2xl border-2 border-orange-100 shadow-lg shadow-orange-500/5 flex flex-col sm:flex-row items-center gap-2 mb-8"
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
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-transparent text-stone-900 placeholder-stone-400 font-medium focus:outline-none text-sm sm:text-base"
            />
          </div>
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className="text-xs text-orange-600 hover:text-orange-800 px-3 py-1 font-bold cursor-pointer"
            >
              {lang === 'nl' ? 'Wis' : 'Clear'}
            </button>
          )}
          <button
            type="submit"
            className="w-full sm:w-auto px-5 py-3 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs shadow-md shadow-orange-600/20 transition-all cursor-pointer whitespace-nowrap"
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
                    ? 'bg-orange-600 text-white border border-orange-600 shadow-md scale-105'
                    : 'bg-orange-50/70 hover:bg-orange-100 border border-orange-200/80 text-orange-950 hover:border-orange-300'
                }`}
              >
                {tag.label}
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
};
