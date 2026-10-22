'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Palette, ArrowRight, Heart, Type, Sun, Moon } from 'lucide-react';
import { WebTemplate } from '../../../src/types/company';
import { COLOR_THEMES, ColorThemeId, FONT_STYLES, FontStyleId } from '../../../src/types/theme';
import { TemplateRenderer } from '../../../src/components/templates/TemplateRenderer';
import { RequestWebsiteModal } from '../../../src/components/RequestWebsiteModal';

interface DemoClientViewProps {
  template: WebTemplate;
}

export const DemoClientView: React.FC<DemoClientViewProps> = ({ template }) => {
  const [selectedThemeId, setSelectedThemeId] = useState<ColorThemeId>('orange');
  const [selectedFontId, setSelectedFontId] = useState<FontStyleId>('sans');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);

  const currentTheme = COLOR_THEMES[selectedThemeId];
  const currentFont = FONT_STYLES[selectedFontId];

  return (
    <div className="min-h-screen bg-stone-100 flex flex-col font-sans">
      {/* Floating Top Control Bar */}
      <header className="sticky top-0 z-40 bg-stone-900/95 backdrop-blur-md border-b border-stone-800 text-white px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-3 shadow-md">
        
        {/* Back Link & Brand */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-bold transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Terug naar Samen Online</span>
          </Link>

          <div className="hidden md:flex items-center gap-2 border-l border-stone-700 pl-3">
            <span className="font-extrabold text-sm text-white">{template.name}</span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              ● Live Demo
            </span>
          </div>
        </div>

        {/* Center: Live Brand Color & Font Switcher */}
        <div className="flex flex-wrap items-center gap-3">
          
          {/* Color Switcher */}
          <div className="flex items-center gap-2 bg-stone-950 px-3 py-1.5 rounded-xl border border-stone-800 text-xs font-bold">
            <span className="text-stone-400 flex items-center gap-1 hidden sm:flex">
              <Palette className="w-3.5 h-3.5 text-stone-400" />
              <span>Huisstijl Kleur:</span>
            </span>
            <div className="flex items-center gap-1.5">
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
          </div>

          {/* Font Switcher */}
          <div className="flex items-center gap-1.5 bg-stone-950 px-3 py-1.5 rounded-xl border border-stone-800 text-xs font-bold">
            <span className="text-stone-400 flex items-center gap-1 hidden sm:flex">
              <Type className="w-3.5 h-3.5 text-stone-400" />
              <span>Font:</span>
            </span>
            <div className="flex items-center gap-1">
              {(['sans', 'serif', 'rounded', 'tech'] as FontStyleId[]).map((fId) => {
                const fontConfig = FONT_STYLES[fId];
                const isSelected = selectedFontId === fId;
                return (
                  <button
                    key={fId}
                    onClick={() => setSelectedFontId(fId)}
                    title={`${fontConfig.name}: ${fontConfig.description}`}
                    className={`px-2 py-1 rounded-lg text-[10px] font-bold transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-orange-600 text-white font-extrabold shadow-2xs'
                        : 'text-stone-400 hover:text-white'
                    }`}
                  >
                    {fontConfig.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Dark / Light Mode Toggle */}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-extrabold transition-all cursor-pointer ${
              isDarkMode
                ? 'bg-amber-400/20 text-amber-300 border-amber-400/40 hover:bg-amber-400/30'
                : 'bg-stone-950 text-stone-300 border-stone-800 hover:bg-stone-800 hover:text-white'
            }`}
            title={isDarkMode ? 'Schakel naar Light mode' : 'Schakel naar Dark mode'}
          >
            {isDarkMode ? (
              <>
                <Sun className="w-3.5 h-3.5 text-amber-300" />
                <span>Light</span>
              </>
            ) : (
              <>
                <Moon className="w-3.5 h-3.5 text-stone-300" />
                <span>Dark</span>
              </>
            )}
          </button>

        </div>

        {/* Request CTA */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsRequestModalOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-extrabold shadow-sm transition-all cursor-pointer whitespace-nowrap"
          >
            <span>Vraag Deze Website Aan</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </header>

      {/* Main Fullscreen Template Canvas */}
      <main className={`flex-1 ${isDarkMode ? 'bg-stone-950 text-white' : 'bg-white'}`}>
        <TemplateRenderer
          templateId={template.id}
          theme={currentTheme}
          fontStyle={currentFont}
          isDarkMode={isDarkMode}
          onToggleDarkMode={() => setIsDarkMode((prev) => !prev)}
          onRequestQuote={() => setIsRequestModalOpen(true)}
        />
      </main>

      {/* Request Modal */}
      <RequestWebsiteModal
        isOpen={isRequestModalOpen}
        selectedTemplate={template}
        lang="nl"
        onClose={() => setIsRequestModalOpen(false)}
      />
    </div>
  );
};
