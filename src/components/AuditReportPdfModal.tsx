'use client';

import React from 'react';
import { X, Printer, Download, CheckCircle2, ShieldCheck, Heart, Gauge, Clock, Sparkles, Smartphone, Globe } from 'lucide-react';
import { Language } from '../types/company';

interface AuditReportPdfModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  domain?: string;
}

export const AuditReportPdfModal: React.FC<AuditReportPdfModalProps> = ({
  isOpen,
  onClose,
  lang,
  domain,
}) => {
  if (!isOpen) return null;

  const effectiveDomain = domain || 'jouw-bedrijf.nl';

  const handlePrint = () => {
    window.print();
  };

  const todayStr = new Date().toLocaleDateString('nl-NL', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const reportId = `GIDS-${Math.floor(1000 + Math.random() * 9000)}`;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200 cursor-pointer overflow-y-auto print:static print:p-0 print:bg-transparent print:block print:z-auto printable-modal-root"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl border-2 border-stone-200 overflow-hidden flex flex-col cursor-default max-h-[94vh] print:max-h-none print:w-full print:max-w-none print:shadow-none print:border-none print:rounded-none print:overflow-visible printable-modal-card"
      >
        {/* Modal Top Control Bar (Hidden in Print) */}
        <div className="bg-stone-900 text-white p-4 flex items-center justify-between print:hidden">
          <div className="flex items-center gap-2 text-xs font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Website Prestatiegids &amp; Optimalisatie Checklist</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Opslaan als PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl hover:bg-stone-800 text-stone-300 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Document Sheet (A4 Proportion) */}
        <div className="p-8 sm:p-12 overflow-y-auto bg-white text-stone-900 print:p-0 print:m-0 space-y-6">
          
          {/* Document Header */}
          <div className="flex justify-between items-start border-b-2 border-stone-200 pb-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Heart className="w-5 h-5 fill-orange-600 text-orange-600" />
                <span className="font-black text-xl tracking-tight text-stone-900 font-sans">
                  Samen<span className="text-orange-600">Online</span>
                </span>
              </div>
              <p className="text-xs text-stone-500 font-medium">
                Website Concepts &amp; Eerlijk Webdesign voor Nederland
              </p>
            </div>

            <div className="text-right">
              <span className="text-xs font-mono font-bold text-stone-400 block">
                Document ID: {reportId}
              </span>
              <span className="text-xs text-stone-600 font-bold block">
                Datum: {todayStr}
              </span>
              <span className="text-[10px] uppercase font-black tracking-wider text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full inline-block mt-1">
                Officiële Richtlijnen
              </span>
            </div>
          </div>

          {/* Gescande Domein Titel */}
          <div className="p-5 rounded-2xl bg-orange-50/50 border border-orange-200">
            <span className="text-[10px] font-black uppercase tracking-wider text-orange-800 block">
              Prestatie- &amp; Modernisatie Gids voor:
            </span>
            <h3 className="text-2xl font-black text-stone-900 mt-0.5">
              https://{effectiveDomain}
            </h3>
            <span className="text-xs text-stone-600 font-medium block mt-1">
              Gebaseerd op officiële Google Core Web Vitals en conversiestandaarden voor MKB en ZZP in Nederland.
            </span>
          </div>

          {/* Official Google Benchmarks Table */}
          <div className="space-y-3">
            <h4 className="font-black text-sm uppercase tracking-wider text-stone-900 border-b border-stone-200 pb-2">
              1. Officiële Google Core Web Vitals Standaarden:
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
              <div className="p-4 rounded-2xl border border-stone-200 bg-stone-50/50 space-y-1">
                <span className="text-[11px] font-bold text-stone-500 block">Laadtijd (LCP)</span>
                <div className="text-2xl font-black text-emerald-700">&lt; 2.5 sec</div>
                <span className="text-[10px] text-stone-600 block">Samen Online Next.js: ~0.3s</span>
              </div>

              <div className="p-4 rounded-2xl border border-stone-200 bg-stone-50/50 space-y-1">
                <span className="text-[11px] font-bold text-stone-500 block">Interactievertraging (INP)</span>
                <div className="text-2xl font-black text-emerald-700">&lt; 200 ms</div>
                <span className="text-[10px] text-stone-600 block">Samen Online Next.js: &lt; 50ms</span>
              </div>

              <div className="p-4 rounded-2xl border border-stone-200 bg-stone-50/50 space-y-1">
                <span className="text-[11px] font-bold text-stone-500 block">Verschuiving (CLS)</span>
                <div className="text-2xl font-black text-emerald-700">&lt; 0.1</div>
                <span className="text-[10px] text-stone-600 block">Samen Online Next.js: 0.0</span>
              </div>
            </div>
            <p className="text-[11px] text-stone-500">
              * Meet jouw eigen website live via Google op: <strong className="text-stone-700">pagespeed.web.dev</strong>
            </p>
          </div>

          {/* 4 Pillars Checklist */}
          <div className="space-y-3">
            <h4 className="font-black text-sm uppercase tracking-wider text-stone-900 border-b border-stone-200 pb-2">
              2. De 4 Pijlers van een Hoog-Conversieve Website:
            </h4>

            <div className="space-y-2.5 text-xs text-stone-700">
              <div className="p-3 rounded-xl border border-stone-200 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-stone-900">1. Geen trage SQL-databases bij paginabezoek:</strong>
                  <p className="text-stone-600 mt-0.5">
                    Moderne websites worden via Static Site Generation (SSG) direct vanaf Nederlandse NVMe SSD edge-servers geserveerd. Hierdoor opent elke pagina bliksemsnel zonder serververtraging.
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-xl border border-stone-200 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-stone-900">2. Directe 1-klik mobiele contactknoppen:</strong>
                  <p className="text-stone-600 mt-0.5">
                    Meer dan 70% van de lokale zoekopdrachten vindt plaats op een smartphone. Een zichtbare WhatsApp-knop en een snel offerteformulier verhogen de respons aanzienlijk.
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-xl border border-stone-200 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-stone-900">3. Lokale Google Maps SEO (Schema.org):</strong>
                  <p className="text-stone-600 mt-0.5">
                    Gestructureerde bedrijfsgegevens (LocalBusiness mark-up) zorgen ervoor dat Google jouw openingstijden, diensten en regio direct herkent voor de lokale top 3 resultaten.
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-xl border border-stone-200 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-stone-900">4. 100% Volledig Eigendom:</strong>
                  <p className="text-stone-600 mt-0.5">
                    Geen verplichte licentiekosten of maandelijkse contracten die je website gijzelen. Broncode, teksten en domeinnaam zijn en blijven te allen tijde jouw eigendom.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Aanbeveling & Vrijblijvende Review */}
          <div className="p-5 rounded-2xl bg-orange-50 border-2 border-orange-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-black text-sm text-orange-950">
                Gratis Handmatige Review door Samen Online
              </span>
              <span className="text-xs font-black text-orange-800">
                100% Vrijblijvend
              </span>
            </div>
            <p className="text-xs text-stone-700 leading-relaxed font-medium">
              Wil je dat wij jouw huidige website ({effectiveDomain}) inhoudelijk en technisch reviewen? We bekijken jouw teksten, mobiele ervaring en Google-posities en sturen je binnen 24 uur een persoonlijk advies. Redesigns starten al vanaf €175 eenmalig.
            </p>
          </div>

          {/* Footer Terms */}
          <div className="border-t border-stone-200 pt-4 flex justify-between items-center text-[10px] text-stone-500">
            <span>Samen Online • Eerlijk &amp; Transparant Webdesign voor Nederland</span>
            <span>https://samenonline.org</span>
          </div>

        </div>
      </div>
    </div>
  );
};
