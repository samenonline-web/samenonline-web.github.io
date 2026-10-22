'use client';

import React from 'react';
import { X, Printer, Download, CheckCircle2, AlertTriangle, ShieldCheck, Heart, Gauge, Clock } from 'lucide-react';
import { Language } from '../types/company';

interface AuditReportPdfModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  domain?: string;
  speedScore?: number;
  loadTimeSeconds?: number;
  mobileScore?: number;
  cmsType?: string;
  auditData?: {
    url: string;
    speedScore: number;
    loadTimeSeconds: number;
    mobileScore: number;
    cmsType: string;
    issuesCount?: number;
  };
}

export const AuditReportPdfModal: React.FC<AuditReportPdfModalProps> = ({
  isOpen,
  onClose,
  lang,
  domain,
  speedScore,
  loadTimeSeconds,
  mobileScore,
  cmsType,
  auditData,
}) => {
  if (!isOpen) return null;

  const effectiveDomain = auditData?.url || domain || 'jouw-bedrijf.nl';
  const effectiveSpeedScore = auditData?.speedScore ?? speedScore ?? 38;
  const effectiveLoadTimeSeconds = auditData?.loadTimeSeconds ?? loadTimeSeconds ?? 4.4;
  const effectiveMobileScore = auditData?.mobileScore ?? mobileScore ?? 61;
  const effectiveCmsType = auditData?.cmsType || cmsType || 'Traditioneel CMS / WordPress';

  const handlePrint = () => {
    window.print();
  };

  const todayStr = new Date().toLocaleDateString('nl-NL', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const reportId = `SCAN-${Math.floor(1000 + Math.random() * 9000)}`;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200 cursor-pointer overflow-y-auto"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl border-2 border-stone-200 overflow-hidden flex flex-col cursor-default max-h-[94vh]"
      >
        {/* Modal Top Control Bar (Hidden in Print) */}
        <div className="bg-stone-900 text-white p-4 flex items-center justify-between print:hidden">
          <div className="flex items-center gap-2 text-xs font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Website Verbeterrapport Klaar voor PDF Download</span>
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
                Website Concepts & Snelle Next.js Webdesign voor Nederland
              </p>
            </div>

            <div className="text-right">
              <span className="text-xs font-mono font-bold text-stone-400 block">
                Rapport ID: {reportId}
              </span>
              <span className="text-xs text-stone-600 font-bold block">
                Datum: {todayStr}
              </span>
              <span className="text-[10px] uppercase font-black tracking-wider text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full inline-block mt-1">
                Gratis Audit Scan
              </span>
            </div>
          </div>

          {/* Gescande Domein Titel */}
          <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200">
            <span className="text-[10px] font-black uppercase tracking-wider text-stone-500 block">
              Geanalyseerde Website
            </span>
            <h3 className="text-2xl font-black text-stone-900 mt-0.5">
              https://{effectiveDomain}
            </h3>
            <span className="text-xs text-stone-600 font-medium block mt-1">
              Gedetecteerd platform: <strong>{effectiveCmsType}</strong>
            </span>
          </div>

          {/* Metrics Scorecard Grid */}
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-4 rounded-2xl border border-stone-200 bg-stone-50/50">
              <span className="text-xs font-bold text-stone-500 block mb-1">Google PageSpeed</span>
              <div className="text-3xl font-black text-rose-600">{effectiveSpeedScore} / 100</div>
              <span className="text-[10px] text-emerald-700 font-bold block mt-1">Samen Online: 99/100</span>
            </div>

            <div className="p-4 rounded-2xl border border-stone-200 bg-stone-50/50">
              <span className="text-xs font-bold text-stone-500 block mb-1">Laadtijd (LCP)</span>
              <div className="text-3xl font-black text-amber-600">{effectiveLoadTimeSeconds}s</div>
              <span className="text-[10px] text-emerald-700 font-bold block mt-1">Samen Online: 0.3s</span>
            </div>

            <div className="p-4 rounded-2xl border border-stone-200 bg-stone-50/50">
              <span className="text-xs font-bold text-stone-500 block mb-1">Mobiele Score</span>
              <div className="text-3xl font-black text-stone-800">{effectiveMobileScore}%</div>
              <span className="text-[10px] text-emerald-700 font-bold block mt-1">Samen Online: 100%</span>
            </div>
          </div>

          {/* Verbeterpunten & Conclusie */}
          <div className="space-y-3">
            <h4 className="font-black text-sm uppercase tracking-wider text-stone-900 border-b border-stone-200 pb-2">
              Belangrijkste Technische Verbeterpunten:
            </h4>

            <div className="space-y-2.5 text-xs text-stone-700">
              <div className="p-3 rounded-xl border border-stone-200 flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <strong>Trage Server- en Database Responstijd:</strong>
                  <p className="text-stone-600 mt-0.5">
                    De huidige website vraagt bij elk mobiel bezoek dynamisch gegevens op, wat leidt tot een laadvertraging van {effectiveLoadTimeSeconds} seconden. Met Next.js statische caching opent de pagina in 0.3 seconde.
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-xl border border-stone-200 flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <strong>Mobiele Conversielekken:</strong>
                  <p className="text-stone-600 mt-0.5">
                    Er ontbreken directe actieknoppen (zoals 1-klik WhatsApp chat en snelkeuzemenu&apos;s). Hierdoor haakt ruim 40% van de mobiele bezoekers af voordat ze contact opnemen.
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-xl border border-stone-200 flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <strong>Lokale Vindbaarheid & Schema.org Mark-up:</strong>
                  <p className="text-stone-600 mt-0.5">
                    Google Maps en lokale zoekresultaten missen gestructureerde LocalBusiness data. Samen Online integreert dit standaard in alle opleveringen.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Aanbeveling & Redesign Voorstel */}
          <div className="p-5 rounded-2xl bg-orange-50 border-2 border-orange-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-black text-sm text-orange-950">
                Aanbevolen Oplossing: Next.js Website Redesign
              </span>
              <span className="text-xs font-black text-orange-800">
                Vanaf € 175,- eenmalig
              </span>
            </div>
            <p className="text-xs text-stone-700 leading-relaxed font-medium">
              Wij migreren al jouw bestaande teksten, foto&apos;s en menustructuur naar een gloednieuwe, razendsnelle Next.js website. Binnen 2 tot 5 werkdagen live, 100% jouw eigendom en inclusief gratis SSL-certificaat.
            </p>
          </div>

          {/* Footer Terms */}
          <div className="border-t border-stone-200 pt-4 flex justify-between items-center text-[10px] text-stone-500">
            <span>Samen Online • Rapport gegenereerd via publieke PageSpeed standaarden</span>
            <span>100% Vrijblijvend advies</span>
          </div>

        </div>
      </div>
    </div>
  );
};
