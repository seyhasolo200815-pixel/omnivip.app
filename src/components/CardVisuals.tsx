import React from 'react';

/**
 * 01. Card 01: Cambodia Flag over Glowing Pedestal with Angkor Wat
 * Intense Neon Cyan Rim & Pedestal
 */
export const Card01Visual: React.FC = () => {
  return (
    <div className="relative w-full h-36 flex items-center justify-center overflow-hidden">
      {/* Background radial cyan glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_72%,rgba(6,182,212,0.45)_0%,rgba(6,182,212,0.12)_45%,transparent_75%)] pointer-events-none" />

      {/* Floating neon cyan particles */}
      <div className="absolute w-1.5 h-1.5 rounded-full bg-cyan-200 blur-[0.5px] top-5 left-7 animate-ping opacity-75" />
      <div className="absolute w-2 h-2 rounded-full bg-cyan-300 blur-[1px] top-10 right-6 animate-pulse opacity-90" />
      <div className="absolute w-1 h-1 rounded-full bg-cyan-100 top-16 left-12 animate-pulse opacity-80" />
      <div className="absolute w-1 h-1 rounded-full bg-blue-300 top-8 right-16 animate-ping opacity-60" />

      <svg viewBox="0 0 200 160" className="w-full h-full max-h-36 drop-shadow-[0_12px_28px_rgba(6,182,212,0.55)]">
        <defs>
          {/* Intense Neon Pedestal Gradients */}
          <linearGradient id="pedestalRimCyan" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0891b2" stopOpacity="0.3" />
            <stop offset="25%" stopColor="#06b6d4" stopOpacity="0.95" />
            <stop offset="50%" stopColor="#a5f3fc" stopOpacity="1" />
            <stop offset="75%" stopColor="#06b6d4" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#0891b2" stopOpacity="0.3" />
          </linearGradient>

          <radialGradient id="pedestalGlowCyan" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.9" />
            <stop offset="45%" stopColor="#0891b2" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#0e7490" stopOpacity="0" />
          </radialGradient>

          {/* Flag 3D wave lighting overlay */}
          <linearGradient id="flagWaveShading" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.35" />
            <stop offset="22%" stopColor="#000000" stopOpacity="0.3" />
            <stop offset="48%" stopColor="#ffffff" stopOpacity="0.4" />
            <stop offset="74%" stopColor="#000000" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.25" />
          </linearGradient>

          <linearGradient id="flagPoleChrome" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#475569" />
            <stop offset="35%" stopColor="#f8fafc" />
            <stop offset="70%" stopColor="#94a3b8" />
            <stop offset="100%" stopColor="#334155" />
          </linearGradient>
        </defs>

        {/* Concentric Neon Cyan Pedestal Rings with Glow */}
        <ellipse cx="100" cy="140" rx="72" ry="14" fill="url(#pedestalGlowCyan)" />
        <ellipse cx="100" cy="140" rx="66" ry="11" fill="none" stroke="url(#pedestalRimCyan)" strokeWidth="2.2" />
        <ellipse cx="100" cy="138" rx="50" ry="8.5" fill="#091424" stroke="url(#pedestalRimCyan)" strokeWidth="2" />
        <ellipse cx="100" cy="136" rx="36" ry="6" fill="#04273f" stroke="#38bdf8" strokeWidth="1.8" />
        <ellipse cx="100" cy="135" rx="20" ry="3.8" fill="#0284c7" stroke="#67e8f9" strokeWidth="1.5" />

        {/* Pole Base Socket */}
        <path d="M 57 136 L 63 136 L 62 132 L 58 132 Z" fill="url(#flagPoleChrome)" />
        <ellipse cx="60" cy="132" rx="3.5" ry="1.5" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="0.5" />

        {/* Chrome Metallic Flag Pole with Finial */}
        <rect x="58.8" y="28" width="2.8" height="106" rx="1.4" fill="url(#flagPoleChrome)" />
        <circle cx="60.2" cy="27" r="3.6" fill="#fbbf24" stroke="#d97706" strokeWidth="0.8" />
        <circle cx="59.2" cy="25.8" r="1.2" fill="#fef08a" />

        {/* 3D Glossy Waving Cambodia Flag */}
        {/* Top Dark Blue Stripe */}
        <path
          d="M 61.6 33 
             C 86 30, 112 41, 140 35 
             C 148 33.5, 156 36, 162 38 
             L 160 54 
             C 154 52, 146 49.5, 138 51 
             C 110 56, 86 46, 61.6 49 Z"
          fill="#002b7f"
        />

        {/* Middle Wide Red Stripe */}
        <path
          d="M 61.6 49 
             C 86 46, 110 56, 138 51 
             C 146 49.5, 154 52, 160 54 
             L 156 83 
             C 150 81, 142 78, 134 80 
             C 108 85, 86 75, 61.6 79 Z"
          fill="#ce1126"
        />

        {/* Bottom Dark Blue Stripe */}
        <path
          d="M 61.6 79 
             C 86 75, 108 85, 134 80 
             C 142 78, 150 81, 156 83 
             L 154 98 
             C 148 96, 140 93.5, 132 95 
             C 107 100, 86 91, 61.6 94 Z"
          fill="#002b7f"
        />

        {/* Realistic Angkor Wat Temple Silhouette in Crisp White */}
        <g transform="translate(94, 51.5) scale(0.76)">
          <rect x="0" y="24" width="40" height="3" fill="#ffffff" rx="0.5" />
          <rect x="3" y="21" width="34" height="3" fill="#ffffff" rx="0.5" />
          <rect x="6" y="18" width="28" height="3" fill="#ffffff" rx="0.5" />

          {/* Central Pinnacle */}
          <path d="M 17 18 L 17 10 C 17 7, 20 1.5, 20 1.5 C 20 1.5, 23 7, 23 10 L 23 18 Z" fill="#ffffff" />
          <circle cx="20" cy="1.2" r="1" fill="#ffffff" />

          {/* Mid-Left Tower */}
          <path d="M 11 18 L 11 12 C 11 9, 13.5 4.5, 13.5 4.5 C 13.5 4.5, 16 9, 16 12 L 16 18 Z" fill="#ffffff" />
          <circle cx="13.5" cy="4.2" r="0.9" fill="#ffffff" />

          {/* Mid-Right Tower */}
          <path d="M 24 18 L 24 12 C 24 9, 26.5 4.5, 26.5 4.5 C 26.5 4.5, 29 9, 29 12 L 29 18 Z" fill="#ffffff" />
          <circle cx="26.5" cy="4.2" r="0.9" fill="#ffffff" />

          {/* Outer Left & Right Towers */}
          <path d="M 6 18 L 6 14 C 6 12, 8 8.5, 8 8.5 C 8 8.5, 10 12, 10 14 L 10 18 Z" fill="#ffffff" />
          <path d="M 30 18 L 30 14 C 30 12, 32 8.5, 32 8.5 C 32 8.5, 34 12, 34 14 L 34 18 Z" fill="#ffffff" />
        </g>

        {/* 3D Cloth Ripple Lighting Shading */}
        <path
          d="M 61.6 33 
             C 86 30, 112 41, 140 35 
             C 148 33.5, 156 36, 162 38 
             L 154 98 
             C 148 96, 140 93.5, 132 95 
             C 107 100, 86 91, 61.6 94 Z"
          fill="url(#flagWaveShading)"
          style={{ mixBlendMode: 'overlay' }}
        />

        {/* Fastener Rings */}
        <ellipse cx="61.6" cy="35" rx="2.2" ry="1.4" fill="#f8fafc" />
        <ellipse cx="61.6" cy="93" rx="2.2" ry="1.4" fill="#f8fafc" />
      </svg>
    </div>
  );
};

