'use client';

import React from 'react';
import {
  ArrowUpDown,
  Scale,
  Clock,
  Sparkles,
  Zap,
  ShoppingCart,
  Calculator,
  Compass,
  MapPin,
  Tag,
  X,
  RotateCcw,
  Globe,
  Briefcase,
  SlidersHorizontal,
} from 'lucide-react';
import { CategoryType, Language, ProvinceType } from '../types/company';

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
  selectedProvince?: ProvinceType;
  onSelectProvince?: (province: ProvinceType) => void;
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
  'Webshops & E-commerce',
  'Tech & SaaS',
  'Creative & Agencies',
  'Sustainable & Green',
  'Food & Hospitality',
  'Local Services & Healthcare',
];

const PROVINCES: { id: ProvinceType; name: string }[] = [
  { id: 'All', name: 'Alle Provincies' },
  { id: 'Zuid-Holland', name: 'Zuid-Holland' },
  { id: 'Noord-Holland', name: 'Noord-Holland' },
  { id: 'Utrecht', name: 'Utrecht' },
  { id: 'Noord-Brabant', name: 'Noord-Brabant' },
  { id: 'Gelderland', name: 'Gelderland' },
  { id: 'Groningen', name: 'Groningen' },
  { id: 'Limburg', name: 'Limburg' },
  { id: 'Flevoland', name: 'Flevoland' },
  { id: 'Overijssel', name: 'Overijssel' },
  { id: 'Friesland', name: 'Friesland' },
  { id: 'Drenthe', name: 'Drenthe' },
  { id: 'Zeeland', name: 'Zeeland' },
];

