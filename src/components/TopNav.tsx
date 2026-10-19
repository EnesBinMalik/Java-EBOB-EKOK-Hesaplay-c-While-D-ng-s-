import React from 'react';
import { Download } from 'lucide-react';

interface TopNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onDownloadJava: () => void;
}

export const TopNav: React.FC<TopNavProps> = ({
  activeTab,
  onTabChange,
  onDownloadJava,
}) => {
  const navItems = [
    { id: 'calculator', label: 'Hesaplayıcı' },
    { id: 'visualizer', label: 'While Simülatörü' },
    { id: 'javacode', label: 'Java Kodu' },
    { id: 'terminal', label: 'Konsol Simülatörü' },
    { id: 'quiz', label: 'Alıştırmalar' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-2 shrink-0">
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              onTabChange('calculator');
            }}
            className="text-lg font-bold tracking-tight text-white hover:text-indigo-400 transition-colors whitespace-nowrap shrink-0"
          >
            EBOB & EKOK Studio
          </a>
        </div>

        {/* Zone 2: 4-5 clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`transition-colors whitespace-nowrap shrink-0 py-1 cursor-pointer border-b-2 ${
                  isActive
                    ? 'text-white border-indigo-500 font-semibold'
                    : 'text-slate-400 hover:text-slate-200 border-transparent'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onDownloadJava}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold text-slate-900 bg-indigo-400 hover:bg-indigo-300 active:bg-indigo-500 rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer shadow-sm"
            title="EbobEkokWhile.java dosyasını indir"
          >
            <Download className="w-3.5 h-3.5" />
            <span>.java İndir</span>
          </button>
        </div>
      </div>

      {/* Mobile nav subbar for narrow viewports */}
      <div className="md:hidden flex items-center justify-start gap-3 px-4 py-2 border-t border-slate-900 overflow-x-auto no-scrollbar bg-slate-950">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={`text-xs px-2.5 py-1 rounded transition-colors whitespace-nowrap shrink-0 ${
              activeTab === item.id
                ? 'bg-indigo-950 text-indigo-300 font-medium border border-indigo-800/60'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </header>
  );
};