/**
 * 02. Card 02: Cute 3D glowing robot head assistant hovering over a neon pedestal with speech bubble "Hi!"
 */
export const Card02Visual: React.FC = () => {
  return (
    <div className="relative w-full h-36 flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_65%,rgba(56,189,248,0.4)_0%,rgba(56,189,248,0.1)_45%,transparent_75%)] pointer-events-none" />

      {/* Floating ambient particles */}
      <div className="absolute w-1 h-1 rounded-full bg-blue-300 blur-[0.5px] top-6 left-8 animate-ping opacity-75" />
      <div className="absolute w-1.5 h-1.5 rounded-full bg-cyan-300 blur-[0.5px] top-10 right-8 animate-pulse opacity-85" />

      <svg viewBox="0 0 200 160" className="w-full h-full max-h-36 drop-shadow-[0_14px_28px_rgba(56,189,248,0.45)]">
        <defs>
          <linearGradient id="robotSphereChrome" x1="15%" y1="0%" x2="85%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="25%" stopColor="#bae6fd" />
            <stop offset="60%" stopColor="#38bdf8" />
            <stop offset="85%" stopColor="#1d4ed8" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>

          <linearGradient id="robotScreenVisor" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0f172a" />
            <stop offset="100%" stopColor="#020617" />
          </linearGradient>

          <radialGradient id="robotPedestalRing" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.9" />
            <stop offset="45%" stopColor="#0284c7" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#0369a1" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Concentric Glowing Neon Pedestal */}
        <ellipse cx="100" cy="138" rx="66" ry="12" fill="url(#robotPedestalRing)" />
        <ellipse cx="100" cy="138" rx="58" ry="10" fill="none" stroke="#38bdf8" strokeWidth="2" strokeOpacity="0.8" />
        <ellipse cx="100" cy="136" rx="44" ry="7.5" fill="#091322" stroke="#0ea5e9" strokeWidth="2" />
        <ellipse cx="100" cy="134" rx="28" ry="5" fill="#0369a1" stroke="#7dd3fc" strokeWidth="1.6" />

        {/* Cute Floating Robot */}
        <g className="animate-float">
          {/* Side Ears / Headphone Nodes */}
          <rect x="50" y="64" width="7" height="14" rx="3.5" fill="#60a5fa" stroke="#bae6fd" strokeWidth="1.2" />
          <rect x="143" y="64" width="7" height="14" rx="3.5" fill="#60a5fa" stroke="#bae6fd" strokeWidth="1.2" />
          <circle cx="53.5" cy="71" r="2.2" fill="#38bdf8" />
          <circle cx="146.5" cy="71" r="2.2" fill="#38bdf8" />

          {/* Robot Head Body Sphere */}
          <ellipse cx="100" cy="72" rx="46" ry="40" fill="url(#robotSphereChrome)" />

          {/* Chrome Rim Highlight */}
          <ellipse cx="100" cy="72" rx="44" ry="38" fill="none" stroke="#f0f9ff" strokeWidth="2" strokeOpacity="0.8" />

          {/* Dark Glass Visor Screen */}
          <rect x="65" y="51" width="70" height="42" rx="18" fill="url(#robotScreenVisor)" stroke="#1e293b" strokeWidth="1.8" />

          {/* Visor Glare highlight */}
          <path d="M 70 57 C 82 53, 118 53, 130 57 C 122 62, 78 62, 70 57 Z" fill="#ffffff" fillOpacity="0.3" />

          {/* Cute Glowing Cyan Oval Eyes */}
          <ellipse cx="84" cy="72" rx="7" ry="10" fill="#38bdf8" filter="drop-shadow(0 0 6px #38bdf8)" />
          <ellipse cx="85.5" cy="69" rx="2.8" ry="4" fill="#ffffff" />

          <ellipse cx="116" cy="72" rx="7" ry="10" fill="#38bdf8" filter="drop-shadow(0 0 6px #38bdf8)" />
          <ellipse cx="117.5" cy="69" rx="2.8" ry="4" fill="#ffffff" />

          {/* Subtle cute smile */}
          <path d="M 96 82 Q 100 86 104 82" fill="none" stroke="#38bdf8" strokeWidth="1.8" strokeLinecap="round" />

          {/* Top Head Antenna */}
          <rect x="98.2" y="25" width="3.6" height="9" rx="1.8" fill="#e2e8f0" />
          <circle cx="100" cy="23" r="5" fill="#38bdf8" stroke="#f0f9ff" strokeWidth="1.2" />
          <circle cx="98.5" cy="21.5" r="1.8" fill="#ffffff" />
        </g>

        {/* Speech Bubble "Hi!" */}
        <g transform="translate(138, 58)">
          <rect x="0" y="0" width="36" height="26" rx="9" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.8" filter="drop-shadow(0 0 8px rgba(129,140,248,0.5))" />
          {/* Bubble tail */}
          <path d="M 2 20 L -6 25 L 4 25 Z" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1" />
          <text x="18" y="18" textAnchor="middle" fill="#67e8f9" fontSize="13" fontWeight="bold" fontFamily="system-ui">
            Hi!
          </text>
        </g>
      </svg>
    </div>
  );
};

/**
 * 03. Card 03: Vibrant 3D digital art screen displaying a glowing cosmic galaxy with two artist paintbrushes and a color palette
 */
