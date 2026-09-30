import React from 'react';
import { motion } from 'framer-motion';
import { SlideData } from '../../../types/slide';
import { ClassifiedBadge } from '../../common/ClassifiedBadge';

interface ConclusionSlideProps {
  slide: SlideData;
}

export const ConclusionSlide: React.FC<ConclusionSlideProps> = ({ slide }) => {
  return (
    <div className="flex flex-col h-full justify-center space-y-4 sm:space-y-6 max-w-3xl mx-auto text-center py-4">
      {/* Header & Badges */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-2"
      >
        <div className="flex justify-center">
          <ClassifiedBadge label="MISSION DEBRIEF COMPLETE // ARCHIVE SEALED" variant="brass" size="sm" />
        </div>
        <h2 className="font-heading text-2xl sm:text-4xl text-[#D4AF37] font-bold uppercase tracking-wide">
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
          className="p-5 sm:p-7 rounded bg-[#202521] border-2 border-[#B89C62] shadow-2xl relative"
        >
          <p className="font-body text-base sm:text-xl text-[#F5F5F0] italic leading-relaxed">
            "{slide.content.quote.text}"
          </p>
          <div className="mt-3.5 pt-2.5 border-t border-[#3D493A] font-courier text-xs sm:text-sm text-[#B89C62] uppercase tracking-wider">
            THE INVISIBLE WITNESS // FINAL REFLECTION
          </div>
        </motion.div>
      )}
    </div>
  );
};

