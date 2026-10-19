import React from 'react';
import { ArrowRight, Calculator, Sparkles, Shuffle } from 'lucide-react';
import { EbobEkokResult } from '../types';

interface NumberInputSectionProps {
  n1: number;
  n2: number;
  onN1Change: (val: number) => void;
  onN2Change: (val: number) => void;
  result: EbobEkokResult;
}

export const NumberInputSection: React.FC<NumberInputSectionProps> = ({
  n1,
  n2,
  onN1Change,
  onN2Change,
  result,
}) => {
  const presets = [
    { label: '18 & 24', desc: 'EBOB Örneği (Prompt)', n1: 18, n2: 24 },
    { label: '6 & 8', desc: 'EKOK Örneği (Prompt)', n1: 6, n2: 8 },
    { label: '35 & 14', desc: 'Ortak Bölen 7', n1: 35, n2: 14 },
    { label: '7 & 13', desc: 'Aralarında Asal', n1: 7, n2: 13 },
    { label: '24 & 36', desc: 'Büyük Katlar', n1: 24, n2: 36 },
    { label: '45 & 60', desc: 'EBOB 15, EKOK 180', n1: 45, n2: 60 },
  ];

  const handleRandomize = () => {
    const randomPairs = [
      [12, 16],
      [20, 30],
      [15, 40],
      [14, 21],
      [18, 30],
      [25, 35],
      [9, 12],
      [16, 28],
      [11, 17],
    ];
    const pick = randomPairs[Math.floor(Math.random() * randomPairs.length)];
    onN1Change(pick[0]);
    onN2Change(pick[1]);
  };

  const product = n1 * n2;
  const isMultiple = Math.max(n1, n2) % Math.min(n1, n2) === 0;

  return (
    <div className="space-y-6">
      {/* Input Card */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 sm:p-6 shadow-sm">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800/80">
          <div>
            <h3 className="text-base font-semibold text-white flex items-center gap-2">
              <Calculator className="w-4 h-4 text-indigo-400" />
              Sayı Girişi & Parametreler
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Hesaplamak istediğiniz iki doğal sayıyı girin veya hazır örneklerden birini seçin.
            </p>
          </div>
          <button
            onClick={handleRandomize}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700/80 rounded-lg transition-colors cursor-pointer border border-slate-700/60"
          >
            <Shuffle className="w-3.5 h-3.5 text-indigo-400" />
            <span>Rastgele Sayılar</span>
          </button>
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
          <div className="bg-slate-950/70 border border-slate-800/90 rounded-lg p-4 focus-within:border-indigo-500/80 transition-colors">
            <div className="flex items-center justify-between mb-1.5">
              <label htmlFor="n1-input" className="text-xs font-semibold text-slate-300">
                1. Sayı (n1)
              </label>
              <span className="text-[11px] text-slate-500 font-mono">Doğal Sayı &gt; 0</span>
            </div>
            <input
              id="n1-input"
              type="number"
              min="1"
              max="9999"
              value={n1}
              onChange={(e) => onN1Change(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-full bg-transparent text-2xl font-bold font-mono text-white focus:outline-none tabular-nums"
              placeholder="18"
            />
          </div>

          <div className="bg-slate-950/70 border border-slate-800/90 rounded-lg p-4 focus-within:border-indigo-500/80 transition-colors">
            <div className="flex items-center justify-between mb-1.5">
              <label htmlFor="n2-input" className="text-xs font-semibold text-slate-300">
                2. Sayı (n2)
              </label>
              <span className="text-[11px] text-slate-500 font-mono">Doğal Sayı &gt; 0</span>
            </div>
            <input
              id="n2-input"
              type="number"
              min="1"
              max="9999"
              value={n2}
              onChange={(e) => onN2Change(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-full bg-transparent text-2xl font-bold font-mono text-white focus:outline-none tabular-nums"
              placeholder="24"
            />
          </div>
        </div>

        {/* Presets */}
        <div>
          <span className="text-xs text-slate-400 block mb-2 font-medium">
            Örnek Senaryolar:
          </span>
          <div className="flex flex-wrap gap-2">
            {presets.map((preset) => {
              const isSelected = n1 === preset.n1 && n2 === preset.n2;
              return (
                <button
                  key={preset.label}
                  onClick={() => {
                    onN1Change(preset.n1);
                    onN2Change(preset.n2);
                  }}
                  className={`text-xs px-3 py-1.5 rounded-lg border transition-all text-left cursor-pointer ${
                    isSelected
                      ? 'bg-indigo-600/20 border-indigo-500 text-indigo-300 font-medium'
                      : 'bg-slate-950/50 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
                  }`}
                >
                  <span className="font-mono font-semibold">{preset.label}</span>
                  <span className="text-[10px] text-slate-400 block">
                    {preset.desc}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Results Cards Banner */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* EBOB Card */}
        <div className="bg-gradient-to-br from-indigo-950/40 via-slate-900 to-slate-900/90 border border-indigo-900/40 rounded-xl p-5 relative overflow-hidden">
          <div className="flex items-start justify-between mb-3">
            <div>
              <span className="text-[11px] font-mono text-indigo-400 font-semibold tracking-wider uppercase block">
                En Büyük Ortak Bölen
              </span>
              <h4 className="text-xl font-bold text-white mt-0.5">
                EBOB({n1}, {n2})
              </h4>
            </div>
            <div className="text-4xl sm:text-5xl font-extrabold font-mono text-indigo-300 tabular-nums">
              {result.ebob}
            </div>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed border-t border-indigo-900/40 pt-3 mt-1">
            {n1} ve {n2} sayılarını kalansız bölen pozitif tam sayıların en büyüğü{' '}
            <strong className="text-indigo-300 font-mono">{result.ebob}</strong> sayısıdır.
          </p>

          <div className="mt-3 flex items-center gap-2 text-[11px] text-slate-400">
            <span>Ortak Bölenler:</span>
            <span className="font-mono text-indigo-200">
              {result.commonDivisors.join(', ')}
            </span>
          </div>
        </div>

        {/* EKOK Card */}
        <div className="bg-gradient-to-br from-emerald-950/40 via-slate-900 to-slate-900/90 border border-emerald-900/40 rounded-xl p-5 relative overflow-hidden">
          <div className="flex items-start justify-between mb-3">
            <div>
              <span className="text-[11px] font-mono text-emerald-400 font-semibold tracking-wider uppercase block">
                En Küçük Ortak Kat
              </span>
              <h4 className="text-xl font-bold text-white mt-0.5">
                EKOK({n1}, {n2})
              </h4>
            </div>
            <div className="text-4xl sm:text-5xl font-extrabold font-mono text-emerald-300 tabular-nums">
              {result.ekok}
            </div>
          </div>

          <div className="border-t border-emerald-900/40 pt-3 mt-1">
            <div className="flex items-center gap-1.5 text-xs text-slate-300 font-mono mb-1">
              <span>Formül: EKOK = ({n1} × {n2}) / {result.ebob}</span>
              <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-300 font-bold">{product} / {result.ebob} = {result.ekok}</span>
            </div>
            <p className="text-xs text-slate-400">
              {n1} ve {n2} sayılarının katlarından oluşan kümenin kesişimindeki en küçük pozitif sayı.
            </p>
          </div>

          <div className="mt-3 flex items-center gap-2 text-[11px] text-slate-400">
            <span>Özellik:</span>
            <span className="text-emerald-300">
              {result.isCoprime
                ? 'Aralarında asal oldukları için EKOK = n1 × n2'
                : isMultiple
                ? 'Biri diğerinin katı olduğu için EKOK büyük sayıya eşittir'
                : `Çarpım (${product}) = EBOB(${result.ebob}) × EKOK(${result.ekok})`}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
