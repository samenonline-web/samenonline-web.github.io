'use client';

import React, { useState, useMemo } from 'react';
import { ChevronDown, HelpCircle, Sparkles, MessageCircleQuestion, Search, Tag } from 'lucide-react';
import { Language } from '../types/company';

interface FaqSectionProps {
  lang: Language;
  onOpenContactModal?: () => void;
}

export type FaqCategory = 'all' | 'pricing' | 'hosting' | 'process' | 'redesign';

interface FaqItem {
  id: string;
  category: 'pricing' | 'hosting' | 'process' | 'redesign';
  qNl: string;
  qEn: string;
  aNl: string;
  aEn: string;
}

const FAQS: FaqItem[] = [
  {
    id: 'f1',
    category: 'pricing',
    qNl: 'Wat kost het laten maken van een professionele website bij Samen Online?',
    qEn: 'What does it cost to have a professional website built with Samen Online?',
    aNl: 'Onze startersetups beginnen al vanaf €75 voor een snelle oplevering van een one-page concept. Voor een complete MKB bedrijfswebsite hanteren we een vast, transparant tarief van €195 eenmalig. Een complete webshop met iDEAL en Mollie kost €385 eenmalig. Nooit verborgen kosten, geen nacalculatie en geen verplichte abonnementen.',
    aEn: 'Our starter setups start from just €75 for a fast deployment of a one-page concept. Complete corporate websites are a fixed one-time fee of €195. A full e-commerce shop with iDEAL is €385. No hidden fees or recurring lock-in traps.',
  },
  {
    id: 'f2',
    category: 'process',
    qNl: 'Hoe snel staat mijn nieuwe website live op internet?',
    qEn: 'How fast will my new website be live on the internet?',
    aNl: 'Dankzij onze geteste Nederlandse branche-templates kunnen we razendsnel schakelen. Een standaard oplevering duurt doorgaans slechts 2 tot 5 werkdagen nadat je jouw teksten, voorkeuren of eventuele eigen foto’s hebt doorgegeven. Heb je haast voor een beurs of lancering? Spoedopleveringen zijn mogelijk binnen 48 uur.',
    aEn: 'Thanks to our pre-built Dutch industry templates, we move exceptionally fast. Standard turnarounds are usually within 2 to 5 business days after receiving your copy, preferences, or photos. Rush deliveries within 48 hours are possible.',
  },
  {
    id: 'f3',
    category: 'process',
    qNl: 'Wordt mijn website optimaal vindbaar in Google (SEO)?',
    qEn: 'Will my website rank well in Google search (SEO)?',
    aNl: 'Ja! Elk template is vanaf de grond opgebouwd volgens de strengste Google Core Web Vitals standaarden. We implementeren semantische HTML5, supersnelle laadtijden (<0.8 sec op 4G/5G), OpenGraph share cards voor sociale media en officiële Schema.org / JSON-LD structured data voor Google Local Business en Google Maps.',
    aEn: 'Yes! Every template is engineered from scratch following strict Google Core Web Vitals standards. We implement semantic HTML5, lightning-fast load speeds (<0.8s on mobile), OpenGraph social preview cards, and official Schema.org / JSON-LD local business structured data.',
  },
  {
    id: 'f4',
    category: 'pricing',
    qNl: 'Kan ik later functies toevoegen, zoals iDEAL-betalingen of een afspraakplanner?',
    qEn: 'Can I add features later, such as iDEAL payments or an appointment scheduler?',
    aNl: 'Absoluut. Al onze websites zijn 100% modulair ontworpen. Je kunt eenvoudig starten met een strakke landingspagina of visitekaartje en later op elk moment een volwaardige iDEAL-webshop, allergenenfilter, online offertecalculator of afspraakplanner toevoegen.',
    aEn: 'Absolutely. All our websites are 100% modular. You can start with a clean landing page and activate an iDEAL webshop, allergen filter, instant quote calculator, or appointment booking engine whenever your business grows.',
  },
  {
    id: 'f5',
    category: 'hosting',
    qNl: 'Zit een domeinnaam, webhosting en zakelijke e-mail hierbij inbegrepen?',
    qEn: 'Are domain registration, web hosting, and business email included?',
    aNl: 'Ja, dat kan! Wij bieden een compleet All-in Webhostingpakket aan voor slechts €9,50 per maand. Wij regelen dan jouw eigen .nl domeinnaam, razendsnelle Nederlandse NVMe SSD webhosting, gratis SSL-beveiliging (het groene slotje) én een zakelijk e-mailadres (zoals info@jouwbedrijf.nl). Wil je liever zelf je hosting beheren bij een eigen provider? Dat kan uiteraard ook voor €0/mnd.',
    aEn: 'Yes! We offer a complete All-in Web Hosting package for just €9.50 per month. We take care of your custom .nl domain, high-speed Dutch NVMe SSD hosting, automated SSL encryption, and your business email inbox (e.g. info@yourcompany.nl). Prefer managing your own host? That is also fully supported with zero recurring hosting costs.',
  },
  {
    id: 'f6',
    category: 'process',
    qNl: 'Wat moet ik zelf aanleveren om van start te gaan?',
    qEn: 'What do I need to provide to get started?',
    aNl: 'Heel eenvoudig: je levert je eigen bedrijfslogo aan (indien je die al hebt) en eventuele eigen teksten of foto’s. Heb je nog geen logo, dan maken we kosteloos een strak typografisch woordmerk. Ook kunnen we de website voorzien van professionele brancheteksten en rechtenvrije HD-fotografie.',
    aEn: 'Very simple: you provide your own company logo (if you have one) and any copy or photos. We can also render your brand in a sleek typographic logo and supply royalty-free HD imagery.',
  },
  {
    id: 'f7',
    category: 'pricing',
    qNl: 'Kan ik als bedrijf een factuur ontvangen en hoe zit het met KvK en btw?',
    qEn: 'Can I receive an invoice for my accounting, and what about KvK / VAT?',
    aNl: 'Jazeker! Je ontvangt voor elk project een nette factuur / specificatie die je direct kunt opvoeren als zakelijke kosten in je boekhouding. Doordat wij momenteel als freelance startend portfolio conform ROW/KOR opereren, rekenen we 0% btw, waardoor je profiteert van extra scherpe all-in prijzen!',
    aEn: 'Yes absolutely! You will receive a clean invoice for every delivered project for your accounting. Operating under Dutch freelance guidelines with 0% VAT markup gives you transparent, competitive pricing.',
  },
  {
    id: 'f8',
    category: 'redesign',
    qNl: 'Kan ik ook bij jullie terecht voor een website redesign of als ik al een eigen plan heb?',
    qEn: 'Can I also request a website redesign or if I already have my own design plan?',
    aNl: 'Zeker weten! Je hoeft niet per se een van onze voorbeeldtemplates te kiezen. Heb je al een bestaande website die traag of verouderd is? Wij bouwen hem om naar een moderne, supersnelle Next.js website met behoud van je teksten en Google-posities. Heb je al een eigen lay-out, wireframe, schets of Figma-bestand? Dan bouwen we jouw website exact 1-op-1.',
    aEn: 'Absolutely! You do not have to pick one of our showcase templates. We can modernize existing slow websites into Next.js or code your own custom wireframe / Figma file 1:1.',
  },
];

