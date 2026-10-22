'use client';

import React from 'react';
import { ArrowUpDown, Scale, Clock, Sparkles, Zap, ShoppingCart, Calculator, Compass } from 'lucide-react';
import { CategoryType, Language } from '../types/company';

export type QuickFilterType = 'all' | 'popular' | 'fast' | 'ideal' | 'calculator';

interface FilterBarProps {
  lang: Language;
  selectedCategory: CategoryType;
  onSelectCategory: (category: CategoryType) => void;
  sortBy: 'rating' | 'name' | 'buildDays';
  onSortChange: (sort: 'rating' | 'name' | 'buildDays') => void;
  totalFilteredCount: number;
  onOpenComparator?: () => void;
  onOpenStatusTracker?: () => void;
  onOpenWizard?: () => void;
  activeQuickFilter: QuickFilterType;
  onQuickFilterChange: (filter: QuickFilterType) => void;
}

const CATEGORIES: CategoryType[] = [
  'All',
  'Webshops & E-commerce',
  'Tech & SaaS',
  'Creative & Agencies',
  'Sustainable & Green',
  'Food & Hospitality',
  'Local Services & Healthcare',
];

export const FilterBar: React.FC<FilterBarProps> = ({
  lang,
  selectedCategory,
  onSelectCategory,
  sortBy,
  onSortChange,
  totalFilteredCount,
  onOpenComparator,
  onOpenStatusTracker,
  onOpenWizard,
  activeQuickFilter,
  onQuickFilterChange,
}) => {
  const getCategoryName = (cat: CategoryType) => {
    if (lang === 'en') return cat;
    switch (cat) {
      case 'All': return 'Alle Concepten';
      case 'Webshops & E-commerce': return 'Webshops & E-commerce';
      case 'Tech & SaaS': return 'Tech & SaaS Platforms';
      case 'Creative & Agencies': return 'Creatief & Bureaus';
      case 'Sustainable & Green': return 'Duurzaam & Groen';
      case 'Food & Hospitality': return 'Horeca & Voeding';
      case 'Local Services & Healthcare': return 'Lokale Diensten & Zorg';
    }
  };

  return (
    <div id="filter-section" className="bg-white border-b border-orange-100 sticky top-20 z-30 shadow-xs py-4 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 scrollbar-none border-b border-orange-100/60 mb-3">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => onSelectCategory(cat)}
                className={`whitespace-nowrap px-4 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-orange-600 text-white shadow-md shadow-orange-600/20'
                    : 'bg-orange-50/60 text-stone-800 hover:bg-orange-100 border border-orange-100/80 hover:border-orange-200'
                }`}
              >
                {getCategoryName(cat)}
              </button>
            );
          })}
        </div>

        {/* Quick Filter Sneltoetsen & Status Tracker */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3 pb-2.5 border-b border-stone-100">
          <div className="flex flex-wrap items-center gap-1.5 text-[11px] font-bold">
            <span className="text-stone-400 mr-1 hidden sm:inline">Snelfilters:</span>
            
            <button
              type="button"
              onClick={() => onQuickFilterChange('all')}
              className={`px-3 py-1 rounded-xl transition-all cursor-pointer ${
                activeQuickFilter === 'all'
                  ? 'bg-stone-900 text-white shadow-2xs'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              Alle 16
            </button>

            <button
              type="button"
              onClick={() => onQuickFilterChange('popular')}
              className={`flex items-center gap-1 px-3 py-1 rounded-xl transition-all cursor-pointer ${
                activeQuickFilter === 'popular'
                  ? 'bg-amber-500 text-white shadow-2xs font-black'
                  : 'bg-amber-50 text-amber-900 border border-amber-200/80 hover:bg-amber-100'
              }`}
            >
              <span>⭐ Populairste Concepten</span>
            </button>

            <button
              type="button"
              onClick={() => onQuickFilterChange('fast')}
              className={`flex items-center gap-1 px-3 py-1 rounded-xl transition-all cursor-pointer ${
                activeQuickFilter === 'fast'
                  ? 'bg-emerald-600 text-white shadow-2xs font-black'
                  : 'bg-emerald-50 text-emerald-900 border border-emerald-200/80 hover:bg-emerald-100'
              }`}
            >
              <Zap className="w-3 h-3 text-emerald-600" />
              <span>Snelste Oplevering (≤ 4 dagen)</span>
            </button>

            <button
              type="button"
              onClick={() => onQuickFilterChange('ideal')}
              className={`flex items-center gap-1 px-3 py-1 rounded-xl transition-all cursor-pointer ${
                activeQuickFilter === 'ideal'
                  ? 'bg-sky-600 text-white shadow-2xs font-black'
                  : 'bg-sky-50 text-sky-900 border border-sky-200/80 hover:bg-sky-100'
              }`}
            >
              <ShoppingCart className="w-3 h-3 text-sky-600" />
              <span>iDEAL & Facturatie</span>
            </button>

            <button
              type="button"
              onClick={() => onQuickFilterChange('calculator')}
              className={`flex items-center gap-1 px-3 py-1 rounded-xl transition-all cursor-pointer ${
                activeQuickFilter === 'calculator'
                  ? 'bg-purple-600 text-white shadow-2xs font-black'
                  : 'bg-purple-50 text-purple-900 border border-purple-200/80 hover:bg-purple-100'
              }`}
            >
              <Calculator className="w-3 h-3 text-purple-600" />
              <span>Met Rekenmodule</span>
            </button>
          </div>

          {onOpenStatusTracker && (
            <button
              type="button"
              onClick={onOpenStatusTracker}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold border border-stone-300 transition-colors cursor-pointer text-[11px]"
            >
              <Clock className="w-3.5 h-3.5 text-stone-600" />
              <span>Mijn Website Status Tracker</span>
            </button>
          )}
        </div>

        {/* Secondary Filter Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
          
          <div className="flex items-center gap-3">
            <span className="font-bold text-stone-500">
              {totalFilteredCount} {lang === 'nl' ? 'concepten' : 'concepts'}
            </span>

            {onOpenComparator && (
              <button
                type="button"
                onClick={onOpenComparator}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-orange-100/90 hover:bg-orange-200 text-orange-950 font-bold border border-orange-300 transition-colors cursor-pointer"
              >
                <Scale className="w-3.5 h-3.5 text-orange-700" />
                <span>{lang === 'nl' ? 'Vergelijk 2 Concepten' : 'Compare 2 Concepts'}</span>
              </button>
            )}

            {onOpenWizard && (
              <button
                type="button"
                onClick={onOpenWizard}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-100/90 hover:bg-amber-200 text-amber-950 font-bold border border-amber-300 transition-colors cursor-pointer"
              >
                <Compass className="w-3.5 h-3.5 text-amber-700" />
                <span>{lang === 'nl' ? 'Keuzehulp (3 Vragen)' : 'Recommendation Wizard'}</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-1.5 bg-orange-50/50 border border-orange-200/80 rounded-xl px-3 py-1.5">
            <ArrowUpDown className="w-3.5 h-3.5 text-orange-500" />
            <span className="font-bold text-stone-700">
              {lang === 'nl' ? 'Sorteer op:' : 'Sort by:'}
            </span>
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value as any)}
              className="bg-transparent font-bold text-orange-950 focus:outline-none cursor-pointer"
            >
              <option value="rating">{lang === 'nl' ? 'Hoogste Score' : 'Top Rated'}</option>
              <option value="name">{lang === 'nl' ? 'Naam (A-Z)' : 'Name (A-Z)'}</option>
              <option value="buildDays">{lang === 'nl' ? 'Snelste Oplevering' : 'Fastest Build'}</option>
            </select>
          </div>

        </div>

      </div>
    </div>
  );
};
