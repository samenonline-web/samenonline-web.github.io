'use client';

import React, { useState } from 'react';
import { 
  Hammer, 
  UtensilsCrossed, 
  Scissors, 
  ShoppingBag, 
  Sparkles, 
  ArrowRight,
  ShieldCheck,
  Zap,
  MousePointerClick
} from 'lucide-react';
import { InteractiveConstructionCalculator } from './demos/InteractiveConstructionCalculator';
import { InteractiveMenuReservation } from './demos/InteractiveMenuReservation';
import { InteractiveAppointmentBooking } from './demos/InteractiveAppointmentBooking';
import InteractiveWebshopCheckout from './demos/InteractiveWebshopCheckout';

export type DemoTabKey = 'bouw' | 'horeca' | 'kapper' | 'webshop';

interface DemoTabConfig {
  key: DemoTabKey;
  label: string;
  sublabel: string;
  icon: React.ComponentType<{ className?: string }>;
  tag: string;
  description: string;
}

const TABS: DemoTabConfig[] = [
  {
    key: 'bouw',
    label: 'Bouw & Aannemer',
    sublabel: 'Offerte & m² Calculator',
    icon: Hammer,
    tag: 'Directe Richtprijs',
    description: 'Laat bezoekers zelf hun aanbouw, dakkapel of verbouwing configureren en direct een gespecificeerde offerte aanvragen.',
  },
  {
    key: 'horeca',
    label: 'Café & Restaurant',
    sublabel: 'Menukaart & Reserveren',
    icon: UtensilsCrossed,
    tag: 'Live Tafelplanning',
    description: 'Werkende digitale menukaart met realtime winkelmandje en reserveringssysteem met tijdsloten en aantal gasten.',
  },
  {
    key: 'kapper',
    label: 'Kappers & Zorg',
    sublabel: '3-Staps Afsprakenplanner',
    icon: Scissors,
    tag: '24/7 Boekingen',
    description: 'Klanten kiezen zelf een behandeling, gewenste stylist en datum/tijd. Geen telefoontjes meer tijdens de werkdag.',
  },
  {
    key: 'webshop',
    label: 'Webshop & Retail',
    sublabel: 'Filters & iDEAL Checkout',
    icon: ShoppingBag,
    tag: 'iDEAL 2.0 Inbegrepen',
    description: 'Razendsnelle productcatalogus met filters en een directe mini-cart checkout simulator via Nederlandse banken.',
  },
];

interface InteractiveDemoPlaygroundProps {
  onRequestQuote?: () => void;
}

export default function InteractiveDemoPlayground({ onRequestQuote }: InteractiveDemoPlaygroundProps) {
  const [activeTab, setActiveTab] = useState<DemoTabKey>('bouw');

  const currentTabConfig = TABS.find((t) => t.key === activeTab) || TABS[0];

  return (
    <section id="demo-playground" className="relative py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Background glow */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-orange-500/5 via-transparent to-transparent blur-3xl pointer-events-none" />

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-950/80 border border-orange-200 dark:border-orange-800/80 text-orange-700 dark:text-orange-400 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Geen Plaatjes, Maar Echte Web-Apps</span>
        </div>

        <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Ervaar de Kracht van een{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-500">
            Interactieve Website
          </span>
        </h2>

        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
          Bezoekers willen niet alleen lezen — ze willen berekenen, reserveren en bestellen.
          Test hieronder 4 werkende Next.js applicaties zoals wij ze voor jouw branche opleveren.
        </p>
      </div>

      {/* Tab Switcher Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;

          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`relative text-left p-4 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                isActive
                  ? 'bg-slate-900 text-white border-orange-500 ring-2 ring-orange-500/20 shadow-xl'
                  : 'bg-white/80 dark:bg-slate-900/60 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-white dark:hover:bg-slate-900'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                      isActive
                        ? 'bg-orange-500 text-slate-950'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>

                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      isActive
                        ? 'bg-orange-500/20 text-orange-400 border border-orange-500/40'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                    }`}
                  >
                    {tab.tag}
                  </span>
                </div>

                <h3 className="font-bold text-sm tracking-tight">{tab.label}</h3>
                <p
                  className={`text-xs mt-0.5 ${
                    isActive ? 'text-slate-300' : 'text-slate-500 dark:text-slate-400'
                  }`}
                >
                  {tab.sublabel}
                </p>
              </div>

              {isActive && (
                <div className="mt-3 pt-2.5 border-t border-slate-800 flex items-center gap-1.5 text-[11px] font-semibold text-orange-400">
                  <MousePointerClick className="w-3.5 h-3.5 animate-bounce" />
                  <span>Nu Actief in Preview</span>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Tab Context Banner */}
      <div className="mb-6 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs">
        <div className="flex items-start sm:items-center gap-3">
          <div className="p-2 rounded-xl bg-orange-500/10 text-orange-600 dark:text-orange-400 shrink-0">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">
              {currentTabConfig.label}: {currentTabConfig.sublabel}
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              {currentTabConfig.description}
            </p>
          </div>
        </div>

        {onRequestQuote && (
          <button
            onClick={onRequestQuote}
            className="shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold shadow-md transition-all active:scale-95 cursor-pointer"
          >
            <span>Dit wil ik voor mijn bedrijf</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Render Active Interactive Engine */}
      <div className="transition-all duration-300">
        {activeTab === 'bouw' && <InteractiveConstructionCalculator />}
        {activeTab === 'horeca' && <InteractiveMenuReservation />}
        {activeTab === 'kapper' && <InteractiveAppointmentBooking />}
        {activeTab === 'webshop' && <InteractiveWebshopCheckout />}
      </div>

      {/* Bottom Trust Guarantee */}
      <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800/80 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <span className="font-medium">
            Geen plugins of trage WordPress modules: 100% native Next.js & TypeScript code.
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="font-semibold text-slate-700 dark:text-slate-300">
            Klaar binnen 5 werkdagen
          </span>
          <span>•</span>
          <span className="font-semibold text-slate-700 dark:text-slate-300">
            Volledig eigendom & geen lock-in
          </span>
        </div>
      </div>
    </section>
  );
}
