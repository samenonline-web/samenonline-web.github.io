'use client';

import React, { useState, useEffect } from 'react';
import { X, Check, ArrowRight, Eye, ShieldCheck, Scale, Sparkles } from 'lucide-react';
import { WebTemplate, Language } from '../types/company';

interface TemplateComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  templates: WebTemplate[];
  lang: Language;
  onSelectTemplate: (template: WebTemplate) => void;
  onOpenLivePreview: (template: WebTemplate) => void;
}

export const TemplateComparisonModal: React.FC<TemplateComparisonModalProps> = ({
  isOpen,
  onClose,
  templates,
  lang,
  onSelectTemplate,
  onOpenLivePreview,
}) => {
  const [templateAId, setTemplateAId] = useState<string>(templates[0]?.id || 'grachten-web-agency');
  const [templateBId, setTemplateBId] = useState<string>(templates[8]?.id || 'bouwmeester-aannemer');

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const templateA = templates.find((t) => t.id === templateAId) || templates[0];
  const templateB = templates.find((t) => t.id === templateBId) || templates[1];

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200 cursor-pointer overflow-y-auto"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl border-2 border-orange-200 overflow-hidden flex flex-col cursor-default max-h-[92vh]"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-600 to-amber-600 p-6 text-white relative shrink-0">
          <button
            onClick={onClose}
            aria-label="Sluiten"
            className="absolute top-4 right-4 p-2 rounded-full bg-black/20 hover:bg-black/30 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-1">
            <Scale className="w-5 h-5 text-orange-200" />
            <span className="text-xs font-bold uppercase tracking-wider text-orange-100">
              {lang === 'nl' ? 'Interactieve Vergelijker' : 'Interactive Comparator'}
            </span>
          </div>

          <h2 className="text-2xl font-black">
            {lang === 'nl' ? 'Vergelijk 2 Concepten Naast Elkaar' : 'Compare 2 Concepts Side-by-Side'}
          </h2>
          <p className="text-xs sm:text-sm text-orange-100 mt-1 font-medium">
            {lang === 'nl'
              ? 'Selecteer twee templates of pakketten en vergelijk functies, levertijd en specificaties.'
              : 'Select two templates and compare features, delivery time, and specifications.'}
          </p>
        </div>

        {/* Comparison Body */}
        <div className="p-5 sm:p-8 overflow-y-auto space-y-6">
          
          {/* Pickers Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Concept A Picker */}
            <div className="p-4 rounded-2xl bg-orange-50/60 border border-orange-200 space-y-2">
              <label htmlFor="compare-concept-a" className="text-xs font-black uppercase text-orange-900 tracking-wider block cursor-pointer">
                Concept A:
              </label>
              <select
                id="compare-concept-a"
                aria-label="Kies eerste concept om te vergelijken"
                value={templateAId}
                onChange={(e) => setTemplateAId(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-orange-300 bg-white text-xs font-bold text-stone-800 focus:outline-hidden focus:ring-2 focus:ring-orange-500 cursor-pointer"
              >
                {templates.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name} ({t.category})
                  </option>
                ))}
              </select>
            </div>

            {/* Concept B Picker */}
            <div className="p-4 rounded-2xl bg-stone-100 border border-stone-200 space-y-2">
              <label htmlFor="compare-concept-b" className="text-xs font-black uppercase text-stone-700 tracking-wider block cursor-pointer">
                Concept B:
              </label>
              <select
                id="compare-concept-b"
                aria-label="Kies tweede concept om te vergelijken"
                value={templateBId}
                onChange={(e) => setTemplateBId(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-stone-300 bg-white text-xs font-bold text-stone-800 focus:outline-hidden focus:ring-2 focus:ring-orange-500 cursor-pointer"
              >
                {templates.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name} ({t.category})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Comparison Table */}
          <div className="overflow-x-auto rounded-2xl border border-stone-200 shadow-xs">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-stone-50 border-b border-stone-200">
                  <th className="p-4 font-black text-stone-500 uppercase tracking-wider w-1/3 text-[11px]">
                    Eigenschap
                  </th>
                  <th className="p-4 font-black text-stone-900 w-1/3 border-l border-stone-200 bg-orange-50/30">
                    <div className="flex items-center gap-2">
                      <span className={`w-6 h-6 rounded-lg text-white font-black text-[10px] flex items-center justify-center shrink-0 ${templateA.logoBg}`}>
                        {templateA.logoText}
                      </span>
                      <span className="truncate">{templateA.name}</span>
                    </div>
                  </th>
                  <th className="p-4 font-black text-stone-900 w-1/3 border-l border-stone-200">
                    <div className="flex items-center gap-2">
                      <span className={`w-6 h-6 rounded-lg text-white font-black text-[10px] flex items-center justify-center shrink-0 ${templateB.logoBg}`}>
                        {templateB.logoText}
                      </span>
                      <span className="truncate">{templateB.name}</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200 text-stone-700">
                {/* Branche & Categorie */}
                <tr>
                  <td className="p-4 font-bold text-stone-500 bg-stone-50/50">Branche / Categorie</td>
                  <td className="p-4 border-l border-stone-200 font-semibold bg-orange-50/10">
                    {templateA.category}
                  </td>
                  <td className="p-4 border-l border-stone-200 font-semibold">
                    {templateB.category}
                  </td>
                </tr>

                {/* Prijsniveau / Segment */}
                <tr>
                  <td className="p-4 font-bold text-stone-500 bg-stone-50/50">Prijsniveau</td>
                  <td className="p-4 border-l border-stone-200 bg-orange-50/10 font-bold text-orange-700">
                    {templateA.priceTier}
                  </td>
                  <td className="p-4 border-l border-stone-200 font-bold text-orange-700">
                    {templateB.priceTier}
                  </td>
                </tr>

                {/* Geschatte Levertijd */}
                <tr>
                  <td className="p-4 font-bold text-stone-500 bg-stone-50/50">Geschatte Oplevering</td>
                  <td className="p-4 border-l border-stone-200 bg-orange-50/10 font-bold text-stone-900">
                    ~{templateA.estimatedBuildDays} werkdagen
                  </td>
                  <td className="p-4 border-l border-stone-200 font-bold text-stone-900">
                    ~{templateB.estimatedBuildDays} werkdagen
                  </td>
                </tr>

                {/* iDEAL & Mollie Koppeling */}
                <tr>
                  <td className="p-4 font-bold text-stone-500 bg-stone-50/50">iDEAL & Facturatie Ready</td>
                  <td className="p-4 border-l border-stone-200 bg-orange-50/10">
                    {templateA.idealReady ? (
                      <span className="inline-flex items-center gap-1 text-emerald-700 font-bold">
                        <Check className="w-4 h-4 text-emerald-600" /> Ja, direct koppelbaar
                      </span>
                    ) : (
                      <span className="text-stone-400">Optioneel toevoegbaar</span>
                    )}
                  </td>
                  <td className="p-4 border-l border-stone-200">
                    {templateB.idealReady ? (
                      <span className="inline-flex items-center gap-1 text-emerald-700 font-bold">
                        <Check className="w-4 h-4 text-emerald-600" /> Ja, direct koppelbaar
                      </span>
                    ) : (
                      <span className="text-stone-400">Optioneel toevoegbaar</span>
                    )}
                  </td>
                </tr>

                {/* Belangrijkste Features */}
                <tr>
                  <td className="p-4 font-bold text-stone-500 bg-stone-50/50 align-top">
                    Belangrijkste Modules
                  </td>
                  <td className="p-4 border-l border-stone-200 bg-orange-50/10 align-top">
                    <ul className="space-y-1">
                      {templateA.featuresNl.map((f, i) => (
                        <li key={i} className="flex items-start gap-1.5 font-medium">
                          <Check className="w-3.5 h-3.5 text-orange-600 shrink-0 mt-0.5" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="p-4 border-l border-stone-200 align-top">
                    <ul className="space-y-1">
                      {templateB.featuresNl.map((f, i) => (
                        <li key={i} className="flex items-start gap-1.5 font-medium">
                          <Check className="w-3.5 h-3.5 text-stone-600 shrink-0 mt-0.5" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </td>
                </tr>

                {/* Unieke Specialiteit */}
                <tr>
                  <td className="p-4 font-bold text-stone-500 bg-stone-50/50 align-top">
                    Specialiteit
                  </td>
                  <td className="p-4 border-l border-stone-200 bg-orange-50/10 text-stone-600 font-medium">
                    {templateA.highlightSnippetNl}
                  </td>
                  <td className="p-4 border-l border-stone-200 text-stone-600 font-medium">
                    {templateB.highlightSnippetNl}
                  </td>
                </tr>

                {/* Eigendom & Hosting Keuze */}
                <tr>
                  <td className="p-4 font-bold text-stone-500 bg-stone-50/50">Eigendom & Hosting</td>
                  <td className="p-4 border-l border-stone-200 bg-orange-50/10 text-emerald-700 font-bold">
                    100% Jouw Eigendom • Vrije hostingkeuze
                  </td>
                  <td className="p-4 border-l border-stone-200 text-emerald-700 font-bold">
                    100% Jouw Eigendom • Vrije hostingkeuze
                  </td>
                </tr>

                {/* Direct Actions */}
                <tr className="bg-stone-50/80">
                  <td className="p-4 font-bold text-stone-500">Kies Actie</td>
                  <td className="p-4 border-l border-stone-200 bg-orange-50/20 space-y-2">
                    <button
                      onClick={() => {
                        onClose();
                        onSelectTemplate(templateA);
                      }}
                      className="w-full py-2.5 px-3 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-extrabold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      <span>Kies Concept A</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        onClose();
                        onOpenLivePreview(templateA);
                      }}
                      className="w-full py-2 px-3 rounded-xl bg-white hover:bg-stone-100 text-stone-700 border border-stone-300 font-bold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Bekijk Live Demo</span>
                    </button>
                  </td>
                  <td className="p-4 border-l border-stone-200 space-y-2">
                    <button
                      onClick={() => {
                        onClose();
                        onSelectTemplate(templateB);
                      }}
                      className="w-full py-2.5 px-3 rounded-xl bg-stone-800 hover:bg-stone-900 text-white font-extrabold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      <span>Kies Concept B</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        onClose();
                        onOpenLivePreview(templateB);
                      }}
                      className="w-full py-2 px-3 rounded-xl bg-white hover:bg-stone-100 text-stone-700 border border-stone-300 font-bold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Bekijk Live Demo</span>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </div>
  );
};
