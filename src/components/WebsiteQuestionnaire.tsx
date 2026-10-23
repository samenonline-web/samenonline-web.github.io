'use client';

import React, { useState } from 'react';
import {
  HelpCircle,
  Briefcase,
  Target,
  Sparkles,
  Clock,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Send,
  Zap,
  ShoppingBag,
  Utensils,
  Hammer,
  HeartPulse,
  Monitor,
  Calendar,
  CreditCard,
  FileText,
  Search,
  MessageSquare
} from 'lucide-react';

export interface QuestionnaireResult {
  industry: string;
  primaryGoal: string;
  features: string[];
  contentStatus: string;
  timeline: string;
  recommendedPackage: string;
  estimatedPrice: number;
}

interface WebsiteQuestionnaireProps {
  onComplete?: (result: QuestionnaireResult) => void;
  onOpenRequestModal?: (customData?: {
    notes?: string;
    templateTitle?: string;
    calculatedPrice?: number;
  }) => void;
  lang?: 'nl' | 'en';
}

export const WebsiteQuestionnaire: React.FC<WebsiteQuestionnaireProps> = ({
  onComplete,
  onOpenRequestModal,
  lang = 'nl',
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;

  // Answers state
  const [industry, setIndustry] = useState('dienstverlening');
  const [primaryGoal, setPrimaryGoal] = useState('leads');
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([
    'contactformulier',
    'google_seo',
  ]);
  const [contentStatus, setContentStatus] = useState('partial');
  const [timeline, setTimeline] = useState('5days');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Industry options
  const industryOptions = [
    {
      id: 'bouw',
      label: 'Bouw, Klus & Installatie',
      desc: 'Aannemers, schilders, loodgieters, elektriciens',
      icon: Hammer,
      badge: 'Calculator populair',
    },
    {
      id: 'horeca',
      label: 'Horeca, Café & Catering',
      desc: 'Restaurants, eetcafés, bezorging, foodtrucks',
      icon: Utensils,
      badge: 'QR Menu & Reserveren',
    },
    {
      id: 'zorg',
      label: 'Zorg, Kapper & Schoonheid',
      desc: 'Kapsalons, fysio, pedicures, schoonheidsspecialisten',
      icon: HeartPulse,
      badge: 'Online Afspraken',
    },
    {
      id: 'webshop',
      label: 'Webshop & Retail',
      desc: 'Productverkoop met iDEAL en winkelmandje',
      icon: ShoppingBag,
      badge: 'iDEAL & Checkout',
    },
    {
      id: 'dienstverlening',
      label: 'Zakelijke Dienstverlening',
      desc: 'Boekhouders, consultants, coaches, adviseurs',
      icon: Briefcase,
      badge: 'Offertes & Vertrouwen',
    },
    {
      id: 'creatief',
      label: 'Creatief & Portfolio',
      desc: 'Fotografen, ontwerpers, muzikanten, artiesten',
      icon: Monitor,
      badge: 'Hoge Resolutie Galerij',
    },
  ];

  // Primary goal options
  const goalOptions = [
    {
      id: 'leads',
      title: 'Meer Offertes & Aanvragen',
      desc: 'Laagdrempelige contactknoppen en formulieren voor direct meer klanten.',
      icon: Target,
    },
    {
      id: 'ideal',
      title: 'Direct Online Verkopen & iDEAL',
      desc: 'Klanten kunnen producten of diensten direct online bestellen en betalen.',
      icon: CreditCard,
    },
    {
      id: 'afspraken',
      title: 'Online Reserveren & Afspraken',
      desc: 'Klanten boeken zelf een tijdslot of tafel zonder dat jij de telefoon hoeft op te nemen.',
      icon: Calendar,
    },
    {
      id: 'visitekaartje',
      title: 'Professionele Uitstraling & Vertrouwen',
      desc: 'Bestaande klanten laten zien dat je een modern, betrouwbaar bedrijf bent.',
      icon: Sparkles,
    },
  ];

  // Feature options
  const featureOptions = [
    { id: 'contactformulier', label: 'Slim Contactformulier (zonder spambots)', icon: MessageSquare },
    { id: 'google_seo', label: '100% Google SEO & Lokale Kaart', icon: Search },
    { id: 'offerte_calc', label: 'Interactieve Prijs- of Offertecalculator', icon: FileText },
    { id: 'ideal_checkout', label: 'iDEAL & Bancontact Direct Betalen', icon: CreditCard },
    { id: 'afspraken_kalender', label: 'Digitale Afspraken- of Reserveringsplanner', icon: Calendar },
    { id: 'reviews_widget', label: 'Google 5-Sterren Reviews Widget', icon: Sparkles },
  ];

  // Content status options
  const contentOptions = [
    {
      id: 'ready',
      title: 'Ik heb al teksten, foto\'s en een logo',
      desc: 'Alles staat klaar om direct ingeladen te worden.',
    },
    {
      id: 'partial',
      title: 'Ik heb al een logo, maar hulp nodig bij teksten',
      desc: 'Samen Online verzorgt professionele Nederlandse teksten voor jouw branche.',
    },
    {
      id: 'scratch',
      title: 'Ik start vanaf nul (hulp bij logo, teksten & foto\'s)',
      desc: 'We regelen het complete totaalpakket van logo tot oplevering.',
    },
  ];

  // Timeline options
  const timelineOptions = [
    { id: '5days', title: 'Binnen 5 Werkdagen (Standaard)', badge: 'Aanbevolen', desc: 'Grondige opzet, live testlink en revisieronde.' },
    { id: 'spoed', title: 'Met Spoed binnen 48 uur', badge: 'Spoedservice', desc: 'Directe prioriteit op de bouwkalender (+€75).' },
    { id: 'flex', title: 'Ik ben nog oriënterend / Geen haast', badge: 'Vrijblijvend', desc: 'Eerst rustig advies en een richtprijs ontvangen.' },
  ];

  const toggleFeature = (id: string) => {
    if (selectedFeatures.includes(id)) {
      setSelectedFeatures(selectedFeatures.filter((f) => f !== id));
    } else {
      setSelectedFeatures([...selectedFeatures, id]);
    }
  };

  // Calculate recommendation
  const calculateRecommendation = (): QuestionnaireResult => {
    let pkg = 'Samen Start';
    let basePrice = 195;

    if (primaryGoal === 'ideal' || selectedFeatures.includes('ideal_checkout') || industry === 'webshop') {
      pkg = 'Samen Webshop Compleet';
      basePrice = 495;
    } else if (
      selectedFeatures.includes('offerte_calc') ||
      selectedFeatures.includes('afspraken_kalender') ||
      industry === 'horeca' ||
      industry === 'bouw' ||
      contentStatus === 'scratch'
    ) {
      pkg = 'Samen Groei Maatwerk';
      basePrice = 295;
    }

    if (timeline === 'spoed') {
      basePrice += 75;
    }

    return {
      industry,
      primaryGoal,
      features: selectedFeatures,
      contentStatus,
      timeline,
      recommendedPackage: pkg,
      estimatedPrice: basePrice,
    };
  };

  const handleFinish = () => {
    const result = calculateRecommendation();
    setIsSubmitted(true);
    if (onComplete) {
      onComplete(result);
    }
  };

  const handleApplyProposal = () => {
    const result = calculateRecommendation();
    if (onOpenRequestModal) {
      const summaryNotes = `Website Vragenlijst Uitkomst:\n- Branche: ${result.industry}\n- Doel: ${result.primaryGoal}\n- Gekozen functies: ${result.features.join(', ')}\n- Content status: ${result.contentStatus}\n- Levertijd: ${result.timeline}\n- Geadviseerd pakket: ${result.recommendedPackage} (ca. €${result.estimatedPrice},- all-in)`;
      onOpenRequestModal({
        notes: summaryNotes,
        templateTitle: `${result.recommendedPackage} (${result.industry})`,
        calculatedPrice: result.estimatedPrice,
      });
    }
  };

  const currentResult = calculateRecommendation();

  return (
    <div
      id="website-vragenlijst"
      className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-200/90 dark:border-slate-800 shadow-xl transition-all scroll-mt-24"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-200/80 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60 text-xs font-black uppercase tracking-wider mb-2">
            <HelpCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Interactieve Website Keuzehulp</span>
          </div>
          <h2 className="text-xl sm:text-3xl font-black text-stone-900 dark:text-white tracking-tight">
            Vind Jouw Ideale Website in 5 Vragen
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 dark:text-slate-300 font-medium mt-1">
            Geen vage offertes of lange wachttijden. Beantwoord 5 gerichte vragen en ontvang direct een helder advies met vaste all-in prijs.
          </p>
        </div>

        {/* Progress Badge */}
        {!isSubmitted && (
          <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-800 px-4 py-2 rounded-2xl border border-slate-200 dark:border-slate-700 shrink-0">
            <div className="text-right">
              <span className="block text-[11px] font-bold text-stone-500 uppercase tracking-wider">
                Voortgang
              </span>
              <span className="text-sm font-black text-stone-900 dark:text-white">
                Stap {currentStep} van {totalSteps}
              </span>
            </div>
            <div className="w-10 h-10 rounded-full border-2 border-emerald-500 flex items-center justify-center font-black text-xs text-emerald-600 dark:text-emerald-400">
              {Math.round((currentStep / totalSteps) * 100)}%
            </div>
          </div>
        )}
      </div>

      {/* Questionnaire Body */}
      {!isSubmitted ? (
        <div className="py-8">
          {/* STEP 1: Branche */}
          {currentStep === 1 && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h3 className="text-base sm:text-lg font-black text-stone-900 dark:text-white flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-emerald-500 text-white text-xs flex items-center justify-center font-black">1</span>
                  In welke branche of sector is jouw bedrijf actief?
                </h3>
                <p className="text-xs text-stone-500 dark:text-slate-400 mt-1">
                  We passen het ontwerp, de kleuren en de functionaliteiten direct aan op jouw specifieke doelgroep.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {industryOptions.map((opt) => {
                  const Icon = opt.icon;
                  const isSelected = industry === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setIndustry(opt.id)}
                      className={`text-left p-4 sm:p-5 rounded-2xl border-2 transition-all cursor-pointer relative flex flex-col justify-between ${
                        isSelected
                          ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/30 shadow-md ring-2 ring-emerald-500/20'
                          : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div
                          className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                            isSelected
                              ? 'bg-emerald-500 text-white'
                              : 'bg-slate-100 dark:bg-slate-800 text-stone-700 dark:text-slate-300'
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-stone-600 dark:text-slate-400">
                          {opt.badge}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-black text-sm text-stone-900 dark:text-white">
                          {opt.label}
                        </h4>
                        <p className="text-xs text-stone-500 dark:text-slate-400 mt-1">
                          {opt.desc}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 2: Primaire Doel */}
          {currentStep === 2 && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h3 className="text-base sm:text-lg font-black text-stone-900 dark:text-white flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-emerald-500 text-white text-xs flex items-center justify-center font-black">2</span>
                  Wat is het allerbelangrijkste doel van jouw nieuwe website?
                </h3>
                <p className="text-xs text-stone-500 dark:text-slate-400 mt-1">
                  Waar moet de bezoeker op klikken of wat moet de website direct voor jouw bedrijf opleveren?
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {goalOptions.map((opt) => {
                  const Icon = opt.icon;
                  const isSelected = primaryGoal === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setPrimaryGoal(opt.id)}
                      className={`text-left p-5 rounded-2xl border-2 transition-all cursor-pointer flex items-start gap-4 ${
                        isSelected
                          ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/30 shadow-md ring-2 ring-emerald-500/20'
                          : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900'
                      }`}
                    >
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                          isSelected
                            ? 'bg-emerald-500 text-white'
                            : 'bg-slate-100 dark:bg-slate-800 text-stone-700 dark:text-slate-300'
                        }`}
                      >
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-black text-sm sm:text-base text-stone-900 dark:text-white">
                          {opt.title}
                        </h4>
                        <p className="text-xs text-stone-500 dark:text-slate-400 mt-1 leading-relaxed">
                          {opt.desc}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 3: Belangrijkste Functies */}
          {currentStep === 3 && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h3 className="text-base sm:text-lg font-black text-stone-900 dark:text-white flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-emerald-500 text-white text-xs flex items-center justify-center font-black">3</span>
                  Welke slimme functies wil je graag op de website hebben?
                </h3>
                <p className="text-xs text-stone-500 dark:text-slate-400 mt-1">
                  Selecteer één of meerdere opties. Alles wordt native gebouwd zonder zware externe plugins.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {featureOptions.map((opt) => {
                  const Icon = opt.icon;
                  const isChecked = selectedFeatures.includes(opt.id);
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => toggleFeature(opt.id)}
                      className={`text-left p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center gap-3 ${
                        isChecked
                          ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/30 font-bold text-stone-900 dark:text-white'
                          : 'border-slate-200 dark:border-slate-800 text-stone-600 dark:text-slate-300 bg-white dark:bg-slate-900 hover:border-slate-300'
                      }`}
                    >
                      <div
                        className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs shrink-0 ${
                          isChecked ? 'bg-emerald-500 text-white' : 'border border-slate-300 dark:border-slate-600'
                        }`}
                      >
                        {isChecked && <CheckCircle2 className="w-4 h-4" />}
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <Icon className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                        <span>{opt.label}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 4: Content & Logo status */}
          {currentStep === 4 && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h3 className="text-base sm:text-lg font-black text-stone-900 dark:text-white flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-emerald-500 text-white text-xs flex items-center justify-center font-black">4</span>
                  Hoe staat het met je teksten, logo en beeldmateriaal?
                </h3>
                <p className="text-xs text-stone-500 dark:text-slate-400 mt-1">
                  Je hoeft zelf geen tekstenexpert te zijn; wij kunnen professionele conversieteksten voor je verzorgen.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {contentOptions.map((opt) => {
                  const isSelected = contentStatus === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setContentStatus(opt.id)}
                      className={`text-left p-5 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between gap-4 ${
                        isSelected
                          ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/30 ring-2 ring-emerald-500/20'
                          : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900'
                      }`}
                    >
                      <div>
                        <h4 className="font-black text-sm sm:text-base text-stone-900 dark:text-white">
                          {opt.title}
                        </h4>
                        <p className="text-xs text-stone-500 dark:text-slate-400 mt-1">
                          {opt.desc}
                        </p>
                      </div>
                      <div
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ${
                          isSelected
                            ? 'border-emerald-500 bg-emerald-500 text-white'
                            : 'border-slate-300 dark:border-slate-600'
                        }`}
                      >
                        {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 5: Levertijd & Planning */}
          {currentStep === 5 && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h3 className="text-base sm:text-lg font-black text-stone-900 dark:text-white flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-emerald-500 text-white text-xs flex items-center justify-center font-black">5</span>
                  Hoe snel wil je dat de website officieel live staat?
                </h3>
                <p className="text-xs text-stone-500 dark:text-slate-400 mt-1">
                  Wij hanteren transparante oplevertijden met een 100% tevredenheidsgarantie.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {timelineOptions.map((opt) => {
                  const isSelected = timeline === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setTimeline(opt.id)}
                      className={`text-left p-5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/30 ring-2 ring-emerald-500/20'
                          : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900'
                      }`}
                    >
                      <div className="mb-3">
                        <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                          {opt.badge}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-black text-sm text-stone-900 dark:text-white">
                          {opt.title}
                        </h4>
                        <p className="text-xs text-stone-500 dark:text-slate-400 mt-1">
                          {opt.desc}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-8 border-t border-slate-200 dark:border-slate-800 mt-8">
            <button
              type="button"
              disabled={currentStep === 1}
              onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                currentStep === 1
                  ? 'opacity-40 cursor-not-allowed text-stone-400'
                  : 'text-stone-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Vorige Vraag</span>
            </button>

            {currentStep < totalSteps ? (
              <button
                type="button"
                onClick={() => setCurrentStep((prev) => Math.min(totalSteps, prev + 1))}
                className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black transition-all flex items-center gap-2 shadow-md hover:shadow-lg cursor-pointer"
              >
                <span>Volgende Vraag</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleFinish}
                className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-black transition-all flex items-center gap-2 shadow-lg hover:shadow-xl cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>Bekijk Mijn Persoonlijk Advies</span>
              </button>
            )}
          </div>
        </div>
      ) : (
        /* RESULT & SUMMARY SCREEN */
        <div className="py-8 space-y-8 animate-fade-in">
          <div className="bg-emerald-50/70 dark:bg-emerald-950/40 p-6 sm:p-8 rounded-3xl border border-emerald-200 dark:border-emerald-800/60">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-emerald-200/80 dark:border-emerald-800/60">
              <div>
                <span className="text-[11px] font-black uppercase tracking-wider text-emerald-800 dark:text-emerald-300 bg-white dark:bg-emerald-900/60 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-700">
                  Jouw Aanbevolen Website Oplossing
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-stone-900 dark:text-white mt-2">
                  {currentResult.recommendedPackage}
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 dark:text-slate-300 font-medium mt-1">
                  Volledig op maat geconfigureerd voor de sector <strong className="capitalize text-stone-900 dark:text-white">{currentResult.industry}</strong>.
                </p>
              </div>

              <div className="text-left md:text-right bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-2xl border border-emerald-200 dark:border-slate-800 shadow-sm shrink-0">
                <span className="text-[10px] font-black uppercase tracking-wider text-stone-500 block">
                  Vaste Richtprijs (All-in)
                </span>
                <div className="text-2xl sm:text-3xl font-black font-mono text-emerald-600 dark:text-emerald-400">
                  €{currentResult.estimatedPrice},-
                </div>
                <span className="text-[11px] text-stone-500 block">
                  Eenmalig · 100% eigendomsoverdracht
                </span>
              </div>
            </div>

            {/* Included highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-6">
              <div className="bg-white/80 dark:bg-slate-900/80 p-4 rounded-2xl border border-emerald-100 dark:border-slate-800">
                <span className="text-xs font-black text-stone-900 dark:text-white block">
                  🚀 Oplevertijd
                </span>
                <span className="text-xs text-stone-600 dark:text-slate-300 capitalize">
                  {currentResult.timeline === 'spoed' ? 'Met spoed binnen 48 uur' : 'Binnen 5 werkdagen'}
                </span>
              </div>
              <div className="bg-white/80 dark:bg-slate-900/80 p-4 rounded-2xl border border-emerald-100 dark:border-slate-800">
                <span className="text-xs font-black text-stone-900 dark:text-white block">
                  ⚡ Prestaties & Snelheid
                </span>
                <span className="text-xs text-stone-600 dark:text-slate-300">
                  Next.js App Router · 0.3s laadtijd
                </span>
              </div>
              <div className="bg-white/80 dark:bg-slate-900/80 p-4 rounded-2xl border border-emerald-100 dark:border-slate-800">
                <span className="text-xs font-black text-stone-900 dark:text-white block">
                  🛡️ Eigendom & Hosting
                </span>
                <span className="text-xs text-stone-600 dark:text-slate-300">
                  Geen vendor lock-in · Vrije hostingkeuze
                </span>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              type="button"
              onClick={() => {
                setIsSubmitted(false);
                setCurrentStep(1);
              }}
              className="text-xs font-bold text-stone-600 dark:text-slate-400 hover:text-stone-900 dark:hover:text-white cursor-pointer"
            >
              ← Vragenlijst opnieuw invullen
            </button>

            <button
              type="button"
              onClick={handleApplyProposal}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-black transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Vrijblijvend Voorstel Aanvragen met Dit Advies</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
