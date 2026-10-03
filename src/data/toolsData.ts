export interface ToolItem {
  id: string;
  num: string;
  title: string;
  subtitle?: string;
  khmerTitle?: string;
  hasCyanRim?: boolean;
  category: 'Language' | 'Chat' | 'Creative' | 'Enhance' | 'Audio' | 'Video' | 'Document' | 'Education' | 'Writing' | 'Career';
  description: string;
  badge?: string;
  isVip?: boolean;
  accentColor: string;
}

export const TOOLS_DATA: ToolItem[] = [
  {
    id: 'langgo',
    num: '01',
    title: 'LangGo',
    subtitle: 'LangGo',
    khmerTitle: 'រៀនគ្រប់ភាសា',
    hasCyanRim: true,
    category: 'Language',
    description: 'Master any language with conversational AI, native Khmer pronunciation, and contextual flashcards.',
    badge: 'Popular',
    accentColor: '#06b6d4',
  },
  {
    id: 'kchat',
    num: '02',
    title: 'K-Chat AI',
    category: 'Chat',
    description: 'Next-generation multimodal conversational AI assistant with instant reasoning and memory.',
    badge: 'Fast 3.8',
    accentColor: '#38bdf8',
  },
  {
    id: 'imagestudio',
    num: '03',
    title: 'Image Studio',
    category: 'Creative',
    description: 'Create cosmic masterpieces, photorealistic portraits, and digital fantasy art from text prompts.',
    badge: 'Pro Art',
    accentColor: '#c084fc',
  },
  {
    id: 'photoenhancer',
    num: '04',
    title: 'Photo Enhancer',
    category: 'Enhance',
    description: 'Instant 4K neural upscaler, noise reduction, studio relighting, and face restoration.',
    badge: '4K Ultra',
    accentColor: '#38bdf8',
  },
  {
    id: 'aivoice',
    num: '05',
    title: 'AI Voice & Cloning',
    subtitle: 'Voice Cloning Lab',
    khmerTitle: 'សំឡេង & ក្លូនសំឡេង AI',
    category: 'Audio',
    description: 'Hyper-realistic neural voice synthesis, studio voice cloning, and multilingual narration.',
    badge: 'Studio 48kHz',
    accentColor: '#a855f7',
  },
  {
    id: 'videogenerator',
    num: '06',
    title: 'Video Generator',
    category: 'Video',
    description: 'Generate cinematic 4K video clips, dynamic camera movements, and storyboard sequences.',
    badge: 'Cinematic',
    accentColor: '#c026d3',
  },
  {
    id: 'chatpdf',
    num: '07',
    title: 'Chat with PDF',
    category: 'Document',
    description: 'Analyze documents, extract deep insights, cross-reference data, and ask complex questions.',
    badge: 'Smart OCR',
    accentColor: '#3b82f6',
  },
  {
    id: 'snapsolve',
    num: '08',
    title: 'Snap & Solve',
    category: 'Education',
    description: 'Snap math & physics formulas, get step-by-step derivations, and visualize 3D graphs.',
    badge: 'STEM AI',
    accentColor: '#06b6d4',
  },
  {
    id: 'contentwriter',
    num: '09',
    title: 'Content Writer',
    category: 'Writing',
    description: 'Luxury copywriting engine for viral blog posts, persuasive marketing pitches, and books.',
    badge: 'Gold Tier',
    accentColor: '#f59e0b',
  },
  {
    id: 'cvbuilder',
    num: '10',
    title: 'CV Builder',
    category: 'Career',
    description: 'ATS-optimized executive resumes, automated keyword scoring, and VIP designer templates.',
    badge: 'ATS 99%',
    isVip: true,
    accentColor: '#eab308',
  },
  {
    id: 'aisong',
    num: '11',
    title: 'បង្កើតចម្រៀង (AI Song Studio)',
    subtitle: 'Upload Beat → AI Generates Lyrics to Match Rhythm & Flow',
    khmerTitle: 'បង្កើតចម្រៀង & ទំនុកច្រៀង',
    category: 'Audio',
    description: 'Upload instrumental beat, detect BPM & key, and generate rhymed lyrics synchronized with musical flow.',
    badge: '🔥 Super Feature',
    accentColor: '#ec4899',
    hasCyanRim: true,
  },
];