export const Card03Visual: React.FC = () => {
  return (
    <div className="relative w-full h-36 flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_60%,rgba(168,85,247,0.38)_0%,transparent_75%)] pointer-events-none" />

      <svg viewBox="0 0 200 160" className="w-full h-full max-h-36 drop-shadow-[0_14px_28px_rgba(168,85,247,0.45)]">
        <defs>
          <linearGradient id="artTabletFrame" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#581c87" />
            <stop offset="50%" stopColor="#3b0764" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>

          <radialGradient id="spiralGalaxyGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#f472b6" stopOpacity="1" />
            <stop offset="35%" stopColor="#a855f7" stopOpacity="0.95" />
            <stop offset="65%" stopColor="#3b82f6" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#05070e" stopOpacity="0.98" />
          </radialGradient>
        </defs>

        {/* Glow halo under tablet */}
        <ellipse cx="100" cy="140" rx="60" ry="10" fill="#a855f7" fillOpacity="0.35" filter="blur(5px)" />

        {/* Tilted Digital Art Display / Tablet */}
        <g transform="translate(34, 26) rotate(-4)">
          <rect x="0" y="0" width="90" height="88" rx="14" fill="url(#artTabletFrame)" stroke="#c084fc" strokeWidth="2.2" />
          <rect x="4.5" y="4.5" width="81" height="79" rx="10" fill="url(#spiralGalaxyGlow)" />

          {/* Cosmic Galaxy Spiral Arms with Glow */}
          <path
            d="M 45 44 C 58 36, 72 47, 66 63 C 60 76, 40 71, 35 56 C 30 43, 46 29, 61 33"
            fill="none"
            stroke="#fbcfe8"
            strokeWidth="4"
            strokeLinecap="round"
            strokeOpacity="0.9"
            filter="blur(1px)"
          />
          <path
            d="M 45 44 C 33 48, 22 37, 28 24 C 35 13, 55 17, 59 30"
            fill="none"
            stroke="#67e8f9"
            strokeWidth="3"
            strokeLinecap="round"
            strokeOpacity="0.85"
          />
          {/* Galaxy Bright Core */}
          <circle cx="45" cy="44" r="6" fill="#ffffff" filter="blur(2px)" />
          <circle cx="45" cy="44" r="3" fill="#fef08a" />
          <circle cx="28" cy="30" r="1.5" fill="#ffffff" />
          <circle cx="63" cy="25" r="1.8" fill="#ffffff" />
          <circle cx="68" cy="58" r="1.2" fill="#ffffff" />
        </g>

        {/* Artist Color Palette at bottom right */}
        <g transform="translate(100, 84)">
          <path
            d="M 14 30 C 6 24, 4 8, 20 4 C 38 -2, 56 8, 60 24 C 62 32, 54 42, 44 44 C 36 46, 30 38, 26 40 C 22 42, 20 36, 14 30 Z"
            fill="#1e1b4b"
            stroke="#a855f7"
            strokeWidth="1.8"
          />
          <ellipse cx="28" cy="36" rx="4.5" ry="3.5" fill="#090d16" stroke="#c084fc" strokeWidth="1" />

          {/* Glowing Paint Dollops */}
          <circle cx="18" cy="14" r="4.5" fill="#ec4899" stroke="#f472b6" strokeWidth="1" />
          <circle cx="30" cy="9" r="4.8" fill="#38bdf8" stroke="#7dd3fc" strokeWidth="1" />
          <circle cx="44" cy="13" r="4.5" fill="#fbbf24" stroke="#fef08a" strokeWidth="1" />
          <circle cx="52" cy="26" r="4.2" fill="#10b981" stroke="#34d399" strokeWidth="1" />
          <circle cx="42" cy="34" r="4" fill="#a855f7" stroke="#c084fc" strokeWidth="1" />
        </g>

        {/* Two Artist Paintbrushes crossing */}
        <g transform="translate(120, 32) rotate(22)">
          <path d="M 0 0 L 4 0 L 3 78 L 1 78 Z" fill="#475569" stroke="#64748b" strokeWidth="0.6" />
          <rect x="0" y="72" width="4" height="11" fill="#e2e8f0" />
          <path d="M 0 83 C 0 92, 2 100, 2 100 C 2 100, 4 92, 4 83 Z" fill="#38bdf8" filter="drop-shadow(0 0 4px #38bdf8)" />
        </g>

        <g transform="translate(138, 36) rotate(38)">
          <path d="M 0 0 L 3.5 0 L 2.5 74 L 1 74 Z" fill="#1e293b" stroke="#334155" strokeWidth="0.6" />
          <rect x="0" y="68" width="3.5" height="10" fill="#cbd5e1" />
          <path d="M 0 78 C 0 87, 1.8 94, 1.8 94 C 1.8 94, 3.5 87, 3.5 78 Z" fill="#ec4899" filter="drop-shadow(0 0 4px #ec4899)" />
        </g>
      </svg>
    </div>
  );
};

/**
 * 04. Card 04: Futuristic glowing camera lens aperture with a blue center circle labeled "4K" emitting sharp radial light rays
 */
export const Card04Visual: React.FC = () => {
  return (
    <div className="relative w-full h-36 flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(56,189,248,0.45)_0%,rgba(56,189,248,0.08)_55%,transparent_75%)] pointer-events-none" />

      <svg viewBox="0 0 200 160" className="w-full h-full max-h-36 drop-shadow-[0_14px_30px_rgba(56,189,248,0.5)]">
        <defs>
          <radialGradient id="cameraLensRim" cx="50%" cy="50%" r="50%">
            <stop offset="60%" stopColor="#0f172a" />
            <stop offset="85%" stopColor="#1e293b" />
            <stop offset="95%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#0284c7" />
          </radialGradient>
        </defs>

        {/* Sharp Radial Light Rays / Laser Beams */}
        <g stroke="#38bdf8" strokeWidth="1.2" strokeOpacity="0.55" strokeLinecap="round">
          <line x1="100" y1="18" x2="100" y2="2" />
          <line x1="100" y1="142" x2="100" y2="158" />
          <line x1="28" y1="80" x2="12" y2="80" />
          <line x1="172" y1="80" x2="188" y2="80" />
          <line x1="48" y1="28" x2="35" y2="15" />
          <line x1="152" y1="28" x2="165" y2="15" />
          <line x1="48" y1="132" x2="35" y2="145" />
          <line x1="152" y1="132" x2="165" y2="145" />
        </g>

        {/* Horizontal Anamorphic Lens Flare */}
        <ellipse cx="100" cy="80" rx="95" ry="2.5" fill="#38bdf8" fillOpacity="0.5" filter="blur(2.5px)" />

        {/* Outer Heavy Metallic Lens Barrel */}
        <circle cx="100" cy="80" r="56" fill="#090d16" stroke="#1e293b" strokeWidth="4" />
        <circle cx="100" cy="80" r="52" fill="url(#cameraLensRim)" stroke="#0ea5e9" strokeWidth="2.2" />

        {/* Tech tick marks around perimeter */}
        <g stroke="#67e8f9" strokeWidth="1.2" strokeOpacity="0.7">
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
            <line
              key={deg}
              x1="100"
              y1="32"
              x2="100"
              y2="36"
              transform={`rotate(${deg} 100 80)`}
            />
          ))}
        </g>

        {/* Aperture Iris Blades Layer */}
        <circle cx="100" cy="80" r="44" fill="#020617" stroke="#38bdf8" strokeWidth="1.5" />

        <g fill="none" stroke="#0284c7" strokeWidth="1.6" opacity="0.85">
          <path d="M 100 38 L 134 62" />
          <path d="M 134 62 L 138 102" />
          <path d="M 138 102 L 110 124" />
          <path d="M 110 124 L 70 118" />
          <path d="M 70 118 L 62 78" />
          <path d="M 62 78 L 100 38" />
        </g>

        {/* Luminous Center Circle labeled "4K" */}
        <circle cx="100" cy="80" r="26" fill="#0369a1" fillOpacity="0.4" />
        <circle cx="100" cy="80" r="22" fill="#0c4a6e" stroke="#38bdf8" strokeWidth="2.5" />
        <circle cx="100" cy="80" r="19" fill="#0284c7" fillOpacity="0.5" />

        {/* Center "4K" Text with intense glow */}
        <text
          x="100"
          y="88"
          textAnchor="middle"
          fill="#ffffff"
          fontSize="20"
          fontWeight="900"
          fontFamily="system-ui"
          letterSpacing="1.2"
          style={{ textShadow: '0 0 12px #38bdf8, 0 0 24px #0284c7' }}
        >
          4K
        </text>

        {/* Curved Glass Specular Highlight */}
        <path
          d="M 64 58 C 78 45, 122 45, 136 58 C 124 50, 76 50, 64 58 Z"
          fill="#ffffff"
          fillOpacity="0.45"
        />
      </svg>
    </div>
  );
};

