import React from 'react';
import { BookOpen, Layers, Check, GitCommit } from 'lucide-react';
import { EbobEkokResult } from '../types';
import { getPrimeFactorizationSteps } from '../utils/ebobEkokMath';

interface VisualMathBreakdownProps {
  result: EbobEkokResult;
}

export const VisualMathBreakdown: React.FC<VisualMathBreakdownProps> = ({ result }) => {
  const { n1, n2, ebob, ekok, n1Divisors, n2Divisors, commonDivisors, n1Multiples, n2Multiples } = result;

  const primeSteps = getPrimeFactorizationSteps(n1, n2);

  return (
    <div className="space-y-6">
      {/* 1. Bölenler ve EBOB Adım Adım İnceleme */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 sm:p-6">
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-800">
          <BookOpen className="w-4 h-4 text-indigo-400" />
          <h3 className="text-base font-semibold text-white">
            1. Adım Adım EBOB (Bölenler Analizi)
          </h3>
        </div>

        <p className="text-xs text-slate-300 mb-4 leading-relaxed">
          <strong className="text-white">EBOB Tanımı:</strong> İki ya da daha fazla doğal sayının ortak bölenlerinin en büyüğüne bu sayıların en büyük ortak böleni (EBOB) denir.
        </p>

        <div className="space-y-4">
          {/* n1 Divisors */}
          <div className="bg-slate-950/70 border border-slate-800/80 rounded-lg p-3.5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
              <span className="text-xs font-semibold text-slate-200">
                {n1}'in Bölenleri ({n1Divisors.length} adet):
              </span>
              <span className="text-[11px] text-slate-400 font-mono">
                {n1} % d == 0 olan pozitif tam sayılar
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {n1Divisors.map((d) => {
                const isCommon = commonDivisors.includes(d);
                const isEbob = d === ebob;
                return (
                  <span
                    key={`n1-d-${d}`}
                    className={`text-xs px-2.5 py-1 rounded-md font-mono tabular-nums transition-colors ${
                      isEbob
                        ? 'bg-indigo-600 text-white font-bold ring-2 ring-indigo-400 shadow-sm'
                        : isCommon
                        ? 'bg-indigo-950/80 text-indigo-200 border border-indigo-700/60 font-medium'
                        : 'bg-slate-900 text-slate-400 border border-slate-800'
                    }`}
                  >
                    {d}
                    {isEbob && <span className="ml-1 text-[10px] text-indigo-200">★ EBOB</span>}
                  </span>
                );
              })}
            </div>
          </div>

          {/* n2 Divisors */}
          <div className="bg-slate-950/70 border border-slate-800/80 rounded-lg p-3.5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
              <span className="text-xs font-semibold text-slate-200">
                {n2}'nin Bölenleri ({n2Divisors.length} adet):
              </span>
              <span className="text-[11px] text-slate-400 font-mono">
                {n2} % d == 0 olan pozitif tam sayılar
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {n2Divisors.map((d) => {
                const isCommon = commonDivisors.includes(d);
                const isEbob = d === ebob;
                return (
                  <span
                    key={`n2-d-${d}`}
                    className={`text-xs px-2.5 py-1 rounded-md font-mono tabular-nums transition-colors ${
                      isEbob
                        ? 'bg-indigo-600 text-white font-bold ring-2 ring-indigo-400 shadow-sm'
                        : isCommon
                        ? 'bg-indigo-950/80 text-indigo-200 border border-indigo-700/60 font-medium'
                        : 'bg-slate-900 text-slate-400 border border-slate-800'
                    }`}
                  >
                    {d}
                    {isEbob && <span className="ml-1 text-[10px] text-indigo-200">★ EBOB</span>}
                  </span>
                );
              })}
            </div>
          </div>

          {/* Ortak Bölenler Çıkarımı */}
          <div className="bg-slate-950/90 border border-indigo-900/50 rounded-lg p-3.5">
            <div className="text-xs text-slate-300">
              <span className="font-semibold text-white">Ortak Bölenler Kümesi: </span>
              <span className="font-mono text-indigo-300">
                {'{ ' + commonDivisors.join(', ') + ' }'}
              </span>
            </div>
            <div className="mt-2 text-xs text-slate-400 flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>
                Bu ortak bölenlerin en büyüğü{' '}
                <strong className="text-indigo-300 font-mono text-sm">{ebob}</strong> sayısıdır.
                Dolayısıyla <strong className="text-white font-mono">EBOB({n1}, {n2}) = {ebob}</strong> olur.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Katlar ve EKOK Adım Adım İnceleme */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 sm:p-6">
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-800">
          <Layers className="w-4 h-4 text-emerald-400" />
          <h3 className="text-base font-semibold text-white">
            2. Adım Adım EKOK (Ortak Katlar & Formül)
          </h3>
        </div>

        <p className="text-xs text-slate-300 mb-4 leading-relaxed">
          <strong className="text-white">EKOK Tanımı:</strong> İki ya da daha fazla doğal sayının ortak katlarının en küçüğüne bu sayıların en küçük ortak katı (EKOK) denir.
        </p>

        <div className="space-y-4">
          {/* n1 Multiples */}
          <div className="bg-slate-950/70 border border-slate-800/80 rounded-lg p-3.5">
            <span className="text-xs font-semibold text-slate-200 block mb-2">
              {n1}'in Pozitif Katları:
            </span>
            <div className="flex flex-wrap gap-1.5 items-center">
              {n1Multiples.map((m) => {
                const isEkok = m === ekok;
                const isCommon = m % n2 === 0;
                return (
                  <span
                    key={`n1-m-${m}`}
                    className={`text-xs px-2.5 py-1 rounded-md font-mono tabular-nums ${
                      isEkok
                        ? 'bg-emerald-600 text-white font-bold ring-2 ring-emerald-400 shadow-sm'
                        : isCommon
                        ? 'bg-emerald-950/80 text-emerald-200 border border-emerald-700/60 font-medium'
                        : 'bg-slate-900 text-slate-400 border border-slate-800'
                    }`}
                  >
                    {m}
                    {isEkok && <span className="ml-1 text-[10px] text-emerald-200">★ EKOK</span>}
                  </span>
                );
              })}
              <span className="text-slate-500 font-mono text-xs">...</span>
            </div>
          </div>

          {/* n2 Multiples */}
          <div className="bg-slate-950/70 border border-slate-800/80 rounded-lg p-3.5">
            <span className="text-xs font-semibold text-slate-200 block mb-2">
              {n2}'nin Pozitif Katları:
            </span>
            <div className="flex flex-wrap gap-1.5 items-center">
              {n2Multiples.map((m) => {
                const isEkok = m === ekok;
                const isCommon = m % n1 === 0;
                return (
                  <span
                    key={`n2-m-${m}`}
                    className={`text-xs px-2.5 py-1 rounded-md font-mono tabular-nums ${
                      isEkok
                        ? 'bg-emerald-600 text-white font-bold ring-2 ring-emerald-400 shadow-sm'
                        : isCommon
                        ? 'bg-emerald-950/80 text-emerald-200 border border-emerald-700/60 font-medium'
                        : 'bg-slate-900 text-slate-400 border border-slate-800'
                    }`}
                  >
                    {m}
                    {isEkok && <span className="ml-1 text-[10px] text-emerald-200">★ EKOK</span>}
                  </span>
                );
              })}
              <span className="text-slate-500 font-mono text-xs">...</span>
            </div>
          </div>

          {/* Formül Kutusu */}
          <div className="bg-emerald-950/20 border border-emerald-800/40 rounded-lg p-4">
            <div className="text-xs text-slate-200 font-medium mb-1.5">
              Altın Kural & Formül:
            </div>
            <div className="font-mono text-sm sm:text-base text-emerald-300 font-bold bg-slate-950/80 p-3 rounded border border-emerald-900/50">
              EKOK = (n1 × n2) / EBOB = ({n1} × {n2}) / {ebob} = {n1 * n2} / {ebob} = {ekok}
            </div>
            <p className="text-xs text-slate-400 mt-2">
              İki sayının çarpımı, onların EBOB ve EKOK değerlerinin çarpımına her zaman eşittir:{' '}
              <span className="font-mono text-slate-300">n1 × n2 = EBOB(n1, n2) × EKOK(n1, n2)</span>
            </p>
          </div>
        </div>
      </div>

      {/* 3. Asal Çarpanlara Ayırma Çizgisi (Bölen Listesi) */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 sm:p-6">
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-800">
          <GitCommit className="w-4 h-4 text-amber-400" />
          <h3 className="text-base font-semibold text-white">
            3. Asal Çarpanlar Çizgisi (Klasik Algoritma Merdiveni)
          </h3>
        </div>

        <p className="text-xs text-slate-400 mb-4">
          İki sayı yan yana yazılarak asal sayılara bölünür. Her iki sayıyı da bölen ortak asallar işaretlenir (★).
        </p>

        <div className="max-w-md mx-auto bg-slate-950 border border-slate-800 rounded-lg p-4 font-mono text-xs">
          <div className="grid grid-cols-3 gap-2 pb-2 border-b border-slate-800 font-semibold text-slate-400">
            <span className="text-center">Sayı 1</span>
            <span className="text-center">Sayı 2</span>
            <span className="text-center border-l border-slate-800">Asal Bölen</span>
          </div>

          <div className="divide-y divide-slate-900">
            {primeSteps.slice(0, -1).map((step, idx) => (
              <div key={idx} className="grid grid-cols-3 gap-2 py-1.5 items-center">
                <span className="text-center text-slate-300 tabular-nums">{step.currentN1}</span>
                <span className="text-center text-slate-300 tabular-nums">{step.currentN2}</span>
                <div className="text-center border-l border-slate-800 flex items-center justify-center gap-1 font-bold">
                  <span className={step.dividesBoth ? 'text-indigo-400' : 'text-slate-400'}>
                    {step.prime}
                  </span>
                  {step.dividesBoth && (
                    <span className="text-[10px] text-amber-400" title="Her ikisini de böldü (EBOB çarpanı)">
                      ★
                    </span>
                  )}
                </div>
              </div>
            ))}
            {/* Final row */}
            <div className="grid grid-cols-3 gap-2 py-1.5 text-slate-600">
              <span className="text-center">1</span>
              <span className="text-center">1</span>
              <span className="text-center border-l border-slate-800">-</span>
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-slate-800/80 text-[11px] text-slate-400">
            ★ ile işaretli ortak bölenlerin çarpımı: <strong className="text-indigo-300">{ebob} (EBOB)</strong>
            <br />
            Tüm asal bölenlerin çarpımı: <strong className="text-emerald-300">{ekok} (EKOK)</strong>
          </div>
        </div>
      </div>
    </div>
  );
};
