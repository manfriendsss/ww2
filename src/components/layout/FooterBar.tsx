import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface FooterBarProps {
  currentIndex: number;
  totalSlides: number;
  onPrev: () => void;
  onNext: () => void;
  canAdvance?: boolean;
}

export const FooterBar: React.FC<FooterBarProps> = ({
  currentIndex,
  totalSlides,
  onPrev,
  onNext,
  canAdvance = true,
}) => {
  const progressPercent = ((currentIndex + 1) / totalSlides) * 100;

  return (
    <footer className="border-t border-[#3D493A] pt-3 mt-4 flex flex-wrap items-center justify-between gap-4 select-none">
      {/* Navigation Buttons */}
      <div className="flex items-center gap-2">
        <button
          onClick={onPrev}
          disabled={currentIndex === 0}
          className={`px-3 py-1.5 rounded flex items-center gap-1 font-typewriter text-xs tracking-wider uppercase border transition-colors ${
            currentIndex === 0
              ? 'opacity-40 cursor-not-allowed border-[#3D493A] text-[#8c978e]'
              : 'border-[#3D493A] hover:border-[#B89C62] bg-[#16181A] hover:bg-[#3D493A] text-[#F5F5F0]'
          }`}
        >
          <ChevronLeft size={14} />
          PREV
        </button>

        {canAdvance ? (
          <button
            onClick={onNext}
            disabled={currentIndex === totalSlides - 1}
            className={`px-4 py-1.5 rounded flex items-center gap-1 font-typewriter text-xs tracking-wider uppercase border transition-colors ${
              currentIndex === totalSlides - 1
                ? 'opacity-40 cursor-not-allowed border-[#3D493A] text-[#8c978e]'
                : 'border-[#8B2626] bg-[#8B2626]/80 hover:bg-[#8B2626] text-[#F5F5F0] shadow-md animate-pulse'
            }`}
          >
            NEXT
            <ChevronRight size={14} />
          </button>
        ) : (
          <span className="px-3 py-1.5 rounded font-typewriter text-xs text-[#8c978e] bg-[#16181A] border border-dashed border-[#3D493A]">
            COMPLETE INTRO TO CONTINUE
          </span>
        )}
      </div>

      {/* Progress Bar (Military Gauge) */}
      <div className="flex-1 max-w-xs mx-4 hidden sm:block">
        <div className="flex justify-between items-center text-[10px] font-courier text-[#8c978e] mb-1">
          <span>CRUCIBLE PROGRESS</span>
          <span>{Math.round(progressPercent)}%</span>
        </div>
        <div className="h-1.5 w-full bg-[#16181A] rounded-full overflow-hidden border border-[#3D493A]">
          <div
            className="h-full bg-gradient-to-r from-[#3D493A] via-[#B89C62] to-[#8B2626] transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>
    </footer>
  );
};
