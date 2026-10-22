'use client';

import React, { useState } from 'react';
import { X, CheckCircle2, QrCode, ShieldCheck, ArrowRight, Loader2, Building2 } from 'lucide-react';

interface IdealSimulatorModalProps {
  isOpen: boolean;
  amount: number;
  shopName: string;
  onClose: () => void;
  onSuccess?: () => void;
}

const DUTCH_BANKS = [
  { id: 'ing', name: 'ING Bank', color: '#ff6200', logo: '🦁' },
  { id: 'rabo', name: 'Rabobank', color: '#0000a0', logo: '🔵' },
  { id: 'abn', name: 'ABN AMRO', color: '#008578', logo: '🟢' },
  { id: 'sns', name: 'SNS Bank', color: '#5b2b82', logo: '🟣' },
  { id: 'asn', name: 'ASN Bank', color: '#c9142e', logo: '🌳' },
  { id: 'regio', name: 'RegioBank', color: '#e30613', logo: '🏘️' },
  { id: 'knab', name: 'Knab', color: '#ed1c24', logo: '🟡' },
  { id: 'revolut', name: 'Revolut', color: '#0075eb', logo: '⚡' },
];

export const IdealSimulatorModal: React.FC<IdealSimulatorModalProps> = ({
  isOpen,
  amount,
  shopName,
  onClose,
  onSuccess,
}) => {
  const [selectedBank, setSelectedBank] = useState<string | null>(null);
  const [step, setStep] = useState<'bank' | 'authenticating' | 'success'>('bank');

  if (!isOpen) return null;

  const handleSelectBank = (bankId: string) => {
    setSelectedBank(bankId);
    setStep('authenticating');
    setTimeout(() => {
      setStep('success');
      if (onSuccess) onSuccess();
    }, 2200);
  };

  const activeBankObj = DUTCH_BANKS.find((b) => b.id === selectedBank) || DUTCH_BANKS[0];

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200 cursor-pointer"
    >
      <div
        className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden border border-stone-200 flex flex-col cursor-default animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="bg-stone-900 p-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-pink-600 text-white font-black flex items-center justify-center text-xs shadow-xs">
              iDEAL
            </div>
            <div>
              <h3 className="font-black text-sm">iDEAL Betaalsimulator</h3>
              <span className="text-[10px] text-stone-400 font-medium">Veilig betalen via jouw eigen bank</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-stone-800 text-stone-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Amount Bar */}
        <div className="bg-stone-100 px-6 py-3 border-b border-stone-200 flex items-center justify-between text-xs">
          <div>
            <span className="text-stone-500 font-medium block">Ontvanger:</span>
            <strong className="text-stone-900">{shopName}</strong>
          </div>
          <div className="text-right">
            <span className="text-stone-500 font-medium block">Totaalbedrag:</span>
            <strong className="text-base font-black text-stone-900">€{amount.toFixed(2)}</strong>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6">
          {step === 'bank' && (
            <div className="space-y-4">
              <span className="text-xs font-bold text-stone-700 block">Kies jouw bank:</span>
              <div className="grid grid-cols-2 gap-2.5">
                {DUTCH_BANKS.map((bank) => (
                  <button
                    key={bank.id}
                    onClick={() => handleSelectBank(bank.id)}
                    className="p-3 rounded-2xl border border-stone-200 hover:border-pink-500 hover:bg-pink-50/30 flex items-center gap-2.5 text-xs font-bold text-stone-800 transition-all text-left cursor-pointer group"
                  >
                    <span className="text-lg group-hover:scale-110 transition-transform">{bank.logo}</span>
                    <span className="truncate">{bank.name}</span>
                  </button>
                ))}
              </div>

              <div className="flex items-center justify-center gap-2 text-[10px] font-bold text-stone-400 pt-3 border-t border-stone-100">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Simulatie van iDEAL 2.0 / Mollie & Stripe API</span>
              </div>
            </div>
          )}

          {step === 'authenticating' && (
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-pink-50 text-pink-600 flex items-center justify-center mx-auto animate-pulse">
                <Loader2 className="w-8 h-8 animate-spin" />
              </div>
              <h4 className="font-black text-base text-stone-900">Verbinden met {activeBankObj.name}...</h4>
              <p className="text-xs text-stone-500 max-w-xs mx-auto">
                Er wordt een beveiligde iDEAL transactie gesimuleerd voor €{amount.toFixed(2)}.
              </p>
              <div className="w-48 h-1.5 bg-stone-100 rounded-full mx-auto overflow-hidden">
                <div className="w-full h-full bg-pink-600 animate-in slide-in-from-left duration-1000"></div>
              </div>
            </div>
          )}

          {step === 'success' && (
            <div className="py-6 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="font-black text-xl text-stone-900">Betaling Geslaagd! 🎉</h4>
              <p className="text-xs text-stone-600 leading-relaxed font-medium max-w-sm mx-auto">
                De testbetaling van <strong>€{amount.toFixed(2)}</strong> via {activeBankObj.name} is succesvol verwerkt.
              </p>

              <div className="bg-stone-50 p-3 rounded-2xl border border-stone-200 text-[11px] font-bold text-stone-600 space-y-1 text-left max-w-xs mx-auto">
                <div className="flex justify-between">
                  <span className="text-stone-400">Transactie ID:</span>
                  <span className="font-mono text-stone-900">TX-2026-{Math.floor(10000 + Math.random() * 90000)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-400">Status:</span>
                  <span className="text-emerald-700 font-black">Geautoriseerd (Demo)</span>
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-full py-3 rounded-xl bg-stone-900 hover:bg-black text-white text-xs font-black transition-colors cursor-pointer mt-3"
              >
                Sluiten & Terug naar Website
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
