import React, { useState } from 'react';
import {
  Crown,
  Check,
  X,
  Sparkles,
  Zap,
  CreditCard,
  Mail,
  ShieldCheck,
  Shield,
  Lock,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { isEmailAuthorizedVip } from '../../data/vipWhitelist';
import { AdminWhitelistModal } from './AdminWhitelistModal';

interface VipModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpgradeSuccess?: (email: string) => void;
  initialEmail?: string;
}

export const VipModal: React.FC<VipModalProps> = ({
  isOpen,
  onClose,
  onUpgradeSuccess,
  initialEmail = 'seyhasolo200815@gmail.com',
}) => {
  const [step, setStep] = useState<'perks' | 'checkout' | 'success'>('perks');
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);

  // Form states
  const [cardName, setCardName] = useState('SEYHA SO');
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExp, setCardExp] = useState('08/28');
  const [cardCvv, setCardCvv] = useState('888');
  const [gmailInput, setGmailInput] = useState(initialEmail);
  const [cardType, setCardType] = useState<'visa' | 'mastercard'>('visa');

  // Validation / processing
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const vipPerks = [
    {
      title: 'Ultra 4K Neural Rendering',
      desc: 'Unlimited high-resolution generation with zero queue latency.',
    },
    {
      title: 'ATS ★★★★ Executive CV Engine',
      desc: 'Unlocks advanced recruiter keyword scanning & VIP templates.',
    },
    {
      title: 'Studio Voice Clones & Khmer TTS',
      desc: 'Photorealistic multi-accent voices with studio-grade bitrate.',
    },
    {
      title: 'Cinematic 60FPS Video Generation',
      desc: 'Full-length scenes with dynamic camera direction & lighting.',
    },
    {
      title: 'LangGo Level 16 - 40 Full Curriculum',
      desc: 'Complete mastery of Katakana, Dakuon, and Live Reading Labs.',
    },
    {
      title: 'Dedicated Cloud GPU Cluster',
      desc: 'Guaranteed 99.99% uptime with priority processing token.',
    },
  ];

  const handleCardNumberChange = (val: string) => {
    // Basic auto-formatting
    const cleaned = val.replace(/\D/g, '').slice(0, 16);
    const formatted = cleaned.match(/.{1,4}/g)?.join(' ') || cleaned;
    setCardNumber(formatted);
    if (cleaned.startsWith('5')) {
      setCardType('mastercard');
    } else {
      setCardType('visa');
    }
  };

  const handleSubmitPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Validation
    const trimmedEmail = gmailInput.trim().toLowerCase();
    if (!trimmedEmail) {
      setErrorMessage('សូមបញ្ចូលអាសយដ្ឋាន Gmail របស់អ្នក');
      return;
    }

    if (!trimmedEmail.includes('@') || !trimmedEmail.includes('.')) {
      setErrorMessage('ទម្រង់ Gmail មិនត្រឹមត្រូវទេ (ឧទាហរណ៍: name@gmail.com)');
      return;
    }

    if (!cardNumber || cardNumber.length < 8) {
      setErrorMessage('សូមបញ្ចូលលេខកាតធនាគារឱ្យបានត្រឹមត្រូវ');
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);

      // 100 Authorized VIP Gmail Whitelist verification (Case-Insensitive)
      const isAuthorized = isEmailAuthorizedVip(trimmedEmail);
      if (!isAuthorized) {
        setErrorMessage(
          '❌ Gmail នេះមិនទាន់មានក្នុងបញ្ជី VIP Pro ទេ។ សូមទាក់ទងមកកាន់អ្នកគ្រប់គ្រងដើម្បីបើកសិទ្ធិប្រើប្រាស់!'
        );
        return;
      }

      setStep('success');
      if (onUpgradeSuccess) {
        onUpgradeSuccess(trimmedEmail);
      }
    }, 1000);
  };

  const handleResetAndClose = () => {
    setStep('perks');
    setErrorMessage(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200 font-khmer">
      <div className="relative w-full max-w-md rounded-3xl bg-[#0F172A]/95 border border-amber-500/40 p-5 sm:p-6 shadow-[0_0_50px_rgba(245,158,11,0.25)] text-slate-100 overflow-hidden">
        {/* Glow ambient background */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-36 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={handleResetAndClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors z-20"
        >
          <X className="w-4 h-4" />
        </button>

        {/* ========================================================================
            STEP 1: VIP PERKS & PLAN OVERVIEW
            ======================================================================== */}
        {step === 'perks' && (
          <div className="animate-in fade-in duration-200">
            {/* Header with Luxury Crown */}
            <div className="flex flex-col items-center text-center mt-1 mb-4">
              <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-600 via-yellow-500 to-amber-300 p-0.5 shadow-[0_0_20px_rgba(245,158,11,0.5)] mb-3">
                <div className="w-full h-full rounded-2xl bg-[#141009] flex items-center justify-center">
                  <Crown className="w-7 h-7 text-amber-300 fill-amber-400/40" />
                </div>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[11px] font-semibold tracking-wider uppercase mb-1">
                <Sparkles className="w-3 h-3 text-amber-400" />
                <span>VIP Pro Membership</span>
              </div>

              <h3 className="text-xl font-bold text-white tracking-tight">
                Unlock Full Super AI Power
              </h3>
              <p className="text-xs text-slate-400 mt-1 max-w-[280px]">
                ដោះសោសិទ្ធិប្រើប្រាស់ពេញលេញលើម៉ូឌុល AI ទាំង ១០ ដោយគ្មានដែនកំណត់។
              </p>
            </div>

            {/* Perks List */}
            <div className="space-y-2 mb-4 max-h-52 overflow-y-auto pr-1 no-scrollbar text-xs">
              {vipPerks.map((perk, i) => (
                <div
                  key={i}
                  className="flex items-start gap-2.5 p-2.5 rounded-xl bg-white/[0.03] border border-amber-500/15"
                >
                  <div className="w-5 h-5 rounded-full bg-amber-500/20 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-amber-400 stroke-[2.5]" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-amber-200">{perk.title}</h4>
                    <p className="text-[11px] text-slate-400 leading-tight mt-0.5">{perk.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Price & Trigger to Checkout */}
            <div className="pt-2 border-t border-amber-500/20">
              <div className="flex items-baseline justify-between mb-3 px-1">
                <div>
                  <span className="text-2xl font-black text-white font-mono">$30</span>
                  <span className="text-xs text-slate-400 font-normal"> / 3 ខែ (Quarterly)</span>
                </div>
                <span className="text-[11px] font-medium text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-full border border-amber-400/30">
                  Best Value · All Features
                </span>
              </div>

              <button
                onClick={() => setStep('checkout')}
                type="button"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 hover:from-amber-400 hover:to-yellow-300 text-slate-950 font-bold text-sm tracking-wide shadow-[0_0_25px_rgba(245,158,11,0.5)] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              >
                <Zap className="w-4 h-4 fill-slate-950 stroke-none" />
                <span>Upgrade to VIP Pro</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>
          </div>
        )}

        {/* ========================================================================
            STEP 2: CHECKOUT & VIP AUTHORIZATION (VISA/MASTERCARD + GMAIL WHITELIST)
            ======================================================================== */}
        {step === 'checkout' && (
          <form onSubmit={handleSubmitPayment} className="space-y-3.5 animate-in fade-in duration-200">
            {/* Header with back button */}
            <div className="flex items-center justify-between pb-2 border-b border-amber-500/20">
              <button
                type="button"
                onClick={() => setStep('perks')}
                className="text-xs text-amber-300 hover:text-white flex items-center gap-1 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>ត្រឡប់ក្រោយ</span>
              </button>
              <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                <span>💳 ជ្រើសរើសវិធីសាស្ត្រទូទាត់</span>
              </h3>
            </div>

            {/* Plan Badge */}
            <div className="p-3 rounded-2xl bg-gradient-to-r from-amber-950/60 via-slate-900 to-slate-900 border border-amber-500/40 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-amber-400 uppercase font-mono font-bold tracking-wider block">
                  Selected Subscription Tier
                </span>
                <h4 className="text-xs font-bold text-white mt-0.5">
                  កញ្ចប់ VIP Pro: $30 / 3 ខែ
                </h4>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 text-[11px] font-bold border border-amber-500/40 shrink-0">
                ដោះសោ 100% គ្រប់មុខងារ
              </span>
            </div>

            {/* Visa / Mastercard Form Inputs */}
            <div className="space-y-2.5 bg-black/40 p-3.5 rounded-2xl border border-slate-800">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] font-semibold text-slate-300">
                  ព័ត៌មានកាតធនាគារ (Card Details)
                </span>
                {/* Brand badges */}
                <div className="flex items-center gap-1.5">
                  <span className="px-1.5 py-0.5 rounded bg-blue-900/60 text-blue-200 text-[9px] font-bold border border-blue-700 font-mono">
                    VISA
                  </span>
                  <span className="px-1.5 py-0.5 rounded bg-rose-950/60 text-rose-300 text-[9px] font-bold border border-rose-800 font-mono">
                    Mastercard
                  </span>
                </div>
              </div>

              {/* Cardholder Name */}
              <div>
                <label className="text-[10px] text-slate-400 block mb-1">
                  ឈ្មោះម្ចាស់កាត (Cardholder Name)
                </label>
                <input
                  type="text"
                  required
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value.toUpperCase())}
                  placeholder="SO SEYHA"
                  className="w-full bg-slate-900/90 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-400 font-mono"
                />
              </div>

              {/* Card Number */}
              <div>
                <label className="text-[10px] text-slate-400 block mb-1">
                  លេខកាត Visa / Mastercard (Card Number)
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={cardNumber}
                    onChange={(e) => handleCardNumberChange(e.target.value)}
                    placeholder="4242 4242 4242 4242"
                    className="w-full bg-slate-900/90 border border-slate-700 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-400 font-mono tracking-wider"
                  />
                  <CreditCard className="w-4 h-4 text-amber-400 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              {/* Expiration Date & CVV */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] text-slate-400 block mb-1">
                    កាលបរិច្ឆេទ (MM/YY)
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={5}
                    value={cardExp}
                    onChange={(e) => setCardExp(e.target.value)}
                    placeholder="MM/YY"
                    className="w-full bg-slate-900/90 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-400 font-mono text-center"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-400 block mb-1">
                    កូដសុវត្ថិភាព (CVV)
                  </label>
                  <input
                    type="password"
                    required
                    maxLength={4}
                    value={cardCvv}
                    onChange={(e) => setCardCvv(e.target.value)}
                    placeholder="•••"
                    className="w-full bg-slate-900/90 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-400 font-mono text-center"
                  />
                </div>
              </div>
            </div>

            {/* Gmail VIP Verification / Whitelist Input */}
            <div className="space-y-1.5 bg-amber-950/20 p-3.5 rounded-2xl border border-amber-500/30">
              <label className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-amber-400" />
                <span>📧 បញ្ចូល Gmail របស់អ្នកដើម្បីដោះសោ VIP Pro</span>
              </label>

              <input
                type="email"
                required
                value={gmailInput}
                onChange={(e) => setGmailInput(e.target.value)}
                placeholder="ឧទាហរណ៍: name@gmail.com"
                className="w-full bg-black/60 border border-amber-500/40 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400 font-sans"
              />

              <p className="text-[10.5px] text-amber-200/80 leading-relaxed mt-1">
                <span className="font-bold text-amber-400">កំណត់ចំណាំ:</span> មានតែ Gmail ណាដែលត្រូវបានអនុញ្ញាត និងចុះឈ្មោះក្នុងប្រព័ន្ធទើបអាចដំណើរការសិទ្ធិ VIP Pro ពេញលេញបាន។
              </p>

              {/* Discrete Admin / Developer Whitelist Inspector Button */}
              <div className="flex items-center justify-between pt-1 border-t border-amber-500/20 mt-2">
                <button
                  type="button"
                  onClick={() => setIsAdminModalOpen(true)}
                  className="text-[11px] text-amber-400 hover:text-amber-300 hover:underline flex items-center gap-1.5 transition-colors font-medium"
                >
                  <Shield className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Admin Access: View 100 VIP Accounts</span>
                </button>

                <button
                  type="button"
                  onClick={() => setGmailInput('omni.vip001@gmail.com')}
                  title="បំពេញ omni.vip001@gmail.com"
                  className="text-[10.5px] text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 px-2.5 py-0.5 rounded-md border border-slate-700/80 transition-colors"
                >
                  ⚡ Fill Preset #1
                </button>
              </div>
            </div>

            {/* Error banner if any */}
            {errorMessage && (
              <div className="p-2 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Submit Action */}
            <button
              type="submit"
              disabled={isProcessing}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 hover:from-amber-400 hover:to-yellow-300 text-slate-950 font-bold text-xs sm:text-sm tracking-wide shadow-[0_0_25px_rgba(245,158,11,0.5)] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-75"
            >
              {isProcessing ? (
                <>
                  <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                  <span>កំពុងផ្ទៀងផ្ទាត់ និងដំណើរការ...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4 stroke-[2.5]" />
                  <span>បញ្ជាក់ការទូទាត់ និងដោះសោ VIP Pro →</span>
                </>
              )}
            </button>
          </form>
        )}

        {/* ========================================================================
            STEP 3: SUCCESS CELEBRATION & ACTIVATION
            ======================================================================== */}
        {step === 'success' && (
          <div className="text-center py-3 animate-in zoom-in-95 duration-200 space-y-4">
            {/* Glowing Crown Icon */}
            <div className="relative w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-amber-500 via-yellow-400 to-amber-300 p-0.5 shadow-[0_0_40px_rgba(245,158,11,0.6)]">
              <div className="w-full h-full rounded-3xl bg-[#0f172a] flex items-center justify-center">
                <Crown className="w-10 h-10 text-amber-300 fill-amber-400/40 animate-bounce" />
              </div>
              <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-emerald-400 text-slate-950 flex items-center justify-center shadow-lg">
                <Check className="w-4 h-4 stroke-[3]" />
              </span>
            </div>

            {/* Success Message in Khmer */}
            <div>
              <h3 className="text-lg sm:text-xl font-black text-white tracking-tight">
                🎉 អបអរសាទរ! គណនីរបស់អ្នកត្រូវបានដំឡើងជា VIP Pro ដោយជោគជ័យ!
              </h3>
              <p className="text-xs text-amber-300 mt-1.5 font-medium">
                កញ្ចប់សមាជិក VIP Pro ៣ ខែ ($30) ត្រូវបានបើកដំណើរការពេញលេញ។
              </p>
            </div>

            {/* Whitelist Gmail & Credentials Summary Card */}
            <div className="p-3.5 rounded-2xl bg-black/50 border border-amber-500/40 text-left space-y-1.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Gmail អនុញ្ញាត VIP:</span>
                <span className="text-amber-300 font-mono font-bold truncate max-w-[180px]">
                  {gmailInput}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">សុពលភាពសមាជិក:</span>
                <span className="text-emerald-400 font-mono font-semibold">
                  3 ខែ (រហូតដល់ 2027)
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">សិទ្ធិដោះសោ:</span>
                <span className="text-white font-semibold">
                  100% ម៉ូឌុល AI + CV Builder + 4K
                </span>
              </div>
            </div>

            {/* Done Action */}
            <button
              onClick={handleResetAndClose}
              type="button"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 font-bold text-sm shadow-[0_0_20px_rgba(245,158,11,0.5)] active:scale-[0.98] transition-all"
            >
              ចាប់ផ្តើមបទពិសោធន៍ VIP Pro ភ្លាមៗ →
            </button>
          </div>
        )}
      </div>

      {/* Admin / Whitelist Management Modal */}
      <AdminWhitelistModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
        onSelectEmailForTest={(email) => setGmailInput(email)}
      />
    </div>
  );
};
