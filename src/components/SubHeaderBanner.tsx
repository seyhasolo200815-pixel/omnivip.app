import React from 'react';
import { Sparkles } from 'lucide-react';

interface SubHeaderBannerProps {
  onRobotClick?: () => void;
}

export const SubHeaderBanner: React.FC<SubHeaderBannerProps> = ({ onRobotClick }) => {
  return (
    <div className="relative w-full mb-4 sm:mb-6 select-none">
      {/* Subtle deep glassmorphic container matching rgba(17, 24, 39, 0.75) */}
      <div
        style={{
          background: 'rgba(17, 24, 39, 0.75)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
        }}
        className="relative flex items-center justify-between p-4 sm:p-5 rounded-2xl sm:rounded-3xl border border-white/10 shadow-[0_4px_24px_rgba(0,0,0,0.5)] overflow-hidden"
      >
        {/* Ambient interior light bleed */}
        <div className="absolute -left-10 -top-10 w-36 h-36 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute right-0 bottom-0 w-36 h-36 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Left Content Area: Sparkle & Headline */}
        <div className="relative z-10 flex items-start gap-3 max-w-[80%]">
          {/* Glowing blue 4-point star sparkle */}
          <div className="mt-1 relative shrink-0">
            <div className="absolute inset-0 bg-cyan-400 blur-sm opacity-80" />
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-300 fill-cyan-400 stroke-[1.5] relative z-10 drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
          </div>

          {/* Text block */}
          <div className="flex flex-col">
            <h2 className="text-sm sm:text-base font-semibold text-slate-100 tracking-tight leading-snug">
              Your All-in-One Super AI Ecosystem
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 font-normal tracking-tight mt-0.5 leading-tight">
              One platform. Infinite possibilities.
            </p>
          </div>
        </div>

        {/* Right Content Area: Cute 3D glowing holographic blue robot assistant avatar */}
        <div
          onClick={onRobotClick}
          className="relative z-10 shrink-0 cursor-pointer group active:scale-95 transition-transform"
          title="Talk with OmniAI Assistant"
        >
          {/* Ambient Glow */}
          <div className="absolute inset-0 bg-blue-500/40 rounded-full blur-md group-hover:bg-cyan-400/60 transition-colors" />

          {/* Robot Avatar 3D SVG */}
          <div className="relative w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center">
            <svg viewBox="0 0 80 80" className="w-12 h-12 sm:w-14 sm:h-14 drop-shadow-[0_0_14px_rgba(56,189,248,0.85)]">
              <defs>
                <linearGradient id="avatarRobotHead3DFluid" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#bae6fd" />
                  <stop offset="45%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#1e3a8a" />
                </linearGradient>
              </defs>

              {/* Antenna */}
              <rect x="38" y="3" width="4" height="11" rx="2" fill="#cbd5e1" />
              <circle cx="40" cy="3" r="4.5" fill="#38bdf8" />
              <circle cx="39" cy="2" r="1.6" fill="#ffffff" />

              {/* Side Antennas */}
              <circle cx="12" cy="42" r="5" fill="#2563eb" stroke="#93c5fd" strokeWidth="1.5" />
              <circle cx="68" cy="42" r="5" fill="#2563eb" stroke="#93c5fd" strokeWidth="1.5" />

              {/* Head Body */}
              <ellipse cx="40" cy="42" rx="28" ry="24" fill="url(#avatarRobotHead3DFluid)" stroke="#f0f9ff" strokeWidth="1.8" />

              {/* Black Visor Screen */}
              <rect x="20" y="30" width="40" height="24" rx="10" fill="#030712" stroke="#1e293b" strokeWidth="1" />

              {/* Visor Glare */}
              <path d="M 23 34 C 30 31, 50 31, 57 34" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.4" strokeLinecap="round" />

              {/* Cute Glowing Oval Eyes */}
              <ellipse cx="32" cy="42" rx="4.2" ry="5.8" fill="#38bdf8" filter="drop-shadow(0 0 4px #38bdf8)" />
              <ellipse cx="33" cy="40" rx="1.6" ry="2.2" fill="#ffffff" />

              <ellipse cx="48" cy="42" rx="4.2" ry="5.8" fill="#38bdf8" filter="drop-shadow(0 0 4px #38bdf8)" />
              <ellipse cx="49" cy="40" rx="1.6" ry="2.2" fill="#ffffff" />

              {/* Cute smiling mouth */}
              <path d="M 38 48 Q 40 50.5 42 48" stroke="#38bdf8" strokeWidth="1.4" strokeLinecap="round" fill="none" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};