export const FaqSection: React.FC<FaqSectionProps> = ({ lang, onOpenContactModal }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [selectedCategory, setSelectedCategory] = useState<FaqCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const toggleAccordion = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  const handleCtaClick = () => {
    if (onOpenContactModal) {
      onOpenContactModal();
    } else {
      const el = document.getElementById('prijs-calculator') || document.getElementById('templates-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const filteredFaqs = useMemo(() => {
    return FAQS.filter((faq) => {
      // Category filter
      if (selectedCategory !== 'all' && faq.category !== selectedCategory) {
        return false;
      }
      // Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const question = (faq.qNl + ' ' + faq.qEn).toLowerCase();
        const answer = (faq.aNl + ' ' + faq.aEn).toLowerCase();
        return question.includes(q) || answer.includes(q);
      }
      return true;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <section className="my-16 scroll-mt-24" id="veelgestelde-vragen">
      <div className="bg-white rounded-3xl border-2 border-stone-200/80 p-6 sm:p-10 shadow-sm overflow-hidden">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 text-orange-800 text-xs font-bold mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>{lang === 'nl' ? 'Duidelijkheid & Zekerheid' : 'Clarity & Peace of Mind'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight mb-3">
            {lang === 'nl'
              ? 'Veelgestelde Vragen over een Website Laten Maken'
              : 'Frequently Asked Questions about Website Creation'}
          </h2>
          <p className="text-sm text-stone-600 font-medium leading-relaxed">
            {lang === 'nl'
              ? 'Alles wat je als Nederlandse ondernemer wilt weten over oplevertijd, kosten, hosting en Google vindbaarheid.'
              : 'Everything you need to know about turnaround times, investments, hosting, and Google search ranking.'}
          </p>
        </div>

        {/* Live Search & Category Tabs */}
        <div className="max-w-4xl mx-auto mb-8 space-y-4">
          
          {/* Search Input */}
          <div className="relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-4 top-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={lang === 'nl' ? 'Typ een vraag of zoekwoord (bijv. "hosting", "kosten", "redesign")...' : 'Search questions...'}
              className="w-full pl-11 pr-4 py-3 rounded-2xl border border-stone-300 bg-stone-50/50 text-xs sm:text-sm text-stone-900 placeholder:text-stone-400 focus:outline-hidden focus:ring-2 focus:ring-orange-500 font-medium"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-3 text-xs text-stone-400 hover:text-stone-600 font-bold"
              >
                ✕ Wis
              </button>
            )}
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2 text-xs font-bold">
            {[
              { id: 'all', labelNl: 'Alle Vragen', labelEn: 'All Questions' },
              { id: 'pricing', labelNl: '💰 Tarieven & Betaling', labelEn: 'Pricing & Payment' },
              { id: 'hosting', labelNl: '🌐 Hosting & .NL Domein', labelEn: 'Hosting & Domains' },
              { id: 'process', labelNl: '⚡ Werkwijze & Oplevering', labelEn: 'Process & Launch' },
              { id: 'redesign', labelNl: '🔄 Redesign & Eigen Plan', labelEn: 'Redesign & Custom' },
            ].map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id as any)}
                className={`px-3.5 py-1.5 rounded-xl border transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-orange-600 text-white border-orange-600 shadow-xs'
                    : 'bg-stone-50 hover:bg-stone-100 text-stone-700 border-stone-200'
                }`}
              >
                {lang === 'nl' ? cat.labelNl : cat.labelEn}
              </button>
            ))}
          </div>

        </div>

        {/* Accordion List */}
        <div className="space-y-3.5 max-w-4xl mx-auto">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, index) => {
              const isOpen = openIndex === index;
              const question = lang === 'nl' ? faq.qNl : faq.qEn;
              const answer = lang === 'nl' ? faq.aNl : faq.aEn;

              return (
                <div
                  key={faq.id}
                  className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                    isOpen
                      ? 'border-orange-300 bg-orange-50/30 shadow-xs'
                      : 'border-stone-200/90 bg-stone-50/50 hover:bg-stone-100/60'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleAccordion(index)}
                    className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 cursor-pointer focus:outline-hidden"
                    aria-expanded={isOpen}
                  >
                    <span className="font-extrabold text-sm sm:text-base text-stone-900 flex items-center gap-2.5">
                      <span className="w-6 h-6 rounded-lg bg-orange-500/10 text-orange-600 flex items-center justify-center text-xs font-black shrink-0">
                        {index + 1}
                      </span>
                      <span>{question}</span>
                    </span>
                    <div
                      className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-200 ${
                        isOpen ? 'bg-orange-600 text-white rotate-180' : 'bg-stone-200 text-stone-600'
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-stone-700 leading-relaxed font-normal border-t border-orange-100/60 animate-in fade-in duration-200">
                      <p className="pl-8.5">{answer}</p>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="text-center py-10 p-6 rounded-2xl bg-stone-50 border border-stone-200 text-xs text-stone-500 space-y-2">
              <p className="font-bold text-stone-700">Geen specifieke vraag gevonden voor &ldquo;{searchQuery}&rdquo;</p>
              <p>Stel je vraag gerust direct aan ons via het contactformulier of WhatsApp.</p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="text-orange-600 font-bold underline cursor-pointer"
              >
                Filters wissen
              </button>
            </div>
          )}
        </div>

        {/* Bottom Callout */}
        <div className="mt-10 p-5 rounded-2xl bg-amber-50/70 border border-amber-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-500 text-white flex items-center justify-center shrink-0">
              <MessageCircleQuestion className="w-5 h-5" />
            </div>
            <div>
              <div className="font-extrabold text-xs sm:text-sm text-stone-900">
                {lang === 'nl' ? 'Heb je een specifieke vraag over jouw project?' : 'Have a custom question about your project?'}
              </div>
              <div className="text-xs text-stone-600 font-medium">
                {lang === 'nl'
                  ? 'Vraag vrijblijvend advies aan of laat een bericht achter via ons formulier.'
                  : 'Request an obligation-free consultation or leave a message through our form.'}
              </div>
            </div>
          </div>
          <button
            onClick={handleCtaClick}
            className="px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold transition-all shadow-xs shrink-0 inline-flex items-center gap-1.5 cursor-pointer"
          >
            <span>{lang === 'nl' ? 'Stel je vraag direct' : 'Ask a question'}</span>
          </button>
        </div>
      </div>
    </section>
  );
};
