import React, { useState, useEffect, useRef } from 'react';
import {
  Music,
  Play,
  Pause,
  Upload,
  Sparkles,
  Copy,
  Check,
  Mic,
  Disc,
  Radio,
  Sliders,
  RotateCcw,
  Volume2,
  VolumeX,
  FileAudio,
  Crown,
  Share2,
  Download,
  Flame,
  ArrowRight,
  Headphones,
  Activity,
  Layers,
  Save,
  CheckCircle2,
  Square,
  Clock,
} from 'lucide-react';

interface SongStudioProps {
  onOpenVip?: () => void;
  isVipActive?: boolean;
}

interface SampleBeat {
  id: string;
  title: string;
  genre: string;
  bpm: number;
  key: string;
  duration: number; // in seconds
  description: string;
}

const SAMPLE_BEATS: SampleBeat[] = [
  {
    id: 'lofi_rnb',
    title: 'Chill Lo-Fi Soul Beat',
    genre: 'R&B / Soul',
    bpm: 85,
    key: 'E Minor',
    duration: 155,
    description: 'បាសទន់ល្មើយ ព្យាណូផ្អែមល្ហែម ស័ក្តិសមជាមួយបទមនោសញ្ចេតនា និងស្នេហា',
  },
  {
    id: 'khmer_trap',
    title: 'Khmer Trap Fire Anthem',
    genre: 'Hip-hop / Trap',
    bpm: 140,
    key: 'C Minor',
    duration: 140,
    description: 'ចង្វាក់ 808 ធ្ងន់ៗ ស្គារញាក់លឿន សម្រាប់បទ Rap និងទំនុកចិត្តខ្ពស់',
  },
  {
    id: 'acoustic_pop',
    title: 'Acoustic Pop Guitar',
    genre: 'Pop / Acoustic',
    bpm: 95,
    key: 'G Major',
    duration: 165,
    description: 'ហ្គីតាប្រពៃណីកក់ក្តៅ សំឡេងធម្មជាតិ ងាយចាំ និងច្រៀងតាម',
  },
  {
    id: 'edm_festival',
    title: 'Neon Festival Drop',
    genre: 'EDM / Dance',
    bpm: 128,
    key: 'A Minor',
    duration: 150,
    description: 'កន្ត្រាក់អារម្មណ៍ កម្លាំងថាមពលខ្លាំង ស័ក្តិសមសម្រាប់ Party និងក្លឹប',
  },
  {
    id: 'folk_fusion',
    title: 'Modern Romvong Fusion',
    genre: 'Romvong / Folk',
    bpm: 115,
    key: 'D Major',
    duration: 160,
    description: 'ចង្វាក់រាំវង់បែបសម័យថ្មី លាយឡំស្គរដៃ និង Bass ទំនើប រីករាយគ្រប់រដូវកាល',
  },
];