/**
 * 05. Card 05: Professional retro 3D studio microphone glowing with purple and cyan soundwaves
 */
export const Card05Visual: React.FC = () => {
  return (
    <div className="relative w-full h-36 flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_65%,rgba(168,85,247,0.38)_0%,rgba(6,182,212,0.18)_40%,transparent_75%)] pointer-events-none" />

      <svg viewBox="0 0 200 160" className="w-full h-full max-h-36 drop-shadow-[0_14px_28px_rgba(168,85,247,0.4)]">
        <defs>
          <linearGradient id="micMetalGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#334155" />
            <stop offset="35%" stopColor="#f8fafc" />
            <stop offset="70%" stopColor="#94a3b8" />
            <stop offset="100%" stopColor="#1e293b" />
          </linearGradient>

          <linearGradient id="waveEnergyGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="50%" stopColor="#a855f7" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>
        </defs>

        {/* Glowing Pedestal */}
        <ellipse cx="100" cy="140" rx="58" ry="10" fill="#1e1b4b" stroke="#a855f7" strokeWidth="1.8" />
        <ellipse cx="100" cy="138" rx="38" ry="6.5" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.6" />
        <rect x="96.5" y="110" width="7" height="28" fill="url(#micMetalGrad)" />

        {/* Dynamic Soundwaves flowing laterally */}
        {/* Left Waves */}
        <path
          d="M 70 80 C 58 64, 42 96, 28 74 C 20 64, 12 86, 6 78"
          fill="none"
          stroke="url(#waveEnergyGrad)"
          strokeWidth="3"
          strokeLinecap="round"
          filter="drop-shadow(0 0 8px #38bdf8)"
        />
        <path
          d="M 72 90 C 60 80, 48 106, 34 90 C 24 80, 16 96, 8 92"
          fill="none"
          stroke="#38bdf8"
          strokeWidth="1.8"
          strokeOpacity="0.8"
          strokeLinecap="round"
        />

        {/* Right Waves */}
        <path
          d="M 130 80 C 142 64, 158 96, 172 74 C 180 64, 188 86, 194 78"
          fill="none"
          stroke="url(#waveEnergyGrad)"
          strokeWidth="3"
          strokeLinecap="round"
          filter="drop-shadow(0 0 8px #a855f7)"
        />
        <path
          d="M 128 90 C 140 80, 152 106, 166 90 C 176 80, 184 96, 192 92"
          fill="none"
          stroke="#c084fc"
          strokeWidth="1.8"
          strokeOpacity="0.8"
          strokeLinecap="round"
        />

        {/* Shock Mount U-Bracket */}
        <path
          d="M 74 70 C 74 112, 126 112, 126 70"
          fill="none"
          stroke="url(#micMetalGrad)"
          strokeWidth="4.5"
          strokeLinecap="round"
        />
        <circle cx="74" cy="70" r="4" fill="#38bdf8" />
        <circle cx="126" cy="70" r="4" fill="#a855f7" />

        {/* Capsule Microphone Body */}
        <rect x="84" y="28" width="32" height="54" rx="16" fill="url(#micMetalGrad)" stroke="#67e8f9" strokeWidth="1.4" />

        {/* Mesh Pattern lines */}
        <g stroke="#090d16" strokeWidth="1.2" strokeOpacity="0.5">
          <line x1="87" y1="38" x2="113" y2="38" />
          <line x1="85" y1="46" x2="115" y2="46" />
          <line x1="85" y1="54" x2="115" y2="54" />
          <line x1="85" y1="62" x2="115" y2="62" />
          <line x1="93" y1="30" x2="93" y2="70" />
          <line x1="100" y1="28" x2="100" y2="72" />
          <line x1="107" y1="30" x2="107" y2="70" />
        </g>

        {/* Chrome waist band */}
        <rect x="82" y="66" width="36" height="7" fill="#f8fafc" stroke="#94a3b8" strokeWidth="1" />

        {/* Lower Solid Body */}
        <rect x="86" y="73" width="28" height="36" rx="4" fill="#0f172a" stroke="url(#micMetalGrad)" strokeWidth="1.6" />

        {/* Cyan indicator light */}
        <circle cx="100" cy="88" r="2.8" fill="#38bdf8" filter="drop-shadow(0 0 6px #38bdf8)" />
      </svg>
    </div>
  );
};

/**
 * 06. Card 06: Dark metallic 3D movie film reel with a movie clapperboard, emitting bright purple laser light beams
 */
