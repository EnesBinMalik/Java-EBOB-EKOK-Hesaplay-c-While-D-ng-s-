import React, { useState } from 'react';
import { Terminal, Play, RotateCcw, CornerDownLeft } from 'lucide-react';
import { calculateGcd } from '../utils/ebobEkokMath';

export const TerminalSimulator: React.FC = () => {
  const [inputN1, setInputN1] = useState<string>('18');
  const [inputN2, setInputN2] = useState<string>('24');
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [outputLines, setOutputLines] = useState<string[]>([
    '$ javac EbobEkokWhile.java',
    '$ java EbobEkokWhile',
    '==================================================',
    '  EBOB & EKOK HESAPLAMA PROGRAMI (WHILE DÖNGÜSÜ)  ',
    '  Geliştirici: Enes Öztürk                        ',
    '==================================================',
    'Birinci sayıyı (n1) giriniz: 18',
    'İkinci sayıyı (n2) giriniz : 24',
    '',
    '[Döngü Başlatıldı: while (i <= 18)]',
    '  -> i = 1: 18 % 1 == 0 && 24 % 1 == 0 -> ebob = 1',
    '  -> i = 2: 18 % 2 == 0 && 24 % 2 == 0 -> ebob = 2',
    '  -> i = 3: 18 % 3 == 0 && 24 % 3 == 0 -> ebob = 3',
    '  -> i = 6: 18 % 6 == 0 && 24 % 6 == 0 -> ebob = 6',
    '[Döngü 18 adımda tamamlandı]',
    '',
    '------------- HESAPLAMA SONUÇLARI -------------',
    'Girilen Sayılar : 18 ve 24',
    'EBOB(18, 24)   : 6',
    'EKOK(18, 24)   : 72  [Formül: (18 * 24) / 6]',
    '-------------------------------------------------',
    'Program başarıyla tamamlandı. - Enes Öztürk',
  ]);

  const handleRun = () => {
    const val1 = parseInt(inputN1) || 1;
    const val2 = parseInt(inputN2) || 1;
    setIsRunning(true);

    const minSayi = Math.min(val1, val2);
    let i = 1;
    let ebob = 1;
    const loopLogs: string[] = [];

    while (i <= minSayi) {
      if (val1 % i === 0 && val2 % i === 0) {
        ebob = i;
        loopLogs.push(`  -> i = ${i}: ${val1} % ${i} == 0 && ${val2} % ${i} == 0 -> ebob = ${i}`);
      }
      i++;
    }

    const ekok = Math.floor((val1 * val2) / ebob);

    const newLines = [
      `$ javac EbobEkokWhile.java`,
      `$ java EbobEkokWhile`,
      `==================================================`,
      `  EBOB & EKOK HESAPLAMA PROGRAMI (WHILE DÖNGÜSÜ)  `,
      `  Geliştirici: Enes Öztürk                        `,
      `==================================================`,
      `Birinci sayıyı (n1) giriniz: ${val1}`,
      `İkinci sayıyı (n2) giriniz : ${val2}`,
      ``,
      `[Döngü Başlatıldı: while (i <= ${minSayi})]`,
      ...loopLogs,
      `[Döngü ${minSayi} adımda tamamlandı]`,
      ``,
      `------------- HESAPLAMA SONUÇLARI -------------`,
      `Girilen Sayılar : ${val1} ve ${val2}`,
      `EBOB(${val1}, ${val2})   : ${ebob}`,
      `EKOK(${val1}, ${val2})   : ${ekok}  [Formül: (${val1} * ${val2}) / ${ebob}]`,
      ...(ebob === 1
        ? [`Bilgi: Bu iki sayı aralarında asaldır (EBOB = 1).`]
        : []),
      `-------------------------------------------------`,
      `Program başarıyla tamamlandı. - Enes Öztürk`,
    ];

    setOutputLines(newLines);
    setIsRunning(false);
  };

  const handleClear = () => {
    setOutputLines([
      '$ javac EbobEkokWhile.java',
      '$ java EbobEkokWhile',
      'Bekleniyor... Sayıları girip "Çalıştır" butonuna basınız.',
    ]);
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Terminal className="w-5 h-5 text-indigo-400" />
            <h3 className="text-base font-semibold text-white">
              Java Konsol (Terminal) Simülatörü
            </h3>
          </div>
          <span className="text-xs text-slate-400">
            System.in Scanner simülasyonu
          </span>
        </div>

        {/* Input bar */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 bg-slate-950 px-3 py-2 rounded-lg border border-slate-800">
            <label htmlFor="term-n1" className="text-xs font-mono text-slate-400">
              n1:
            </label>
            <input
              id="term-n1"
              type="number"
              min="1"
              max="9999"
              value={inputN1}
              onChange={(e) => setInputN1(e.target.value)}
              className="w-20 bg-transparent text-white font-mono text-sm focus:outline-none"
              placeholder="18"
            />
          </div>

          <div className="flex items-center gap-2 bg-slate-950 px-3 py-2 rounded-lg border border-slate-800">
            <label htmlFor="term-n2" className="text-xs font-mono text-slate-400">
              n2:
            </label>
            <input
              id="term-n2"
              type="number"
              min="1"
              max="9999"
              value={inputN2}
              onChange={(e) => setInputN2(e.target.value)}
              className="w-20 bg-transparent text-white font-mono text-sm focus:outline-none"
              placeholder="24"
            />
          </div>

          <button
            onClick={handleRun}
            disabled={isRunning}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-900 bg-indigo-400 hover:bg-indigo-300 rounded-lg transition-colors cursor-pointer disabled:opacity-50"
          >
            <Play className="w-3.5 h-3.5" />
            <span>Java Programını Çalıştır</span>
          </button>

          <button
            onClick={handleClear}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-400 hover:text-slate-200 bg-slate-800 rounded-lg transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Temizle</span>
          </button>
        </div>
      </div>

      {/* Terminal Output Window */}
      <div className="bg-[#0c1017] border border-slate-800 rounded-xl overflow-hidden shadow-2xl font-mono">
        <div className="bg-slate-900/90 px-4 py-3 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
            <span className="text-slate-300 ml-2 font-mono">bash - openjdk 21.0.2</span>
          </div>
          <span className="text-slate-500">enes-ozturk@dev-laptop:~/java-odev</span>
        </div>

        <div className="p-4 sm:p-5 text-xs text-slate-200 space-y-1 overflow-x-auto max-h-96">
          {outputLines.map((line, idx) => {
            const isCommand = line.startsWith('$');
            const isBanner = line.includes('===') || line.includes('---');
            const isCredit = line.includes('Enes Öztürk');
            const isResult = line.startsWith('EBOB') || line.startsWith('EKOK');

            return (
              <div
                key={idx}
                className={`font-mono leading-relaxed ${
                  isCommand
                    ? 'text-indigo-400 font-semibold'
                    : isBanner
                    ? 'text-slate-500 select-none'
                    : isCredit
                    ? 'text-amber-300 font-medium'
                    : isResult
                    ? 'text-emerald-300 font-bold'
                    : 'text-slate-300'
                }`}
              >
                {line}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
