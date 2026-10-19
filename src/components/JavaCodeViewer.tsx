import React, { useState } from 'react';
import { Copy, Check, Download, FileCode, Info } from 'lucide-react';
import { JAVA_TEMPLATES } from '../utils/javaCodeTemplates';

interface JavaCodeViewerProps {
  onDownloadJava: (filename?: string, content?: string) => void;
}

export const JavaCodeViewer: React.FC<JavaCodeViewerProps> = ({ onDownloadJava }) => {
  const [selectedKey, setSelectedKey] = useState<string>('standard');
  const [copied, setCopied] = useState<boolean>(false);

  const activeTemplate = JAVA_TEMPLATES[selectedKey] || JAVA_TEMPLATES.standard;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(activeTemplate.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  const handleDownload = () => {
    onDownloadJava(activeTemplate.filename, activeTemplate.code);
  };

  return (
    <div className="space-y-6">
      {/* Code Header and Tabs */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <FileCode className="w-5 h-5 text-indigo-400" />
              <h3 className="text-base font-semibold text-white">
                Java Kaynak Kodları (Enes Öztürk İmzalı)
              </h3>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Ödev gereksinimlerine tam uygun, Scanner sınıfı ile kullanıcıdan giriş alan çalışır Java programı.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors cursor-pointer border border-slate-700"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-300">Kopyalandı!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Kodu Kopyala</span>
                </>
              )}
            </button>
            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-900 bg-indigo-400 hover:bg-indigo-300 rounded-lg transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{activeTemplate.filename} İndir</span>
            </button>
          </div>
        </div>

        {/* Tab selection */}
        <div className="flex flex-wrap gap-2">
          {Object.entries(JAVA_TEMPLATES).map(([key, tpl]) => {
            const isSelected = selectedKey === key;
            return (
              <button
                key={key}
                onClick={() => setSelectedKey(key)}
                className={`text-xs px-3 py-2 rounded-lg border text-left cursor-pointer transition-colors ${
                  isSelected
                    ? 'bg-indigo-600/20 border-indigo-500 text-indigo-300 font-semibold'
                    : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                <div>{tpl.title}</div>
                <div className="text-[10px] text-slate-500 font-normal">{tpl.filename}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Code Display Area */}
      <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-sm">
        <div className="bg-slate-900/90 px-4 py-3 border-b border-slate-800 flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
            <span className="text-slate-300 ml-2 font-semibold">{activeTemplate.filename}</span>
          </div>
          <span className="text-slate-400">Java SE 8+ / JDK 17+ / JDK 21+</span>
        </div>

        <div className="p-4 sm:p-5 overflow-x-auto bg-[#0a0e17]">
          <pre className="font-mono text-xs leading-relaxed text-slate-300">
            <code>{activeTemplate.code}</code>
          </pre>
        </div>
      </div>

      {/* Explanation Box */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shrink-0 text-indigo-400">
            <Info className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-1">
              Kod Açıklaması ve Java Mantığı
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              {activeTemplate.explanation}
            </p>
          </div>
        </div>

        {/* Technical Key Concepts */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4 pt-4 border-t border-slate-800 text-xs">
          <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800/80">
            <span className="font-mono font-semibold text-indigo-400 block mb-1">
              1. Scanner Girişi
            </span>
            <span className="text-slate-400">
              `Scanner scanner = new Scanner(System.in);` ile klavyeden n1 ve n2 sayıları dinamik okunur.
            </span>
          </div>
          <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800/80">
            <span className="font-mono font-semibold text-indigo-400 block mb-1">
              2. While Döngü Şartı
            </span>
            <span className="text-slate-400">
              `while(i &lt;= minSayi)` şartı ile gereksiz iterasyonlar engellenir, küçük sayıya kadar ortak bölen aranır.
            </span>
          </div>
          <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800/80">
            <span className="font-mono font-semibold text-indigo-400 block mb-1">
              3. Modulo (%) ve EKOK
            </span>
            <span className="text-slate-400">
              `n1 % i == 0` kalansız bölmeyi test eder. EKOK ise `(n1 * n2) / ebob` formülüyle O(1) sürede bulunur.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
