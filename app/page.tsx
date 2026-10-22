'use client';

import React, { useState, useMemo } from 'react';
import { Navbar } from '@/src/components/Navbar';
import { Hero } from '../src/components/Hero';
import { TemplateCarousel } from '../src/components/TemplateCarousel';
import { FilterBar } from '../src/components/FilterBar';
import { TemplateCard } from '../src/components/TemplateCard';
import { TemplateModal } from '../src/components/TemplateModal';
import { LivePreviewModal } from '../src/components/LivePreviewModal';
import { RequestWebsiteModal } from '../src/components/RequestWebsiteModal';
import { InfoModal } from '../src/components/InfoModal';
import { AboutSection } from '../src/components/AboutSection';
import { Footer } from '../src/components/Footer';
import { PriceEstimatorCalculator } from '../src/components/PriceEstimatorCalculator';
import { FaqSection } from '../src/components/FaqSection';
import { WhatsAppWidget } from '../src/components/WhatsAppWidget';

import { INITIAL_TEMPLATES } from '../src/data/templates';
import { WebTemplate, CategoryType, Language } from '../src/types/company';
import { Heart, Search } from 'lucide-react';

export default function Home() {
  const [lang, setLang] = useState<Language>('nl');
  const [templates, setTemplates] = useState<WebTemplate[]>(INITIAL_TEMPLATES);

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('All');
  const [sortBy, setSortBy] = useState<'rating' | 'name' | 'buildDays'>('rating');
  const [showOnlyBookmarks, setShowOnlyBookmarks] = useState(false);

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
  const [infoModalData, setInfoModalData] = useState<{ isOpen: boolean; title: string; content: string }>({
    isOpen: false,
    title: '',
    content: '',
  });

  const isAnyModalOpen = Boolean(
    activeModalTemplate ||
    activePreviewTemplate ||
    isRequestModalOpen ||
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

        // Bookmarks filter
        return !(showOnlyBookmarks && !bookmarks.includes(tmpl.id));
      })
      .sort((a, b) => {
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'name') return a.name.localeCompare(b.name);
        if (sortBy === 'buildDays') return a.estimatedBuildDays - b.estimatedBuildDays;
        return 0;
      });
  }, [templates, searchQuery, selectedCategory, showOnlyBookmarks, bookmarks, sortBy]);

  return (
    <div className="min-h-screen bg-amber-50/20 flex flex-col font-sans selection:bg-orange-500 selection:text-white">
      {/* Top Navbar */}
      <Navbar
        lang={lang}
        onLanguageToggle={handleLanguageToggle}
        onOpenRequestModal={() => handleOpenRequestModal()}
        totalTemplatesCount={templates.length}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Welcoming Hero Header */}
      <Hero
        lang={lang}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {/* Featured Templates Interactive Carousel */}
      <TemplateCarousel
        templates={templates}
        lang={lang}
        onOpenDetails={setActiveModalTemplate}
        onOpenLivePreview={setActivePreviewTemplate}
        onOpenRequestModal={(tmpl) => handleOpenRequestModal(tmpl)}
        isPaused={isAnyModalOpen}
      />

      {/* Interactive Sticky Filter & Sort Bar */}
      <FilterBar
        lang={lang}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        sortBy={sortBy}
        onSortChange={setSortBy}
        totalFilteredCount={filteredTemplates.length}
      />

      {/* Main Content Area */}
      <main id="templates-section" className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 scroll-mt-24">
        {/* Bookmarks Banner */}
        {bookmarks.length > 0 && (
          <div className="mb-6 flex items-center justify-between bg-rose-50 border-2 border-rose-200 p-3.5 rounded-2xl">
            <div className="flex items-center gap-2 text-rose-900 text-xs font-bold">
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
                  : 'bg-white text-rose-700 border border-rose-300 hover:bg-rose-100'
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

        {/* Templates Grid */}
        {filteredTemplates.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTemplates.map((template) => (
              <TemplateCard
                key={template.id}
                template={template}
                lang={lang}
                onOpenDetails={setActiveModalTemplate}
                onOpenLivePreview={setActivePreviewTemplate}
                onOpenRequestModal={(tmpl) => handleOpenRequestModal(tmpl)}
                isBookmarked={bookmarks.includes(template.id)}
                onToggleBookmark={handleToggleBookmark}
              />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-20 bg-white rounded-3xl border-2 border-orange-100 p-8 max-w-md mx-auto my-8 shadow-sm">
            <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-stone-900 mb-2">
              {lang === 'nl' ? 'Geen concepten gevonden' : 'No website templates found'}
            </h3>
            <p className="text-xs text-stone-600 mb-6 font-medium leading-relaxed">
              {lang === 'nl'
                ? 'Geen resultaten voor jouw zoekopdracht. Probeer een andere categorie of zoekterm.'
                : 'No templates match your filters. Try clearing your search query.'}
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setShowOnlyBookmarks(false);
              }}
              className="px-5 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs shadow-md transition-colors cursor-pointer"
            >
              {lang === 'nl' ? 'Herstel Alle Filters' : 'Reset All Filters'}
            </button>
          </div>
        )}

        {/* 60-Second Price Estimator Calculator */}
        <PriceEstimatorCalculator
          lang={lang}
          onOpenRequestModal={(customData) => {
            handleOpenRequestModal(undefined, undefined, undefined, customData);
          }}
        />

        {/* About Samen Online Section */}
        <AboutSection lang={lang} />

        {/* SEO FAQ Section */}
        <FaqSection lang={lang} />
      </main>

      {/* Footer */}
      <Footer
        lang={lang}
        onSelectCategory={setSelectedCategory}
        onOpenRequestModal={() => handleOpenRequestModal()}
        onOpenInfoModal={handleOpenInfoModal}
      />

      {/* Floating WhatsApp Contact Widget */}
      <WhatsAppWidget lang={lang} />

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
