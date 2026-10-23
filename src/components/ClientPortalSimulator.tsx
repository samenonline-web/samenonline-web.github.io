'use client';

import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Clock, 
  Calendar, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  MessageSquare, 
  Globe, 
  Code2, 
  Key, 
  FileCheck,
  ChevronRight,
  ExternalLink
} from 'lucide-react';

interface ClientPortalSimulatorProps {
  onRequestWebsite?: () => void;
}

interface StepDetail {
  day: number;
  title: string;
  subtitle: string;
  duration: string;
  clientEffort: string;
  portalMessage: string;
  checklist: string[];
  deliverableBadge: string;
}

const STEPS: StepDetail[] = [
  {
    day: 1,
    title: 'Intake & Directe Kick-off',
    subtitle: 'Wensen doorspreken, kleuren bepalen en direct aan de slag.',
    duration: 'Binnen 2 uur na aanvraag',
    clientEffort: '15 minuten (telefonisch of intakeformulier)',
    portalMessage: 'Hoi! Welkom bij Samen Online. Ik heb je aanvraag ontvangen en de opzet staat klaar. Stuur gerust je logo en voorkeuren door, dan begin ik meteen met bouwen!',
    checklist: [
      'Telefonische kennismaking & bepalen hoofddoel van de website',
      'Keuze voor kleurenthema, lettertype en gewenste pagina’s',
      'Ontvangen van eventuele logo’s, foto’s en bedrijfsgegevens',
      'Aanmaken van jouw persoonlijke staging-omgeving',
    ],
    deliverableBadge: 'Project Briefing & Huisstijl Vastgesteld',
  },
  {
    day: 2,
    title: 'Eerste Werkende Live-Versie',
    subtitle: 'Binnen 48 uur zie je jouw website live op een geheim testdomein.',
    duration: 'Dag 2 • Oplevering eerste concept',
    clientEffort: '20 minuten preview testen op je mobiel',
    portalMessage: 'Goed nieuws! De eerste interactieve versie staat live op jouw geheime testlink (demo.samenonline.nl/jouwbedrijf). Kijk er rustig naar op je telefoon en laat weten wat je vindt!',
    checklist: [
      'Volledig gecodeerd Next.js framework op testserver',
      'Werkende formulieren, 1-klik contactknoppen en mobiele navigatie',
      'Google Lighthouse 100/100 snelheidsoptimalisatie toegepast',
      'Geheime link gedeeld met jou voor live feedback',
    ],
    deliverableBadge: 'Geheime Live Staging Link Actief',
  },
  {
    day: 3,
    title: 'Kosteloze Revisieronde',
    subtitle: 'Samen finetunen tot alles 100% klopt.',
    duration: 'Dag 3 • Vrijblijvende aanpassingen',
    clientEffort: '10 minuten feedback geven',
    portalMessage: 'Top, al je opmerkingen zijn verwerkt! Ik heb de knoppen scherper gemaakt, de foto van je team toegevoegd en de prijzen geüpdatet.',
    checklist: [
      'Teksten en koppen aangescherpt voor maximale conversie',
      'Eventuele extra diensten of tarieven toegevoegd',
      'Fotogalerij en klantbeoordelingen ingevoegd',
      'Definitief akkoord op vormgeving en inhoud',
    ],
    deliverableBadge: '100% Tevredenheidsakkoord op Ontwerp',
  },
  {
    day: 4,
    title: 'Domein, E-mail & Koppelingen',
    subtitle: 'Technische koppelingen en zakelijke e-mailconfiguratie.',
    duration: 'Dag 4 • Technische infrastructuur',
    clientEffort: '0 minuten (wij regelen alles)',
    portalMessage: 'Je .nl domeinnaam is gekoppeld en het SSL-beveiligingscertificaat is groen. Je zakelijke e-mail (info@jouwbedrijf.nl) is nu ook actief!',
    checklist: [
      'Koppeling of verhuizing van jouw gewenste .nl domeinnaam',
      'Gratis SSL-certificaat (groen slotje in de browser)',
      'Instellen zakelijke e-mail en doorstuurregels',
      'Activatie van iDEAL 2.0 / Mollie (indien webshop)',
    ],
    deliverableBadge: 'DNS, E-mail & Betaalsystemen Gekoppeld',
  },
  {
    day: 5,
    title: '100% Eigendomsoverdracht & Livegang',
    subtitle: 'Jouw website staat officieel live op Google.',
    duration: 'Dag 5 • Officiële livegang',
    clientEffort: '0 minuten (vieren dat je live bent!)',
    portalMessage: 'Gefeliciteerd! Jouw website staat nu officieel live voor heel Nederland. Ik heb de XML sitemap direct aangemeld bij Google Search Console voor snelle indexatie. De broncode en inloggegevens staan in je mailbox!',
    checklist: [
      'Website live voor het grote publiek op jouw eigen domein',
      'Aanmelding bij Google Search Console & XML Sitemap ingediend',
      '100% Overdracht van alle code en DNS-beheer',
      'Geen opzegtermijnen, geen wurgcontracten: het is écht van jou',
    ],
    deliverableBadge: 'Officieel Live & Eigendomsoverdracht Voltooid',
  },
];

