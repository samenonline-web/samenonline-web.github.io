'use client';

import React, { useState } from 'react';
import {
  SlidersHorizontal,
  ChevronDown,
  ChevronUp,
  X,
  RotateCcw,
  Scale,
  Compass,
  Clock,
  Sparkles,
  Zap,
  ShoppingCart,
  Calculator,
  Tag,
  Globe,
  Briefcase,
  ArrowUpDown,
} from 'lucide-react';
import { CategoryType, Language } from '../types/company';

export type QuickFilterType =
  | 'all'
  | 'popular'
  | 'fast'
  | 'ideal'
  | 'calculator'
  | 'starter'
  | 'pro'
  | 'multilingual';

export type SortByType =
  | 'rating'
  | 'name'
  | 'nameDesc'
  | 'buildDays'
  | 'priceAsc'
  | 'priceDesc';

interface FilterBarProps {
  lang: Language;
  selectedCategory: CategoryType;
  onSelectCategory: (category: CategoryType) => void;
  selectedPriceTier?: string;
  onSelectPriceTier?: (tier: string) => void;
  sortBy: SortByType;
  onSortChange: (sort: SortByType) => void;
  totalFilteredCount: number;
  totalAllCount: number;
  categoryCounts?: Record<CategoryType, number>;
  onOpenComparator?: () => void;
  onOpenStatusTracker?: () => void;
  onOpenWizard?: () => void;
  activeQuickFilter: QuickFilterType;
  onQuickFilterChange: (filter: QuickFilterType) => void;
  searchQuery?: string;
  onResetSearchQuery?: () => void;
  onResetAllFilters?: () => void;
}

const CATEGORIES: CategoryType[] = [
  'All',
  'Local Services & Healthcare',
  'Food & Hospitality',
  'Webshops & E-commerce',
  'Creative & Agencies',
  'Tech & SaaS',
  'Sustainable & Green',
];

