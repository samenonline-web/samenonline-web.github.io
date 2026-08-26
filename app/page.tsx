'use client';

import React, { useState, useMemo } from 'react';
import { Navbar } from '../src/components/Navbar';
import { Hero } from '../src/components/Hero';
import { TemplateCarousel } from '../src/components/TemplateCarousel';
import { FilterBar } from '../src/components/FilterBar';
import { TemplateCard } from '../src/components/TemplateCard';
import { TemplateModal } from '../src/components/TemplateModal';
import { RequestWebsiteModal } from '../src/components/RequestWebsiteModal';
import { InfoModal } from '../src/components/InfoModal';
import { AboutSection } from '../src/components/AboutSection';
import { Footer } from '../src/components/Footer';

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
  const [requestModalTemplate, setRequestModalTemplate] = useState<WebTemplate | null>(null);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [infoModalData, setInfoModalData] = useState<{ isOpen: boolean; title: string; content: string }>({
    isOpen: false,
    title: '',
    content: '',
  });

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

  // Open Request Modal
  const handleOpenRequestModal = (template?: WebTemplate) => {
    setRequestModalTemplate(template || null);
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
          const matchFeat = tmpl.features.some((f) => f.toLowerCase().includes(q)) || tmpl.featuresNl.some((f) => f.toLowerCase().includes(q));
          if (!matchName && !matchSub && !matchDesc && !matchCity && !matchProvince && !matchFeat) {
            return false;
          }
        }

        // Category Filter
        if (selectedCategory !== 'All' && tmpl.category !== selectedCategory) {
          return false;
        }

        // Bookmarks filter
        if (showOnlyBookmarks && !bookmarks.includes(tmpl.id)) {
          return false;
        }

        return true;
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
        onOpenRequestModal={handleOpenRequestModal}
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
                ? (lang === 'nl' ? 'Toon Alles' : 'Show All')
                : (lang === 'nl' ? 'Toon Alleen Favorieten' : 'Show Bookmarks Only')}
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
                onOpenRequestModal={handleOpenRequestModal}
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

        {/* About Samen Online Section */}
        <AboutSection lang={lang} />

      </main>

      {/* Footer */}
      <Footer
        lang={lang}
        onSelectCategory={setSelectedCategory}
        onOpenRequestModal={() => handleOpenRequestModal()}
        onOpenInfoModal={handleOpenInfoModal}
      />

      {/* Template Details Modal */}
      <TemplateModal
        template={activeModalTemplate}
        lang={lang}
        onClose={() => setActiveModalTemplate(null)}
        onOpenRequestModal={handleOpenRequestModal}
        isBookmarked={activeModalTemplate ? bookmarks.includes(activeModalTemplate.id) : false}
        onToggleBookmark={handleToggleBookmark}
      />

      {/* Request Website Modal */}
      <RequestWebsiteModal
        isOpen={isRequestModalOpen}
        selectedTemplate={requestModalTemplate}
        lang={lang}
        onClose={() => {
          setIsRequestModalOpen(false);
          setRequestModalTemplate(null);
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
