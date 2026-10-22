'use client';

import React, { useState } from 'react';
import { ColorTheme } from '../../types/theme';
import { Sun, Check, ArrowRight, ShieldCheck, Calculator, Star } from 'lucide-react';

interface TemplateProps {
  theme: ColorTheme;
  onRequestQuote: () => void;
}

export const ZonnePionierSolar: React.FC<TemplateProps> = ({ theme, onRequestQuote }) => {
  const [panelCount, setPanelCount] = useState(10);
  const [roofType, setRoofType] = useState<'schuin' | 'plat'>('schuin');

  const yearlyKwh = panelCount * 410;
  const yearlyEuro = Math.round(yearlyKwh * 0.28);
  const investment = panelCount * 450;
  const paybackYears = (investment / yearlyEuro).toFixed(1);

  return (
    <div className="min-h-full bg-white text-stone-900 font-sans">
      {/* Header */}
      <header className="border-b border-stone-200 px-6 py-4 flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-md z-10">
        <div className="flex items-center gap-3">
          <div className={`w-9 h-9 rounded-xl ${theme.primary} text-white font-black flex items-center justify-center text-sm shadow-sm`}>
            ZP
          </div>
          <div>
            <span className="font-extrabold text-base tracking-tight">ZonnePionier Installaties</span>
            <span className="block text-[10px] text-stone-500 font-medium">Arnhem • Zonne-energie & Thuisbatterijen</span>
          </div>
        </div>
        <div className="flex items-center gap-4 text-xs font-bold">
          <nav className="hidden sm:flex items-center gap-5 text-stone-600">
            <a href="#calculator" className="hover:text-stone-900">Dakscan Calculator</a>
            <a href="#garanties" className="hover:text-stone-900">25 Jaar Garantie</a>
            <a href="#reviews" className="hover:text-stone-900">Reviews (4.9/5)</a>
          </nav>
          <button
            onClick={onRequestQuote}
            className={`px-4 py-2 rounded-xl ${theme.primary} ${theme.primaryHover} text-white text-xs font-bold shadow-xs cursor-pointer`}
          >
            Gratis Dakscan
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className={`py-14 sm:py-20 px-6 ${theme.bgLight} border-b ${theme.borderLight} text-center`}>
        <div className="max-w-3xl mx-auto">
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${theme.badgeBg} ${theme.badgeText} text-xs font-extrabold mb-4 border ${theme.borderLight}`}>
            <Sun className="w-3.5 h-3.5" />
            <span>Erkend Installateur • Installatie Binnen 3 Weken</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-stone-900 tracking-tight leading-tight mb-4">
            Bespaar direct op je energierekening met <span className={theme.textPrimary}>topkwaliteit zonnepanelen</span>.
          </h1>
          <p className="text-stone-600 text-sm sm:text-base max-w-xl mx-auto mb-8">
            Volledig ontzorgd van vergunning tot meterkast. A-merk glas-glas panelen met 25 jaar vermogensgarantie.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="#calculator"
              className={`px-6 py-3 rounded-xl ${theme.primary} ${theme.primaryHover} text-white font-bold text-xs shadow-md flex items-center gap-2`}
            >
              <Calculator className="w-4 h-4" />
              <span>Bereken Jouw Dakopbrengst</span>
            </a>
            <button
              onClick={onRequestQuote}
              className="px-6 py-3 rounded-xl bg-white border border-stone-300 text-stone-800 text-xs font-bold hover:bg-stone-50 cursor-pointer"
            >
              Vraag Offerte Aan
            </button>
          </div>
        </div>
      </section>

      {/* Solar Calculator */}
      <section id="calculator" className="py-12 px-6 max-w-4xl mx-auto">
        <div className="bg-stone-50 rounded-3xl border-2 border-stone-200 p-8 shadow-xs">
          <div className="text-center max-w-lg mx-auto mb-8">
            <h2 className="text-2xl font-black text-stone-900">Directe Dakscan Calculator</h2>
            <p className="text-xs text-stone-500 font-medium">Bereken jouw verwachte stroomopbrengst en terugverdientijd</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <div>
                <label className="text-xs font-bold text-stone-700 block mb-2">Daktype:</label>
                <div className="grid grid-cols-2 gap-2 text-xs font-bold">
                  <button
                    onClick={() => setRoofType('schuin')}
                    className={`py-2 rounded-xl border transition-colors cursor-pointer ${
                      roofType === 'schuin' ? `${theme.primary} text-white border-transparent` : 'bg-white border-stone-300 text-stone-700'
                    }`}
                  >
                    Schuin Dak (Pannen)
                  </button>
                  <button
                    onClick={() => setRoofType('plat')}
                    className={`py-2 rounded-xl border transition-colors cursor-pointer ${
                      roofType === 'plat' ? `${theme.primary} text-white border-transparent` : 'bg-white border-stone-300 text-stone-700'
                    }`}
                  >
                    Plat Dak (Bitumen)
                  </button>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-stone-700 mb-2">
                  <span>Aantal Zonnepanelen:</span>
                  <span className={`text-base font-black ${theme.textPrimary}`}>{panelCount} panelen</span>
                </div>
                <input
                  type="range"
                  min="6"
                  max="24"
                  step="2"
                  value={panelCount}
                  onChange={(e) => setPanelCount(Number(e.target.value))}
                  className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-orange-600"
                />
                <div className="flex justify-between text-[10px] text-stone-400 font-bold mt-1">
                  <span>6 panelen</span>
                  <span>14 panelen</span>
                  <span>24 panelen</span>
                </div>
              </div>
            </div>

            {/* Calculations Card */}
            <div className={`p-6 rounded-2xl ${theme.bgLight} border-2 ${theme.borderLight} space-y-4`}>
              <div className="flex justify-between text-xs border-b border-stone-200/80 pb-2">
                <span className="text-stone-600 font-medium">Jaarlijkse Opwekking:</span>
                <span className="font-extrabold text-stone-900">{yearlyKwh.toLocaleString('nl-NL')} kWh</span>
              </div>
              <div className="flex justify-between text-xs border-b border-stone-200/80 pb-2">
                <span className="text-stone-600 font-medium">Geschatte Jaarbesparing:</span>
                <span className="font-black text-emerald-700 text-base">€{yearlyEuro.toLocaleString('nl-NL')} / jaar</span>
              </div>
              <div className="flex justify-between text-xs border-b border-stone-200/80 pb-2">
                <span className="text-stone-600 font-medium">Terugverdientijd:</span>
                <span className={`font-black ${theme.textPrimary} text-base`}>~ {paybackYears} jaar</span>
              </div>

              <button
                onClick={onRequestQuote}
                className={`w-full py-3 rounded-xl ${theme.primary} ${theme.primaryHover} text-white font-extrabold text-xs shadow-md transition-all cursor-pointer`}
              >
                Vraag Vrijblijvende Dakscan Aan
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
