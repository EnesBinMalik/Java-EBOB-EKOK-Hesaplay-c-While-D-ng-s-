import React from 'react';
import { CheckCircle2, Code2, GraduationCap } from 'lucide-react';

export const AuthorSignatureBadge: React.FC = () => {
  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 sm:p-5 mb-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start sm:items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shrink-0 text-indigo-400">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-400 mb-0.5">
              <span>Java 101 Programlama Ödevi</span>
              <span aria-hidden="true">·</span>
              <span>Döngüler (While Loop)</span>
              <span aria-hidden="true">·</span>
              <span className="text-emerald-400 font-medium inline-flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 inline" />
                Ödev Çözümü
              </span>
            </div>
            <h2 className="text-base sm:text-lg font-semibold text-white tracking-tight">
              İki Sayının EBOB ve EKOK Değerleri (While Döngüsü)
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-slate-950/60 border border-slate-800/80 px-3.5 py-2 rounded-lg text-xs self-stretch sm:self-auto justify-between sm:justify-start">
          <div className="flex items-center gap-1.5 text-slate-300">
            <Code2 className="w-4 h-4 text-indigo-400" />
            <span className="text-slate-400">Geliştirici / İmza:</span>
            <span className="font-semibold text-indigo-300">Enes Öztürk</span>
          </div>
        </div>
      </div>
    </div>
  );
};
