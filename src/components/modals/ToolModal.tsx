import React, { useState } from 'react';
import {
  X,
  Sparkles,
  Volume2,
  Send,
  Sliders,
  Copy,
  Check,
  Play,
  RotateCcw,
  Zap,
  ArrowRight,
  Upload,
  Crown,
  Share2,
} from 'lucide-react';
import { ToolItem } from '../../data/toolsData';
import { LangGoHub } from './LangGoHub';

interface ToolModalProps {
  tool: ToolItem | null;
  onClose: () => void;
  onOpenVip: () => void;
  isVipActive?: boolean;
}

export const ToolModal: React.FC<ToolModalProps> = ({ tool, onClose, onOpenVip, isVipActive = false }) => {
  if (!tool) return null;

  // Sub-component state for each tool
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className={`relative w-full ${tool.id === 'langgo' ? 'max-w-3xl sm:max-w-4xl' : 'max-w-xl'} max-h-[90vh] rounded-3xl bg-[#090d16] border border-slate-700/80 p-4 sm:p-5 shadow-2xl flex flex-col justify-between text-slate-100 overflow-hidden`}>
        {/* Modal Top Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded-md border border-cyan-500/30">
              {tool.num}
            </span>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="text-base font-bold text-white tracking-tight">
                  {tool.id === 'langgo' ? 'LangGo · រៀនគ្រប់ភាសា' : tool.title}
                </h3>
                {tool.isVip && (
                  <span className={`px-1.5 py-0.5 rounded-full text-[9px] font-bold border ${
                    isVipActive 
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' 
                      : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                  }`}>
                    {isVipActive ? 'VIP UNLOCKED' : 'VIP'}
                  </span>
                )}
              </div>
              <span className="text-[10px] text-slate-400 font-medium">
                {tool.category} Studio
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: Custom Interactive Sandbox per tool */}
        <div className="flex-1 overflow-y-auto py-3 pr-1 space-y-3 no-scrollbar text-xs">
          {tool.id === 'langgo' && <LangGoHub onOpenVip={onOpenVip} isVipActive={isVipActive} />}
          {tool.id === 'kchat' && <KChatSandbox />}
          {tool.id === 'imagestudio' && <ImageStudioSandbox />}
          {tool.id === 'photoenhancer' && <PhotoEnhancerSandbox />}
          {tool.id === 'aivoice' && <AiVoiceSandbox />}
          {tool.id === 'videogenerator' && <VideoGenSandbox onOpenVip={onOpenVip} />}
          {tool.id === 'chatpdf' && <ChatPdfSandbox />}
          {tool.id === 'snapsolve' && <SnapSolveSandbox />}
          {tool.id === 'contentwriter' && <ContentWriterSandbox />}
          {tool.id === 'cvbuilder' && <CvBuilderSandbox onOpenVip={onOpenVip} isVipActive={isVipActive} />}
        </div>

        {/* Modal Bottom Close / Done bar */}
        <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
          <span>OmniAI Interactive Engine</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium transition-colors"
          >
            Back to Grid
          </button>
        </div>
      </div>
    </div>
  );
};

