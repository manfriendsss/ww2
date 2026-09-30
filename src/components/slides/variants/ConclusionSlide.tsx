import React from 'react';
import { motion } from 'framer-motion';
import { SlideData } from '../../../types/slide';
import { ClassifiedBadge } from '../../common/ClassifiedBadge';
import confetti from 'canvas-confetti';
import { Sparkles, MessageSquare } from 'lucide-react';

interface ConclusionSlideProps {
  slide: SlideData;
}

export const ConclusionSlide: React.FC<ConclusionSlideProps> = ({ slide }) => {
  const triggerConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#D4AF37', '#B89C62', '#8B2626', '#3D493A'],
    });
  };

  return (
    <div className="flex flex-col h-full justify-center space-y-3 sm:space-y-4 max-w-3xl mx-auto text-center py-2">
      {/* Header & Badges */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-1.5"
      >
        <div className="flex justify-center">
          <ClassifiedBadge label="MISSION DEBRIEF COMPLETE // ARCHIVE SEALED" variant="brass" size="sm" />
        </div>
        <h2 className="font-heading text-2xl sm:text-3xl text-[#D4AF37] font-bold uppercase tracking-wide">
          THANK YOU FOR LISTENING!
        </h2>
        <p className="font-typewriter text-xs sm:text-sm text-[#e57373]">
          JOURNEY TO THE CRUCIBLE OF HISTORY (1939 – 1945)
        </p>
      </motion.div>

      {/* Main Quote Card */}
      {slide.content.quote && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.55, delay: 0.15 }}
          className="p-4 sm:p-5 rounded bg-[#202521] border-2 border-[#B89C62] shadow-2xl relative"
        >
          <p className="font-body text-base sm:text-lg text-[#F5F5F0] italic leading-relaxed">
            "{slide.content.quote.text}"
          </p>
          <div className="mt-2.5 pt-2 border-t border-[#3D493A] font-courier text-[11px] text-[#B89C62] uppercase tracking-wider">
            THE INVISIBLE WITNESS // FINAL REFLECTION
          </div>
        </motion.div>
      )}

      {/* Discussion Prompt Card */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="p-3.5 sm:p-4 rounded bg-[#1a1e1b] border border-[#3D493A] flex flex-col sm:flex-row items-center justify-between gap-3 text-left shadow-lg"
      >
        <div className="flex items-start gap-2.5">
          <div className="p-2 rounded bg-[#252b27] text-[#D4AF37] border border-[#3D493A] shrink-0">
            <MessageSquare size={18} />
          </div>
          <div>
            <span className="font-typewriter text-xs text-[#8B2626] font-bold uppercase tracking-wider block">
              FLOOR OPEN FOR QUESTIONS & CONVERSATION
            </span>
            <p className="font-body text-xs sm:text-sm text-[#d1cbbe] mt-0.5">
              If you had that time dial in your hands, which historical moment would you choose to witness?
            </p>
          </div>
        </div>

        <button
          onClick={triggerConfetti}
          className="shrink-0 px-3.5 py-1.5 rounded bg-[#3D493A] hover:bg-[#B89C62] text-[#F5F5F0] hover:text-[#16181A] font-heading tracking-wider uppercase text-xs flex items-center gap-1.5 transition-all shadow border border-[#B89C62]"
        >
          <Sparkles size={14} />
          Honor Memory
        </button>
      </motion.div>
    </div>
  );
};
