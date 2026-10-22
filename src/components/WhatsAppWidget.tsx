'use client';

import React, { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { Language } from '../types/company';

interface WhatsAppWidgetProps {
  lang: Language;
  phoneNumber?: string; // in international format without + or spaces
}

export const WhatsAppWidget: React.FC<WhatsAppWidgetProps> = ({
  lang,
  phoneNumber = '31612345678', // Default Dutch number or custom
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [customMsg, setCustomMsg] = useState('');

  const defaultMsgNl = 'Hallo Samen Online! Ik heb een vraag over het laten maken van een website.';
  const defaultMsgEn = 'Hello Samen Online! I have a question about getting a custom website made.';

  const handleOpenWhatsApp = (text?: string) => {
    const message = text || customMsg || (lang === 'nl' ? defaultMsgNl : defaultMsgEn);
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end print:hidden">
      {/* Popover Bubble */}
      {isOpen && (
        <div className="mb-3 w-80 bg-white rounded-3xl shadow-2xl border-2 border-emerald-100 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200 text-stone-900">
          {/* Header */}
          <div className="bg-emerald-600 p-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-black text-sm">
                  SO
                </div>
                <span className="w-3 h-3 rounded-full bg-emerald-400 border-2 border-white absolute bottom-0 right-0"></span>
              </div>
              <div>
                <h4 className="font-black text-sm leading-tight">Samen Online Support</h4>
                <span className="text-[11px] text-emerald-100 font-medium">Meestal binnen 30 min reactie</span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-full hover:bg-black/10 text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body */}
          <div className="p-4 bg-stone-50 space-y-3">
            <div className="bg-white p-3 rounded-2xl rounded-tl-none border border-stone-200 text-xs text-stone-700 leading-relaxed shadow-xs">
              👋 {lang === 'nl'
                ? 'Hoi! Heb je een vraag over een website, webshop of offerte? Stuur ons direct een berichtje via WhatsApp.'
                : 'Hi! Have a question about a website, shop, or quote? Send us a quick WhatsApp message.'}
            </div>

            {/* Quick replies */}
            <div className="space-y-1.5 pt-1">
              {[
                lang === 'nl' ? 'Wat kost een website laten maken?' : 'How much does a website cost?',
                lang === 'nl' ? 'Kan ik een eigen template kiezen?' : 'Can I pick a custom template?',
                lang === 'nl' ? 'Hoe snel kan mijn site live staan?' : 'How fast can my site go live?',
              ].map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleOpenWhatsApp(q)}
                  className="w-full text-left p-2 rounded-xl bg-white hover:bg-emerald-50 text-[11px] font-bold text-stone-700 hover:text-emerald-800 border border-stone-200 transition-colors cursor-pointer"
                >
                  💬 {q}
                </button>
              ))}
            </div>
          </div>

          {/* Footer Input */}
          <div className="p-3 bg-white border-t border-stone-200 flex gap-2">
            <input
              type="text"
              value={customMsg}
              onChange={(e) => setCustomMsg(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleOpenWhatsApp();
              }}
              placeholder={lang === 'nl' ? 'Typ een vraag...' : 'Type a question...'}
              className="flex-1 px-3 py-2 bg-stone-50 rounded-xl border border-stone-300 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <button
              onClick={() => handleOpenWhatsApp()}
              className="p-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer shadow-sm transition-all"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Floating Action Pill */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group flex items-center gap-2.5 px-4 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-xl shadow-emerald-600/30 hover:scale-105 active:scale-95 transition-all cursor-pointer"
        title="Direct WhatsApp contact"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
        </span>
        <MessageCircle className="w-5 h-5 fill-white text-emerald-600" />
        <span className="hidden sm:inline">WhatsApp Contact</span>
      </button>
    </div>
  );
};
