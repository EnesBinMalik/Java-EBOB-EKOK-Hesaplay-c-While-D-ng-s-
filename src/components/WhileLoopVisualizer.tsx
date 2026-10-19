import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  RotateCcw,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Cpu,
} from 'lucide-react';
import { LoopMethod, LoopStep } from '../types';
import { generateLoopSteps } from '../utils/ebobEkokMath';

interface WhileLoopVisualizerProps {
  n1: number;
  n2: number;
}

export const WhileLoopVisualizer: React.FC<WhileLoopVisualizerProps> = ({ n1, n2 }) => {
  const [method, setMethod] = useState<LoopMethod>('ascending');
  const [steps, setSteps] = useState<LoopStep[]>([]);
  const [currentStepIdx, setCurrentStepIdx] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speedMs, setSpeedMs] = useState<number>(800);

  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  // Re-generate steps when n1, n2 or method changes
  useEffect(() => {
    const generated = generateLoopSteps(n1, n2, method);
    setSteps(generated);
    setCurrentStepIdx(0);
    setIsPlaying(false);
  }, [n1, n2, method]);

  // Autoplay handler
  useEffect(() => {
    if (isPlaying) {
      autoPlayRef.current = setInterval(() => {
        setCurrentStepIdx((prev) => {
          if (prev < steps.length - 1) {
            return prev + 1;
          } else {
            setIsPlaying(false);
            return prev;
          }
        });
      }, speedMs);
    } else {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    }

    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isPlaying, steps.length, speedMs]);

  const currentStep = steps[currentStepIdx] || steps[0];
  const minVal = Math.min(n1, n2);
  const isFinished = currentStepIdx >= steps.length - 1;

  // Code snippets by method with line numbers
  const getCodeSnippet = () => {
    if (method === 'ascending') {
      return [
        { line: 1, text: `int i = 1;` },
        { line: 2, text: `int ebob = 1;` },
        { line: 3, text: `int minSayi = (n1 < n2) ? n1 : n2; // = ${minVal}` },
        { line: 4, text: `while (i <= minSayi) { // i = ${currentStep?.i ?? 1}` },
        {
          line: 5,
          text: `    if (n1 % i == 0 && n2 % i == 0) { // ${n1}%${currentStep?.i} == 0 && ${n2}%${currentStep?.i} == 0`,
        },
        { line: 6, text: `        ebob = i; // ebob = ${currentStep?.ebobSoFar ?? 1}` },
        { line: 7, text: `    }` },
        { line: 8, text: `    i++;` },
        { line: 9, text: `}` },
        { line: 10, text: `int ekok = (n1 * n2) / ebob; // = (${n1} * ${n2}) / ${currentStep?.ebobSoFar ?? 1}` },
      ];
    } else if (method === 'descending') {
      return [
        { line: 1, text: `int minSayi = Math.min(n1, n2); // = ${minVal}` },
        { line: 2, text: `int i = minSayi;` },
        { line: 3, text: `int ebob = 1;` },
        { line: 4, text: `while (i >= 1) { // i = ${currentStep?.i ?? minVal}` },
        {
          line: 5,
          text: `    if (n1 % i == 0 && n2 % i == 0) { // ${n1}%${currentStep?.i} == 0 && ${n2}%${currentStep?.i} == 0`,
        },
        { line: 6, text: `        ebob = i;` },
        { line: 7, text: `        break; // İlk bulunan ortak bölen en büyüktür!` },
        { line: 8, text: `    }` },
        { line: 9, text: `    i--;` },
        { line: 10, text: `}` },
      ];
    } else if (method === 'euclidean') {
      return [
        { line: 1, text: `int a = ${n1}, b = ${n2};` },
        { line: 2, text: `while (b != 0) { // a = ${currentStep?.n1}, b = ${currentStep?.n2}` },
        { line: 3, text: `    int kalan = a % b; // ${currentStep?.n1} % ${currentStep?.n2} = ${currentStep?.i}` },
        { line: 4, text: `    a = b;` },
        { line: 5, text: `    b = kalan;` },
        { line: 6, text: `}` },
        { line: 7, text: `int ebob = a;` },
      ];
    } else {
      return [
        { line: 1, text: `int k = Math.max(n1, n2); // = ${Math.max(n1, n2)}` },
        { line: 2, text: `while (true) { // k = ${currentStep?.i}` },
        { line: 3, text: `    if (k % n1 == 0 && k % n2 == 0) {` },
        { line: 4, text: `        int ekok = k;` },
        { line: 5, text: `        break;` },
        { line: 6, text: `    }` },
        { line: 7, text: `    k++;` },
        { line: 8, text: `}` },
      ];
    }
  };

  const codeSnippet = getCodeSnippet();

  return (
    <div className="space-y-6">
      {/* Method Switcher Banner */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Cpu className="w-5 h-5 text-indigo-400" />
            <h3 className="text-base font-semibold text-white">
              While Döngüsü Yürütme Simülatörü
            </h3>
          </div>
          <span className="text-xs text-slate-400">
            Enes Öztürk Ödev Çözüm Algoritmaları
          </span>
        </div>

        {/* Method tabs */}
        <div className="flex flex-wrap gap-2">
          {[
            { id: 'ascending', name: 'Standart While (1 → minSayi)', desc: 'Klasik ödev çözümü' },
            { id: 'descending', name: 'Optimize While (minSayi → 1)', desc: 'İlk bulduğunda break' },
            { id: 'euclidean', name: 'Öklid While (a % b)', desc: 'Hızlı kalan döngüsü' },
            { id: 'direct_ekok', name: 'Doğrudan EKOK While', desc: 'Kat arama döngüsü' },
          ].map((m) => (
            <button
              key={m.id}
              onClick={() => setMethod(m.id as LoopMethod)}
              className={`text-xs px-3 py-2 rounded-lg border text-left transition-colors cursor-pointer ${
                method === m.id
                  ? 'bg-indigo-600/20 border-indigo-500 text-indigo-300 font-medium'
                  : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              <div className="font-semibold">{m.name}</div>
              <div className="text-[10px] text-slate-500">{m.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Execution Split: Left: Interactive Stage, Right: Variable & Step Deck */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Code Line Tracer & Current State (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-sm">
            <div className="bg-slate-900/90 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
              <span className="text-xs font-mono text-slate-300">
                Java Kaynak Kodu Yürütme Hattı
              </span>
              <span className="text-xs font-mono text-indigo-400">
                Adım: {currentStepIdx + 1} / {steps.length}
              </span>
            </div>

            {/* Code lines */}
            <div className="p-4 font-mono text-xs overflow-x-auto space-y-1">
              {codeSnippet.map((lineObj) => {
                const isHighlight =
                  currentStep &&
                  (lineObj.line === 4 ||
                    lineObj.line === 5 ||
                    (currentStep.isCommonDivisor && lineObj.line === 6));
                return (
                  <div
                    key={lineObj.line}
                    className={`flex items-center gap-3 px-2.5 py-1 rounded transition-colors ${
                      isHighlight
                        ? 'bg-indigo-950/80 text-indigo-200 border-l-2 border-indigo-400 font-medium'
                        : 'text-slate-400'
                    }`}
                  >
                    <span className="text-slate-600 select-none w-5 text-right font-mono text-[11px]">
                      {lineObj.line}
                    </span>
                    <pre className="m-0 font-mono">{lineObj.text}</pre>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Current Step Action Callout */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4">
            <div className="text-[11px] font-mono text-slate-400 mb-1">
              BU ADIMDA NE OLUYOR?
            </div>
            <p className="text-sm text-slate-200 leading-relaxed font-sans">
              {currentStep?.actionDescription || 'Döngü hazırlanıyor...'}
            </p>
          </div>
        </div>

        {/* Right: Variable Deck & Playback Controls (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Controls Bar */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4">
            <div className="text-xs font-semibold text-slate-300 mb-3">
              Yürütme Kontrolleri
            </div>
            <div className="flex items-center justify-between gap-2 mb-4">
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setCurrentStepIdx(0)}
                  disabled={currentStepIdx === 0}
                  className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-300 hover:text-white transition-colors cursor-pointer"
                  title="Başa Dön"
                >
                  <SkipBack className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setCurrentStepIdx((p) => Math.max(0, p - 1))}
                  disabled={currentStepIdx === 0}
                  className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-300 hover:text-white transition-colors cursor-pointer text-xs font-medium"
                  title="Bir Adım Geri"
                >
                  Geri
                </button>
                <button
                  onClick={() => {
                    if (isFinished) setCurrentStepIdx(0);
                    setIsPlaying(!isPlaying);
                  }}
                  className="px-3.5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-4 h-4" /> Duraklat
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4" /> {isFinished ? 'Yeniden Oynat' : 'Otomatik Oynat'}
                    </>
                  )}
                </button>
                <button
                  onClick={() => setCurrentStepIdx((p) => Math.min(steps.length - 1, p + 1))}
                  disabled={isFinished}
                  className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-300 hover:text-white transition-colors cursor-pointer text-xs font-medium"
                  title="Bir Adım İleri"
                >
                  İleri
                </button>
                <button
                  onClick={() => setCurrentStepIdx(steps.length - 1)}
                  disabled={isFinished}
                  className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-300 hover:text-white transition-colors cursor-pointer"
                  title="Sona Git"
                >
                  <SkipForward className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={() => {
                  setCurrentStepIdx(0);
                  setIsPlaying(false);
                }}
                className="p-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors cursor-pointer"
                title="Sıfırla"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            {/* Speed slider */}
            <div className="flex items-center justify-between text-xs text-slate-400 pt-3 border-t border-slate-800">
              <span>Hız:</span>
              <div className="flex items-center gap-1">
                {[
                  { label: '0.5x', ms: 1400 },
                  { label: '1x', ms: 800 },
                  { label: '2x', ms: 400 },
                ].map((s) => (
                  <button
                    key={s.label}
                    onClick={() => setSpeedMs(s.ms)}
                    className={`px-2 py-1 rounded text-[11px] cursor-pointer ${
                      speedMs === s.ms
                        ? 'bg-indigo-600/30 text-indigo-300 border border-indigo-500/50'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Live Variable Inspector */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4">
            <div className="text-xs font-semibold text-slate-300 mb-3">
              Canlı Değişken Gözlemcisi (Variable Inspector)
            </div>

            <div className="space-y-2.5 font-mono text-xs">
              <div className="flex items-center justify-between bg-slate-950/70 p-2 rounded border border-slate-800/80">
                <span className="text-slate-400">Sayac (i):</span>
                <span className="text-white font-bold text-sm tabular-nums">
                  {currentStep?.i ?? 1}
                </span>
              </div>

              <div className="flex items-center justify-between bg-slate-950/70 p-2 rounded border border-slate-800/80">
                <span className="text-slate-400">Küçük Sayı (min):</span>
                <span className="text-slate-300 tabular-nums">{minVal}</span>
              </div>

              <div className="flex items-center justify-between bg-slate-950/70 p-2 rounded border border-slate-800/80">
                <span className="text-slate-400">{n1} % {currentStep?.i} == 0</span>
                <span className="flex items-center gap-1">
                  {currentStep?.n1Divisible ? (
                    <span className="text-emerald-400 font-semibold inline-flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> true
                    </span>
                  ) : (
                    <span className="text-slate-500 inline-flex items-center gap-1">
                      <XCircle className="w-3.5 h-3.5" /> false
                    </span>
                  )}
                </span>
              </div>

              <div className="flex items-center justify-between bg-slate-950/70 p-2 rounded border border-slate-800/80">
                <span className="text-slate-400">{n2} % {currentStep?.i} == 0</span>
                <span className="flex items-center gap-1">
                  {currentStep?.n2Divisible ? (
                    <span className="text-emerald-400 font-semibold inline-flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> true
                    </span>
                  ) : (
                    <span className="text-slate-500 inline-flex items-center gap-1">
                      <XCircle className="w-3.5 h-3.5" /> false
                    </span>
                  )}
                </span>
              </div>

              <div className="flex items-center justify-between bg-indigo-950/40 p-2.5 rounded border border-indigo-900/60">
                <span className="text-indigo-300 font-semibold">Güncel EBOB:</span>
                <span className="text-indigo-300 font-bold text-base tabular-nums">
                  {currentStep?.ebobSoFar ?? 1}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Step Log Table */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl overflow-hidden">
        <div className="px-5 py-3.5 border-b border-slate-800 flex items-center justify-between">
          <h4 className="text-xs font-semibold text-white">
            While Döngüsü Adım Günlüğü (Tüm İterasyonlar)
          </h4>
          <span className="text-xs text-slate-400">
            Toplam: {steps.length} döngü adımı
          </span>
        </div>

        <div className="max-h-60 overflow-y-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-slate-950/80 text-slate-400 sticky top-0 border-b border-slate-800">
              <tr>
                <th className="py-2.5 px-4 font-medium">Adım</th>
                <th className="py-2.5 px-3 font-medium">Sayaç (i)</th>
                <th className="py-2.5 px-3 font-medium">{n1} % i</th>
                <th className="py-2.5 px-3 font-medium">{n2} % i</th>
                <th className="py-2.5 px-3 font-medium">Durum</th>
                <th className="py-2.5 px-4 font-medium">EBOB Değeri</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {steps.map((st, idx) => {
                const isSelected = idx === currentStepIdx;
                return (
                  <tr
                    key={st.stepNumber}
                    onClick={() => setCurrentStepIdx(idx)}
                    className={`cursor-pointer transition-colors ${
                      isSelected
                        ? 'bg-indigo-950/60 text-white font-medium'
                        : 'hover:bg-slate-800/40'
                    }`}
                  >
                    <td className="py-2 px-4 tabular-nums text-slate-400">{st.stepNumber}</td>
                    <td className="py-2 px-3 tabular-nums font-bold">{st.i}</td>
                    <td className="py-2 px-3 tabular-nums">
                      {st.n1Divisible ? (
                        <span className="text-emerald-400 font-semibold">0 (Tam)</span>
                      ) : (
                        <span className="text-slate-500">{n1 % st.i}</span>
                      )}
                    </td>
                    <td className="py-2 px-3 tabular-nums">
                      {st.n2Divisible ? (
                        <span className="text-emerald-400 font-semibold">0 (Tam)</span>
                      ) : (
                        <span className="text-slate-500">{n2 % st.i}</span>
                      )}
                    </td>
                    <td className="py-2 px-3">
                      {st.isCommonDivisor ? (
                        <span className="text-indigo-300 font-semibold">★ Ortak Bölen</span>
                      ) : (
                        <span className="text-slate-500">Ortak Değil</span>
                      )}
                    </td>
                    <td className="py-2 px-4 tabular-nums text-indigo-300 font-semibold">
                      {st.ebobSoFar}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
