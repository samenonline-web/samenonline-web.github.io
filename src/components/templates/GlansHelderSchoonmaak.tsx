'use client';

import React, { useState } from 'react';
import { TemplateProps } from '../../types/theme';
import {
  Sparkles,
  Building2,
  Home,
  CheckCircle2,
  Calculator,
  ShieldCheck,
  ChevronRight,
  Sun,
  Moon,
  Clock,
  Droplets,
  CalendarCheck,
  Award,
} from 'lucide-react';

export const GlansHelderSchoonmaak: React.FC<TemplateProps> = ({
  theme,
  isDarkMode,
  onToggleDarkMode,
  onRequestQuote,
  customBrandName,
  customCity,
}) => {
  const brandName = customBrandName || 'GlansHelder Schoonmaak & Glasbewassing';
  const city = customCity || 'Arnhem & Regio Gelderland';

  const [customerType, setCustomerType] = useState<'zakelijk' | 'particulier'>('zakelijk');
  const [squareMeters, setSquareMeters] = useState<number>(120);
  const [frequency, setFrequency] = useState<'weekly' | 'biweekly' | 'monthly' | 'once'>('biweekly');
  const [includeWindows, setIncludeWindows] = useState<boolean>(true);
  const [includeEcoProducts, setIncludeEcoProducts] = useState<boolean>(true);
  const [quoteRequested, setQuoteRequested] = useState<boolean>(false);

  // Price Calculation
  const baseRatePerM2 = customerType === 'zakelijk' ? 0.95 : 1.15;
  const frequencyDiscount = frequency === 'weekly' ? 0.8 : frequency === 'biweekly' ? 0.9 : frequency === 'monthly' ? 0.95 : 1.0;
  const windowAddon = includeWindows ? 35 : 0;
  const ecoAddon = includeEcoProducts ? 12 : 0;

  const estimatedPrice = Math.round(squareMeters * baseRatePerM2 * frequencyDiscount + windowAddon + ecoAddon);

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-stone-950 text-stone-100' : 'bg-stone-50 text-stone-800'}`}>
      
      {/* Demo Concept Disclaimer Bar */}
      <div className="bg-stone-900 text-stone-300 py-1.5 px-4 text-center text-xs border-b border-stone-800 flex items-center justify-center gap-2">
        <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span>
          <strong>Voorbeeldconcept:</strong> Schoonmaakbedrijf, VvE beheer & Glazenwasser website lay-out (Geschikt voor OSB & VCA ondernemers).
        </span>
      </div>

      {/* Top Navbar */}
      <header className={`sticky top-0 z-30 backdrop-blur-md border-b transition-colors ${
        isDarkMode ? 'bg-stone-950/90 border-stone-800' : 'bg-white/95 border-stone-200'
      }`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 min-w-[40px] min-h-[40px] shrink-0 aspect-square rounded-2xl flex items-center justify-center text-white font-black shadow-md ${theme.primary}`}>
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="font-black text-base sm:text-lg tracking-tight block leading-none">
                {brandName}
              </span>
              <span className="text-[11px] font-semibold text-stone-500">
                Professionele Schoonmaak & Bewassing • {city}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {onToggleDarkMode && (
              <button
                onClick={onToggleDarkMode}
                aria-label="Toggle Dark Mode"
                className={`p-2 rounded-xl border text-xs cursor-pointer transition-colors ${
                  isDarkMode
                    ? 'border-stone-800 bg-stone-900 text-yellow-400 hover:bg-stone-800'
                    : 'border-stone-200 bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
            )}

            <button
              onClick={onRequestQuote}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-black text-white shadow-md transition-all cursor-pointer ${theme.primary} hover:opacity-95`}
            >
              Direct Prijsopgave
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-14 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${theme.badgeBg} ${theme.badgeText}`}>
              <Award className="w-4 h-4" />
              <span>VCA* & OSB Gecertificeerd Personeel</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Onberispelijk Schoon in <span className={theme.textPrimary}>{city}</span>
            </h1>

            <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 font-medium leading-relaxed">
              Van kantoorpanden, VvE trappenhuizen tot particuliere glasbewassing en gevelreiniging. Altijd een vast schoonmaakteam, ecologische reinigingsmiddelen en flexibele servicecontracten.
            </p>

            {/* Customer Type Toggle */}
            <div className="inline-flex p-1 rounded-2xl bg-stone-200 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 text-xs font-bold">
              <button
                onClick={() => setCustomerType('zakelijk')}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl transition-all cursor-pointer ${
                  customerType === 'zakelijk'
                    ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-xs'
                    : 'text-stone-600 dark:text-stone-400'
                }`}
              >
                <Building2 className="w-4 h-4" />
                <span>Zakelijk (Kantoren & VvE)</span>
              </button>
              <button
                onClick={() => setCustomerType('particulier')}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl transition-all cursor-pointer ${
                  customerType === 'particulier'
                    ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-xs'
                    : 'text-stone-600 dark:text-stone-400'
                }`}
              >
                <Home className="w-4 h-4" />
                <span>Particulier & Villa</span>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2 text-xs font-bold text-stone-600 dark:text-stone-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Vaste contactpersoon</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>100% Biologisch afbreekbaar</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Geen langdurig wurgcontract</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Offerte binnen 2 uur</span>
              </div>
            </div>
          </div>

          {/* Right Card: Interactive M² Schoonmaakcalculator */}
          <div className="lg:col-span-6">
            <div className={`p-6 sm:p-8 rounded-3xl border-2 shadow-xl ${
              isDarkMode ? 'bg-stone-900 border-stone-800' : 'bg-white border-stone-200'
            }`}>
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-emerald-600" />
                  <h3 className="font-black text-lg">M² Reken- & Tariefhulp</h3>
                </div>
                <span className="text-[11px] font-black px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  Transparante Richtprijs
                </span>
              </div>

              <div className="space-y-4">
                {/* Surface Slider */}
                <div>
                  <div className="flex justify-between items-center text-xs font-bold mb-1.5">
                    <span>Oppervlakte van het pand:</span>
                    <span className="text-sm font-black text-emerald-600">{squareMeters} m²</span>
                  </div>
                  <input
                    type="range"
                    min={40}
                    max={600}
                    step={10}
                    value={squareMeters}
                    onChange={(e) => setSquareMeters(Number(e.target.value))}
                    className="w-full accent-emerald-600 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-stone-400 mt-1">
                    <span>40 m² (Kantoor/Appartement)</span>
                    <span>600 m² (Compleet Bedrijfspand)</span>
                  </div>
                </div>

                {/* Frequency Buttons */}
                <div>
                  <label className="text-xs font-bold block mb-1.5">Frequentie van schoonmaak:</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { id: 'weekly', label: 'Wekelijks (-20%)' },
                      { id: 'biweekly', label: '2-Wekelijks (-10%)' },
                      { id: 'monthly', label: 'Maandelijks' },
                      { id: 'once', label: 'Eenmalig' },
                    ].map((f) => (
                      <button
                        key={f.id}
                        type="button"
                        onClick={() => setFrequency(f.id as any)}
                        className={`py-2 px-2 text-center rounded-xl border text-[11px] font-bold transition-all cursor-pointer ${
                          frequency === f.id
                            ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300'
                            : 'border-stone-300 dark:border-stone-700 bg-transparent text-stone-600 dark:text-stone-300'
                        }`}
                      >
                        {f.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Add-ons Checklist */}
                <div className="pt-2 space-y-2 border-t border-stone-200 dark:border-stone-800 text-xs font-semibold">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={includeWindows}
                      onChange={(e) => setIncludeWindows(e.target.checked)}
                      className="rounded accent-emerald-600"
                    />
                    <span>Inclusief professionele glasbewassing (+€35)</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={includeEcoProducts}
                      onChange={(e) => setIncludeEcoProducts(e.target.checked)}
                      className="rounded accent-emerald-600"
                    />
                    <span>100% Ecologische & Hypoallergene reinigingsmiddelen (+€12)</span>
                  </label>
                </div>

                {/* Live Price Result Box */}
                <div className="p-4 rounded-2xl bg-stone-100 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700 flex items-center justify-between mt-4">
                  <div>
                    <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block">
                      Geschat Tarief per Beurt:
                    </span>
                    <span className="text-2xl sm:text-3xl font-black text-emerald-600">
                      €{estimatedPrice}
                      <span className="text-xs text-stone-400 font-medium"> (excl. btw)</span>
                    </span>
                  </div>

                  <button
                    onClick={onRequestQuote}
                    className={`px-4 py-3 rounded-xl text-white font-black text-xs flex items-center gap-1.5 shadow-md transition-all cursor-pointer ${theme.primary} hover:opacity-90`}
                  >
                    <span>Vraag Offerte Aan</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Services Grid */}
      <section className={`py-14 px-4 sm:px-6 border-t ${
        isDarkMode ? 'bg-stone-900/60 border-stone-800' : 'bg-white border-stone-200'
      }`}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-2 mb-10">
            <span className="text-xs font-black uppercase tracking-wider text-emerald-600">
              Dienstenoverzicht
            </span>
            <h2 className="text-2xl sm:text-3xl font-black">
              Wat Schoonmaakbedrijf {brandName} Voor Jou Doet
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className={`p-6 rounded-2xl border ${isDarkMode ? 'bg-stone-900 border-stone-800' : 'bg-stone-50 border-stone-200'}`}>
              <Building2 className="w-8 h-8 text-emerald-600 mb-3" />
              <h3 className="font-black text-base mb-1">Kantoorschoonmaak & MKB</h3>
              <p className="text-xs text-stone-500 leading-relaxed">
                Schone werkplekken, ontkalkt sanitair, hygiënische kantines en geleegde prullenbakken vóór of ná kantoortijd.
              </p>
            </div>

            <div className={`p-6 rounded-2xl border ${isDarkMode ? 'bg-stone-900 border-stone-800' : 'bg-stone-50 border-stone-200'}`}>
              <Droplets className="w-8 h-8 text-cyan-600 mb-3" />
              <h3 className="font-black text-base mb-1">Telescopische Glasbewassing</h3>
              <p className="text-xs text-stone-500 leading-relaxed">
                Streeploos schone ramen tot 18 meter hoogte met puur osmosewater zonder chemische toevoegingen.
              </p>
            </div>

            <div className={`p-6 rounded-2xl border ${isDarkMode ? 'bg-stone-900 border-stone-800' : 'bg-stone-50 border-stone-200'}`}>
              <CalendarCheck className="w-8 h-8 text-amber-600 mb-3" />
              <h3 className="font-black text-base mb-1">VvE Trappenhuizen & Portieken</h3>
              <p className="text-xs text-stone-500 leading-relaxed">
                Vaste periodieke reiniging van galerijen, trappen, liftkooien en centrale entrees voor Verenigingen van Eigenaren.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Demo Note */}
      <footer className="py-8 px-4 text-center text-xs text-stone-500 border-t border-stone-200 dark:border-stone-800">
        <p>© 2026 {brandName} • Gemaakt met Samen Online Webconcepten</p>
      </footer>

    </div>
  );
};
