import React, { useState } from 'react';
import {
  Sparkles,
  Download,
  RotateCcw,
  Copy,
  Check,
  Maximize2,
  X,
  Layers,
  Zap,
  Image as ImageIcon,
  Sliders,
  Palette,
  Monitor,
  Smartphone,
  Square,
  Flame,
} from 'lucide-react';

interface FluxImageStudioProps {
  onOpenVip?: () => void;
  isVipActive?: boolean;
}

interface AspectOption {
  id: string;
  name: string;
  sub: string;
  icon: string;
  width: number;
  height: number;
}

interface StylePreset {
  id: string;
  label: string;
  tag: string;
  icon: string;
  modifier: string;
}

export const FluxImageStudio: React.FC<FluxImageStudioProps> = ({
  onOpenVip,
  isVipActive = false,
}) => {
  // Input Prompt State
  const [prompt, setPrompt] = useState<string>(
    "'SEY GAMING ZONE' 3D Roblox avatar, purple neon lightning, gamer headset, esports logo"
  );

  // Aspect Ratio State
  const aspectOptions: AspectOption[] = [
    {
      id: '1:1',
      name: '1:1 (Square)',
      sub: 'Logo / Avatar / Profile',
      icon: '🔲',
      width: 1024,
      height: 1024,
    },
    {
      id: '9:16',
      name: '9:16 (Story)',
      sub: 'TikTok / Reels / Shorts',
      icon: '📱',
      width: 768,
      height: 1344,
    },
    {
      id: '16:9',
      name: '16:9 (Landscape)',
      sub: 'YouTube / Wallpaper',
      icon: '🖥️',
      width: 1344,
      height: 768,
    },
  ];
  const [selectedAspect, setSelectedAspect] = useState<AspectOption>(aspectOptions[0]);

  // Style Presets
  const stylePresets: StylePreset[] = [
    {
      id: 'gaming_3d',
      label: '3D Gaming / Mascot Logo',
      tag: 'Roblox Neon Style',
      icon: '🎮',
      modifier:
        '3D Roblox character gaming mascot logo, vibrant purple and cyan neon lightning, glossy plastic textures, octane render, dynamic heroic pose, bold typography, esports emblem style, dark volumetric background, cinematic volumetric lighting, 8k resolution, pristine quality',
    },
    {
      id: 'photoreal',
      label: 'Photorealistic 8K',
      tag: 'រូបថតពិតៗ',
      icon: '📸',
      modifier:
        'photorealistic 8k, raw color photograph, shot on Hasselblad H6D-100c, 85mm f/1.4 lens, natural skin textures, hyper-detailed, soft studio volumetric lighting, masterpiece, ultra-detailed textures, pristine quality',
    },
    {
      id: 'anime_cyber',
      label: 'Anime & Cyberpunk',
      tag: 'Anime Masterpiece',
      icon: '🎨',
      modifier:
        'makoto shinkai anime style, cyberpunk neon city aesthetics, glowing holographic reflections, vibrant electric colors, cinematic dramatic atmosphere, 8k wallpaper, masterpiece, ultra-detailed textures',
    },
    {
      id: 'khmer_heritage',
      label: 'Khmer Heritage & Art',
      tag: 'Angkor Heritage',
      icon: '🏛️',
      modifier:
        'majestic ancient Khmer Angkor architectural stone relief art, intricate apsara carvings, golden sunlight rays piercing through jungle ruins, celestial atmosphere, 8k ultra-detailed, photorealistic, pristine quality',
    },
  ];
  const [selectedStyle, setSelectedStyle] = useState<StylePreset>(stylePresets[0]);

  // Generation & Output State
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [loadingStep, setLoadingStep] = useState<string>('');
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(
    'https://image.pollinations.ai/prompt/' +
      encodeURIComponent(
        "'SEY GAMING ZONE' 3D Roblox avatar, purple neon lightning, gamer headset, esports logo, 3D Roblox character gaming mascot logo, vibrant purple and cyan neon lightning, with prominent 3D text reading 'SEY GAMING ZONE', typography rendered cleanly with bold embossed lettering, centered composition, masterpiece, 8k resolution, octane render, dynamic volumetric lighting, ultra-detailed textures, photorealistic, pristine quality"
      ) +
      '?model=flux&width=1024&height=1024&seed=78421&nologo=true'
  );
  const [currentSeed, setCurrentSeed] = useState<number>(78421);
  const [copiedPrompt, setCopiedPrompt] = useState<boolean>(false);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState<boolean>(false);

  // Quick Preset Prompts
  const quickIdeas = [
    {
      label: "🎮 'SEY GAMING' Logo",
      text: "'SEY GAMING ZONE' 3D Roblox avatar, purple neon lightning, gamer headset, esports logo",
      styleId: 'gaming_3d',
    },
    {
      label: '👸 Khmer Apsara 8K',
      text: 'Celestial Khmer Apsara royal dancer in golden silk costume at Angkor Wat ruins, morning mist, god rays',
      styleId: 'khmer_heritage',
    },
    {
      label: '🏎️ Cyberpunk Phnom Penh',
      text: 'Futuristic Cyberpunk supercar speeding through Phnom Penh neon boulevard at night, rain reflections',
      styleId: 'anime_cyber',
    },
    {
      label: '☕ Aesthetic Coffee Shop',
      text: 'Cozy modern minimalist coffee shop in Phnom Penh, lush tropical plants, soft warm sunlight, cinematic photorealism',
      styleId: 'photoreal',
    },
  ];

  // ==========================================
  // PROMPT ENHANCER & URL BUILDER
  // ==========================================
  const buildFluxUrl = (userPrompt: string, seed: number): string => {
    let finalPrompt = userPrompt.trim();

    // Check for quoted typography (e.g. 'SEY GAMING ZONE' or "SEY GAMING ZONE")
    const quotedMatch = finalPrompt.match(/['"]([^'"]+)['"]/);
    let typographyModifier = '';
    if (quotedMatch && quotedMatch[1]) {
      typographyModifier = `, with prominent 3D text reading "${quotedMatch[1]}", typography rendered cleanly with bold embossed lettering, centered composition`;
    }

    // Append style modifier and mandatory quality boosters
    const qualityBoosters =
      ', masterpiece, 8k resolution, octane render, dynamic volumetric lighting, ultra-detailed textures, photorealistic, pristine quality';

    const fullEnhancedPrompt = `${finalPrompt}, ${selectedStyle.modifier}${typographyModifier}${qualityBoosters}`;

    return `https://image.pollinations.ai/prompt/${encodeURIComponent(
      fullEnhancedPrompt
    )}?model=flux&width=${selectedAspect.width}&height=${selectedAspect.height}&seed=${seed}&nologo=true`;
  };

  const handleGenerate = (newSeed?: number) => {
    if (!prompt.trim()) return;

    const seed = newSeed !== undefined ? newSeed : Math.floor(Math.random() * 9000000) + 100000;
    setCurrentSeed(seed);
    setIsGenerating(true);
    setLoadingStep('កំពុងភ្ជាប់ទៅកាន់ FLUX.1 Engine...');

    setTimeout(() => {
      setLoadingStep('កំពុងសំយោគ 4K Neural Diffusion (Zero Watermark)...');
    }, 700);

    setTimeout(() => {
      setLoadingStep('កំពុងបញ្ចេញរូបភាពកម្រិត 4K Ultra HD...');
    }, 1400);

    const targetUrl = buildFluxUrl(prompt, seed);

    // Preload image to avoid flicker
    const img = new Image();
    img.src = targetUrl;
    img.onload = () => {
      setGeneratedImageUrl(targetUrl);
      setIsGenerating(false);
    };
    img.onerror = () => {
      // Fallback display
      setGeneratedImageUrl(targetUrl);
      setIsGenerating(false);
    };
  };

  const handleRegenerate = () => {
    const nextSeed = Math.floor(Math.random() * 9000000) + 100000;
    handleGenerate(nextSeed);
  };

  const handleDownloadImage = async () => {
    if (!generatedImageUrl) return;
    setIsDownloading(true);
    try {
      const response = await fetch(generatedImageUrl);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = blobUrl;
      a.download = `OmniAI_FLUX_4K_${currentSeed}.jpg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(blobUrl);
    } catch {
      // Fallback direct link
      window.open(generatedImageUrl, '_blank');
    } finally {
      setIsDownloading(false);
    }
  };

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(prompt);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  return (
    <div className="space-y-6 font-khmer select-none text-slate-100 pb-16">
      {/* ========================================================================
          HERO BANNER: 4K FLUX-POWERED AI IMAGE STUDIO
          ======================================================================== */}
      <div className="relative p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-purple-950/60 via-slate-900 to-indigo-950/40 border border-purple-500/40 shadow-[0_0_35px_rgba(168,85,247,0.25)] overflow-hidden">
        <div className="absolute top-0 right-1/4 w-80 h-32 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
          <div className="flex items-center gap-3.5">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-purple-600 via-fuchsia-500 to-cyan-500 p-[2px] shadow-[0_0_20px_rgba(168,85,247,0.5)] shrink-0">
              <div className="w-full h-full bg-[#0d071a] rounded-2xl flex items-center justify-center text-purple-300">
                <Sparkles className="w-7 h-7 animate-pulse" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-black text-white tracking-tight">
                  FLUX.1 4K AI Image Studio
                </h2>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-bold">
                  100% Free · No Watermark
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1">
                បង្កើតរូបភាព 4K, 3D Roblox Gamer Logo, និងរូបថតពិតៗ ដោយគ្មាន Watermark និងមិនត្រូវការ API Key
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <div className="px-3.5 py-1.5 rounded-2xl bg-black/60 border border-purple-500/30 flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400" />
              <div className="text-left font-mono">
                <span className="text-[10px] text-slate-400 block leading-tight">Engine Core</span>
                <span className="text-xs font-bold text-cyan-300">⚡ FLUX.1 Ultra (Free)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================
          1. UI CONTROLS: ASPECT RATIO BUTTONS
          ======================================================================== */}
      <div className="p-5 rounded-3xl bg-slate-900/60 border border-slate-800 backdrop-blur-xl space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <span className="text-xs sm:text-sm font-bold text-white flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-purple-500/20 text-purple-400 font-mono text-xs flex items-center justify-center border border-purple-500/30">
              1
            </span>
            <span>ទំហំរូបភាព (Aspect Ratio):</span>
          </span>
          <span className="text-xs text-cyan-400 font-mono font-bold">
            {selectedAspect.width} × {selectedAspect.height} px
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {aspectOptions.map((opt) => {
            const isSelected = selectedAspect.id === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => setSelectedAspect(opt)}
                className={`p-3.5 rounded-2xl border text-left transition-all ${
                  isSelected
                    ? 'bg-gradient-to-br from-purple-950/70 to-cyan-950/50 border-cyan-400 text-white shadow-[0_0_20px_rgba(6,182,212,0.35)] scale-[1.02]'
                    : 'bg-black/40 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-lg">{opt.icon}</span>
                  <span className="text-[10px] font-mono text-cyan-300 bg-cyan-950/80 px-2 py-0.5 rounded-md border border-cyan-500/30 font-bold">
                    {opt.id}
                  </span>
                </div>
                <h4 className="text-xs sm:text-sm font-black text-white mt-1.5">{opt.name}</h4>
                <p className="text-[10px] text-slate-400 mt-0.5">{opt.sub}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* ========================================================================
          2. UI CONTROLS: STYLE PRESETS
          ======================================================================== */}
      <div className="p-5 rounded-3xl bg-slate-900/60 border border-slate-800 backdrop-blur-xl space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <span className="text-xs sm:text-sm font-bold text-white flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 font-mono text-xs flex items-center justify-center border border-cyan-500/30">
              2
            </span>
            <span>ម៉ូដរូបភាព (Style Presets):</span>
          </span>
          <span className="text-xs text-slate-400 font-mono">4 Tuned FLUX Styles</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {stylePresets.map((st) => {
            const isSelected = selectedStyle.id === st.id;
            return (
              <button
                key={st.id}
                type="button"
                onClick={() => setSelectedStyle(st)}
                className={`p-3.5 rounded-2xl border text-left transition-all ${
                  isSelected
                    ? 'bg-gradient-to-br from-purple-950/70 to-indigo-950/60 border-purple-400 text-white shadow-[0_0_20px_rgba(168,85,247,0.35)] scale-[1.02]'
                    : 'bg-black/40 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xl">{st.icon}</span>
                  <span className="text-[9px] font-mono text-purple-300 bg-purple-950/80 px-2 py-0.5 rounded-full border border-purple-500/30 font-bold">
                    {st.tag}
                  </span>
                </div>
                <h4 className="text-xs sm:text-sm font-black text-white">{st.label}</h4>
              </button>
            );
          })}
        </div>
      </div>

      {/* ========================================================================
          3. PROMPT INPUT AREA & QUICK PRESETS
          ======================================================================== */}
      <div className="p-5 rounded-3xl bg-slate-900/60 border border-slate-800 backdrop-blur-xl space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <span className="text-xs sm:text-sm font-bold text-white flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-pink-500/20 text-pink-400 font-mono text-xs flex items-center justify-center border border-pink-500/30">
              3
            </span>
            <span>ការពិពណ៌នារូបភាព (Image Prompt Description):</span>
          </span>
          <span className="text-xs text-slate-400 font-mono">{prompt.length} characters</span>
        </div>

        {/* Quick Click Prompt Ideas */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-slate-400 flex items-center gap-1">
            <Flame className="w-3.5 h-3.5 text-amber-400" />
            <span>គំរូរហ័ស:</span>
          </span>
          {quickIdeas.map((item, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setPrompt(item.text);
                const foundStyle = stylePresets.find((s) => s.id === item.styleId);
                if (foundStyle) setSelectedStyle(foundStyle);
              }}
              className="px-3 py-1.5 rounded-xl bg-black/40 hover:bg-white/10 text-cyan-300 border border-slate-800 hover:border-cyan-500/40 text-xs font-medium transition-colors"
            >
              {item.label}
            </button>
          ))}
        </div>

        <textarea
          rows={3}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="វាយពិពណ៌នារូបភាពដែលអ្នកចង់បាន (ឧ. 'SEY GAMING ZONE' 3D Roblox avatar, purple neon lightning)..."
          className="w-full bg-black/60 border border-purple-900/60 rounded-2xl p-4 text-xs sm:text-sm text-white focus:outline-none focus:border-cyan-400 font-khmer leading-relaxed resize-none"
        />

        <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
          <span>💡 គន្លឹះ: ដាក់ឈ្មោះក្នុងសញ្ញាសម្រង់ ដូចជា <b>'ឈ្មោះអ្នក'</b> ដើម្បីឱ្យ AI បង្កើតអក្សរ 3D ច្បាស់ល្អ!</span>
        </div>

        {/* GENERATE BUTTON */}
        <button
          onClick={() => handleGenerate()}
          disabled={isGenerating || !prompt.trim()}
          type="button"
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-600 via-fuchsia-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 disabled:opacity-50 text-white font-black text-sm sm:text-base tracking-wide shadow-[0_0_30px_rgba(168,85,247,0.45)] active:scale-[0.98] transition-all flex items-center justify-center gap-2.5"
        >
          {isGenerating ? (
            <>
              <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin" />
              <span>កំពុងបង្កើតរូបភាព 4K... ⏳</span>
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5 fill-white animate-pulse" />
              <span>✨ បង្កើតរូបភាព 4K (Generate Image - Free)</span>
            </>
          )}
        </button>
      </div>

      {/* ========================================================================
          4. LOADING STATE / SKELETON
          ======================================================================== */}
      {isGenerating && (
        <div className="p-8 rounded-3xl bg-gradient-to-br from-purple-950/40 via-slate-900 to-black border border-purple-500/40 shadow-[0_0_35px_rgba(168,85,247,0.3)] flex flex-col items-center justify-center text-center gap-4 animate-pulse">
          <div className="w-16 h-16 rounded-2xl bg-purple-500/20 border border-purple-400/50 flex items-center justify-center text-purple-300">
            <Sparkles className="w-8 h-8 animate-spin" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-black text-white">កំពុងបង្កើតរូបភាព 4K... ⏳</h3>
            <p className="text-xs text-cyan-300 font-mono mt-1">{loadingStep}</p>
          </div>
          <span className="text-[10px] text-slate-400 font-mono">
            Powered by FLUX.1 Engine · Zero Watermark · Ultra 4K
          </span>
        </div>
      )}

      {/* ========================================================================
          5. RESULT SECTION (HIGH-RES IMAGE & EXPORT CONTROLS)
          ======================================================================== */}
      {!isGenerating && generatedImageUrl && (
        <section className="p-5 sm:p-6 rounded-3xl bg-slate-900/90 border border-cyan-400/50 shadow-[0_0_40px_rgba(6,182,212,0.3)] space-y-4 animate-in fade-in zoom-in-95 duration-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300 font-bold">
                4K
              </div>
              <div>
                <h4 className="text-sm sm:text-base font-black text-white">
                  រូបភាពបានបង្កើតជោគជ័យ (Rendered 4K Masterpiece)
                </h4>
                <div className="flex items-center gap-2 text-[10px] font-mono text-slate-400">
                  <span className="text-cyan-300">Seed: #{currentSeed}</span>
                  <span>·</span>
                  <span>{selectedAspect.id}</span>
                  <span>·</span>
                  <span className="text-emerald-400">No Watermark ✓</span>
                </div>
              </div>
            </div>

            {/* Actions: Download & Regenerate */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleRegenerate}
                className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold flex items-center gap-1.5 transition-colors active:scale-95"
                title="Generates a new variant with a new random seed"
              >
                <RotateCcw className="w-3.5 h-3.5 text-cyan-400" />
                <span>🔄 បង្កើតម្ដងទៀត</span>
              </button>

              <button
                type="button"
                onClick={handleDownloadImage}
                disabled={isDownloading}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-slate-950 font-black text-xs flex items-center gap-1.5 shadow-[0_0_15px_rgba(6,182,212,0.4)] active:scale-95 transition-all"
              >
                <Download className="w-4 h-4 stroke-[2.5]" />
                <span>{isDownloading ? 'កំពុងទាញយក...' : '📥 ទាញយករូបភាព HD'}</span>
              </button>
            </div>
          </div>

          {/* Image Display Area */}
          <div className="relative group rounded-2xl overflow-hidden bg-black/80 border border-slate-800 shadow-2xl flex items-center justify-center">
            <img
              src={generatedImageUrl}
              alt="FLUX AI Generated Masterpiece"
              className="w-full h-auto max-h-[620px] object-contain rounded-2xl transition-transform duration-300 group-hover:scale-[1.01]"
              loading="lazy"
            />

            {/* Overlay Action Button to preview full-screen */}
            <button
              type="button"
              onClick={() => setIsLightboxOpen(true)}
              className="absolute top-3 right-3 p-2.5 rounded-xl bg-black/60 hover:bg-black/90 text-white backdrop-blur-md border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity"
              title="Fullscreen Preview"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>

          {/* Prompt Inspector Strip */}
          <div className="p-3.5 rounded-2xl bg-black/40 border border-slate-800 flex items-center justify-between gap-3 text-xs">
            <div className="truncate text-slate-300 font-mono">
              <span className="text-purple-400 font-bold mr-1.5">Prompt:</span>
              <span className="truncate">{prompt}</span>
            </div>

            <button
              type="button"
              onClick={handleCopyPrompt}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1 shrink-0"
            >
              {copiedPrompt ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedPrompt ? 'បានចម្លង!' : 'Copy'}</span>
            </button>
          </div>
        </section>
      )}

      {/* ========================================================================
          FULL-SCREEN LIGHTBOX MODAL
          ======================================================================== */}
      {isLightboxOpen && generatedImageUrl && (
        <div
          onClick={() => setIsLightboxOpen(false)}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in"
        >
          <button
            type="button"
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-5 right-5 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={generatedImageUrl}
            alt="Full Preview"
            className="max-w-full max-h-[90vh] object-contain rounded-2xl shadow-2xl"
          />
        </div>
      )}
    </div>
  );
};
