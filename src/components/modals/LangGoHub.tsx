import React, { useState } from 'react';
import {
  Volume2,
  Sparkles,
  ArrowRight,
  RotateCcw,
  CheckCircle2,
  Lock,
  Mic,
  Pencil,
  BookOpen,
  ArrowLeft,
  X,
  Play,
  Award,
  Crown,
  Check,
  Headphones,
} from 'lucide-react';

export type SupportedLang = 'ja' | 'ko' | 'zh' | 'en';

interface VowelCardData {
  char: string;
  romaji: string;
  khmerSound: string;
  meaning?: string;
  strokes: number;
  strokeSteps: string[];
}

interface LangGoHubProps {
  onOpenVip?: () => void;
  isVipActive?: boolean;
}

/* ========================================================================
   3D WAVING SILK FLAG ICONS (HIGH-FIDELITY VECTOR COMPONENTS)
   ======================================================================== */

// 1. 🇯🇵 3D Japanese Silk Flag
const FlagJapan3D: React.FC = () => (
  <div className="relative w-full h-11 sm:h-12 flex items-center justify-center overflow-hidden">
    <svg viewBox="0 0 100 66" className="w-full h-full max-h-12 drop-shadow-[0_4px_12px_rgba(239,68,68,0.35)]">
      <defs>
        <linearGradient id="silkWaveJa" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4" />
          <stop offset="25%" stopColor="#000000" stopOpacity="0.2" />
          <stop offset="50%" stopColor="#ffffff" stopOpacity="0.45" />
          <stop offset="75%" stopColor="#000000" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.3" />
        </linearGradient>
        <radialGradient id="sunGlow" cx="40%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#ff4d4d" />
          <stop offset="60%" stopColor="#bc002d" />
          <stop offset="100%" stopColor="#8a0020" />
        </radialGradient>
      </defs>
      {/* 3D Waving White Silk Base */}
      <path
        d="M 6 10 C 25 6, 45 16, 68 10 C 78 7.5, 88 10, 94 12 L 92 56 C 84 53, 74 51, 64 53 C 42 57, 24 47, 6 52 Z"
        fill="#f8fafc"
      />
      {/* Red Solar Disc (Rising Sun) with 3D Depth */}
      <ellipse cx="50" cy="32" rx="17" ry="15" fill="url(#sunGlow)" />
      <ellipse cx="47" cy="29" rx="5" ry="3.5" fill="#ffffff" fillOpacity="0.3" />
      {/* Silk Shading Ripple */}
      <path
        d="M 6 10 C 25 6, 45 16, 68 10 C 78 7.5, 88 10, 94 12 L 92 56 C 84 53, 74 51, 64 53 C 42 57, 24 47, 6 52 Z"
        fill="url(#silkWaveJa)"
        style={{ mixBlendMode: 'multiply' }}
      />
    </svg>
  </div>
);

// 2. 🇰🇷 3D South Korean Silk Flag (Taegeuk)
const FlagKorea3D: React.FC = () => (
  <div className="relative w-full h-11 sm:h-12 flex items-center justify-center overflow-hidden">
    <svg viewBox="0 0 100 66" className="w-full h-full max-h-12 drop-shadow-[0_4px_12px_rgba(59,130,246,0.35)]">
      <defs>
        <linearGradient id="silkWaveKo" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.35" />
          <stop offset="25%" stopColor="#000000" stopOpacity="0.22" />
          <stop offset="50%" stopColor="#ffffff" stopOpacity="0.4" />
          <stop offset="75%" stopColor="#000000" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.25" />
        </linearGradient>
      </defs>
      {/* Waving White Base */}
      <path
        d="M 6 10 C 25 6, 45 16, 68 10 C 78 7.5, 88 10, 94 12 L 92 56 C 84 53, 74 51, 64 53 C 42 57, 24 47, 6 52 Z"
        fill="#f8fafc"
      />
      {/* Taegeuk Yin-Yang Circle in Center */}
      <g transform="translate(50, 32) rotate(-28)">
        {/* Red Top Half */}
        <path d="M -15 0 A 15 15 0 0 1 15 0 A 7.5 7.5 0 0 1 0 0 A 7.5 7.5 0 0 0 -15 0 Z" fill="#cd2e3a" />
        {/* Blue Bottom Half */}
        <path d="M 15 0 A 15 15 0 0 1 -15 0 A 7.5 7.5 0 0 1 0 0 A 7.5 7.5 0 0 0 15 0 Z" fill="#0047a0" />
      </g>
      {/* 4 Trigrams in corners */}
      <g stroke="#1e293b" strokeWidth="1.4" strokeLinecap="round">
        {/* Top-Left: Geon */}
        <line x1="20" y1="18" x2="28" y2="23" />
        <line x1="18" y1="21" x2="26" y2="26" />
        <line x1="16" y1="24" x2="24" y2="29" />
        {/* Bottom-Right: Gon */}
        <line x1="74" y1="38" x2="82" y2="43" strokeDasharray="3 1.5" />
        <line x1="72" y1="41" x2="80" y2="46" strokeDasharray="3 1.5" />
        <line x1="70" y1="44" x2="78" y2="49" strokeDasharray="3 1.5" />
      </g>
      {/* Silk Wave Shading */}
      <path
        d="M 6 10 C 25 6, 45 16, 68 10 C 78 7.5, 88 10, 94 12 L 92 56 C 84 53, 74 51, 64 53 C 42 57, 24 47, 6 52 Z"
        fill="url(#silkWaveKo)"
        style={{ mixBlendMode: 'multiply' }}
      />
    </svg>
  </div>
);

