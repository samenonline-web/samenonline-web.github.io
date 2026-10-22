'use client';

import React, { useState } from 'react';
import { Calculator, Check, ArrowRight, Sparkles, Clock, ShieldCheck } from 'lucide-react';
import { Language } from '../types/company';

interface PriceEstimatorCalculatorProps {
  lang: Language;
  onOpenRequestModal: (customData?: { templateName: string; budget: string; notes: string }) => void;
}

interface SiteType {
  id: string;
  nameNl: string;
  nameEn: string;
  descNl: string;
  descEn: string;
  basePrice: number;
  days: number;
}

const SITE_TYPES: SiteType[] = [
  {
    id: 'starter',
    nameNl: 'ZZP / Starter One-Page',
    nameEn: 'Freelance Starter One-Page',
    descNl: 'Compact, snel online en perfect vindbaar voor zelfstandigen',
    descEn: 'Compact, fast and well-indexed for freelancers',
    basePrice: 75,
    days: 3,
  },
  {
    id: 'business',
    nameNl: 'Complete Bedrijfswebsite MKB',
    nameEn: 'Complete Corporate MKB Website',
    descNl: 'Meerdere pagina’s, dienstenoverzicht, contactformulieren & reviews',
    descEn: 'Multi-page, services showcase, contact forms & reviews',
    basePrice: 195,
    days: 5,
  },
  {
    id: 'ecommerce',
    nameNl: 'Webshop met iDEAL & Klarna',
    nameEn: 'E-commerce Shop with iDEAL',
    descNl: 'Productencatalogus, winkelmand, PostNL verzending & betaalsysteem',
    descEn: 'Product catalog, shopping cart, shipping & payment engine',
    basePrice: 385,
    days: 8,
  },
  {
    id: 'custom',
    nameNl: 'Maatwerk Platform & SaaS',
    nameEn: 'Custom Platform & SaaS Configurator',
    descNl: 'Productconfigurators, API-koppelingen, gebruikersportalen',
    descEn: 'Custom configurators, API integrations, client portals',
    basePrice: 650,
    days: 14,
  },
];

const ADDONS = [
  { id: 'seo', nameNl: 'Lokale Google SEO & PageSpeed 95+', price: 45, icon: '🔍' },
  { id: 'booking', nameNl: 'Online Afsprakensysteem / Reserveringen', price: 65, icon: '📅' },
  { id: 'contact', nameNl: 'Interactief Contact- & Offerteformulier', price: 35, icon: '📝' },
  { id: 'whatsapp', nameNl: 'Directe WhatsApp Chat Integratie', price: 35, icon: '💬' },
];

