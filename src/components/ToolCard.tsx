import React from 'react';
import { Star } from 'lucide-react';
import { ToolItem } from '../data/toolsData';
import {
  Card01Visual,
  Card02Visual,
  Card03Visual,
  Card04Visual,
  Card05Visual,
  Card06Visual,
  Card07Visual,
  Card08Visual,
  Card09Visual,
  Card10Visual,
} from './CardVisuals';

interface ToolCardProps {
  tool: ToolItem;
  isFavorite: boolean;
  onToggleFavorite: (id: string, e: React.MouseEvent) => void;
  onSelect: (tool: ToolItem) => void;
}

export const ToolCard: React.FC<ToolCardProps> = ({
  tool,
  isFavorite,
  onToggleFavorite,
  onSelect,
}) => {
  const renderVisual = () => {
    switch (tool.id) {
      case 'langgo':
        return <Card01Visual />;
      case 'kchat':
        return <Card02Visual />;
      case 'imagestudio':
        return <Card03Visual />;
      case 'photoenhancer':
        return <Card04Visual />;
      case 'aivoice':
        return <Card05Visual />;
      case 'videogenerator':
        return <Card06Visual />;
      case 'chatpdf':
        return <Card07Visual />;
      case 'snapsolve':
        return <Card08Visual />;
      case 'contentwriter':
        return <Card09Visual />;
      case 'cvbuilder':
        return <Card10Visual />;
      default:
        return <Card01Visual />;
    }
  };

  const isCard01 = tool.id === 'langgo';

  return (
    <div
      onClick={() => onSelect(tool)}
      style={{
        background: 'rgba(17, 24, 39, 0.75)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
      }}
      className={`group relative flex flex-col justify-between rounded-2xl overflow-hidden cursor-pointer select-none transition-all duration-300 active:scale-[0.98] ${
        isCard01
          ? 'border-[1.5px] border-[#00d2ff] shadow-[0_0_25px_rgba(0,210,255,0.45),inset_0_0_15px_rgba(0,210,255,0.18)]'
          : 'border border-white/10 hover:border-slate-600/70 shadow-[0_8px_30px_rgba(0,0,0,0.5)]'
      }`}
    >
      {/* Top Bar with Number & Favorite Star */}
      <div className="relative z-10 flex items-center justify-between px-3 pt-2.5 pb-1">
        <span className="text-[11px] font-mono font-medium text-slate-300 tracking-wider">
          {tool.num}
        </span>
        <button
          onClick={(e) => onToggleFavorite(tool.id, e)}
          type="button"
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          className="p-1 -mr-1 text-slate-400 hover:text-amber-400 transition-colors"
        >
          <Star
            className={`w-3.5 h-3.5 transition-transform duration-200 group-hover:scale-110 ${
              isFavorite
                ? 'fill-amber-400 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.7)]'
                : 'stroke-[1.5] text-slate-400 hover:text-slate-200'
            }`}
          />
        </button>
      </div>

      {/* Main 3D Glowing Art Area */}
      <div className="relative flex-1 flex items-center justify-center -my-1">
        {renderVisual()}
      </div>

      {/* Bottom Label Area */}
      <div className="relative z-10 px-2 pb-3 pt-1 text-center">
        {isCard01 ? (
          <div className="flex flex-col items-center justify-center">
            {/* Khmer Text */}
            <span className="font-khmer text-sm font-medium text-white tracking-wide leading-tight drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
              {tool.khmerTitle || 'រៀនគ្រប់ភាសា'}
            </span>
            {/* English Subtitle */}
            <span className="text-[11px] font-medium text-cyan-300 tracking-tight mt-0.5 drop-shadow-[0_0_8px_rgba(6,182,212,0.6)]">
              {tool.subtitle || 'LangGo'}
            </span>
          </div>
        ) : (
          <span className="text-[13px] font-semibold text-slate-100 tracking-tight leading-tight block drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
            {tool.title}
          </span>
        )}
      </div>

      {/* Subtle bottom glass reflection line */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
    </div>
  );
};
