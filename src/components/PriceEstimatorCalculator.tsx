'use client';

import React, { useState, useMemo, useEffect } from 'react';
import {
  Calculator,
  Check,
  ArrowRight,
  Sparkles,
  Clock,
  ShieldCheck,
  Globe,
  Download,
  CheckCircle2,
  AlertCircle,
  XCircle,
  Loader2,
} from 'lucide-react';
import { Language } from '../types/company';
import { QuotePdfModal, QuotePdfData } from './QuotePdfModal';

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

interface PageOption {
  id: '1' | '3' | '5' | '8+';
  labelNl: string;
  labelEn: string;
  descNl: string;
  price: number;
  extraDays: number;
}

const PAGE_OPTIONS: PageOption[] = [
  { id: '1', labelNl: '1 Pagina (One-Page)', labelEn: '1 Page (One-page)', descNl: 'Alles overzichtelijk op 1 strakke landingspagina', price: 0, extraDays: 0 },
  { id: '3', labelNl: '3 Pagina’s', labelEn: '3 Pages', descNl: 'Bijv. Home, Diensten en Contact', price: 35, extraDays: 1 },
  { id: '5', labelNl: '5 Pagina’s (Meest Gekozen)', labelEn: '5 Pages (Most Popular)', descNl: 'Home, Over Ons, Diensten, Portfolio, Contact', price: 65, extraDays: 1 },
  { id: '8+', labelNl: '8+ Pagina’s (Uitgebreid)', labelEn: '8+ Pages (Enterprise)', descNl: 'Veel diensten, teamleden, casestudies & formulieren', price: 125, extraDays: 3 },
];

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
    id: 'redesign',
    nameNl: 'Website Redesign (Bestaande Site)',
    nameEn: 'Website Redesign (Existing Site)',
    descNl: 'Huidige website ombouwen naar een razendsnelle, moderne Next.js website',
    descEn: 'Upgrade and modernize your current slow website with high speed and fresh UX',
    basePrice: 175,
    days: 4,
  },
  {
    id: 'custom-plan',
    nameNl: 'Eigen Ontwerp / Schets / Figma Plan',
    nameEn: 'Custom Build from Your Own Wireframe / Plan',
    descNl: 'Heb je al een eigen plan of lay-out? Wij bouwen het exact volgens jouw wensen',
    descEn: 'Already have a design plan or Figma file? We code it 1:1',
    basePrice: 245,
    days: 6,
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
  const [pageCount, setPageCount] = useState<'1' | '3' | '5' | '8+'>('5');
  const [selectedAddons, setSelectedAddons] = useState<string[]>(['seo', 'whatsapp']);
  const [hostingPlan, setHostingPlan] = useState<'managed' | 'self'>('managed');
  const [domainInput, setDomainInput] = useState<string>('');
  const [isQuotePdfOpen, setIsQuotePdfOpen] = useState<boolean>(false);

  const activeTypeObj = SITE_TYPES.find((t) => t.id === selectedType) || SITE_TYPES[1];
  const activePageOption = PAGE_OPTIONS.find((p) => p.id === pageCount) || PAGE_OPTIONS[2];
  const pagesPrice = activePageOption.price;

  const cleanDomain = useMemo(() => {
    let clean = domainInput.trim().toLowerCase();
    // remove protocol
    clean = clean.replace(/^https?:\/\//, '');
    clean = clean.replace(/^www\./, '');
    // remove .nl if user typed it
    clean = clean.replace(/\.nl$/, '');
    // replace spaces with hyphens
    clean = clean.replace(/\s+/g, '-');
    return clean;
  }, [domainInput]);

  const domainValidation = useMemo(() => {
    if (!cleanDomain) {
      return { status: 'empty', message: '' };
    }
    // SIDN standard rules: length 2-63, letters, digits, hyphen, not starting or ending with hyphen
    const validCharsRegex = /^[a-z0-9-]+$/;
    if (cleanDomain.length < 2) {
      return { status: 'invalid', message: 'Minimaal 2 tekens vereist' };
    }
    if (cleanDomain.length > 63) {
      return { status: 'invalid', message: 'Maximaal 63 tekens toegestaan' };
    }
    if (!validCharsRegex.test(cleanDomain)) {
      return { status: 'invalid', message: 'Alleen letters, cijfers en koppeltekens toegestaan' };
    }
    if (cleanDomain.startsWith('-') || cleanDomain.endsWith('-')) {
      return { status: 'invalid', message: 'Mag niet beginnen of eindigen met een koppelteken' };
    }
    return {
      status: 'valid',
      fullName: `${cleanDomain}.nl`,
      message: `${cleanDomain}.nl voldoet aan de SIDN-formaateisen.`,
    };
  }, [cleanDomain]);

  // Live DNS-over-HTTPS (DoH) Availability Lookup
  const [dnsState, setDnsState] = useState<{
    status: 'idle' | 'checking' | 'available' | 'taken' | 'error';
    domainName: string;
    message?: string;
  }>({ status: 'idle', domainName: '' });

  useEffect(() => {
    if (!cleanDomain || domainValidation.status === 'invalid') {
      setDnsState({ status: 'idle', domainName: '' });
      return;
    }

    setDnsState({ status: 'checking', domainName: `${cleanDomain}.nl` });

    const controller = new AbortController();
    const timer = setTimeout(async () => {
      try {
        const queryUrl = `https://dns.google/resolve?name=${encodeURIComponent(cleanDomain)}.nl&type=NS`;
        const res = await fetch(queryUrl, { signal: controller.signal });
        const data = await res.json();

        // Status 0 with Answer means registered nameservers exist (domain taken)
        if (data.Status === 0 && Array.isArray(data.Answer) && data.Answer.length > 0) {
          setDnsState({
            status: 'taken',
            domainName: `${cleanDomain}.nl`,
            message: `${cleanDomain}.nl is al geregistreerd & in gebruik door een andere partij.`,
          });
        } else if (data.Status === 3) {
          // Status 3 is NXDOMAIN (domain not found in root DNS)
          setDnsState({
            status: 'available',
            domainName: `${cleanDomain}.nl`,
            message: `${cleanDomain}.nl is beschikbaar voor registratie & inbegrepen bij All-in Webhosting!`,
          });
        } else if (data.Status === 0) {
          // Check A record fallback if NS records were cached without answer
          const resA = await fetch(
            `https://dns.google/resolve?name=${encodeURIComponent(cleanDomain)}.nl&type=A`,
            { signal: controller.signal }
          );
          const dataA = await resA.json();
          if (dataA.Status === 0 && Array.isArray(dataA.Answer) && dataA.Answer.length > 0) {
            setDnsState({
              status: 'taken',
              domainName: `${cleanDomain}.nl`,
              message: `${cleanDomain}.nl is al geregistreerd & in gebruik door een andere partij.`,
            });
          } else {
            setDnsState({
              status: 'available',
              domainName: `${cleanDomain}.nl`,
              message: `${cleanDomain}.nl is beschikbaar voor registratie & inbegrepen bij All-in Webhosting!`,
            });
          }
        } else {
          setDnsState({
            status: 'available',
            domainName: `${cleanDomain}.nl`,
            message: `${cleanDomain}.nl is beschikbaar voor registratie & inbegrepen bij All-in Webhosting!`,
          });
        }
      } catch (err: unknown) {
        if (err instanceof Error && err.name === 'AbortError') return;
        setDnsState({
          status: 'error',
          domainName: `${cleanDomain}.nl`,
          message: `Kon realtime DNS niet bereiken. Bij aanvraag verifiëren we dit direct voor je bij SIDN.`,
        });
      }
    }, 350);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [cleanDomain, domainValidation.status]);

  const toggleAddon = (id: string) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const addonsTotal = selectedAddons.reduce((sum, id) => {
    const addon = ADDONS.find((a) => a.id === id);
    return sum + (addon ? addon.price : 0);
  }, 0);

  const totalPrice = activeTypeObj.basePrice + pagesPrice + addonsTotal;
  const estimatedDays =
    activeTypeObj.days + activePageOption.extraDays + Math.floor(selectedAddons.length * 0.7);

  const quotePdfData: QuotePdfData = {
    templateOrProjectType: `${activeTypeObj.nameNl} (${activePageOption.labelNl})`,
    selectedModules: [
      `Aantal pagina's: ${activePageOption.labelNl}`,
      ...selectedAddons
        .map((id) => ADDONS.find((a) => a.id === id)?.nameNl)
        .filter(Boolean) as string[],
    ],
    hostingPlan,
    chosenDomain: cleanDomain
      ? `${cleanDomain}.nl${dnsState.status === 'taken' ? ' (Bestaand/Bezet)' : ''}`
      : undefined,
    basePrice: activeTypeObj.basePrice + pagesPrice,
    addonsPrice: addonsTotal,
    totalPrice,
    estimatedDays,
  };

  const handleApply = () => {
    const addonNames = selectedAddons
      .map((id) => ADDONS.find((a) => a.id === id)?.nameNl)
      .filter(Boolean)
      .join(', ');

    const hostingText =
      hostingPlan === 'managed'
        ? `Inclusief All-in Hosting, .nl domein (${cleanDomain ? cleanDomain + '.nl' : 'nog te bepalen'}) en zakelijke e-mail (+€9,50/mnd)`
        : 'Klant regelt zelf hosting (€0/mnd)';

    const domainStatusText = cleanDomain
      ? dnsState.status === 'taken'
        ? `${cleanDomain}.nl (Bestaand domein koppelen/verhuizen)`
        : dnsState.status === 'available'
        ? `${cleanDomain}.nl (Nieuw registreren)`
        : `${cleanDomain}.nl`
      : 'Nog niet ingevuld';

    onOpenRequestModal({
      templateName: `${activeTypeObj.nameNl} (${activePageOption.labelNl})`,
      budget: `Indicatie: €${totalPrice} eenmalig${hostingPlan === 'managed' ? ' + €9,50/mnd all-in hosting' : ''}`,
      notes: `Aanvraag via 60-seconden calculator: Type: ${activeTypeObj.nameNl}, Pagina's: ${activePageOption.labelNl}, Extra opties: ${addonNames || 'Geen'}, Gewenste domeinnaam: ${domainStatusText}, Hosting: ${hostingText}, Verwachte levertijd: ~${estimatedDays} dagen.`,
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

            {/* Step 2: Aantal Pagina's & Structuur */}
            <div>
              <label className="text-xs font-black uppercase text-stone-700 tracking-wider block mb-3">
                2. {lang === 'nl' ? 'Gewenst Aantal Pagina’s:' : 'Number of Pages:'}
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {PAGE_OPTIONS.map((opt) => {
                  const isSelected = pageCount === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setPageCount(opt.id)}
                      className={`p-3 rounded-2xl border-2 text-center transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'border-orange-500 bg-orange-50/70 shadow-xs'
                          : 'border-stone-200 hover:border-orange-300 bg-white'
                      }`}
                    >
                      <div>
                        <span className="font-black text-xs text-stone-900 block">
                          {opt.id === '1' ? '1 Pagina' : `${opt.id} Pagina's`}
                        </span>
                        <span className="text-[10px] text-stone-500 font-medium line-clamp-1 mt-0.5">
                          {opt.labelNl.replace(/^[0-9+]+ Pagina’s? ?/, '') || 'One-page'}
                        </span>
                      </div>
                      <span className="text-[11px] font-black text-orange-700 mt-2">
                        {opt.price === 0 ? 'Inbegrepen' : `+€${opt.price}`}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Extra Modules */}
            <div>
              <label className="text-xs font-black uppercase text-stone-700 tracking-wider block mb-3">
                3. {lang === 'nl' ? 'Optionele Extra Modules:' : 'Optional Extra Modules:'}
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

            {/* Step 4: Webhosting & Domeinnaam Keuze + Live .NL Domeinchecker */}
            <div>
              <label className="text-xs font-black uppercase text-stone-700 tracking-wider block mb-3">
                4. {lang === 'nl' ? 'Webhosting & .NL Domeinnaam:' : 'Hosting & .NL Domain Registration:'}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-3">
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

              {/* Live .NL Domein-beschikbaarheidschecker */}
              {hostingPlan === 'managed' ? (
                <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-stone-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <label htmlFor="domain-input" className="text-xs font-black text-emerald-950 flex items-center gap-1.5">
                      <Globe className="w-4 h-4 text-emerald-700" />
                      <span>{lang === 'nl' ? 'Live .NL Domeinchecker:' : 'Live .NL Domain Checker:'}</span>
                    </label>
                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100/90 px-2 py-0.5 rounded-md border border-emerald-300">
                      Inbegrepen in hosting
                    </span>
                  </div>

                  <div className="relative flex items-center">
                    <input
                      id="domain-input"
                      type="text"
                      value={domainInput}
                      onChange={(e) => setDomainInput(e.target.value)}
                      placeholder={lang === 'nl' ? 'jouw-bedrijfsnaam' : 'your-company-name'}
                      className="w-full pl-3.5 pr-14 py-2.5 rounded-xl border border-emerald-300 bg-white text-xs text-stone-900 placeholder:text-stone-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 font-semibold"
                    />
                    <span className="absolute right-3 text-xs font-black text-stone-400 pointer-events-none">
                      .nl
                    </span>
                  </div>

                  {domainValidation.status === 'invalid' && (
                    <div className="flex items-center gap-1.5 text-xs text-amber-900 font-bold bg-amber-50 p-2.5 rounded-xl border border-amber-300">
                      <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
                      <span>{domainValidation.message}</span>
                    </div>
                  )}

                  {domainValidation.status === 'valid' && dnsState.status === 'checking' && (
                    <div className="flex items-center gap-2 text-xs text-stone-700 font-bold bg-white/90 p-2.5 rounded-xl border border-emerald-300 animate-pulse">
                      <Loader2 className="w-4 h-4 text-orange-600 animate-spin shrink-0" />
                      <span>Live DNS controleren voor {cleanDomain}.nl...</span>
                    </div>
                  )}

                  {domainValidation.status === 'valid' && dnsState.status === 'taken' && (
                    <div className="p-3 rounded-xl bg-rose-50 border border-rose-300 text-xs text-rose-950 space-y-1">
                      <div className="flex items-center gap-1.5 font-black text-rose-800">
                        <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                        <span>{cleanDomain}.nl is al bezet / geregistreerd.</span>
                      </div>
                      <p className="text-[11px] text-rose-900 leading-relaxed font-medium">
                        💡 <strong>Is {cleanDomain}.nl al jouw eigendom?</strong> Geen probleem! We kunnen jouw bestaande domeinnaam kosteloos koppelen of verhuizen naar Samen Online.
                        Ben je geen eigenaar? Kies dan een alternatief (zoals <em>{cleanDomain}-online.nl</em> of <em>{cleanDomain}-bedrijf.nl</em>).
                      </p>
                    </div>
                  )}

                  {domainValidation.status === 'valid' && dnsState.status === 'available' && (
                    <div className="flex items-center gap-1.5 text-xs text-emerald-800 font-bold bg-emerald-100/80 p-2.5 rounded-xl border border-emerald-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                      <span>{cleanDomain}.nl is beschikbaar voor registratie & inbegrepen bij All-in Webhosting!</span>
                    </div>
                  )}

                  {domainValidation.status === 'valid' && dnsState.status === 'error' && (
                    <div className="flex items-center gap-1.5 text-xs text-stone-700 font-bold bg-stone-50 p-2.5 rounded-xl border border-stone-300">
                      <CheckCircle2 className="w-4 h-4 text-stone-600 shrink-0" />
                      <span>{cleanDomain}.nl is een geldig formaat. Bij aanvraag verifiëren we direct de registratiestatus bij SIDN.</span>
                    </div>
                  )}

                  {domainValidation.status === 'empty' && (
                    <p className="text-[11px] text-stone-500 font-medium">
                      {lang === 'nl'
                        ? 'Typ je gewenste domeinnaam (bijv. "bouwbedrijf-jansen") om direct live de beschikbaarheid te controleren via DNS.'
                        : 'Type your preferred domain name (e.g. "my-brand") to check live DNS availability.'}
                    </p>
                  )}
                </div>
              ) : (
                <div className="p-3 rounded-2xl bg-stone-100 border border-stone-200 text-[11px] text-stone-600 font-medium">
                  {lang === 'nl'
                    ? '💡 Wil je dat wij een .nl domeinnaam en supersnelle hosting voor je verzorgen? Schakel hierboven om naar All-in Hosting.'
                    : '💡 Need us to manage your domain & NVMe hosting? Switch to All-in Hosting above.'}
                </div>
              )}
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
                  <span>Aantal pagina&apos;s ({activePageOption.id}):</span>
                  <strong className="text-stone-900">
                    {pagesPrice === 0 ? 'Inbegrepen' : `+€${pagesPrice}`}
                  </strong>
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
                {hostingPlan === 'managed' && cleanDomain && (
                  <div className="flex justify-between text-xs font-semibold">
                    <span>Domeinnaam:</span>
                    <span className={dnsState.status === 'taken' ? 'text-rose-700 font-bold' : 'text-emerald-800 font-bold'}>
                      {cleanDomain}.nl {dnsState.status === 'taken' ? '(Bezet / Bestaand)' : dnsState.status === 'available' ? '(Vrij)' : ''}
                    </span>
                  </div>
                )}
                <div className="flex justify-between text-emerald-700 font-bold pt-1 border-t border-stone-200/60">
                  <span>Garantie & Eigendom:</span>
                  <span>100% Jouw Eigendom</span>
                </div>
              </div>
            </div>

            <div className="space-y-2.5">
              <button
                onClick={handleApply}
                className="w-full py-4 rounded-xl bg-orange-700 hover:bg-orange-800 text-white font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-orange-700/30 transition-all cursor-pointer"
              >
                <span>{lang === 'nl' ? 'Vraag Deze Configuratie Aan' : 'Request This Setup'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => setIsQuotePdfOpen(true)}
                className="w-full py-3 rounded-xl bg-white hover:bg-stone-100 text-stone-800 border-2 border-stone-300 font-extrabold text-xs flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer"
              >
                <Download className="w-4 h-4 text-orange-600" />
                <span>{lang === 'nl' ? 'Download Offerte als PDF (1-Klik)' : 'Download Quote as PDF'}</span>
              </button>

              <div className="flex items-center justify-center gap-3 text-[10px] font-bold text-stone-500 pt-1">
                <span>🛡️ Geen kleine lettertjes</span>
                <span>•</span>
                <span>⚡ Binnen 24u reactie</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Quote PDF Preview & Download Modal */}
      <QuotePdfModal
        isOpen={isQuotePdfOpen}
        onClose={() => setIsQuotePdfOpen(false)}
        lang={lang}
        quoteData={quotePdfData}
      />
    </section>
  );
};
