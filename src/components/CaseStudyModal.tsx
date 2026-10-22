'use client';

import React, { useEffect } from 'react';
import { X, Sparkles, TrendingUp, Gauge, Clock, ShieldCheck, ArrowRight, CheckCircle2, AlertTriangle, FileText } from 'lucide-react';
import { Language } from '../types/company';

interface CaseStudyModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  onOpenRedesignRequest: () => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({
  isOpen,
  onClose,
  lang,
  onOpenRedesignRequest,
}) => {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200 cursor-pointer"
    >
      <div
        className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl overflow-hidden border-2 border-orange-200 flex flex-col cursor-default max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-stone-900 via-stone-800 to-orange-950 p-6 sm:p-8 text-white relative shrink-0">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/20 text-orange-300 border border-orange-500/30 text-xs font-black uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-orange-400" />
            <span>Fictieve Casestudie &amp; Meetbaar Effect</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-white">
            Van 4.8s naar 0.3s: De Next.js Transformatie
          </h2>
          <p className="text-xs sm:text-sm text-stone-300 mt-1 max-w-xl">
            Voorbeeldscenario: Hoe een technische modernisering van een trage WordPress site naar Next.js kan leiden tot aanzienlijk meer offerte-aanvragen en betere mobiele scores.
          </p>

          <div className="mt-3 inline-block px-3 py-1 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[11px] font-bold">
            ℹ️ Fictief demonstratiescenario ter illustratie van de meetbare technische voordelen.
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 sm:p-8 space-y-6 overflow-y-auto text-stone-900">
          
          {/* Key Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-1">
              <span className="text-xs font-black uppercase text-emerald-800">Offerte Aanvragen</span>
              <div className="text-3xl sm:text-4xl font-black text-emerald-600">+64%</div>
              <span className="text-[11px] text-emerald-800 font-semibold block">Meer leads in de 1e maand</span>
            </div>

            <div className="p-4 rounded-2xl bg-orange-50 border border-orange-200 text-center space-y-1">
              <span className="text-xs font-black uppercase text-orange-800">Mobiele Laadtijd</span>
              <div className="text-3xl sm:text-4xl font-black text-orange-600">0.3s</div>
              <span className="text-[11px] text-stone-600 font-semibold block">Was voorheen 4.8s</span>
            </div>

            <div className="p-4 rounded-2xl bg-stone-100 border border-stone-300 text-center space-y-1">
              <span className="text-xs font-black uppercase text-stone-700">Google PageSpeed</span>
              <div className="text-3xl sm:text-4xl font-black text-stone-900">99<span className="text-sm font-normal text-stone-500">/100</span></div>
              <span className="text-[11px] text-stone-600 font-semibold block">Was voorheen 34/100</span>
            </div>
          </div>

          {/* Comparison Story */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* The Old Situation */}
            <div className="p-5 rounded-2xl bg-rose-50/70 border border-rose-200 space-y-3">
              <div className="flex items-center gap-2 text-rose-800 font-black text-xs uppercase tracking-wider">
                <AlertTriangle className="w-4 h-4 text-rose-600" />
                <span>De Oude Situatie (WordPress 2014)</span>
              </div>
              <ul className="text-xs text-rose-950 space-y-2 font-medium">
                <li className="flex items-start gap-2">
                  <span className="text-rose-600 font-bold">•</span>
                  <span><strong>28 zware PHP-plugins:</strong> Continue update-conflicten en kwetsbaarheden.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-600 font-bold">•</span>
                  <span><strong>4.8 seconden laadtijd:</strong> Meer dan 40% van de mobiele bezoekers klikte direct weg.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-600 font-bold">•</span>
                  <span><strong>Wazige mobiele weergave:</strong> Teksten en knoppen vielen buiten het smartphonescherm.</span>
                </li>
              </ul>
            </div>

            {/* The Next.js Solution */}
            <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-3">
              <div className="flex items-center gap-2 text-emerald-800 font-black text-xs uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Na Samen Online Redesign</span>
              </div>
              <ul className="text-xs text-emerald-950 space-y-2 font-medium">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">•</span>
                  <span><strong>Next.js 16 Edge SSG:</strong> Geen trage SQL-databases, pagina&apos;s laden realtime binnen 0.3s.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">•</span>
                  <span><strong>Slimme WhatsApp Snelknop:</strong> Potentiële klanten sturen met 1 klik een foto van hun klus.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">•</span>
                  <span><strong>Lokale SEO &amp; Schema.org:</strong> Top 3 positie in Google Maps voor de eigen stad en regio.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Process Timeline */}
          <div className="bg-stone-50 p-5 rounded-2xl border border-stone-200 space-y-3">
            <h4 className="font-black text-xs uppercase tracking-wider text-stone-700">
              Hoe verliep het transformatieproces in 4 dagen?
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3 bg-white rounded-xl border border-stone-200 space-y-1">
                <span className="text-[10px] font-black text-orange-600">DAG 1: INTAKE</span>
                <p className="font-bold text-stone-900">Bestaande site scannen</p>
                <p className="text-[11px] text-stone-500">Teksten en foto&apos;s kosteloos overgenomen.</p>
              </div>
              <div className="p-3 bg-white rounded-xl border border-stone-200 space-y-1">
                <span className="text-[10px] font-black text-orange-600">DAG 2: BOUW</span>
                <p className="font-bold text-stone-900">Next.js setup &amp; design</p>
                <p className="text-[11px] text-stone-500">Mobiele navigatie en snelle offertecalculator.</p>
              </div>
              <div className="p-3 bg-white rounded-xl border border-stone-200 space-y-1">
                <span className="text-[10px] font-black text-orange-600">DAG 3: FINETUNING</span>
                <p className="font-bold text-stone-900">Correctieronde &amp; test</p>
                <p className="text-[11px] text-stone-500">Feedback verwerkt &amp; PageSpeed 99 behaald.</p>
              </div>
              <div className="p-3 bg-white rounded-xl border border-stone-200 space-y-1">
                <span className="text-[10px] font-black text-orange-600">DAG 4: LIVE</span>
                <p className="font-bold text-stone-900">Naadloze overstap</p>
                <p className="text-[11px] text-stone-500">Geen enkele seconde downtime van het domein.</p>
              </div>
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold transition-colors cursor-pointer"
            >
              Sluiten
            </button>

            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenRedesignRequest();
              }}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-orange-600/30 transition-all cursor-pointer"
            >
              <span>Vraag Jouw Website Redesign Aan (€175)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
