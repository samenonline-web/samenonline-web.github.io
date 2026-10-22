'use client';

import React from 'react';
import { Heart, MapPin } from 'lucide-react';
import { CategoryType, Language } from '../types/company';

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
        ? `Welkom bij Samen Online! Wij hanteren de volgende kwaliteitsnormen:\n\n1. Eerlijke Vermeldingen: Alle getoonde website concepten en sjablonen zijn geoptimaliseerd voor de Nederlandse markt (iDEAL, AVG/GDPR, PostNL).\n\n2. Geen Verborgen Kosten: Prijzen, oplevertijden en functionaliteiten zijn transparant.\n\n3. Hoge Kwaliteit: Wij bouwen uitsluitend met moderne technologieën zoals Next.js, React en Tailwind CSS voor maximale snelheid en vindbaarheid (SEO).\n\n4. Vriendelijke Service: Direct persoonlijk contact en ondersteuning in het Nederlands.\n\n5. Bedrijfsstatus & Facturatie: Samen Online is een startend freelance initiatief. Facturen worden netjes opgemaakt conform de Nederlandse fiscale richtlijnen (resultaat uit overige werkzaamheden / ROW), zonder btw-opslag. Een officiële KvK-inschrijving volgt bij verdere doorgroei.\n\n6. Webhosting & Domeinen: Optionele all-in webhosting op snelle Nederlandse NVMe SSD-servers met 99.9% uptime, gratis SSL en zakelijke e-mail. Klanten behouden altijd de vrije keuze om zelf hosting te regelen.\n\n7. Eerlijke Communicatie & Geen Valse Reviews: Wij hechten aan 100% transparantie. Alle getoonde sjablonen en review-elementen zijn interactieve demonstratiemodellen. Wij fabriceren nooit onechte klantbeoordelingen.`
        : `Welcome to Samen Online! Our guidelines:\n\n1. Fair Listings: All showcased website templates are designed for the Dutch web landscape.\n\n2. Zero Hidden Costs: Clear pricing and build timelines.\n\n3. Modern Tech: Fast Next.js performance and accessibility standards.\n\n4. Friendly Support: Direct communication and Dutch/English support.\n\n5. Legal & Billing: Operating as an independent freelance starter initiative under Dutch non-VAT regulations (ROW). Official Chamber of Commerce (KvK) registration will follow upon expansion.\n\n6. Web Hosting & Domains: Optional all-in hosting on high-speed Dutch NVMe SSD servers with automated SSL and business email. Clients maintain the freedom to manage their own host.\n\n7. Integrity: All templates and review widgets are interactive design mockups. We never fabricate fake reviews.`
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
        ? `Algemene voorwaarden van Samen Online:\n\n1. Dienstverlening: Samen Online biedt kant-en-klare website concepten, advies en maatwerk webdesign voor ondernemers.\n\n2. Vrijblijvende Aanvragen: Het indienen van een offerte of aanvraag is altijd 100% gratis en vrijblijvend.\n\n3. Intellectueel Eigendom: Bij oplevering van een op maat gemaakt project wordt het eigendom van de opgeleverde website overgedragen aan de klant.\n\n4. Garantie & Tevredenheid: Wij werken totdat je tevreden bent met het eindresultaat.\n\n5. Fictieve Voorbeeldconcepten & Vrijwaring: Alle getoonde sjablonen, mockups, logo-voorbeelden en merknamen (waaronder 'BouwMeester Aannemer', 'De Vries Boekhouding', 'Studio Puur', 'Bistro De Gracht', etc.) zijn uitsluitend fictieve voorbeeldconcepten ter demonstratie van lay-outs en webfunctionaliteiten. Eventuele gelijkenissen met bestaande handelsnamen berusten op louter toeval.`
        : `Terms of service:\n\n1. Services: Samen Online provides custom website development and templates.\n\n2. Free Consultations: Inquiries and quotes are completely free of charge.\n\n3. IP & Ownership: Full ownership is transferred to the client upon project delivery.\n\n4. Demonstration Concepts: All showcased business names, logos, and mockups are fictional concepts used solely for design demonstration purposes. Any resemblance to real entities is entirely coincidental.`
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
    <footer className="bg-white text-stone-600 py-14 border-t-2 border-orange-100 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Col 1: Brand & Tagline */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-orange-600 flex items-center justify-center text-white font-bold shadow-md shadow-orange-600/20">
                <Heart className="w-5 h-5 fill-white" />
              </div>
              <span className="font-extrabold text-xl text-stone-900">
                Samen<span className="text-orange-600">Online</span> 🇳🇱
              </span>
            </div>

            <p className="text-xs text-stone-600 max-w-md leading-relaxed font-medium">
              {lang === 'nl'
                ? 'Samen Online is dé vriendelijke gids voor Nederlandse bedrijven, webwinkels en digitale initiatieven. Ontworpen met oog voor gemeenschap, toegankelijkheid en vakmanschap.'
                : 'Samen Online is the friendly directory for companies, webshops, and digital initiatives based in & for the Netherlands.'}
            </p>

            <div className="flex items-center gap-2 text-xs font-bold text-orange-600">
              <MapPin className="w-3.5 h-3.5" />
              <span>Gemaakt met ❤️ in Nederland</span>
            </div>

            <p className="text-[11px] text-stone-500 font-medium">
              {lang === 'nl'
                ? 'Onafhankelijk freelance initiatief • Facturatie conform ROW (vrijgesteld van btw)'
                : 'Independent freelance initiative • Operating under Dutch non-VAT regulations'}
            </p>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="font-bold text-stone-900 text-xs uppercase tracking-wider mb-4">
              {lang === 'nl' ? 'Categorieën' : 'Categories'}
            </h4>
            <ul className="space-y-2.5 text-xs font-bold">
              <li>
                <button
                  onClick={() => handleCategoryClick('Tech & SaaS')}
                  className="hover:text-orange-600 text-stone-600 transition-colors cursor-pointer text-left"
                >
                  Tech & SaaS Platforms
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick('Webshops & E-commerce')}
                  className="hover:text-orange-600 text-stone-600 transition-colors cursor-pointer text-left"
                >
                  Webshops & E-commerce
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick('Sustainable & Green')}
                  className="hover:text-orange-600 text-stone-600 transition-colors cursor-pointer text-left"
                >
                  Duurzaam & Groen
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick('Creative & Agencies')}
                  className="hover:text-orange-600 text-stone-600 transition-colors cursor-pointer text-left"
                >
                  Creatief & Bureaus
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick('Food & Hospitality')}
                  className="hover:text-orange-600 text-stone-600 transition-colors cursor-pointer text-left"
                >
                  Voeding & Horeca
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Community & Support */}
          <div>
            <h4 className="font-bold text-stone-900 text-xs uppercase tracking-wider mb-4">
              {lang === 'nl' ? 'Platform' : 'Platform'}
            </h4>
            <ul className="space-y-2.5 text-xs font-bold">
              <li>
                <button
                  onClick={handleAboutClick}
                  className="hover:text-orange-600 text-stone-600 transition-colors cursor-pointer text-left"
                >
                  {lang === 'nl' ? 'Over Samen Online' : 'About Samen Online'}
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenRequestModal}
                  className="hover:text-orange-600 text-stone-600 transition-colors cursor-pointer text-left"
                >
                  {lang === 'nl' ? 'Website Aanvragen' : 'Request Website'}
                </button>
              </li>
              <li>
                <button
                  onClick={handleGuidelinesClick}
                  className="hover:text-orange-600 text-stone-600 transition-colors cursor-pointer text-left"
                >
                  {lang === 'nl' ? 'Richtlijnen & Transparantie' : 'Guidelines & Transparency'}
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenRequestModal}
                  className="hover:text-orange-600 text-stone-600 transition-colors cursor-pointer text-left"
                >
                  {lang === 'nl' ? 'Contact & Vragen' : 'Contact & Questions'}
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Legal Transparency Disclaimer note */}
        <div className="pt-8 pb-4 text-center sm:text-left text-[11px] text-stone-600 font-medium border-t border-orange-100">
          <p>
            {lang === 'nl'
              ? 'Juridische mededeling: Alle op deze website getoonde bedrijfsnamen, sjablonen en review-elementen zijn fictieve voorbeeldconcepten ter demonstratie van webdesign en technische mogelijkheden. Samen Online levert unieke websites op maat gebaseerd op deze ontwerpen.'
              : 'Legal notice: All company names, templates, and review elements on this site are fictional showcase concepts for web design demonstration purposes. Samen Online builds custom websites based on these layouts.'}
          </p>
        </div>

        {/* Bottom copyright line */}
        <div className="pt-4 border-t border-orange-100/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold text-stone-500">
          <p>© {new Date().getFullYear()} Samen Online. {lang === 'nl' ? 'Alle rechten voorbehouden.' : 'All rights reserved.'}</p>
          <div className="flex items-center gap-4">
            <button
              onClick={handlePrivacyClick}
              className="hover:text-orange-600 transition-colors cursor-pointer"
            >
              {lang === 'nl' ? 'Privacybeleid' : 'Privacy Policy'}
            </button>
            <span>•</span>
            <button
              onClick={handleTermsClick}
              className="hover:text-orange-600 transition-colors cursor-pointer"
            >
              {lang === 'nl' ? 'Voorwaarden' : 'Terms'}
            </button>
            <span>•</span>
            <button
              onClick={handleCookiesClick}
              className="hover:text-orange-600 transition-colors cursor-pointer"
            >
              Cookies
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