export const Card06Visual: React.FC = () => {
  return (
    <div className="relative w-full h-36 flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_60%,rgba(192,38,211,0.4)_0%,transparent_75%)] pointer-events-none" />

      <svg viewBox="0 0 200 160" className="w-full h-full max-h-36 drop-shadow-[0_14px_30px_rgba(192,38,211,0.45)]">
        <defs>
          <linearGradient id="reelMetalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#475569" />
            <stop offset="40%" stopColor="#1e293b" />
            <stop offset="80%" stopColor="#0f172a" />
            <stop offset="100%" stopColor="#64748b" />
          </linearGradient>

          <linearGradient id="laserBeamGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#d946ef" stopOpacity="0.95" />
            <stop offset="60%" stopColor="#a855f7" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#7c3aed" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Bright Purple Laser Beams Emitting Rightwards */}
        <polygon points="120,68 198,28 198,122" fill="url(#laserBeamGrad)" />
        <line x1="120" y1="68" x2="198" y2="48" stroke="#f0abfc" strokeWidth="2.2" filter="drop-shadow(0 0 8px #d946ef)" />
        <line x1="120" y1="68" x2="198" y2="70" stroke="#e879f9" strokeWidth="3" />
        <line x1="120" y1="68" x2="198" y2="96" stroke="#c084fc" strokeWidth="1.8" />

        {/* Dark Metallic 3D Movie Film Reel */}
        <g transform="translate(105, 68)">
          <circle cx="0" cy="0" r="44" fill="url(#reelMetalGrad)" stroke="#a855f7" strokeWidth="2.2" />
          <circle cx="0" cy="0" r="40" fill="#090d16" stroke="#64748b" strokeWidth="1.4" />
          <circle cx="0" cy="0" r="32" fill="#3b0764" stroke="#c084fc" strokeWidth="1" />

          {/* Reel Cutout Holes */}
          {[0, 60, 120, 180, 240, 300].map((deg) => (
            <circle
              key={deg}
              cx="20"
              cy="0"
              r="7.5"
              fill="#090d16"
              stroke="#cbd5e1"
              strokeWidth="1.4"
              transform={`rotate(${deg})`}
            />
          ))}

          {/* Center spindle */}
          <circle cx="0" cy="0" r="10" fill="#e2e8f0" stroke="#334155" strokeWidth="1.2" />
          <circle cx="0" cy="0" r="4.5" fill="#090d16" />
        </g>

        {/* Movie Clapperboard in foreground */}
        <g transform="translate(40, 90) rotate(-16)">
          <rect x="0" y="16" width="60" height="38" rx="5" fill="#0f172a" stroke="#cbd5e1" strokeWidth="1.6" />
          <rect x="8" y="24" width="24" height="3" fill="#94a3b8" rx="1.5" />
          <rect x="8" y="33" width="44" height="2" fill="#64748b" rx="1" />
          <rect x="8" y="40" width="34" height="2" fill="#64748b" rx="1" />

          {/* Striped Clapper Stick */}
          <rect x="0" y="0" width="60" height="16" rx="3" fill="#1e293b" stroke="#f8fafc" strokeWidth="1.4" />
          <path d="M 10 0 L 19 0 L 11 16 L 2 16 Z" fill="#ffffff" />
          <path d="M 28 0 L 37 0 L 29 16 L 20 16 Z" fill="#ffffff" />
          <path d="M 46 0 L 55 0 L 47 16 L 38 16 Z" fill="#ffffff" />
        </g>
      </svg>
    </div>
  );
};

/**
 * 07. Card 07: Glowing 3D red-tagged "PDF" document sheet with an illuminated neural network brain icon and a chat bubble
 */
export const Card07Visual: React.FC = () => {
  return (
    <div className="relative w-full h-36 flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_60%,rgba(59,130,246,0.4)_0%,transparent_75%)] pointer-events-none" />

      <svg viewBox="0 0 200 160" className="w-full h-full max-h-36 drop-shadow-[0_14px_28px_rgba(59,130,246,0.4)]">
        <defs>
          <linearGradient id="docGlassSheet" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e3a8a" stopOpacity="0.85" />
            <stop offset="50%" stopColor="#0f172a" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#0369a1" stopOpacity="0.75" />
          </linearGradient>
        </defs>

        <ellipse cx="100" cy="140" rx="58" ry="10" fill="#1d4ed8" fillOpacity="0.4" filter="blur(5px)" />

        {/* 3D Tilted Document Sheet */}
        <g transform="translate(58, 22)">
          <rect
            x="0"
            y="0"
            width="84"
            height="108"
            rx="12"
            fill="url(#docGlassSheet)"
            stroke="#60a5fa"
            strokeWidth="2.2"
          />

          {/* Dog-Ear Fold */}
          <path d="M 68 0 L 84 16 L 68 16 Z" fill="#1e293b" stroke="#93c5fd" strokeWidth="1.2" />

          {/* Red-tagged "PDF" Badge */}
          <rect x="-6" y="8" width="36" height="20" rx="5" fill="#dc2626" stroke="#f87171" strokeWidth="1.2" />
          <text
            x="12"
            y="22.5"
            textAnchor="middle"
            fill="#ffffff"
            fontSize="11"
            fontWeight="900"
            fontFamily="system-ui"
          >
            PDF
          </text>

          {/* Illuminated Neural Network Brain in Center */}
          <g transform="translate(19, 34)">
            <path
              d="M 23 2 C 14 0, 4 8, 4 19 C 4 27, 10 33, 10 39 C 10 45, 16 49, 23 49"
              fill="none"
              stroke="#38bdf8"
              strokeWidth="2.4"
              strokeLinecap="round"
              filter="drop-shadow(0 0 6px #38bdf8)"
            />
            <path
              d="M 23 2 C 32 0, 42 8, 42 19 C 42 27, 36 33, 36 39 C 36 45, 30 49, 23 49"
              fill="none"
              stroke="#38bdf8"
              strokeWidth="2.4"
              strokeLinecap="round"
              filter="drop-shadow(0 0 6px #38bdf8)"
            />
            <path d="M 12 15 C 19 17, 21 25, 15 29" fill="none" stroke="#67e8f9" strokeWidth="1.6" />
            <path d="M 34 15 C 27 17, 25 25, 31 29" fill="none" stroke="#67e8f9" strokeWidth="1.6" />
            <path d="M 15 35 C 19 37, 23 37, 23 43" fill="none" stroke="#93c5fd" strokeWidth="1.6" />
            <path d="M 31 35 C 27 37, 23 37, 23 43" fill="none" stroke="#93c5fd" strokeWidth="1.6" />

            {/* Neural nodes */}
            <circle cx="23" cy="8" r="2.5" fill="#ffffff" />
            <circle cx="12" cy="21" r="2.2" fill="#38bdf8" />
            <circle cx="34" cy="21" r="2.2" fill="#38bdf8" />
            <circle cx="23" cy="27" r="2.8" fill="#f0f9ff" />
            <circle cx="16" cy="39" r="2.2" fill="#38bdf8" />
            <circle cx="30" cy="39" r="2.2" fill="#38bdf8" />
          </g>

          {/* Chat Bubble at bottom-right */}
          <g transform="translate(50, 82)">
            <rect x="0" y="0" width="36" height="24" rx="8" fill="#0284c7" stroke="#7dd3fc" strokeWidth="1.4" filter="drop-shadow(0 0 6px #0284c7)" />
            <path d="M 8 24 L 4 29 L 15 24 Z" fill="#0284c7" stroke="#7dd3fc" strokeWidth="0.8" />
            <rect x="7" y="7" width="22" height="2.2" rx="1" fill="#ffffff" />
            <rect x="7" y="12" width="16" height="2.2" rx="1" fill="#bae6fd" />
            <rect x="7" y="17" width="11" height="2.2" rx="1" fill="#bae6fd" />
          </g>
        </g>
      </svg>
    </div>
  );
};

/**
 * 08. Card 08: Sci-fi cyan holographic scanning frame displaying the physics equation "E = mc²" and an atomic nucleus model
 */