/* 02. K-Chat AI Assistant */
const KChatSandbox: React.FC = () => {
  const [messages, setMessages] = useState([
    { sender: 'ai', text: 'Hi! I am K-Chat AI, your omni-assistant. How can I empower your creative workflow today?' },
  ]);
  const [input, setInput] = useState('');

  const suggestions = [
    'Explain quantum computing simply',
    'Write a poem about Angkor Wat',
    'Generate a 3-day travel itinerary in Cambodia',
  ];

  const handleSend = (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    setMessages((prev) => [...prev, { sender: 'user', text: query }]);
    setInput('');

    setTimeout(() => {
      let reply = `Here is your instant synthesis on "${query}": OmniAI processes this across 10 modular neural layers with 99.8% precision.`;
      if (query.toLowerCase().includes('angkor')) {
        reply = 'Angkor Wat rises from the morning mist like stone poetry—built in the 12th century under King Suryavarman II, its towers mirror Mount Meru, the cosmic center of the universe.';
      } else if (query.toLowerCase().includes('quantum')) {
        reply = 'Quantum computing leverages qubits that exist in superpositions of 0 and 1 simultaneously, unlocking parallel computation billions of times faster than classical transistors!';
      }
      setMessages((prev) => [...prev, { sender: 'ai', text: reply }]);
    }, 600);
  };

  return (
    <div className="flex flex-col h-64 justify-between space-y-2">
      <div className="flex-1 overflow-y-auto space-y-2 p-2 rounded-2xl bg-black/40 border border-slate-800 no-scrollbar">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] p-2.5 rounded-2xl text-xs leading-relaxed ${
                m.sender === 'user'
                  ? 'bg-cyan-600 text-white rounded-tr-none'
                  : 'bg-slate-800 text-slate-200 border border-slate-700/60 rounded-tl-none'
              }`}
            >
              {m.text}
            </div>
          </div>
        ))}
      </div>

      {/* Quick suggestions */}
      <div className="flex gap-1.5 overflow-x-auto no-scrollbar py-0.5">
        {suggestions.map((s, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(s)}
            className="text-[10px] text-cyan-300 bg-cyan-950/60 border border-cyan-800/80 px-2 py-1 rounded-full whitespace-nowrap hover:bg-cyan-900/60 transition-colors"
          >
            {s}
          </button>
        ))}
      </div>

      {/* Input */}
      <div className="flex gap-1.5">
        <input
          type="text"
          placeholder="Ask K-Chat anything..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          className="flex-1 bg-black/60 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
        />
        <button
          onClick={() => handleSend()}
          className="p-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold transition-transform active:scale-95"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

/* 03. Image Studio */
const ImageStudioSandbox: React.FC = () => {
  const [prompt, setPrompt] = useState('Glowing cosmic spiral galaxy with neon nebulas in 8K resolution');
  const [style, setStyle] = useState('Cosmic');
  const [isGenerating, setIsGenerating] = useState(false);

  const styles = ['Cosmic', 'Cyberpunk', 'Photoreal', 'Anime', 'Oil Art'];

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => setIsGenerating(false), 800);
  };

  return (
    <div className="space-y-3">
      <div className="space-y-1.5">
        <label className="text-[11px] font-semibold text-purple-300">Prompt Studio</label>
        <textarea
          rows={2}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="w-full bg-black/50 border border-purple-900/60 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-purple-400 resize-none"
        />
      </div>

      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
        {styles.map((s) => (
          <button
            key={s}
            onClick={() => setStyle(s)}
            className={`px-2.5 py-1 rounded-full text-[10px] font-medium transition-all ${
              style === s
                ? 'bg-purple-600 text-white shadow-[0_0_10px_rgba(168,85,247,0.5)]'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200'
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Generated Canvas Preview */}
      <div className="relative w-full h-36 rounded-2xl overflow-hidden border border-purple-500/40 bg-gradient-to-tr from-purple-950 via-slate-950 to-indigo-950 flex items-center justify-center">
        {isGenerating ? (
          <div className="flex flex-col items-center gap-2">
            <div className="w-6 h-6 border-2 border-purple-400 border-t-transparent rounded-full animate-spin" />
            <span className="text-[10px] text-purple-300 font-mono">Synthesizing Latents...</span>
          </div>
        ) : (
          <div className="text-center p-3">
            <Sparkles className="w-6 h-6 text-purple-400 mx-auto mb-1 animate-pulse" />
            <span className="text-xs font-semibold text-purple-200 block">Rendered in Ultra 8K</span>
            <span className="text-[10px] text-slate-400">"{style} · {prompt.slice(0, 36)}..."</span>
          </div>
        )}
      </div>

      <button
        onClick={handleGenerate}
        className="w-full py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs transition-all shadow-[0_0_15px_rgba(168,85,247,0.4)]"
      >
        {isGenerating ? 'Rendering...' : 'Generate 8K Masterpiece'}
      </button>
    </div>
  );
};