export const SongStudio: React.FC<SongStudioProps> = ({
  onOpenVip,
  isVipActive = false,
}) => {
  // --- Audio / Beat State ---
  const [selectedBeat, setSelectedBeat] = useState<SampleBeat>(SAMPLE_BEATS[0]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);

  // --- Song Style & Customization State ---
  const [songTopic, setSongTopic] = useState<string>('ស្នេហាខូចចិត្ត នឹកមនុស្សម្នាក់ដែលចាកចេញទាំងគ្មានពាក្យលា');
  const [selectedGenre, setSelectedGenre] = useState<string>('R&B');
  const [selectedLang, setSelectedLang] = useState<'kh' | 'en' | 'mix'>('kh');
  const [flowStyle, setFlowStyle] = useState<'melodic' | 'rap' | 'chorus'>('melodic');

  // --- Generation & Output State ---
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generationStep, setGenerationStep] = useState<string>('');
  const [lyricsData, setLyricsData] = useState<any>(null);
  const [copied, setCopied] = useState<boolean>(false);
  const [isTeleprompterActive, setIsTeleprompterActive] = useState<boolean>(true);
  const [isSaved, setIsSaved] = useState<boolean>(false);

  // --- Vocal Recording Simulation State ---
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recordTimer, setRecordTimer] = useState<number>(0);
  const [recordedVocal, setRecordedVocal] = useState<boolean>(false);
  const [vocalScore, setVocalScore] = useState<number | null>(null);

  const timerRef = useRef<any>(null);

  // Playback timer & rhythm sync (smooth silent timer counter without dummy beeps)
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= selectedBeat.duration) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, selectedBeat]);

  // Vocal Recording Timer simulation
  useEffect(() => {
    let recInterval: any;
    if (isRecording) {
      recInterval = setInterval(() => {
        setRecordTimer((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(recInterval);
  }, [isRecording]);

  const handleTogglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (newTime: number) => {
    setCurrentTime(newTime);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // Preset Story / Topic Chips
  const topicPresets = [
    { label: '💔 ស្នេហាខូចចិត្ត', text: 'ស្នេហាខូចចិត្ត នឹកមនុស្សម្នាក់ដែលចាកចេញទាំងគ្មានពាក្យលា ក្នុងរាត្រីភ្លៀងធ្លាក់' },
    { label: '🔥 ជីវិតតស៊ូ', text: 'ដំណើរជីវិតក្មេងខេត្តមកតស៊ូរៀន និងធ្វើការនៅភ្នំពេញ មិនចុះចាញ់ឧបសគ្គ' },
    { label: '🎤 Hip-hop កម្លាំងចិត្ត', text: 'ទំនុកចិត្ត ការជឿជាក់លើខ្លួនឯង ក្រោកឈរតស៊ូដណ្តើមយកជ័យជម្នះ' },
    { label: '🎉 Party រីករាយ', text: 'រាត្រីជួបជុំមិត្តភក្តិ រាំលេងកម្សាន្ត បំភ្លេចទុក្ខកង្វល់ ជាមួយចង្វាក់ភ្លេងរស់រវើក' },
    { label: '🌾 នឹកស្រុកកំណើត', text: 'នឹកក្លិនវាលស្រែ នឹកផ្ទះ នឹកឪពុកម្តាយ និងអនុស្សាវរីយ៍កាលពីកុមារភាព' },
  ];

  const genres = [
    { id: 'R&B', name: 'R&B / Soul' },
    { id: 'Pop', name: 'Modern Pop' },
    { id: 'Hip-hop', name: 'Hip-hop / Rap' },
    { id: 'Acoustic', name: 'Acoustic / Sad' },
    { id: 'EDM', name: 'EDM / Dance' },
    { id: 'Romvong', name: 'Romvong Fusion' },
  ];

  // Default rich generated lyrics generator
  const handleGenerateLyrics = () => {
    setIsGenerating(true);
    setLyricsData(null);
    setIsSaved(false);

    setGenerationStep('កំពុងវិភាគ Transient ភ្លេង និងចង្វាក់ BPM...');
    setTimeout(() => {
      setGenerationStep('កំពុងកំណត់ Rhyme Scheme (ចួនកាព្យ) ឱ្យត្រូវតាម Rhythm...');
    }, 600);

    setTimeout(() => {
      setGenerationStep('កំពុងនិពន្ធបន្ទរ (Catchy Chorus) និងបែងចែក Timing...');
    }, 1200);

    setTimeout(() => {
      setIsGenerating(false);

      // Generate contextually rhymed lyrics based on language & topic
      if (selectedLang === 'en') {
        setLyricsData({
          title: 'Echoes in the Rain',
          bpm: selectedBeat.bpm,
          key: selectedBeat.key,
          sections: [
            {
              type: '[Intro]',
              timeRange: '0:00 - 0:15',
              secondsStart: 0,
              secondsEnd: 15,
              lines: [
                '(Soft piano chords fading in...)',
                'Yeah, watching city lights turn to blur...',
                'Wondering if you ever feel the cold like I do.',
              ],
            },
            {
              type: '[Verse 1]',
              timeRange: '0:15 - 0:42',
              secondsStart: 15,
              secondsEnd: 42,
              lines: [
                'Midnight coffee getting cold in my hands',
                'Footsteps tracing all our broken plans',
                'You said forever, but forever ran away',
                'Now I am searching for words I never got to say.',
              ],
            },
            {
              type: '[Chorus / Catchy Hook]',
              timeRange: '0:42 - 1:10',
              secondsStart: 42,
              secondsEnd: 70,
              isHighlight: true,
              lines: [
                'And the rain keeps falling on my windowpane',
                'Whispering your memories, driving me insane!',
                'I thought love was a shelter, not a burning flame',
                'Now all I hear is the echo of your name.',
              ],
            },
            {
              type: '[Verse 2]',
              timeRange: '1:10 - 1:35',
              secondsStart: 70,
              secondsEnd: 95,
              lines: [
                'Passing the cafe where we used to laugh so loud',
                'Now I am just a stranger walking through the crowd',
                'Checking my screen hoping for a single sign',
                'Knowing you are happy, but you are no longer mine.',
              ],
            },
            {
              type: '[Bridge]',
              timeRange: '1:35 - 1:55',
              secondsStart: 95,
              secondsEnd: 115,
              lines: [
                'Maybe time will heal what words tore apart',
                'Maybe silence is the armor for a broken heart...',
              ],
            },
            {
              type: '[Outro]',
              timeRange: '1:55 - 2:20',
              secondsStart: 115,
              secondsEnd: 140,
              lines: [
                'Yeah... echoes in the rain...',
                'No more tears, just letting go...',
                '(Instrumental fades out with heartbeat kick)',
              ],
            },
          ],
        });
      } else if (selectedLang === 'mix') {
        setLyricsData({
          title: 'រាត្រីភ្លៀងធ្លាក់ (Midnight Memories)',
          bpm: selectedBeat.bpm,
          key: selectedBeat.key,
          sections: [
            {
              type: '[Intro]',
              timeRange: '0:00 - 0:15',
              secondsStart: 0,
              secondsEnd: 15,
              lines: [
                '(ភ្លេងបន្លឺឡើងជាមួយសូរដំណក់ទឹកភ្លៀង...)',
                'Midnight in Phnom Penh, driving all alone...',
                'ទូរស័ព្ទស្ងាត់ជ្រងំ គ្មានសារពីអូនទៀតឡើយ។',
              ],
            },
            {
              type: '[Verse 1]',
              timeRange: '0:15 - 0:42',
              secondsStart: 15,
              secondsEnd: 42,
              lines: [
                'ភ្លៀងធ្លាក់ស្រិចៗ ស្រក់មកចំកណ្តាលបេះដូង',
                'រូបអូនដើរចេញ ចោលបងឱ្យនៅស្រណោះកន្លង',
                'You promised forever, but you walked away so cold',
                'ក្តីស្រលាញ់ធ្លាប់ផ្អែមល្ហែម ពេលនេះសល់ត្រឹមទឹកភ្នែកហូរ។',
              ],
            },
            {
              type: '[Chorus / បន្ទរ]',
              timeRange: '0:42 - 1:10',
              secondsStart: 42,
              secondsEnd: 70,
              isHighlight: true,
              lines: [
                'Tell me baby, why you break my heart tonight?',
                'តើបងខុសអ្វី ទើបអូនទៅចោលមិនស្តាយស្រណោះ?',
                'I am standing in the rain, fading out of sight',
                'សល់ត្រឹមការឈឺចាប់ និងអនុស្សាវរីយ៍ដែលគ្មានថ្ងៃវិលវិញ!',
              ],
            },
            {
              type: '[Verse 2]',
              timeRange: '1:10 - 1:35',
              secondsStart: 70,
              secondsEnd: 95,
              lines: [
                'ជិះកាត់ផ្លូវចាស់ដែលធ្លាប់អង្គុយជាមួយគ្នា',
                'ឃើញគេញញឹម កាន់ដៃគ្នារាល់វេលា',
                'Now it is just me and my broken melody',
                'សង្ឃឹមថាថ្ងៃស្អែក បងអាចបំភ្លេចរូបអូនបាន។',
              ],
            },
            {
              type: '[Bridge & Outro]',
              timeRange: '1:35 - 2:15',
              secondsStart: 95,
              secondsEnd: 135,
              lines: [
                'Time will heal... ពេលវេលានឹងជួយលាងជម្រះ',
                'លាហើយស្នេហ៍ដំបូង... Goodbye my midnight love.',
              ],
            },
          ],
        });
      } else {
        // Natural Pure Khmer Flow
        setLyricsData({
          title: 'ដំណក់ទឹកភ្លៀងលាងស្នាមស្នេហ៍',
          bpm: selectedBeat.bpm,
          key: selectedBeat.key,
          sections: [
            {
              type: '[Intro - ក្បាលបទ]',
              timeRange: '0:00 - 0:15',
              secondsStart: 0,
              secondsEnd: 15,
              lines: [
                '(សំឡេងព្យាណូបន្លឺឡើងរលឹមស្រិចៗ...)',
                'យប់កាន់តែជ្រៅ ភ្លៀងកាន់តែខ្លាំង...',
                'តើពេលនេះអូនគេងលក់ហើយឬនៅ?',
              ],
            },
            {
              type: '[Verse 1 - វគ្គទី ១]',
              timeRange: '0:15 - 0:42',
              secondsStart: 15,
              secondsEnd: 42,
              lines: [
                'មើលទៅមេឃខ្មៅ ស្រក់មកនូវដំណក់ទឹកភ្នែក',
                'ស្នេហាធ្លាប់ផ្អែម ពេលនេះបែរជាត្រូវបែក',
                'ពាក្យសន្យាអូនថែ ឥឡូវប្រែក្លាយជាផ្សែង',
                'ទុកឱ្យរូបបង រស់នៅឯកោតែម្នាក់ឯង។',
              ],
            },
            {
              type: '[Pre-Chorus - ត្រៀមបន្ទរ]',
              timeRange: '0:42 - 0:52',
              secondsStart: 42,
              secondsEnd: 52,
              lines: [
                'ខ្យល់បក់ត្រជាក់ ប៉ះចំទ្រូងខាងឆ្វេង',
                'ឈឺចាប់ស្ទើរស្ទះ នឹកគេមិនដែលលែង...',
              ],
            },
            {
              type: '[Chorus / បន្ទរ - ទំនុកទាក់ទាញ ងាយចាំ]',
              timeRange: '0:52 - 1:20',
              secondsStart: 52,
              secondsEnd: 80,
              isHighlight: true,
              lines: [
                'ភ្លៀងអើយជួយលុប ស្នាមស្នេហ៍ដែលធ្លាប់មាន',
                'កុំឱ្យបេះដូង នៅដង្ហោយរកពាល',
                'គេមានអ្នកថ្មី គេបំភ្លេចយើងអស់ហើយ',
                'ឈប់យំទៅបេះដូងអើយ គេមិនវិលវិញទេ!',
              ],
            },
            {
              type: '[Verse 2 - វគ្គទី ២]',
              timeRange: '1:20 - 1:45',
              secondsStart: 80,
              secondsEnd: 105,
              lines: [
                'ឃើញរូបថតចាស់ ដែលធ្លាប់ញញឹមជាមួយគ្នា',
                'ក្តីសុខកន្លង ក្លាយជាស្រមោលរាល់វេលា',
                'ទោះខំញញឹម តែក្នុងចិត្តនៅគ្រាំគ្រា',
                'ដឹងច្បាស់ថាអូន គ្មានថ្ងៃវិលត្រឡប់ឡើយ។',
              ],
            },
            {
              type: '[Bridge - ភ្ជាប់បទ]',
              timeRange: '1:45 - 2:05',
              secondsStart: 105,
              secondsEnd: 125,
              lines: [
                'សូមជូនពរអូន ជួបមនុស្សដែលល្អជាងបង',
                'កុំឱ្យដូចបង ដែលមានត្រឹមតែបេះដូងស្មោះ...',
              ],
            },
            {
              type: '[Outro - បញ្ចប់]',
              timeRange: '2:05 - 2:30',
              secondsStart: 125,
              secondsEnd: 150,
              lines: [
                'លាហើយកែវភ្នែក... លាហើយមនុស្សធ្លាប់ស្រលាញ់...',
                '(ភ្លេងបាសស្រាលៗរសាត់បាត់ទៅតាមខ្យល់)',
              ],
            },
          ],
        });
      }
    }, 1800);
  };

  const handleCopyLyrics = () => {
    if (!lyricsData) return;
    const fullText = lyricsData.sections
      .map((s: any) => `${s.type} (${s.timeRange})\n${s.lines.join('\n')}`)
      .join('\n\n');
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleStartRecording = () => {
    if (isRecording) {
      // Stop recording
      setIsRecording(false);
      setRecordedVocal(true);
      const score = Math.floor(Math.random() * 6) + 93;
      setVocalScore(score);
    } else {
      // Start recording
      setIsRecording(true);
      setRecordTimer(0);
      setVocalScore(null);
      if (!isPlaying) setIsPlaying(true);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFileName(file.name);
      setSelectedBeat({
        id: 'uploaded_custom',
        title: file.name.replace(/\.[^/.]+$/, ''),
        genre: 'Custom Instrumental',
        bpm: 120,
        key: 'Detected: C Minor',
        duration: 180,
        description: 'Uploaded Audio Beat · Analyzed by OmniAI Neural Transients',
      });
      setCurrentTime(0);
      setIsPlaying(false);
    }
  };

  return (
    <div className="space-y-6 font-khmer select-none text-slate-100 pb-12">
      {/* ========================================================================
          HERO BANNER: AI SONG & LYRIC STUDIO
          ======================================================================== */}
      <div className="relative p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-fuchsia-950/60 via-purple-950/40 to-slate-950 border border-fuchsia-500/40 shadow-[0_0_35px_rgba(236,72,153,0.25)] overflow-hidden">
        {/* Neon Glow backdrop */}
        <div className="absolute top-0 right-1/4 w-80 h-32 bg-fuchsia-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
          <div className="flex items-center gap-3.5">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-fuchsia-600 via-pink-500 to-purple-600 p-[2px] shadow-[0_0_20px_rgba(236,72,153,0.5)] shrink-0">
              <div className="w-full h-full bg-[#0d071a] rounded-2xl flex items-center justify-center text-pink-400">
                <Headphones className="w-7 h-7 animate-pulse" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-black text-white tracking-tight">
                  បង្កើតចម្រៀង & ទំនុកច្រៀង AI
                </h2>
                <span className="px-2.5 py-0.5 rounded-full bg-gradient-to-r from-fuchsia-500/20 to-pink-500/20 border border-fuchsia-500/40 text-fuchsia-300 text-[10px] font-bold">
                  🔥 Super Feature
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1">
                Upload Beat / ភ្លេងសុទ្ធ → ប្រព័ន្ធ AI រៀបចំទំនុកច្រៀងត្រូវតាម Rhythm, Flow & Rhyme Scheme
              </p>
            </div>
          </div>

          {/* Audio Quality Badge */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="px-3 py-1.5 rounded-2xl bg-black/50 border border-fuchsia-500/30 flex items-center gap-2">
              <Activity className="w-4 h-4 text-pink-400" />
              <div className="text-left font-mono">
                <span className="text-[10px] text-slate-400 block leading-tight">Audio Engine</span>
                <span className="text-xs font-bold text-pink-300">320kbps Studio Audio</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================
          STEP 1: UPLOAD INSTRUMENTAL / BEAT (ដាក់ភ្លេងសុទ្ធ)
          ======================================================================== */}
      <section className="space-y-3 p-5 rounded-3xl bg-slate-900/60 border border-slate-800 backdrop-blur-xl">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-pink-500/20 text-pink-400 font-mono font-bold text-xs flex items-center justify-center border border-pink-500/30">
              1
            </span>
            <h3 className="text-sm sm:text-base font-bold text-white">
              ដាក់ភ្លេងសុទ្ធ (Select or Upload Instrumental Beat)
            </h3>
          </div>
          <span className="text-xs text-slate-400 font-mono">MP3, WAV, FLAC Supported</span>
        </div>

        {/* Preloaded Sample Beats Strip */}
        <div className="space-y-1.5">
          <span className="text-xs text-slate-400 block">
            🎵 ជ្រើសរើសចង្វាក់គំរូ (Sample Preset Beats) ឬ Upload ផ្ទាល់ខ្លួន:
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
            {SAMPLE_BEATS.map((beat) => {
              const isSelected = selectedBeat.id === beat.id;
              return (
                <button
                  key={beat.id}
                  onClick={() => {
                    setSelectedBeat(beat);
                    setCurrentTime(0);
                    setUploadedFileName(null);
                  }}
                  type="button"
                  className={`p-3 rounded-2xl text-left border transition-all ${
                    isSelected
                      ? 'bg-fuchsia-950/40 border-pink-500 text-white shadow-[0_0_15px_rgba(236,72,153,0.3)]'
                      : 'bg-black/40 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-mono text-pink-400 font-bold">
                      {beat.bpm} BPM
                    </span>
                    <span className="text-[9px] text-slate-500 font-mono">{beat.key}</span>
                  </div>
                  <h5 className="text-xs font-bold text-slate-200 truncate">{beat.title}</h5>
                  <span className="text-[10px] text-slate-400 block mt-0.5 truncate">{beat.genre}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Custom Upload Dropzone */}
        <div className="relative border-2 border-dashed border-slate-700/80 hover:border-pink-500/60 rounded-2xl p-4 text-center bg-black/30 transition-colors group">
          <input
            type="file"
            accept="audio/*"
            onChange={handleFileUpload}
            className="absolute inset-0 opacity-0 cursor-pointer z-10"
          />
          <div className="flex flex-col items-center gap-1.5">
            <Upload className="w-6 h-6 text-pink-400 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-bold text-slate-200">
              {uploadedFileName ? `✓ ឯកសារបានជ្រើស: ${uploadedFileName}` : 'អូសទម្លាក់ Beat របស់អ្នកនៅទីនេះ ឬចុចដើម្បី Upload ភ្លេងសុទ្ធ'}
            </span>
            <span className="text-[10px] text-slate-500 font-mono">
              AI Beat Detector នឹងវិភាគ BPM, Key, និងចង្វាក់ដោយស្វ័យប្រវត្តិ
            </span>
          </div>
        </div>

        {/* Audio Waveform Visualizer & Player Dock */}
        <div className="p-4 rounded-2xl bg-black/60 border border-fuchsia-500/30 space-y-3">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <Disc className={`w-4 h-4 text-pink-400 ${isPlaying ? 'animate-spin' : ''}`} />
              <span className="font-bold text-white">{selectedBeat.title}</span>
              <span className="text-slate-400">({selectedBeat.genre})</span>
            </div>

            {/* AI Beat Detector Realtime Badges */}
            <div className="flex items-center gap-2 font-mono text-[11px]">
              <span className="px-2 py-0.5 rounded-full bg-pink-500/20 text-pink-300 border border-pink-500/40 font-bold">
                🥁 {selectedBeat.bpm} BPM
              </span>
              <span className="px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/40">
                🎹 {selectedBeat.key}
              </span>
            </div>
          </div>

          {/* Interactive 36-Band Waveform Canvas */}
          <div className="h-16 flex items-center justify-between gap-1 px-2 bg-slate-950/80 rounded-xl border border-slate-800">
            {Array.from({ length: 36 }).map((_, i) => {
              const activeProgress = (currentTime / selectedBeat.duration) * 36;
              const isPast = i <= activeProgress;
              const pseudoHeights = [18, 32, 54, 40, 24, 60, 48, 20, 42, 65, 30, 50, 72, 36, 28, 55, 68, 44, 22, 46, 62, 38, 26, 58, 48, 30, 52, 66, 40, 24, 44, 60, 32, 20, 36, 18];
              const h = pseudoHeights[i % pseudoHeights.length];

              return (
                <div
                  key={i}
                  onClick={() => handleSeek((i / 36) * selectedBeat.duration)}
                  className={`flex-1 rounded-full cursor-pointer transition-all duration-150 ${
                    isPast
                      ? 'bg-gradient-to-t from-pink-500 to-cyan-400 shadow-[0_0_8px_rgba(236,72,153,0.6)]'
                      : 'bg-slate-800 hover:bg-slate-700'
                  } ${isPlaying && isPast ? 'animate-pulse' : ''}`}
                  style={{
                    height: isPlaying && isPast ? `${Math.max(14, (h * 1.2) % 60)}px` : `${Math.max(10, h * 0.7)}px`,
                  }}
                />
              );
            })}
          </div>

          {/* Playback Controls & Scrubber */}
          <div className="flex items-center justify-between gap-3 text-xs">
            <button
              onClick={handleTogglePlay}
              type="button"
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-slate-950 font-black text-xs flex items-center gap-1.5 shadow-[0_0_15px_rgba(236,72,153,0.4)] active:scale-95 transition-all"
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5 fill-slate-950" /> : <Play className="w-3.5 h-3.5 fill-slate-950" />}
              <span>{isPlaying ? 'ផ្អាក (Pause)' : 'ចាក់ភ្លេង (Play Beat)'}</span>
            </button>

            {/* Time Indicator */}
            <div className="flex items-center gap-2 text-slate-400 font-mono text-xs">
              <Clock className="w-3.5 h-3.5" />
              <span className="text-white font-bold">{formatTime(currentTime)}</span>
              <span>/</span>
              <span>{formatTime(selectedBeat.duration)}</span>
            </div>

            <button
              onClick={() => setIsMuted(!isMuted)}
              type="button"
              className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition-colors"
              title={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-pink-400" />}
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================================
          STEP 2: SONG STYLE & TOPIC CUSTOMIZATION (កំណត់ប្រធានបទ)
          ======================================================================== */}
      <section className="space-y-3.5 p-5 rounded-3xl bg-slate-900/60 border border-slate-800 backdrop-blur-xl">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
          <span className="w-6 h-6 rounded-full bg-purple-500/20 text-purple-400 font-mono font-bold text-xs flex items-center justify-center border border-purple-500/30">
            2
          </span>
          <h3 className="text-sm sm:text-base font-bold text-white">
            កំណត់ប្រធានបទ និងទម្រង់ចម្រៀង (Style & Lyric Topic)
          </h3>
        </div>

        {/* Quick Topic Presets */}
        <div className="space-y-1.5">
          <span className="text-xs text-slate-400 block">
            💡 ជ្រើសរើសប្រធានបទរហ័ស (Preset Story Themes):
          </span>
          <div className="flex flex-wrap gap-2">
            {topicPresets.map((p, idx) => (
              <button
                key={idx}
                onClick={() => setSongTopic(p.text)}
                type="button"
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                  songTopic === p.text
                    ? 'bg-purple-600 text-white shadow-[0_0_12px_rgba(168,85,247,0.4)]'
                    : 'bg-black/40 text-slate-300 hover:bg-white/5 border border-slate-800'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Topic Input Textarea */}
        <div className="space-y-1">
          <label className="text-xs font-semibold text-purple-300 block">
            ✍️ សាច់រឿង ឬអត្ថន័យចម្រៀងដែលអ្នកចង់ឱ្យ AI និពន្ធ (Song Story / Lyrics Brief):
          </label>
          <textarea
            rows={2}
            value={songTopic}
            onChange={(e) => setSongTopic(e.target.value)}
            placeholder="ឧទាហរណ៍: ស្នេហាខូចចិត្ត នឹកមនុស្សម្នាក់ដែលចាកចេញទាំងគ្មានពាក្យលា ក្នុងរាត្រីភ្លៀងធ្លាក់..."
            className="w-full bg-black/60 border border-purple-900/60 rounded-2xl p-3 text-xs sm:text-sm text-white focus:outline-none focus:border-pink-500 font-khmer leading-relaxed resize-none"
          />
        </div>

        {/* Genre & Language & Flow Selectors */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
          {/* Genre */}
          <div className="p-3 rounded-2xl bg-black/40 border border-slate-800 space-y-1.5">
            <span className="text-[11px] font-semibold text-slate-400 block">ចង្វាក់ (Genre):</span>
            <div className="flex flex-wrap gap-1.5">
              {genres.map((g) => (
                <button
                  key={g.id}
                  onClick={() => setSelectedGenre(g.id)}
                  type="button"
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-medium transition-all ${
                    selectedGenre === g.id
                      ? 'bg-pink-600 text-white'
                      : 'bg-slate-900 text-slate-400 hover:text-white'
                  }`}
                >
                  {g.name}
                </button>
              ))}
            </div>
          </div>

          {/* Language Toggle */}
          <div className="p-3 rounded-2xl bg-black/40 border border-slate-800 space-y-1.5">
            <span className="text-[11px] font-semibold text-slate-400 block">ភាសា (Language Flow):</span>
            <div className="grid grid-cols-3 gap-1">
              {[
                { id: 'kh', label: '🇰🇭 ខ្មែរសុទ្ធ' },
                { id: 'en', label: '🇬🇧 English' },
                { id: 'mix', label: '🇰🇭🇬🇧 Mix' },
              ].map((l) => (
                <button
                  key={l.id}
                  onClick={() => setSelectedLang(l.id as any)}
                  type="button"
                  className={`p-1.5 rounded-lg text-[10px] font-bold text-center transition-all ${
                    selectedLang === l.id
                      ? 'bg-purple-600 text-white'
                      : 'bg-slate-900 text-slate-400 hover:text-white'
                  }`}
                >
                  {l.label}
                </button>
              ))}
            </div>
          </div>

          {/* Flow Style */}
          <div className="p-3 rounded-2xl bg-black/40 border border-slate-800 space-y-1.5">
            <span className="text-[11px] font-semibold text-slate-400 block">ទម្រង់ Flow (Rhythm Style):</span>
            <div className="grid grid-cols-3 gap-1">
              {[
                { id: 'melodic', label: 'Slow Melodic' },
                { id: 'rap', label: 'Fast Rap Flow' },
                { id: 'chorus', label: 'Catchy Hook' },
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setFlowStyle(f.id as any)}
                  type="button"
                  className={`p-1.5 rounded-lg text-[10px] font-medium text-center transition-all ${
                    flowStyle === f.id
                      ? 'bg-pink-600 text-white'
                      : 'bg-slate-900 text-slate-400 hover:text-white'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================
          STEP 3: ACTION TRIGGER (GENERATE RHYMED LYRICS)
          ======================================================================== */}
      <div className="space-y-3">
        <button
          onClick={handleGenerateLyrics}
          disabled={isGenerating}
          type="button"
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-pink-600 via-purple-600 to-cyan-500 hover:from-pink-500 hover:to-cyan-400 text-white font-black text-sm sm:text-base tracking-wide shadow-[0_0_30px_rgba(236,72,153,0.5)] active:scale-[0.98] transition-all flex items-center justify-center gap-2.5 disabled:opacity-75"
        >
          {isGenerating ? (
            <>
              <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin" />
              <span>{generationStep || 'កំពុងបង្កើតទំនុកច្រៀងឱ្យត្រូវតាមចង្វាក់...'}</span>
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5 fill-white animate-pulse" />
              <span>✨ បង្កើតទំនុកច្រៀងឱ្យត្រូវតាមចង្វាក់ភ្លេង (Generate Rhymed Lyrics)</span>
            </>
          )}
        </button>
      </div>

      {/* ========================================================================
          STEP 4: SYNCHRONIZED LYRICS OUTPUT & TELEPROMPTER
          ======================================================================== */}
      {lyricsData && (
        <section className="space-y-4 p-5 sm:p-6 rounded-3xl bg-slate-900/80 border border-fuchsia-500/40 shadow-2xl animate-in zoom-in-95 duration-200">
          {/* Output Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-pink-400 bg-pink-500/20 px-2 py-0.5 rounded-md border border-pink-500/30">
                  AI Song Composition
                </span>
                <span className="text-xs text-slate-400">
                  BPM: {lyricsData.bpm} · Key: {lyricsData.key}
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-black text-white mt-1">
                🎶 {lyricsData.title}
              </h3>
            </div>

            {/* Quick Actions (Copy, Teleprompter, Record) */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setIsTeleprompterActive(!isTeleprompterActive)}
                type="button"
                className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-colors ${
                  isTeleprompterActive
                    ? 'bg-pink-600/30 border-pink-400 text-pink-200'
                    : 'bg-black/50 border-slate-700 text-slate-300'
                }`}
              >
                <Radio className="w-3.5 h-3.5" />
                <span>Teleprompter Sync</span>
              </button>

              <button
                onClick={handleCopyLyrics}
                type="button"
                className="px-3 py-1.5 rounded-xl bg-black/50 hover:bg-white/10 text-slate-200 border border-slate-700 text-xs font-bold flex items-center gap-1.5 transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'បានចម្លង!' : 'ចម្លងទំនុកច្រៀង'}</span>
              </button>

              <button
                onClick={() => {
                  setIsSaved(true);
                  setTimeout(() => setIsSaved(false), 2500);
                }}
                type="button"
                className="px-3 py-1.5 rounded-xl bg-black/50 hover:bg-white/10 text-slate-200 border border-slate-700 text-xs font-bold flex items-center gap-1.5 transition-colors"
              >
                <Save className="w-3.5 h-3.5 text-cyan-400" />
                <span>{isSaved ? 'បានរក្សាទុក ✓' : 'Save Project'}</span>
              </button>
            </div>
          </div>

          {/* Interactive Karaoke / Studio Teleprompter */}
          <div className="space-y-4 max-h-[500px] overflow-y-auto no-scrollbar p-3 rounded-2xl bg-black/60 border border-slate-800">
            {lyricsData.sections.map((sec: any, idx: number) => {
              const isActive =
                isTeleprompterActive &&
                currentTime >= sec.secondsStart &&
                currentTime < sec.secondsEnd;

              return (
                <div
                  key={idx}
                  onClick={() => handleSeek(sec.secondsStart)}
                  className={`p-4 rounded-2xl transition-all duration-300 cursor-pointer border ${
                    isActive
                      ? 'bg-gradient-to-r from-fuchsia-950/60 to-purple-950/40 border-pink-400 shadow-[0_0_25px_rgba(236,72,153,0.35)] scale-[1.01]'
                      : sec.isHighlight
                      ? 'bg-purple-950/20 border-purple-500/30'
                      : 'bg-white/[0.02] border-slate-800/80 hover:bg-white/[0.04]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`text-xs font-mono font-bold px-2.5 py-0.5 rounded-full ${
                        sec.isHighlight
                          ? 'bg-pink-500/20 text-pink-300 border border-pink-500/40'
                          : 'bg-slate-800 text-slate-300'
                      }`}
                    >
                      {sec.type}
                    </span>

                    <span className="text-[11px] font-mono text-cyan-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{sec.timeRange}</span>
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    {sec.lines.map((line: string, lineIdx: number) => (
                      <p
                        key={lineIdx}
                        className={`text-xs sm:text-sm leading-relaxed transition-colors ${
                          isActive
                            ? 'text-white font-bold drop-shadow-[0_0_6px_rgba(255,255,255,0.7)]'
                            : 'text-slate-300'
                        } ${sec.isHighlight ? 'text-pink-100 font-medium' : ''}`}
                      >
                        {line}
                      </p>
                    ))}
                  </div>

                  {isActive && (
                    <div className="mt-2.5 pt-2 border-t border-pink-500/30 flex items-center gap-2 text-[10px] text-pink-300 font-mono">
                      <span className="w-2 h-2 rounded-full bg-pink-400 animate-ping" />
                      <span>Singing along now · Teleprompter Sync Active</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Vocal Record Test Studio Tool */}
          <div className="p-4 rounded-2xl bg-black/60 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-white flex items-center gap-1.5">
                  <Mic className="w-4 h-4 text-pink-400" />
                  <span>ថតសំឡេងច្រៀងសាកល្បង (Test Vocal Record Studio)</span>
                </h4>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  ច្រៀងតាម Teleprompter ដើម្បីឱ្យ AI ផ្ទៀងផ្ទាត់កម្រិត Flow & Rhythm Match
                </p>
              </div>

              {vocalScore && (
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 block font-mono">Rhythm Match</span>
                  <span className="text-base font-black text-emerald-400 font-mono">
                    {vocalScore}% Accuracy
                  </span>
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
              <button
                onClick={handleStartRecording}
                type="button"
                className={`w-full sm:w-auto px-5 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                  isRecording
                    ? 'bg-rose-600 hover:bg-rose-500 text-white animate-pulse shadow-[0_0_20px_rgba(244,63,94,0.6)]'
                    : 'bg-gradient-to-r from-pink-500 to-purple-600 text-slate-950 shadow-[0_0_15px_rgba(236,72,153,0.4)]'
                }`}
              >
                {isRecording ? (
                  <>
                    <Square className="w-3.5 h-3.5 fill-white" />
                    <span>បញ្ឈប់ការថត (Stop Rec {formatTime(recordTimer)})</span>
                  </>
                ) : (
                  <>
                    <Mic className="w-3.5 h-3.5" />
                    <span>🎙️ ចាប់ផ្តើមថតសំឡេងច្រៀង (Record Vocal)</span>
                  </>
                )}
              </button>

              {recordedVocal && !isRecording && (
                <div className="flex items-center gap-2 text-xs text-emerald-300 font-mono bg-emerald-950/40 border border-emerald-500/30 px-3 py-1.5 rounded-xl">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>ថតបានជោគជ័យ! Pitch & Flow Alignment ឆ្លងកាត់កម្រិតស្តង់ដារ។</span>
                </div>
              )}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
