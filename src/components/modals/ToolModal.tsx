import React, { useState } from 'react';
import {
  ArrowLeft,
  X,
  Sparkles,
  Volume2,
  Send,
  Sliders,
  Copy,
  Check,
  Play,
  Pause,
  RotateCcw,
  Zap,
  ArrowRight,
  Upload,
  Crown,
  Share2,
  Trash2,
  Download,
  Image as ImageIcon,
  Film,
  FileText,
  Calculator,
  PenTool,
  Briefcase,
  Layers,
  Globe,
  RefreshCw,
  Search,
  CheckCircle2,
  Eye,
  Camera,
} from 'lucide-react';
import { ToolItem } from '../../data/toolsData';
import { LangGoHub } from './LangGoHub';
import { SongStudio } from '../studios/SongStudio';
import { VoiceStudio } from '../studios/VoiceStudio';
import { FluxImageStudio } from '../studios/FluxImageStudio';
import { KChatStudio } from '../studios/KChatStudio';

interface ToolModalProps {
  tool: ToolItem | null;
  onClose: () => void;
  onOpenVip: () => void;
  isVipActive?: boolean;
  lang?: 'en' | 'kh';
  onToggleLang?: () => void;
}

export const ToolModal: React.FC<ToolModalProps> = ({
  tool,
  onClose,
  onOpenVip,
  isVipActive = false,
  lang = 'en',
  onToggleLang,
}) => {
  if (!tool) return null;

  // Clear chat trigger helper for K-Chat
  const [chatClearTrigger, setChatClearTrigger] = useState(0);

  return (
    /* ========================================================================
       1. GLOBAL FULL-SCREEN MOBILE APP ARCHITECTURE (NO POPUP / NO FLOATING CARD)
       Container: fixed inset-0 z-50 w-full h-full min-h-screen bg-[#06090F] overflow-y-auto pb-24
       ======================================================================== */
    <div className="fixed inset-0 z-50 w-full h-full min-h-screen bg-[#06090F] overflow-y-auto pb-24 text-slate-100 animate-in fade-in duration-200 font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      
      {/* Background ambient lighting */}
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed bottom-10 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* ========================================================================
         2. STANDARDIZED MOBILE TOP APP BAR (STICKY TOP)
         ======================================================================== */}
      <header className="sticky top-0 z-40 w-full bg-[#080C14]/90 backdrop-blur-xl border-b border-slate-800/80 px-4 py-3 sm:px-6 sm:py-3.5 shadow-lg select-none">
        <div className="w-full max-w-5xl mx-auto flex items-center justify-between gap-3">
          
          {/* Left: Clear Touch-Friendly Back Button */}
          <button
            onClick={onClose}
            type="button"
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.06] hover:bg-white/10 active:bg-cyan-500/20 text-slate-200 hover:text-white border border-slate-700/60 hover:border-cyan-500/50 transition-all active:scale-95 text-xs sm:text-sm font-semibold font-khmer shadow-sm shrink-0"
          >
            <ArrowLeft className="w-4 h-4 text-cyan-400 stroke-[2.5]" />
            <span>← ត្រឡប់ក្រោយ</span>
          </button>

          {/* Center: Module Name with Glowing Badge */}
          <div className="flex items-center gap-2 sm:gap-2.5 truncate">
            <span className="text-xs font-mono font-bold text-cyan-300 bg-cyan-950/80 px-2 py-0.5 rounded-lg border border-cyan-500/40 shadow-[0_0_10px_rgba(6,182,212,0.3)] shrink-0">
              {tool.num}
            </span>
            <div className="flex items-center gap-1.5 truncate">
              <h2 className="text-sm sm:text-base font-bold text-white tracking-tight truncate">
                {tool.id === 'langgo'
                  ? 'LangGo · រៀនគ្រប់ភាសា'
                  : tool.num === '04' || tool.id === 'imagestudio'
                  ? '🎨 Module 04: AI Image Generation Studio'
                  : tool.id === 'aivoice'
                  ? '🎙️ AI Audio & Voice Cloning Studio'
                  : tool.id === 'aisong'
                  ? '🎶 AI Song & Lyric Studio'
                  : tool.title}
              </h2>
              {tool.isVip && (
                <span
                  className={`px-1.5 py-0.5 rounded-full text-[9px] font-bold border shrink-0 ${
                    isVipActive
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                      : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                  }`}
                >
                  {isVipActive ? 'VIP ACTIVE' : 'VIP'}
                </span>
              )}
            </div>
          </div>

          {/* Right: Relevant Quick-Action Toggle */}
          <div className="flex items-center gap-2 shrink-0">
            {tool.id === 'kchat' && (
              <button
                onClick={() => setChatClearTrigger((prev) => prev + 1)}
                type="button"
                className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-slate-400 hover:text-rose-400 transition-colors"
                title="Clear Chat History"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear</span>
              </button>
            )}

            {tool.id === 'langgo' && onToggleLang && (
              <button
                onClick={onToggleLang}
                type="button"
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-900/80 border border-cyan-500/30 text-[11px] text-cyan-300 hover:bg-cyan-500/20 transition-colors font-medium"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>{lang === 'en' ? 'EN' : 'ខ្មែរ'}</span>
              </button>
            )}

            {(tool.num === '04' || tool.id === 'imagestudio') && (
              <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 text-xs font-mono font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
                <span>⚡ FLUX.1 Engine (Free)</span>
              </div>
            )}

            {tool.id === 'aivoice' && (
              <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                <span>⚡ Studio 48kHz</span>
              </div>
            )}

            {tool.id === 'aisong' && (
              <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-500/15 border border-pink-500/30 text-pink-300 text-xs font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-pulse" />
                <span>320kbps Studio Audio</span>
              </div>
            )}

            <button
              onClick={onOpenVip}
              type="button"
              className={`flex items-center gap-1.5 px-3 py-1 sm:py-1.5 rounded-full border text-xs font-bold transition-all active:scale-95 ${
                isVipActive
                  ? 'bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 border-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.5)]'
                  : 'bg-amber-950/60 border-amber-500/40 text-amber-300 hover:border-amber-400'
              }`}
            >
              <Crown className="w-3.5 h-3.5" />
              <span className="hidden sm:inline font-sans">
                {isVipActive ? 'VIP Active' : 'VIP Pro'}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* ========================================================================
         3. EDGE-TO-EDGE RESPONSIVE CONTENT AREA
         Mobile: w-full px-4 py-4
         Desktop: max-w-5xl mx-auto py-6 sm:py-8
         ======================================================================== */}
      <main className="w-full px-4 py-4 sm:px-6 sm:py-6 max-w-5xl mx-auto">
        {tool.id === 'langgo' && (
          <LangGoHub onOpenVip={onOpenVip} isVipActive={isVipActive} />
        )}
        {tool.id === 'kchat' && (
          <KChatStudio onOpenVip={onOpenVip} isVipActive={isVipActive} />
        )}
        {(tool.num === '04' || tool.id === 'imagestudio') && (
          <FluxImageStudio onOpenVip={onOpenVip} isVipActive={isVipActive} />
        )}
        {tool.id === 'photoenhancer' && tool.num !== '04' && (
          <PhotoEnhancerSandbox onOpenVip={onOpenVip} isVipActive={isVipActive} />
        )}
        {tool.id === 'aivoice' && (
          <VoiceStudio onOpenVip={onOpenVip} isVipActive={isVipActive} />
        )}
        {tool.id === 'videogenerator' && (
          <VideoGenSandbox onOpenVip={onOpenVip} isVipActive={isVipActive} />
        )}
        {tool.id === 'chatpdf' && (
          <ChatPdfSandbox onOpenVip={onOpenVip} />
        )}
        {tool.id === 'snapsolve' && (
          <SnapSolveSandbox />
        )}
        {tool.id === 'contentwriter' && (
          <ContentWriterSandbox onOpenVip={onOpenVip} />
        )}
        {tool.id === 'cvbuilder' && (
          <CvBuilderSandbox onOpenVip={onOpenVip} isVipActive={isVipActive} />
        )}
        {tool.id === 'aisong' && (
          <SongStudio onOpenVip={onOpenVip} isVipActive={isVipActive} />
        )}
      </main>

      {/* Persistent Bottom Return Bar (Visible when scrolled far down) */}
      <footer className="w-full max-w-5xl mx-auto px-4 mt-8 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
        <span className="font-mono text-[11px] text-slate-500">
          OmniAI Ecosystem · Module {tool.num} ({tool.category})
        </span>
        <button
          onClick={onClose}
          type="button"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/80 transition-colors font-khmer text-xs"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-cyan-400" />
          <span>ត្រឡប់ទៅផ្ទាំងដើម (Dashboard)</span>
        </button>
      </footer>
    </div>
  );
};

