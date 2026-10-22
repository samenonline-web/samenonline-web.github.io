'use client';

import React, { useState, useEffect } from 'react';
import {
  X,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Check,
  Eye,
  RotateCcw,
  Compass,
  Building,
  ShoppingCart,
  UtensilsCrossed,
  HeartPulse,
  Laptop,
} from 'lucide-react';
import { WebTemplate, Language } from '../types/company';

interface ConceptWizardModalProps {
  isOpen: boolean;
  onClose: () => void;
  templates: WebTemplate[];
  lang: Language;
  onSelectTemplate: (template: WebTemplate) => void;
  onOpenLivePreview: (template: WebTemplate) => void;
}

export const ConceptWizardModal: React.FC<ConceptWizardModalProps> = ({
  isOpen,
  onClose,
  templates,
  lang,
  onSelectTemplate,
  onOpenLivePreview,
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [industryType, setIndustryType] = useState<string>('bouw');
  const [goalType, setGoalType] = useState<string>('leads');
  const [situationType, setSituationType] = useState<string>('starter');

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Matching algorithm
  const getRecommendedTemplate = (): { main: WebTemplate; matchScore: number; reason: string } => {
    if (industryType === 'webshop' || goalType === 'ecommerce') {
      const shop = templates.find((t) => t.id === 'duurzaam-kleding-webshop') || templates[1];
      return {
        main: shop,
        matchScore: 99,
        reason: 'Ideaal voor directe online verkoop met kant-en-klare iDEAL, winkelmand en PostNL integratie.',
      };
    }

    if (industryType === 'horeca') {
      const bistro = templates.find((t) => t.id === 'bistro-degracht') || templates[11];
      return {
        main: bistro,
        matchScore: 98,
        reason: 'Perfect voor restaurants en horeca met interactieve tafelreservering en menukaart met allergenen.',
      };
    }

    if (industryType === 'zorg') {
      if (goalType === 'booking') {
        const yogaOrKapper = templates.find((t) => t.id === 'studioflow-yoga') || templates[14];
        return {
          main: yogaOrKapper,
          matchScore: 97,
          reason: 'Uitgerust met realtime weekrooster, online proeflesreservering en teller voor vrije plekken.',
        };
      }
      const zorg = templates.find((t) => t.id === 'zorgmond-kliniek') || templates[15];
      return {
        main: zorg,
        matchScore: 98,
        reason: 'Toegankelijke zorgpraktijk lay-out met inschrijfformulier en officiële NZa tarieventabel.',
      };
    }

    if (industryType === 'tech') {
      const techOrBureau = templates.find((t) => t.id === 'grachten-web-agency') || templates[0];
      return {
        main: techOrBureau,
        matchScore: 98,
        reason: 'Strak, luxe bureau-ontwerp met donkere modus, interactieve casestudies en offertecalculator.',
      };
    }

    // Default bouw / lokaal
    if (goalType === 'calculator') {
      const contractor = templates.find((t) => t.id === 'bouwmeester-aannemer') || templates[8];
      return {
        main: contractor,
        matchScore: 99,
        reason: 'Voorzien van een interactieve m² verbouwingscalculator en voor/na portfolio galerij.',
      };
    }

    const cleaningOrDriving = templates.find((t) => t.id === 'glanshelder-schoonmaak') || templates[13];
    return {
      main: cleaningOrDriving,
      matchScore: 96,
      reason: 'Bewezen conversiegerichte opzet met directe prijscalculator en offerteformulier binnen 2 uur.',
    };
  };

  const recommendation = getRecommendedTemplate();

  const handleReset = () => {
    setCurrentStep(1);
    setIndustryType('bouw');
    setGoalType('leads');
    setSituationType('starter');
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200 cursor-pointer overflow-y-auto"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border-2 border-orange-200 overflow-hidden flex flex-col cursor-default max-h-[92vh]"
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
            <Compass className="w-5 h-5 text-orange-200" />
            <span className="text-xs font-bold uppercase tracking-wider text-orange-100">
              3-Vragen Keuzehulp
            </span>
          </div>

          <h2 className="text-2xl font-black">
            {currentStep <= 3 ? 'Vind Jouw Ideale Website Concept' : 'Jouw Perfecte Website Match'}
          </h2>
          <p className="text-xs sm:text-sm text-orange-100 mt-1 font-medium">
            {currentStep <= 3
              ? `Vraag ${currentStep} van 3: beantwoord 3 korte vragen voor een persoonlijk advies.`
              : 'Op basis van jouw antwoorden hebben we het best passende concept geselecteerd.'}
          </p>

          {/* Step Progress Bar */}
          <div className="w-full bg-black/20 h-1.5 rounded-full mt-4 overflow-hidden">
            <div
              className="bg-white h-full rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / 4) * 100}%` }}
            />
          </div>
        </div>

        {/* Wizard Steps */}
        <div className="p-6 sm:p-8 overflow-y-auto">
          
          {/* STEP 1: Branche / Type */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <label className="text-sm font-black text-stone-900 block">
                1. In welke branche is jouw onderneming actief?
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { id: 'bouw', label: 'Vakman, Bouw of Lokale Dienst', desc: 'Aannemer, schilder, schoonmaak, rijschool', icon: '🔨' },
                  { id: 'webshop', label: 'Webshop of Producten Verkopen', desc: 'Duurzaam, kleding, streekproducten', icon: '🛒' },
                  { id: 'horeca', label: 'Horeca, Restaurant of Bakkerij', desc: 'Eetcafé, bistro, catering, ambacht', icon: '🍽️' },
                  { id: 'zorg', label: 'Zorg, Mondzorg of Wellness', desc: 'Tandarts, fysio, yoga studio, kapper', icon: '🩺' },
                  { id: 'tech', label: 'Zakelijk, SaaS of Creatief Bureau', desc: 'Boekhouder, adviseur, SaaS platform', icon: '💼' },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setIndustryType(opt.id)}
                    className={`p-3.5 rounded-2xl border-2 text-left transition-all cursor-pointer flex items-start gap-3 ${
                      industryType === opt.id
                        ? 'border-orange-500 bg-orange-50/60 shadow-xs'
                        : 'border-stone-200 hover:border-orange-200 bg-white'
                    }`}
                  >
                    <span className="text-2xl shrink-0">{opt.icon}</span>
                    <div>
                      <strong className="block text-xs font-bold text-stone-900">{opt.label}</strong>
                      <span className="text-[11px] text-stone-500">{opt.desc}</span>
                    </div>
                  </button>
                ))}
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="px-5 py-3 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-extrabold text-xs transition-all flex items-center gap-2 cursor-pointer shadow-md shadow-orange-600/20"
                >
                  <span>Volgende Vraag</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Belangrijkste Doel */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <label className="text-sm font-black text-stone-900 block">
                2. Wat is het belangrijkste doel van jouw nieuwe website?
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { id: 'leads', label: 'Directe Offertes & WhatsApp Leads', desc: 'Klanten bellen of vragen snel een offerte aan via een slim formulier', icon: '📞' },
                  { id: 'booking', label: 'Online Afspraken & Rooster Reserveren', desc: 'Bezoekers boeken direct een stoel, les of afspraak in je agenda', icon: '📅' },
                  { id: 'ecommerce', label: 'Direct Online Afrekenen met iDEAL', desc: 'Winkelmand, automatische voorraad en betalingen via Mollie', icon: '💳' },
                  { id: 'calculator', label: 'Interactieve M² of Tarieven Calculator', desc: 'Bezoekers berekenen vooraf zelf een prijsindicatie per m²', icon: '📐' },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setGoalType(opt.id)}
                    className={`p-3.5 rounded-2xl border-2 text-left transition-all cursor-pointer flex items-start gap-3 ${
                      goalType === opt.id
                        ? 'border-orange-500 bg-orange-50/60 shadow-xs'
                        : 'border-stone-200 hover:border-orange-200 bg-white'
                    }`}
                  >
                    <span className="text-2xl shrink-0">{opt.icon}</span>
                    <div>
                      <strong className="block text-xs font-bold text-stone-900">{opt.label}</strong>
                      <span className="text-[11px] text-stone-500">{opt.desc}</span>
                    </div>
                  </button>
                ))}
              </div>

              <div className="pt-4 flex justify-between items-center">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="px-4 py-2.5 rounded-xl text-stone-600 font-bold text-xs hover:bg-stone-100 flex items-center gap-1.5 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Terug</span>
                </button>

                <button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  className="px-5 py-3 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-extrabold text-xs transition-all flex items-center gap-2 cursor-pointer shadow-md shadow-orange-600/20"
                >
                  <span>Volgende Vraag</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Huidige Situatie */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <label className="text-sm font-black text-stone-900 block">
                3. Wat is jouw huidige situatie?
              </label>

              <div className="space-y-3">
                {[
                  { id: 'starter', label: 'Geheel nieuwe website (Ik start net of heb nog niets online)', desc: 'Wij regelen alles van domeinnaam tot livegang binnen 2 tot 5 werkdagen.', icon: '🚀' },
                  { id: 'redesign', label: 'Website Redesign (Mijn huidige website is verouderd of te traag)', desc: 'Wij zetten al je bestaande teksten en foto\'s over naar een moderne Next.js website.', icon: '🔄' },
                  { id: 'custom_plan', label: 'Eigen Plan / Schets / Figma bestand', desc: 'Je hebt zelf al een visueel idee of wireframe hoe de website moet worden.', icon: '📐' },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setSituationType(opt.id)}
                    className={`w-full p-4 rounded-2xl border-2 text-left transition-all cursor-pointer flex items-start gap-3 ${
                      situationType === opt.id
                        ? 'border-orange-500 bg-orange-50/60 shadow-xs'
                        : 'border-stone-200 hover:border-orange-200 bg-white'
                    }`}
                  >
                    <span className="text-2xl shrink-0">{opt.icon}</span>
                    <div>
                      <strong className="block text-xs font-bold text-stone-900">{opt.label}</strong>
                      <span className="text-[11px] text-stone-500">{opt.desc}</span>
                    </div>
                  </button>
                ))}
              </div>

              <div className="pt-4 flex justify-between items-center">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="px-4 py-2.5 rounded-xl text-stone-600 font-bold text-xs hover:bg-stone-100 flex items-center gap-1.5 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Terug</span>
                </button>

                <button
                  type="button"
                  onClick={() => setCurrentStep(4)}
                  className="px-6 py-3 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-extrabold text-xs transition-all flex items-center gap-2 cursor-pointer shadow-md shadow-orange-600/30"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Bereken Mijn Match</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: Results Screen */}
          {currentStep === 4 && (
            <div className="space-y-6 animate-in fade-in duration-300">
              
              {/* Top Match Badge */}
              <div className="p-6 rounded-3xl bg-orange-50 border-2 border-orange-300 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-black uppercase tracking-wider text-orange-800 bg-orange-200/80 px-3 py-1 rounded-full">
                    Geadviseerd Concept
                  </span>
                  <span className="text-xs font-black text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300">
                    {recommendation.matchScore}% Match
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-2xl text-white font-black text-lg flex items-center justify-center shrink-0 shadow-md ${recommendation.main.logoBg}`}>
                    {recommendation.main.logoText}
                  </div>
                  <div>
                    <h3 className="font-black text-lg text-stone-900">{recommendation.main.name}</h3>
                    <p className="text-xs text-stone-500 font-medium">{recommendation.main.subtitleNl}</p>
                  </div>
                </div>

                <p className="text-xs text-stone-700 bg-white/80 p-3.5 rounded-2xl border border-orange-200 leading-relaxed font-medium">
                  💡 <strong>Waarom dit concept past:</strong> {recommendation.reason}
                </p>

                <div className="flex flex-wrap gap-2 text-[11px] font-bold text-stone-600">
                  <span className="px-2.5 py-1 rounded-lg bg-white border border-stone-200">
                    ⚡ Levertijd: ~{recommendation.main.estimatedBuildDays} werkdagen
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-white border border-stone-200">
                    💰 Prijsklasse: {recommendation.main.priceTier}
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-white border border-stone-200">
                    🛡️ 100% Jouw Eigendom
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenLivePreview(recommendation.main);
                  }}
                  className="w-full sm:flex-1 py-3.5 px-4 rounded-xl bg-white hover:bg-stone-100 text-stone-800 border-2 border-stone-300 font-extrabold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Eye className="w-4 h-4 text-orange-600" />
                  <span>Bekijk Live Demo</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onSelectTemplate(recommendation.main);
                  }}
                  className="w-full sm:flex-1 py-3.5 px-4 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-extrabold text-xs transition-all flex items-center justify-center gap-2 shadow-lg shadow-orange-600/30 cursor-pointer"
                >
                  <span>Kies Dit Concept</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={handleReset}
                  className="text-xs text-stone-500 hover:text-stone-800 font-bold underline inline-flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Keuzehulp opnieuw starten</span>
                </button>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