export default function ClientPortalSimulator({ onRequestWebsite }: ClientPortalSimulatorProps) {
  const [activeDay, setActiveDay] = useState<number>(2);

  const activeStep = STEPS.find((s) => s.day === activeDay) || STEPS[0];

  return (
    <section id="klantenportaal-simulator" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-200 dark:border-emerald-800/70 text-emerald-700 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Nooit Meer in het Duister Tastend</span>
        </div>

        <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          De{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">
            5-Dagen Oplever-Simulator
          </span>
          : Van Idee naar Livegang
        </h2>

        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
          Veel ondernemers vrezen dat ze na akkoord wekenlang niets horen van een webdesigner. 
          Bij Samen Online weet je van dag tot dag exact wat er gebeurt. Klik door de stappen en ontdek ons proces.
        </p>
      </div>

      {/* Stepper Navigation Bar */}
      <div className="grid grid-cols-5 gap-2 sm:gap-3 mb-8">
        {STEPS.map((step) => {
          const isActive = step.day === activeDay;
          const isPassed = step.day < activeDay;

          return (
            <button
              key={step.day}
              onClick={() => setActiveDay(step.day)}
              className={`p-3 sm:p-4 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-between ${
                isActive
                  ? 'bg-slate-900 text-white border-emerald-500 ring-2 ring-emerald-500/20 shadow-lg'
                  : isPassed
                  ? 'bg-emerald-50/70 dark:bg-slate-900/60 border-emerald-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 hover:bg-emerald-100/50'
                  : 'bg-white dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full mb-1 text-xs font-bold transition-all">
                {isPassed ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                ) : (
                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black ${
                      isActive
                        ? 'bg-emerald-500 text-slate-950'
                        : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {step.day}
                  </span>
                )}
              </div>

              <span className="text-[10px] sm:text-xs font-bold truncate w-full block">
                Dag {step.day}
              </span>
              <span className="hidden sm:block text-[9px] text-slate-400 truncate w-full">
                {step.title.split(' ')[0]}...
              </span>
            </button>
          );
        })}
      </div>

      {/* Main Day Content Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-10 shadow-lg grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Step Details & Deliverables (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 font-bold text-xs px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-800/80">
                Fase {activeStep.day} van 5
              </span>
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {activeStep.duration}
              </span>
            </div>

            <h3 className="text-2xl font-black text-slate-900 dark:text-white">
              {activeStep.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium mt-1">
              {activeStep.subtitle}
            </p>
          </div>

          {/* Effort Badge */}
          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-600 dark:text-slate-300">
              Jouw benodigde tijdsinvestering:
            </span>
            <span className="font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-lg">
              {activeStep.clientEffort}
            </span>
          </div>

          {/* Checklist for this day */}
          <div className="space-y-2.5">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block">
              Wat Samen Online vandaag voor jou oplevert:
            </span>
            <div className="space-y-2">
              {activeStep.checklist.map((item, index) => (
                <div
                  key={index}
                  className="p-3 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex items-start gap-2.5 text-xs text-slate-800 dark:text-slate-200 font-medium"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Stepper buttons (Next / Prev) */}
          <div className="pt-4 flex items-center gap-3">
            {activeDay > 1 && (
              <button
                onClick={() => setActiveDay((prev) => Math.max(1, prev - 1))}
                className="py-2.5 px-4 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                ← Vorige Dag
              </button>
            )}

            {activeDay < 5 ? (
              <button
                onClick={() => setActiveDay((prev) => Math.min(5, prev + 1))}
                className="flex-1 py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-black dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-md active:scale-95 cursor-pointer"
              >
                <span>Bekijk Dag {activeDay + 1}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={onRequestWebsite}
                className="flex-1 py-3 px-4 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-black flex items-center justify-center gap-1.5 transition-all shadow-lg shadow-orange-600/30 active:scale-95 cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>Start Mijn 5-Dagen Project</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Right Side: Simulated WhatsApp Update & Deliverable Badge (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          {/* Deliverable Trophy Box */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/30">
            <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700 dark:text-emerald-400 block mb-1">
              Gegarandeerde Mijlpaal:
            </span>
            <div className="flex items-center gap-2 text-sm font-black text-slate-900 dark:text-white">
              <FileCheck className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>{activeStep.deliverableBadge}</span>
            </div>
          </div>

          {/* Simulated Project Portal Live Update Card */}
          <div className="rounded-2xl bg-slate-100 dark:bg-slate-950 p-4 border border-slate-200 dark:border-slate-800 shadow-inner">
            <div className="flex items-center gap-2 pb-2.5 mb-2.5 border-b border-black/10 dark:border-white/10 text-xs">
              <div className="w-7 h-7 rounded-full bg-orange-600 flex items-center justify-center text-white text-[11px] font-black">
                K
              </div>
              <div className="flex-1 min-w-0">
                <span className="font-bold text-slate-900 dark:text-white block truncate">
                  Kenan • Project Lead &amp; Developer
                </span>
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Live Project Update
                </span>
              </div>
            </div>

            {/* Bubble */}
            <div className="bg-white dark:bg-slate-800 p-3.5 rounded-2xl rounded-tl-xs shadow-xs text-xs text-slate-800 dark:text-slate-200 leading-relaxed font-sans space-y-2">
              <p>{activeStep.portalMessage}</p>
              <div className="text-right text-[10px] text-slate-400 font-mono">
                Status: In behandeling ✓
              </div>
            </div>
          </div>

          {/* Total Freedom Guarantee */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-2 text-xs text-slate-600 dark:text-slate-300">
            <div className="flex items-center gap-1.5 font-bold text-slate-900 dark:text-white">
              <Key className="w-4 h-4 text-orange-500" />
              <span>100% Volledig Eigendom</span>
            </div>
            <p className="text-[11px] leading-relaxed">
              Geen enkel ander bureau biedt dit: na dag 5 ontvang je alle bronbestanden en credentials. 
              Je bent nooit afhankelijk van ons en zit nergens aan vast.
            </p>
          </div>
        </div>
      </div>

      {/* 3-YEAR TOTAL COST OF OWNERSHIP (TCO) COMPARISON MODULE */}
      <div className="mt-12 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-10 shadow-lg space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60 text-xs font-black uppercase tracking-wider">
            <span>Financieel Inzicht • 3-Jaars TCO Berekening</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Waarom Samen Online tot €4.650,- Goedkoper is dan WordPress
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium">
            Veel ondernemers staren zich blind op de initiële bouwprijs, maar betalen jaarlijks honderden euro&apos;s aan verborgen licenties, trage hosting en dure uurtarieven voor plugin-reparaties.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* WordPress Column */}
          <div className="p-6 rounded-2xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/40 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-rose-200 dark:border-rose-900/40">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-rose-700 dark:text-rose-400 block">
                  Traditioneel Bureau
                </span>
                <h4 className="font-black text-lg text-slate-900 dark:text-white">WordPress &amp; Elementor</h4>
              </div>
              <span className="text-xl font-black font-mono text-rose-700 dark:text-rose-400">
                €5.190,-
              </span>
            </div>

            <ul className="space-y-2.5 text-xs text-slate-700 dark:text-slate-300">
              <li className="flex justify-between">
                <span>Bouwkosten bureau:</span>
                <strong className="text-slate-900 dark:text-white">€1.500,-</strong>
              </li>
              <li className="flex justify-between">
                <span>Managed WP Hosting (36 mnd × €25):</span>
                <strong className="text-slate-900 dark:text-white">€900,-</strong>
              </li>
              <li className="flex justify-between">
                <span>Jaarlijkse plugins (Elementor Pro, WPML, SEO):</span>
                <strong className="text-slate-900 dark:text-white">€450,-</strong>
              </li>
              <li className="flex justify-between">
                <span>Onderhoud &amp; Veiligheidsupdates (36 mnd × €65):</span>
                <strong className="text-slate-900 dark:text-white">€2.340,-</strong>
              </li>
            </ul>

            <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-rose-200 dark:border-rose-900/40 text-[11px] text-rose-800 dark:text-rose-300 font-medium">
              ⚠️ Risico: WordPress plugins vereisen continue updates; bij conflicten ligt je website eruit of moet een developer ingehuurd worden.
            </div>
          </div>

          {/* Samen Online Next.js Column */}
          <div className="p-6 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 border-2 border-emerald-500 shadow-md space-y-4 relative">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-600 text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full">
              Slimme Keuze
            </span>

            <div className="flex items-center justify-between pb-3 border-b border-emerald-200 dark:border-emerald-800/60">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700 dark:text-emerald-400 block">
                  Moderne Webstandaard
                </span>
                <h4 className="font-black text-lg text-slate-900 dark:text-white">Samen Online Next.js</h4>
              </div>
              <span className="text-xl font-black font-mono text-emerald-600 dark:text-emerald-400">
                €537,-
              </span>
            </div>

            <ul className="space-y-2.5 text-xs text-slate-700 dark:text-slate-300">
              <li className="flex justify-between">
                <span>Bouwkosten eenmalig (Samen Start):</span>
                <strong className="text-slate-900 dark:text-white">€195,-</strong>
              </li>
              <li className="flex justify-between">
                <span>All-in Webhosting &amp; .nl domein (36 mnd × €9,50):</span>
                <strong className="text-slate-900 dark:text-white">€342,-</strong>
              </li>
              <li className="flex justify-between">
                <span>Jaarlijkse plugin licenties:</span>
                <strong className="text-emerald-600 dark:text-emerald-400">€0,- (Geen plugins nodig)</strong>
              </li>
              <li className="flex justify-between">
                <span>Beveiligingsupdates &amp; Database-onderhoud:</span>
                <strong className="text-emerald-600 dark:text-emerald-400">€0,- (Static Edge = Onhackbaar)</strong>
              </li>
            </ul>

            <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-800/60 text-[11px] text-emerald-800 dark:text-emerald-300 font-medium">
              ✓ Garantie: 100% eigendomsoverdracht. Geen vendor lock-in en nul periodieke plugin-reparaties.
            </div>
          </div>
        </div>

        {/* Total Net Savings Banner */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
          <div>
            <span className="text-xs uppercase tracking-wider font-extrabold text-emerald-100 block">
              Jouw 3-Jaars Netto Winst:
            </span>
            <div className="text-2xl sm:text-3xl font-black font-mono">
              €4.653,- Bespaard (89% lagere kosten)
            </div>
          </div>

          <a
            href="/vragenlijst"
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white text-emerald-900 font-black text-xs sm:text-sm hover:bg-emerald-50 transition-all text-center shadow-md active:scale-95 cursor-pointer whitespace-nowrap"
          >
            Start Vragenlijst &amp; Bereken Mijn Voordeel
          </a>
        </div>
      </div>
    </section>
  );
}