/* ========================================================================
   02. K-CHAT AI ASSISTANT (FULL-SCREEN RESPONSIVE WORKSPACE)
   ======================================================================== */
const KChatSandbox: React.FC<{ clearTrigger?: number; onOpenVip: () => void }> = ({
  clearTrigger,
  onOpenVip,
}) => {
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: 'ជំរាបសួរ! ខ្ញុំជា K-Chat AI ជំនួយការឆ្លាតវៃរបស់អ្នក។ តើខ្ញុំអាចជួយអ្វីបានខ្លះសម្រាប់កិច្ចការ និងការសិក្សារបស់អ្នកនៅថ្ងៃនេះ?',
      time: '9:41 AM',
    },
    {
      sender: 'ai',
      text: 'I can assist you with creative writing, complex reasoning, multilingual translation, and code generation across 10 modular neural layers.',
      time: '9:41 AM',
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  React.useEffect(() => {
    if (clearTrigger && clearTrigger > 0) {
      setMessages([
        {
          sender: 'ai',
          text: 'ការសន្ទនាត្រូវបានសម្អាតឡើងវិញ។ តើអ្នកចង់ចាប់ផ្តើមប្រធានបទអ្វីថ្មី?',
          time: 'Ready',
        },
      ]);
    }
  }, [clearTrigger]);

  const suggestions = [
    'ពន្យល់អំពី Quantum Computing ឱ្យងាយយល់',
    'តែងកំណាព្យមួយបទអំពីប្រាសាទអង្គរវត្ត',
    'បង្កើតផែនការដំណើរកម្សាន្ត ៣ ថ្ងៃនៅសៀមរាប',
    'របៀបត្រៀមសម្ភាសន៍ការងារឱ្យជាប់ ១០០%',
    'Translate English business contract to Khmer',
  ];

  const handleSend = (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setMessages((prev) => [...prev, { sender: 'user', text: query, time: timeNow }]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      let reply = `វិភាគស៊ីជម្រៅលើប្រធានបទ "${query}": ប្រព័ន្ធ OmniAI បានដំណើរការទិន្នន័យលើ Neural Layers ចំនួន ១០ ដោយផ្តល់នូវចម្លើយដ៏សុក្រឹត និងដំណោះស្រាយជាក់ស្តែងបំផុត។`;

      if (query.toLowerCase().includes('អង្គរ') || query.toLowerCase().includes('angkor')) {
        reply =
          'ប្រាសាទអង្គរវត្ត ត្រូវបានកសាងឡើងក្នុងរជ្ជកាលព្រះបាទសូរ្យវរ្ម័នទី២ នៅដើមសតវត្សរ៍ទី១២។ ប្រាសាទនេះតំណាងឱ្យភ្នំព្រះសុមេរុ ដែលជាមជ្ឈមណ្ឌលនៃចក្រវាលក្នុងទេវកថាហិណ្ឌូ ហើយជាស្នាដៃស្ថាបត្យកម្មដ៏កំពូលនៃអរិយធម៌ខ្មែរ។';
      } else if (query.toLowerCase().includes('quantum')) {
        reply =
          'Quantum Computing (កុំព្យូទ័រ ക് квант) ប្រើប្រាស់ Qubits ដែលអាចស្ថិតនៅក្នុង Superposition (០ និង ១ ក្នុងពេលតែមួយ)។ វាអនុញ្ញាតឱ្យគណនាល្បឿនរាប់ពាន់លានដងលឿនជាងកុំព្យូទ័របុរាណ សម្រាប់ដោះស្រាយបញ្ហាគីមីវិទ្យា ថ្នាំពេទ្យ និងសុវត្ថិភាពទិន្នន័យ!';
      } else if (query.toLowerCase().includes('សៀមរាប') || query.toLowerCase().includes('siem reap')) {
        reply =
          'ផែនការ ៣ ថ្ងៃនៅសៀមរាប:\n• ថ្ងៃទី១: ទស្សនាថ្ងៃរះនៅអង្គរវត្ត, បាយ័ន, និងតាព្រហ្ម (ប្រាសាទចាក់ឫសឈើ)\n• ថ្ងៃទី២: បន្ទាយស្រី (ថ្មភក់ពណ៌ផ្កាឈូក), គូលែន (ទឹកធ្លាក់ & លិង្គ ១០០០)\n• ថ្ងៃទី៣: ជិះទូកមើលភូមិបណ្តែតទឹកកំពង់ភ្លុក & ភ្លក់ម្ហូបអាហារតាម Pub Street។';
      }

      setMessages((prev) => [...prev, { sender: 'ai', text: reply, time: timeNow }]);
    }, 700);
  };

  return (
    <div className="space-y-4">
      {/* K-Chat Header Hero Card */}
      <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-cyan-950/40 via-slate-900 to-blue-950/40 border border-cyan-500/30 flex items-center justify-between">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 border border-cyan-400/50 flex items-center justify-center text-cyan-300 shadow-[0_0_20px_rgba(6,182,212,0.4)]">
            <Sparkles className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <span>K-Chat Neural Assistant</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            </h3>
            <p className="text-xs text-slate-400 font-khmer">
              ម៉ូឌែលឆ្លាតវៃភាសាខ្មែរ-អង់គ្លេស ឆ្លើយតបរហ័សទាន់ចិត្ត កម្រិត Ultra Low Latency
            </p>
          </div>
        </div>

        <button
          onClick={onOpenVip}
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold"
        >
          <Crown className="w-3.5 h-3.5 text-amber-400" />
          <span>GPT-4o Engine</span>
        </button>
      </div>

      {/* Full-width Messages Container */}
      <div className="min-h-[380px] max-h-[580px] overflow-y-auto space-y-3.5 p-4 rounded-3xl bg-black/50 border border-slate-800/80 shadow-inner no-scrollbar">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div
              className={`max-w-[92%] sm:max-w-[80%] p-3.5 sm:p-4 rounded-2xl text-xs sm:text-sm leading-relaxed whitespace-pre-line shadow-md ${
                m.sender === 'user'
                  ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-tr-none'
                  : 'bg-slate-900/90 text-slate-100 border border-slate-700/70 rounded-tl-none font-khmer'
              }`}
            >
              {m.text}
            </div>
            <span className="text-[10px] text-slate-500 mt-1 px-1 font-mono">{m.time}</span>
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-2 p-3 rounded-2xl bg-slate-900/70 border border-slate-800 text-cyan-300 text-xs w-fit">
            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" />
            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.2s]" />
            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.4s]" />
            <span className="font-mono text-[11px] ml-1">K-Chat is thinking...</span>
          </div>
        )}
      </div>

      {/* Suggested prompts strip */}
      <div className="space-y-1.5">
        <span className="text-[11px] text-slate-400 font-khmer block px-1">
          💡 សំណើប្រធានបទរហ័ស (Quick Prompts):
        </span>
        <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
          {suggestions.map((s, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(s)}
              className="text-xs text-cyan-300 bg-cyan-950/50 hover:bg-cyan-900/60 border border-cyan-800/60 px-3 py-1.5 rounded-full whitespace-nowrap active:scale-95 transition-all font-khmer shadow-sm shrink-0"
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Message input bar */}
      <div className="flex gap-2 items-center bg-slate-900/90 p-2 rounded-2xl border border-slate-700/80 shadow-xl">
        <input
          type="text"
          placeholder="សួរសំណួរទៅកាន់ K-Chat (ឧ: សរសេរសំបុត្រសុំការងារ, ពន្យល់រូបមន្ត...)"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          className="flex-1 bg-transparent px-3 py-2 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none font-khmer"
        />
        <button
          onClick={() => handleSend()}
          type="button"
          disabled={!input.trim()}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 disabled:opacity-50 text-slate-950 font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-[0_0_15px_rgba(6,182,212,0.4)] active:scale-95 transition-all"
        >
          <span>ផ្ញើ</span>
          <Send className="w-4 h-4 stroke-[2.5]" />
        </button>
      </div>
    </div>
  );
};