/* 04. Photo Enhancer Before/After Slider */
const PhotoEnhancerSandbox: React.FC = () => {
  const [sliderPos, setSliderPos] = useState(50);
  const [mode, setMode] = useState<'4k' | 'denoise' | 'face'>('4k');

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-[11px] text-slate-300">
        <span>Interactive Before / After 4K Comparison</span>
        <span className="font-mono text-cyan-400">{sliderPos}% 4K</span>
      </div>

      {/* Interactive Split View Box */}
      <div className="relative w-full h-40 rounded-2xl overflow-hidden border border-cyan-500/40 select-none">
        {/* Background "Original" Image simulation */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-blue-950 flex items-center justify-center p-4 filter blur-[1.5px] opacity-80">
          <div className="text-center">
            <span className="text-xs text-slate-400 block font-mono">ORIGINAL 720p (BLURRY)</span>
            <span className="text-xl font-bold text-slate-500">Low Fidelity Input</span>
          </div>
        </div>

        {/* Foreground "4K Enhanced" clipped by slider */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-cyan-950 via-slate-900 to-blue-900 flex items-center justify-center p-4 border-r-2 border-cyan-300"
          style={{ width: `${sliderPos}%`, overflow: 'hidden' }}
        >
          <div className="text-center min-w-[280px]">
            <span className="text-xs text-cyan-300 block font-mono font-bold drop-shadow-[0_0_8px_#22d3ee]">
              4K NEURAL ENHANCED
            </span>
            <span className="text-xl font-black text-white tracking-wider">Crisp 4K Resolution</span>
          </div>
        </div>

        {/* Draggable Divider Handle */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-cyan-400 cursor-ew-resize flex items-center justify-center"
          style={{ left: `${sliderPos}%` }}
        >
          <div className="w-5 h-5 rounded-full bg-cyan-400 text-slate-950 font-bold flex items-center justify-center text-[9px] shadow-lg -ml-0.5">
            ↔
          </div>
        </div>
      </div>

      <input
        type="range"
        min="5"
        max="95"
        value={sliderPos}
        onChange={(e) => setSliderPos(Number(e.target.value))}
        className="w-full accent-cyan-400 cursor-pointer"
      />

      <div className="grid grid-cols-3 gap-1.5 text-center">
        <button
          onClick={() => setMode('4k')}
          className={`p-2 rounded-xl border text-[11px] font-medium ${
            mode === '4k' ? 'bg-cyan-500/20 border-cyan-400 text-cyan-200' : 'bg-slate-900 border-slate-800 text-slate-400'
          }`}
        >
          4K Upscale
        </button>
        <button
          onClick={() => setMode('denoise')}
          className={`p-2 rounded-xl border text-[11px] font-medium ${
            mode === 'denoise' ? 'bg-cyan-500/20 border-cyan-400 text-cyan-200' : 'bg-slate-900 border-slate-800 text-slate-400'
          }`}
        >
          Studio Denoise
        </button>
        <button
          onClick={() => setMode('face')}
          className={`p-2 rounded-xl border text-[11px] font-medium ${
            mode === 'face' ? 'bg-cyan-500/20 border-cyan-400 text-cyan-200' : 'bg-slate-900 border-slate-800 text-slate-400'
          }`}
        >
          Face Restore
        </button>
      </div>
    </div>
  );
};

/* 05. AI Voice */
const AiVoiceSandbox: React.FC = () => {
  const [selectedVoice, setSelectedVoice] = useState('Sophea (Khmer)');
  const [isPlaying, setIsPlaying] = useState(false);
  const [text, setText] = useState('OmniAI synthesizes photorealistic voices across all dialects.');

  const voices = ['Sophea (Khmer)', 'Kosal (Khmer)', 'Marcus (English)', 'Clara (French)'];

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="space-y-3">
      {/* Animated Waveform Visualizer */}
      <div className="h-20 rounded-2xl bg-gradient-to-r from-purple-950/60 to-slate-900 border border-purple-500/30 flex items-center justify-center gap-1.5 px-4">
        {[14, 28, 45, 60, 32, 50, 72, 40, 25, 55, 65, 30, 20].map((h, i) => (
          <div
            key={i}
            className={`w-1.5 rounded-full bg-gradient-to-t from-purple-500 to-cyan-400 transition-all duration-150 ${
              isPlaying ? 'animate-pulse' : 'opacity-40'
            }`}
            style={{ height: isPlaying ? `${Math.max(12, (h * 1.2) % 65)}px` : `${h * 0.4}px` }}
          />
        ))}
      </div>

      <div className="space-y-1.5">
        <label className="text-[11px] font-semibold text-slate-300">Voice Persona</label>
        <div className="grid grid-cols-2 gap-1.5">
          {voices.map((v) => (
            <button
              key={v}
              onClick={() => setSelectedVoice(v)}
              className={`p-2 rounded-xl text-[11px] font-medium text-left border ${
                selectedVoice === v
                  ? 'bg-purple-600/20 border-purple-400 text-purple-200'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400'
              }`}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      <textarea
        rows={2}
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full bg-black/50 border border-slate-700 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-purple-400 resize-none"
      />

      <button
        onClick={togglePlay}
        className="w-full py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white font-bold text-xs flex items-center justify-center gap-2"
      >
        <Play className={`w-3.5 h-3.5 ${isPlaying ? 'animate-spin' : ''}`} />
        <span>{isPlaying ? 'Pause Synthesis' : `Generate Voice with ${selectedVoice}`}</span>
      </button>
    </div>
  );
};

/* 06. Video Generator */
const VideoGenSandbox: React.FC<{ onOpenVip: () => void }> = ({ onOpenVip }) => {
  const [scenePrompt, setScenePrompt] = useState('Drone flyover above the ancient temple of Angkor Wat illuminated by purple lightning at dusk');
  const [cameraMovement, setCameraMovement] = useState('Drone Orbit');

  return (
    <div className="space-y-3">
      <div className="p-3 rounded-2xl bg-gradient-to-br from-fuchsia-950/40 to-slate-900 border border-fuchsia-500/30">
        <div className="flex items-center justify-between text-[11px] text-fuchsia-300 mb-1.5">
          <span>Camera Direction</span>
          <span className="font-mono text-slate-400">60 FPS · 4K</span>
        </div>
        <div className="flex gap-1.5 overflow-x-auto no-scrollbar">
          {['Drone Orbit', 'Dolly Zoom', 'Fast Pan', 'First-Person'].map((c) => (
            <button
              key={c}
              onClick={() => setCameraMovement(c)}
              className={`px-2.5 py-1 rounded-full text-[10px] font-medium ${
                cameraMovement === c ? 'bg-fuchsia-600 text-white' : 'bg-black/50 text-slate-400'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <textarea
        rows={2}
        value={scenePrompt}
        onChange={(e) => setScenePrompt(e.target.value)}
        className="w-full bg-black/50 border border-slate-700 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-fuchsia-400 resize-none"
      />

      <div className="p-3 rounded-2xl bg-black/50 border border-fuchsia-500/20 text-center">
        <span className="text-[10px] text-slate-400 block mb-1">Storyboard Rendering Status</span>
        <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mb-2">
          <div className="w-3/4 h-full bg-gradient-to-r from-fuchsia-500 to-purple-500 animate-pulse" />
        </div>
        <span className="text-xs font-semibold text-fuchsia-200">
          Scene 1: {cameraMovement} Active
        </span>
      </div>

      <button
        onClick={onOpenVip}
        className="w-full py-2.5 rounded-xl bg-gradient-to-r from-fuchsia-600 to-purple-600 hover:from-fuchsia-500 hover:to-purple-500 text-white font-bold text-xs flex items-center justify-center gap-1.5"
      >
        <Zap className="w-3.5 h-3.5" />
        <span>Generate 4K Cinematic Scene</span>
      </button>
    </div>
  );
};

/* 07. Chat with PDF */
const ChatPdfSandbox: React.FC = () => {
  const [pdfQuery, setPdfQuery] = useState('');
  const [qaList, setQaList] = useState([
    {
      q: 'What is the summary of Cambodia AI Roadmap 2030?',
      a: 'The roadmap outlines digital sovereignty, multilingual NLP localization (LangGo), and cloud talent incubation.',
    },
  ]);

  const handleAsk = () => {
    if (!pdfQuery.trim()) return;
    setQaList((prev) => [
      ...prev,
      {
        q: pdfQuery,
        a: `Page 14 Reference: "${pdfQuery}" is addressed under Strategic Pillar 2, specifying automated OCR analysis.`,
      },
    ]);
    setPdfQuery('');
  };

  return (
    <div className="space-y-3">
      <div className="p-3 rounded-2xl bg-blue-950/40 border border-blue-500/30 flex items-center justify-between">
        <div>
          <h4 className="text-xs font-bold text-white">Cambodia_Super_AI_Roadmap.pdf</h4>
          <span className="text-[10px] text-slate-400">42 Pages · Indexed & Embeddings Ready</span>
        </div>
        <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
          Active
        </span>
      </div>

      <div className="space-y-2 max-h-36 overflow-y-auto no-scrollbar">
        {qaList.map((item, idx) => (
          <div key={idx} className="p-2 rounded-xl bg-black/40 border border-slate-800 space-y-1">
            <p className="text-[11px] font-semibold text-blue-300">Q: {item.q}</p>
            <p className="text-[11px] text-slate-300">A: {item.a}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-1.5">
        <input
          type="text"
          placeholder="Ask anything about the document..."
          value={pdfQuery}
          onChange={(e) => setPdfQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAsk()}
          className="flex-1 bg-black/60 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-blue-400"
        />
        <button
          onClick={handleAsk}
          className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs"
        >
          Ask
        </button>
      </div>
    </div>
  );
};

/* 08. Snap & Solve */
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
      step2: 'Multiply mass by acceleration vector',
      result: 'Net Force: F = 490 Newtons',
    },
    {
      eq: 'x = (-b ± √(b²-4ac)) / 2a',
      name: 'Quadratic Equation Solver',
      step1: 'Calculate discriminant Δ = b² - 4ac',
      step2: 'Extract square root and solve dual branches',
      result: 'Real roots evaluated instantly',
    },
  ];

  const current = formulas.find((f) => f.eq === selectedFormula) || formulas[0];

  return (
    <div className="space-y-3">
      <div className="flex gap-1.5 overflow-x-auto no-scrollbar">
        {formulas.map((f) => (
          <button
            key={f.eq}
            onClick={() => setSelectedFormula(f.eq)}
            className={`px-3 py-1 rounded-full text-[10px] font-mono font-bold ${
              selectedFormula === f.eq ? 'bg-cyan-500 text-slate-950' : 'bg-slate-900 text-slate-400'
            }`}
          >
            {f.eq}
          </button>
        ))}
      </div>

      <div className="p-3.5 rounded-2xl bg-cyan-950/30 border border-cyan-500/40 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-white">{current.name}</span>
          <span className="font-mono text-cyan-300 text-sm font-bold">{current.eq}</span>
        </div>

        <div className="p-2 rounded-xl bg-black/50 border border-cyan-500/20 font-mono text-[11px] space-y-1">
          <div className="text-slate-400">Step 1: {current.step1}</div>
          <div className="text-slate-400">Step 2: {current.step2}</div>
          <div className="text-cyan-300 font-semibold pt-1 border-t border-slate-800">
            Result: {current.result}
          </div>
        </div>
      </div>

      <button className="w-full py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs">
        Scan Another Formula via Camera
      </button>
    </div>
  );
};

/* 09. Content Writer */
const ContentWriterSandbox: React.FC = () => {
  const [topic, setTopic] = useState('The Next Decade of Artificial Intelligence in Southeast Asia');
  const [output, setOutput] = useState(
    'As neural models transition from isolated tools to unified super ecosystems, creators in Southeast Asia are pioneering a renaissance in multilingual generative media...'
  );
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-3">
      <div className="space-y-1">
        <label className="text-[11px] font-semibold text-amber-300">Topic / Brief</label>
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="w-full bg-black/50 border border-amber-500/30 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-400"
        />
      </div>

      <div className="relative p-3 rounded-2xl bg-amber-950/20 border border-amber-500/30">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">
            Generated Draft
          </span>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 text-[10px] text-amber-300 hover:text-white"
          >
            {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
            <span>{copied ? 'Copied!' : 'Copy'}</span>
          </button>
        </div>

        <p className="text-xs text-slate-200 leading-relaxed font-serif">{output}</p>
      </div>

      <button
        onClick={() =>
          setOutput(
            `Expanded Perspective on "${topic}": Deep reasoning frameworks coupled with native Khmer datasets enable hyper-personalized content creation at unprecedented speeds.`
          )
        }
        className="w-full py-2 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-bold text-xs"
      >
        Rewrite with Golden Pen
      </button>
    </div>
  );
};

/* 10. CV Builder ATS ★★★★ */
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
    <div className="space-y-3">
      <div className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-950/40 via-slate-900 to-black border border-amber-500/40 flex items-center justify-between">
        <div>
          <span className="text-[10px] font-bold uppercase text-amber-400 tracking-wider">
            ATS Recruiter Score
          </span>
          <div className="text-2xl font-black text-white font-mono">{atsScore} / 100</div>
          <span className="text-[10px] text-amber-300">★★★★ Top 2% Tier Candidates</span>
        </div>

        <div className="w-14 h-14 rounded-full border-4 border-amber-400/80 flex items-center justify-center font-bold text-xs text-white">
          94%
        </div>
      </div>

      <div className="space-y-1.5 p-3 rounded-2xl bg-black/40 border border-slate-800 text-[11px]">
        <div className="flex items-center justify-between">
          <span className="text-slate-300">Keyword Density (AI & Cloud)</span>
          <span className="text-emerald-400 font-bold">100% Passed</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-slate-300">Recruiter Formatting Invariants</span>
          <span className="text-emerald-400 font-bold">Compliant</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-slate-300">Executive Summary Clarity</span>
          <span className="text-amber-400 font-bold">High Impact</span>
        </div>
        {isVipActive && (
          <div className="flex items-center justify-between pt-1 border-t border-slate-800">
            <span className="text-amber-300 font-medium">សិទ្ធិពិសេស VIP Pro:</span>
            <span className="text-emerald-400 font-bold">ដោះសោគ្មានដែនកំណត់ ✓</span>
          </div>
        )}
      </div>

      {isExported && (
        <div className="p-2.5 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
          <Check className="w-4 h-4 stroke-[3]" />
          <span>ឯកសារ ATS Resume ត្រូវបានទាញយកដោយជោគជ័យ (PDF)!</span>
        </div>
      )}

      <button
        onClick={handleExport}
        className={`w-full py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md active:scale-95 ${
          isVipActive
            ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 shadow-[0_0_15px_rgba(16,185,129,0.4)]'
            : 'bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-slate-950 shadow-[0_0_15px_rgba(245,158,11,0.4)]'
        }`}
      >
        {isVipActive ? (
          <>
            <Check className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>ទាញយក Executive ATS Resume (PDF)</span>
          </>
        ) : (
          <>
            <Crown className="w-3.5 h-3.5" />
            <span>Export Executive ATS PDF (VIP 🔒)</span>
          </>
        )}
      </button>
    </div>
  );
};
