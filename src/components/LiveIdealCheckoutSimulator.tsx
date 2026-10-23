'use client';

import React, { useState } from 'react';
import { CreditCard, QrCode, ShieldCheck, CheckCircle2, ArrowRight, Sparkles, ShoppingBag } from 'lucide-react';
import { Language } from '../types/company';
import { IdealSimulatorModal } from './IdealSimulatorModal';

interface LiveIdealCheckoutSimulatorProps {
  lang: Language;
  onOpenWebshopRequest: () => void;
}

export const LiveIdealCheckoutSimulator: React.FC<LiveIdealCheckoutSimulatorProps> = ({
  lang,
  onOpenWebshopRequest,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasPaid, setHasPaid] = useState(false);

  return (
    <section id="ideal-simulator" className="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-24">
      <div className="bg-gradient-to-r from-stone-900 via-stone-900 to-slate-900 text-white rounded-3xl p-6 sm:p-10 border-2 border-stone-800 shadow-xl relative overflow-hidden">
        
        {/* Glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left: Value proposition */}
          <div className="lg:col-span-7 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/20 text-pink-300 border border-pink-500/30 text-xs font-black uppercase tracking-wider">
              <CreditCard className="w-4 h-4 text-pink-400" />
              <span>{lang === 'nl' ? 'Direct iDEAL & Mollie Betalingen' : 'Native iDEAL Checkout'}</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              {lang === 'nl'
                ? 'Ervaar Zelf Hoe Snel Onze iDEAL Checkout Werkt'
                : 'Experience How Fast Our iDEAL Checkout Performs'}
            </h2>

            <p className="text-xs sm:text-sm text-stone-300 font-medium leading-relaxed">
              {lang === 'nl'
                ? 'Geen trage WooCommerce plugins die crashen of haperen. Onze webshops en bestelsystemen koppelen naadloos met Mollie en Stripe voor een frictieloze betaling via alle Nederlandse banken.'
                : 'No sluggish plugins. Our e-commerce templates link with Mollie & Stripe for instant Dutch bank checkouts.'}
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              <span className="text-[11px] font-bold bg-white/10 text-stone-200 px-3 py-1 rounded-lg">
                ✓ iDEAL 2.0 & QR-code
              </span>
              <span className="text-[11px] font-bold bg-white/10 text-stone-200 px-3 py-1 rounded-lg">
                ✓ Bancontact (België)
              </span>
              <span className="text-[11px] font-bold bg-white/10 text-stone-200 px-3 py-1 rounded-lg">
                ✓ Apple Pay & Creditcard
              </span>
              <span className="text-[11px] font-bold bg-white/10 text-stone-200 px-3 py-1 rounded-lg">
                ✓ 0% Platform Commissie
              </span>
            </div>
          </div>

          {/* Right: Interactive Test Cart Simulator */}
          <div className="lg:col-span-5 bg-white/10 dark:bg-slate-800/80 rounded-2xl p-6 border border-white/15 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-pink-400" />
                <span className="text-xs font-black text-white">Interactieve Demo Bestelling</span>
              </div>
              <span className="text-[10px] font-bold text-pink-300 bg-pink-950/80 px-2 py-0.5 rounded-full border border-pink-500/40">
                Testmodus
              </span>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-xs">
                <span className="text-stone-300">Product:</span>
                <strong className="text-white">Single Origin Koffiebonen (250g)</strong>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-stone-300">Levering:</span>
                <span className="text-emerald-400 font-bold">PostNL Pakket (€0,00)</span>
              </div>
              <div className="flex justify-between text-sm font-black border-t border-white/10 pt-2 text-white">
                <span>Totaalbedrag:</span>
                <span className="text-pink-400 font-mono">€1,00 (Testbedrag)</span>
              </div>
            </div>

            {hasPaid ? (
              <div className="p-3.5 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-200 text-xs font-bold flex items-center gap-2 mb-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>iDEAL Demo Betaling Geslaagd! Order direct bevestigd via webhooks.</span>
              </div>
            ) : null}

            <div className="space-y-2.5">
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="w-full py-3 rounded-xl bg-pink-600 hover:bg-pink-500 text-white font-black text-xs flex items-center justify-center gap-2 shadow-lg shadow-pink-600/30 transition-transform active:scale-95 cursor-pointer"
              >
                <CreditCard className="w-4 h-4" />
                <span>Test Live iDEAL Simulator (Demo)</span>
              </button>

              <button
                type="button"
                onClick={onOpenWebshopRequest}
                className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>Vraag Webshop met iDEAL Aan</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

      </div>

      {/* Embedded IdealSimulatorModal */}
      <IdealSimulatorModal
        isOpen={isModalOpen}
        amount={1.0}
        shopName="Samen Online Demo Webshop"
        onClose={() => setIsModalOpen(false)}
        onSuccess={() => {
          setHasPaid(true);
        }}
      />
    </section>
  );
};
