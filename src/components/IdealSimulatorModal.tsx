'use client';

import React, { useState } from 'react';
import { 
  X, 
  CheckCircle2, 
  QrCode, 
  ShieldCheck, 
  Loader2, 
  Smartphone, 
  Building2, 
  Sparkles,
  Zap
} from 'lucide-react';

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
  { id: 'bunq', name: 'bunq (Bank of the Free)', color: '#00a389', logo: '🌈' },
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
  const [method, setMethod] = useState<'bank' | 'qr'>('bank');
  const [step, setStep] = useState<'selection' | 'authenticating' | 'success'>('selection');

  if (!isOpen) return null;

  const handleSelectBank = (bankId: string) => {
    setSelectedBank(bankId);
    setStep('authenticating');
    setTimeout(() => {
      setStep('success');
      if (onSuccess) onSuccess();
    }, 1800);
  };

  const handleSimulateQrScan = () => {
    handleSelectBank('bunq');
  };

  const activeBankObj = DUTCH_BANKS.find((b) => b.id === selectedBank) || DUTCH_BANKS[0];

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200 cursor-pointer"
    >
      <div
        className="bg-white dark:bg-slate-900 w-full max-w-md rounded-3xl shadow-2xl overflow-hidden border border-stone-200 dark:border-slate-800 flex flex-col cursor-default animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="bg-stone-900 dark:bg-slate-950 p-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-pink-600 text-white font-black flex items-center justify-center text-xs shadow-xs">
              iDEAL
            </div>
            <div>
              <h3 className="font-black text-sm flex items-center gap-1.5">
                <span>iDEAL 2.0 Betaalsimulator</span>
                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400">
                  Live
                </span>
              </h3>
              <span className="text-[10px] text-stone-400 font-medium">
                Veilig betalen via jouw eigen bank of QR-code
              </span>
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
        <div className="bg-stone-100 dark:bg-slate-800/80 px-6 py-3 border-b border-stone-200 dark:border-slate-700/80 flex items-center justify-between text-xs">
          <div>
            <span className="text-stone-500 dark:text-slate-400 font-medium block">Ontvanger:</span>
            <strong className="text-stone-900 dark:text-white truncate max-w-[160px] block">
              {shopName || 'Samen Online Webshop'}
            </strong>
          </div>
          <div className="text-right">
            <span className="text-stone-500 dark:text-slate-400 font-medium block">Totaalbedrag:</span>
            <strong className="text-base font-black text-stone-900 dark:text-white">
              €{amount.toFixed(2)}
            </strong>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6">
          {step === 'selection' && (
            <div className="space-y-4">
              {/* Method Switcher */}
              <div className="flex rounded-xl bg-stone-100 dark:bg-slate-800 p-1 text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setMethod('bank')}
                  className={`flex-1 py-1.5 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                    method === 'bank'
                      ? 'bg-white dark:bg-slate-900 text-pink-600 dark:text-pink-400 shadow-xs'
                      : 'text-stone-600 dark:text-slate-400 hover:text-stone-900'
                  }`}
                >
                  <Building2 className="w-3.5 h-3.5" />
                  <span>Kies Bank</span>
                </button>
                <button
                  type="button"
                  onClick={() => setMethod('qr')}
                  className={`flex-1 py-1.5 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                    method === 'qr'
                      ? 'bg-white dark:bg-slate-900 text-pink-600 dark:text-pink-400 shadow-xs'
                      : 'text-stone-600 dark:text-slate-400 hover:text-stone-900'
                  }`}
                >
                  <QrCode className="w-3.5 h-3.5" />
                  <span>Scan QR-Code</span>
                </button>
              </div>

              {method === 'bank' ? (
                <>
                  <span className="text-xs font-bold text-stone-700 dark:text-slate-300 block">
                    Selecteer jouw Nederlandse bank:
                  </span>
                  <div className="grid grid-cols-2 gap-2 max-h-56 overflow-y-auto pr-1">
                    {DUTCH_BANKS.map((bank) => (
                      <button
                        key={bank.id}
                        onClick={() => handleSelectBank(bank.id)}
                        className="p-2.5 rounded-xl border border-stone-200 dark:border-slate-700/80 hover:border-pink-500 hover:bg-pink-50/30 dark:hover:bg-pink-950/20 flex items-center gap-2 text-xs font-bold text-stone-800 dark:text-slate-200 transition-all text-left cursor-pointer group"
                      >
                        <span className="text-base group-hover:scale-110 transition-transform shrink-0">
                          {bank.logo}
                        </span>
                        <span className="truncate">{bank.name}</span>
                      </button>
                    ))}
                  </div>
                </>
              ) : (
                <div className="text-center py-2 space-y-3">
                  <div className="relative w-36 h-36 mx-auto bg-stone-900 dark:bg-white p-3 rounded-2xl flex items-center justify-center border-2 border-dashed border-pink-500 shadow-md">
                    <QrCode className="w-28 h-28 text-white dark:text-slate-900" />
                    <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-0.5 bg-pink-500 shadow-sm animate-pulse" />
                  </div>
                  <p className="text-[11px] text-stone-500 dark:text-slate-400">
                    Open je mobiel bankieren app (Rabobank, ING, ABN, bunq) en richt je camera op de code.
                  </p>
                  <button
                    onClick={handleSimulateQrScan}
                    className="w-full py-2.5 rounded-xl bg-pink-600 hover:bg-pink-500 text-white text-xs font-black transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Smartphone className="w-4 h-4" />
                    <span>Simuleer Mobiele QR Scan</span>
                  </button>
                </div>
              )}

              <div className="flex items-center justify-center gap-2 text-[10px] font-bold text-stone-400 dark:text-slate-500 pt-3 border-t border-stone-100 dark:border-slate-800">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Simulatie van iDEAL 2.0 / Mollie & Stripe API</span>
              </div>
            </div>
          )}

          {step === 'authenticating' && (
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-pink-50 dark:bg-pink-950/40 text-pink-600 flex items-center justify-center mx-auto animate-pulse">
                <Loader2 className="w-8 h-8 animate-spin" />
              </div>
              <h4 className="font-black text-base text-stone-900 dark:text-white">
                Verbinden met {activeBankObj.name}...
              </h4>
              <p className="text-xs text-stone-500 dark:text-slate-400 max-w-xs mx-auto">
                Er wordt een beveiligde iDEAL transactie gesimuleerd voor €{amount.toFixed(2)}.
              </p>
              <div className="w-48 h-1.5 bg-stone-100 dark:bg-slate-800 rounded-full mx-auto overflow-hidden">
                <div className="w-full h-full bg-pink-600 animate-in slide-in-from-left duration-1000" />
              </div>
            </div>
          )}

          {step === 'success' && (
            <div className="py-6 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="font-black text-xl text-stone-900 dark:text-white">Betaling Geslaagd! 🎉</h4>
              <p className="text-xs text-stone-600 dark:text-slate-300 leading-relaxed font-medium max-w-sm mx-auto">
                De testbetaling van <strong>€{amount.toFixed(2)}</strong> via {activeBankObj.name} is succesvol verwerkt.
              </p>

              <div className="bg-stone-50 dark:bg-slate-800/80 p-3.5 rounded-2xl border border-stone-200 dark:border-slate-700/80 text-[11px] font-bold text-stone-600 dark:text-slate-300 space-y-1.5 text-left max-w-xs mx-auto">
                <div className="flex justify-between">
                  <span className="text-stone-400 dark:text-slate-400">Transactie ID:</span>
                  <span className="font-mono text-stone-900 dark:text-white">TX-2026-{Math.floor(10000 + Math.random() * 90000)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-400 dark:text-slate-400">Betaalmethode:</span>
                  <span className="text-stone-900 dark:text-white">iDEAL 2.0 ({activeBankObj.name})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-400 dark:text-slate-400">Status:</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-black">Geautoriseerd (Demo)</span>
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-full py-3 rounded-xl bg-stone-900 hover:bg-black dark:bg-orange-600 dark:hover:bg-orange-500 text-white text-xs font-black transition-colors cursor-pointer mt-3"
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