export const Card08Visual: React.FC = () => {
  return (
    <div className="relative w-full h-36 flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_65%,rgba(6,182,212,0.4)_0%,transparent_75%)] pointer-events-none" />

      <svg viewBox="0 0 200 160" className="w-full h-full max-h-36 drop-shadow-[0_14px_28px_rgba(6,182,212,0.45)]">
        <defs>
          <linearGradient id="scifiScreenBackdrop" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#082f49" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#020617" stopOpacity="0.98" />
          </linearGradient>
        </defs>

        <ellipse cx="100" cy="142" rx="64" ry="11" fill="#0e7490" fillOpacity="0.35" filter="blur(4px)" />
        <ellipse cx="100" cy="140" rx="50" ry="8" fill="#042f2e" stroke="#22d3ee" strokeWidth="1.8" />

        {/* Sci-Fi Scanning Reticle Box */}
        <g transform="translate(46, 20)">
          <rect x="0" y="0" width="108" height="112" rx="14" fill="url(#scifiScreenBackdrop)" stroke="#0891b2" strokeWidth="1.2" />

          {/* Corner Cyan Brackets */}
          <path d="M 9 22 L 9 9 L 22 9" fill="none" stroke="#22d3ee" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M 86 9 L 99 9 L 99 22" fill="none" stroke="#22d3ee" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M 9 90 L 9 103 L 22 103" fill="none" stroke="#22d3ee" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M 86 103 L 99 103 L 99 90" fill="none" stroke="#22d3ee" strokeWidth="3.5" strokeLinecap="round" />

          {/* Glowing Equation "E = mc²" */}
          <text
            x="54"
            y="42"
            textAnchor="middle"
            fill="#ffffff"
            fontSize="19"
            fontWeight="bold"
            fontFamily="'JetBrains Mono', monospace"
            style={{ textShadow: '0 0 12px #22d3ee, 0 0 24px #0891b2' }}
          >
            E = mc²
          </text>

          {/* 3D Atomic Nucleus Model */}
          <g transform="translate(54, 76)">
            <ellipse cx="0" cy="0" rx="30" ry="10" fill="none" stroke="#38bdf8" strokeWidth="1.8" strokeDasharray="3 2" transform="rotate(-30)" />
            <ellipse cx="0" cy="0" rx="30" ry="10" fill="none" stroke="#22d3ee" strokeWidth="1.8" strokeDasharray="3 2" transform="rotate(30)" />
            <ellipse cx="0" cy="0" rx="30" ry="10" fill="none" stroke="#67e8f9" strokeWidth="1.8" strokeDasharray="3 2" transform="rotate(90)" />

            {/* Orbiting Electrons */}
            <circle cx="22" cy="-11" r="2.5" fill="#ffffff" filter="drop-shadow(0 0 4px #22d3ee)" />
            <circle cx="-20" cy="13" r="2.5" fill="#ffffff" filter="drop-shadow(0 0 4px #22d3ee)" />
            <circle cx="0" cy="-24" r="2.5" fill="#22d3ee" filter="drop-shadow(0 0 4px #22d3ee)" />

            {/* Nucleus Core Cluster */}
            <circle cx="-2" cy="-2" r="5" fill="#06b6d4" />
            <circle cx="3" cy="1" r="4.6" fill="#38bdf8" />
            <circle cx="-1" cy="4" r="4.4" fill="#0284c7" />
            <circle cx="1" cy="-1" r="3.5" fill="#ffffff" />
          </g>
        </g>
      </svg>
    </div>
  );
};

/**
 * 09. Card 09: Luxury 3D golden fountain pen writing glowing golden alphabet letters onto a dark glowing paper pad
 */
export const Card09Visual: React.FC = () => {
  return (
    <div className="relative w-full h-36 flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_65%,rgba(245,158,11,0.4)_0%,transparent_75%)] pointer-events-none" />

      <svg viewBox="0 0 200 160" className="w-full h-full max-h-36 drop-shadow-[0_14px_28px_rgba(245,158,11,0.45)]">
        <defs>
          <linearGradient id="solidGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="30%" stopColor="#f59e0b" />
            <stop offset="70%" stopColor="#b45309" />
            <stop offset="100%" stopColor="#fef08a" />
          </linearGradient>

          <linearGradient id="darkPadGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e1b4b" />
            <stop offset="100%" stopColor="#090d16" />
          </linearGradient>
        </defs>

        <ellipse cx="100" cy="140" rx="58" ry="9" fill="#d97706" fillOpacity="0.35" filter="blur(5px)" />

        {/* Angled Dark Glowing Paper Notepad */}
        <g transform="translate(40, 92) rotate(-10)">
          <rect x="0" y="0" width="94" height="44" rx="7" fill="url(#darkPadGrad)" stroke="#f59e0b" strokeWidth="1.8" />
          <line x1="12" y1="12" x2="82" y2="12" stroke="#d97706" strokeWidth="1" strokeOpacity="0.7" />
          <line x1="12" y1="21" x2="72" y2="21" stroke="#d97706" strokeWidth="1" strokeOpacity="0.7" />
          <line x1="12" y1="30" x2="78" y2="30" stroke="#d97706" strokeWidth="1" strokeOpacity="0.7" />
        </g>

        {/* Floating Glowing Golden Letters */}
        <text x="64" y="63" fill="#fde047" fontSize="12" fontWeight="bold" fontFamily="serif" filter="drop-shadow(0 0 6px #f59e0b)">
          R
        </text>
        <text x="82" y="53" fill="#fef08a" fontSize="14" fontWeight="bold" fontFamily="serif" filter="drop-shadow(0 0 6px #f59e0b)">
          B
        </text>
        <text x="73" y="79" fill="#fde047" fontSize="11" fontWeight="bold" fontFamily="serif">
          A
        </text>
        <text x="124" y="48" fill="#fef08a" fontSize="13" fontWeight="bold" fontFamily="serif">
          n
        </text>
        <text x="136" y="66" fill="#fde047" fontSize="12" fontWeight="bold" fontFamily="serif">
          m
        </text>

        {/* Luxury 3D Golden Fountain Pen angled downward */}
        <g transform="translate(134, 22) rotate(42)">
          <rect x="-9" y="0" width="18" height="64" rx="5" fill="url(#solidGoldGrad)" stroke="#78350f" strokeWidth="1" />
          <rect x="-9.5" y="15" width="19" height="3.5" fill="#fef08a" />
          <rect x="-9.5" y="47" width="19" height="4.5" fill="#fef08a" />

          {/* Grip Section */}
          <path d="M -7 64 L 7 64 L 4.5 86 L -4.5 86 Z" fill="#1e293b" stroke="#f59e0b" strokeWidth="1" />

          {/* Golden Nib */}
          <path d="M -4.5 86 L 4.5 86 L 2 104 L 0 110 L -2 104 Z" fill="url(#solidGoldGrad)" stroke="#78350f" strokeWidth="0.8" />
          <line x1="0" y1="88" x2="0" y2="108" stroke="#78350f" strokeWidth="0.8" />
          <circle cx="0" cy="98" r="1.2" fill="#78350f" />
        </g>

        {/* Contact Point Spark */}
        <circle cx="98" cy="98" r="9" fill="#fef08a" fillOpacity="0.45" filter="blur(2.5px)" />
        <circle cx="98" cy="98" r="3.5" fill="#ffffff" />
        <path d="M 98 86 L 98 110 M 86 98 L 110 98" stroke="#fde047" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    </div>
  );
};