// 3. 🇨🇳 3D Chinese Silk Flag
const FlagChina3D: React.FC = () => (
  <div className="relative w-full h-11 sm:h-12 flex items-center justify-center overflow-hidden">
    <svg viewBox="0 0 100 66" className="w-full h-full max-h-12 drop-shadow-[0_4px_12px_rgba(220,38,38,0.4)]">
      <defs>
        <linearGradient id="silkWaveZh" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.35" />
          <stop offset="25%" stopColor="#000000" stopOpacity="0.25" />
          <stop offset="50%" stopColor="#ffffff" stopOpacity="0.4" />
          <stop offset="75%" stopColor="#000000" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.3" />
        </linearGradient>
      </defs>
      {/* 3D Waving Rich Red Silk Base */}
      <path
        d="M 6 10 C 25 6, 45 16, 68 10 C 78 7.5, 88 10, 94 12 L 92 56 C 84 53, 74 51, 64 53 C 42 57, 24 47, 6 52 Z"
        fill="#de2910"
      />
      {/* Large Golden Star on Canton */}
      <g transform="translate(24, 23) scale(0.85)">
        <polygon
          points="0,-8 2.4,-2.4 8,-2.4 3.5,1.2 5.2,6.8 0,3.4 -5.2,6.8 -3.5,1.2 -8,-2.4 -2.4,-2.4"
          fill="#ffde00"
          filter="drop-shadow(0 0 3px #fef08a)"
        />
      </g>
      {/* 4 Smaller Arc Stars */}
      <g fill="#ffde00" transform="translate(36, 15) scale(0.38)">
        <polygon points="0,-8 2.4,-2.4 8,-2.4 3.5,1.2 5.2,6.8 0,3.4 -5.2,6.8 -3.5,1.2 -8,-2.4 -2.4,-2.4" />
      </g>
      <g fill="#ffde00" transform="translate(41, 20) scale(0.38)">
        <polygon points="0,-8 2.4,-2.4 8,-2.4 3.5,1.2 5.2,6.8 0,3.4 -5.2,6.8 -3.5,1.2 -8,-2.4 -2.4,-2.4" />
      </g>
      <g fill="#ffde00" transform="translate(41, 28) scale(0.38)">
        <polygon points="0,-8 2.4,-2.4 8,-2.4 3.5,1.2 5.2,6.8 0,3.4 -5.2,6.8 -3.5,1.2 -8,-2.4 -2.4,-2.4" />
      </g>
      <g fill="#ffde00" transform="translate(36, 34) scale(0.38)">
        <polygon points="0,-8 2.4,-2.4 8,-2.4 3.5,1.2 5.2,6.8 0,3.4 -5.2,6.8 -3.5,1.2 -8,-2.4 -2.4,-2.4" />
      </g>
      {/* Silk Wave Shading */}
      <path
        d="M 6 10 C 25 6, 45 16, 68 10 C 78 7.5, 88 10, 94 12 L 92 56 C 84 53, 74 51, 64 53 C 42 57, 24 47, 6 52 Z"
        fill="url(#silkWaveZh)"
        style={{ mixBlendMode: 'overlay' }}
      />
    </svg>
  </div>
);

// 4. 🇬🇧 3D UK Silk Flag (Union Jack)
const FlagUk3D: React.FC = () => (
  <div className="relative w-full h-11 sm:h-12 flex items-center justify-center overflow-hidden">
    <svg viewBox="0 0 100 66" className="w-full h-full max-h-12 drop-shadow-[0_4px_12px_rgba(30,58,138,0.4)]">
      <defs>
        <clipPath id="ukWaveClip">
          <path d="M 6 10 C 25 6, 45 16, 68 10 C 78 7.5, 88 10, 94 12 L 92 56 C 84 53, 74 51, 64 53 C 42 57, 24 47, 6 52 Z" />
        </clipPath>
        <linearGradient id="silkWaveUk" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.35" />
          <stop offset="25%" stopColor="#000000" stopOpacity="0.25" />
          <stop offset="50%" stopColor="#ffffff" stopOpacity="0.4" />
          <stop offset="75%" stopColor="#000000" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.3" />
        </linearGradient>
      </defs>
      <g clipPath="url(#ukWaveClip)">
        {/* Blue background */}
        <rect x="0" y="0" width="100" height="66" fill="#012169" />
        {/* White Saltire Diagonals */}
        <line x1="0" y1="0" x2="100" y2="66" stroke="#ffffff" strokeWidth="10" />
        <line x1="100" y1="0" x2="0" y2="66" stroke="#ffffff" strokeWidth="10" />
        {/* Red Saltire */}
        <line x1="0" y1="0" x2="100" y2="66" stroke="#c8102e" strokeWidth="5" />
        <line x1="100" y1="0" x2="0" y2="66" stroke="#c8102e" strokeWidth="5" />
        {/* White Cross */}
        <line x1="50" y1="0" x2="50" y2="66" stroke="#ffffff" strokeWidth="15" />
        <line x1="0" y1="33" x2="100" y2="33" stroke="#ffffff" strokeWidth="15" />
        {/* Red Cross */}
        <line x1="50" y1="0" x2="50" y2="66" stroke="#c8102e" strokeWidth="9" />
        <line x1="0" y1="33" x2="100" y2="33" stroke="#c8102e" strokeWidth="9" />
        {/* Silk Wave Shading */}
        <rect x="0" y="0" width="100" height="66" fill="url(#silkWaveUk)" style={{ mixBlendMode: 'overlay' }} />
      </g>
    </svg>
  </div>
);

/* ========================================================================
   MAIN LANGGO COMPONENT
   ======================================================================== */

