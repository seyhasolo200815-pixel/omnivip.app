import React from 'react';
import { X, Crown, Star, Globe, Settings, Shield, HelpCircle, Bell, Sparkles } from 'lucide-react';
import { ToolItem } from '../../data/toolsData';

interface SideDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  favorites: string[];
  tools: ToolItem[];
  onSelectTool: (tool: ToolItem) => void;
  onOpenVip: () => void;
  onOpenAdminWhitelist?: () => void;
  lang: 'en' | 'kh';
  onToggleLang: () => void;
}

export const SideDrawer: React.FC<SideDrawerProps> = ({
  isOpen,
  onClose,
  favorites,
  tools,
  onSelectTool,
  onOpenVip,
  onOpenAdminWhitelist,
  lang,
  onToggleLang,
}) => {
  if (!isOpen) return null;

  const favoriteTools = tools.filter((t) => favorites.includes(t.id));

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-72 max-w-[85vw] h-full bg-[#090d16] border-l border-slate-800 p-5 flex flex-col justify-between text-slate-100 shadow-2xl overflow-y-auto no-scrollbar">
        {/* Top Header */}
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-cyan-400 to-blue-600 p-[2px]">
                <div className="w-full h-full bg-[#06090F] rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-cyan-400" />
                </div>
              </div>
              <span className="font-bold text-white text-base tracking-tight">OmniAI Menu</span>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* User Profile Card */}
          <div className="mt-4 p-3 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center font-bold text-cyan-300 text-sm">
                OA
              </div>
              <div>
                <h4 className="text-xs font-semibold text-white">Seyha User</h4>
                <span className="text-[10px] text-slate-400 font-mono">seyha@omniai</span>
              </div>
            </div>
            <button
              onClick={() => {
                onClose();
                onOpenVip();
              }}
              className="px-2 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-[10px] font-bold flex items-center gap-1"
            >
              <Crown className="w-2.5 h-2.5" />
              <span>VIP</span>
            </button>
          </div>

          {/* Language Switch */}
          <div className="mt-4">
            <label className="text-[11px] font-medium text-slate-400 uppercase tracking-wider block mb-1.5">
              Language / ភាសា
            </label>
            <button
              onClick={onToggleLang}
              className="w-full flex items-center justify-between p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 transition-colors"
            >
              <div className="flex items-center gap-2 text-xs">
                <Globe className="w-4 h-4 text-cyan-400" />
                <span>{lang === 'en' ? 'English (US)' : 'ភាសាខ្មែរ (Khmer)'}</span>
              </div>
              <span className="text-[10px] font-semibold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded">
                {lang === 'en' ? 'Switch to ខ្មែរ' : 'Switch to EN'}
              </span>
            </button>
          </div>

          {/* Favorited Tools Section */}
          <div className="mt-5">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5 text-slate-300 text-xs font-semibold">
                <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                <span>Starred Tools ({favorites.length})</span>
              </div>
            </div>

            {favoriteTools.length === 0 ? (
              <p className="text-[11px] text-slate-500 italic p-2 rounded-lg bg-slate-900/30">
                Tap star icons on any card to save your favorites here.
              </p>
            ) : (
              <div className="space-y-1.5 max-h-40 overflow-y-auto no-scrollbar">
                {favoriteTools.map((tool) => (
                  <div
                    key={tool.id}
                    onClick={() => {
                      onClose();
                      onSelectTool(tool);
                    }}
                    className="flex items-center justify-between p-2 rounded-xl bg-slate-900/50 hover:bg-cyan-500/10 border border-slate-800/80 hover:border-cyan-500/30 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono text-cyan-400">{tool.num}</span>
                      <span className="text-xs font-medium text-slate-200">{tool.title}</span>
                    </div>
                    <span className="text-[9px] text-slate-400 uppercase font-mono">Open</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick Menu Links */}
          <div className="mt-5 space-y-1">
            <button
              onClick={() => {
                onClose();
                onOpenVip();
              }}
              className="w-full flex items-center gap-2.5 p-2 rounded-xl text-xs text-amber-300 hover:bg-amber-500/10 transition-colors"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>VIP Pro Subscription</span>
            </button>
            <div className="w-full flex items-center justify-between p-2 rounded-xl text-xs text-slate-300">
              <div className="flex items-center gap-2.5">
                <Bell className="w-4 h-4 text-slate-400" />
                <span>Notifications</span>
              </div>
              <span className="w-2 h-2 rounded-full bg-red-500" />
            </div>
            <div className="w-full flex items-center gap-2.5 p-2 rounded-xl text-xs text-slate-300">
              <Shield className="w-4 h-4 text-slate-400" />
              <span>Privacy & Security</span>
            </div>

            {onOpenAdminWhitelist && (
              <button
                onClick={() => {
                  onClose();
                  onOpenAdminWhitelist();
                }}
                className="w-full flex items-center gap-2.5 p-2 rounded-xl text-xs text-cyan-300 hover:bg-cyan-500/10 transition-colors"
              >
                <Shield className="w-4 h-4 text-cyan-400" />
                <span>Admin: 100 VIP Accounts</span>
              </button>
            )}
          </div>
        </div>

        {/* Footer info */}
        <div className="pt-4 border-t border-slate-800 text-[11px] text-slate-500">
          <div className="flex items-center justify-between">
            <span>OmniAI Super App</span>
            <span className="font-mono text-cyan-400/80">v3.8 Pro</span>
          </div>
          <p className="text-[10px] text-slate-600 mt-1">
            All-in-One Super AI Ecosystem · One platform. Infinite possibilities.
          </p>
        </div>
      </div>
    </div>
  );
};
