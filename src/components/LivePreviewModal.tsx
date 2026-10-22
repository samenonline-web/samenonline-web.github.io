'use client';

import React, { useState, useEffect } from 'react';
import { X, ExternalLink, Smartphone, Monitor, Palette, ArrowRight } from 'lucide-react';
import { WebTemplate, Language } from '../types/company';
import { COLOR_THEMES, ColorThemeId } from '../types/theme';
import { TemplateRenderer } from './templates/TemplateRenderer';
import Link from 'next/link';

interface LivePreviewModalProps {
  template: WebTemplate | null;
  lang: Language;
  onClose: () => void;
  onOpenRequestModal: (template: WebTemplate) => void;
}

export const LivePreviewModal: React.FC<LivePreviewModalProps> = ({
  template,
  lang,
  onClose,
  onOpenRequestModal,
}) => {
  const [selectedThemeId, setSelectedThemeId] = useState<ColorThemeId>('orange');
  const [viewportMode, setViewportMode] = useState<'desktop' | 'mobile'>('desktop');

  useEffect(() => {
    if (!template) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [template, onClose]);

  if (!template) return null;

  const currentTheme = COLOR_THEMES[selectedThemeId];

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200 cursor-pointer"
    >
      <div
        className="bg-stone-900 w-full max-w-6xl h-[95vh] rounded-3xl shadow-2xl overflow-hidden border border-stone-800 flex flex-col cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Control Bar */}
        <div className="bg-stone-950 px-4 sm:px-6 py-3 border-b border-stone-800 flex flex-wrap items-center justify-between gap-3 text-white">
          
          {/* Left: Template Info */}
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-xl ${template.logoBg} flex items-center justify-center text-white text-xs font-black shadow-xs`}>
              {template.logoText}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-sm tracking-tight text-white">{template.name}</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 hidden sm:inline-block">
                  ● Live Template Demo
                </span>
              </div>
              <span className="text-[10px] text-stone-400 font-medium hidden md:block">
                {lang === 'nl' ? 'Pas live de huiskleur aan of wissel weergave' : 'Customize brand color or change viewport'}
              </span>
            </div>
          </div>

          {/* Center: Live Theme Color Picker & Viewport Toggles */}
          <div className="flex items-center gap-4 bg-stone-900/90 px-3 py-1.5 rounded-2xl border border-stone-800">
            
            {/* Color Palette Switcher */}
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-bold text-stone-400 flex items-center gap-1 hidden sm:flex">
                <Palette className="w-3.5 h-3.5 text-stone-400" />
                <span>Kleur:</span>
              </span>
              {(['orange', 'blue', 'green', 'purple', 'dark', 'red'] as ColorThemeId[]).map((cId) => {
                const colorConfig = COLOR_THEMES[cId];
                const isSelected = selectedThemeId === cId;
                const dotBg = cId === 'orange' ? '#ea580c' : cId === 'blue' ? '#0284c7' : cId === 'green' ? '#059669' : cId === 'purple' ? '#9333ea' : cId === 'dark' ? '#292524' : '#e11d48';
                return (
                  <button
                    key={cId}
                    onClick={() => setSelectedThemeId(cId)}
                    title={colorConfig.name}
                    className={`w-6 h-6 rounded-full border-2 transition-transform cursor-pointer ${
                      isSelected ? 'border-white scale-115 ring-2 ring-white/30' : 'border-transparent hover:scale-105 opacity-80 hover:opacity-100'
                    }`}
                    style={{ backgroundColor: dotBg }}
                  />
                );
              })}
            </div>

            <div className="w-px h-4 bg-stone-700 hidden sm:block"></div>

            {/* Desktop / Mobile Switcher */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => setViewportMode('desktop')}
                title="Desktop Weergave"
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  viewportMode === 'desktop' ? 'bg-stone-800 text-white' : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                <Monitor className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewportMode('mobile')}
                title="Mobiele Weergave"
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  viewportMode === 'mobile' ? 'bg-stone-800 text-white' : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                <Smartphone className="w-4 h-4" />
              </button>
            </div>

          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2">
            <Link
              href={`/demo/${template.id}`}
              target="_blank"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-bold transition-colors cursor-pointer"
              title="Open template in nieuw tabblad fullscreen"
            >
              <span className="hidden sm:inline">Fullscreen</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            <button
              onClick={() => {
                onClose();
                onOpenRequestModal(template);
              }}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-extrabold shadow-sm transition-all cursor-pointer whitespace-nowrap"
            >
              <span>{lang === 'nl' ? 'Website Aanvragen' : 'Get This Website'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

        </div>

        {/* Live Canvas Area */}
        <div className="flex-1 bg-stone-900 overflow-y-auto p-2 sm:p-6 flex justify-center items-start">
          <div
            className={`transition-all duration-300 bg-white rounded-2xl shadow-xl overflow-hidden border border-stone-200 ${
              viewportMode === 'mobile'
                ? 'w-full max-w-[380px] min-h-[680px] my-auto ring-8 ring-stone-950 rounded-[40px]'
                : 'w-full min-h-full'
            }`}
          >
            <TemplateRenderer
              templateId={template.id}
              theme={currentTheme}
              onRequestQuote={() => {
                onClose();
                onOpenRequestModal(template);
              }}
            />
          </div>
        </div>

      </div>
    </div>
  );
};