export const FilterBar: React.FC<FilterBarProps> = ({
  lang,
  selectedCategory,
  onSelectCategory,
  selectedPriceTier = 'All',
  onSelectPriceTier,
  sortBy,
  onSortChange,
  totalFilteredCount,
  totalAllCount,
  categoryCounts,
  onOpenComparator,
  onOpenStatusTracker,
  onOpenWizard,
  activeQuickFilter,
  onQuickFilterChange,
  searchQuery = '',
  onResetSearchQuery,
  onResetAllFilters,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getCategoryName = (cat: CategoryType) => {
    if (lang === 'en') return cat;
    switch (cat) {
      case 'All': return 'Alle Concepten';
      case 'Webshops & E-commerce': return 'Webshops';
      case 'Tech & SaaS': return 'Tech & SaaS';
      case 'Creative & Agencies': return 'Creatief & Bureaus';
      case 'Sustainable & Green': return 'Duurzaam';
      case 'Food & Hospitality': return 'Horeca & Voeding';
      case 'Local Services & Healthcare': return 'Diensten & Zorg';
    }
  };

  const activeExtraFiltersCount = (
    (activeQuickFilter !== 'all' ? 1 : 0) +
    (selectedPriceTier !== 'All' ? 1 : 0) +
    (sortBy !== 'rating' ? 1 : 0) +
    (searchQuery && searchQuery.trim().length > 0 ? 1 : 0)
  );

  return (
    <div id="filter-section" className="bg-white/95 dark:bg-[#0B1120]/95 backdrop-blur-md border-b border-stone-200 dark:border-slate-800 sticky top-20 z-30 shadow-2xs py-3 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Clean Row: Calm Category Pills + Filter Drawer Toggle */}
        <div className="flex items-center justify-between gap-3">
          
          {/* Subtle Category Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none flex-1">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => onSelectCategory(cat)}
                  className={`whitespace-nowrap px-3.5 py-1.5 rounded-full text-xs transition-all cursor-pointer select-none ${
                    isActive
                      ? 'bg-stone-900 dark:bg-orange-600 text-white font-bold shadow-xs'
                      : 'text-stone-600 dark:text-slate-300 hover:text-stone-900 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-slate-800 font-medium'
                  }`}
                >
                  {getCategoryName(cat)}
                </button>
              );
            })}
          </div>

          {/* Right Controls: Count + Discreet Filter Toggle */}
          <div className="flex items-center gap-2.5 shrink-0">
            <span className="text-xs text-stone-500 dark:text-slate-400 font-medium hidden md:inline">
              {totalFilteredCount} {lang === 'nl' ? 'concepten' : 'concepts'}
            </span>

            <button
              type="button"
              onClick={() => setIsExpanded((prev) => !prev)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                isExpanded || activeExtraFiltersCount > 0
                  ? 'bg-stone-900 dark:bg-slate-800 text-white border-stone-900 dark:border-slate-700 shadow-xs'
                  : 'bg-white dark:bg-slate-900 hover:bg-stone-50 dark:hover:bg-slate-800 text-stone-700 dark:text-slate-200 border-stone-300 dark:border-slate-700'
              }`}
              aria-expanded={isExpanded}
              aria-label={lang === 'nl' ? 'Toon filters en opties' : 'Toggle filters'}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>{lang === 'nl' ? 'Filters' : 'Filters'}</span>
              {activeExtraFiltersCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-orange-500 text-white text-[10px] flex items-center justify-center font-black">
                  {activeExtraFiltersCount}
                </span>
              )}
              {isExpanded ? (
                <ChevronUp className="w-3.5 h-3.5 opacity-70" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5 opacity-70" />
              )}
            </button>
          </div>

        </div>

        {/* Collapsible Advanced Filters Drawer (Hidden by default, clean & organized) */}
        {isExpanded && (
          <div className="mt-3 pt-3 border-t border-stone-200 dark:border-slate-800 animate-in fade-in slide-in-from-top-2 duration-200 text-xs text-stone-800 dark:text-slate-200 space-y-3.5">
            
            {/* Filter Groups Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-stone-50/80 dark:bg-slate-900/90 p-4 rounded-2xl border border-stone-200 dark:border-slate-800">
              
              {/* Group 1: Pakket / Prijsklasse */}
              {onSelectPriceTier && (
                <div className="space-y-1.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500 dark:text-slate-400 block">
                    {lang === 'nl' ? 'Prijsklasse & Pakket:' : 'Package:'}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      { id: 'All', label: 'Alle' },
                      { id: 'Starter', label: 'Starter (€75)' },
                      { id: 'Professional', label: 'Compleet (€195)' },
                      { id: 'Custom Enterprise', label: 'Webshop (€385)' },
                    ].map((tier) => (
                      <button
                        key={tier.id}
                        type="button"
                        onClick={() => onSelectPriceTier(tier.id)}
                        className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                          selectedPriceTier === tier.id
                            ? 'bg-stone-900 dark:bg-orange-600 text-white'
                            : 'bg-white dark:bg-slate-800 text-stone-700 dark:text-slate-200 border border-stone-200 dark:border-slate-700 hover:bg-stone-100 dark:hover:bg-slate-700'
                        }`}
                      >
                        {tier.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Group 2: Sorteren */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500 dark:text-slate-400 block">
                  {lang === 'nl' ? 'Sorteer op:' : 'Sort by:'}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    { id: 'rating' as SortByType, label: 'Aanbevolen' },
                    { id: 'buildDays' as SortByType, label: 'Snelste Levertijd' },
                    { id: 'priceAsc' as SortByType, label: 'Prijs: Laag → Hoog' },
                    { id: 'name' as SortByType, label: 'Naam (A-Z)' },
                  ].map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => onSortChange(s.id)}
                      className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                        sortBy === s.id
                          ? 'bg-stone-900 dark:bg-orange-600 text-white'
                          : 'bg-white dark:bg-slate-800 text-stone-700 dark:text-slate-200 border border-stone-200 dark:border-slate-700 hover:bg-stone-100 dark:hover:bg-slate-700'
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Group 3: Functionaliteit snelfilters */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500 dark:text-slate-400 block">
                  {lang === 'nl' ? 'Functionaliteiten:' : 'Features:'}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    { id: 'all' as QuickFilterType, label: 'Alles' },
                    { id: 'ideal' as QuickFilterType, label: 'iDEAL Facturatie' },
                    { id: 'fast' as QuickFilterType, label: '≤ 4 Dagen Live' },
                    { id: 'calculator' as QuickFilterType, label: 'Rekenmodule' },
                  ].map((qf) => (
                    <button
                      key={qf.id}
                      type="button"
                      onClick={() => onQuickFilterChange(qf.id)}
                      className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                        activeQuickFilter === qf.id
                          ? 'bg-stone-900 dark:bg-orange-600 text-white'
                          : 'bg-white dark:bg-slate-800 text-stone-700 dark:text-slate-200 border border-stone-200 dark:border-slate-700 hover:bg-stone-100 dark:hover:bg-slate-700'
                      }`}
                    >
                      {qf.label}
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Bottom Tool Shortcuts & Reset Action */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
              <div className="flex items-center gap-2">
                {onOpenComparator && (
                  <button
                    type="button"
                    onClick={onOpenComparator}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-stone-100 dark:hover:bg-slate-700 text-stone-700 dark:text-slate-200 font-bold border border-stone-200 dark:border-slate-700 transition-colors cursor-pointer"
                  >
                    <Scale className="w-3.5 h-3.5 text-stone-600 dark:text-slate-400" />
                    <span>{lang === 'nl' ? 'Vergelijk 2 Concepten' : 'Compare Concepts'}</span>
                  </button>
                )}

                {onOpenWizard && (
                  <button
                    type="button"
                    onClick={onOpenWizard}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-stone-100 dark:hover:bg-slate-700 text-stone-700 dark:text-slate-200 font-bold border border-stone-200 dark:border-slate-700 transition-colors cursor-pointer"
                  >
                    <Compass className="w-3.5 h-3.5 text-stone-600 dark:text-slate-400" />
                    <span>{lang === 'nl' ? 'Keuzehulp (3 Vragen)' : 'Wizard'}</span>
                  </button>
                )}
              </div>

              <div className="flex items-center gap-2">
                {activeExtraFiltersCount > 0 && onResetAllFilters && (
                  <button
                    type="button"
                    onClick={onResetAllFilters}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-stone-200 dark:bg-slate-800 hover:bg-stone-300 dark:hover:bg-slate-700 text-stone-800 dark:text-slate-200 font-bold transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>{lang === 'nl' ? 'Filters Herstellen' : 'Reset Filters'}</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => setIsExpanded(false)}
                  className="px-3 py-1.5 rounded-xl bg-stone-900 dark:bg-slate-800 hover:bg-stone-800 dark:hover:bg-slate-700 text-white font-bold transition-colors cursor-pointer"
                >
                  {lang === 'nl' ? 'Sluiten' : 'Close'}
                </button>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