/**
 * 10. Card 10: Executive dark leather briefcase labeled "ATS ★★★★" with an ID document, locked with a prominent metallic golden padlock badge engraved with "VIP"
 */
export const Card10Visual: React.FC = () => {
  return (
    <div className="relative w-full h-36 flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_65%,rgba(234,179,8,0.38)_0%,transparent_75%)] pointer-events-none" />

      <svg viewBox="0 0 200 160" className="w-full h-full max-h-36 drop-shadow-[0_14px_28px_rgba(234,179,8,0.4)]">
        <defs>
          <linearGradient id="briefcaseTexture" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1e293b" />
            <stop offset="50%" stopColor="#0f172a" />
            <stop offset="100%" stopColor="#090d16" />
          </linearGradient>

          <linearGradient id="padlockGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="40%" stopColor="#eab308" />
            <stop offset="70%" stopColor="#a16207" />
            <stop offset="100%" stopColor="#fef08a" />
          </linearGradient>
        </defs>

        <ellipse cx="100" cy="140" rx="58" ry="10" fill="#ca8a04" fillOpacity="0.35" filter="blur(5px)" />

        {/* Executive Leather Briefcase */}
        <g transform="translate(40, 36)">
          {/* Handle */}
          <path
            d="M 38 10 C 38 -3, 68 -3, 68 10"
            fill="none"
            stroke="#cbd5e1"
            strokeWidth="5.5"
            strokeLinecap="round"
          />
          <rect x="42" y="2" width="22" height="6" rx="2" fill="#eab308" />

          {/* Main Briefcase Body */}
          <rect x="0" y="10" width="108" height="78" rx="9" fill="url(#briefcaseTexture)" stroke="#38bdf8" strokeWidth="1.8" />

          {/* Metallic Corner Protectors */}
          <path d="M 0 19 L 9 10 L 0 10 Z" fill="#eab308" />
          <path d="M 108 19 L 99 10 L 108 10 Z" fill="#eab308" />
          <path d="M 0 79 L 9 88 L 0 88 Z" fill="#eab308" />
          <path d="M 108 79 L 99 88 L 108 88 Z" fill="#eab308" />

          {/* Latches */}
          <rect x="22" y="12" width="11" height="9" rx="2" fill="#eab308" />
          <rect x="75" y="12" width="11" height="9" rx="2" fill="#eab308" />

          {/* ID Document / ATS Badge attached */}
          <g transform="translate(14, 26)">
            <rect x="0" y="0" width="52" height="36" rx="5" fill="#090d16" stroke="#475569" strokeWidth="1.2" />
            <text x="6" y="14" fill="#ffffff" fontSize="11" fontWeight="bold" fontFamily="system-ui">
              ATS
            </text>
            <text x="6" y="26" fill="#eab308" fontSize="9" fontWeight="bold">
              ★★★★
            </text>
            <circle cx="40" cy="14" r="5.5" fill="#94a3b8" />
            <path d="M 33 27 C 33 22, 47 22, 47 27 Z" fill="#64748b" />
          </g>
        </g>

        {/* Heavy 3D Metallic Golden Padlock engraved "VIP" */}
        <g transform="translate(116, 76)">
          <path
            d="M 10 16 L 10 7 C 10 -5, 32 -5, 32 7 L 32 16"
            fill="none"
            stroke="#f8fafc"
            strokeWidth="5.5"
            strokeLinecap="round"
          />
          <rect x="0" y="14" width="42" height="38" rx="9" fill="url(#padlockGold)" stroke="#78350f" strokeWidth="1.4" filter="drop-shadow(0 0 10px rgba(234,179,8,0.6))" />
          <text
            x="21"
            y="38"
            textAnchor="middle"
            fill="#451a03"
            fontSize="15"
            fontWeight="900"
            fontFamily="system-ui"
            letterSpacing="0.8"
            style={{ textShadow: '0 1px 0 #fef08a' }}
          >
            VIP
          </text>
        </g>
      </svg>
    </div>
  );
};

/**
 * 11. Card 11: AI Song & Lyric Studio
 * Glowing 3D holographic musical headphones with neon soundwaves & audio equalizer bars
 * in electric magenta (#ec4899), violet (#a855f7), and neon cyan (#06b6d4)
 */
