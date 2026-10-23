'use client';

import React, { useState, useMemo } from 'react';
import { Navbar } from '@/src/components/Navbar';
import { Hero } from '../src/components/Hero';
import { StatsBar } from '../src/components/StatsBar';
import { MobileStickyBar } from '../src/components/MobileStickyBar';
import { LiveBrandingBar } from '../src/components/LiveBrandingBar';
import { QuickMatchmakerSection } from '../src/components/QuickMatchmakerSection';
import { CostComparisonCalculator } from '../src/components/CostComparisonCalculator';
import { DutchCraftTrustBadges } from '../src/components/DutchCraftTrustBadges';
import { TradeInTradeUpBanner } from '../src/components/TradeInTradeUpBanner';
import { ExpressDeliveryCallout } from '../src/components/ExpressDeliveryCallout';
import { CopywritingServiceCallout } from '../src/components/CopywritingServiceCallout';
import { LocalSeoRankChecker } from '../src/components/LocalSeoRankChecker';
import GoogleSnippetPreviewer from '../src/components/GoogleSnippetPreviewer';
import LocalSeoCityHub from '../src/components/LocalSeoCityHub';
import WebsiteCopilotWidget from '../src/components/WebsiteCopilotWidget';
import LostCustomerCalculator from '../src/components/LostCustomerCalculator';
import ClientPortalSimulator from '../src/components/ClientPortalSimulator';
import { LiveIdealCheckoutSimulator } from '../src/components/LiveIdealCheckoutSimulator';
import { CustomerRoiBreakEven } from '../src/components/CustomerRoiBreakEven';
import { StarterChecklistDownloadBanner } from '../src/components/StarterChecklistDownloadBanner';
import { StarterChecklistModal } from '../src/components/StarterChecklistModal';
import { TemplateCarousel } from '../src/components/TemplateCarousel';
import { FilterBar, QuickFilterType, SortByType } from '../src/components/FilterBar';
import { TemplateCard } from '../src/components/TemplateCard';
import { TemplateModal } from '../src/components/TemplateModal';
import { LivePreviewModal } from '../src/components/LivePreviewModal';
import { RequestWebsiteModal } from '../src/components/RequestWebsiteModal';
import { InfoModal } from '../src/components/InfoModal';
import { AboutSection } from '../src/components/AboutSection';
import { Footer } from '../src/components/Footer';
import { PriceEstimatorCalculator } from '../src/components/PriceEstimatorCalculator';
import { PricingPackagesSection } from '../src/components/PricingPackagesSection';
import { HowItWorksSection } from '../src/components/HowItWorksSection';
import { BeforeAfterRedesignSection } from '../src/components/BeforeAfterRedesignSection';
import { WebsiteSpeedAuditSection } from '../src/components/WebsiteSpeedAuditSection';
import { CmsComparisonSection } from '../src/components/CmsComparisonSection';
import { GuaranteesSection } from '../src/components/GuaranteesSection';
import { RoiEstimatorCalculator } from '../src/components/RoiEstimatorCalculator';
import { ClientChecklistSection } from '../src/components/ClientChecklistSection';
import { ProjectStatusTrackerModal } from '../src/components/ProjectStatusTrackerModal';
import { ConceptWizardModal } from '../src/components/ConceptWizardModal';
import { TemplateComparisonModal } from '../src/components/TemplateComparisonModal';
import { FaqSection } from '../src/components/FaqSection';
import { WhatsAppWidget } from '../src/components/WhatsAppWidget';
import { FloatingSectionNav } from '../src/components/FloatingSectionNav';
import InteractiveDemoPlayground from '../src/components/InteractiveDemoPlayground';

import { INITIAL_TEMPLATES } from '../src/data/templates';
import { WebTemplate, CategoryType, Language } from '../src/types/company';
import { Heart, Search } from 'lucide-react';

