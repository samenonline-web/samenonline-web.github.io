'use client';

import React, { useState } from 'react';
import { X, CheckSquare, Download, Copy, Check, Printer, ShieldCheck, Sparkles } from 'lucide-react';
import { Language } from '../types/company';

interface StarterChecklistModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export const StarterChecklistModal: React.FC<StarterChecklistModalProps> = ({
  isOpen,
  onClose,
  lang,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const checklistItems = [
    { num: '01', title: 'Domeinnaam & Merkclaim', desc: 'Kies een herkenbare .nl domeinnaam zonder koppeltekens die direct vertrouwen wekt.' },
    { num: '02', title: 'Google Bedrijfsprofiel & Maps', desc: 'Claim je Google vermelding voor directe weergave in de lokale kaartzoekresultaten.' },
    { num: '03', title: '100/100 Google Core Web Vitals', desc: 'Zorg voor een laadtijd onder 0.8 sec op mobiel; Google straft trage sites direct af.' },
    { num: '04', title: 'Duidelijke Contactknoppen', desc: 'Plaats directe WhatsApp- en belknoppen binnen duimbereik op mobiele telefoons.' },
    { num: '05', title: '100% AVG & GDPR Privacyveilig', desc: 'Geen illegale cookies van derden; duidelijke privacyverklaring en beveiligde SSL.' },
    { num: '06', title: 'iDEAL & Frictieloos Betalen', desc: 'Koppel Mollie of Stripe voor directe iDEAL betalingen zonder maandelijkse verplichting.' },
    { num: '07', title: 'Echte Foto’s & Sociaal Bewijs', desc: 'Gebruik echte foto’s van jouw werk of team en toon geverifieerde klantbeoordelingen.' },
    { num: '08', title: 'Duidelijke Prijzen & Tarieven', desc: 'Nederlandse klanten willen direct weten waar ze aan toe zijn. Vermijd vage uurtarieven.' },
    { num: '09', title: '100% Eigendom van de Broncode', desc: 'Laat je nooit gijzelen door platform lock-in (Wix/Shopify). Jij bezit je eigen data.' },
    { num: '10', title: 'Professionele E-mail & Hosting', desc: 'Gebruik een zakelijk e-mailadres (info@jouwdomein.nl) op snelle Nederlandse NVMe SSD-servers.' },
  ];

  const handleCopy = () => {
    const text = checklistItems.map((item) => `${item.num}. ${item.title}: ${item.desc}`).join('\n\n');
    navigator.clipboard.writeText(`SAMEN ONLINE - DE COMPLETE WEBSITE STARTER CHECKLIST 2026\n\n${text}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200 cursor-pointer"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white dark:bg-slate-900 w-full max-w-2xl max-h-[90vh] rounded-3xl shadow-2xl border border-stone-200 dark:border-slate-800 flex flex-col overflow-hidden cursor-default animate-in zoom-in-95 duration-200"
      >
        {/* Header */}
        <div className="bg-stone-900 dark:bg-slate-950 p-6 text-white flex items-center justify-between border-b border-stone-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-600 flex items-center justify-center text-white">
              <CheckSquare className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-orange-400">
                Gratis Gids
              </span>
              <h2 className="text-lg sm:text-xl font-black text-white">
                De Complete Website Starter Checklist (2026)
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-stone-300 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content body */}
        <div className="p-6 overflow-y-auto space-y-3.5 flex-1">
          <p className="text-xs text-stone-600 dark:text-slate-300 font-medium">
            De 10 gouden regels die iedere Nederlandse ondernemer moet controleren vóór de lancering van een nieuwe website.
          </p>

          <div className="space-y-3">
            {checklistItems.map((item) => (
              <div
                key={item.num}
                className="p-3.5 rounded-2xl bg-orange-50/50 dark:bg-slate-800/60 border border-orange-100 dark:border-slate-700/80 flex items-start gap-3"
              >
                <span className="font-mono text-xs font-black text-orange-600 dark:text-orange-400 bg-white dark:bg-slate-900 w-7 h-7 rounded-lg flex items-center justify-center shrink-0 border border-orange-200 dark:border-slate-700">
                  {item.num}
                </span>
                <div>
                  <h3 className="text-xs font-black text-stone-900 dark:text-white">
                    {item.title}
                  </h3>
                  <p className="text-[11px] text-stone-600 dark:text-slate-300 font-medium mt-0.5 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-4 bg-stone-50 dark:bg-slate-950 border-t border-stone-200 dark:border-slate-800 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopy}
              className="px-4 py-2 rounded-xl bg-white dark:bg-slate-800 border border-stone-300 dark:border-slate-700 hover:bg-stone-100 dark:hover:bg-slate-700 text-stone-800 dark:text-slate-200 font-bold text-xs flex items-center gap-1.5 cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-600 font-black">Gekopieerd!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-stone-500" />
                  <span>Kopieer Tekst</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handlePrint}
              className="px-4 py-2 rounded-xl bg-white dark:bg-slate-800 border border-stone-300 dark:border-slate-700 hover:bg-stone-100 dark:hover:bg-slate-700 text-stone-800 dark:text-slate-200 font-bold text-xs flex items-center gap-1.5 cursor-pointer"
            >
              <Printer className="w-4 h-4 text-stone-500" />
              <span>Print / PDF</span>
            </button>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-orange-700 hover:bg-orange-800 text-white font-black text-xs cursor-pointer"
          >
            Sluiten
          </button>
        </div>
      </div>
    </div>
  );
};