export const LangGoHub: React.FC<LangGoHubProps> = ({ onOpenVip, isVipActive = false }) => {
  const [selectedLang, setSelectedLang] = useState<SupportedLang>('ja');
  const [currentView, setCurrentView] = useState<'roadmap' | 'level_1_5' | 'level_6_15' | 'level_40_lab'>('roadmap');

  // Interactive Hiragana Vowels State
  const [playingChar, setPlayingChar] = useState<string | null>(null);
  const [activeStrokeModal, setActiveStrokeModal] = useState<VowelCardData | null>(null);
  const [learnedChars, setLearnedChars] = useState<string[]>(['あ', 'い']);

  // Level 40 Pronunciation Checker State
  const [activeReadingIndex, setActiveReadingIndex] = useState<number>(0);
  const [isAiReading, setIsAiReading] = useState<boolean>(false);
  const [isRecordingStudent, setIsRecordingStudent] = useState<boolean>(false);
  const [pronunciationScore, setPronunciationScore] = useState<number | null>(null);

  // 1. Japanese Hiragana 5 Vowels
  const japaneseVowels: VowelCardData[] = [
    {
      char: 'あ',
      romaji: 'a',
      khmerSound: 'អាក់ / អា',
      meaning: 'ស្រៈ [a] គ្រឹះ',
      strokes: 3,
      strokeSteps: [
        'ជំហាន ១: គូសបន្ទាត់ផ្ដេកពីឆ្វេងទៅស្ដាំខ្លីៗ',
        'ជំហាន ២: គូសបន្ទាត់បញ្ឈរពីលើចុះក្រោម កាត់ចំកណ្តាល',
        'ជំហាន ៣: គូសរង្វង់មូលខាងក្រោមរាងពងក្រពើពីឆ្វេងមកស្ដាំ',
      ],
    },
    {
      char: 'い',
      romaji: 'i',
      khmerSound: 'អ៊ី',
      meaning: 'ស្រៈ [i] គ្រឹះ',
      strokes: 2,
      strokeSteps: [
        'ជំហាន ១: គូសបន្ទាត់កោងខាងឆ្វេងចុះក្រោម ហើយត្រឡប់ឡើងលើបន្តិច',
        'ជំហាន ២: គូសបន្ទាត់កោងខ្លីខាងស្ដាំស្របគ្នា',
      ],
    },
    {
      char: 'う',
      romaji: 'u',
      khmerSound: 'អ៊ូ',
      meaning: 'ស្រៈ [u] គ្រឹះ',
      strokes: 2,
      strokeSteps: [
        'ជំហាន ១: គូសសញ្ញាចុចទ្រេតខ្លីនៅផ្នែកខាងលើ',
        'ជំហាន ២: គូសបន្ទាត់កោងរាងអក្សរ C ចុះក្រោម',
      ],
    },
    {
      char: 'え',
      romaji: 'e',
      khmerSound: 'អេ',
      meaning: 'ស្រៈ [e] គ្រឹះ',
      strokes: 2,
      strokeSteps: [
        'ជំហាន ១: គូសបន្ទាត់ទ្រេតខ្លីពីលើចុះក្រោម',
        'ជំហាន ២: គូសរាងហ្ស៊ីកហ្សាក់រលក Z ភ្ជាប់នឹងរង្វង់កោងខាងក្រោម',
      ],
    },
    {
      char: 'お',
      romaji: 'o',
      khmerSound: 'អូ',
      meaning: 'ស្រៈ [o] គ្រឹះ',
      strokes: 3,
      strokeSteps: [
        'ជំហាន ១: គូសបន្ទាត់ផ្ដេកខ្លីពីឆ្វេងទៅស្ដាំ',
        'ជំហាន ២: គូសបន្ទាត់បញ្ឈរចុះក្រោមហើយកោងមូលជុំវិញ',
        'ជំហាន ៣: ដាក់សញ្ញាចុចទ្រេតមួយនៅជ្រុងខាងស្តាំខាងលើ',
      ],
    },
  ];

  // 2. Consonants + Vowels (Ka-Row)
  const japaneseKaRow: VowelCardData[] = [
    {
      char: 'か',
      romaji: 'ka',
      khmerSound: 'កាក់ / កា',
      meaning: 'ព្យញ្ជនៈ K + ស្រៈ a',
      strokes: 3,
      strokeSteps: ['ជំហាន ១: គូសខ្សែកោងចុះក្រោមហើយទំពក់ឡើង', 'ជំហាន ២: គូសបន្ទាត់បញ្ឈរខាងឆ្វេង', 'ជំហាន ៣: គូសសញ្ញាចុចខាងស្តាំ'],
    },
    {
      char: 'き',
      romaji: 'ki',
      khmerSound: 'គី',
      meaning: 'ព្យញ្ជនៈ K + ស្រៈ i',
      strokes: 4,
      strokeSteps: ['ជំហាន ១: បន្ទាត់ផ្ដេកលើ', 'ជំហាន ២: បន្ទាត់ផ្ដេកក្រោម', 'ជំហាន ៣: បន្ទាត់ទ្រេតកាត់', 'ជំហាន ៤: ខ្សែកោងក្រោម'],
    },
    {
      char: 'く',
      romaji: 'ku',
      khmerSound: 'គូ',
      meaning: 'ព្យញ្ជនៈ K + ស្រៈ u',
      strokes: 1,
      strokeSteps: ['ជំហាន ១: គូសរាងមុំស្រួច < តែមួយបន្ទាត់គត់ពីលើចុះក្រោម'],
    },
    {
      char: 'け',
      romaji: 'ke',
      khmerSound: 'កេ',
      meaning: 'ព្យញ្ជនៈ K + ស្រៈ e',
      strokes: 3,
      strokeSteps: ['ជំហាន ១: បន្ទាត់បញ្ឈរឆ្វេងទំពក់ឡើង', 'ជំហាន ២: បន្ទាត់ផ្ដេកស្តាំ', 'ជំហាន ៣: បន្ទាត់បញ្ឈរកោងស្តាំ'],
    },
    {
      char: 'こ',
      romaji: 'ko',
      khmerSound: 'គោ',
      meaning: 'ព្យញ្ជនៈ K + ស្រៈ o',
      strokes: 2,
      strokeSteps: ['ជំហាន ១: បន្ទាត់ផ្ដេកលើទំពក់ចុះក្រោមបន្តិច', 'ជំហាន ២: បន្ទាត់កោងផ្ដេកក្រោមទ្រទ្រង់'],
    },
  ];

  // Level 40 Live Reading Passages
  const readingPassages = [
    {
      title: 'ការណែនាំខ្លួនឯង (Self Introduction)',
      japanese: 'はじめまして。わたしは カンボジア人 です。どうぞ よろしく おねがいします。',
      romaji: 'Hajimemashite. Watashi wa Kamboja-jin desu. Douzo yoroshiku onegaishimasu.',
      khmer: 'រីករាយដែលបានស្គាល់។ ខ្ញុំជាជនជាតិកម្ពុជា។ សូមមេត្តាជួយណែនាំផង។',
      level: 'N5 Essential',
    },
    {
      title: 'ការសួរសុខទុក្ខ & អាកាសធាតុ (Greetings & Weather)',
      japanese: 'きょうは とても いい てんき ですね。ふじさん が きれいに みえます。',
      romaji: 'Kyou wa totemo ii tenki desu ne. Fujisan ga kirei ni miemasu.',
      khmer: 'ថ្ងៃនេះអាកាសធាតុពិតជាល្អណាស់មែនទេ? ភ្នំហ្វូជីអាចមើលឃើញយ៉ាងស្រស់ស្អាត។',
      level: 'N5 Dialogue',
    },
    {
      title: 'ការទិញទំនិញនៅទីក្រុងតូក្យូ (Shopping in Tokyo)',
      japanese: 'すみません、これ は いくら ですか？ ひとつ ください。',
      romaji: 'Sumimasen, kore wa ikura desu ka? Hitotsu kudasai.',
      khmer: 'សូមអភ័យទោស តើមួយនេះតម្លៃប៉ុន្មានដែរ? សូមយកមួយមក។',
      level: 'Daily Practical',
    },
  ];

  // Audio Speech Synthesis
  const handlePlaySound = (char: string) => {
    setPlayingChar(char);
    if (!learnedChars.includes(char)) {
      setLearnedChars((prev) => [...prev, char]);
    }

    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(char);
      utterance.rate = 0.85;
      utterance.lang = 'ja-JP';
      utterance.onend = () => setPlayingChar(null);
      utterance.onerror = () => setPlayingChar(null);
      window.speechSynthesis.speak(utterance);
    } else {
      setTimeout(() => setPlayingChar(null), 1000);
    }
  };

  // AI Sentence Reading
  const handleAiReadSentence = (text: string) => {
    setIsAiReading(true);
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.8;
      utterance.lang = 'ja-JP';
      utterance.onend = () => setIsAiReading(false);
      utterance.onerror = () => setIsAiReading(false);
      window.speechSynthesis.speak(utterance);
    } else {
      setTimeout(() => setIsAiReading(false), 2500);
    }
  };

  // Student Recording & Pronunciation Checker Simulation
  const handleRecordStudent = () => {
    setIsRecordingStudent(true);
    setPronunciationScore(null);

    setTimeout(() => {
      setIsRecordingStudent(false);
      const score = Math.floor(Math.random() * 8) + 92;
      setPronunciationScore(score);
    }, 2400);
  };

  // 6 Japanese Roadmap Level Tiers
  const japaneseRoadmapLevels = [
    {
      range: 'Level 01 - 05',
      title: 'ស្រៈគ្រឹះ Hiragana',
      progress: '0% - 15%',
      isUnlocked: true,
      tag: 'UNLOCKED 🟢',
      tagColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
      description: 'រៀនស្គាល់ និងបញ្ចេញសំឡេងស្រៈទាំង ៥ (あ, い, う, え, お) របៀបគូសតាមលំដាប់បន្ទាត់ និងសំឡេងស្តង់ដារ។',
      actionText: 'ចូលរៀន',
      actionView: 'level_1_5' as const,
      accentBorder: 'border-cyan-500/50 shadow-[0_0_20px_rgba(6,182,212,0.25)]',
    },
    {
      range: 'Level 06 - 15',
      title: 'ព្យញ្ជនៈផ្សំស្រៈ (Consonants + Vowels)',
      progress: '15% - 35%',
      isUnlocked: true,
      tag: 'UNLOCKED 🟢',
      tagColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
      description: 'ផ្សំសូរអក្សរជួរ Ka, Sa, Ta, Na, Ha, Ma, Ya, Ra, Wa ជាមួយស្រៈគ្រឹះ (កា គី គូ កេ កូ...)។',
      actionText: 'ចូលរៀន',
      actionView: 'level_6_15' as const,
      accentBorder: 'border-cyan-500/40 shadow-[0_0_15px_rgba(6,182,212,0.2)]',
    },
    {
      range: 'Level 16 - 25',
      title: 'សូរបន្ថែម & សូរផ្សំ (Dakuon, Handakuon & Youon)',
      progress: '35% - 55%',
      isUnlocked: isVipActive,
      tag: isVipActive ? 'VIP UNLOCKED 🟢' : 'PLUS / VIP 🔒',
      tagColor: isVipActive
        ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30'
        : 'text-amber-300 bg-amber-500/10 border-amber-500/30',
      description: 'រៀនសញ្ញាតម្កល់សូរតង់ៗ (Ga, Za, Da, Ba, Pa) និងការផ្សំសូរតូច Kya, Shu, Cho សម្រាប់បន្លឺសំឡេងកម្រិតខ្ពស់។',
      actionText: isVipActive ? 'ចូលរៀន' : 'ដោះសោ 🔒',
      actionView: 'level_6_15' as const,
      isVip: true,
      accentBorder: isVipActive ? 'border-emerald-500/40 shadow-[0_0_15px_rgba(16,185,129,0.2)]' : 'border-amber-500/30 hover:border-amber-500/60',
    },
    {
      range: 'Level 26 - 32',
      title: 'វិធានបូកពាក្យ & អក្ខរក្រម Katakana',
      progress: '55% - 75%',
      isUnlocked: isVipActive,
      tag: isVipActive ? 'VIP UNLOCKED 🟢' : 'VIP 🔒',
      tagColor: isVipActive
        ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30'
        : 'text-amber-300 bg-amber-500/10 border-amber-500/30',
      description: 'រៀនប្រកបពាក្យកម្ចីបរទេស ការប្រើសញ្ញាសង្កត់សំឡេង (Sokuon/Choon) និងពាក្យប្រចាំថ្ងៃជាង ៥០០ ពាក្យ។',
      actionText: isVipActive ? 'ចូលរៀន' : 'ដោះសោ 🔒',
      actionView: 'level_6_15' as const,
      isVip: true,
      accentBorder: isVipActive ? 'border-emerald-500/40 shadow-[0_0_15px_rgba(16,185,129,0.2)]' : 'border-amber-500/30 hover:border-amber-500/60',
    },
    {
      range: 'Level 33 - 39',
      title: 'វេយ្យាករណ៍គ្រឹះ & ឃ្លាសន្ទនាជាក់ស្តែង',
      progress: '75% - 95%',
      isUnlocked: isVipActive,
      tag: isVipActive ? 'VIP UNLOCKED 🟢' : 'VIP 🔒',
      tagColor: isVipActive
        ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30'
        : 'text-amber-300 bg-amber-500/10 border-amber-500/30',
      description: 'រៀនរៀបប្រយោគ សន្ទនាសួរនាំទិញទំនិញ សួរផ្លូវ ការងារ និងកម្រិតត្រៀមប្រឡង JLPT N5។',
      actionText: isVipActive ? 'ចូលរៀន' : 'ដោះសោ 🔒',
      actionView: 'level_40_lab' as const,
      isVip: true,
      accentBorder: isVipActive ? 'border-emerald-500/40 shadow-[0_0_15px_rgba(16,185,129,0.2)]' : 'border-amber-500/30 hover:border-amber-500/60',
    },
    {
      range: 'Level 40 (ប្រអប់កំពូល)',
      title: 'បន្ទប់ហ្វឹកហាត់អានជាក់ស្តែង (Live Reading & Pronunciation Lab)',
      progress: '100% Mastery',
      isUnlocked: isVipActive,
      tag: isVipActive ? 'VIP UNLOCKED 🟢 · LAB' : 'VIP 🔒 · LAB READY',
      tagColor: isVipActive
        ? 'text-emerald-400 bg-emerald-500/15 border-emerald-400/50'
        : 'text-amber-300 bg-amber-500/15 border-amber-400/50',
      description: 'អត្ថបទខ្លីៗជាភាសាជប៉ុនសុទ្ធ (អានអត្ថបទ រឿងខ្លី ផ្លាកសញ្ញា) មានមុខងារបំពងសំឡេង AI អានតាមមួយម៉ាត់ៗ និងមុខងារថតសំឡេងសិស្សអានដើម្បីផ្ទៀងផ្ទាត់កម្រិតបញ្ចេញសំឡេងត្រូវឬខុស។',
      actionText: 'សាកល្បងបន្ទប់ Lab 🎙️',
      actionView: 'level_40_lab' as const,
      isSpecialLab: true,
      accentBorder: isVipActive
        ? 'border-emerald-400/70 shadow-[0_0_30px_rgba(16,185,129,0.35)]'
        : 'border-amber-400/60 shadow-[0_0_25px_rgba(245,158,11,0.25)]',
    },
  ];

  // 4 Prominent 3D Flag Selector Cards Data
  const flagCards = [
    {
      id: 'ja' as SupportedLang,
      title: 'ជប៉ុន',
      subtitle: 'Japanese',
      component: FlagJapan3D,
      glow: 'shadow-[0_0_20px_rgba(6,182,212,0.5)]',
      borderActive: 'border-cyan-400',
    },
    {
      id: 'ko' as SupportedLang,
      title: 'កូរ៉េ',
      subtitle: 'Korean',
      component: FlagKorea3D,
      glow: 'shadow-[0_0_20px_rgba(59,130,246,0.4)]',
      borderActive: 'border-blue-400',
    },
    {
      id: 'zh' as SupportedLang,
      title: 'ចិន',
      subtitle: 'Chinese',
      component: FlagChina3D,
      glow: 'shadow-[0_0_20px_rgba(245,158,11,0.4)]',
      borderActive: 'border-amber-400',
    },
    {
      id: 'en' as SupportedLang,
      title: 'អង់គ្លេស',
      subtitle: 'English',
      component: FlagUk3D,
      glow: 'shadow-[0_0_20px_rgba(168,85,247,0.4)]',
      borderActive: 'border-purple-400',
    },
  ];

  return (
    <div className="space-y-4 select-none font-khmer">
      {/* ========================================================================
          1. PROMINENT 3D FLAG SELECTOR CARDS (TOP OF MODAL)
          ======================================================================== */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-xs text-slate-400 px-1">
          <span className="font-semibold text-slate-200">
            ជ្រើសរើសភាសាគោលដៅ (Language Academy):
          </span>
          <span className="text-cyan-400 font-sans text-[11px] font-bold">
            LangGo 3D Hub
          </span>
        </div>

        {/* 4 Equal-width 3D Flag Cards Grid */}
        <div className="grid grid-cols-4 gap-2 sm:gap-3">
          {flagCards.map((card) => {
            const isSelected = selectedLang === card.id;
            const FlagComponent = card.component;

            return (
              <button
                key={card.id}
                onClick={() => {
                  setSelectedLang(card.id);
                  setCurrentView('roadmap');
                }}
                type="button"
                className={`group relative flex flex-col items-center justify-between rounded-xl p-2.5 sm:p-3 transition-all duration-300 hover:-translate-y-1 active:scale-[0.98] ${
                  isSelected
                    ? `bg-[#111827] ${card.borderActive} border-2 ${card.glow} scale-[1.03] z-10`
                    : 'bg-[#111827]/80 hover:bg-[#1F2937] border border-cyan-500/20 opacity-80 hover:opacity-100'
                }`}
                style={{
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                }}
              >
                {/* Active Check Indicator Badge in Top-Right */}
                {isSelected && (
                  <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-cyan-400 text-slate-950 flex items-center justify-center shadow-[0_0_8px_#22d3ee] z-20">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </span>
                )}

                {/* 3D Waving Flag Visual */}
                <div className="w-full flex items-center justify-center my-1 group-hover:scale-105 transition-transform duration-300">
                  <FlagComponent />
                </div>

                {/* Text Labels */}
                <div className="text-center mt-1 w-full">
                  <span
                    className={`block text-xs sm:text-sm font-bold tracking-tight leading-tight ${
                      isSelected ? 'text-white' : 'text-slate-300 group-hover:text-white'
                    }`}
                  >
                    {card.title}
                  </span>
                  <span
                    className={`block text-[10px] sm:text-[11px] font-sans font-medium mt-0.5 tracking-tight ${
                      isSelected ? 'text-cyan-300' : 'text-slate-400'
                    }`}
                  >
                    {card.subtitle}
                  </span>
                </div>

                {/* Active subtle bottom neon highlight */}
                {isSelected && (
                  <div className="absolute inset-x-2 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_6px_#22d3ee]" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* ========================================================================
          2. JAPANESE CURRICULUM ROADMAP (LEVEL 01 - 40 DEFAULT ACTIVE)
          ======================================================================== */}
      {selectedLang === 'ja' && currentView === 'roadmap' && (
        <div className="space-y-3.5">
          {/* Header & Overall Progression Card */}
          <div
            style={{
              background: 'rgba(17, 24, 39, 0.85)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
            }}
            className="p-4 rounded-3xl border border-cyan-500/40 shadow-[0_0_30px_rgba(6,182,212,0.2)] relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-44 h-44 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 mb-3">
              <div>
                <h3 className="text-sm sm:text-base font-bold text-white tracking-tight leading-snug">
                  🇯🇵 ភាសាជប៉ុនពេញលេញ (Full Japanese Mastery Path: 0% - 100%)
                </h3>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  កម្មវិធីសិក្សាពេញលេញពីកម្រិតដំបូងដល់កម្រិតសន្ទនាស្ទាត់ជំនាញ (N5 - N4)
                </p>
              </div>

              {/* Status Badge */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/40 text-cyan-300 text-xs font-semibold shrink-0">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>កម្រិតបច្ចុប្បន្ន: Level 01</span>
              </div>
            </div>

            {/* Overall Progress Bar */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-200">
                  វឌ្ឍនភាពសរុប: <span className="text-cyan-300 font-mono">0 / Level 40 បញ្ចប់</span>
                </span>
                <span className="text-cyan-400 font-mono font-bold text-xs">15% Ready</span>
              </div>

              <div className="w-full h-2.5 rounded-full bg-black/60 border border-slate-800 overflow-hidden p-[1px]">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-cyan-500 via-blue-400 to-cyan-300 shadow-[0_0_12px_rgba(6,182,212,0.8)]"
                  style={{ width: '15%' }}
                />
              </div>
            </div>
          </div>

          {/* 6 Clean Vertical Roadmap Level Cards */}
          <div className="space-y-3">
            {japaneseRoadmapLevels.map((lvl) => (
              <div
                key={lvl.range}
                style={{
                  background: 'rgba(17, 24, 39, 0.75)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                }}
                className={`relative p-4 rounded-2xl border transition-all duration-200 ${lvl.accentBorder} shadow-lg flex flex-col justify-between`}
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-cyan-300 bg-cyan-950/80 px-2.5 py-0.5 rounded-lg border border-cyan-800/80">
                      {lvl.range}
                    </span>
                    <h4 className="text-xs sm:text-sm font-bold text-white tracking-tight">
                      {lvl.title}
                    </h4>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[10px] text-slate-400 font-mono">
                      {lvl.progress}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${lvl.tagColor}`}
                    >
                      {lvl.tag}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed mb-3">
                  {lvl.description}
                </p>

                <div className="flex items-center justify-between pt-2.5 border-t border-slate-800/80">
                  <span className="text-[11px] text-slate-400">
                    {lvl.isUnlocked
                      ? '✓ បើកសិទ្ធិសិក្សាដោយសេរី'
                      : '🔒 កញ្ចប់ VIP Pro សិក្សាពេញលេញ'}
                  </span>

                  {lvl.isUnlocked ? (
                    <button
                      onClick={() => lvl.actionView && setCurrentView(lvl.actionView)}
                      type="button"
                      className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-slate-950 font-bold text-xs tracking-wide shadow-[0_0_12px_rgba(6,182,212,0.4)] active:scale-95 transition-all flex items-center gap-1.5"
                    >
                      <span>{lvl.actionText}</span>
                      <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                    </button>
                  ) : lvl.isSpecialLab ? (
                    <button
                      onClick={() => setCurrentView('level_40_lab')}
                      type="button"
                      className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-slate-950 font-bold text-xs shadow-[0_0_15px_rgba(245,158,11,0.4)] active:scale-95 transition-all flex items-center gap-1.5"
                    >
                      <span>{lvl.actionText}</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => onOpenVip && onOpenVip()}
                      type="button"
                      className="px-4 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 font-bold text-xs active:scale-95 transition-all flex items-center gap-1.5"
                    >
                      <Lock className="w-3 h-3 text-amber-400" />
                      <span>{lvl.actionText}</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================
          KOREAN CURRICULUM ROADMAP VIEW
          ======================================================================== */}
      {selectedLang === 'ko' && (
        <div className="space-y-3.5 animate-in fade-in duration-200">
          <div
            style={{
              background: 'rgba(17, 24, 39, 0.85)',
              backdropFilter: 'blur(16px)',
            }}
            className="p-4 rounded-3xl border border-blue-500/40 shadow-[0_0_30px_rgba(59,130,246,0.2)]"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm sm:text-base font-bold text-white">
                🇰🇷 ភាសាកូរ៉េពេញលេញ (Hangul to TOPIK I Mastery)
              </h3>
              <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold border border-blue-500/40">
                0% - 100% Path
              </span>
            </div>
            <p className="text-xs text-slate-300">
              រៀនអក្ខរក្រមហាន់ហ្គូល (ស្រៈ ព្យញ្ជនៈ ជើងអក្សរ Batchim) និងការសន្ទនាប្រចាំថ្ងៃជាមួយគ្រូ AI។
            </p>
          </div>

          <div className="space-y-2.5">
            <div className="p-3.5 rounded-2xl bg-slate-900/70 border border-blue-500/30 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono text-blue-400">Level 01 - 08</span>
                <h4 className="text-xs sm:text-sm font-bold text-white mt-0.5">
                  ស្រៈគ្រឹះ & ព្យញ្ជនៈ Hangul (ㅏ, ㅑ, ㅓ, ㅕ...)
                </h4>
                <p className="text-[11px] text-slate-400 mt-0.5">រៀនអាន និងសរសេរអក្សរគ្រឹះ ៤០ តួ</p>
              </div>
              <span className="px-3 py-1 rounded-xl bg-blue-600 text-white font-bold text-xs shrink-0">
                ចូលរៀន
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-900/70 border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono text-slate-400">Level 09 - 20 [VIP]</span>
                <h4 className="text-xs sm:text-sm font-bold text-slate-300 mt-0.5">
                  ជើងអក្សរ Batchim & វិធានបំប្លែងសំឡេង
                </h4>
                <p className="text-[11px] text-slate-500 mt-0.5">ការបញ្ចេញសំឡេងស្ទាត់ដូចជនជាតិកូរ៉េ</p>
              </div>
              <span className="px-3 py-1 rounded-xl bg-amber-500/20 text-amber-300 font-bold text-xs shrink-0">
                ដោះសោ 🔒
              </span>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================
          CHINESE CURRICULUM ROADMAP VIEW
          ======================================================================== */}
      {selectedLang === 'zh' && (
        <div className="space-y-3.5 animate-in fade-in duration-200">
          <div
            style={{
              background: 'rgba(17, 24, 39, 0.85)',
              backdropFilter: 'blur(16px)',
            }}
            className="p-4 rounded-3xl border border-amber-500/40 shadow-[0_0_30px_rgba(245,158,11,0.2)]"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm sm:text-base font-bold text-white">
                🇨🇳 ភាសាចិនពេញលេញ (Pinyin to HSK 3 Standard)
              </h3>
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/40">
                0% - 100% Path
              </span>
            </div>
            <p className="text-xs text-slate-300">
              រៀនភីនអ៊ីន (Pinyin) សម្លេងទាំង ៤ (Four Tones) រ៉ាឌីកាល់ និងអក្សរចិនជាង ១,០០០ តួ។
            </p>
          </div>

          <div className="space-y-2.5">
            <div className="p-3.5 rounded-2xl bg-slate-900/70 border border-amber-500/30 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono text-amber-400">Level 01 - 10</span>
                <h4 className="text-xs sm:text-sm font-bold text-white mt-0.5">
                  ភីនអ៊ីន (Pinyin) & សូរទាំង ៤ (mā, má, mǎ, mà)
                </h4>
                <p className="text-[11px] text-slate-400 mt-0.5">មូលដ្ឋានគ្រឹះបញ្ចេញសំឡេងចិនកុកងឺ</p>
              </div>
              <span className="px-3 py-1 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs shrink-0">
                ចូលរៀន
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-900/70 border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono text-slate-400">Level 11 - 25 [VIP]</span>
                <h4 className="text-xs sm:text-sm font-bold text-slate-300 mt-0.5">
                  អក្សរចិនកម្រិត HSK 1 - 2 & វាក្យសព្ទពាណិជ្ជកម្ម
                </h4>
                <p className="text-[11px] text-slate-500 mt-0.5">ការសរសេរតាមលំដាប់គំនូស និងការសន្ទនា</p>
              </div>
              <span className="px-3 py-1 rounded-xl bg-amber-500/20 text-amber-300 font-bold text-xs shrink-0">
                ដោះសោ 🔒
              </span>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================
          ENGLISH CURRICULUM ROADMAP VIEW
          ======================================================================== */}
      {selectedLang === 'en' && (
        <div className="space-y-3.5 animate-in fade-in duration-200">
          <div
            style={{
              background: 'rgba(17, 24, 39, 0.85)',
              backdropFilter: 'blur(16px)',
            }}
            className="p-4 rounded-3xl border border-purple-500/40 shadow-[0_0_30px_rgba(168,85,247,0.2)]"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm sm:text-base font-bold text-white">
                🇬🇧 ភាសាអង់គ្លេសពេញលេញ (Phonics to Oxford Fluent C1)
              </h3>
              <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 text-xs font-bold border border-purple-500/40">
                0% - 100% Path
              </span>
            </div>
            <p className="text-xs text-slate-300">
              រៀនប្រកបតាមសូរសព្ទ Phonics វេយ្យាករណ៍ជាក់ស្តែង និងការសន្ទនាការងារអន្តរជាតិ។
            </p>
          </div>

          <div className="space-y-2.5">
            <div className="p-3.5 rounded-2xl bg-slate-900/70 border border-purple-500/30 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono text-purple-400">Level 01 - 10</span>
                <h4 className="text-xs sm:text-sm font-bold text-white mt-0.5">
                  English Phonics & ការបញ្ចេញសំឡេងស្តង់ដារ
                </h4>
                <p className="text-[11px] text-slate-400 mt-0.5">កែតម្រូវការបញ្ចេញសំឡេងចុងពាក្យ (s, ed, th)</p>
              </div>
              <span className="px-3 py-1 rounded-xl bg-purple-600 text-white font-bold text-xs shrink-0">
                ចូលរៀន
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-900/70 border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono text-slate-400">Level 11 - 30 [VIP]</span>
                <h4 className="text-xs sm:text-sm font-bold text-slate-300 mt-0.5">
                  Business English & ការត្រៀមសម្ភាសន៍ការងារ
                </h4>
                <p className="text-[11px] text-slate-500 mt-0.5">សន្ទនាក្នុងកិច្ចប្រជុំ និងការផ្ញើអ៊ីមែលផ្លូវការ</p>
              </div>
              <span className="px-3 py-1 rounded-xl bg-amber-500/20 text-amber-300 font-bold text-xs shrink-0">
                ដោះសោ 🔒
              </span>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================
          SUB-VIEWS: LEVEL 01-05, LEVEL 06-15, LEVEL 40 LAB
          ======================================================================== */}
      {selectedLang === 'ja' && currentView === 'level_1_5' && (
        <div className="space-y-3.5 animate-in fade-in duration-200">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <button
              onClick={() => setCurrentView('roadmap')}
              type="button"
              className="text-xs text-cyan-300 hover:text-white flex items-center gap-1.5 py-1 px-2.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-cyan-500/40 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>← ត្រឡប់ទៅផែនទីមេរៀន (Roadmap)</span>
            </button>
            <span className="text-[11px] text-cyan-400 font-mono">
              Level 01 - 05: ស្រៈ Hiragana (0% - 15%)
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {japaneseVowels.map((item) => {
              const isPlaying = playingChar === item.char;
              const isLearned = learnedChars.includes(item.char);

              return (
                <div
                  key={item.char}
                  style={{
                    background: 'rgba(17, 24, 39, 0.75)',
                    backdropFilter: 'blur(16px)',
                  }}
                  className={`relative p-3.5 rounded-2xl border transition-all ${
                    isPlaying
                      ? 'border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.4)] scale-[1.01]'
                      : 'border-white/10 hover:border-cyan-500/40 shadow-md'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-baseline gap-2.5">
                      <span className="text-3xl font-extrabold text-white font-sans drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                        {item.char}
                      </span>
                      <div className="flex flex-col">
                        <span className="text-xs font-mono font-bold text-cyan-300">
                          {item.romaji}
                        </span>
                        <span className="text-[11px] text-amber-300 font-medium">
                          អានថា: {item.khmerSound}
                        </span>
                      </div>
                    </div>

                    {isLearned && (
                      <span className="p-1 rounded-full bg-emerald-500/20 text-emerald-400" title="បានរៀន">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </span>
                    )}
                  </div>

                  <p className="text-[11px] text-slate-400 mt-1 mb-2.5">
                    {item.meaning} · {item.strokes} គំនូស
                  </p>

                  <div className="flex items-center gap-1.5 pt-2 border-t border-slate-800 mt-1">
                    <button
                      onClick={() => handlePlaySound(item.char)}
                      type="button"
                      className={`flex-1 py-1.5 px-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all active:scale-95 ${
                        isPlaying
                          ? 'bg-cyan-400 text-slate-950 shadow-[0_0_12px_rgba(6,182,212,0.8)]'
                          : 'bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40'
                      }`}
                    >
                      <Volume2 className={`w-3.5 h-3.5 ${isPlaying ? 'animate-bounce' : ''}`} />
                      <span>{isPlaying ? 'កំពុងបន្លឺ...' : '🔊 ស្តាប់'}</span>
                    </button>

                    <button
                      onClick={() => setActiveStrokeModal(item)}
                      type="button"
                      className="py-1.5 px-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-medium text-xs flex items-center gap-1 transition-colors"
                    >
                      <Pencil className="w-3 h-3 text-amber-400" />
                      <span className="text-[11px]">គំនូស</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <button
            onClick={() => setCurrentView('level_6_15')}
            type="button"
            className="w-full py-3 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-500 text-slate-950 font-bold text-xs shadow-[0_0_20px_rgba(6,182,212,0.4)] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            <span>បន្ទាប់: រៀន Level 06 - 15 ព្យញ្ជនៈផ្សំ Ka, Sa, Ta</span>
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>
      )}

      {selectedLang === 'ja' && currentView === 'level_6_15' && (
        <div className="space-y-3.5 animate-in fade-in duration-200">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <button
              onClick={() => setCurrentView('roadmap')}
              type="button"
              className="text-xs text-cyan-300 hover:text-white flex items-center gap-1.5 py-1 px-2.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-cyan-500/40 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>← ត្រឡប់ទៅផែនទីមេរៀន (Roadmap)</span>
            </button>
            <span className="text-[11px] text-cyan-400 font-mono">
              Level 06 - 15: ជួរ Ka, Sa, Ta (15% - 35%)
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {japaneseKaRow.map((item) => {
              const isPlaying = playingChar === item.char;

              return (
                <div
                  key={item.char}
                  style={{
                    background: 'rgba(17, 24, 39, 0.75)',
                    backdropFilter: 'blur(16px)',
                  }}
                  className={`relative p-3.5 rounded-2xl border transition-all ${
                    isPlaying
                      ? 'border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.4)] scale-[1.01]'
                      : 'border-white/10 hover:border-cyan-500/40 shadow-md'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-baseline gap-2.5">
                      <span className="text-3xl font-extrabold text-white font-sans drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                        {item.char}
                      </span>
                      <div className="flex flex-col">
                        <span className="text-xs font-mono font-bold text-cyan-300">
                          {item.romaji}
                        </span>
                        <span className="text-[11px] text-amber-300 font-medium">
                          អានថា: {item.khmerSound}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-400 mt-1 mb-2.5">
                    {item.meaning}
                  </p>

                  <div className="flex items-center gap-1.5 pt-2 border-t border-slate-800 mt-1">
                    <button
                      onClick={() => handlePlaySound(item.char)}
                      type="button"
                      className="flex-1 py-1.5 px-2.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 font-bold text-xs flex items-center justify-center gap-1.5"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>{isPlaying ? 'កំពុងបន្លឺ...' : '🔊 ស្តាប់សំឡេង'}</span>
                    </button>
                    <button
                      onClick={() => setActiveStrokeModal(item)}
                      type="button"
                      className="py-1.5 px-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs"
                    >
                      <Pencil className="w-3 h-3 text-amber-400" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <button
            onClick={() => setCurrentView('roadmap')}
            type="button"
            className="w-full py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-cyan-300 font-bold text-xs transition-colors flex items-center justify-center gap-2 border border-cyan-500/30"
          >
            <span>មើលផែនទីកម្រិតបន្ទាប់ (Level 16 - 25 VIP)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {selectedLang === 'ja' && currentView === 'level_40_lab' && (
        <div className="space-y-4 animate-in fade-in duration-200">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <button
              onClick={() => setCurrentView('roadmap')}
              type="button"
              className="text-xs text-cyan-300 hover:text-white flex items-center gap-1.5 py-1 px-2.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-cyan-500/40 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>← ត្រឡប់ទៅផែនទីមេរៀន (Roadmap)</span>
            </button>
            <span className="text-[11px] text-amber-400 font-mono font-bold">
              Level 40: Live Reading Lab (100%)
            </span>
          </div>

          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
            {readingPassages.map((p, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setActiveReadingIndex(idx);
                  setPronunciationScore(null);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs whitespace-nowrap font-medium transition-all ${
                  activeReadingIndex === idx
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50 shadow-sm'
                    : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                {p.title}
              </button>
            ))}
          </div>

          {readingPassages[activeReadingIndex] && (
            <div
              style={{
                background: 'rgba(17, 24, 39, 0.85)',
                backdropFilter: 'blur(16px)',
              }}
              className="p-4 sm:p-5 rounded-3xl border border-amber-500/40 shadow-[0_0_30px_rgba(245,158,11,0.2)] space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-300 uppercase tracking-wide">
                  {readingPassages[activeReadingIndex].level}
                </span>
                <span className="text-[11px] text-slate-400">
                  អានអត្ថបទជប៉ុនសុទ្ធ
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-black/50 border border-slate-800 text-center">
                <h3 className="text-lg sm:text-xl font-bold text-white tracking-wide leading-relaxed font-sans">
                  {readingPassages[activeReadingIndex].japanese}
                </h3>
                <p className="text-xs font-mono text-cyan-300 mt-2">
                  {readingPassages[activeReadingIndex].romaji}
                </p>
                <p className="text-xs text-amber-200/90 mt-1 font-khmer">
                  "{readingPassages[activeReadingIndex].khmer}"
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                <button
                  onClick={() =>
                    handleAiReadSentence(readingPassages[activeReadingIndex].japanese)
                  }
                  type="button"
                  className={`py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                    isAiReading
                      ? 'bg-cyan-400 text-slate-950 shadow-[0_0_15px_#38bdf8]'
                      : 'bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40'
                  }`}
                >
                  <Volume2 className={`w-4 h-4 ${isAiReading ? 'animate-bounce' : ''}`} />
                  <span>{isAiReading ? 'AI កំពុងបំពងសំឡេង...' : '🔊 AI អានតាមមួយម៉ាត់ៗ'}</span>
                </button>

                <button
                  onClick={handleRecordStudent}
                  type="button"
                  className={`py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                    isRecordingStudent
                      ? 'bg-rose-500 text-white animate-pulse shadow-[0_0_15px_#f43f5e]'
                      : 'bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40'
                  }`}
                >
                  <Mic className={`w-4 h-4 ${isRecordingStudent ? 'animate-spin' : ''}`} />
                  <span>
                    {isRecordingStudent ? 'កំពុងថត & វិភាគសំឡេង...' : '🎙️ ថតសំឡេងផ្ទៀងផ្ទាត់'}
                  </span>
                </button>
              </div>

              {pronunciationScore !== null && (
                <div className="p-3 rounded-2xl bg-gradient-to-r from-emerald-950/60 to-slate-900 border border-emerald-500/40 flex items-center justify-between animate-in zoom-in-95 duration-200">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-bold text-sm">
                      <Check className="w-5 h-5 stroke-[2.5]" />
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-emerald-300">
                        កម្រិតបញ្ចេញសំឡេង: {pronunciationScore}% ត្រឹមត្រូវល្អឥតខ្ចោះ
                      </h5>
                      <span className="text-[10px] text-slate-400">
                        ការសង្កត់សំឡេង សូរសំនៀង និងចង្វាក់ស្របតាមស្តង់ដារតូក្យូ
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-black text-emerald-400 font-mono">
                    Grade A+
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* 5. Stroke Order Guide Popup Modal */}
      {activeStrokeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-xs rounded-3xl bg-[#0f172a] border border-cyan-500/40 p-5 shadow-[0_0_40px_rgba(6,182,212,0.3)] text-slate-100">
            <button
              onClick={() => setActiveStrokeModal(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-white/10"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="text-center mb-4">
              <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest block mb-1">
                របៀបសរសេរតាមលំដាប់គំនូស (Stroke Order)
              </span>
              <div className="w-20 h-20 mx-auto rounded-2xl bg-black/60 border border-cyan-500/50 flex items-center justify-center mb-2 shadow-inner">
                <span className="text-5xl font-extrabold text-white font-sans drop-shadow-[0_0_12px_#38bdf8]">
                  {activeStrokeModal.char}
                </span>
              </div>
              <div className="text-xs font-mono text-cyan-300 font-bold">
                {activeStrokeModal.romaji} · អានថា: {activeStrokeModal.khmerSound}
              </div>
              <span className="text-[11px] text-amber-300">
                ចំនួនគំនូសសរុប: {activeStrokeModal.strokes} គំនូស
              </span>
            </div>

            <div className="space-y-2 mb-4 bg-slate-900/80 p-3 rounded-2xl border border-slate-800 text-[11px] text-slate-300 leading-relaxed">
              <h5 className="font-bold text-white text-xs mb-1.5 flex items-center gap-1.5">
                <Pencil className="w-3.5 h-3.5 text-cyan-400" />
                <span>ការណែនាំតាមជំហាន៖</span>
              </h5>
              {activeStrokeModal.strokeSteps.map((step, idx) => (
                <div key={idx} className="flex items-start gap-1.5">
                  <span className="w-4 h-4 rounded-full bg-cyan-500/20 text-cyan-300 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <p>{step}</p>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => handlePlaySound(activeStrokeModal.char)}
                className="flex-1 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 text-xs font-bold flex items-center justify-center gap-1.5"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>ស្តាប់សំឡេង</span>
              </button>
              <button
                onClick={() => setActiveStrokeModal(null)}
                className="flex-1 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold transition-colors"
              >
                យល់ហើយ (Done)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
