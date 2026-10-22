'use client';

import React, { useState } from 'react';
import {
  ClipboardCheck,
  CheckCircle2,
  FileDown,
  Sparkles,
  ShieldCheck,
  FolderCheck,
  UserCheck,
  Layers,
  ArrowRight,
} from 'lucide-react';
import { Language } from '../types/company';

interface ClientChecklistSectionProps {
  lang: Language;
  onOpenRequestModal: () => void;
}

export const ClientChecklistSection: React.FC<ClientChecklistSectionProps> = ({
  lang,
  onOpenRequestModal,
}) => {
  const [clientChecks, setClientChecks] = useState<Record<string, boolean>>({
    logo: true,
    photos: false,
    texts: false,
    contact: true,
  });

  const toggleCheck = (id: string) => {
    setClientChecks((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handlePrintGuide = () => {
    window.print();
  };

  return (
    <section id="aanlever-checklist" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-24">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black uppercase tracking-wider">
          <ClipboardCheck className="w-4 h-4 text-emerald-600" />
          <span>{lang === 'nl' ? 'Zorgeloze Voorbereiding' : 'Worry-free Preparation'}</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight">
          {lang === 'nl' ? 'Wat Moet Jij Zelf Aanleveren? (Bijna Niets!)' : 'What Do You Need to Supply? (Almost Nothing!)'}
        </h2>
        <p className="text-xs sm:text-sm text-stone-600 font-medium leading-relaxed max-w-xl mx-auto">
          {lang === 'nl'
            ? 'Geen ingewikkelde technische vraagstukken of stapels werk. Binnen 15 minuten heb je alles verzameld en wij regelen de complete technische bouw en livegang.'
            : 'No technical headaches or heavy workload. You provide the basics, and we take care of all coding, hosting, and launch.'}
        </p>
      </div>

      {/* Two Columns Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
        
        {/* Column 1: What Client Supplies */}
        <div className="bg-white rounded-3xl border-2 border-stone-200/90 p-6 sm:p-8 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center font-black">
                  <UserCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-black text-lg text-stone-900">1. Wat Jij Aanlevert</h3>
                  <span className="text-[11px] text-stone-500 font-medium">Binnen 15 minuten verzameld</span>
                </div>
              </div>
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-orange-100 text-orange-800">
                Jouw Inbreng
              </span>
            </div>

            <p className="text-xs text-stone-600 mb-6 leading-relaxed">
              Vink af wat je al klaar hebt liggen. Mis je iets? Geen enkel probleem; wij denken altijd kosteloos met je mee!
            </p>

            <div className="space-y-3 text-xs">
              <label
                onClick={() => toggleCheck('logo')}
                className={`p-3.5 rounded-2xl border-2 flex items-start gap-3 cursor-pointer transition-all ${
                  clientChecks.logo
                    ? 'border-emerald-500 bg-emerald-50/50'
                    : 'border-stone-200 hover:border-orange-200 bg-stone-50/50'
                }`}
              >
                <input
                  type="checkbox"
                  checked={clientChecks.logo}
                  onChange={() => {}}
                  className="mt-0.5 rounded accent-emerald-600"
                />
                <div>
                  <strong className="block text-stone-900 font-bold">Je Bedrijfslogo</strong>
                  <span className="text-stone-500 text-[11px]">
                    In PNG, SVG of JPG. Heb je nog geen logo? Dan ontwerpen we kosteloos een strak, modern tekstlogo voor je.
                  </span>
                </div>
              </label>

              <label
                onClick={() => toggleCheck('photos')}
                className={`p-3.5 rounded-2xl border-2 flex items-start gap-3 cursor-pointer transition-all ${
                  clientChecks.photos
                    ? 'border-emerald-500 bg-emerald-50/50'
                    : 'border-stone-200 hover:border-orange-200 bg-stone-50/50'
                }`}
              >
                <input
                  type="checkbox"
                  checked={clientChecks.photos}
                  onChange={() => {}}
                  className="mt-0.5 rounded accent-emerald-600"
                />
                <div>
                  <strong className="block text-stone-900 font-bold">Foto&apos;s van je werk of bedrijf</strong>
                  <span className="text-stone-500 text-[11px]">
                    Foto&apos;s gemaakt met je smartphone zijn al uitstekend. Heb je geen eigen foto&apos;s? Wij selecteren passende professionele rechtenvrije beelden.
                  </span>
                </div>
              </label>

              <label
                onClick={() => toggleCheck('texts')}
                className={`p-3.5 rounded-2xl border-2 flex items-start gap-3 cursor-pointer transition-all ${
                  clientChecks.texts
                    ? 'border-emerald-500 bg-emerald-50/50'
                    : 'border-stone-200 hover:border-orange-200 bg-stone-50/50'
                }`}
              >
                <input
                  type="checkbox"
                  checked={clientChecks.texts}
                  onChange={() => {}}
                  className="mt-0.5 rounded accent-emerald-600"
                />
                <div>
                  <strong className="block text-stone-900 font-bold">Korte omschrijving van je diensten</strong>
                  <span className="text-stone-500 text-[11px]">
                    Een paar steekwoorden per dienst is al genoeg. Heb je al een bestaande site of social media? Wij kopiëren en moderniseren de teksten automatisch.
                  </span>
                </div>
              </label>

              <label
                onClick={() => toggleCheck('contact')}
                className={`p-3.5 rounded-2xl border-2 flex items-start gap-3 cursor-pointer transition-all ${
                  clientChecks.contact
                    ? 'border-emerald-500 bg-emerald-50/50'
                    : 'border-stone-200 hover:border-orange-200 bg-stone-50/50'
                }`}
              >
                <input
                  type="checkbox"
                  checked={clientChecks.contact}
                  onChange={() => {}}
                  className="mt-0.5 rounded accent-emerald-600"
                />
                <div>
                  <strong className="block text-stone-900 font-bold">Contactgegevens & Openingstijden</strong>
                  <span className="text-stone-500 text-[11px]">
                    Je telefoonnummer, WhatsApp, e-mailadres en werkgebied/stad voor de lokale Google vindbaarheid.
                  </span>
                </div>
              </label>
            </div>
          </div>

          <div className="pt-6 mt-6 border-t border-stone-200 flex items-center justify-between">
            <span className="text-xs font-bold text-stone-500">
              Klaar om dit door te geven?
            </span>
            <button
              onClick={onOpenRequestModal}
              className="px-4 py-2.5 rounded-xl bg-orange-700 hover:bg-orange-800 text-white font-extrabold text-xs transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <span>Start Vrijblijvend</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Column 2: What Samen Online Arranges */}
        <div className="bg-stone-900 text-white rounded-3xl border-2 border-stone-800 p-6 sm:p-8 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-black border border-emerald-500/30">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-black text-lg text-white">2. Wat Wij Volledig Regelen</h3>
                  <span className="text-[11px] text-stone-400 font-medium">100% technische ontzorging</span>
                </div>
              </div>
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-500/30">
                Inbegrepen
              </span>
            </div>

            <p className="text-xs text-stone-300 mb-6 leading-relaxed">
              Jij hoeft geen regel code te schrijven of servers te configureren. Dit is allemaal standaard geregeld:
            </p>

            <ul className="space-y-3.5 text-xs">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-bold">.NL Domeinnaam & Snelle NVMe Webhosting</strong>
                  <span className="text-stone-400 text-[11px]">
                    Registratie van jouw domein en supersnelle Nederlandse SSD servers zonder trage databasevertraging.
                  </span>
                </div>
              </li>

              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-bold">Gratis A+ SSL Veiligheidscertificaat</strong>
                  <span className="text-stone-400 text-[11px]">
                    Het vertrouwde groene slotje in de browserbalk; essentieel voor Google ranking en AVG privacy.
                  </span>
                </div>
              </li>

              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-bold">Interactieve Formulieren & WhatsApp Chat</strong>
                  <span className="text-stone-400 text-[11px]">
                    Directe aanvragen in jouw e-mailbox zonder spambots, inclusief 1-klik WhatsApp contactknop.
                  </span>
                </div>
              </li>

              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-bold">Lokale Google SEO & Schema.org</strong>
                  <span className="text-stone-400 text-[11px]">
                    Gestructureerde bedrijfsgegevens (LocalBusiness, PostalAddress) voor maximale zichtbaarheid in jouw regio.
                  </span>
                </div>
              </li>

              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-bold">100% Jouw Eigendom (Geen Wurgcontract)</strong>
                  <span className="text-stone-400 text-[11px]">
                    De code en website zijn volledig van jou. Geen verplichte langdurige opzegtermijnen.
                  </span>
                </div>
              </li>
            </ul>
          </div>

          <div className="pt-6 mt-6 border-t border-stone-800 flex items-center justify-between">
            <span className="text-[11px] font-bold text-stone-400">
              ⚡ Oplevering gemiddeld binnen 3 tot 5 dagen
            </span>
            <button
              onClick={handlePrintGuide}
              className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-stone-200 border border-white/20 font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <FileDown className="w-3.5 h-3.5" />
              <span>Print / Download Aanlevergids</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