/* ========================================================================
   03. IMAGE STUDIO (FULL-SCREEN 8K NEURAL GENERATION CANVAS)
   ======================================================================== */
const ImageStudioSandbox: React.FC<{ onOpenVip: () => void; isVipActive?: boolean }> = ({
  onOpenVip,
  isVipActive,
}) => {
  const [prompt, setPrompt] = useState(
    'A mystical ancient temple of Angkor Wat illuminated by glowing purple neon celestial nebulas in deep cosmos, cinematic volumetric lighting, 8k resolution hyper-detailed'
  );
  const [style, setStyle] = useState('Cosmic Cyber');
  const [aspect, setAspect] = useState('16:9');
  const [resolution, setResolution] = useState('4K UHD');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedCount, setGeneratedCount] = useState(1);

  const styles = ['Cosmic Cyber', 'Photoreal 8K', 'Studio Anime', 'Angkor Silk Art', 'Cinematic 3D', 'Vaporwave'];
  const aspects = ['16:9 Cinema', '1:1 Square', '9:16 Mobile Story', '4:3 Classic'];
  const resolutions = ['1080p Standard', '4K UHD Neural', '8K Masterpiece (VIP)'];

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setGeneratedCount((c) => c + 1);
    }, 1200);
  };

  return (
    <div className="space-y-4">
      {/* Studio Header Card */}
      <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-purple-950/40 via-slate-900 to-indigo-950/40 border border-purple-500/40 flex items-center justify-between">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
            <span>Image Studio · 8K AI Canvas</span>
            <span className="text-[10px] font-mono text-purple-300 bg-purple-500/20 px-2 py-0.5 rounded-full border border-purple-500/30">
              Flux / Midjourney Engine
            </span>
          </h3>
          <p className="text-xs text-slate-400 font-khmer mt-0.5">
            បង្កើតរូបភាពសិល្បៈឌីជីថលកម្រិតខ្ពស់ពីការពិពណ៌នាជាអក្សរ ដោយឥតដែនកំណត់
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-purple-300 bg-black/40 px-3 py-1 rounded-xl border border-purple-500/20">
            {generatedCount} Rendered
          </span>
        </div>
      </div>

      {/* Prompt Composer */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <label className="font-semibold text-purple-300 font-khmer">
            ✍️ បញ្ចូលការពិពណ៌នារូបភាព (Detailed Visual Prompt):
          </label>
          <button
            onClick={() =>
              setPrompt(
                'Golden hour sunlight piercing through misty rainforest of Bokor Mountain with futuristic eco-city towers, ultra high detail 8k concept art'
              )
            }
            className="text-[11px] text-purple-400 hover:text-purple-300 hover:underline"
          >
            🎲 Random Concept
          </button>
        </div>

        <textarea
          rows={3}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="w-full bg-black/60 border border-purple-900/60 rounded-2xl p-3 text-xs sm:text-sm text-white focus:outline-none focus:border-purple-400 resize-none font-sans leading-relaxed"
        />
      </div>

      {/* Style & Setting Selectors */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Visual Styles */}
        <div className="p-3 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-1.5">
          <span className="text-[11px] font-semibold text-slate-400 block">Artistic Style:</span>
          <div className="flex flex-wrap gap-1.5">
            {styles.map((s) => (
              <button
                key={s}
                onClick={() => setStyle(s)}
                className={`px-2.5 py-1 rounded-lg text-[10px] font-medium transition-all ${
                  style === s
                    ? 'bg-purple-600 text-white shadow-[0_0_10px_rgba(168,85,247,0.5)]'
                    : 'bg-black/40 text-slate-400 hover:text-white'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Aspect Ratio */}
        <div className="p-3 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-1.5">
          <span className="text-[11px] font-semibold text-slate-400 block">Aspect Ratio:</span>
          <div className="flex flex-wrap gap-1.5">
            {aspects.map((a) => (
              <button
                key={a}
                onClick={() => setAspect(a)}
                className={`px-2.5 py-1 rounded-lg text-[10px] font-medium transition-all ${
                  aspect === a
                    ? 'bg-purple-600 text-white'
                    : 'bg-black/40 text-slate-400 hover:text-white'
                }`}
              >
                {a}
              </button>
            ))}
          </div>
        </div>

        {/* Output Resolution */}
        <div className="p-3 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-1.5">
          <span className="text-[11px] font-semibold text-slate-400 block">Resolution:</span>
          <div className="flex flex-wrap gap-1.5">
            {resolutions.map((r) => (
              <button
                key={r}
                onClick={() => {
                  if (r.includes('VIP') && !isVipActive) {
                    onOpenVip();
                  } else {
                    setResolution(r);
                  }
                }}
                className={`px-2.5 py-1 rounded-lg text-[10px] font-medium transition-all ${
                  resolution === r
                    ? 'bg-purple-600 text-white'
                    : 'bg-black/40 text-slate-400 hover:text-white'
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Large Generated Canvas Viewport */}
      <div className="relative w-full h-64 sm:h-80 rounded-3xl overflow-hidden border border-purple-500/40 bg-gradient-to-tr from-purple-950 via-slate-950 to-indigo-950 flex flex-col items-center justify-center p-6 shadow-2xl">
        {isGenerating ? (
          <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 border-4 border-purple-400 border-t-transparent rounded-full animate-spin" />
            <div className="text-center">
              <span className="text-sm font-bold text-purple-200 block font-mono">
                Synthesizing Neural Diffusion Latents...
              </span>
              <span className="text-xs text-slate-400">Rendering 50 Steps · High Dynamic Range</span>
            </div>
          </div>
        ) : (
          <div className="relative z-10 text-center max-w-lg space-y-2">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-purple-500/20 border border-purple-400/40 flex items-center justify-center text-purple-300 shadow-[0_0_30px_rgba(168,85,247,0.5)]">
              <ImageIcon className="w-8 h-8" />
            </div>
            <h4 className="text-base sm:text-lg font-bold text-white">
              Masterpiece Rendered ({resolution})
            </h4>
            <p className="text-xs text-slate-300 line-clamp-2 italic">
              "{prompt}"
            </p>
            <div className="flex items-center justify-center gap-2 pt-2">
              <span className="px-2.5 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-mono border border-purple-500/30">
                {style} · {aspect}
              </span>
              <button
                onClick={() => alert('Image saved to downloads in 8K resolution!')}
                className="px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Save 8K</span>
              </button>
            </div>
          </div>
        )}

        {/* Ambient grid overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(6,9,15,0.8)_100%)] pointer-events-none" />
      </div>

      {/* Primary Action Button */}
      <button
        onClick={handleGenerate}
        disabled={isGenerating}
        type="button"
        className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-sm sm:text-base tracking-wide transition-all shadow-[0_0_25px_rgba(168,85,247,0.5)] active:scale-[0.98] flex items-center justify-center gap-2"
      >
        <Sparkles className="w-4 h-4 fill-white" />
        <span>{isGenerating ? 'កំពុងបង្កើតរូបភាព 8K...' : 'Generate 8K Masterpiece Now'}</span>
      </button>
    </div>
  );
};

/* ========================================================================
   04. PHOTO ENHANCER (FULL-SCREEN 4K INTERACTIVE SPLIT COMPARISON)
   ======================================================================== */
const PhotoEnhancerSandbox: React.FC<{ onOpenVip: () => void; isVipActive?: boolean }> = ({
  onOpenVip,
  isVipActive,
}) => {
  const [sliderPos, setSliderPos] = useState(50);
  const [mode, setMode] = useState<'4k' | 'face' | 'denoise'>('4k');

  return (
    <div className="space-y-4">
      {/* Enhancer Hero Header */}
      <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-cyan-950/40 via-slate-900 to-blue-950/40 border border-cyan-500/40 flex items-center justify-between">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
            <span>4K Photo Enhancer & Upscaler</span>
            <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-mono text-[10px] font-bold border border-cyan-500/30">
              ESRGAN 4X Core
            </span>
          </h3>
          <p className="text-xs text-slate-400 font-khmer mt-0.5">
            បង្កើនគុណភាពរូបភាពចាស់ៗ ព្រាលៗ ឬបែក ឱ្យឡើងច្បាស់ក្រឡែតកម្រិត 4K Ultra HD
          </p>
        </div>

        <div className="text-right">
          <span className="text-[10px] text-slate-400 font-mono block">Clarity Ratio</span>
          <span className="text-base sm:text-lg font-black text-cyan-300 font-mono">+400%</span>
        </div>
      </div>

      {/* Enhancer Mode Toggle */}
      <div className="grid grid-cols-3 gap-2">
        {[
          { id: '4k', label: '4K Ultra Upscale', desc: 'បង្កើនទំហំ 4x & គែមច្បាស់' },
          { id: 'face', label: 'Face AI Restore', desc: 'ជួសជុលផ្ទៃមុខ & ភ្នែក' },
          { id: 'denoise', label: 'Studio Denoise', desc: 'លុបចំណុចអុច & សំឡេងគ្រាប់' },
        ].map((m) => (
          <button
            key={m.id}
            onClick={() => setMode(m.id as any)}
            className={`p-3 rounded-2xl border text-left transition-all ${
              mode === m.id
                ? 'bg-cyan-500/20 border-cyan-400 text-white shadow-[0_0_15px_rgba(6,182,212,0.3)]'
                : 'bg-slate-900/70 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            <h5 className="text-xs font-bold text-cyan-300">{m.label}</h5>
            <p className="text-[10px] text-slate-400 font-khmer mt-0.5">{m.desc}</p>
          </button>
        ))}
      </div>

      {/* Large Interactive Split Comparison Viewport */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-slate-300 px-1 font-mono">
          <span className="text-slate-400">◄ ORIGINAL 720p (BLURRY)</span>
          <span className="text-cyan-400 font-bold">4K NEURAL RESTORED ({sliderPos}%) ►</span>
        </div>

        <div className="relative w-full h-72 sm:h-96 rounded-3xl overflow-hidden border border-cyan-500/40 select-none shadow-2xl">
          {/* Background: Original Image simulation (Blurry) */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-blue-950 flex items-center justify-center p-6 filter blur-[2px] opacity-75">
            <div className="text-center space-y-1">
              <Camera className="w-12 h-12 text-slate-600 mx-auto" />
              <span className="text-xs text-slate-400 block font-mono">720p · LOW BITRATE</span>
              <span className="text-2xl font-bold text-slate-500">Original Unprocessed</span>
            </div>
          </div>

          {/* Foreground: 4K Crisp Restored Image clipped by slider */}
          <div
            className="absolute inset-0 bg-gradient-to-br from-cyan-950 via-slate-900 to-blue-900 flex items-center justify-center p-6 border-r-2 border-cyan-300 shadow-[0_0_20px_rgba(6,182,212,0.8)]"
            style={{ width: `${sliderPos}%`, overflow: 'hidden' }}
          >
            <div className="text-center min-w-[320px] space-y-1">
              <Sparkles className="w-12 h-12 text-cyan-400 mx-auto drop-shadow-[0_0_15px_#22d3ee]" />
              <span className="text-xs text-cyan-300 block font-mono font-bold drop-shadow-[0_0_8px_#22d3ee]">
                4K ULTRA NEURAL RESTORED
              </span>
              <span className="text-2xl font-black text-white tracking-wider">
                Crystal Clear 4K
              </span>
            </div>
          </div>

          {/* Draggable Divider Handle */}
          <div
            className="absolute top-0 bottom-0 w-1 bg-cyan-400 cursor-ew-resize flex items-center justify-center shadow-lg"
            style={{ left: `${sliderPos}%` }}
          >
            <div className="w-7 h-7 rounded-full bg-cyan-400 text-slate-950 font-black flex items-center justify-center text-xs shadow-[0_0_15px_#22d3ee] -ml-0.5">
              ↔
            </div>
          </div>
        </div>

        {/* Range Slider Controller */}
        <input
          type="range"
          min="5"
          max="95"
          value={sliderPos}
          onChange={(e) => setSliderPos(Number(e.target.value))}
          className="w-full accent-cyan-400 cursor-pointer h-2 bg-slate-800 rounded-lg"
        />
      </div>

      {/* Export & Actions */}
      <div className="flex flex-col sm:flex-row gap-2 pt-2">
        <button
          onClick={() => alert('Loaded sample image into 4K enhancer!')}
          type="button"
          className="flex-1 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-bold text-xs flex items-center justify-center gap-2"
        >
          <Upload className="w-4 h-4 text-cyan-400" />
          <span>Upload Own Photo (PNG/JPG)</span>
        </button>

        <button
          onClick={() => alert('Enhanced 4K photo downloaded successfully!')}
          type="button"
          className="flex-1 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-slate-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(6,182,212,0.4)]"
        >
          <Download className="w-4 h-4 stroke-[2.5]" />
          <span>Download 4K Ultra Image</span>
        </button>
      </div>
    </div>
  );
};

/* ========================================================================
   05. AI VOICE (FULL-SCREEN MULTI-VOICE SOUND LAB)
   ======================================================================== */
const AiVoiceSandbox: React.FC<{ onOpenVip: () => void }> = ({ onOpenVip }) => {
  const [selectedVoice, setSelectedVoice] = useState('Sophea (ខ្មែរ - នារី)');
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState('1.0x');
  const [text, setText] = useState(
    'សូមស្វាគមន៍មកកាន់ OmniAI! ម៉ាស៊ីនសំឡេងឆ្លាតវៃអាចបន្លឺសំឡេងធម្មជាតិ ផ្អែមល្ហែម និងច្បាស់ល្អ សម្រាប់ធ្វើមាតិកាវីដេអូ សៀវភៅជាសំឡេង និងការអប់រំ។'
  );

  const voices = [
    { name: 'Sophea (ខ្មែរ - នារី)', flag: '🇰🇭', tag: 'Natural Khmer Female' },
    { name: 'Kosal (ខ្មែរ - បុរស)', flag: '🇰🇭', tag: 'Deep Khmer Male' },
    { name: 'Marcus (US English)', flag: '🇺🇸', tag: 'Executive English' },
    { name: 'Yuki (Japanese)', flag: '🇯🇵', tag: 'Tokyo Native Voice' },
    { name: 'Clara (French)', flag: '🇫🇷', tag: 'Parisian French' },
  ];

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="space-y-4">
      {/* Studio Header Card */}
      <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-purple-950/40 via-slate-900 to-cyan-950/40 border border-purple-500/30 flex items-center justify-between">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
            <span>Studio AI Voice · Multilingual Synthesizer</span>
            <span className="text-[10px] font-mono text-cyan-300 bg-cyan-500/20 px-2 py-0.5 rounded-full border border-cyan-500/30">
              48kHz Studio Quality
            </span>
          </h3>
          <p className="text-xs text-slate-400 font-khmer mt-0.5">
            បំប្លែងអត្ថបទទៅជាសំឡេងនិយាយធម្មជាតិរស់រវើក មិនរឹង មិនដូចរ៉ូបូត
          </p>
        </div>

        <button
          onClick={onOpenVip}
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 text-amber-300 border border-amber-500/30 text-xs font-bold"
        >
          <Crown className="w-3.5 h-3.5 text-amber-400" />
          <span>Voice Clones</span>
        </button>
      </div>

      {/* Animated Soundwave Visualizer Canvas */}
      <div className="h-32 rounded-3xl bg-black/60 border border-purple-500/30 flex flex-col items-center justify-center gap-3 p-4 shadow-inner">
        <div className="flex items-center justify-center gap-1 sm:gap-1.5 h-16 w-full max-w-md px-4">
          {[16, 32, 48, 64, 38, 55, 78, 45, 30, 60, 72, 35, 22, 50, 65, 42, 28, 58, 70, 36, 20].map(
            (h, i) => (
              <div
                key={i}
                className={`w-1.5 sm:w-2 rounded-full bg-gradient-to-t from-purple-500 to-cyan-400 transition-all duration-150 ${
                  isPlaying ? 'animate-pulse' : 'opacity-35'
                }`}
                style={{
                  height: isPlaying
                    ? `${Math.max(14, (h * 1.3) % 70)}px`
                    : `${h * 0.35}px`,
                }}
              />
            )
          )}
        </div>

        <div className="flex items-center justify-between w-full max-w-md px-2 text-[11px] text-slate-400 font-mono">
          <span>00:14 / 01:30</span>
          <span className="text-cyan-400 font-semibold">{selectedVoice}</span>
          <span>48kHz · STEREO</span>
        </div>
      </div>

      {/* Voice Selection Cards */}
      <div className="space-y-1.5">
        <span className="text-xs font-semibold text-slate-300 font-khmer block px-1">
          🎙️ ជ្រើសរើសសំឡេងតួអង្គ (Voice Persona):
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {voices.map((v) => (
            <button
              key={v.name}
              onClick={() => setSelectedVoice(v.name)}
              className={`p-3 rounded-2xl text-left border transition-all ${
                selectedVoice === v.name
                  ? 'bg-purple-600/20 border-purple-400 text-white shadow-[0_0_15px_rgba(168,85,247,0.3)]'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-base">{v.flag}</span>
                <span className="text-xs font-bold text-slate-200">{v.name}</span>
              </div>
              <span className="text-[10px] text-slate-400 block truncate">{v.tag}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Text Area */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-slate-300 font-khmer block px-1">
          📝 អត្ថបទត្រូវបញ្ចេញសំឡេង (Script to Synthesize):
        </label>
        <textarea
          rows={3}
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full bg-black/60 border border-slate-700/80 rounded-2xl p-3.5 text-xs sm:text-sm text-white focus:outline-none focus:border-cyan-400 font-khmer resize-none leading-relaxed"
        />
      </div>

      {/* Action Play / Synthesize */}
      <button
        onClick={togglePlay}
        type="button"
        className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 via-cyan-600 to-blue-600 hover:from-purple-500 hover:to-cyan-500 text-white font-bold text-sm tracking-wide flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(6,182,212,0.4)] active:scale-95 transition-all"
      >
        {isPlaying ? (
          <>
            <Pause className="w-4 h-4 fill-white" />
            <span>ផ្អាកការចាក់សំឡេង (Pause Synthesis)</span>
          </>
        ) : (
          <>
            <Play className="w-4 h-4 fill-white" />
            <span>បន្លឺសំឡេងជាមួយ {selectedVoice} →</span>
          </>
        )}
      </button>
    </div>
  );
};

/* ========================================================================
   06. VIDEO GENERATOR (FULL-SCREEN 60FPS STORYBOARD RIG)
   ======================================================================== */
const VideoGenSandbox: React.FC<{ onOpenVip: () => void; isVipActive?: boolean }> = ({
  onOpenVip,
  isVipActive,
}) => {
  const [scenePrompt, setScenePrompt] = useState(
    'Cinematic aerial drone flight sweeping over the ancient stone faces of Bayon temple emerging through morning rainforest mist, golden sunrise lighting, 60fps ultra smooth'
  );
  const [cameraRig, setCameraRig] = useState('Drone 360 Orbit');
  const [fps, setFps] = useState('60 FPS');

  return (
    <div className="space-y-4">
      <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-fuchsia-950/40 via-slate-900 to-purple-950/40 border border-fuchsia-500/40 flex items-center justify-between">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
            <span>Video Generator 60FPS</span>
            <span className="text-[10px] font-mono text-fuchsia-300 bg-fuchsia-500/20 px-2 py-0.5 rounded-full border border-fuchsia-500/30">
              Sora / Runway Gen-3
            </span>
          </h3>
          <p className="text-xs text-slate-400 font-khmer mt-0.5">
            បង្កើតវីដេអូភាពយន្តកម្រិត 4K ពីអក្សរ គ្រប់គ្រងចលនាកាមេរ៉ា និងពន្លឺយ៉ាងរស់រវើក
          </p>
        </div>

        <span className="px-3 py-1 rounded-xl bg-fuchsia-500/20 text-fuchsia-300 font-mono text-xs font-bold border border-fuchsia-500/40">
          60 FPS UHD
        </span>
      </div>

      {/* Camera Rig Selectors */}
      <div className="p-3.5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-2">
        <span className="text-xs font-semibold text-fuchsia-300 block font-khmer">
          🎥 កំណត់ចលនាកាមេរ៉ា (Camera Motion & Rig):
        </span>
        <div className="flex flex-wrap gap-2">
          {['Drone 360 Orbit', 'Dolly Zoom (Vertigo)', 'First-Person FPV', 'Cinematic Pan Right'].map(
            (c) => (
              <button
                key={c}
                onClick={() => setCameraRig(c)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                  cameraRig === c
                    ? 'bg-fuchsia-600 text-white shadow-[0_0_12px_rgba(217,70,239,0.5)]'
                    : 'bg-black/50 text-slate-400 hover:text-white'
                }`}
              >
                {c}
              </button>
            )
          )}
        </div>
      </div>

      {/* Video Storyboard Viewport */}
      <div className="relative w-full h-64 sm:h-80 rounded-3xl overflow-hidden border border-fuchsia-500/40 bg-gradient-to-tr from-fuchsia-950 via-slate-950 to-purple-950 flex flex-col items-center justify-center p-6 text-center shadow-2xl">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-fuchsia-500/20 border border-fuchsia-400/40 flex items-center justify-center text-fuchsia-300 shadow-[0_0_30px_rgba(217,70,239,0.5)] mb-3">
          <Film className="w-8 h-8" />
        </div>
        <h4 className="text-base sm:text-lg font-bold text-white">
          Scene 1: {cameraRig} Ready
        </h4>
        <p className="text-xs text-slate-300 max-w-md line-clamp-2 mt-1 italic">
          "{scenePrompt}"
        </p>

        {/* Timeline progress indicator */}
        <div className="w-full max-w-sm mt-4 bg-slate-800/80 h-2 rounded-full overflow-hidden">
          <div className="w-4/5 h-full bg-gradient-to-r from-fuchsia-500 to-purple-500 animate-pulse" />
        </div>
        <span className="text-[10px] text-fuchsia-300 font-mono mt-1.5">
          60 FPS · 3840 x 2160 · 10-bit HDR
        </span>
      </div>

      <button
        onClick={onOpenVip}
        type="button"
        className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-fuchsia-600 via-purple-600 to-fuchsia-600 text-white font-bold text-sm tracking-wide shadow-[0_0_25px_rgba(217,70,239,0.5)] active:scale-95 transition-all flex items-center justify-center gap-2"
      >
        <Zap className="w-4 h-4 fill-white" />
        <span>Generate 4K Cinematic Video (VIP Queue)</span>
      </button>
    </div>
  );
};

/* ========================================================================
   07. CHAT WITH PDF (FULL-SCREEN DOCUMENT INTELLIGENCE)
   ======================================================================== */
const ChatPdfSandbox: React.FC<{ onOpenVip: () => void }> = ({ onOpenVip }) => {
  const [query, setQuery] = useState('');
  const [qaList, setQaList] = useState([
    {
      q: 'តើអ្វីជាគោលបំណងសំខាន់នៃឯកសារ Cambodia AI Roadmap 2030?',
      a: 'ឯកសារនេះផ្តោតលើការកសាងអធិបតេយ្យភាពឌីជីថល ការអភិវឌ្ឍប្រព័ន្ធភាសាជាតិ LangGo និងការបណ្តុះបណ្តាលធនធានមនុស្សលើបច្ចេកវិទ្យា AI កម្រិតខ្ពស់។',
      ref: 'ទំព័រទី ៤ · ជំពូកទី ១',
    },
  ]);

  const handleAsk = () => {
    if (!query.trim()) return;
    setQaList((prev) => [
      ...prev,
      {
        q: query,
        a: `ការស្រង់ទិន្នន័យពីឯកសារលើសំណួរ "${query}": ប្រព័ន្ធបានរកឃើញចម្លើយនៅក្នុងផ្នែកយុទ្ធសាស្ត្រគន្លឹះ ដោយមានកម្រិតភាពជឿជាក់ ៩៩.៤%។`,
        ref: 'ទំព័រទី ១៨ · យុទ្ធសាស្ត្រគន្លឹះ',
      },
    ]);
    setQuery('');
  };

  return (
    <div className="space-y-4">
      <div className="p-4 sm:p-5 rounded-3xl bg-blue-950/40 border border-blue-500/40 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-blue-500/20 border border-blue-400/40 flex items-center justify-center text-blue-300">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Cambodia_Super_AI_Roadmap_2030.pdf</h3>
            <span className="text-xs text-slate-400">42 Pages · 12,400 Tokens Indexed · OCR Complete</span>
          </div>
        </div>
        <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/40">
          Active PDF
        </span>
      </div>

      {/* Q&A Thread */}
      <div className="space-y-3 min-h-[220px] max-h-[380px] overflow-y-auto no-scrollbar p-3 rounded-2xl bg-black/40 border border-slate-800">
        {qaList.map((item, idx) => (
          <div key={idx} className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1.5 font-khmer">
            <p className="text-xs sm:text-sm font-bold text-blue-300">❓ {item.q}</p>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">💡 {item.a}</p>
            <span className="text-[10px] font-mono text-cyan-400 block pt-1 border-t border-slate-800">
              📌 ប្រភពយោង: {item.ref}
            </span>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          placeholder="សួរសំណួរណាមួយអំពីឯកសារ PDF នេះ..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAsk()}
          className="flex-1 bg-black/60 border border-slate-700/80 rounded-2xl px-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-blue-400 font-khmer"
        />
        <button
          onClick={handleAsk}
          className="px-5 py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm"
        >
          សួរឆ្លើយ
        </button>
      </div>
    </div>
  );
};

/* ========================================================================
   08. SNAP & SOLVE (FULL-SCREEN EQUATION SOLVER & VISUALIZER)
   ======================================================================== */
const SnapSolveSandbox: React.FC = () => {
  const [selectedFormula, setSelectedFormula] = useState('E = mc²');

  const formulas = [
    {
      eq: 'E = mc²',
      name: 'Einstein Mass-Energy Equivalence',
      step1: 'Identify Rest Mass: m = 1.0 kg',
      step2: 'Speed of Light: c ≈ 2.998 × 10⁸ m/s',
      result: 'Energy: E = (1.0)(2.998 × 10⁸)² = 8.987 × 10¹⁶ Joules',
    },
    {
      eq: 'F = ma',
      name: 'Newton’s Second Law of Motion',
      step1: 'Mass m = 50 kg, Acceleration a = 9.8 m/s²',
      step2: 'Multiply mass vector by acceleration scalar',
      result: 'Net Force: F = 490 Newtons',
    },
    {
      eq: 'x = (-b ± √(b²-4ac)) / 2a',
      name: 'Quadratic Equation Solver',
      step1: 'Compute discriminant Δ = b² - 4ac',
      step2: 'Evaluate square root and split branches',
      result: 'Dual real roots verified instantly',
    },
  ];

  const current = formulas.find((f) => f.eq === selectedFormula) || formulas[0];

  return (
    <div className="space-y-4">
      <div className="p-4 sm:p-5 rounded-3xl bg-cyan-950/40 border border-cyan-500/40 flex items-center justify-between">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
            <span>Snap & Solve · Math & Science AI</span>
            <span className="text-xs text-cyan-300 font-mono">LaTeX Engine</span>
          </h3>
          <p className="text-xs text-slate-400 font-khmer mt-0.5">
            ដោះស្រាយលំហាត់គណិតវិទ្យា រូបវិទ្យា និងគីមីវិទ្យា មួយជំហានម្តងៗយ៉ាងលម្អិត
          </p>
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto no-scrollbar">
        {formulas.map((f) => (
          <button
            key={f.eq}
            onClick={() => setSelectedFormula(f.eq)}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
              selectedFormula === f.eq
                ? 'bg-cyan-500 text-slate-950 shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            {f.eq}
          </button>
        ))}
      </div>

      <div className="p-5 rounded-3xl bg-black/50 border border-cyan-500/30 space-y-3">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <span className="text-sm font-bold text-white">{current.name}</span>
          <span className="font-mono text-cyan-300 text-base font-black">{current.eq}</span>
        </div>

        <div className="space-y-2 font-mono text-xs sm:text-sm">
          <div className="p-3 rounded-xl bg-slate-900/80 text-slate-300">
            Step 1: {current.step1}
          </div>
          <div className="p-3 rounded-xl bg-slate-900/80 text-slate-300">
            Step 2: {current.step2}
          </div>
          <div className="p-3.5 rounded-xl bg-cyan-500/10 border border-cyan-500/40 text-cyan-300 font-bold">
            💡 Final Result: {current.result}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ========================================================================
   09. CONTENT WRITER (FULL-SCREEN GOLDEN PEN WORKSPACE)
   ======================================================================== */
const ContentWriterSandbox: React.FC<{ onOpenVip: () => void }> = ({ onOpenVip }) => {
  const [topic, setTopic] = useState('យុទ្ធសាស្ត្រចាប់ផ្តើមអាជីវកម្ម Startup ក្នុងយុគសម័យ AI នៅកម្ពុជា');
  const [output, setOutput] = useState(
    'នៅក្នុងយុគសម័យនៃបញ្ញាសិប្បនិម្មិត (AI) ការចាប់ផ្តើមអាជីវកម្ម Startup នៅកម្ពុជាមិនត្រឹមតែជាឱកាសប៉ុណ្ណោះទេ ប៉ុន្តែជាកម្លាំងចលករក្នុងការផ្លាស់ប្តូរសេដ្ឋកិច្ចឌីជីថល។ តាមរយៈការរួមបញ្ចូលគ្នានៃទិន្នន័យមូលដ្ឋាន និងបច្ចេកវិទ្យាទំនើប សហគ្រិនខ្មែរអាចពង្រីកសក្តានុពលរបស់ខ្លួនទៅកាន់ទីផ្សារពិភពលោកបានយ៉ាងលឿនរហ័ស...'
  );
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      <div className="p-4 sm:p-5 rounded-3xl bg-amber-950/40 border border-amber-500/40 flex items-center justify-between">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
            <span>Golden Pen Content Writer</span>
            <span className="text-xs text-amber-300 font-mono">A18 Copy Engine</span>
          </h3>
          <p className="text-xs text-slate-400 font-khmer mt-0.5">
            តែងអត្ថបទ រៀបចំពាក្យពេចន៍ និងបង្កើតមាតិកាផ្សព្វផ្សាយបែបប្រណីត
          </p>
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-amber-300 font-khmer block px-1">
          📌 ប្រធានបទ ឬចំណងជើងអត្ថបទ (Topic Brief):
        </label>
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="w-full bg-black/60 border border-amber-500/40 rounded-2xl px-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400 font-khmer"
        />
      </div>

      <div className="p-5 rounded-3xl bg-black/50 border border-amber-500/30 space-y-2">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
            អត្ថបទដែលបានបង្កើត (Generated Draft)
          </span>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-500/20 text-amber-300 hover:text-white text-xs font-bold"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'បានចម្លង!' : 'ចម្លងអត្ថបទ'}</span>
          </button>
        </div>

        <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-khmer whitespace-pre-line py-2">
          {output}
        </p>
      </div>
    </div>
  );
};

/* ========================================================================
   10. CV BUILDER (FULL-SCREEN ATS EXECUTIVE RESUME STUDIO)
   ======================================================================== */
const CvBuilderSandbox: React.FC<{ onOpenVip: () => void; isVipActive?: boolean }> = ({
  onOpenVip,
  isVipActive = false,
}) => {
  const [atsScore, setAtsScore] = useState(94);
  const [isExported, setIsExported] = useState(false);

  const handleExport = () => {
    if (!isVipActive) {
      onOpenVip();
    } else {
      setIsExported(true);
      setTimeout(() => setIsExported(false), 3000);
    }
  };

  return (
    <div className="space-y-4">
      {/* Score Hero Gauge */}
      <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-amber-950/40 via-slate-900 to-black border border-amber-500/40 flex items-center justify-between">
        <div>
          <span className="text-xs font-bold uppercase text-amber-400 tracking-wider block mb-1">
            ATS Recruiter Score
          </span>
          <div className="text-3xl sm:text-4xl font-black text-white font-mono">{atsScore} / 100</div>
          <span className="text-xs text-amber-300 font-medium">★★★★ Top 2% Tier Candidates Worldwide</span>
        </div>

        <div className="w-20 h-20 rounded-full border-4 border-amber-400/80 flex items-center justify-center font-bold text-lg text-white shadow-[0_0_25px_rgba(245,158,11,0.4)]">
          94%
        </div>
      </div>

      {/* Recruiter Metrics Breakdown */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-3.5 rounded-2xl bg-black/40 border border-slate-800">
          <span className="text-xs text-slate-400 block mb-1">Keyword Optimization</span>
          <span className="text-base font-bold text-emerald-400 font-mono">100% Passed</span>
        </div>
        <div className="p-3.5 rounded-2xl bg-black/40 border border-slate-800">
          <span className="text-xs text-slate-400 block mb-1">Formatting Invariants</span>
          <span className="text-base font-bold text-emerald-400 font-mono">Compliant</span>
        </div>
        <div className="p-3.5 rounded-2xl bg-black/40 border border-slate-800">
          <span className="text-xs text-slate-400 block mb-1">Impact Metrics</span>
          <span className="text-base font-bold text-amber-300 font-mono">High Impact</span>
        </div>
      </div>

      {isExported && (
        <div className="p-3 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs sm:text-sm flex items-center gap-2 font-khmer">
          <Check className="w-5 h-5 stroke-[3] text-emerald-400" />
          <span>ឯកសារ ATS Resume ត្រូវបានទាញយកដោយជោគជ័យជាទម្រង់ PDF!</span>
        </div>
      )}

      {/* Export Action */}
      <button
        onClick={handleExport}
        type="button"
        className={`w-full py-3.5 rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-lg active:scale-95 ${
          isVipActive
            ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 shadow-[0_0_20px_rgba(16,185,129,0.5)]'
            : 'bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-slate-950 shadow-[0_0_20px_rgba(245,158,11,0.5)]'
        }`}
      >
        {isVipActive ? (
          <>
            <Check className="w-4 h-4 stroke-[3]" />
            <span>ទាញយក Executive ATS Resume (PDF)</span>
          </>
        ) : (
          <>
            <Crown className="w-4 h-4" />
            <span>Export Executive ATS PDF (VIP 🔒)</span>
          </>
        )}
      </button>
    </div>
  );
};
