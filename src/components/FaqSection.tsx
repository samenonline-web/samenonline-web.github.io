'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Sparkles, MessageCircleQuestion } from 'lucide-react';
import { Language } from '../types/company';

interface FaqSectionProps {
  lang: Language;
}

interface FaqItem {
  qNl: string;
  qEn: string;
  aNl: string;
  aEn: string;
}

const FAQS: FaqItem[] = [
  {
    qNl: 'Wat kost het laten maken van een professionele website bij Samen Online?',
    qEn: 'What does it cost to have a professional website built with Samen Online?',
    aNl: 'Onze startersetups beginnen al vanaf €50 voor een snelle oplevering van een werkend concept. Voor een compleet gepersonaliseerde bedrijfswebsite hanteren we vaste, transparante all-in tarieven tussen €350 en €1.250 afhankelijk van modules zoals iDEAL, offertetools of reserveringssystemen. Nooit verborgen kosten of wurgcontracten.',
    aEn: 'Our starter setups start from just €50 for a fast deployment of a working concept. For fully custom business websites we provide fixed, transparent all-in packages between €350 and €1,250 depending on modules such as iDEAL, quote calculators, or reservation engines. No hidden fees or recurring lock-in traps.',
  },
  {
    qNl: 'Hoe snel staat mijn nieuwe website live op internet?',
    qEn: 'How fast will my new website be live on the internet?',
    aNl: 'Dankzij onze geteste Nederlandse branche-templates kunnen we razendsnel schakelen. Een standaard oplevering duurt doorgaans slechts 2 tot 5 werkdagen nadat je jouw teksten, voorkeuren of eventuele eigen foto’s hebt doorgegeven. Heb je haast voor een beurs of lancering? Spoedopleveringen zijn mogelijk binnen 48 uur.',
    aEn: 'Thanks to our pre-built Dutch industry templates, we move exceptionally fast. Standard turnarounds are usually within 2 to 5 business days after receiving your copy, preferences, or photos. Need urgent launch for an exhibition? Rush deliveries within 48 hours are possible.',
  },
  {
    qNl: 'Wordt mijn website optimaal vindbaar in Google (SEO)?',
    qEn: 'Will my website rank well in Google search (SEO)?',
    aNl: 'Ja! Elk template is vanaf de grond opgebouwd volgens de strengste Google Core Web Vitals standaarden. We implementeren semantische HTML5, supersnelle laadtijden (<0.8 sec op 4G/5G), OpenGraph share cards voor sociale media en officiële Schema.org / JSON-LD structured data voor Google Local Business en Google Maps.',
    aEn: 'Yes! Every template is engineered from scratch following strict Google Core Web Vitals standards. We implement semantic HTML5, lightning-fast load speeds (<0.8s on mobile), OpenGraph social preview cards, and official Schema.org / JSON-LD local business structured data.',
  },
  {
    qNl: 'Kan ik later functies toevoegen, zoals iDEAL-betalingen of een afspraakplanner?',
    qEn: 'Can I add features later, such as iDEAL payments or an appointment scheduler?',
    aNl: 'Absoluut. Al onze websites zijn 100% modulair ontworpen. Je kunt eenvoudig starten met een strakke landingspagina of visitekaartje en later op elk moment een volwaardige iDEAL-webshop, allergenenfilter, online offertecalculator of kappersafspraakplanner toevoegen.',
    aEn: 'Absolutely. All our websites are 100% modular. You can start with a clean landing page and activate an iDEAL webshop, allergen filter, instant quote calculator, or salon appointment booking engine whenever your business grows.',
  },
  {
    qNl: 'Hoe werkt het met domeinnaam en webhosting?',
    qEn: 'How does it work with domain registration and web hosting?',
    aNl: 'Bij Samen Online blijf je altijd 100% eigenaar van je eigen domeinnaam en website. Je registreert je domeinnaam en hosting eenvoudig op je eigen naam bij een betrouwbare registrar (zoals Vimexx, TransIP of Hostnet, of gratis via platforms zoals GitHub Pages/Vercel). Wij bouwen de complete website en kunnen assisteren bij het koppelen aan jouw domein. Zo zit je nooit vast aan dure servercontracten of wurgcontracten!',
    aEn: 'With Samen Online, you always maintain 100% ownership of your website and domain. You easily register your own domain and hosting in your own name with a trusted provider (such as Vimexx, TransIP, or free platforms like GitHub Pages/Vercel). We build the complete website and assist in connecting it to your domain. This ensures you are never locked into expensive recurring server traps!',
  },
  {
    qNl: 'Wat moet ik zelf aanleveren om van start te gaan?',
    qEn: 'What do I need to provide to get started?',
    aNl: 'Heel eenvoudig: je levert je eigen bedrijfslogo aan (indien je die al hebt) en eventuele eigen teksten of foto’s. Wij ontwerpen geen losse logo’s; heb je nog geen logo, dan presenteren we jouw bedrijfsnaam in een superstrak, stijlvol typografisch woordmerk in het gekozen lettertype. Ook vullen we de website desgewenst met professionele brancheteksten en rechtenvrije HD-fotografie.',
    aEn: 'Very simple: you provide your own company logo (if you have one) and any copy or photos. We do not design standalone company logos; if you do not have a logo yet, we render your business name in a sleek, stylish typographic wordmark in your chosen font. We also provide industry copy and royalty-free HD imagery.',
  },
];

export const FaqSection: React.FC<FaqSectionProps> = ({ lang }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="my-16 scroll-mt-24" id="veelgestelde-vragen">
      <div className="bg-white rounded-3xl border-2 border-stone-200/80 p-6 sm:p-10 shadow-sm overflow-hidden">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
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
              ? 'Alles wat je als Nederlandse ondernemer wilt weten over oplevertijd, kosten, iDEAL-koppelingen en Google vindbaarheid.'
              : 'Everything you need to know about turnaround times, investments, iDEAL payment flows, and Google search ranking.'}
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3.5 max-w-4xl mx-auto">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            const question = lang === 'nl' ? faq.qNl : faq.qEn;
            const answer = lang === 'nl' ? faq.aNl : faq.aEn;

            return (
              <div
                key={index}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'border-orange-300 bg-orange-50/30 shadow-xs'
                    : 'border-stone-200/90 bg-stone-50/50 hover:bg-stone-100/60'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(index)}
                  className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
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
          })}
        </div>

        {/* Bottom Callout */}
        <div className="mt-10 p-5 rounded-2xl bg-amber-50/70 border border-amber-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-500 text-white flex items-center justify-center shrink-0">
              <MessageCircleQuestion className="w-5 h-5" />
            </div>
            <div>
              <div className="font-extrabold text-xs sm:text-sm text-stone-900">
                {lang === 'nl' ? 'Heb je een specifieke vraag over jouw branche?' : 'Have a custom question about your trade?'}
              </div>
              <div className="text-xs text-stone-600 font-medium">
                {lang === 'nl'
                  ? 'Stel hem direct via WhatsApp of vraag vrijblijvend advies aan.'
                  : 'Ask directly through WhatsApp or request an obligation-free quote.'}
              </div>
            </div>
          </div>
          <a
            href="https://wa.me/31612345678?text=Hallo%20Samen%20Online,%20ik%20heb%20een%20vraag%20over%20een%20website%20voor%20mijn%20bedrijf!"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-sm shrink-0 inline-flex items-center gap-1.5"
          >
            <span>{lang === 'nl' ? 'Stel vraag op WhatsApp' : 'Ask on WhatsApp'}</span>
          </a>
        </div>
      </div>
    </section>
  );
};
