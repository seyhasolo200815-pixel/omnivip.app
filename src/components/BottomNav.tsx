import React from 'react';
import { Home, LayoutGrid, MessageSquare, History, User } from 'lucide-react';

export type NavTab = 'home' | 'tools' | 'chat' | 'history' | 'account';

interface BottomNavProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'home' as NavTab, label: 'Home', icon: Home },
    { id: 'tools' as NavTab, label: 'AI Tools', icon: LayoutGrid },
    { id: 'chat' as NavTab, label: 'AI Chat', icon: MessageSquare },
    { id: 'history' as NavTab, label: 'History', icon: History },
    { id: 'account' as NavTab, label: 'Account', icon: User },
  ];

  return (
    <nav className="sticky bottom-0 z-40 w-full px-3 pt-2 pb-3 bg-[#06090F]/95 backdrop-blur-2xl border-t border-slate-800/80 select-none shadow-[0_-10px_25px_rgba(0,0,0,0.7)] md:hidden">
      <div className="grid grid-cols-5 items-center max-w-md mx-auto">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              type="button"
              className="flex flex-col items-center justify-center py-1 group transition-colors relative"
            >
              {/* Active Tab Glow */}
              {isActive && (
                <div className="absolute -top-1 w-6 h-1 rounded-full bg-cyan-400 blur-[2px] opacity-90 shadow-[0_0_8px_#22d3ee]" />
              )}

              {/* Icon */}
              <div
                className={`transition-transform duration-200 group-active:scale-90 ${
                  isActive
                    ? 'text-cyan-400 drop-shadow-[0_0_10px_rgba(6,182,212,0.8)]'
                    : 'text-slate-400 group-hover:text-slate-200'
                }`}
              >
                <Icon
                  className={`w-5 h-5 ${
                    isActive ? 'fill-cyan-400 stroke-cyan-400 stroke-[1.8]' : 'stroke-[1.6]'
                  }`}
                />
              </div>

              {/* Tab Label */}
              <span
                className={`text-[10px] tracking-tight mt-1 transition-colors ${
                  isActive
                    ? 'text-cyan-400 font-semibold'
                    : 'text-slate-400 font-medium group-hover:text-slate-300'
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
