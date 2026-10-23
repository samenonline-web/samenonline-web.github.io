'use client';

import React, { useState, useMemo } from 'react';
import { 
  Bot, 
  Sparkles, 
  X, 
  Send, 
  ArrowRight, 
  MessageCircle, 
  CheckCircle2, 
  Zap, 
  Clock, 
  Euro,
  HelpCircle
} from 'lucide-react';

interface WebsiteCopilotWidgetProps {
  onOpenRequestModal?: (data: {
    templateName: string;
    budget: string;
    notes: string;
  }) => void;
}

interface QuickChip {
  id: string;
  label: string;
  query: string;
}

interface CopilotAnswer {
  title: string;
  badge: string;
  price: string;
  days: string;
  description: string;
  recommendedTemplate: string;
  whatsappPrefill: string;
}

const QUICK_CHIPS: QuickChip[] = [
  { id: '1', label: '🔨 Ik ben schilder / aannemer', query: 'aannemer schilder bouw' },
  { id: '2', label: '⚡ Met spoed nodig (3 dagen)', query: 'spoed snel 72 uur' },
  { id: '3', label: '🛍️ Hoe werkt de iDEAL koppeling?', query: 'ideal webshop betaling' },
  { id: '4', label: '🔄 Trage WordPress ombouwen', query: 'wordpress ombouwen redesign' },
  { id: '5', label: '🔑 Hoe zit het met eigendom?', query: 'eigendom licentie contract' },
];

