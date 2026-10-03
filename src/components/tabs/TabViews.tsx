import React, { useState } from 'react';
import {
  Search,
  Sparkles,
  Crown,
  Star,
  Clock,
  CheckCircle2,
  SlidersHorizontal,
  ChevronRight,
  Globe,
  Shield,
  Zap,
  Send,
  Trash2,
} from 'lucide-react';
import { ToolItem, TOOLS_DATA } from '../../data/toolsData';
import { AdminWhitelistModal } from '../modals/AdminWhitelistModal';

/* ---------------- TAB 2: AI TOOLS DIRECTORY ---------------- */
export const ToolsDirectoryTab: React.FC<{
  onSelectTool: (tool: ToolItem) => void;
  favorites: string[];
  onToggleFavorite: (id: string, e: React.MouseEvent) => void;
}> = ({ onSelectTool, favorites, onToggleFavorite }) => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Language', 'Creative', 'Chat', 'Audio', 'Video', 'Career'];

  const filteredTools = TOOLS_DATA.filter((tool) => {
    const matchesSearch =
      tool.title.toLowerCase().includes(search.toLowerCase()) ||
      tool.description.toLowerCase().includes(search.toLowerCase()) ||
      (tool.khmerTitle && tool.khmerTitle.includes(search));
    const matchesCat = selectedCategory === 'All' || tool.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="flex-1 flex flex-col space-y-4 overflow-y-auto no-scrollbar py-2">
      {/* Search Input & Category Filters */}
      <div className="space-y-3">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search 10 Super AI tools or ភាសាខ្មែរ..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-slate-900/80 border border-slate-800 rounded-2xl text-xs sm:text-sm text-white focus:outline-none focus:border-cyan-400 transition-colors"
          />
        </div>

        {/* Category Filter buttons */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setSelectedCategory(c)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-colors ${
                selectedCategory === c
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                  : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 border border-slate-800/80'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Tools Responsive Grid (1 column on mobile, 2 on tablet, 3 on desktop) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {filteredTools.map((tool) => {
          const isFav = favorites.includes(tool.id);
          return (
            <div
              key={tool.id}
              onClick={() => onSelectTool(tool)}
              className="group p-3.5 rounded-2xl bg-gradient-to-r from-slate-900/90 to-slate-900/40 border border-slate-800/80 hover:border-cyan-500/40 cursor-pointer transition-all duration-200 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-center font-mono font-bold text-xs text-cyan-400 shrink-0">
                  {tool.num}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {tool.id === 'langgo' ? 'រៀនគ្រប់ភាសា (LangGo)' : tool.title}
                    </h4>
                    {tool.badge && (
                      <span className="text-[9px] px-1.5 py-0.2 rounded bg-cyan-950/60 text-cyan-400 border border-cyan-800/60">
                        {tool.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] sm:text-xs text-slate-400 line-clamp-1 mt-0.5">
                    {tool.description}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={(e) => onToggleFavorite(tool.id, e)}
                  className="p-1.5 text-slate-400 hover:text-amber-400 transition-colors"
                >
                  <Star
                    className={`w-4 h-4 ${
                      isFav ? 'fill-amber-400 text-amber-400' : 'stroke-[1.5]'
                    }`}
                  />
                </button>
                <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition-colors" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

/* ---------------- TAB 3: IMMERSIVE AI CHAT ---------------- */
export const ImmersiveChatTab: React.FC<{ onOpenVip: () => void }> = ({ onOpenVip }) => {
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: 'ជំរាបសួរ! I am your OmniAI assistant. You have full access to our multilingual multimodal models. What would you like to build or translate today?',
    },
  ]);
  const [input, setInput] = useState('');

  const send = () => {
    if (!input.trim()) return;
    const userText = input;
    setMessages((prev) => [...prev, { sender: 'user', text: userText }]);
    setInput('');

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: `[OmniAI Engine 3.8]: Understood. Generating reasoned answer for "${userText}". All 10 modular services are synchronized for real-time response.`,
        },
      ]);
    }, 500);
  };

  return (
    <div className="w-full max-w-4xl mx-auto flex-1 flex flex-col justify-between space-y-3 py-2 overflow-hidden">
      {/* Chat header */}
      <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-900/60 border border-slate-800">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs sm:text-sm font-semibold text-white">K-Chat AI Active</span>
        </div>
        <button
          onClick={onOpenVip}
          className="text-xs text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/30 flex items-center gap-1.5 font-semibold"
        >
          <Crown className="w-3 h-3" />
          VIP Flash Mode
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-3 pr-1 no-scrollbar min-h-[350px]">
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] sm:max-w-[70%] p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                m.sender === 'user'
                  ? 'bg-cyan-600 text-white rounded-tr-none'
                  : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-none font-khmer'
              }`}
            >
              {m.text}
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="flex items-center gap-2 pt-1">
        <input
          type="text"
          placeholder="Message OmniAI in English or ភាសាខ្មែរ..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && send()}
          className="flex-1 bg-slate-900/90 border border-slate-800 rounded-2xl px-4 py-3 text-xs sm:text-sm text-white focus:outline-none focus:border-cyan-400"
        />
        <button
          onClick={send}
          className="p-3 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold transition-transform active:scale-95"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

/* ---------------- TAB 4: HISTORY & CREATIONS ---------------- */
export const HistoryTab: React.FC = () => {
  const [historyItems, setHistoryItems] = useState([
    {
      id: 'h1',
      tool: 'LangGo (រៀនគ្រប់ភាសា)',
      title: 'Khmer Phrasebook: "ជំរាបសួរកម្ពុជា"',
      time: '12 mins ago',
      type: 'Language',
    },
    {
      id: 'h2',
      tool: 'Image Studio',
      title: 'Cosmic Galaxy & Angkor Wat Silhouette',
      time: '1 hour ago',
      type: 'Image (8K)',
    },
    {
      id: 'h3',
      tool: 'Photo Enhancer',
      title: 'Portrait_4k_upscale_denoised.png',
      time: '3 hours ago',
      type: '4K Enhance',
    },
    {
      id: 'h4',
      tool: 'Snap & Solve',
      title: 'Derivation of E = mc² & Nuclear Binding Energy',
      time: 'Yesterday',
      type: 'Physics Derivation',
    },
    {
      id: 'h5',
      tool: 'CV Builder',
      title: 'Executive AI Architect ATS Resume (94%)',
      time: '2 days ago',
      type: 'ATS Document',
    },
  ]);

  const clearHistory = () => {
    setHistoryItems([]);
  };

  return (
    <div className="w-full max-w-4xl mx-auto flex-1 flex flex-col space-y-3 py-2 overflow-y-auto no-scrollbar">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-white">
          <Clock className="w-4 h-4 text-cyan-400" />
          <span>Recent Activity & Generations</span>
        </div>
        {historyItems.length > 0 && (
          <button
            onClick={clearHistory}
            className="text-xs text-slate-400 hover:text-red-400 flex items-center gap-1 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear</span>
          </button>
        )}
      </div>

      {historyItems.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center p-8 text-slate-500">
          <Clock className="w-10 h-10 mb-2 stroke-[1.2]" />
          <p className="text-sm">No recent history yet.</p>
          <span className="text-xs">Use any of the 10 tools to record your creations.</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {historyItems.map((item) => (
            <div
              key={item.id}
              className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center justify-between"
            >
              <div>
                <span className="text-[10px] font-mono text-cyan-400">{item.tool}</span>
                <h4 className="text-xs sm:text-sm font-semibold text-white mt-0.5">{item.title}</h4>
                <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-400">
                  <span>{item.type}</span>
                  <span>·</span>
                  <span>{item.time}</span>
                </div>
              </div>
              <span className="text-xs text-slate-400 font-mono">View</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

/* ---------------- TAB 5: ACCOUNT & VIP STATUS ---------------- */
export const AccountTab: React.FC<{
  onOpenVip: () => void;
  isVipActive?: boolean;
  vipEmail?: string;
}> = ({ onOpenVip, isVipActive = true, vipEmail = 'seyhasolo200815@gmail.com' }) => {
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);

  return (
    <div className="w-full max-w-4xl mx-auto flex-1 flex flex-col space-y-4 py-2 overflow-y-auto no-scrollbar">
      {/* Account Hero Card */}
      <div className="p-5 rounded-3xl bg-gradient-to-br from-amber-950/40 via-slate-900 to-black border border-amber-500/40 relative overflow-hidden">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-400 p-[2px]">
              <div className="w-full h-full bg-[#0a0805] rounded-2xl flex items-center justify-center font-bold text-amber-300 text-xl">
                SY
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold text-white">Seyha User</h3>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                  isVipActive 
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' 
                    : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                }`}>
                  {isVipActive ? 'VIP Pro Active' : 'Free Tier'}
                </span>
              </div>
              <span className="text-xs text-slate-400 font-mono">
                {vipEmail}
              </span>
            </div>
          </div>
        </div>

        {/* Tokens / Quota */}
        <div className="mt-4 pt-4 border-t border-amber-500/20 grid grid-cols-2 gap-3 text-center">
          <div className="p-3 rounded-2xl bg-black/40 border border-amber-500/20">
            <span className="text-xs text-slate-400 block mb-1">AI Token Quota</span>
            <span className="text-base sm:text-lg font-bold text-amber-300 font-mono">UNLIMITED</span>
          </div>
          <div className="p-3 rounded-2xl bg-black/40 border border-amber-500/20">
            <span className="text-xs text-slate-400 block mb-1">4K Render Credits</span>
            <span className="text-base sm:text-lg font-bold text-cyan-300 font-mono">∞ Active</span>
          </div>
        </div>
      </div>

      {/* Subscription banner */}
      <button
        onClick={onOpenVip}
        className="w-full p-4 rounded-2xl bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 text-slate-950 font-bold text-xs sm:text-sm flex items-center justify-between shadow-[0_0_20px_rgba(245,158,11,0.3)] active:scale-98 transition-transform"
      >
        <div className="flex items-center gap-2">
          <Crown className="w-5 h-5 fill-slate-950" />
          <span>VIP Pro Active Membership</span>
        </div>
        <span className="text-xs bg-slate-950/20 px-2.5 py-1 rounded-full">Manage</span>
      </button>

      {/* Account Settings Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs sm:text-sm text-slate-300">
        <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800">
          <div className="flex items-center gap-2.5">
            <Globe className="w-4 h-4 text-cyan-400" />
            <span>Default Language</span>
          </div>
          <span className="text-slate-400">English & ខ្មែរ</span>
        </div>

        <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800">
          <div className="flex items-center gap-2.5">
            <Shield className="w-4 h-4 text-cyan-400" />
            <span>Biometric Security</span>
          </div>
          <span className="text-emerald-400 font-medium">Face ID Enabled</span>
        </div>

        <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800">
          <div className="flex items-center gap-2.5">
            <Zap className="w-4 h-4 text-amber-400" />
            <span>Neural Engine</span>
          </div>
          <span className="text-slate-400">A18 Pro Bionic</span>
        </div>
      </div>

      {/* Admin Access: View 100 VIP Accounts Database */}
      <div className="pt-2">
        <button
          onClick={() => setIsAdminModalOpen(true)}
          type="button"
          className="w-full p-3.5 rounded-2xl bg-cyan-950/25 hover:bg-cyan-950/45 border border-cyan-500/30 text-cyan-300 text-xs font-semibold flex items-center justify-between transition-colors group"
        >
          <div className="flex items-center gap-2.5">
            <Shield className="w-4 h-4 text-cyan-400 group-hover:rotate-12 transition-transform" />
            <span>Admin Access: View 100 VIP Accounts Database</span>
          </div>
          <span className="text-[11px] bg-cyan-500/20 text-cyan-200 px-2.5 py-1 rounded-lg border border-cyan-500/40">
            View / Edit Database →
          </span>
        </button>
      </div>

      <AdminWhitelistModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
      />
    </div>
  );
};
