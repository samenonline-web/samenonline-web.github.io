'use client';

import React from 'react';
import { ArrowUpDown, Scale } from 'lucide-react';
import { CategoryType, Language } from '../types/company';

interface FilterBarProps {
  lang: Language;
  selectedCategory: CategoryType;
  onSelectCategory: (category: CategoryType) => void;
  sortBy: 'rating' | 'name' | 'buildDays';
  onSortChange: (sort: 'rating' | 'name' | 'buildDays') => void;
  totalFilteredCount: number;
  onOpenComparator?: () => void;
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
