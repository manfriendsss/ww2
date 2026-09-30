import React from 'react';
import { motion } from 'framer-motion';
import { SlideData } from '../../../types/slide';
import { ClassifiedBadge } from '../../common/ClassifiedBadge';
import { FileText, Quote as QuoteIcon } from 'lucide-react';

interface DossierSlideProps {
  slide: SlideData;
}

export const DossierSlide: React.FC<DossierSlideProps> = ({ slide }) => {
  return (
    <div className="flex flex-col justify-center h-full w-full max-w-6xl 2xl:max-w-7xl mx-auto px-2 sm:px-4 py-2">
      {/* Dossier Card Container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="p-6 sm:p-8 lg:p-9 rounded-xl bg-[#202521] border-2 border-[#3D493A] shadow-2xl relative flex flex-col justify-between"
      >
        {/* Dossier Corner Rivets */}
        <div className="absolute top-2.5 left-2.5 w-2.5 h-2.5 rounded-full bg-[#B89C62]/70 border border-[#16181A]" />
        <div className="absolute top-2.5 right-2.5 w-2.5 h-2.5 rounded-full bg-[#B89C62]/70 border border-[#16181A]" />
        <div className="absolute bottom-2.5 left-2.5 w-2.5 h-2.5 rounded-full bg-[#B89C62]/70 border border-[#16181A]" />
        <div className="absolute bottom-2.5 right-2.5 w-2.5 h-2.5 rounded-full bg-[#B89C62]/70 border border-[#16181A]" />

        {/* Dossier Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 sm:mb-6 border-b border-[#3D493A]">
          <div className="flex items-center gap-3.5">
            <div className="p-2.5 rounded-lg bg-[#16181A] text-[#B89C62] border border-[#3D493A] shrink-0">
              <FileText size={24} />
            </div>
            <div>
              <span className="font-typewriter text-xs sm:text-sm text-[#8c978e] tracking-widest block uppercase">
                DECLASSIFIED DOSSIER MEMORANDUM
              </span>
              <h3 className="font-heading text-xl sm:text-2xl lg:text-3xl text-[#D4AF37] uppercase tracking-wide">
                {slide.content.lead || slide.title}
              </h3>
            </div>
          </div>
          <ClassifiedBadge label="DECLASSIFIED // EYES ONLY" variant="red" size="md" />
        </div>

        {/* 4 Mission Points Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 my-2 sm:my-4 flex-1">
          {slide.content.points?.map((pt, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15 + idx * 0.08 }}
              className="p-5 sm:p-6 lg:p-7 rounded-lg bg-[#181d19] border border-[#3D493A] hover:border-[#B89C62] transition-colors relative flex flex-col justify-center"
            >
              <h4 className="font-heading text-base sm:text-lg lg:text-xl text-[#D4AF37] tracking-wider uppercase mb-2 flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-[#8B2626] shrink-0" />
                {pt.title}
              </h4>
              <p className="font-body text-sm sm:text-base lg:text-lg text-[#d1cbbe] leading-relaxed">
                {pt.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Featured Quote Block */}
        {slide.content.quote && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-4 sm:mt-6 p-5 sm:p-6 lg:p-7 rounded-lg bg-[#161917] border-l-4 border-[#8B2626] border-y border-r border-[#3D493A] flex items-start gap-4 sm:gap-5"
          >
            <QuoteIcon size={32} className="text-[#8B2626] shrink-0 mt-0.5 opacity-80" />
            <div className="flex-1">
              <p className="font-body text-base sm:text-lg lg:text-xl text-[#f5f5f0] italic leading-relaxed">
                "{slide.content.quote.text}"
              </p>
              <div className="mt-2.5 flex flex-wrap items-center gap-2.5">
                <span className="font-heading text-sm sm:text-base text-[#D4AF37]">
                  — {slide.content.quote.author}
                </span>
                {slide.content.quote.role && (
                  <span className="font-typewriter text-xs sm:text-sm text-[#8c978e]">
                    ({slide.content.quote.role})
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};
