'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Sparkles, Check, ArrowRight, Clock, Star, Globe } from 'lucide-react';
import { WebTemplate, Language } from '../types/company';

interface TemplateCarouselProps {
  templates: WebTemplate[];
  lang: Language;
  onOpenDetails: (template: WebTemplate) => void;
  onOpenLivePreview: (template: WebTemplate) => void;
  onOpenRequestModal: (template?: WebTemplate) => void;
}

export const TemplateCarousel: React.FC<TemplateCarouselProps> = ({
  templates,
  lang,
  onOpenDetails,
  onOpenLivePreview,
  onOpenRequestModal,
}) => {
  const featuredTemplates = templates.filter((t) => t.isFeatured);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    if (!isAutoPlay || featuredTemplates.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredTemplates.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isAutoPlay, featuredTemplates.length]);

  if (featuredTemplates.length === 0) return null;

  const handlePrev = () => {
    setIsAutoPlay(false);
    setCurrentIndex((prev) => (prev - 1 + featuredTemplates.length) % featuredTemplates.length);
  };

  const handleNext = () => {
    setIsAutoPlay(false);
    setCurrentIndex((prev) => (prev + 1) % featuredTemplates.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) handleNext();
      else handlePrev();
    }
    touchStartX.current = null;
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-10">
      
      {/* Outer Card: Bright, Friendly White Card with Warm Orange Border */}
      <div 
        className="relative rounded-3xl overflow-hidden shadow-xl shadow-orange-500/5 border-2 border-orange-100 bg-white text-slate-900"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        
        {/* Carousel Track Container */}
        <div className="relative z-10 overflow-hidden">
          <div
            className="flex transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {featuredTemplates.map((template) => {
              const subtitle = lang === 'nl' ? template.subtitleNl : template.subtitle;
              const description = lang === 'nl' ? template.descriptionNl : template.description;
              const highlight = lang === 'nl' ? template.highlightSnippetNl : template.highlightSnippet;
              const features = lang === 'nl' ? template.featuresNl : template.features;

              return (
                <div
                  key={template.id}
                  className="w-full shrink-0 flex-none p-6 sm:p-10 lg:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white"
                >
                  
                  {/* Left Column: Info & Copy */}
                  <div className="lg:col-span-7 space-y-6 text-left">
                    
                    {/* Top Pill Badges */}
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 text-orange-700 text-xs font-extrabold border border-orange-200">
                        <Sparkles className="w-3.5 h-3.5 text-orange-600" />
                        {lang === 'nl' ? 'Uitgelicht Concept' : 'Featured Concept'}
                      </span>

                      {template.badges.map((badge, idx) => (
                        <span key={idx} className="px-3 py-1 rounded-full bg-amber-50 text-amber-900 text-xs font-bold border border-amber-200/80">
                          {badge}
                        </span>
                      ))}
                    </div>

                    {/* Title & Subtitle */}
                    <div>
                      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-2">
                        {template.name}
                      </h2>
                      <p className="text-lg font-bold text-orange-600">
                        {subtitle}
                      </p>
                    </div>

                    {/* Description */}
                    <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium max-w-xl">
                      {description}
                    </p>

                    {/* Feature Pills */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                      {features.map((feat, idx) => (
                        <div key={idx} className="flex items-center gap-2.5 text-xs font-bold text-slate-800 bg-orange-50/60 px-3.5 py-2.5 rounded-xl border border-orange-100">
                          <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap items-center gap-3 pt-4">
                      <button
                        onClick={() => onOpenLivePreview(template)}
                        className="px-6 py-3.5 rounded-2xl bg-orange-600 hover:bg-orange-700 text-white font-extrabold text-sm shadow-md shadow-orange-600/20 flex items-center gap-2 transform active:scale-95 transition-all cursor-pointer"
                      >
                        <Globe className="w-4 h-4" />
                        <span>{lang === 'nl' ? '🌐 Bekijk Live Template' : '🌐 View Live Template'}</span>
                      </button>

                      <button
                        onClick={() => onOpenDetails(template)}
                        className="px-5 py-3.5 rounded-2xl bg-white hover:bg-orange-50 text-stone-800 font-bold text-sm border-2 border-orange-200 hover:border-orange-300 transition-colors cursor-pointer"
                      >
                        {lang === 'nl' ? 'Bekijk Details' : 'View Details'}
                      </button>
                    </div>

                  </div>

                  {/* Right Column: Visual Mockup Preview */}
                  <div className="lg:col-span-5 flex flex-col items-center justify-center">
                    
                    {/* Mockup Card Frame */}
                    <div className="w-full bg-white border-2 border-orange-100 rounded-3xl p-6 shadow-xl shadow-orange-500/5 relative transform hover:scale-102 transition-transform">
                      
                      {/* Fake Browser Window Header */}
                      <div className="flex items-center justify-between pb-3 mb-5 border-b border-orange-100 text-xs text-slate-400">
                        <div className="flex items-center gap-1.5">
                          <span className="w-3 h-3 rounded-full bg-red-400 inline-block" />
                          <span className="w-3 h-3 rounded-full bg-amber-400 inline-block" />
                          <span className="w-3 h-3 rounded-full bg-emerald-400 inline-block" />
                        </div>
                        <span className="font-mono text-[11px] text-orange-950 bg-orange-50 px-3 py-1 rounded-full border border-orange-200/80 font-bold">
                          https://{template.id}.samenonline.nl
                        </span>
                      </div>

                      {/* Mockup Screen Content */}
                      <div className="space-y-4 text-left">
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`w-12 h-12 rounded-2xl ${template.logoBg} flex items-center justify-center text-white font-extrabold text-base shadow-md`}>
                              {template.logoText}
                            </div>
                            <div>
                              <h4 className="font-bold text-base text-slate-900">{template.name}</h4>
                              <p className="text-xs text-slate-500 font-medium">{template.city}, {template.province}</p>
                            </div>
                          </div>
                          <span className="text-xs font-bold px-3 py-1 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200">
                            ⚡ {template.priceTier}
                          </span>
                        </div>

                        {/* Highlight Banner */}
                        <div className="p-3.5 rounded-2xl bg-orange-50 border border-orange-200/80 text-xs text-slate-800 font-medium">
                          <span className="font-bold text-orange-700 block mb-0.5">
                            {lang === 'nl' ? 'Highlights:' : 'Highlights:'}
                          </span>
                          {highlight}
                        </div>

                        {/* Specs Pill row */}
                        <div className="flex items-center justify-between text-xs text-slate-600 pt-3 border-t border-orange-100 font-semibold">
                          <div className="flex items-center gap-1.5">
                            <Clock className="w-4 h-4 text-orange-600" />
                            <span>{template.estimatedBuildDays} {lang === 'nl' ? 'dagen oplevertijd' : 'days build time'}</span>
                          </div>

                          <div className="flex items-center gap-1 font-bold text-amber-500">
                            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                            <span className="text-slate-800">{template.rating.toFixed(1)}</span>
                            <span className="text-slate-400">({template.reviewCount})</span>
                          </div>
                        </div>

                      </div>

                    </div>

                  </div>

                </div>
              );
            })}
          </div>
        </div>

        {/* Carousel Footer Navigation Bar */}
        <div className="relative z-20 px-6 py-4 bg-orange-50/50 border-t border-orange-100 flex items-center justify-between">
          
          {/* Left Arrow */}
          <button
            onClick={handlePrev}
            className="p-2.5 rounded-xl bg-white hover:bg-orange-100 active:scale-95 text-slate-700 hover:text-orange-600 transition-all border border-orange-200 shadow-xs cursor-pointer"
            title="Vorige template"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Dots Indicator */}
          <div className="flex items-center gap-2">
            {featuredTemplates.map((tmpl, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setIsAutoPlay(false);
                  setCurrentIndex(idx);
                }}
                className={`h-2.5 rounded-full transition-all duration-500 cursor-pointer ${
                  idx === currentIndex ? 'w-8 bg-orange-600 shadow-md shadow-orange-600/30' : 'w-2.5 bg-orange-200 hover:bg-orange-300'
                }`}
                title={tmpl.name}
              />
            ))}
          </div>

          {/* Right Arrow */}
          <button
            onClick={handleNext}
            className="p-2.5 rounded-xl bg-white hover:bg-orange-100 active:scale-95 text-slate-700 hover:text-orange-600 transition-all border border-orange-200 shadow-xs cursor-pointer"
            title="Volgende template"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

        </div>

      </div>

    </section>
  );
};
