'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Heart, MapPin, ShieldCheck, Mail, Check, Copy, ArrowRight, Sparkles } from 'lucide-react';
import { CategoryType, Language } from '../types/company';
import { CITIES_DATA } from '../data/cities';

interface FooterProps {
  lang: Language;
  onSelectCategory: (category: CategoryType) => void;
  onOpenRequestModal: () => void;
  onOpenInfoModal: (title: string, content: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  lang,
  onSelectCategory,
  onOpenRequestModal,
  onOpenInfoModal,
}) => {
  const [isEmailRevealed, setIsEmailRevealed] = useState(false);
  const [isEmailCopied, setIsEmailCopied] = useState(false);

  // Deobfuscate email strictly on user interaction so scraping crawlers cannot extract it from static HTML
  const getProtectedEmail = () => {
    const user = ['s', 'a', 'm', 'e', 'n', '_', 'o', 'n', 'l', 'i', 'n', 'e'].join('');
    const host = ['o', 'u', 't', 'l', 'o', 'o', 'k', '.', 'c', 'o', 'm'].join('');
    return `${user}@${host}`;
  };

  const handleOpenMail = () => {
    const email = getProtectedEmail();
    window.location.href = `mailto:${email}`;
  };

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.stopPropagation();
    const email = getProtectedEmail();
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(email);
      setIsEmailCopied(true);
      setTimeout(() => setIsEmailCopied(false), 2000);
    }
  };

  const handleCategoryClick = (cat: CategoryType) => {
    onSelectCategory(cat);
    const element = document.getElementById('templates-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleAboutClick = () => {
    const element = document.getElementById('about-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleGuidelinesClick = () => {
    onOpenInfoModal(
      lang === 'nl' ? 'Richtlijnen & Transparantie' : 'Guidelines & Transparency',
      lang === 'nl'
        ? `Welkom bij Samen Online! Wij hanteren de volgende kwaliteitsnormen:\n\n1. Eerlijke Vermeldingen: Alle getoonde website concepten en sjablonen zijn geoptimaliseerd voor de Nederlandse markt (iDEAL, AVG/GDPR, PostNL).\n\n2. Geen Verborgen Kosten: Prijzen, oplevertijden en functionaliteiten zijn transparant.\n\n3. Hoge Kwaliteit: Wij bouwen uitsluitend met moderne technologieën zoals Next.js, React en Tailwind CSS voor maximale snelheid en vindbaarheid (SEO).\n\n4. Vriendelijke Service: Direct persoonlijk contact en ondersteuning in het Nederlands.\n\n5. Bedrijfsstatus & Facturatie: Samen Online is een startend freelance initiatief. Facturen worden netjes opgemaakt conform de Nederlandse fiscale richtlijnen (resultaat uit overige werkzaamheden / ROW), zonder btw-opslag.\n\n6. Webhosting & Domeinen: Optionele all-in webhosting op snelle Nederlandse NVMe SSD-servers met 99.9% uptime, gratis SSL en zakelijke e-mail. Klanten behouden altijd de vrije keuze om zelf hosting te regelen.\n\n7. Eerlijke Communicatie & Geen Valse Reviews: Wij hechten aan 100% transparantie. Alle getoonde sjablonen en review-elementen zijn interactieve demonstratiemodellen. Wij fabriceren nooit onechte klantbeoordelingen.`
        : `Welcome to Samen Online! Our guidelines:\n\n1. Fair Listings: All showcased website templates are designed for the Dutch web landscape.\n\n2. Zero Hidden Costs: Clear pricing and build timelines.\n\n3. Modern Tech: Fast Next.js performance and accessibility standards.\n\n4. Friendly Support: Direct communication and Dutch/English support.\n\n5. Legal & Billing: Operating as an independent freelance starter initiative under Dutch non-VAT regulations (ROW).\n\n6. Web Hosting & Domains: Optional all-in hosting on high-speed Dutch NVMe SSD servers with automated SSL and business email. Clients maintain the freedom to manage their own host.\n\n7. Integrity: All templates and review widgets are interactive design mockups. We never fabricate fake reviews.`
    );
  };

  const handlePrivacyClick = () => {
    onOpenInfoModal(
      lang === 'nl' ? 'Privacybeleid (AVG/GDPR)' : 'Privacy Policy',
      lang === 'nl'
        ? `Bij Samen Online hechten we veel waarde aan jouw privacy.\n\n• Wij verzamelen géén persoonlijke gegevens zonder jouw uitdrukkelijke toestemming.\n• Contactgegevens die je invult via ons aanvraagformulier worden uitsluitend gebruikt om jouw website-aanvraag te beantwoorden.\n• Wij verkopen of delen nooit gegevens met derden of advertentienetwerken.\n• Onze website voldoet 100% aan de Europese privacywetgeving (AVG/GDPR).\n\nVoor vragen over jouw gegevens kun je altijd contact opnemen via het aanvraagformulier.`
        : `At Samen Online, we respect your privacy.\n\n• We do not track personal information without consent.\n• Information entered in our forms is used solely to respond to your project inquiries.\n• 100% GDPR compliant with zero data selling.`
    );
  };

  const handleTermsClick = () => {
    onOpenInfoModal(
      lang === 'nl' ? 'Algemene Voorwaarden' : 'Terms of Service',
      lang === 'nl'
        ? `Algemene voorwaarden van Samen Online:\n\n1. Dienstverlening: Samen Online biedt kant-en-klare website concepten, advies en maatwerk webdesign voor ondernemers.\n\n2. Vrijblijvende Aanvragen: Het indienen van een offerte of aanvraag is altijd 100% gratis en vrijblijvend.\n\n3. Intellectueel Eigendom: Bij oplevering van een op maat gemaakt project wordt het eigendom van de opgeleverde website overgedragen aan de klant.\n\n4. Garantie & Tevredenheid: Wij werken totdat je tevreden bent met het eindresultaat.\n\n5. Fictieve Voorbeeldconcepten & Vrijwaring: Alle getoonde sjablonen, mockups, logo-voorbeelden en merknamen zijn uitsluitend fictieve voorbeeldconcepten ter demonstratie van lay-outs en webfunctionaliteiten.`
        : `Terms of service:\n\n1. Services: Samen Online provides custom website development and templates.\n\n2. Free Consultations: Inquiries and quotes are completely free of charge.\n\n3. IP & Ownership: Full ownership is transferred to the client upon project delivery.\n\n4. Demonstration Concepts: All showcased business names, logos, and mockups are fictional concepts used solely for design demonstration purposes.`
    );
  };

  const handleCookiesClick = () => {
    onOpenInfoModal(
      lang === 'nl' ? 'Cookiebeleid' : 'Cookie Policy',
      lang === 'nl'
        ? `Ons cookiebeleid is heel simpel en vriendelijk:\n\n• Wij gebruiken GEEN tracking cookies van derden of advertentie-volgsoftware.\n• Wij slaan alleen jouw lokale voorkeuren op (zoals opgeslagen favoriete concepten en taalinstelling) direct in je eigen browser.\n• Je hebt altijd volledige controle over je eigen browseropslag.`
        : `Simple and privacy-friendly cookie policy:\n\n• Zero third-party ad tracking cookies.\n• We only store local browser preferences like your bookmarks.`
    );
  };

  return (
    <footer className="relative bg-stone-950 dark:bg-[#070C18] text-stone-300 dark:text-slate-300 pt-16 pb-12 font-sans border-t border-stone-800 dark:border-slate-800/80 transition-colors overflow-hidden">
      {/* Background ambient glow */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-b from-orange-600/10 via-amber-600/5 to-transparent dark:from-blue-600/10 dark:via-cyan-600/5 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top glowing CTA banner */}
        <div className="relative -mt-4 mb-16 rounded-3xl p-8 sm:p-10 bg-gradient-to-r from-stone-900 via-stone-900 to-stone-900/95 dark:from-slate-900 dark:via-slate-900/90 dark:to-slate-950 border border-orange-500/30 dark:border-blue-500/30 shadow-2xl overflow-hidden">
          {/* Subtle gradient light streak */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 dark:bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

          <div className="relative flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center lg:text-left max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 dark:bg-blue-500/10 border border-orange-500/20 dark:border-blue-500/20 text-orange-400 dark:text-blue-300 text-xs font-black tracking-wide">
                <Sparkles className="w-3.5 h-3.5 text-orange-400" />
                <span>{lang === 'nl' ? 'Vrijblijvend Advies & Offerte' : 'Free Consultation & Quote'}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                {lang === 'nl'
                  ? 'Klaar voor een website die écht resultaat oplevert?'
                  : 'Ready for a website that actually drives revenue?'}
              </h3>
              <p className="text-stone-400 dark:text-slate-300 text-xs sm:text-sm font-medium">
                {lang === 'nl'
                  ? 'Kies een concept, upload je huisstijl of plan een korte sparringsessie. Binnen 24 uur een heldere reactie.'
                  : 'Select a concept, submit your branding or schedule a quick chat. Direct answer within 24 hours.'}
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById('templates-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-5 py-3 rounded-xl bg-stone-800 hover:bg-stone-700 text-white font-bold text-xs transition-colors border border-stone-700 cursor-pointer"
              >
                {lang === 'nl' ? 'Bekijk Concepten' : 'Browse Concepts'}
              </button>
              <button
                type="button"
                onClick={onOpenRequestModal}
                className="px-5 py-3 rounded-xl bg-orange-600 hover:bg-orange-500 dark:bg-blue-600 dark:hover:bg-blue-500 text-white font-black text-xs flex items-center gap-2 shadow-lg shadow-orange-600/30 dark:shadow-blue-600/30 transition-all cursor-pointer hover:scale-105"
              >
                <span>{lang === 'nl' ? 'Start Aanvraag Nu' : 'Start Project Now'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* 4-Column Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-14">
          {/* Col 1: Brand & Tagline */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-orange-600 dark:bg-blue-600 flex items-center justify-center text-white font-bold shadow-md shadow-orange-600/30 dark:shadow-blue-900/40">
                <Heart className="w-5 h-5 fill-white" />
              </div>
              <span className="font-extrabold text-xl text-white">
                Samen<span className="text-orange-500 dark:text-blue-400">Online</span>
              </span>
            </div>

            <p className="text-xs text-stone-400 dark:text-slate-300 max-w-md leading-relaxed font-normal">
              {lang === 'nl'
                ? 'Samen Online is dé betrouwbare gids voor Nederlandse mkb-ers, webshops en freelancers. Handgemaakte Next.js websites met 100/100 Core Web Vitals en 100% eigendom.'
                : 'Samen Online is the dedicated web craft studio for Dutch businesses, webshops, and independent professionals.'}
            </p>

            <div className="flex items-center gap-2 text-xs font-bold text-orange-400 dark:text-blue-400">
              <MapPin className="w-3.5 h-3.5" />
              <span>
                {lang === 'nl'
                  ? 'Gevestigd in Utrecht • Actief in heel Nederland'
                  : 'Based in Utrecht • Serving all of the Netherlands'}
              </span>
            </div>

            {/* Bot-Shielded Email Component (No plaintext email in static HTML) */}
            <div className="pt-2">
              {!isEmailRevealed ? (
                <button
                  type="button"
                  onClick={() => setIsEmailRevealed(true)}
                  className="inline-flex items-center gap-2 text-xs font-bold text-stone-200 dark:text-slate-200 hover:text-white bg-stone-900 hover:bg-stone-800 dark:bg-slate-900 dark:hover:bg-slate-800 px-3 py-2 rounded-xl border border-stone-800 dark:border-slate-800 transition-all cursor-pointer shadow-xs"
                  title={lang === 'nl' ? 'Klik om direct e-mailadres te tonen (beveiligd tegen bots)' : 'Click to reveal email (protected from bots)'}
                >
                  <ShieldCheck className="w-4 h-4 text-orange-400 dark:text-blue-400" />
                  <span>{lang === 'nl' ? 'Toon E-mailadres (Bot-beveiligd)' : 'Show Email (Anti-bot)'}</span>
                </button>
              ) : (
                <div className="inline-flex items-center gap-2 p-1.5 rounded-xl bg-stone-900 dark:bg-slate-900 border border-stone-800 dark:border-slate-800 text-xs">
                  <Mail className="w-4 h-4 text-orange-400 dark:text-blue-400 shrink-0 ml-1" />
                  <span className="font-mono font-bold text-white select-all">
                    {getProtectedEmail()}
                  </span>
                  <button
                    type="button"
                    onClick={handleOpenMail}
                    className="px-2.5 py-1 rounded-lg bg-orange-600 hover:bg-orange-500 dark:bg-blue-600 dark:hover:bg-blue-500 text-white font-bold text-[11px] cursor-pointer transition-colors"
                  >
                    {lang === 'nl' ? 'Stuur Mail' : 'Open Mail'}
                  </button>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="p-1 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 cursor-pointer transition-colors"
                    title={lang === 'nl' ? 'Kopieer e-mailadres' : 'Copy email'}
                  >
                    {isEmailCopied ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5 text-stone-400" />
                    )}
                  </button>
                </div>
              )}
            </div>

            <p className="text-[11px] text-stone-500 dark:text-slate-400 font-medium">
              {lang === 'nl'
                ? 'Onafhankelijk freelance initiatief • Facturatie conform ROW (vrijgesteld van btw)'
                : 'Independent freelance initiative • Operating under Dutch non-VAT regulations'}
            </p>
          </div>

          {/* Col 2: Categories */}
          <div>
            <p className="font-black text-white text-xs uppercase tracking-wider mb-4">
              {lang === 'nl' ? 'Branches & Concepten' : 'Branches & Concepts'}
            </p>
            <ul className="space-y-2.5 text-xs font-semibold">
              <li>
                <button
                  type="button"
                  onClick={() => handleCategoryClick('Tech & SaaS')}
                  className="hover:text-orange-400 dark:hover:text-blue-400 text-stone-400 dark:text-slate-300 transition-colors cursor-pointer text-left"
                >
                  Tech & SaaS Platforms
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleCategoryClick('Webshops & E-commerce')}
                  className="hover:text-orange-400 dark:hover:text-blue-400 text-stone-400 dark:text-slate-300 transition-colors cursor-pointer text-left"
                >
                  Webshops & E-commerce
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleCategoryClick('Sustainable & Green')}
                  className="hover:text-orange-400 dark:hover:text-blue-400 text-stone-400 dark:text-slate-300 transition-colors cursor-pointer text-left"
                >
                  Duurzaam & Energie
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleCategoryClick('Creative & Agencies')}
                  className="hover:text-orange-400 dark:hover:text-blue-400 text-stone-400 dark:text-slate-300 transition-colors cursor-pointer text-left"
                >
                  Creatief, Media & Bureaus
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleCategoryClick('Food & Hospitality')}
                  className="hover:text-orange-400 dark:hover:text-blue-400 text-stone-400 dark:text-slate-300 transition-colors cursor-pointer text-left"
                >
                  Horeca, Voeding & Gastvrijheid
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleCategoryClick('Local Services & Healthcare')}
                  className="hover:text-orange-400 dark:hover:text-blue-400 text-stone-400 dark:text-slate-300 transition-colors cursor-pointer text-left"
                >
                  Bouw, Zorg & Vakmensen
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Platform & Navigation */}
          <div>
            <p className="font-black text-white text-xs uppercase tracking-wider mb-4">
              {lang === 'nl' ? 'Samen Online' : 'Samen Online'}
            </p>
            <ul className="space-y-2.5 text-xs font-semibold">
              <li>
                <button
                  type="button"
                  onClick={handleAboutClick}
                  className="hover:text-orange-400 dark:hover:text-blue-400 text-stone-400 dark:text-slate-300 transition-colors cursor-pointer text-left"
                >
                  {lang === 'nl' ? 'Over Onze Werkwijze' : 'About Our Process'}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenRequestModal}
                  className="hover:text-orange-400 dark:hover:text-blue-400 text-stone-400 dark:text-slate-300 transition-colors cursor-pointer text-left"
                >
                  {lang === 'nl' ? 'Website Aanvragen' : 'Request Website'}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={handleGuidelinesClick}
                  className="hover:text-orange-400 dark:hover:text-blue-400 text-stone-400 dark:text-slate-300 transition-colors cursor-pointer text-left"
                >
                  {lang === 'nl' ? 'Richtlijnen & Kwaliteit' : 'Guidelines & Standards'}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenRequestModal}
                  className="hover:text-orange-400 dark:hover:text-blue-400 text-stone-400 dark:text-slate-300 transition-colors cursor-pointer text-left"
                >
                  {lang === 'nl' ? 'Direct Contact' : 'Direct Contact'}
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* SEO Internal Link Mesh: 12 Cities & Kennisbank */}
        <div className="pt-8 pb-8 border-t border-stone-800/80 dark:border-slate-800/80 grid grid-cols-1 md:grid-cols-2 gap-8 text-xs">
          <div>
            <p className="font-black text-white text-xs uppercase tracking-wider mb-3 flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-orange-500 dark:text-blue-400" />
              <span>Lokale Websites Laten Maken in Nederland</span>
            </p>
            <div className="flex flex-wrap gap-x-3 gap-y-1.5 text-stone-400 dark:text-slate-400 font-medium">
              {CITIES_DATA.map((city) => (
                <Link
                  key={city.id}
                  href={`/locaties/${city.id}`}
                  className="hover:text-orange-400 dark:hover:text-blue-400 transition-colors"
                >
                  Website {city.name}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p className="font-black text-white text-xs uppercase tracking-wider mb-3 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-orange-500 dark:text-blue-400" />
              <span>Kennisbank & Eerlijk Webdesign Advies</span>
            </p>
            <div className="flex flex-col gap-1.5 text-stone-400 dark:text-slate-400 font-medium">
              <Link href="/kennisbank" className="hover:text-orange-400 dark:hover:text-blue-400 transition-colors font-bold text-white">
                → Naar alle Kennisbank gidsen
              </Link>
              <Link href="/kennisbank/waarom-nextjs-sneller-is-dan-wordpress" className="hover:text-orange-400 dark:hover:text-blue-400 transition-colors">
                Waarom Next.js Sneller Is Dan WordPress (Met Benchmark)
              </Link>
              <Link href="/kennisbank/wat-kost-een-website-laten-maken-in-2026" className="hover:text-orange-400 dark:hover:text-blue-400 transition-colors">
                Wat Kost Een Website Laten Maken in 2026?
              </Link>
            </div>
          </div>
        </div>

        {/* Legal Transparency Disclaimer note */}
        <div className="pt-8 pb-4 text-center sm:text-left text-[11px] text-stone-500 dark:text-slate-400 font-medium border-t border-stone-800/80 dark:border-slate-800/80">
          <p>
            {lang === 'nl'
              ? 'Juridische mededeling: Alle op deze website getoonde bedrijfsnamen, sjablonen en review-elementen zijn fictieve voorbeeldconcepten ter demonstratie van webdesign en technische mogelijkheden. Samen Online levert unieke websites op maat gebaseerd op deze ontwerpen.'
              : 'Legal notice: All company names, templates, and review elements on this site are fictional showcase concepts for web design demonstration purposes. Samen Online builds custom websites based on these layouts.'}
          </p>
        </div>

        {/* Bottom copyright line */}
        <div className="pt-4 border-t border-stone-900 dark:border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold text-stone-400 dark:text-slate-400">
          <p>© {new Date().getFullYear()} Samen Online. {lang === 'nl' ? 'Alle rechten voorbehouden.' : 'All rights reserved.'}</p>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={handlePrivacyClick}
              className="hover:text-orange-400 dark:hover:text-blue-400 transition-colors cursor-pointer"
            >
              {lang === 'nl' ? 'Privacybeleid' : 'Privacy Policy'}
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={handleTermsClick}
              className="hover:text-orange-400 dark:hover:text-blue-400 transition-colors cursor-pointer"
            >
              {lang === 'nl' ? 'Voorwaarden' : 'Terms'}
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={handleCookiesClick}
              className="hover:text-orange-400 dark:hover:text-blue-400 transition-colors cursor-pointer"
            >
              Cookies
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
