'use client';

import React, { useRef } from 'react';
import { X, Printer, Download, CheckCircle2, ShieldCheck, Heart } from 'lucide-react';
import { Language } from '../types/company';

export interface QuotePdfData {
  clientName?: string;
  companyName?: string;
  email?: string;
  phone?: string;
  templateOrProjectType: string;
  selectedModules: string[];
  hostingPlan: 'managed' | 'self';
  chosenDomain?: string;
  basePrice: number;
  addonsPrice: number;
  totalPrice: number;
  estimatedDays: number;
}

interface QuotePdfModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  quoteData: QuotePdfData;
}

export const QuotePdfModal: React.FC<QuotePdfModalProps> = ({
  isOpen,
  onClose,
  lang,
  quoteData,
}) => {
  const printAreaRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const todayStr = new Date().toLocaleDateString('nl-NL', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const validUntilDate = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toLocaleDateString('nl-NL', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const quoteId = `SO-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200 cursor-pointer overflow-y-auto"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col my-auto cursor-default print:border-none print:shadow-none print:rounded-none print:w-full print:max-w-none"
      >
        {/* Top Control Bar (Hidden when printing) */}
        <div className="bg-stone-900 px-6 py-4 text-white flex items-center justify-between print:hidden">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-orange-600 flex items-center justify-center text-white font-extrabold text-xs">
              PDF
            </div>
            <div>
              <span className="font-extrabold text-sm block">Offerte & Specificatie</span>
              <span className="text-[11px] text-stone-400">Direct printen of opslaan als PDF via je browser</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-extrabold text-xs shadow-md shadow-orange-600/30 transition-all cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Opslaan als PDF / Printen</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Formal Printable Document Canvas */}
        <div
          ref={printAreaRef}
          id="printable-quote-area"
          className="p-6 sm:p-10 text-stone-900 bg-white print:p-0 font-sans"
        >
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start gap-6 border-b-2 border-stone-100 pb-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-xl bg-orange-600 flex items-center justify-center text-white font-bold">
                  <Heart className="w-4 h-4 fill-white" />
                </div>
                <span className="font-black text-2xl tracking-tight text-stone-900">
                  Samen<span className="text-orange-600">Online</span>
                </span>
              </div>
              <p className="text-xs text-stone-500 font-medium max-w-xs">
                Onafhankelijk Webdesign & Digitale Oplossingen voor Nederlandse Ondernemers
              </p>
              <p className="text-[11px] text-stone-400 mt-1">
                Facturatie conform fiscale regeling ROW (0% btw)
              </p>
            </div>

            <div className="text-left sm:text-right text-xs space-y-1">
              <span className="inline-block px-3 py-1 rounded-full bg-orange-100 text-orange-800 font-extrabold text-[11px] uppercase tracking-wider mb-1">
                Prijsopgave & Specificatie
              </span>
              <div className="font-mono text-stone-600">Offertenummer: <strong>{quoteId}</strong></div>
              <div className="text-stone-600">Datum: <strong>{todayStr}</strong></div>
              <div className="text-stone-600">Geldig tot: <strong>{validUntilDate}</strong></div>
            </div>
          </div>

          {/* Client & Project Overview */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-stone-50/70 p-5 rounded-2xl border border-stone-200/80 mb-8 text-xs">
            <div>
              <span className="text-[10px] font-black uppercase text-stone-400 tracking-wider block mb-1.5">
                Klant- / Projectgegevens:
              </span>
              <div className="font-black text-stone-900 text-sm">
                {quoteData.companyName || quoteData.clientName || 'Nieuw Website Project'}
              </div>
              {quoteData.clientName && quoteData.clientName !== quoteData.companyName && (
                <div className="text-stone-600 mt-0.5">T.a.v. {quoteData.clientName}</div>
              )}
              {quoteData.email && <div className="text-stone-500 mt-0.5">{quoteData.email}</div>}
              {quoteData.phone && <div className="text-stone-500">{quoteData.phone}</div>}
            </div>

            <div>
              <span className="text-[10px] font-black uppercase text-stone-400 tracking-wider block mb-1.5">
                Gekozen Richting & Planning:
              </span>
              <div className="font-bold text-stone-800">
                Type: <span className="text-orange-700 font-black">{quoteData.templateOrProjectType}</span>
              </div>
              <div className="text-stone-600 mt-1">
                Geschatte doorlooptijd: <strong>~{quoteData.estimatedDays} werkdagen</strong>
              </div>
              <div className="text-stone-600">
                Domeinnaam: <strong>{quoteData.chosenDomain ? `${quoteData.chosenDomain}` : 'In overleg te bepalen'}</strong>
              </div>
            </div>
          </div>

          {/* Specification Table */}
          <div className="mb-8">
            <h4 className="font-black text-xs uppercase tracking-wider text-stone-500 mb-3">
              Specificatie van Diensten & Levering:
            </h4>
            <div className="rounded-2xl border border-stone-200 overflow-hidden">
              <table className="w-full text-xs text-left">
                <thead className="bg-stone-100/80 text-stone-700 font-black border-b border-stone-200">
                  <tr>
                    <th className="py-3 px-4">Omschrijving</th>
                    <th className="py-3 px-4 text-center">Type</th>
                    <th className="py-3 px-4 text-right">Investering</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200/60 font-medium text-stone-700">
                  <tr>
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-stone-900">{quoteData.templateOrProjectType}</div>
                      <div className="text-[11px] text-stone-500">
                        Volledige opzet, responsief design (mobiel/desktop/tablet), Next.js technologie, Core Web Vitals optimalisatie.
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-center text-stone-500">Eenmalig</td>
                    <td className="py-3.5 px-4 text-right font-bold text-stone-900">€{quoteData.basePrice.toFixed(2)}</td>
                  </tr>

                  {quoteData.selectedModules.map((modName, idx) => (
                    <tr key={idx}>
                      <td className="py-3 px-4">
                        <div className="font-bold text-stone-800">{modName}</div>
                        <div className="text-[11px] text-stone-500">Geïntegreerde interactieve functionaliteit</div>
                      </td>
                      <td className="py-3 px-4 text-center text-stone-500">Module</td>
                      <td className="py-3 px-4 text-right font-bold text-stone-800">Inbegrepen</td>
                    </tr>
                  ))}

                  <tr>
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-stone-900">
                        {quoteData.hostingPlan === 'managed'
                          ? 'All-in Webhosting, .NL Domeinnaam & Zakelijke E-mail'
                          : 'Eigen Hosting (Klant beheert hosting zelf)'}
                      </div>
                      <div className="text-[11px] text-stone-500">
                        {quoteData.hostingPlan === 'managed'
                          ? 'Nederlandse NVMe SSD serverruimte, gratis SSL-certificaat (groen slotje), 99.9% uptime en zakelijk e-mailadres.'
                          : 'Oplevering van de gecompileerde websitebestanden voor installatie op eigen server.'}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-center text-stone-500">
                      {quoteData.hostingPlan === 'managed' ? 'Maandelijks' : 'Geen'}
                    </td>
                    <td className="py-3.5 px-4 text-right font-bold text-stone-900">
                      {quoteData.hostingPlan === 'managed' ? '€9,50 /mnd' : '€0,00'}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Total Breakdown */}
          <div className="flex flex-col sm:flex-row justify-between items-start gap-6 border-t-2 border-stone-100 pt-6 mb-8 text-xs">
            <div className="space-y-1.5 max-w-md text-stone-500 font-medium">
              <div className="flex items-center gap-1.5 font-bold text-stone-800">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>100% Volledig Eigendom & Geen Wurgcontracten</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                Na oplevering is de website volledig jouw eigendom. Geen verborgen kosten, geen opzegtermijnen.
                Tarieven zijn netto conform de Nederlandse ROW-regeling (vrijgesteld van btw).
              </p>
            </div>

            <div className="w-full sm:w-64 space-y-2 bg-stone-50 p-4 rounded-2xl border border-stone-200">
              <div className="flex justify-between text-stone-600">
                <span>Subtotaal eenmalig:</span>
                <strong className="text-stone-900">€{quoteData.totalPrice.toFixed(2)}</strong>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Btw (0% ROW):</span>
                <strong className="text-stone-900">€0,00</strong>
              </div>
              <div className="flex justify-between text-base font-black text-stone-900 border-t border-stone-200 pt-2">
                <span>Totaal Eenmalig:</span>
                <span className="text-orange-600">€{quoteData.totalPrice.toFixed(2)}</span>
              </div>
              {quoteData.hostingPlan === 'managed' && (
                <div className="flex justify-between text-xs font-bold text-emerald-700 pt-1 border-t border-stone-200/60">
                  <span>Hosting & domein:</span>
                  <span>€9,50 /mnd</span>
                </div>
              )}
            </div>
          </div>

          {/* Footer note */}
          <div className="text-[10px] text-stone-400 border-t border-stone-100 pt-4 flex flex-col sm:flex-row justify-between items-center gap-2">
            <span>Samen Online • Vrijblijvende offerte gegenereerd via samenonline-web.github.io</span>
            <span>Vragen? Neem contact op via de website</span>
          </div>
        </div>
      </div>
    </div>
  );
};