export const CardSongStudioVisual: React.FC = () => {
  return (
    <div className="relative w-full h-36 flex items-center justify-center overflow-hidden">
      <svg
        viewBox="0 0 200 160"
        className="w-full h-full max-h-36 drop-shadow-[0_0_25px_rgba(236,72,153,0.45)]"
      >
        <defs>
          {/* Holographic Magenta-Violet Gradients */}
          <linearGradient id="songHeadband" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ec4899" />
            <stop offset="45%" stopColor="#8b5cf6" />
            <stop offset="75%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>

          <linearGradient id="songCupMetal" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#381547" />
            <stop offset="30%" stopColor="#831843" />
            <stop offset="60%" stopColor="#db2777" />
            <stop offset="85%" stopColor="#f472b6" />
            <stop offset="100%" stopColor="#381547" />
          </linearGradient>

          <radialGradient id="cupCenterGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="40%" stopColor="#f43f5e" stopOpacity="0.8" />
            <stop offset="80%" stopColor="#a855f7" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#0f172a" stopOpacity="0" />
          </radialGradient>

          <linearGradient id="eqBarGrad" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#06b6d4" />
            <stop offset="40%" stopColor="#a855f7" />
            <stop offset="80%" stopColor="#ec4899" />
            <stop offset="100%" stopColor="#f43f5e" />
          </linearGradient>

          <radialGradient id="pedestalSong" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ec4899" stopOpacity="0.35" />
            <stop offset="60%" stopColor="#8b5cf6" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#06090f" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Ambient Glow Pedestal */}
        <ellipse cx="100" cy="142" rx="72" ry="12" fill="url(#pedestalSong)" />
        <ellipse cx="100" cy="140" rx="55" ry="8" fill="#180c2e" stroke="#ec4899" strokeWidth="1.5" strokeOpacity="0.7" />
        <ellipse cx="100" cy="139" rx="36" ry="5" fill="#0f051d" stroke="#06b6d4" strokeWidth="1.2" strokeOpacity="0.8" />

        {/* Concentric Soundwave Ripples on Floor */}
        <ellipse cx="100" cy="140" rx="80" ry="11" fill="none" stroke="#a855f7" strokeWidth="1" strokeOpacity="0.3" strokeDasharray="3 3" />
        <ellipse cx="100" cy="140" rx="92" ry="13" fill="none" stroke="#ec4899" strokeWidth="0.8" strokeOpacity="0.2" strokeDasharray="4 4" />

        {/* Equalizer Frequency Bars Background */}
        <g opacity="0.9">
          {/* Left Bars */}
          <rect x="42" y="90" width="4" height="24" rx="2" fill="url(#eqBarGrad)" />
          <rect x="50" y="80" width="4" height="36" rx="2" fill="url(#eqBarGrad)" />
          <rect x="58" y="70" width="4" height="48" rx="2" fill="url(#eqBarGrad)" />
          <rect x="66" y="84" width="4" height="32" rx="2" fill="url(#eqBarGrad)" />
          <rect x="74" y="64" width="4" height="54" rx="2" fill="url(#eqBarGrad)" />

          {/* Center Bars */}
          <rect x="82" y="76" width="4" height="42" rx="2" fill="url(#eqBarGrad)" />
          <rect x="90" y="58" width="4" height="62" rx="2" fill="url(#eqBarGrad)" />
          <rect x="98" y="52" width="4" height="70" rx="2" fill="url(#eqBarGrad)" />
          <rect x="106" y="58" width="4" height="62" rx="2" fill="url(#eqBarGrad)" />
          <rect x="114" y="76" width="4" height="42" rx="2" fill="url(#eqBarGrad)" />

          {/* Right Bars */}
          <rect x="122" y="64" width="4" height="54" rx="2" fill="url(#eqBarGrad)" />
          <rect x="130" y="84" width="4" height="32" rx="2" fill="url(#eqBarGrad)" />
          <rect x="138" y="70" width="4" height="48" rx="2" fill="url(#eqBarGrad)" />
          <rect x="146" y="80" width="4" height="36" rx="2" fill="url(#eqBarGrad)" />
          <rect x="154" y="90" width="4" height="24" rx="2" fill="url(#eqBarGrad)" />
        </g>

        {/* Floating Musical Notes with Neon Glow */}
        <g fill="#ec4899" opacity="0.85" filter="drop-shadow(0 0 6px #f43f5e)">
          {/* Note 1 (Left Top) */}
          <g transform="translate(30, 42) scale(0.9)">
            <ellipse cx="6" cy="14" rx="4.5" ry="3.5" transform="rotate(-20 6 14)" />
            <rect x="8" y="3" width="2" height="12" />
            <path d="M 10 3 C 14 3, 16 7, 18 10 L 18 7 C 16 4, 14 2, 10 2 Z" />
          </g>

          {/* Note 2 (Right Top Double Note) */}
          <g transform="translate(155, 36) scale(0.95)">
            <ellipse cx="6" cy="14" rx="4.5" ry="3.5" transform="rotate(-20 6 14)" />
            <ellipse cx="18" cy="12" rx="4.5" ry="3.5" transform="rotate(-20 18 12)" />
            <rect x="8.5" y="3" width="2" height="12" />
            <rect x="20.5" y="1" width="2" height="12" />
            <polygon points="8.5,3 22.5,1 22.5,4.5 8.5,6.5" fill="#f43f5e" />
          </g>

          {/* Note 3 (Center Top Small) */}
          <g transform="translate(95, 20) scale(0.75)">
            <ellipse cx="6" cy="14" rx="4" ry="3" transform="rotate(-20 6 14)" fill="#06b6d4" />
            <rect x="8" y="4" width="1.8" height="11" fill="#06b6d4" />
          </g>
        </g>

        {/* 3D Holographic Musical Headphones */}
        <g filter="drop-shadow(0 0 16px rgba(236,72,153,0.65))">
          {/* Arching Headband */}
          <path
            d="M 52 90 C 52 42, 70 24, 100 24 C 130 24, 148 42, 148 90"
            fill="none"
            stroke="url(#songHeadband)"
            strokeWidth="9"
            strokeLinecap="round"
          />
          {/* Inner Cushion Arch */}
          <path
            d="M 58 88 C 58 48, 74 32, 100 32 C 126 32, 142 48, 142 88"
            fill="none"
            stroke="#1e1035"
            strokeWidth="4"
            strokeLinecap="round"
          />
          {/* Metallic Headband Top Highlight */}
          <path
            d="M 72 38 C 84 30, 116 30, 128 38"
            fill="none"
            stroke="#ffffff"
            strokeWidth="2"
            strokeOpacity="0.7"
            strokeLinecap="round"
          />

          {/* Left Earcup Assembly */}
          <g transform="translate(40, 74)">
            {/* Swivel Pivot */}
            <rect x="8" y="0" width="8" height="12" rx="3" fill="#cbd5e1" stroke="#475569" strokeWidth="1" />
            {/* Outer Ear Cup Shell */}
            <ellipse cx="12" cy="24" rx="14" ry="22" fill="url(#songCupMetal)" stroke="#ec4899" strokeWidth="2" />
            {/* Glowing Neon Ring */}
            <ellipse cx="12" cy="24" rx="9" ry="16" fill="#0f051d" stroke="#06b6d4" strokeWidth="2" filter="drop-shadow(0 0 6px #06b6d4)" />
            {/* Center Core Glowing Orb */}
            <circle cx="12" cy="24" r="6" fill="url(#cupCenterGlow)" />
            {/* Soft Ear Cushion */}
            <path
              d="M 19 8 C 25 14, 25 34, 19 40"
              fill="none"
              stroke="#0f172a"
              strokeWidth="5"
              strokeLinecap="round"
            />
          </g>

          {/* Right Earcup Assembly */}
          <g transform="translate(136, 74)">
            {/* Swivel Pivot */}
            <rect x="8" y="0" width="8" height="12" rx="3" fill="#cbd5e1" stroke="#475569" strokeWidth="1" />
            {/* Outer Ear Cup Shell */}
            <ellipse cx="12" cy="24" rx="14" ry="22" fill="url(#songCupMetal)" stroke="#ec4899" strokeWidth="2" />
            {/* Glowing Neon Ring */}
            <ellipse cx="12" cy="24" rx="9" ry="16" fill="#0f051d" stroke="#06b6d4" strokeWidth="2" filter="drop-shadow(0 0 6px #06b6d4)" />
            {/* Center Core Glowing Orb */}
            <circle cx="12" cy="24" r="6" fill="url(#cupCenterGlow)" />
            {/* Soft Ear Cushion */}
            <path
              d="M 5 8 C -1 14, -1 34, 5 40"
              fill="none"
              stroke="#0f172a"
              strokeWidth="5"
              strokeLinecap="round"
            />
          </g>
        </g>

        {/* Dynamic Curved Audio Beams radiating from Headphone */}
        <path
          d="M 32 94 C 18 90, 8 102, 2 115"
          fill="none"
          stroke="#ec4899"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="2 3"
          opacity="0.8"
        />
        <path
          d="M 168 94 C 182 90, 192 102, 198 115"
          fill="none"
          stroke="#06b6d4"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="2 3"
          opacity="0.8"
        />
      </svg>
    </div>
  );
};