export const FilterBar: React.FC<FilterBarProps> = ({
  lang,
  selectedCategory,
  onSelectCategory,
  selectedProvince = 'All',
  onSelectProvince,
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

  const getQuickFilterLabel = (qf: QuickFilterType) => {
    switch (qf) {
      case 'popular': return lang === 'nl' ? 'Populaire Concepten' : 'Popular Concepts';
      case 'fast': return lang === 'nl' ? 'Snelste Oplevering (≤ 4 dgn)' : 'Fastest Build (≤ 4 days)';
      case 'ideal': return lang === 'nl' ? 'Inclusief iDEAL Facturatie' : 'With iDEAL Invoicing';
      case 'calculator': return lang === 'nl' ? 'Met Rekenmodule' : 'With Calculator Tool';
      case 'starter': return lang === 'nl' ? 'Starter One-Page (€75)' : 'Starter Package (€75)';
      case 'pro': return lang === 'nl' ? 'Compleet MKB (€195)' : 'Complete Business (€195)';
      case 'multilingual': return lang === 'nl' ? 'Meertalig (NL/EN)' : 'Multilingual';
      default: return '';
    }
  };

  const hasActiveFilters = Boolean(
    selectedCategory !== 'All' ||
    activeQuickFilter !== 'all' ||
    selectedProvince !== 'All' ||
    selectedPriceTier !== 'All' ||
    (searchQuery && searchQuery.trim().length > 0)
  );

  return (
    <div id="filter-section" className="bg-white border-b border-orange-100 sticky top-20 z-30 shadow-xs py-4 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 1. Category Tabs with Live Dynamic Count Badges */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 scrollbar-none border-b border-orange-100/60 mb-3">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat;
            const count = categoryCounts ? categoryCounts[cat] : undefined;
            return (
              <button
                key={cat}
                onClick={() => onSelectCategory(cat)}
                className={`whitespace-nowrap flex items-center gap-2 px-3.5 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-orange-700 text-white shadow-md shadow-orange-700/20'
                    : 'bg-orange-50/60 text-stone-800 hover:bg-orange-100 border border-orange-100/80 hover:border-orange-200'
                }`}
              >
                <span>{getCategoryName(cat)}</span>
                {count !== undefined && (
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full font-black ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : 'bg-orange-200/70 text-orange-900'
                    }`}
                  >
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* 2. Quick Filter Sneltoetsen (Dynamic 20 items, Starter, Pro, iDEAL, Rekenmodule) */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3 pb-2.5 border-b border-stone-100">
          <div className="flex flex-wrap items-center gap-1.5 text-[11px] font-bold">
            <span className="text-stone-400 mr-1 hidden sm:inline flex items-center gap-1">
              <SlidersHorizontal className="w-3 h-3 text-stone-400" />
              Snelfilters:
            </span>
            
            <button
              type="button"
              onClick={() => onQuickFilterChange('all')}
              className={`px-3 py-1 rounded-xl transition-all cursor-pointer ${
                activeQuickFilter === 'all'
                  ? 'bg-stone-900 text-white shadow-2xs font-black'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              {lang === 'nl' ? `Alle (${totalAllCount})` : `All (${totalAllCount})`}
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
              <Sparkles className="w-3 h-3 text-amber-600" />
              <span>{lang === 'nl' ? 'Populaire Concepten' : 'Popular Concepts'}</span>
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
              <span>{lang === 'nl' ? 'Snelste Oplevering (≤ 4 dgn)' : 'Fastest Build (≤ 4 days)'}</span>
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
              <span>{lang === 'nl' ? 'Met Rekenmodule' : 'Interactive Tools'}</span>
            </button>

            <button
              type="button"
              onClick={() => onQuickFilterChange('starter')}
              className={`flex items-center gap-1 px-3 py-1 rounded-xl transition-all cursor-pointer ${
                activeQuickFilter === 'starter'
                  ? 'bg-orange-700 text-white shadow-2xs font-black'
                  : 'bg-orange-50 text-orange-900 border border-orange-200/80 hover:bg-orange-100'
              }`}
            >
              <Tag className="w-3 h-3 text-orange-700" />
              <span>Starter (€75)</span>
            </button>

            <button
              type="button"
              onClick={() => onQuickFilterChange('pro')}
              className={`flex items-center gap-1 px-3 py-1 rounded-xl transition-all cursor-pointer ${
                activeQuickFilter === 'pro'
                  ? 'bg-indigo-600 text-white shadow-2xs font-black'
                  : 'bg-indigo-50 text-indigo-900 border border-indigo-200/80 hover:bg-indigo-100'
              }`}
            >
              <Briefcase className="w-3 h-3 text-indigo-600" />
              <span>Compleet MKB (€195)</span>
            </button>

            <button
              type="button"
              onClick={() => onQuickFilterChange('multilingual')}
              className={`flex items-center gap-1 px-3 py-1 rounded-xl transition-all cursor-pointer ${
                activeQuickFilter === 'multilingual'
                  ? 'bg-teal-600 text-white shadow-2xs font-black'
                  : 'bg-teal-50 text-teal-900 border border-teal-200/80 hover:bg-teal-100'
              }`}
            >
              <Globe className="w-3 h-3 text-teal-600" />
              <span>Meertalig (NL/EN)</span>
            </button>
          </div>

          {onOpenStatusTracker && (
            <button
              type="button"
              onClick={onOpenStatusTracker}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold border border-stone-300 transition-colors cursor-pointer text-[11px]"
            >
              <Clock className="w-3.5 h-3.5 text-stone-600" />
              <span>{lang === 'nl' ? 'Website Status Tracker' : 'Live Status Tracker'}</span>
            </button>
          )}
        </div>

        {/* 3. Secondary Dropdown Controls & Modals */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
          
          {/* Left: Region & Price Tier Selectors */}
          <div className="flex flex-wrap items-center gap-2">
            
            {/* Province Selector */}
            {onSelectProvince && (
              <div className="flex items-center gap-1.5 bg-orange-50/50 border border-orange-200/80 rounded-xl px-2.5 py-1.5">
                <MapPin className="w-3.5 h-3.5 text-orange-600" />
                <label htmlFor="filter-province-select" className="font-bold text-stone-700 hidden sm:inline cursor-pointer">
                  {lang === 'nl' ? 'Regio:' : 'Region:'}
                </label>
                <select
                  id="filter-province-select"
                  aria-label={lang === 'nl' ? 'Filter op regio of provincie' : 'Filter by region or province'}
                  value={selectedProvince}
                  onChange={(e) => onSelectProvince(e.target.value as ProvinceType)}
                  className="bg-transparent font-bold text-orange-950 focus:outline-none cursor-pointer text-xs"
                >
                  {PROVINCES.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Price Tier Selector */}
            {onSelectPriceTier && (
              <div className="flex items-center gap-1.5 bg-orange-50/50 border border-orange-200/80 rounded-xl px-2.5 py-1.5">
                <Tag className="w-3.5 h-3.5 text-orange-600" />
                <label htmlFor="filter-tier-select" className="font-bold text-stone-700 hidden sm:inline cursor-pointer">
                  {lang === 'nl' ? 'Pakket:' : 'Package:'}
                </label>
                <select
                  id="filter-tier-select"
                  aria-label={lang === 'nl' ? 'Filter op prijspakket' : 'Filter by price package'}
                  value={selectedPriceTier}
                  onChange={(e) => onSelectPriceTier(e.target.value)}
                  className="bg-transparent font-bold text-orange-950 focus:outline-none cursor-pointer text-xs"
                >
                  <option value="All">{lang === 'nl' ? 'Alle Pakketten' : 'All Packages'}</option>
                  <option value="Starter">{lang === 'nl' ? 'Starter One-Page (€75)' : 'Starter One-Page (€75)'}</option>
                  <option value="Professional">{lang === 'nl' ? 'Compleet MKB (€195)' : 'Complete MKB (€195)'}</option>
                  <option value="Custom Enterprise">{lang === 'nl' ? 'Webshop & Maatwerk (€385)' : 'E-commerce & Custom (€385)'}</option>
                </select>
              </div>
            )}

            {/* Sort Dropdown */}
            <div className="flex items-center gap-1.5 bg-orange-50/50 border border-orange-200/80 rounded-xl px-2.5 py-1.5">
              <ArrowUpDown className="w-3.5 h-3.5 text-orange-600" />
              <label htmlFor="filter-sort-select" className="font-bold text-stone-700 hidden sm:inline cursor-pointer">
                {lang === 'nl' ? 'Sorteer op:' : 'Sort by:'}
              </label>
              <select
                id="filter-sort-select"
                aria-label={lang === 'nl' ? 'Sorteer concepten' : 'Sort concepts'}
                value={sortBy}
                onChange={(e) => onSortChange(e.target.value as SortByType)}
                className="bg-transparent font-bold text-orange-950 focus:outline-none cursor-pointer text-xs"
              >
                <option value="rating">{lang === 'nl' ? 'Aanbevolen Volgorde' : 'Featured First'}</option>
                <option value="name">{lang === 'nl' ? 'Naam (A-Z)' : 'Name (A-Z)'}</option>
                <option value="nameDesc">{lang === 'nl' ? 'Naam (Z-A)' : 'Name (Z-A)'}</option>
                <option value="buildDays">{lang === 'nl' ? 'Snelste Oplevering' : 'Fastest Build'}</option>
                <option value="priceAsc">{lang === 'nl' ? 'Prijs: Laag naar Hoog' : 'Price: Low to High'}</option>
                <option value="priceDesc">{lang === 'nl' ? 'Prijs: Hoog naar Laag' : 'Price: High to Low'}</option>
              </select>
            </div>

          </div>

          {/* Right: Modal Action Buttons */}
          <div className="flex items-center gap-2">
            {onOpenComparator && (
              <button
                type="button"
                onClick={onOpenComparator}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-orange-100/90 hover:bg-orange-200 text-orange-950 font-bold border border-orange-300 transition-colors cursor-pointer"
              >
                <Scale className="w-3.5 h-3.5 text-orange-700" />
                <span className="hidden md:inline">{lang === 'nl' ? 'Vergelijk 2 Concepten' : 'Compare 2 Concepts'}</span>
                <span className="md:hidden">{lang === 'nl' ? 'Vergelijk' : 'Compare'}</span>
              </button>
            )}

            {onOpenWizard && (
              <button
                type="button"
                onClick={onOpenWizard}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-100/90 hover:bg-amber-200 text-amber-950 font-bold border border-amber-300 transition-colors cursor-pointer"
              >
                <Compass className="w-3.5 h-3.5 text-amber-700" />
                <span className="hidden md:inline">{lang === 'nl' ? 'Keuzehulp (3 Vragen)' : 'Recommendation Wizard'}</span>
                <span className="md:hidden">{lang === 'nl' ? 'Keuzehulp' : 'Wizard'}</span>
              </button>
            )}
          </div>

        </div>

        {/* 4. Active Filters Bar & Reset All Shortcut */}
        {hasActiveFilters && (
          <div className="flex flex-wrap items-center justify-between gap-2 mt-3 pt-2.5 border-t border-orange-100/80 text-[11px]">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="font-bold text-stone-500 mr-1">Actieve filters:</span>
              
              {searchQuery && (
                <button
                  type="button"
                  onClick={onResetSearchQuery}
                  className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-orange-100 text-orange-900 border border-orange-300 font-bold hover:bg-orange-200 transition-colors cursor-pointer"
                  title="Zoekopdracht wissen"
                >
                  <span>Zoekterm: &quot;{searchQuery}&quot;</span>
                  <X className="w-3 h-3" />
                </button>
              )}

              {selectedCategory !== 'All' && (
                <button
                  type="button"
                  onClick={() => onSelectCategory('All')}
                  className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-orange-100 text-orange-900 border border-orange-300 font-bold hover:bg-orange-200 transition-colors cursor-pointer"
                  title="Categorie filter wissen"
                >
                  <span>{getCategoryName(selectedCategory)}</span>
                  <X className="w-3 h-3" />
                </button>
              )}

              {activeQuickFilter !== 'all' && (
                <button
                  type="button"
                  onClick={() => onQuickFilterChange('all')}
                  className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-orange-100 text-orange-900 border border-orange-300 font-bold hover:bg-orange-200 transition-colors cursor-pointer"
                  title="Snelfilter wissen"
                >
                  <span>{getQuickFilterLabel(activeQuickFilter)}</span>
                  <X className="w-3 h-3" />
                </button>
              )}

              {selectedProvince !== 'All' && onSelectProvince && (
                <button
                  type="button"
                  onClick={() => onSelectProvince('All')}
                  className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-orange-100 text-orange-900 border border-orange-300 font-bold hover:bg-orange-200 transition-colors cursor-pointer"
                  title="Provincie filter wissen"
                >
                  <span>Regio: {selectedProvince}</span>
                  <X className="w-3 h-3" />
                </button>
              )}

              {selectedPriceTier !== 'All' && onSelectPriceTier && (
                <button
                  type="button"
                  onClick={() => onSelectPriceTier('All')}
                  className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-orange-100 text-orange-900 border border-orange-300 font-bold hover:bg-orange-200 transition-colors cursor-pointer"
                  title="Pakket filter wissen"
                >
                  <span>Pakket: {selectedPriceTier}</span>
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            <div className="flex items-center gap-3">
              <span className="font-extrabold text-stone-700">
                {totalFilteredCount} {lang === 'nl' ? 'van' : 'of'} {totalAllCount} {lang === 'nl' ? 'concepten' : 'concepts'}
              </span>

              {onResetAllFilters && (
                <button
                  type="button"
                  onClick={onResetAllFilters}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-stone-900 hover:bg-stone-800 text-white font-bold transition-all cursor-pointer shadow-2xs"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>{lang === 'nl' ? 'Wis alle filters' : 'Clear all filters'}</span>
                </button>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