export const PriceEstimatorCalculator: React.FC<PriceEstimatorCalculatorProps> = ({
  lang,
  onOpenRequestModal,
}) => {
  const [selectedType, setSelectedType] = useState<string>('business');
  const [selectedAddons, setSelectedAddons] = useState<string[]>(['seo', 'whatsapp']);
  const [hostingPlan, setHostingPlan] = useState<'managed' | 'self'>('managed');

  const activeTypeObj = SITE_TYPES.find((t) => t.id === selectedType) || SITE_TYPES[1];

  const toggleAddon = (id: string) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const addonsTotal = selectedAddons.reduce((sum, id) => {
    const addon = ADDONS.find((a) => a.id === id);
    return sum + (addon ? addon.price : 0);
  }, 0);

  const totalPrice = activeTypeObj.basePrice + addonsTotal;
  const estimatedDays = activeTypeObj.days + Math.floor(selectedAddons.length * 0.7);

  const handleApply = () => {
    const addonNames = selectedAddons
      .map((id) => ADDONS.find((a) => a.id === id)?.nameNl)
      .filter(Boolean)
      .join(', ');

    const hostingText =
      hostingPlan === 'managed'
        ? 'Inclusief All-in Hosting, .nl domein en zakelijke e-mail (+€9,50/mnd)'
        : 'Klant regelt zelf hosting (€0/mnd)';

    onOpenRequestModal({
      templateName: activeTypeObj.nameNl,
      budget: `Indicatie: €${totalPrice} eenmalig${hostingPlan === 'managed' ? ' + €9,50/mnd all-in hosting' : ''}`,
      notes: `Aanvraag via 60-seconden calculator: Type: ${activeTypeObj.nameNl}, Extra opties: ${addonNames || 'Geen'}, Hosting: ${hostingText}, Verwachte levertijd: ~${estimatedDays} dagen.`,
    });
  };

  return (
    <section id="prijs-calculator" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 my-14 scroll-mt-24">
      <div className="bg-white rounded-3xl border-2 border-orange-200/90 shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-600 to-amber-600 p-6 sm:p-8 text-white text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/20 text-orange-100 text-xs font-bold mb-3">
            <Calculator className="w-4 h-4" />
            <span>{lang === 'nl' ? '60-Seconden Tarieven Berekenaar' : '60-Second Cost Estimator'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
            {lang === 'nl' ? 'Bereken Jouw Investering Zonder Verrassingen' : 'Calculate Your Investment Transparently'}
          </h2>
          <p className="text-xs sm:text-sm text-orange-100 max-w-xl mx-auto mt-2 font-medium">
            {lang === 'nl'
              ? 'Selecteer je type website en gewenste modules voor een eerlijke, transparante prijsindicatie.'
              : 'Select your website type and modules for an honest, upfront price estimation.'}
          </p>
        </div>

        {/* Calculator Body */}
        <div className="p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Options */}
          <div className="lg:col-span-7 space-y-6">
            {/* Step 1: Website Type */}
            <div>
              <label className="text-xs font-black uppercase text-stone-700 tracking-wider block mb-3">
                1. {lang === 'nl' ? 'Kies Type Website:' : 'Choose Website Type:'}
              </label>
              <div className="space-y-2.5">
                {SITE_TYPES.map((type) => {
                  const isSelected = selectedType === type.id;
                  return (
                    <button
                      key={type.id}
                      onClick={() => setSelectedType(type.id)}
                      className={`w-full p-4 rounded-2xl border-2 text-left transition-all cursor-pointer flex items-center justify-between ${
                        isSelected
                          ? 'border-orange-500 bg-orange-50/50 shadow-xs'
                          : 'border-stone-200 hover:border-orange-300 bg-white'
                      }`}
                    >
                      <div>
                        <span className="font-black text-sm text-stone-900 block">
                          {lang === 'nl' ? type.nameNl : type.nameEn}
                        </span>
                        <span className="text-xs text-stone-500 font-medium">
                          {lang === 'nl' ? type.descNl : type.descEn}
                        </span>
                      </div>
                      <span className="font-black text-sm text-orange-700 shrink-0 ml-3">
                        vanaf €{type.basePrice}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Extra Modules */}
            <div>
              <label className="text-xs font-black uppercase text-stone-700 tracking-wider block mb-3">
                2. {lang === 'nl' ? 'Optionele Extra Modules:' : 'Optional Extra Modules:'}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {ADDONS.map((addon) => {
                  const active = selectedAddons.includes(addon.id);
                  return (
                    <button
                      key={addon.id}
                      onClick={() => toggleAddon(addon.id)}
                      className={`p-3 rounded-2xl border-2 text-left transition-all cursor-pointer flex items-center justify-between text-xs ${
                        active
                          ? 'border-orange-500 bg-orange-50/50 shadow-2xs'
                          : 'border-stone-200 hover:border-orange-200 bg-white'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{addon.icon}</span>
                        <span className="font-bold text-stone-800">{addon.nameNl}</span>
                      </div>
                      <span className="font-black text-stone-700 shrink-0 ml-2">+€{addon.price}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Webhosting & Domeinnaam Keuze */}
            <div>
              <label className="text-xs font-black uppercase text-stone-700 tracking-wider block mb-3">
                3. {lang === 'nl' ? 'Webhosting & Domeinnaam:' : 'Hosting & Domain Registration:'}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => setHostingPlan('managed')}
                  className={`p-3.5 rounded-2xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between ${
                    hostingPlan === 'managed'
                      ? 'border-emerald-600 bg-emerald-50/60 shadow-2xs ring-1 ring-emerald-500/30'
                      : 'border-stone-200 hover:border-emerald-300 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-black text-xs text-emerald-950 flex items-center gap-1">
                      <span>🚀 All-in Hosting & .NL Domein</span>
                    </span>
                    <span className="text-xs font-black text-emerald-700">+€9,50 /mnd</span>
                  </div>
                  <p className="text-[11px] text-emerald-800 leading-relaxed font-medium">
                    {lang === 'nl'
                      ? 'Inclusief .nl domein, supersnelle NVMe SSD hosting, gratis SSL en zakelijke e-mail (info@jouwbedrijf.nl).'
                      : 'Includes .nl domain, NVMe SSD hosting, free SSL, and business email.'}
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setHostingPlan('self')}
                  className={`p-3.5 rounded-2xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between ${
                    hostingPlan === 'self'
                      ? 'border-orange-500 bg-orange-50/50 shadow-2xs ring-1 ring-orange-500/30'
                      : 'border-stone-200 hover:border-orange-200 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-black text-xs text-stone-900">
                      {lang === 'nl' ? 'Zelf hosting regelen' : 'Arrange own hosting'}
                    </span>
                    <span className="text-xs font-black text-stone-500">€0 /mnd</span>
                  </div>
                  <p className="text-[11px] text-stone-500 leading-relaxed font-medium">
                    {lang === 'nl'
                      ? 'Je regelt zelf je hosting en domeinnaam bij een eigen registrar. Wij leveren de site netjes op.'
                      : 'You register your own hosting and domain. We provide complete setup delivery.'}
                  </p>
                </button>
              </div>
            </div>
          </div>

          {/* Right: Realtime Summary Card */}
          <div className="lg:col-span-5 bg-stone-50 p-6 sm:p-8 rounded-3xl border-2 border-stone-200 flex flex-col justify-between">
            <div>
              <span className="text-[11px] font-black uppercase tracking-wider text-orange-700 bg-orange-100 px-3 py-1 rounded-full inline-block mb-4">
                {lang === 'nl' ? 'Jouw Indicatieve Prijs' : 'Your Estimated Price'}
              </span>

              <div className="text-4xl sm:text-5xl font-black text-stone-900 tracking-tight mb-1">
                €{totalPrice}
                <span className="text-xs font-bold text-stone-400"> (eenmalig)</span>
              </div>

              {hostingPlan === 'managed' ? (
                <div className="text-sm font-extrabold text-emerald-700 mt-1 flex items-center gap-2">
                  <span>+ €9,50 per maand</span>
                  <span className="text-[10px] text-emerald-800 font-bold bg-emerald-100 border border-emerald-300 px-2 py-0.5 rounded-full">
                    All-in ontzorgd
                  </span>
                </div>
              ) : (
                <div className="text-xs font-bold text-stone-500 mt-1">
                  Geen maandelijkse hostingkosten via ons
                </div>
              )}

              <div className="flex items-center gap-2 text-xs font-bold text-stone-600 mt-4 mb-6">
                <Clock className="w-4 h-4 text-orange-600" />
                <span>Geschatte levertijd: ~{estimatedDays} werkdagen</span>
              </div>

              <div className="space-y-2 text-xs font-medium text-stone-600 border-t border-stone-200 pt-4 mb-6">
                <div className="flex justify-between">
                  <span>Basis website:</span>
                  <strong className="text-stone-900">€{activeTypeObj.basePrice}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Geselecteerde extra&apos;s ({selectedAddons.length}):</span>
                  <strong className="text-stone-900">+€{addonsTotal}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Webhosting & .nl domein:</span>
                  <strong className={hostingPlan === 'managed' ? 'text-emerald-700' : 'text-stone-700'}>
                    {hostingPlan === 'managed' ? '€9,50 /mnd' : 'Zelf regelen (€0)'}
                  </strong>
                </div>
                <div className="flex justify-between text-emerald-700 font-bold pt-1 border-t border-stone-200/60">
                  <span>Garantie & Eigendom:</span>
                  <span>100% Jouw Eigendom</span>
                </div>
              </div>
            </div>

            <div className="space-y-2.5">
              <button
                onClick={handleApply}
                className="w-full py-4 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-orange-600/30 transition-all cursor-pointer"
              >
                <span>{lang === 'nl' ? 'Vraag Deze Configuratie Aan' : 'Request This Setup'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-3 text-[10px] font-bold text-stone-500 pt-2">
                <span>🛡️ Geen kleine lettertjes</span>
                <span>•</span>
                <span>⚡ Binnen 24u reactie</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
