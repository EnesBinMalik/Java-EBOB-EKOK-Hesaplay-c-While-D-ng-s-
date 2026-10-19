/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { TopNav } from './components/TopNav';
import { AuthorSignatureBadge } from './components/AuthorSignatureBadge';
import { NumberInputSection } from './components/NumberInputSection';
import { VisualMathBreakdown } from './components/VisualMathBreakdown';
import { WhileLoopVisualizer } from './components/WhileLoopVisualizer';
import { JavaCodeViewer } from './components/JavaCodeViewer';
import { TerminalSimulator } from './components/TerminalSimulator';
import { PracticeQuiz } from './components/PracticeQuiz';
import { analyzeNumbers } from './utils/ebobEkokMath';
import { JAVA_TEMPLATES } from './utils/javaCodeTemplates';
import { Calculator, Cpu, FileCode, Terminal, HelpCircle } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('calculator');
  const [n1, setN1] = useState<number>(18);
  const [n2, setN2] = useState<number>(24);

  // Compute analysis whenever numbers change
  const result = useMemo(() => {
    return analyzeNumbers(n1, n2, 'ascending');
  }, [n1, n2]);

  // Handle downloading Java source file
  const handleDownloadJava = (
    filename = 'EbobEkokWhile.java',
    content = JAVA_TEMPLATES.standard.code
  ) => {
    const blob = new Blob([content], { type: 'text/x-java-source;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const tabs = [
    { id: 'calculator', label: 'Hesaplayıcı & Analiz', icon: Calculator },
    { id: 'visualizer', label: 'While Döngüsü Simülatörü', icon: Cpu },
    { id: 'javacode', label: 'Java Kodu (Enes Öztürk)', icon: FileCode },
    { id: 'terminal', label: 'Konsol Simülatörü', icon: Terminal },
    { id: 'quiz', label: 'Alıştırmalar & Quiz', icon: HelpCircle },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Bar */}
      <TopNav
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onDownloadJava={() => handleDownloadJava()}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Author / Homework Badge */}
        <AuthorSignatureBadge />

        {/* Tab Selection Bar */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-xl mb-6 overflow-x-auto no-scrollbar">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* View Switcher */}
        {activeTab === 'calculator' && (
          <div className="space-y-8">
            <NumberInputSection
              n1={n1}
              n2={n2}
              onN1Change={setN1}
              onN2Change={setN2}
              result={result}
            />
            <VisualMathBreakdown result={result} />
          </div>
        )}

        {activeTab === 'visualizer' && (
          <div className="space-y-6">
            <WhileLoopVisualizer n1={n1} n2={n2} />
          </div>
        )}

        {activeTab === 'javacode' && (
          <div className="space-y-6">
            <JavaCodeViewer onDownloadJava={handleDownloadJava} />
          </div>
        )}

        {activeTab === 'terminal' && (
          <div className="space-y-6">
            <TerminalSimulator />
          </div>
        )}

        {activeTab === 'quiz' && (
          <div className="space-y-6">
            <PracticeQuiz />
          </div>
        )}
      </main>

      {/* Clean quiet footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 mt-12 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            <span>Java Programlama Ödevi: While Döngüsü ile EBOB ve EKOK</span>
            <span aria-hidden="true" className="mx-2">·</span>
            <span className="text-slate-300 font-medium">Enes Öztürk İmzasıyla</span>
          </div>
          <div className="flex items-center gap-4 text-slate-500 font-mono text-[11px]">
            <span>EKOK = (n1 × n2) / EBOB</span>
            <span aria-hidden="true">·</span>
            <span>Java SE Standard Edition</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