export default function Home() {
  const [lang, setLang] = useState<Language>('nl');
  const [templates, setTemplates] = useState<WebTemplate[]>(INITIAL_TEMPLATES);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('All');
  const [selectedPriceTier, setSelectedPriceTier] = useState<string>('All');
  const [quickFilter, setQuickFilter] = useState<QuickFilterType>('all');
  const [sortBy, setSortBy] = useState<SortByType>('rating');
  const [showOnlyBookmarks, setShowOnlyBookmarks] = useState(false);
  const [visibleCount, setVisibleCount] = useState(9);

  // Live Branding customizer state
  const [customBrandName, setCustomBrandName] = useState('');
  const [selectedBrandColorId, setSelectedBrandColorId] = useState('orange');
  const [isChecklistModalOpen, setIsChecklistModalOpen] = useState(false);

  // Modals & Bookmarks
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [activeModalTemplate, setActiveModalTemplate] = useState<WebTemplate | null>(null);
  const [activePreviewTemplate, setActivePreviewTemplate] = useState<WebTemplate | null>(null);
  const [requestModalTemplate, setRequestModalTemplate] = useState<WebTemplate | null>(null);
  const [requestModalTheme, setRequestModalTheme] = useState<string | undefined>(undefined);
  const [requestModalFont, setRequestModalFont] = useState<string | undefined>(undefined);
  const [requestModalCustomData, setRequestModalCustomData] = useState<{
    templateName: string;
    budget: string;
    notes: string;
  } | null>(null);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [isComparisonModalOpen, setIsComparisonModalOpen] = useState(false);
  const [isStatusTrackerOpen, setIsStatusTrackerOpen] = useState(false);
  const [isWizardModalOpen, setIsWizardModalOpen] = useState(false);
  const [infoModalData, setInfoModalData] = useState<{ isOpen: boolean; title: string; content: string }>({
    isOpen: false,
    title: '',
    content: '',
  });

  const isAnyModalOpen = Boolean(
    activeModalTemplate ||
    activePreviewTemplate ||
    isRequestModalOpen ||
    isComparisonModalOpen ||
    isStatusTrackerOpen ||
    isWizardModalOpen ||
    infoModalData.isOpen
  );

  // Freeze main site scroll and prevent background scroll chaining
  React.useEffect(() => {
    if (isAnyModalOpen) {
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
    } else {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    }
    return () => {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    };
  }, [isAnyModalOpen]);

  // Initialize theme from storage (defaults to light mode)
  React.useEffect(() => {
    try {
      const savedTheme = localStorage.getItem('samenonline-theme');
      if (savedTheme === 'dark') {
        setIsDarkMode(true);
      } else {
        setIsDarkMode(false);
      }
    } catch {}
  }, []);

  // Sync Dark Mode state with document.documentElement
  React.useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.add('global-dark-mode');
      document.documentElement.style.colorScheme = 'dark';
      try {
        localStorage.setItem('samenonline-theme', 'dark');
      } catch {}
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.remove('global-dark-mode');
      document.documentElement.style.colorScheme = 'light';
      try {
        localStorage.setItem('samenonline-theme', 'light');
      } catch {}
    }
  }, [isDarkMode]);

  // Toggle Language
  const handleLanguageToggle = () => {
    setLang((prev) => (prev === 'nl' ? 'en' : 'nl'));
  };

  // Toggle Bookmark
  const handleToggleBookmark = (id: string) => {
    setBookmarks((prev) =>
      prev.includes(id) ? prev.filter((bId) => bId !== id) : [...prev, id]
    );
  };

  // Open Request Modal with dynamic prefill capability
  const handleOpenRequestModal = (
    template?: WebTemplate,
    theme?: string,
    font?: string,
    customData?: { templateName: string; budget: string; notes: string }
  ) => {
    setRequestModalTemplate(template || null);
    setRequestModalTheme(theme);
    setRequestModalFont(font);
    setRequestModalCustomData(customData || null);
    setIsRequestModalOpen(true);
  };

  // Open Info Modal
  const handleOpenInfoModal = (title: string, content: string) => {
    setInfoModalData({
      isOpen: true,
      title,
      content,
    });
  };

  // Category counts memo
  const categoryCounts = useMemo(() => {
    const counts: Record<CategoryType, number> = {
      'All': templates.length,
      'Webshops & E-commerce': 0,
      'Tech & SaaS': 0,
      'Creative & Agencies': 0,
      'Sustainable & Green': 0,
      'Food & Hospitality': 0,
      'Local Services & Healthcare': 0,
    };
    templates.forEach((t) => {
      if (counts[t.category] !== undefined) {
        counts[t.category]++;
      }
    });
    return counts;
  }, [templates]);

  // Master reset for all filters
  const handleResetAllFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedPriceTier('All');
    setQuickFilter('all');
    setShowOnlyBookmarks(false);
  };

  // Filter & Sort Logic
  const filteredTemplates = useMemo(() => {
    return templates
      .filter((tmpl) => {
        // Search Filter
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const matchName = tmpl.name.toLowerCase().includes(q);
          const matchSub = (tmpl.subtitle + ' ' + tmpl.subtitleNl).toLowerCase().includes(q);
          const matchDesc = (tmpl.description + ' ' + tmpl.descriptionNl).toLowerCase().includes(q);
          const matchCity = tmpl.city.toLowerCase().includes(q);
          const matchProvince = tmpl.province.toLowerCase().includes(q);
          const matchFeat =
            tmpl.features.some((f) => f.toLowerCase().includes(q)) ||
            tmpl.featuresNl.some((f) => f.toLowerCase().includes(q));
          if (!matchName && !matchSub && !matchDesc && !matchCity && !matchProvince && !matchFeat) {
            return false;
          }
        }

        // Category Filter
        if (selectedCategory !== 'All' && tmpl.category !== selectedCategory) {
          return false;
        }

        // Price Tier Filter
        if (selectedPriceTier !== 'All' && tmpl.priceTier !== selectedPriceTier) {
          return false;
        }

        // Quick Filter
        if (quickFilter === 'popular' && !tmpl.isFeatured) {
          return false;
        }
        if (quickFilter === 'fast' && tmpl.estimatedBuildDays > 4) {
          return false;
        }
        if (quickFilter === 'ideal' && !tmpl.idealReady) {
          return false;
        }
        if (quickFilter === 'calculator') {
          const calculatorTemplates = [
            'bouwmeester-aannemer',
            'glanshelder-schoonmaak',
            'rijschool-vlot',
            'fiets-craft-bv',
            'versvogel-boerenwinkel',
            'grachten-web-agency',
            'stroom-delen-saas',
            'studioflow-yoga',
            'devries-boekhouding',
            'bistro-degracht',
            'zonne-pionier-energy',
            'advocaten-justitia',
            'dierenkliniek-devennen',
            'makelaardij-vastgoed',
            'inkt-en-naald-studio',
          ];
          if (!calculatorTemplates.includes(tmpl.id)) {
            return false;
          }
        }
        if (quickFilter === 'starter' && tmpl.priceTier !== 'Starter') {
          return false;
        }
        if (quickFilter === 'pro' && tmpl.priceTier !== 'Professional' && tmpl.priceTier !== 'Custom Enterprise') {
          return false;
        }
        if (quickFilter === 'multilingual' && !tmpl.multilingual) {
          return false;
        }

        // Bookmarks filter
        return !(showOnlyBookmarks && !bookmarks.includes(tmpl.id));
      })
      .sort((a, b) => {
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'name') return a.name.localeCompare(b.name);
        if (sortBy === 'nameDesc') return b.name.localeCompare(a.name);
        if (sortBy === 'buildDays') return a.estimatedBuildDays - b.estimatedBuildDays;
        if (sortBy === 'priceAsc') {
          const getPrice = (tier: string) => (tier === 'Starter' ? 75 : tier === 'Professional' ? 195 : 385);
          return getPrice(a.priceTier) - getPrice(b.priceTier);
        }
        if (sortBy === 'priceDesc') {
          const getPrice = (tier: string) => (tier === 'Starter' ? 75 : tier === 'Professional' ? 195 : 385);
          return getPrice(b.priceTier) - getPrice(a.priceTier);
        }
        return 0;
      });
  }, [templates, searchQuery, selectedCategory, selectedPriceTier, quickFilter, showOnlyBookmarks, bookmarks, sortBy]);

  const isFiltered = Boolean(
    searchQuery.trim() !== '' ||
    selectedCategory !== 'All' ||
    selectedPriceTier !== 'All' ||
    quickFilter !== 'all' ||
    showOnlyBookmarks
  );

  const displayedTemplates = useMemo(() => {
    if (isFiltered) return filteredTemplates;
    return filteredTemplates.slice(0, visibleCount);
  }, [filteredTemplates, isFiltered, visibleCount]);

  return (
    <div
      className={`min-h-screen flex flex-col font-sans selection:bg-orange-500 selection:text-white transition-colors duration-200 ${
        isDarkMode
          ? 'global-dark-mode dark bg-[#080D1A] text-slate-100'
          : 'bg-[#FAFAFA] text-slate-900'
      }`}
    >
      {/* Interactive Application Screen Shell (Hidden during Print/PDF Generation to eliminate 31-page duplicate bug) */}
      <div id="app-screen-content" className="print:hidden flex flex-col flex-1">
        {/* Top Navbar */}
        <Navbar
        lang={lang}
        onLanguageToggle={handleLanguageToggle}
        onOpenRequestModal={() => handleOpenRequestModal()}
        totalTemplatesCount={templates.length}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        isDarkMode={isDarkMode}
        onToggleDarkMode={() => setIsDarkMode((prev) => !prev)}
      />

      {/* Welcoming Hero Header */}
      <Hero
        lang={lang}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {/* Trust Metrics Ribbon */}
      <StatsBar lang={lang} />

      {/* Sticky Quick Jump Bar for In-Page Destinations */}
      <nav 
        aria-label={lang === 'nl' ? 'Snelnavigatie onderdelen' : 'Quick section navigation'}
        className="sticky top-20 z-35 bg-white/95 dark:bg-[#080D1A]/95 backdrop-blur-md border-y border-slate-200/80 dark:border-slate-800 py-2.5 px-4 shadow-2xs transition-colors"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-start md:justify-center gap-2 overflow-x-auto no-scrollbar py-0.5 text-xs font-bold">
          <button
            type="button"
            onClick={() => {
              const el = document.getElementById('templates-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-orange-100/90 dark:bg-blue-950/60 text-orange-900 dark:text-blue-300 hover:bg-orange-200 dark:hover:bg-blue-900/80 border border-orange-200 dark:border-blue-800/60 whitespace-nowrap cursor-pointer transition-all shrink-0"
          >
            <span>🎨</span>
            <span>{lang === 'nl' ? 'Concepten' : 'Templates'}</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-orange-200 dark:bg-blue-900 text-orange-950 dark:text-blue-200">
              {templates.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => {
              const el = document.getElementById('waarom-nextjs');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 whitespace-nowrap cursor-pointer transition-all shrink-0"
          >
            <span>⚡</span>
            <span>{lang === 'nl' ? 'Waarom Next.js?' : 'Why Next.js?'}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              const el = document.getElementById('pakketten');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 whitespace-nowrap cursor-pointer transition-all shrink-0"
          >
            <span>💰</span>
            <span>{lang === 'nl' ? 'Tarieven & Calculators' : 'Rates & Calculator'}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              const el = document.getElementById('hoe-het-werkt');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 whitespace-nowrap cursor-pointer transition-all shrink-0"
          >
            <span>📋</span>
            <span>{lang === 'nl' ? 'Werkwijze & Checklist' : 'Process'}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              const el = document.getElementById('garanties');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 whitespace-nowrap cursor-pointer transition-all shrink-0"
          >
            <span>🛡️</span>
            <span>{lang === 'nl' ? 'Zekerheden' : 'Guarantees'}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              const el = document.getElementById('faq-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 whitespace-nowrap cursor-pointer transition-all shrink-0"
          >
            <span>❓</span>
            <span>{lang === 'nl' ? 'FAQ & Over Ons' : 'FAQ & About'}</span>
          </button>
        </div>
      </nav>

      {/* Interactive Sticky Filter & Sort Bar */}
      <FilterBar
        lang={lang}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        selectedPriceTier={selectedPriceTier}
        onSelectPriceTier={setSelectedPriceTier}
        sortBy={sortBy}
        onSortChange={setSortBy}
        totalFilteredCount={filteredTemplates.length}
        totalAllCount={templates.length}
        categoryCounts={categoryCounts}
        onOpenComparator={() => setIsComparisonModalOpen(true)}
        onOpenStatusTracker={() => setIsStatusTrackerOpen(true)}
        onOpenWizard={() => setIsWizardModalOpen(true)}
        activeQuickFilter={quickFilter}
        onQuickFilterChange={setQuickFilter}
        searchQuery={searchQuery}
        onResetSearchQuery={() => setSearchQuery('')}
        onResetAllFilters={handleResetAllFilters}
      />

      {/* Main Content Area */}
      <main id="templates-section" className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 scroll-mt-24">
        {/* Realtime Live Brand & Colors Customizer */}
        <LiveBrandingBar
          lang={lang}
          customBrandName={customBrandName}
          onBrandNameChange={setCustomBrandName}
          selectedColorId={selectedBrandColorId}
          onColorChange={setSelectedBrandColorId}
          onReset={() => {
            setCustomBrandName('');
            setSelectedBrandColorId('orange');
          }}
        />
        {/* Bookmarks Banner */}
        {bookmarks.length > 0 && (
          <div className="mb-6 flex items-center justify-between bg-rose-50 dark:bg-rose-950/60 border-2 border-rose-200 dark:border-rose-900/60 p-3.5 rounded-2xl transition-colors">
            <div className="flex items-center gap-2 text-rose-900 dark:text-rose-200 text-xs font-bold">
              <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
              <span>
                {lang === 'nl'
                  ? `Je hebt ${bookmarks.length} favoriete concepten bewaard`
                  : `You have saved ${bookmarks.length} bookmarked templates`}
              </span>
            </div>

            <button
              onClick={() => setShowOnlyBookmarks(!showOnlyBookmarks)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-colors cursor-pointer ${
                showOnlyBookmarks
                  ? 'bg-rose-600 text-white'
                  : 'bg-white dark:bg-slate-800 text-rose-700 dark:text-rose-300 border border-rose-300 dark:border-rose-800 hover:bg-rose-100 dark:hover:bg-slate-700'
              }`}
            >
              {showOnlyBookmarks
                ? lang === 'nl'
                  ? 'Toon Alles'
                  : 'Show All'
                : lang === 'nl'
                ? 'Toon Alleen Favorieten'
                : 'Show Bookmarks Only'}
            </button>
          </div>
        )}

        {/* Templates Grid Header & Counter */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs font-bold text-stone-600 dark:text-slate-400">
            {lang === 'nl'
              ? `Concepten ${displayedTemplates.length} van ${filteredTemplates.length} getoond`
              : `Showing ${displayedTemplates.length} of ${filteredTemplates.length} templates`}
          </p>
          {!isFiltered && filteredTemplates.length > 9 && (
            <button
              type="button"
              onClick={() => setVisibleCount(visibleCount >= filteredTemplates.length ? 9 : filteredTemplates.length)}
              className="text-xs font-extrabold text-orange-700 dark:text-blue-400 hover:underline cursor-pointer"
            >
              {visibleCount >= filteredTemplates.length
                ? (lang === 'nl' ? 'Minder tonen (9)' : 'Show less (9)')
                : (lang === 'nl' ? `Toon alle ${filteredTemplates.length} concepten` : `Show all ${filteredTemplates.length}`)}
            </button>
          )}
        </div>

        {/* Templates Grid */}
        {displayedTemplates.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedTemplates.map((template) => (
                <TemplateCard
                  key={template.id}
                  template={template}
                  lang={lang}
                  onOpenDetails={setActiveModalTemplate}
                  onOpenLivePreview={setActivePreviewTemplate}
                  onOpenRequestModal={(tmpl) => handleOpenRequestModal(tmpl)}
                  isBookmarked={bookmarks.includes(template.id)}
                  onToggleBookmark={handleToggleBookmark}
                  customBrandName={customBrandName}
                  customBrandColor={selectedBrandColorId}
                />
              ))}
            </div>

            {/* Load More Controller */}
            {!isFiltered && filteredTemplates.length > visibleCount && (
              <div className="mt-8 text-center bg-white dark:bg-slate-900 border-2 border-orange-100 dark:border-slate-800 p-6 rounded-3xl shadow-sm space-y-3 transition-colors">
                <p className="text-xs font-semibold text-stone-600 dark:text-slate-300">
                  {lang === 'nl'
                    ? `Je ziet momenteel ${visibleCount} van de ${filteredTemplates.length} templates. Klik hieronder om meer te ontdekken zonder eindeloos te scrollen.`
                    : `You are viewing ${visibleCount} of ${filteredTemplates.length} templates. Expand to see more.`}
                </p>
                <div className="flex items-center justify-center gap-3 flex-wrap">
                  <button
                    type="button"
                    onClick={() => setVisibleCount((prev) => Math.min(prev + 9, filteredTemplates.length))}
                    className="px-5 py-2.5 rounded-xl bg-orange-700 hover:bg-orange-800 text-white font-extrabold text-xs shadow-md transition-all cursor-pointer"
                  >
                    {lang === 'nl'
                      ? `+ Toon nog 9 concepten (${filteredTemplates.length - visibleCount} resterend)`
                      : `+ Show 9 more templates (${filteredTemplates.length - visibleCount} remaining)`}
                  </button>
                  <button
                    type="button"
                    onClick={() => setVisibleCount(filteredTemplates.length)}
                    className="px-4 py-2.5 rounded-xl bg-stone-100 dark:bg-slate-800 hover:bg-stone-200 dark:hover:bg-slate-700 text-stone-800 dark:text-slate-200 border border-stone-200 dark:border-slate-700 font-bold text-xs transition-all cursor-pointer"
                  >
                    {lang === 'nl' ? `Toon alle ${filteredTemplates.length} direct` : `Show all ${filteredTemplates.length}`}
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          /* Empty State */
          <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-3xl border-2 border-orange-100 dark:border-slate-800 p-8 max-w-md mx-auto my-8 shadow-sm transition-colors">
            <div className="w-16 h-16 bg-orange-100 dark:bg-slate-800 text-orange-600 dark:text-blue-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-stone-900 dark:text-white mb-2">
              {lang === 'nl' ? 'Geen concepten gevonden' : 'No website templates found'}
            </h3>
            <p className="text-xs text-stone-600 dark:text-slate-300 mb-6 font-medium leading-relaxed">
              {lang === 'nl'
                ? 'Geen resultaten voor jouw zoekopdracht. Probeer een andere categorie of zoekterm.'
                : 'No templates match your filters. Try clearing your search query.'}
            </p>
            <button
              onClick={handleResetAllFilters}
              className="px-5 py-2.5 rounded-xl bg-orange-700 hover:bg-orange-800 text-white font-bold text-xs shadow-md transition-colors cursor-pointer"
            >
              {lang === 'nl' ? 'Herstel Alle Filters' : 'Reset All Filters'}
            </button>
          </div>
        )}

        {/* Featured Templates Interactive Carousel */}
        <div className="mt-12">
          <TemplateCarousel
            templates={templates}
            lang={lang}
            onOpenDetails={setActiveModalTemplate}
            onOpenLivePreview={setActivePreviewTemplate}
            onOpenRequestModal={(tmpl) => handleOpenRequestModal(tmpl)}
            isPaused={isAnyModalOpen}
          />
        </div>

        {/* Interactive Industry Demo Playground */}
        <InteractiveDemoPlayground
          onRequestQuote={() =>
            handleOpenRequestModal(undefined, undefined, undefined, {
              templateName: 'Interactieve Branche Web-App',
              budget: '€195 - €385 (MKB / Webshop Pakket)',
              notes: 'Aanvraag via Interactieve Demo Playground: ik wil een werkende calculator of reserveringsmodule op mijn website.',
            })
          }
        />

        {/* 20-Second Interactive Website Matchmaker */}
        <QuickMatchmakerSection
          templates={templates}
          lang={lang}
          onOpenLivePreview={setActivePreviewTemplate}
          onOpenRequestModal={(tmpl) => handleOpenRequestModal(tmpl)}
        />

        {/* 72-Hour Express Delivery Callout */}
        <ExpressDeliveryCallout
          lang={lang}
          onOpenExpressRequest={() =>
            handleOpenRequestModal(undefined, undefined, undefined, {
              templateName: '72-Uur Spoedservice Website',
              budget: 'Vanaf €125 (Spoedlevering)',
              notes: 'Aanvraag via 72-Uur Spoedservice: ik heb met spoed binnen 3 dagen een werkende website nodig.',
            })
          }
        />

        {/* Custom Design / Website Redesign Callout Banner */}
        <div className="my-6 p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 text-stone-900 dark:text-white shadow-xs flex flex-col md:flex-row items-center justify-between gap-6 transition-colors">
          <div className="space-y-2 text-center md:text-left max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 dark:bg-blue-950/60 text-orange-800 dark:text-blue-300 text-xs font-bold border border-orange-300 dark:border-blue-800/60">
              <span>🎨 Geen template nodig?</span>
              <span>•</span>
              <span>100% Maatwerk</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black tracking-tight text-stone-900 dark:text-white">
              {lang === 'nl'
                ? 'Heb je al een bestaande website of een eigen ontwerp in gedachten?'
                : 'Already have an existing site or your own custom design plan?'}
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-slate-300 leading-relaxed font-medium">
              {lang === 'nl'
                ? 'Je zit nergens aan vast. Wil je een gedateerde website laten moderniseren (redesign), of heb je al een eigen schets, wireframe of Figma-ontwerp? Wij bouwen jouw website exact zoals jij het wilt.'
                : 'No template required. Need an existing website modernized, or already have your own wireframe/plan? We code your vision 1:1.'}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full md:w-auto">
            <button
              onClick={() =>
                handleOpenRequestModal(undefined, undefined, undefined, {
                  templateName: 'Website Redesign (Bestaande Website)',
                  budget: '€175 - €450 (Redesign Pakket)',
                  notes: 'Aanvraag voor modernisering / redesign van mijn huidige website.',
                })
              }
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-orange-700 hover:bg-orange-800 text-white font-extrabold text-xs shadow-md shadow-orange-700/30 transition-all cursor-pointer whitespace-nowrap text-center"
            >
              <span>🔄 Bestaande Website Redesign</span>
            </button>

            <button
              onClick={() =>
                handleOpenRequestModal(undefined, undefined, undefined, {
                  templateName: 'Eigen Ontwerp / Schets / Figma Plan',
                  budget: '€245 - €650 (Eigen Ontwerp)',
                  notes: 'Ik heb al een eigen plan of schets voor mijn website.',
                })
              }
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-stone-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 font-extrabold text-xs transition-all cursor-pointer whitespace-nowrap text-center shadow-xs"
            >
              <span>📐 Eigen Ontwerp Bespreken</span>
            </button>
          </div>
        </div>

        {/* Live iDEAL Checkout Simulator */}
        <LiveIdealCheckoutSimulator
          lang={lang}
          onOpenWebshopRequest={() =>
            handleOpenRequestModal(undefined, undefined, undefined, {
              templateName: 'Webshop met iDEAL & Mollie',
              budget: '€385 (Webshop Pakket)',
              notes: 'Aanvraag voor e-commerce webshop met iDEAL, Mollie en PostNL integratie.',
            })
          }
        />

        {/* Section: Waarom Next.js? (Speed audit, CMS comparison & Before/After) */}
        <section id="waarom-nextjs" className="py-12 sm:py-16 border-t border-slate-200/80 dark:border-slate-800 scroll-mt-24 space-y-6">
          <div className="text-center max-w-2xl mx-auto mb-2">
            <span className="text-xs font-black uppercase tracking-wider text-orange-700 dark:text-blue-400 bg-orange-50 dark:bg-blue-950/60 px-3 py-1 rounded-full border border-orange-200/60 dark:border-blue-800/60 inline-block mb-2">
              ⚡ Waarom Next.js?
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-stone-900 dark:text-white">
              {lang === 'nl' ? 'Sneller dan WordPress, beter vindbaar in Google' : 'Faster than WordPress, higher on Google'}
            </h2>
          </div>

          {/* Interactive Before & After Redesign Slider */}
          <BeforeAfterRedesignSection
            lang={lang}
            onOpenRedesignRequest={() =>
              handleOpenRequestModal(undefined, undefined, undefined, {
                templateName: 'Website Redesign (Bestaande site ombouwen)',
                budget: 'Vanaf €175 (Redesign)',
                notes: 'Aanvraag via Voor & Na Redesign Slider: ik wil mijn huidige trage website laten moderniseren naar een razendsnelle Next.js site.',
              })
            }
          />

          {/* Website Sloopregeling / Trade-in Program */}
          <TradeInTradeUpBanner
            lang={lang}
            onClaimDiscount={(cms, discountCode, discountAmount) =>
              handleOpenRequestModal(undefined, undefined, undefined, {
                templateName: `Website Sloopregeling (${cms})`,
                budget: `Inruilkorting: -€${discountAmount} (Code: ${discountCode})`,
                notes: `Aanvraag via Website Sloopregeling: inruil van huidige ${cms} website met inruilpremie ${discountCode} (-€${discountAmount}).`,
              })
            }
          />

          {/* Website Speed & SEO QuickScan Tool */}
          <WebsiteSpeedAuditSection
            lang={lang}
            onOpenRedesignRequest={(url) =>
              handleOpenRequestModal(undefined, undefined, undefined, {
                templateName: `Website Redesign (${url})`,
                budget: 'Vanaf €175 (Redesign)',
                notes: `Aanvraag via Website QuickScan voor domeinnaam "${url}". Ik wil graag mijn laadtijd en Google-posities laten optimaliseren met Next.js.`,
              })
            }
          />

          {/* Lost Customers & Omzetverlies Calculator */}
          <LostCustomerCalculator
            onOpenRedesignRequest={({ monthlyLoss, visitors, loadTime }) =>
              handleOpenRequestModal(undefined, undefined, undefined, {
                templateName: 'Website Redesign (Omzetlek Dichten)',
                budget: 'Vanaf €175 (Redesign Pakket)',
                notes: `Aanvraag via Omzetlek Calculator: met ${visitors} bezoekers en ${loadTime}s laadtijd verlies ik momenteel naar schatting €${monthlyLoss}/mnd. Ik wil dit oplossen met een snelle Next.js site.`,
              })
            }
          />

          {/* Local SEO Ranking Checker per City */}
          <LocalSeoRankChecker
            lang={lang}
            onOpenLocalRequest={(city, niche) =>
              handleOpenRequestModal(undefined, undefined, undefined, {
                templateName: `Lokale SEO Website (${city} - ${niche})`,
                budget: 'Vanaf €195 (Compleet MKB)',
                notes: `Aanvraag voor lokale Google vindbaarheid in ${city} voor branche ${niche}.`,
              })
            }
          />

          {/* Google 5-Star Search Snippet Previewer */}
          <GoogleSnippetPreviewer
            onRequestQuote={() =>
              handleOpenRequestModal(undefined, undefined, undefined, {
                templateName: 'Google Top-Rank SEO Website',
                budget: '€195 - €385 (SEO Geoptimaliseerd)',
                notes: 'Aanvraag via Google Snippet Previewer: ik wil dat mijn website hoog in Google scoort met sterren en snelle laadtijd.',
              })
            }
          />

          {/* 12-City Regional & Local SEO Hub */}
          <LocalSeoCityHub
            onOpenCityRequest={(city) =>
              handleOpenRequestModal(undefined, undefined, undefined, {
                templateName: `Lokale SEO Website ${city.name}`,
                budget: 'Vanaf €195 (Compleet MKB)',
                notes: `Aanvraag via Lokale SEO Hub voor ${city.name} (${city.province}, postcodes ${city.postcodeRange}). Focus: ${city.nicheFocus}.`,
              })
            }
          />

          {/* "Waarom Next.js i.p.v. WordPress of Wix?" Kennis- & Vergelijkingstabel */}
          <CmsComparisonSection
            lang={lang}
            onOpenCalculator={() => {
              const el = document.getElementById('prijs-calculator');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            onOpenRedesignRequest={() =>
              handleOpenRequestModal(undefined, undefined, undefined, {
                templateName: 'Website Redesign van WordPress/Wix naar Next.js',
                budget: 'Vanaf €175 (Redesign)',
                notes: 'Aanvraag via WordPress vs Next.js vergelijker: ik wil overstappen van WordPress/Wix naar Next.js.',
              })
            }
          />
        </section>

        {/* Section: Hoe Wij Werken & Checklist */}
        <section id="hoe-het-werkt" className="py-12 sm:py-16 border-t border-slate-200/80 dark:border-slate-800 scroll-mt-24 space-y-6">
          {/* 4-Step "Hoe Wij Werken" Section */}
          <HowItWorksSection
            lang={lang}
            onOpenRequestModal={() => handleOpenRequestModal()}
            onScrollToTemplates={() => {
              const el = document.getElementById('templates-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
          />

          {/* Interactive 5-Day Delivery Client Portal Simulator */}
          <ClientPortalSimulator
            onRequestWebsite={() =>
              handleOpenRequestModal(undefined, undefined, undefined, {
                templateName: '5-Dagen Oplevertraject Website',
                budget: '€195 - €385 (MKB Pakket)',
                notes: 'Aanvraag via 5-Dagen Oplever-Simulator: ik wil graag starten met de 5-daagse oplevering van mijn nieuwe website.',
              })
            }
          />

          {/* Interactive "Wat Moet Ik Zelf Aanleveren?" Checklist */}
          <ClientChecklistSection
            lang={lang}
            onOpenRequestModal={() => handleOpenRequestModal()}
            onOpenChecklistModal={() => setIsChecklistModalOpen(true)}
          />

          {/* Free Copywriting Service Callout */}
          <CopywritingServiceCallout
            lang={lang}
            onOpenRequestModal={() =>
              handleOpenRequestModal(undefined, undefined, undefined, {
                templateName: 'Website inclusief Schrijfservice',
                budget: 'Vanaf €195 (Compleet MKB)',
                notes: 'Aanvraag via Schrijfservice: ik wil graag dat Samen Online professionele Nederlandse teksten voor mijn website verzorgt.',
              })
            }
          />

          {/* Starter Checklist 2026 Download Banner */}
          <StarterChecklistDownloadBanner
            lang={lang}
            onOpenChecklistModal={() => setIsChecklistModalOpen(true)}
          />
        </section>

        {/* Section: Garanties & Zekerheden */}
        <section id="garanties" className="py-12 sm:py-16 border-t border-slate-200/80 dark:border-slate-800 scroll-mt-24">
          <GuaranteesSection
            lang={lang}
            onOpenCalculator={() => {
              const el = document.getElementById('prijs-calculator');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            onOpenRequestModal={() => handleOpenRequestModal()}
          />
        </section>

        {/* Section: Pakketten & Calculators */}
        <section id="pakketten" className="py-12 sm:py-16 border-t border-slate-200/80 dark:border-slate-800 scroll-mt-24 space-y-6">
          <div className="text-center max-w-2xl mx-auto mb-2">
            <span className="text-xs font-black uppercase tracking-wider text-orange-700 dark:text-blue-400 bg-orange-50 dark:bg-blue-950/60 px-3 py-1 rounded-full border border-orange-200/60 dark:border-blue-800/60 inline-block mb-2">
              💰 Transparante Tarieven
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-stone-900 dark:text-white">
              {lang === 'nl' ? 'Vaste all-in pakketten & online calculators' : 'Fixed pricing & instant calculators'}
            </h2>
          </div>

          {/* Transparante Vaste Pakkettentabel */}
          <PricingPackagesSection
            lang={lang}
            onSelectPackage={(name, budget, notes) =>
              handleOpenRequestModal(undefined, undefined, undefined, {
                templateName: name,
                budget,
                notes,
              })
            }
          />

          {/* 2-Year Total Cost Comparison: Agency vs SaaS vs Samen Online */}
          <CostComparisonCalculator
            lang={lang}
            onOpenRequestModal={() => handleOpenRequestModal()}
            onScrollToPricing={() => {
              const el = document.getElementById('prijs-calculator');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
          />

          {/* 60-Second Price Estimator Calculator */}
          <PriceEstimatorCalculator
            lang={lang}
            onOpenRequestModal={(customData) => {
              handleOpenRequestModal(undefined, undefined, undefined, customData);
            }}
          />

          {/* MKB Website ROI & Rendement Calculator */}
          <RoiEstimatorCalculator
            lang={lang}
            onOpenRequestModal={(customData) => {
              handleOpenRequestModal(undefined, undefined, undefined, customData);
            }}
          />

          {/* 1 Extra Klant Break-Even Terugverdientijd Visualisatie */}
          <CustomerRoiBreakEven
            lang={lang}
            onOpenRequestModal={() => handleOpenRequestModal()}
          />
        </section>

        {/* Section: Over Ons & FAQ */}
        <section id="faq-section" className="py-12 sm:py-16 border-t border-slate-200/80 dark:border-slate-800 scroll-mt-24 space-y-6">
          {/* Authentic Dutch Craft & Guarantees Badges */}
          <DutchCraftTrustBadges lang={lang} />

          {/* About Samen Online Section */}
          <AboutSection lang={lang} />

          {/* SEO FAQ Section */}
          <FaqSection lang={lang} onOpenContactModal={() => handleOpenRequestModal()} />
        </section>
      </main>

      {/* Footer */}
      <Footer
        lang={lang}
        onSelectCategory={setSelectedCategory}
        onOpenRequestModal={() => handleOpenRequestModal()}
        onOpenInfoModal={handleOpenInfoModal}
      />

      {/* Client-Side Quick Answer Website Copilot */}
      <WebsiteCopilotWidget
        onOpenRequestModal={(data) =>
          handleOpenRequestModal(undefined, undefined, undefined, data)
        }
      />

      {/* Floating WhatsApp Contact Widget */}
      <WhatsAppWidget lang={lang} />

      {/* Mobile Sticky Quick Action Bar */}
      <MobileStickyBar lang={lang} onOpenRequestModal={() => handleOpenRequestModal()} />

      {/* Floating Section Dock & Dropdown Navigation */}
      <FloatingSectionNav lang={lang} totalTemplatesCount={templates.length} />
      </div>

      {/* Template Details Modal */}
      <TemplateModal
        template={activeModalTemplate}
        lang={lang}
        onClose={() => setActiveModalTemplate(null)}
        onOpenLivePreview={setActivePreviewTemplate}
        onOpenRequestModal={(tmpl) => handleOpenRequestModal(tmpl)}
        isBookmarked={activeModalTemplate ? bookmarks.includes(activeModalTemplate.id) : false}
        onToggleBookmark={handleToggleBookmark}
      />

      {/* Live Interactive Preview Modal with Live Color Theme Customizer */}
      <LivePreviewModal
        template={activePreviewTemplate}
        lang={lang}
        onClose={() => setActivePreviewTemplate(null)}
        onOpenRequestModal={handleOpenRequestModal}
      />

      {/* Request Website Modal */}
      <RequestWebsiteModal
        isOpen={isRequestModalOpen}
        selectedTemplate={requestModalTemplate}
        lang={lang}
        preferredTheme={requestModalTheme}
        preferredFont={requestModalFont}
        initialCustomData={requestModalCustomData}
        onClose={() => {
          setIsRequestModalOpen(false);
          setRequestModalTemplate(null);
          setRequestModalTheme(undefined);
          setRequestModalFont(undefined);
          setRequestModalCustomData(null);
        }}
      />

      {/* Template Comparison Modal */}
      <TemplateComparisonModal
        isOpen={isComparisonModalOpen}
        onClose={() => setIsComparisonModalOpen(false)}
        templates={templates}
        lang={lang}
        onSelectTemplate={(tmpl) => handleOpenRequestModal(tmpl)}
        onOpenLivePreview={(tmpl) => setActivePreviewTemplate(tmpl)}
      />

      {/* 3-Vragen Keuzehulp Wizard Modal */}
      <ConceptWizardModal
        isOpen={isWizardModalOpen}
        onClose={() => setIsWizardModalOpen(false)}
        templates={templates}
        lang={lang}
        onSelectTemplate={(tmpl) => handleOpenRequestModal(tmpl)}
        onOpenLivePreview={(tmpl) => setActivePreviewTemplate(tmpl)}
      />

      {/* Project Status & Oplevering Tracker Modal */}
      <ProjectStatusTrackerModal
        isOpen={isStatusTrackerOpen}
        onClose={() => setIsStatusTrackerOpen(false)}
        lang={lang}
        onOpenContactModal={() => handleOpenRequestModal()}
      />

      {/* Starter Checklist 2026 Modal */}
      <StarterChecklistModal
        isOpen={isChecklistModalOpen}
        onClose={() => setIsChecklistModalOpen(false)}
        lang={lang}
      />

      {/* Informational / Legal Modal */}
      <InfoModal
        isOpen={infoModalData.isOpen}
        title={infoModalData.title}
        content={infoModalData.content}
        onClose={() => setInfoModalData({ isOpen: false, title: '', content: '' })}
      />
    </div>
  );
}