export default function WebsiteCopilotWidget({ onOpenRequestModal }: WebsiteCopilotWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputQuery, setInputQuery] = useState('');
  const [activeAnswer, setActiveAnswer] = useState<CopilotAnswer | null>(null);

  const resolveAnswer = (query: string): CopilotAnswer => {
    const q = query.toLowerCase();

    if (q.includes('aannemer') || q.includes('schilder') || q.includes('bouw') || q.includes('klus')) {
      return {
        title: 'Bouw & Klusbedrijf Website Pakket',
        badge: 'Meest Gekozen voor Bouw & MKB',
        price: 'Vanaf €195 eenmalig (all-in)',
        days: '4-5 werkdagen',
        description: 'Inclusief offerte-calculator, voor-en-na projectengalerij, Google Maps koppeling en WhatsApp direct-contact knop.',
        recommendedTemplate: 'BouwMeester Aannemer (met m² calculator)',
        whatsappPrefill: 'Hoi Kenan, ik heb een bouw-/schildersbedrijf en zag via de Copilot het €195 pakket. Kun je mij vertellen hoe snel we kunnen starten?',
      };
    }

    if (q.includes('spoed') || q.includes('snel') || q.includes('72') || q.includes('dagen')) {
      return {
        title: '72-Uur Express Spoedlevering',
        badge: 'Gegarandeerd binnen 3 dagen',
        price: 'Vanaf €125 (Starter One-Page)',
        days: '3 werkdagen (gegarandeerd)',
        description: 'Heb je haast voor een beurs, lancering of nieuwe klus? Wij bouwen direct een strakke, werkende responsive landingspagina.',
        recommendedTemplate: '72-Uur Express Starter Template',
        whatsappPrefill: 'Hoi Kenan, ik heb met spoed binnen 3 dagen een werkende website nodig. Heb je momenteel ruimte voor een spoedopdracht?',
      };
    }

    if (q.includes('ideal') || q.includes('webshop') || q.includes('winkel') || q.includes('betaal')) {
      return {
        title: 'E-Commerce & iDEAL 2.0 Webshop',
        badge: 'iDEAL, Bancontact & Klarna',
        price: 'Vanaf €385 eenmalig',
        days: '6-8 werkdagen',
        description: 'Complete webshop met realtime winkelmand, voorraadbeheer, automatische factuurmails en 0.4s laadtijd op smartphones.',
        recommendedTemplate: 'Duurzaam Kleding & Lifestyle Shop',
        whatsappPrefill: 'Hoi Kenan, ik wil een webshop starten met iDEAL en Mollie koppeling. Hoe werkt de betalingsintegratie bij jullie?',
      };
    }

    if (q.includes('wordpress') || q.includes('redesign') || q.includes('ombouwen') || q.includes('wix') || q.includes('traag')) {
      return {
        title: 'Website Redesign & Sloopregeling',
        badge: 'Tot €75 inruilkorting',
        price: 'Vanaf €175 eenmalig',
        days: '4 werkdagen',
        description: 'Wij zetten je trage WordPress of Wix site 1-op-1 om naar supersnelle Next.js code. Geen plugin-updates meer en 100% Google Lighthouse score.',
        recommendedTemplate: 'Modern Next.js Redesign',
        whatsappPrefill: 'Hoi Kenan, mijn huidige website is erg traag. Ik wil graag weten wat een Next.js redesign kost en hoe lang het duurt.',
      };
    }

    if (q.includes('eigendom') || q.includes('contract') || q.includes('wurg') || q.includes('licentie') || q.includes('hosting')) {
      return {
        title: '100% Volledig Eigendom Zonder Lock-in',
        badge: 'Nul Wurgcontracten',
        price: 'Geen maandelijkse verplichting',
        days: 'Directe overdracht bij oplevering',
        description: 'Bij Samen Online is de website 100% jouw eigendom. Wij dragen alle broncode en DNS over. Wil je dat wij de hosting regelen? Dat kan voor slechts €9,50/mnd all-in, maandelijks opzegbaar.',
        recommendedTemplate: 'Alle 40+ Concepten',
        whatsappPrefill: 'Hoi Kenan, ik wil graag weten hoe de overdracht van broncode en hosting precies werkt na oplevering.',
      };
    }

    // Default Fallback
    return {
      title: 'MKB Website op Maat',
      badge: 'Transparant & All-in',
      price: '€195 - €385 (meest gekozen)',
      days: '3-5 werkdagen',
      description: 'Op basis van jouw vraag adviseren we een moderne Next.js website met supersnelle laadtijd, WhatsApp integratie en 100% Google SEO.',
      recommendedTemplate: 'MKB Bedrijfsconcept',
      whatsappPrefill: `Hoi Kenan, ik had de volgende vraag op de website: "${query}". Kun je hier kort over meedenken?`,
    };
  };

  const handleAsk = (text: string) => {
    if (!text.trim()) return;
    const answer = resolveAnswer(text);
    setActiveAnswer(answer);
    setInputQuery('');
  };

  const handleWhatsAppClick = (prefill: string) => {
    const encoded = encodeURIComponent(prefill);
    window.open(`https://wa.me/31636481054?text=${encoded}`, '_blank');
  };

  return (
    <>
      {/* Floating Trigger Bubble (Bottom-Left to not collide with WhatsApp widget on right) */}
      {!isOpen && (
        <div className="fixed bottom-20 left-4 sm:left-6 z-40 animate-in fade-in slide-in-from-bottom duration-300">
          <button
            onClick={() => setIsOpen(true)}
            className="group flex items-center gap-2.5 bg-slate-900 hover:bg-slate-800 text-white p-3 sm:px-4 sm:py-3 rounded-full border border-slate-700 shadow-2xl transition-all duration-200 active:scale-95 cursor-pointer hover:shadow-orange-500/20"
          >
            <div className="relative">
              <Bot className="w-5 h-5 text-orange-400 group-hover:rotate-12 transition-transform" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full animate-ping" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full" />
            </div>

            <div className="text-left hidden sm:block">
              <span className="text-xs font-bold block leading-tight">Website Copilot</span>
              <span className="text-[10px] text-slate-400 font-medium">Direct antwoord op maat</span>
            </div>
          </button>
        </div>
      )}

      {/* Expanded Copilot Card */}
      {isOpen && (
        <div className="fixed bottom-6 left-4 sm:left-6 z-50 w-[calc(100vw-2rem)] sm:w-96 max-h-[85vh] bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200 text-slate-900 dark:text-white">
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-slate-900 to-slate-800 text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-orange-500 text-slate-950 flex items-center justify-center font-black">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold flex items-center gap-1.5">
                  <span>Website Keuzehulp Copilot</span>
                  <span className="text-[9px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.2 rounded-full font-bold">
                    0.01s antwoord
                  </span>
                </h4>
                <p className="text-[10px] text-slate-300">Geen trage AI bot, maar directe heldere tarieven</p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-full hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Chat Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[55vh]">
            {!activeAnswer ? (
              <div className="space-y-3">
                <div className="p-3.5 rounded-2xl bg-orange-50 dark:bg-slate-800/60 border border-orange-100 dark:border-slate-700/60 text-xs text-slate-700 dark:text-slate-300 space-y-1.5">
                  <p className="font-bold text-orange-950 dark:text-orange-400 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    Waar kan ik je direct mee helpen?
                  </p>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400">
                    Kies een veelgestelde vraag of typ je eigen branche:
                  </p>
                </div>

                {/* Quick Chips */}
                <div className="space-y-1.5">
                  {QUICK_CHIPS.map((chip) => (
                    <button
                      key={chip.id}
                      onClick={() => handleAsk(chip.query)}
                      className="w-full text-left p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-orange-500 hover:bg-orange-50/50 dark:hover:bg-orange-950/20 text-xs font-semibold text-slate-700 dark:text-slate-300 transition-all flex items-center justify-between cursor-pointer group"
                    >
                      <span>{chip.label}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-orange-500 group-hover:translate-x-0.5 transition-all" />
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-3.5 animate-in fade-in duration-200">
                {/* Result Card */}
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700/80 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-orange-600 dark:text-orange-400 bg-orange-100 dark:bg-orange-950/80 px-2 py-0.5 rounded-full">
                      {activeAnswer.badge}
                    </span>
                    <button
                      onClick={() => setActiveAnswer(null)}
                      className="text-[10px] text-slate-400 hover:text-slate-600 dark:hover:text-white underline cursor-pointer"
                    >
                      Andere vraag
                    </button>
                  </div>

                  <h5 className="font-bold text-sm text-slate-900 dark:text-white">
                    {activeAnswer.title}
                  </h5>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                    {activeAnswer.description}
                  </p>

                  <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-200 dark:border-slate-700/60 text-xs">
                    <div className="p-2 rounded-lg bg-white dark:bg-slate-900">
                      <span className="text-[10px] text-slate-400 block">Indicatie:</span>
                      <strong className="text-emerald-600 dark:text-emerald-400 font-black">
                        {activeAnswer.price}
                      </strong>
                    </div>
                    <div className="p-2 rounded-lg bg-white dark:bg-slate-900">
                      <span className="text-[10px] text-slate-400 block">Levertijd:</span>
                      <strong className="text-slate-900 dark:text-white font-bold">
                        {activeAnswer.days}
                      </strong>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-2">
                  <button
                    onClick={() => handleWhatsAppClick(activeAnswer.whatsappPrefill)}
                    className="w-full py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-emerald-600/20 transition-all cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4 fill-white" />
                    <span>Bespreken via WhatsApp met Kenan</span>
                  </button>

                  {onOpenRequestModal && (
                    <button
                      onClick={() => {
                        onOpenRequestModal({
                          templateName: activeAnswer.title,
                          budget: activeAnswer.price,
                          notes: `Aanvraag via Website Copilot. Geadviseerd pakket: ${activeAnswer.title} (${activeAnswer.price}, levertijd ${activeAnswer.days}).`,
                        });
                        setIsOpen(false);
                      }}
                      className="w-full py-2 px-3 rounded-xl bg-slate-900 hover:bg-black dark:bg-slate-800 dark:hover:bg-slate-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <span>Offerte Aanvragen</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Input Bar */}
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-800">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAsk(inputQuery);
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                placeholder="Typ bijv: 'kapper', 'prijs', 'spoed'..."
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                className="flex-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <button
                type="submit"
                disabled={!inputQuery.trim()}
                className="p-2 rounded-xl bg-orange-600 hover:bg-orange-700 disabled:opacity-40 text-white transition-colors cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
