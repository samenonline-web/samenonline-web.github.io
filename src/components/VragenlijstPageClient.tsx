'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { WebsiteQuestionnaire } from './WebsiteQuestionnaire';
import { RequestWebsiteModal } from './RequestWebsiteModal';
import {
  HelpCircle,
  ArrowLeft,
  ChevronRight,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Zap,
  ChevronDown
} from 'lucide-react';

export const VragenlijstPageClient: React.FC = () => {
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [requestCustomData, setRequestCustomData] = useState<{
    templateName: string;
    budget: string;
    notes: string;
  } | null>(null);

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: 'Wat gebeurt er nadat ik de vragenlijst heb afgerond?',
      a: 'Je krijgt direct op je scherm een helder overzicht van het aanbevolen pakket met de vaste all-in richtprijs. Als je op "Offerte Aanvragen" klikt, nemen we binnen 4 uur contact met je op om eventuele specifieke wensen door te spreken.',
    },
    {
      q: 'Zit ik ergens aan vast na het invullen van deze vragen?',
      a: 'Nee, absoluut niet. De vragenlijst en de offerte zijn 100% vrijblijvend. Pas wanneer jij akkoord geeft op ons definitieve voorstel en de live demo van jouw concept, gaan we voor je aan de slag.',
    },
    {
      q: 'Kan ik later nog extra functies toevoegen (zoals iDEAL of een blog)?',
      a: 'Zeker. Onze Next.js codebasis is modulair opgebouwd. Een website kan altijd meegroeien met jouw onderneming zonder dat je opnieuw hoeft te beginnen.',
    },
    {
      q: 'Hoe snel kan mijn website daadwerkelijk live staan?',
      a: 'Gemiddeld staat jouw website binnen 3 tot 5 werkdagen volledig operationeel online, inclusief domeinnaam, zakelijke e-mail, Google SEO en mobiele optimalisatie.',
    },
  ];

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-slate-950 text-stone-900 dark:text-stone-100 selection:bg-orange-500 selection:text-white">
      {/* Header */}
      <header className="border-b border-slate-200/80 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <nav className="flex items-center gap-2 text-xs font-semibold text-stone-600 dark:text-slate-400">
            <Link
              href="/"
              className="hover:text-orange-600 dark:hover:text-orange-400 transition-colors flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Samen Online</span>
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
            <span className="text-orange-600 dark:text-orange-400 font-black">Website Keuzehulp</span>
          </nav>

          <Link
            href="/"
            className="px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-stone-800 dark:text-white text-xs font-bold transition-all shadow-xs"
          >
            Bekijk 40+ Demo&apos;s
          </Link>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-16">
        {/* HERO TITLE */}
        <section className="text-center space-y-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60 text-xs font-black uppercase tracking-wider">
            <HelpCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Interactieve Intake Vragenlijst</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-stone-900 dark:text-white tracking-tight leading-tight">
            Ontdek Welke Website{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-600">
              Perfect bij Jou Past
            </span>
          </h1>

          <p className="text-base sm:text-lg text-stone-600 dark:text-slate-300 font-medium">
            Beantwoord 5 gerichte vragen over jouw branche, doelstellingen en gewenste opties. Je ontvangt direct een transparant advies met vaste prijsindicatie.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2 text-xs font-bold text-stone-600 dark:text-slate-400">
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-orange-600 dark:text-orange-400" />
              Kost slechts 2 minuten
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              100% Vrijblijvend & Geen Verplichtingen
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-amber-500" />
              Directe Vaste All-in Prijs
            </span>
          </div>
        </section>

        {/* INTERACTIVE QUESTIONNAIRE */}
        <section>
          <WebsiteQuestionnaire
            lang="nl"
            onOpenRequestModal={(customData) => {
              setRequestCustomData({
                templateName: customData?.templateTitle || 'Advies Website Keuzehulp',
                budget: customData?.calculatedPrice ? `€${customData.calculatedPrice},- All-in` : 'Vanaf €195',
                notes: customData?.notes || 'Aanvraag via Website Vragenlijst.',
              });
              setIsRequestModalOpen(true);
            }}
          />
        </section>

        {/* WHY THIS MATTERS SECTION */}
        <section className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-200/90 dark:border-slate-800 shadow-md grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-orange-100 dark:bg-orange-950/70 text-orange-600 dark:text-orange-400 flex items-center justify-center font-black">
              1
            </div>
            <h3 className="font-black text-base text-stone-900 dark:text-white">Geen Vage Uurtarieven</h3>
            <p className="text-xs text-stone-600 dark:text-slate-300 leading-relaxed font-medium">
              We werken met vaste pakketprijzen vanaf €195,-. Geen onverwachte nacalculaties of verborgen meerkosten.
            </p>
          </div>

          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/70 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-black">
              2
            </div>
            <h3 className="font-black text-base text-stone-900 dark:text-white">100% Jouw Eigendom</h3>
            <p className="text-xs text-stone-600 dark:text-slate-300 leading-relaxed font-medium">
              Geen wurgcontracten of maandelijkse huur. Je bent en blijft 100% eigenaar van de volledige broncode en content.
            </p>
          </div>

          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-sky-100 dark:bg-sky-950/70 text-sky-600 dark:text-sky-400 flex items-center justify-center font-black">
              3
            </div>
            <h3 className="font-black text-base text-stone-900 dark:text-white">0.3s Next.js Snelheid</h3>
            <p className="text-xs text-stone-600 dark:text-slate-300 leading-relaxed font-medium">
              Geen trage WordPress plugins. Jouw website scoort 95-100 in Google PageSpeed en converteert direct bezoekers.
            </p>
          </div>
        </section>

        {/* FREQUENTLY ASKED QUESTIONS */}
        <section className="space-y-6 max-w-3xl mx-auto">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-stone-900 dark:text-white">
              Veelgestelde Vragen over de Vragenlijst
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 dark:text-slate-400 font-medium">
              Alles wat je moet weten voordat we voor jouw onderneming gaan bouwen
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 overflow-hidden shadow-xs"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-black text-sm text-stone-900 dark:text-white hover:text-orange-600 transition-colors cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-stone-400 shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-orange-600' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-0 text-xs text-stone-600 dark:text-slate-300 leading-relaxed font-medium border-t border-slate-100 dark:border-slate-800/80 mt-1">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200/80 dark:border-slate-800 py-8 bg-white dark:bg-slate-900 text-center text-xs text-stone-500">
        <p>© 2026 Samen Online · Website Keuzehulp & Vragenlijst voor Nederlandse Ondernemers.</p>
      </footer>

      {/* Request Website Modal */}
      <RequestWebsiteModal
        isOpen={isRequestModalOpen}
        selectedTemplate={null}
        lang="nl"
        initialCustomData={requestCustomData}
        onClose={() => {
          setIsRequestModalOpen(false);
          setRequestCustomData(null);
        }}
      />
    </div>
  );
};
