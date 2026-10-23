'use client';

import React, { useState, useEffect } from 'react';
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
  MessageSquare,
  Printer,
  Copy,
  Check,
  Building2,
  Globe,
  ShieldCheck,
  Download
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
  const [cityParam, setCityParam] = useState<string>('');
  const [domainParam, setDomainParam] = useState<string>('');
  const [topicParam, setTopicParam] = useState<string>('');
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [dossierToken, setDossierToken] = useState<string>('SO-INTAKE-2026-884');

  // Support URL query prefilling (?pakket=...&spoed=true&addons=...&stad=...&domein=...)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);

    const pSpoed = params.get('spoed');
    if (pSpoed === 'true' || pSpoed === '1') {
      setTimeline('spoed');
    }

    const pPakket = params.get('pakket');
    if (pPakket) {
      const lower = pPakket.toLowerCase();
      if (lower.includes('shop') || lower.includes('retail')) {
        setIndustry('webshop');
        setPrimaryGoal('ideal');
      } else if (lower.includes('horeca') || lower.includes('restaurant') || lower.includes('cafe')) {
        setIndustry('horeca');
        setPrimaryGoal('afspraken');
      } else if (lower.includes('bouw') || lower.includes('klus') || lower.includes('schilder')) {
        setIndustry('bouw');
        setPrimaryGoal('leads');
      } else if (lower.includes('zorg') || lower.includes('kapper') || lower.includes('salon')) {
        setIndustry('zorg');
        setPrimaryGoal('afspraken');
      }
    }

    const pAddons = params.get('addons');
    if (pAddons) {
      const addonList = pAddons.split(',').map((s) => s.trim().toLowerCase());
      const mapped: string[] = ['contactformulier', 'google_seo'];
      if (addonList.some((a) => a.includes('calc') || a.includes('offerte'))) {
        mapped.push('offerte_calc');
      }
      if (addonList.some((a) => a.includes('ideal') || a.includes('shop') || a.includes('mollie'))) {
        mapped.push('ideal_checkout');
      }
      if (addonList.some((a) => a.includes('booking') || a.includes('afspraak') || a.includes('agenda'))) {
        mapped.push('afspraken_kalender');
      }
      setSelectedFeatures((prev) => Array.from(new Set([...prev, ...mapped])));
    }

    const pStad = params.get('stad');
    if (pStad) {
      const cleanCity = pStad.charAt(0).toUpperCase() + pStad.slice(1).replace('-', ' ');
      setCityParam(cleanCity);
    }

    const pDomein = params.get('domein');
    if (pDomein) {
      setDomainParam(pDomein);
    }

    const pTopic = params.get('onderwerp') || params.get('topic');
    if (pTopic) {
      setTopicParam(pTopic);
    }

    const randomSuffix = Math.floor(100 + Math.random() * 900);
    setDossierToken(`SO-INTAKE-2026-${randomSuffix}`);
  }, []);

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
      const summaryNotes = `Website Vragenlijst Uitkomst [${dossierToken}]:\n- Branche: ${result.industry}\n- Doel: ${result.primaryGoal}\n- Gekozen functies: ${result.features.join(', ')}\n- Content status: ${result.contentStatus}\n- Levertijd: ${result.timeline}${topicParam ? `\n- Kennisbank Thema: ${topicParam}` : ''}${cityParam ? `\n- Regio: ${cityParam}` : ''}${domainParam ? `\n- Domein: ${domainParam}` : ''}\n- Geadviseerd pakket: ${result.recommendedPackage} (ca. €${result.estimatedPrice},- all-in)`;
      onOpenRequestModal({
        notes: summaryNotes,
        templateTitle: `${result.recommendedPackage} (${result.industry}) - ${dossierToken}`,
        calculatedPrice: result.estimatedPrice,
      });
    }
  };

  const handleCopyDossier = () => {
    const result = calculateRecommendation();
    const summary = `Samen Online Website Intake Dossier (${dossierToken})
--------------------------------------------------
Dossier Referentie: ${dossierToken}
Branche: ${result.industry}
Primair Doel: ${result.primaryGoal}
Geadviseerd Pakket: ${result.recommendedPackage}
Vaste Richtprijs: €${result.estimatedPrice},- (all-in eenmalig)
Oplevertijd: ${result.timeline === 'spoed' ? 'Met spoed binnen 48 uur' : 'Binnen 5 werkdagen'}
Gekozen Functionaliteiten: ${result.features.join(', ')}
${domainParam ? `Gewenst Domein: ${domainParam}\n` : ''}${cityParam ? `Regio / Stad: ${cityParam}\n` : ''}${topicParam ? `Kennisbank Thema: ${topicParam}\n` : ''}
Tech Stack: Next.js 16 App Router · Tailwind v4 · 0.3s laadtijd · 100% eigendom
Aanvragen: https://samenonline-web.github.io/vragenlijst`;

    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(summary);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2500);
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
          {/* Printable Dossier Container */}
          <div className="printable-modal-root bg-emerald-50/70 dark:bg-emerald-950/40 p-6 sm:p-8 rounded-3xl border border-emerald-200 dark:border-emerald-800/60 shadow-md">
            <div className="printable-modal-card">
              {/* Top Meta Badges */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-emerald-200/60 dark:border-emerald-800/40 text-xs">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono font-bold px-2.5 py-1 rounded-lg bg-emerald-200/60 dark:bg-emerald-900/80 text-emerald-900 dark:text-emerald-200 text-[11px]">
                    Dossier: {dossierToken}
                  </span>
                  {cityParam && (
                    <span className="font-bold px-2.5 py-1 rounded-lg bg-orange-100 dark:bg-orange-950 text-orange-900 dark:text-orange-200 text-[11px] flex items-center gap-1">
                      <Building2 className="w-3.5 h-3.5" />
                      <span>Regio {cityParam}</span>
                    </span>
                  )}
                  {domainParam && (
                    <span className="font-bold px-2.5 py-1 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-900 dark:text-blue-200 text-[11px] flex items-center gap-1">
                      <Globe className="w-3.5 h-3.5" />
                      <span>{domainParam}</span>
                    </span>
                  )}
                  {topicParam && (
                    <span className="font-bold px-2.5 py-1 rounded-lg bg-purple-100 dark:bg-purple-950 text-purple-900 dark:text-purple-200 text-[11px] flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                      <span>Thema: {topicParam}</span>
                    </span>
                  )}
                </div>
                <span className="text-[11px] font-semibold text-emerald-800 dark:text-emerald-300">
                  ⚡ Binnen 48u eerste werkende concept
                </span>
              </div>

              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-emerald-200/80 dark:border-emerald-800/60">
                <div>
                  <span className="text-[11px] font-black uppercase tracking-wider text-emerald-800 dark:text-emerald-300 bg-white dark:bg-emerald-900/60 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-700">
                    Jouw Aanbevolen Website Oplossing
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-stone-900 dark:text-white mt-2">
                    {currentResult.recommendedPackage}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 dark:text-slate-300 font-medium mt-1">
                    Volledig op maat geconfigureerd voor de sector <strong className="capitalize text-stone-900 dark:text-white">{currentResult.industry}</strong> met primair doel <strong className="text-stone-900 dark:text-white">{currentResult.primaryGoal}</strong>.
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
                    {currentResult.timeline === 'spoed' ? 'Met spoed binnen 48 uur (+€75)' : 'Binnen 5 werkdagen'}
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

              {/* Functional Modules Checklist */}
              <div className="pt-6 border-t border-emerald-200/60 dark:border-emerald-800/40 mt-6">
                <span className="text-xs font-black uppercase tracking-wider text-stone-700 dark:text-slate-300 block mb-3">
                  Inbegrepen Functionaliteiten & Specificaties
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-700 dark:text-slate-300">
                  {currentResult.features.map((feat) => {
                    const featObj = featureOptions.find((f) => f.id === feat);
                    return (
                      <div key={feat} className="flex items-center gap-2 p-2 rounded-xl bg-white/60 dark:bg-slate-900/60 border border-emerald-100 dark:border-slate-800">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                        <span className="font-semibold">{featObj ? featObj.label : feat}</span>
                      </div>
                    );
                  })}
                  <div className="flex items-center gap-2 p-2 rounded-xl bg-white/60 dark:bg-slate-900/60 border border-emerald-100 dark:border-slate-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span className="font-semibold">Volledige Responsive Polish (375px/390px/412px)</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-xl bg-white/60 dark:bg-slate-900/60 border border-emerald-100 dark:border-slate-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span className="font-semibold">Schema.org LocalBusiness & Breadcrumbs</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
            <button
              type="button"
              onClick={() => {
                setIsSubmitted(false);
                setCurrentStep(1);
              }}
              className="text-xs font-bold text-stone-600 dark:text-slate-400 hover:text-stone-900 dark:hover:text-white cursor-pointer py-2 text-center"
            >
              ← Vragenlijst opnieuw invullen
            </button>

            <div className="flex flex-wrap items-center gap-2.5">
              <button
                type="button"
                onClick={handleCopyDossier}
                className="flex-1 sm:flex-initial px-4 py-3 rounded-xl bg-stone-100 hover:bg-stone-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-stone-800 dark:text-slate-100 font-bold text-xs flex items-center justify-center gap-1.5 border border-stone-200 dark:border-slate-700 transition-colors cursor-pointer"
              >
                {isCopied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span className="text-emerald-700 dark:text-emerald-400">Gekopieerd!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-stone-500" />
                    <span>Kopieer Specificatie</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => window.print()}
                className="flex-1 sm:flex-initial px-4 py-3 rounded-xl bg-stone-100 hover:bg-stone-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-stone-800 dark:text-slate-100 font-bold text-xs flex items-center justify-center gap-1.5 border border-stone-200 dark:border-slate-700 transition-colors cursor-pointer"
              >
                <Printer className="w-4 h-4 text-emerald-600" />
                <span>Print Intake Dossier (PDF)</span>
              </button>

              <button
                type="button"
                onClick={handleApplyProposal}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-black transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Vrijblijvend Voorstel Aanvragen met Dit Advies</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
