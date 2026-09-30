import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SlideData } from '../../types/slide';
import { X, LayoutGrid } from 'lucide-react';

interface SlideOverviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  slides: SlideData[];
  currentIndex: number;
  onSelectSlide: (index: number) => void;
}

export const SlideOverviewModal: React.FC<SlideOverviewModalProps> = ({
  isOpen,
  onClose,
  slides,
  currentIndex,
  onSelectSlide,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 sm:p-8 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, y: 15 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 15 }}
            className="w-full max-w-6xl max-h-[88vh] bg-[#1a1d1a] border-2 border-[#B89C62] rounded-md p-6 shadow-2xl flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#3D493A]">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded bg-[#252b27] text-[#D4AF37] border border-[#3D493A]">
                  <LayoutGrid size={20} />
                </div>
                <div>
                  <span className="font-typewriter text-xs text-[#8B2626] font-bold tracking-widest uppercase block">
                    TACTICAL OVERVIEW // 20 SLIDE DOSSIER
                  </span>
                  <h3 className="font-heading text-xl text-[#F5F5F0] uppercase">
                    Select Slide To Navigate
                  </h3>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-1.5 rounded text-[#8c978e] hover:text-[#F5F5F0] hover:bg-[#8B2626] transition-colors"
                title="Close Overview [G / Esc]"
              >
                <X size={20} />
              </button>
            </div>

            {/* Grid of 20 Slides */}
            <div className="flex-1 overflow-y-auto pr-1 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5">
              {slides.map((s, idx) => {
                const isActive = idx === currentIndex;
                return (
                  <button
                    key={s.id}
                    onClick={() => {
                      onSelectSlide(idx);
                      onClose();
                    }}
                    className={`text-left p-3 rounded flex flex-col justify-between border-2 transition-all relative group ${
                      isActive
                        ? 'bg-[#2a2223] border-[#8B2626] ring-2 ring-[#8B2626]/50 shadow-lg'
                        : 'bg-[#202521] border-[#3D493A] hover:border-[#B89C62] hover:bg-[#252b27]'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between text-[10px] font-typewriter mb-1">
                        <span className={isActive ? 'text-[#8B2626] font-bold' : 'text-[#B89C62]'}>
                          SLIDE {String(idx + 1).padStart(2, '0')}
                        </span>
                        {isActive && (
                          <span className="w-2 h-2 rounded-full bg-[#8B2626] animate-ping" />
                        )}
                      </div>
                      <h4 className="font-heading text-xs text-[#F5F5F0] group-hover:text-[#D4AF37] transition-colors uppercase line-clamp-2 leading-tight">
                        {s.title}
                      </h4>
                    </div>

                    <div className="mt-3 pt-2 border-t border-[#3D493A]/50 flex items-center justify-between text-[10px] font-courier text-[#8c978e]">
                      <span className="truncate">{s.speakerNote.timing}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
