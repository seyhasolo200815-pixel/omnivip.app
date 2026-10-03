import React from 'react';
import { Menu, Crown, Home, LayoutGrid, MessageSquare, History, User } from 'lucide-react';
import { NavTab } from './BottomNav';

interface AppHeaderProps {
  onOpenVip: () => void;
  onOpenMenu: () => void;
  hasUnreadNotifications?: boolean;
  activeTab?: NavTab;
  onTabChange?: (tab: NavTab) => void;
  isVipActive?: boolean;
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  onOpenVip,
  onOpenMenu,
  hasUnreadNotifications = true,
  activeTab = 'home',
  onTabChange,
  isVipActive = false,
}) => {
  const navLinks = [
    { id: 'home' as NavTab, label: 'Home', icon: Home },
    { id: 'tools' as NavTab, label: 'AI Tools', icon: LayoutGrid },
    { id: 'chat' as NavTab, label: 'AI Chat', icon: MessageSquare },
    { id: 'history' as NavTab, label: 'History', icon: History },
    { id: 'account' as NavTab, label: 'Account', icon: User },
  ];

  return (
    <header className="relative z-20 w-full flex items-center justify-between pb-3 sm:pb-4 select-none">
      {/* Top Left: Glowing gradient ring logo next to bold text "OmniAI" (no .com) */}
      <div
        onClick={() => onTabChange && onTabChange('home')}
        className="flex items-center gap-2.5 sm:gap-3 group cursor-pointer"
      >
        {/* Glowing Gradient Ring Logo */}
        <div className="relative flex items-center justify-center">
          {/* Ambient Glow */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-500 via-blue-600 to-purple-600 blur-[8px] opacity-80 group-hover:opacity-100 transition-opacity" />

          {/* Torus / Ring */}
          <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-full p-[2.8px] bg-gradient-to-tr from-cyan-400 via-blue-500 to-purple-500 shadow-[0_0_14px_rgba(56,189,248,0.6)]">
            <div className="w-full h-full rounded-full bg-[#06090F] flex items-center justify-center">
              {/* Inner glowing dot */}
              <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-tr from-cyan-400 to-blue-500 shadow-[0_0_6px_#38bdf8]" />
            </div>
          </div>
        </div>

        {/* Brand Name: strictly bold "OmniAI" without .com */}
        <span className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-baseline">
          OmniAI
        </span>
      </div>

      {/* Center: Desktop Navigation Bar (visible on md/lg screens) */}
      {onTabChange && (
        <nav className="hidden md:flex items-center gap-1.5 p-1 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl">
          {navLinks.map((tab) => {
            const isActive = activeTab === tab.id;
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                type="button"
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-[0_0_12px_rgba(6,182,212,0.25)]'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      )}

      {/* Top Right: Luxury golden pill badge "👑 VIP Pro" + Hamburger menu with red notification dot */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Luxury Golden Pill Badge */}
        <button
          onClick={onOpenVip}
          type="button"
          className={`relative group flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full ${
            isVipActive
              ? 'bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 text-slate-950 border border-amber-300 shadow-[0_0_20px_rgba(245,158,11,0.6)] font-bold'
              : 'bg-gradient-to-r from-amber-950/80 via-yellow-950/60 to-amber-900/80 border border-amber-500/50 shadow-[0_0_15px_rgba(245,158,11,0.25)] hover:border-amber-400 hover:shadow-[0_0_20px_rgba(245,158,11,0.4)]'
          } active:scale-95 transition-all`}
        >
          <Crown className={`w-3.5 h-3.5 ${isVipActive ? 'text-slate-950 fill-slate-950' : 'text-amber-300 fill-amber-400/30'}`} />
          <span className={`text-xs sm:text-sm font-bold tracking-wide font-sans ${isVipActive ? 'text-slate-950 font-black' : 'text-amber-300'}`}>
            {isVipActive ? '👑 VIP Active' : 'VIP Pro'}
          </span>
          <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/15 to-transparent pointer-events-none" />
        </button>

        {/* Minimalist 3-line Hamburger Menu Icon with tiny red notification dot */}
        <button
          onClick={onOpenMenu}
          type="button"
          aria-label="Open menu"
          className="relative p-2 text-slate-200 hover:text-white rounded-xl hover:bg-white/5 active:scale-90 transition-all"
        >
          <Menu className="w-6 h-6 stroke-[1.8]" />

          {/* Tiny Red Notification Dot */}
          {hasUnreadNotifications && (
            <span className="absolute top-1.5 right-1.5 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.9)]" />
            </span>
          )}
        </button>
      </div>
    </header>
  );
};
