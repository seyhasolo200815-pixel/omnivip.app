import React, { useState, useEffect, useRef } from 'react';
import {
  Send,
  Sparkles,
  Bot,
  User,
  Trash2,
  Copy,
  Check,
  Code2,
  Lightbulb,
  FileCode,
  PenTool,
  Landmark,
  Zap,
  CornerDownLeft,
  Flame,
  Cpu,
  Volume2,
  VolumeX,
} from 'lucide-react';

interface KChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  time: string;
  isStreaming?: boolean;
}

interface KChatStudioProps {
  onOpenVip?: () => void;
  isVipActive?: boolean;
}

const MASTER_SYSTEM_PROMPT = `You are K-Chat AI. Provide text-only and code-only responses. 
NEVER output any images, markdown images (![...](...)), HTML img tags, or links under any circumstances, even if joking. STRICTLY TEXT ONLY.`;

export const KChatStudio: React.FC<KChatStudioProps> = ({
  onOpenVip,
  isVipActive = false,
}) => {
  const [messages, setMessages] = useState<KChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'assistant',
      text: `សួស្តីបងប្អូនទាំងអស់គ្នា! ខ្ញុំគឺ **K-Chat AI** បញ្ញាសិប្បនិម្មិតកម្រិតខ្ពស់ឆ្លើយតបជាអក្សរ និងកូដសុទ្ធសាធ (Text-Only & Code-Only)។

តើថ្ងៃនេះលោកអ្នកចង់ឱ្យខ្ញុំជួយដោះស្រាយលំហាត់ សរសេរកូដ រៀបចំគម្រោង ឬពិភាក្សាប្រធានបទអ្វីដែរ?`,
      time: 'Just now',
      isStreaming: false,
    },
  ]);

  const [input, setInput] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [copiedCodeBlock, setCopiedCodeBlock] = useState<string | null>(null);
  const [speakingMsgId, setSpeakingMsgId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const activeStreamRef = useRef<boolean>(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Ref for audio element tracking
  const currentVoiceAudioRef = useRef<HTMLAudioElement | null>(null);

  // Cancel Audio / SpeechSynthesis on unmount
  useEffect(() => {
    return () => {
      if (currentVoiceAudioRef.current) {
        currentVoiceAudioRef.current.pause();
        currentVoiceAudioRef.current = null;
      }
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Smart Voice Player (Auto-detect Khmer vs English)
  const playSmartVoice = (rawText: string, messageId?: string) => {
    if (currentVoiceAudioRef.current) {
      currentVoiceAudioRef.current.pause();
      currentVoiceAudioRef.current = null;
      setSpeakingMsgId(null);
      return;
    }

    // Strip Markdown symbols, image markdown ![alt](url), etc.
    const cleanText = rawText
      .replace(/!\[.*?\]\(.*?\)/g, '')
      .replace(/[*#`_~[\]()]/g, '')
      .trim()
      .slice(0, 200);
    if (!cleanText) return;

    // Auto-detect Khmer vs English
    const isKhmer = /[\u1780-\u17FF]/.test(cleanText);
    const langCode = isKhmer ? 'km' : 'en';

    const voiceUrl = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(cleanText)}&tl=${langCode}&client=tw-ob`;
    const proxyVoiceUrl = `/api/tts?ie=UTF-8&q=${encodeURIComponent(cleanText)}&tl=${langCode}&client=tw-ob`;

    if (messageId) {
      setSpeakingMsgId(messageId);
    }

    const audio = new Audio(proxyVoiceUrl);
    currentVoiceAudioRef.current = audio;

    audio.play().catch(() => {
      // Fallback to direct voiceUrl
      const directAudio = new Audio(voiceUrl);
      currentVoiceAudioRef.current = directAudio;
      directAudio.play().catch((err) => {
        console.error('Playback error:', err);
        currentVoiceAudioRef.current = null;
        setSpeakingMsgId(null);
      });
      directAudio.onended = () => {
        currentVoiceAudioRef.current = null;
        setSpeakingMsgId(null);
      };
    });

    audio.onended = () => {
      currentVoiceAudioRef.current = null;
      setSpeakingMsgId(null);
    };
  };

  // Quick Prompt Pills
  const promptPills = [
    {
      icon: <Lightbulb className="w-3.5 h-3.5 text-amber-400" />,
      label: 'ពន្យល់មេរៀនស្មុគស្មាញ',
      query: 'សូមពន្យល់ពីគោលការណ៍នៃ Quantum Computing និង AI ឱ្យក្មេងអាយុ ១២ ឆ្នាំយល់បានយ៉ាងងាយស្រួល ជាភាសាខ្មែរ។',
    },
    {
      icon: <FileCode className="w-3.5 h-3.5 text-cyan-400" />,
      label: 'សរសេរកូដ & រក Bug',
      query: 'សូមសរសេរកូដ React Component សម្រាប់ធ្វើ Todo App ស្អាតដោយប្រើ Tailwind CSS និង TypeScript។',
    },
    {
      icon: <PenTool className="w-3.5 h-3.5 text-purple-400" />,
      label: 'តែងកំណាព្យ / អត្ថបទ',
      query: 'សូមតែងកំណាព្យបទពាក្យ ៧ ចំនួន ៣ ល្បះ ស្តីអំពី «តម្លៃនៃការខិតខំរៀនសូត្រក្នុងសម័យឌីជីថល»។',
    },
    {
      icon: <Landmark className="w-3.5 h-3.5 text-emerald-400" />,
      label: 'ប្រវត្តិសាស្ត្រ & វប្បធម៌ខ្មែរ',
      query: 'សូមរៀបរាប់សង្ខេបពីប្រវត្តិ និងស្ថាបត្យកម្មដ៏អស្ចារ្យនៃប្រាសាទអង្គរវត្តក្នុងរជ្ជកាលព្រះបាទសូរ្យវរ្ម័នទី២។',
    },
  ];

  // ==========================================
  // HIGH-PERFORMANCE BRAIN & JSON-LEAK ELIMINATION
  // DeepSeek-R1 with automatic fallback to OpenAI-Large
  // ==========================================
  const sanitizeAIText = (raw: string): string => {
    if (!raw || typeof raw !== 'string') return '';
    let cleaned = raw.trim();

    // If raw response is wrapped in JSON format
    if (cleaned.startsWith('{') && cleaned.endsWith('}')) {
      try {
        const parsed = JSON.parse(cleaned);
        if (parsed.text && typeof parsed.text === 'string') return parsed.text.trim();
        if (parsed.choices?.[0]?.message?.content) return parsed.choices[0].message.content.trim();
        if (parsed.choices?.[0]?.text) return parsed.choices[0].text.trim();
        if (parsed.error) return '';
      } catch (_) {}
    }

    // Strip out stray SSE artifacts if any
    cleaned = cleaned.replace(/^data:\s*\{.*?\}\s*$/gm, '');
    cleaned = cleaned.replace(/^data:\s*\[DONE\]\s*$/gm, '');
    cleaned = cleaned.replace(/^data:\s*/gm, '');

    // Completely strip any markdown images, HTML img tags, or image URLs
    cleaned = cleaned.replace(/!\[.*?\]\(.*?\)/g, '');
    cleaned = cleaned.replace(/<img[^>]*>/gi, '');

    return cleaned.trim();
  };

  const fetchKChatAI = async (
    userPrompt: string,
    chatHistory: KChatMessage[]
  ): Promise<string> => {
    const systemInstruction = {
      role: 'system',
      content:
        'You are K-Chat AI. Provide text-only and code-only responses.\nNEVER output any images, markdown images (![...](...)), HTML img tags, or links under any circumstances, even if joking. STRICTLY TEXT ONLY.',
    };

    const payload = {
      messages: [
        systemInstruction,
        ...chatHistory
          .slice(-6)
          .map((m) => ({ role: m.sender === 'user' ? 'user' : 'assistant', content: m.text })),
        { role: 'user', content: userPrompt },
      ],
      model: 'deepseek-r1',
      seed: Math.floor(Math.random() * 1000000),
    };

    try {
      const res = await fetch('https://text.pollinations.ai/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error('Switch to fallback');
      const text = await res.text();
      const cleaned = sanitizeAIText(text);
      if (cleaned && !cleaned.includes('"status":404') && !cleaned.includes('"status":402')) {
        return cleaned;
      }
      throw new Error('Switch to fallback');
    } catch {
      // Ultra-fast reliable fallback to openai-large
      try {
        const fallbackRes = await fetch('https://text.pollinations.ai/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...payload, model: 'openai-large' }),
        });

        if (fallbackRes.ok) {
          const fbText = await fallbackRes.text();
          const fbCleaned = sanitizeAIText(fbText);
          if (
            fbCleaned &&
            !fbCleaned.includes('"status":404') &&
            !fbCleaned.includes('"status":402')
          ) {
            return fbCleaned;
          }
        }
      } catch (err) {
        console.warn('openai-large fallback issue:', err);
      }

      // Tier 3: Zero-lag Server Proxy (Gemini 3.1 Flash Lite Cambodian Super-Intelligence)
      try {
        const serverRes = await fetch('/api/super-ai', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: userPrompt,
            history: chatHistory.slice(-6).map((m) => ({
              role: m.sender === 'user' ? 'user' : 'assistant',
              content: m.text,
            })),
          }),
        });

        if (serverRes.ok) {
          const srvData = await serverRes.json();
          if (srvData && srvData.text) {
            return srvData.text.trim();
          }
        }
      } catch (srvErr) {
        console.warn('Server proxy fallback issue:', srvErr);
      }

      // Tier 4: Pollinations openai-fast backup
      try {
        const fastRes = await fetch('https://text.pollinations.ai/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...payload, model: 'openai-fast' }),
        });
        if (fastRes.ok) {
          const fastText = await fastRes.text();
          const fastCleaned = sanitizeAIText(fastText);
          if (fastCleaned) return fastCleaned;
        }
      } catch (fastErr) {
        console.warn('openai-fast backup issue:', fastErr);
      }

      return 'សូមអភ័យទោស ប្រព័ន្ធកំពុងដំណើរការមមាញឹកបន្តិច។ សូមលោកអ្នកសាកល្បងចុចផ្ញើសារម្ដងទៀត!';
    }
  };

  const handleSend = async (customText?: string) => {
    const textToSend = customText || input;
    if (!textToSend.trim() || isGenerating) return;

    const userMessageId = `user-${Date.now()}`;
    const assistantMessageId = `assistant-${Date.now()}`;

    const now = new Date();
    const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now
      .getMinutes()
      .toString()
      .padStart(2, '0')}`;

    // Add user message
    const updatedMessages: KChatMessage[] = [
      ...messages,
      {
        id: userMessageId,
        sender: 'user',
        text: textToSend.trim(),
        time: timeStr,
      },
    ];

    setMessages(updatedMessages);
    setInput('');
    setIsGenerating(true);
    activeStreamRef.current = true;

    // Immediately insert assistant placeholder with glowing typewriter cursor
    const placeholderMessage: KChatMessage = {
      id: assistantMessageId,
      sender: 'assistant',
      text: '',
      time: timeStr,
      isStreaming: true,
    };
    setMessages([...updatedMessages, placeholderMessage]);

    try {
      const validHistory = updatedMessages.filter(
        (m) => m.text && !m.isStreaming && m.id !== 'welcome-1'
      );

      // Fetch clean text with JSON leak elimination
      const rawReply = await fetchKChatAI(textToSend.trim(), validHistory);
      const fullReply = sanitizeAIText(rawReply) || rawReply;

      // Smooth real-time typewriter delivery (4 chars every 10ms - zero JSON leakage)
      let charIdx = 0;
      const step = 4;
      const streamTimer = setInterval(() => {
        if (!activeStreamRef.current) {
          clearInterval(streamTimer);
          return;
        }

        charIdx += step;
        const currentSlice = fullReply.slice(0, charIdx);

        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantMessageId
              ? {
                  ...m,
                  text: currentSlice,
                  isStreaming: charIdx < fullReply.length,
                }
              : m
          )
        );

        if (charIdx >= fullReply.length) {
          clearInterval(streamTimer);
          setMessages((prev) =>
            prev.map((m) =>
              m.id === assistantMessageId
                ? { ...m, text: fullReply, isStreaming: false }
                : m
            )
          );
          setIsGenerating(false);
          activeStreamRef.current = false;
        }
      }, 10);
    } catch (err) {
      console.error('K-Chat live connection error:', err);
      const errorNotice = `⚠️ មិនអាចទាញយកចម្លើយពីប្រព័ន្ធ AI បានទេនៅពេលនេះ។ សូមពិនិត្យការតភ្ជាប់អ៊ីនធឺណិត ហើយសាកល្បងម្ដងទៀត!`;
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantMessageId
            ? { ...m, text: errorNotice, isStreaming: false }
            : m
        )
      );
      setIsGenerating(false);
      activeStreamRef.current = false;
    }
  };

  const handleClearChat = () => {
    activeStreamRef.current = false;
    setIsGenerating(false);
    setMessages([
      {
        id: 'welcome-reset',
        sender: 'assistant',
        text: `ការសន្ទនាត្រូវបានសម្អាតរួចរាល់! 🧹\n\nតើខ្ញុំអាចជួយអ្វីដល់លោកអ្នកជាបន្តទៀត?`,
        time: 'Just now',
        isStreaming: false,
      },
    ]);
  };

  const handleCopyMessage = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleCopyCode = (code: string, blockKey: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeBlock(blockKey);
    setTimeout(() => setCopiedCodeBlock(null), 2000);
  };

  // ==========================================
  // FAST LIGHTWEIGHT MARKDOWN RENDERER
  // Supports: Code blocks with language badge, bold, bullets, headers
  // ==========================================
  const renderFormattedContent = (content: string, msgId: string, isStreaming?: boolean) => {
    const parts = content.split(/(```[\s\S]*?```)/g);

    return (
      <div className="space-y-2">
        {parts.map((part, partIdx) => {
          // Code Block
          if (part.startsWith('```') && part.endsWith('```')) {
            const lines = part.slice(3, -3).trim().split('\n');
            const firstLine = lines[0].trim();
            const hasLang = /^[a-zA-Z0-9_-]+$/.test(firstLine);
            const language = hasLang ? firstLine : 'code';
            const codeContent = hasLang ? lines.slice(1).join('\n') : lines.join('\n');
            const blockKey = `${msgId}-code-${partIdx}`;

            return (
              <div
                key={partIdx}
                className="my-3 rounded-2xl overflow-hidden border border-slate-700/80 bg-[#070b14] shadow-xl text-left font-mono"
              >
                {/* Code Block Header */}
                <div className="flex items-center justify-between px-4 py-2 bg-slate-900/90 border-b border-slate-800 text-[11px] text-slate-400">
                  <span className="font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Code2 className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{language}</span>
                  </span>

                  <button
                    type="button"
                    onClick={() => handleCopyCode(codeContent, blockKey)}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-semibold transition-all active:scale-95"
                  >
                    {copiedCodeBlock === blockKey ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">បានចម្លង!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>📋 ចម្លងកូដ (Copy)</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Code Content */}
                <pre className="p-4 text-xs sm:text-sm text-cyan-100 overflow-x-auto leading-relaxed select-text font-mono">
                  <code>{codeContent}</code>
                </pre>
              </div>
            );
          }

          // Regular text formatting (Bold, Bullets, Headers)
          const paragraphs = part.split('\n');

          return (
            <div key={partIdx} className="space-y-1.5">
              {paragraphs.map((line, lineIdx) => {
                const trimmed = line.trim();
                if (!trimmed) {
                  return <div key={lineIdx} className="h-1.5" />;
                }

                // Headers
                if (trimmed.startsWith('### ')) {
                  return (
                    <h4 key={lineIdx} className="text-sm sm:text-base font-bold text-cyan-300 mt-2">
                      {trimmed.replace('### ', '')}
                    </h4>
                  );
                }
                if (trimmed.startsWith('## ')) {
                  return (
                    <h3 key={lineIdx} className="text-base sm:text-lg font-black text-white mt-2.5">
                      {trimmed.replace('## ', '')}
                    </h3>
                  );
                }

                // Bullet Point
                if (trimmed.startsWith('* ') || trimmed.startsWith('- ')) {
                  const bulletText = trimmed.replace(/^(\*|-)\s+/, '');
                  return (
                    <div key={lineIdx} className="flex items-start gap-2 pl-2">
                      <span className="text-cyan-400 font-bold mt-1 text-xs">•</span>
                      <span className="flex-1 leading-relaxed">
                        {parseInlineStyles(bulletText)}
                      </span>
                    </div>
                  );
                }

                // Numbered list
                if (/^\d+\.\s/.test(trimmed)) {
                  return (
                    <div key={lineIdx} className="flex items-start gap-2 pl-2 leading-relaxed">
                      <span className="text-purple-400 font-bold font-mono text-xs mt-0.5">
                        {trimmed.match(/^\d+\./)?.[0]}
                      </span>
                      <span className="flex-1">
                        {parseInlineStyles(trimmed.replace(/^\d+\.\s+/, ''))}
                      </span>
                    </div>
                  );
                }

                // Standard paragraph
                return (
                  <p key={lineIdx} className="leading-relaxed">
                    {parseInlineStyles(line)}
                  </p>
                );
              })}
            </div>
          );
        })}

        {/* Real-time typewriter cursor */}
        {isStreaming && (
          <span className="inline-block w-1.5 h-4 bg-cyan-400 ml-1 rounded-sm animate-pulse align-middle" />
        )}
      </div>
    );
  };

  const parseInlineStyles = (text: string) => {
    const segments = text.split(/(\*\*.*?\*\*|`.*?`)/g);

    return segments.map((seg, i) => {
      if (seg.startsWith('**') && seg.endsWith('**')) {
        return (
          <strong key={i} className="font-black text-white text-cyan-100">
            {seg.slice(2, -2)}
          </strong>
        );
      }
      if (seg.startsWith('`') && seg.endsWith('`')) {
        return (
          <code
            key={i}
            className="px-1.5 py-0.5 rounded-md bg-slate-800 text-cyan-300 font-mono text-[11px] border border-slate-700 mx-0.5"
          >
            {seg.slice(1, -1)}
          </code>
        );
      }
      return seg;
    });
  };

  return (
    <div className="space-y-4 font-khmer select-none text-slate-100 pb-16">
      {/* ========================================================================
          HERO BANNER: K-CHAT GEMINI 2.0 FLASH STREAMING
          ======================================================================== */}
      <div className="relative p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-cyan-950/60 via-slate-900 to-indigo-950/40 border border-cyan-500/40 shadow-[0_0_35px_rgba(6,182,212,0.25)] overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 p-[2px] shadow-[0_0_20px_rgba(6,182,212,0.5)] shrink-0">
              <div className="w-full h-full bg-[#080d19] rounded-2xl flex items-center justify-center text-cyan-300">
                <Bot className="w-6 h-6 animate-pulse" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-black text-white tracking-tight">
                  K-Chat Super AI
                </h2>
                <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-[10px] font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                  <span>Text & Code Only · DeepSeek-R1 Brain</span>
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                ឆ្លើយតបជាអក្សរ & កូដសុទ្ធសាធ (Strictly Text-Only) · គណិតវិទ្យា & វិស្វកម្មសូហ្វវែរ
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleClearChat}
              type="button"
              className="px-3 py-1.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-400 hover:text-rose-400 border border-slate-800 text-xs font-semibold flex items-center gap-1.5 transition-colors"
              title="Clear Chat History"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>🗑️ សម្អាតការសន្ទនា (Clear Chat)</span>
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================
          QUICK PROMPT PILLS STRIP
          ======================================================================== */}
      <div className="space-y-1.5">
        <span className="text-xs text-slate-400 font-semibold px-1 block">
          ⚡ សំណើប្រធានបទរហ័ស (Quick Suggestions):
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
          {promptPills.map((pill, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSend(pill.query)}
              className="p-3 rounded-2xl bg-slate-900/80 hover:bg-slate-800/90 border border-slate-800 hover:border-cyan-500/40 text-left transition-all group flex items-center gap-2.5 active:scale-98 shadow-sm"
            >
              <div className="w-8 h-8 rounded-xl bg-black/50 border border-slate-800 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                {pill.icon}
              </div>
              <span className="text-xs font-bold text-slate-200 group-hover:text-cyan-300 transition-colors">
                {pill.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* ========================================================================
          CHAT MESSAGES SCROLL CONTAINER (REAL-TIME STREAMING)
          ======================================================================== */}
      <div className="min-h-[420px] max-h-[620px] overflow-y-auto space-y-4 p-4 sm:p-5 rounded-3xl bg-[#080d19]/80 border border-slate-800/80 shadow-inner no-scrollbar">
        {messages.map((m) => {
          const isUser = m.sender === 'user';
          return (
            <div
              key={m.id}
              className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
            >
              {/* Avatar */}
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 shadow-md ${
                  isUser
                    ? 'bg-gradient-to-tr from-cyan-600 to-blue-600 text-white'
                    : 'bg-gradient-to-tr from-purple-600 via-indigo-600 to-cyan-500 text-cyan-300 border border-cyan-400/40 shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                }`}
              >
                {isUser ? <User className="w-4 h-4" /> : <Bot className="w-5 h-5" />}
              </div>

              {/* Message Bubble & Time */}
              <div className={`flex flex-col max-w-[92%] sm:max-w-[85%] ${isUser ? 'items-end' : 'items-start'}`}>
                <div
                  className={`p-4 rounded-3xl text-xs sm:text-sm leading-relaxed shadow-lg select-text ${
                    isUser
                      ? 'bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 text-white rounded-tr-none font-medium'
                      : 'bg-slate-900/95 text-slate-100 border border-slate-700/80 rounded-tl-none font-khmer shadow-[0_4px_25px_rgba(0,0,0,0.4)]'
                  }`}
                >
                  {isUser ? (
                    <p className="whitespace-pre-line leading-relaxed">{m.text}</p>
                  ) : (
                    renderFormattedContent(m.text, m.id, m.isStreaming)
                  )}
                </div>

                {/* Footer Bar: Timestamp, TTS Speaker Button & Copy Button */}
                <div className="flex flex-wrap items-center gap-2 mt-2 px-1 text-[10px] sm:text-[11px] text-slate-400 font-mono">
                  <span>{m.time}</span>
                  {!isUser && !m.isStreaming && (
                    <>
                      <span>·</span>
                      {/* Glassmorphism Speaker / Read Aloud Action Button */}
                      <button
                        type="button"
                        onClick={() => playSmartVoice(m.text, m.id)}
                        className={`flex items-center gap-1.5 px-3 py-1 rounded-xl border transition-all active:scale-95 ${
                          speakingMsgId === m.id
                            ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400/60 shadow-[0_0_15px_rgba(6,182,212,0.4)] animate-pulse'
                            : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border-slate-700/80 shadow-sm'
                        }`}
                        title={speakingMsgId === m.id ? 'Stop Speaking' : 'Read message aloud'}
                      >
                        {speakingMsgId === m.id ? (
                          <>
                            <VolumeX className="w-3.5 h-3.5 text-cyan-300" />
                            <span className="font-khmer font-bold text-cyan-300">
                              កំពុងអាន... (Stop)
                            </span>
                          </>
                        ) : (
                          <>
                            <Volume2 className="w-3.5 h-3.5 text-cyan-400" />
                            <span className="font-khmer font-bold">
                              🔊 ស្ដាប់សំឡេង (Listen)
                            </span>
                          </>
                        )}
                      </button>

                      <span>·</span>
                      <button
                        type="button"
                        onClick={() => handleCopyMessage(m.id, m.text)}
                        className="px-2.5 py-1 rounded-xl bg-slate-900/60 hover:bg-slate-800 text-slate-400 hover:text-cyan-300 border border-slate-800 transition-colors flex items-center gap-1"
                        title="Copy message text"
                      >
                        {copiedId === m.id ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-400" />
                            <span className="text-emerald-400 font-khmer">បានចម្លង!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span className="font-khmer">📋 ចម្លងចម្លើយ</span>
                          </>
                        )}
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        <div ref={messagesEndRef} />
      </div>

      {/* ========================================================================
          INPUT BAR CONSOLE
          ======================================================================== */}
      <div className="p-2 sm:p-2.5 rounded-3xl bg-slate-900/90 border border-slate-700/80 shadow-2xl flex items-end gap-2 focus-within:border-cyan-400 transition-colors">
        <textarea
          ref={textareaRef}
          rows={1}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
          placeholder="សួរសំណួរទៅកាន់ K-Chat AI (ចុច Enter ដើម្បីផ្ញើ, Shift + Enter ចុះបន្ទាត់)..."
          className="flex-1 bg-transparent px-3 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none font-khmer resize-none max-h-32 min-h-[40px] leading-relaxed"
        />

        <button
          onClick={() => handleSend()}
          type="button"
          disabled={!input.trim() || isGenerating}
          className="px-5 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 disabled:opacity-50 text-slate-950 font-black text-xs sm:text-sm flex items-center gap-1.5 shadow-[0_0_20px_rgba(6,182,212,0.4)] active:scale-95 transition-all shrink-0"
        >
          <span>ផ្ញើ</span>
          <Send className="w-4 h-4 stroke-[2.5]" />
        </button>
      </div>
    </div>
  );
};
