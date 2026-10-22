'use client';

import React, { useState } from 'react';
import { TemplateProps } from '../../types/theme';
import { Zap, Check, ArrowRight, BarChart3, ShieldCheck, Activity, Users, Sun, Moon } from 'lucide-react';

export const StroomDelenSaaS: React.FC<TemplateProps> = ({ theme, isDarkMode, onToggleDarkMode, onRequestQuote }) => {
  const [kwhMonthly, setKwhMonthly] = useState(450);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly');

  // Savings calculation
  const yearlySavings = Math.round(kwhMonthly * 0.18 * 12);
  const co2Savings = Math.round((kwhMonthly * 0.35 * 12) / 1000);

  return (
    <div className="min-h-full bg-white text-stone-900 font-sans">
      {/* SaaS Nav */}
      <header className="border-b border-stone-200 px-6 py-4 flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-md z-10">
        <div className="flex items-center gap-3">
          <div className={`w-9 h-9 rounded-xl ${theme.primary} text-white font-black flex items-center justify-center text-sm shadow-sm`}>
            SD
          </div>
          <div>
            <span className="font-extrabold text-base tracking-tight">StroomDelen CleanTech</span>
            <span className="block text-[10px] text-stone-500 font-medium">Eindhoven • Energie Delen SaaS</span>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-6 text-xs font-bold text-stone-600">
          <a href="#calculator" className="hover:text-stone-900">Bespaar Calculator</a>
          <a href="#dashboard" className="hover:text-stone-900">Platform Preview</a>
          <a href="#prijzen" className="hover:text-stone-900">Tarieven</a>
        </nav>

        <div className="flex items-center gap-3">
          {onToggleDarkMode && (
            <button
              onClick={onToggleDarkMode}
              className="p-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors cursor-pointer border border-stone-200"
              title={isDarkMode ? 'Lichte Modus' : 'Donkere Modus'}
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-stone-600" />}
            </button>
          )}

          <button
            onClick={onRequestQuote}
            className={`px-4 py-2 rounded-xl ${theme.primary} ${theme.primaryHover} text-white text-xs font-bold shadow-xs cursor-pointer`}
          >
            Start Gratis Trial
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className={`py-14 sm:py-20 px-6 ${theme.bgLight} border-b ${theme.borderLight} text-center`}>
        <div className="max-w-3xl mx-auto">
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${theme.badgeBg} ${theme.badgeText} text-xs font-extrabold mb-4 border ${theme.borderLight}`}>
            <Zap className="w-3.5 h-3.5" />
            <span>Slimme Peer-to-Peer Energiehandel in Nederland</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-stone-900 tracking-tight leading-tight mb-4">
            Deel overtollige zonne-energie <span className={theme.textPrimary}>direct met buren</span>.
          </h1>
          <p className="text-stone-600 text-sm sm:text-base max-w-xl mx-auto mb-8">
            Verdien meer aan je zonnepanelen zonder afhankelijk te zijn van terugleverkosten. Volledig geautomatiseerd via onze slimme software.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="#calculator"
              className={`px-6 py-3 rounded-xl ${theme.primary} ${theme.primaryHover} text-white font-bold text-xs shadow-md flex items-center gap-2`}
            >
              <span>Bereken Jouw Besparing</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <button
              onClick={onRequestQuote}
              className="px-6 py-3 rounded-xl bg-white border border-stone-300 text-stone-800 text-xs font-bold hover:bg-stone-50 cursor-pointer"
            >
              Vraag SaaS Concept Aan
            </button>
          </div>
        </div>
      </section>

      {/* Interactive Savings Calculator */}
      <section id="calculator" className="py-12 px-6 max-w-4xl mx-auto">
        <div className="bg-stone-50 rounded-3xl border-2 border-stone-200 p-8 shadow-xs">
          <div className="text-center max-w-lg mx-auto mb-8">
            <h2 className="text-2xl font-black text-stone-900">Wat levert StroomDelen jou op?</h2>
            <p className="text-xs text-stone-500 font-medium">Verschuif de schuifbalk om je maandelijkse opwekking in te stellen</p>
          </div>

          <div className="space-y-6 max-w-xl mx-auto mb-8">
            <div>
              <div className="flex justify-between text-xs font-bold text-stone-700 mb-2">
                <span>Maandelijkse zonne-opwekking:</span>
                <span className={`text-base font-black ${theme.textPrimary}`}>{kwhMonthly} kWh</span>
              </div>
              <input
                type="range"
                min="100"
                max="1200"
                step="50"
                value={kwhMonthly}
                onChange={(e) => setKwhMonthly(Number(e.target.value))}
                className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-orange-600"
              />
              <div className="flex justify-between text-[10px] text-stone-400 font-bold mt-1">
                <span>100 kWh</span>
                <span>650 kWh</span>
                <span>1200 kWh</span>
              </div>
            </div>

            {/* Live Result Cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-2xl border border-stone-200 text-center shadow-xs">
                <span className="text-[11px] font-bold text-stone-400 block mb-1">Geschatte Jaarwinst:</span>
                <span className="text-2xl font-black text-emerald-700">€{yearlySavings}</span>
                <span className="text-[10px] text-stone-500 block mt-1">+34% vs terugleververgoeding</span>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-stone-200 text-center shadow-xs">
                <span className="text-[11px] font-bold text-stone-400 block mb-1">CO₂ Voetafdruk:</span>
                <span className={`text-2xl font-black ${theme.textPrimary}`}>-{co2Savings} ton</span>
                <span className="text-[10px] text-stone-500 block mt-1">Gelijk aan 84 bomen</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Tiers with Toggle */}
      <section id="prijzen" className={`py-12 px-6 ${theme.bgLight} border-t ${theme.borderLight}`}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-black text-stone-900 mb-2">Transparante Software Prijzen</h2>
          <p className="text-xs text-stone-600 font-medium mb-6">Geen contractduur, op elk moment aanpasbaar</p>

          <div className="inline-flex items-center gap-2 p-1 bg-white rounded-xl border border-stone-300 text-xs font-bold mb-8">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${billingCycle === 'monthly' ? `${theme.primary} text-white` : 'text-stone-600'}`}
            >
              Maandelijks
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${billingCycle === 'yearly' ? `${theme.primary} text-white` : 'text-stone-600'}`}
            >
              Jaarlijks (2 Maanden Gratis)
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left max-w-2xl mx-auto">
            <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs flex flex-col justify-between">
              <div>
                <span className="text-xs font-extrabold text-stone-400 uppercase">Particulier</span>
                <h3 className="text-lg font-black text-stone-900 mt-1 mb-2">Thuis Delen</h3>
                <div className="text-3xl font-black text-stone-900 mb-4">
                  {billingCycle === 'monthly' ? '€4,99' : '€3,99'} <span className="text-xs font-bold text-stone-400">/ maand</span>
                </div>
                <ul className="space-y-2 text-xs font-medium text-stone-600 mb-6">
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> Tot 1 zonne-omvormer</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> Live app inzicht per kwartier</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> Automatische P2P verkoop</li>
                </ul>
              </div>
              <button
                onClick={onRequestQuote}
                className="w-full py-2.5 rounded-xl border border-stone-300 text-stone-800 text-xs font-bold hover:bg-stone-50 cursor-pointer"
              >
                Kies Thuis Delen
              </button>
            </div>

            <div className="bg-white p-6 rounded-3xl border-2 border-stone-300 shadow-md flex flex-col justify-between relative">
              <div className={`absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full ${theme.primary} text-white text-[10px] font-extrabold uppercase shadow-xs`}>
                Populairste Keuze
              </div>
              <div>
                <span className="text-xs font-extrabold text-stone-400 uppercase">Zakelijk & VvE</span>
                <h3 className="text-lg font-black text-stone-900 mt-1 mb-2">Energy Hub Pro</h3>
                <div className="text-3xl font-black text-stone-900 mb-4">
                  {billingCycle === 'monthly' ? '€19,99' : '€15,99'} <span className="text-xs font-bold text-stone-400">/ maand</span>
                </div>
                <ul className="space-y-2 text-xs font-medium text-stone-600 mb-6">
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> Onbeperkt omvormers & batterijen</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> Dynamische uurtarieven koppeling</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> Automatische facturatie met iDEAL</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> Dedicated accountmanager</li>
                </ul>
              </div>
              <button
                onClick={onRequestQuote}
                className={`w-full py-2.5 rounded-xl ${theme.primary} ${theme.primaryHover} text-white text-xs font-bold shadow-xs cursor-pointer`}
              >
                Start Proefperiode
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
