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
    <div className="flex flex-col justify-center h-full my-auto space-y-5 max-w-5xl mx-auto w-full">
      {/* Dossier Card Container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="p-6 md:p-8 rounded-lg bg-[#202521] border-2 border-[#3D493A] shadow-2xl relative"
      >
        {/* Dossier Corner Rivets */}
        <div className="absolute top-2 left-2 w-2 h-2 rounded-full bg-[#B89C62]/60" />
        <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#B89C62]/60" />
        <div className="absolute bottom-2 left-2 w-2 h-2 rounded-full bg-[#B89C62]/60" />
        <div className="absolute bottom-2 right-2 w-2 h-2 rounded-full bg-[#B89C62]/60" />

        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-6 border-b border-[#3D493A]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded bg-[#16181A] text-[#B89C62] border border-[#3D493A]">
              <FileText size={20} />
            </div>
            <div>
              <span className="font-typewriter text-xs text-[#8c978e] tracking-widest block uppercase">
                DECLASSIFIED DOSSIER MEMORANDUM
              </span>
              <h3 className="font-heading text-xl md:text-2xl text-[#D4AF37] uppercase">
                {slide.content.lead || slide.title}
              </h3>
            </div>
          </div>
          <ClassifiedBadge label="DECLASSIFIED // EYES ONLY" variant="red" />
        </div>

        {/* 4 Mission Points Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
          {slide.content.points?.map((pt, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15 + idx * 0.08 }}
              className="p-4 rounded bg-[#181d19] border border-[#3D493A] hover:border-[#B89C62] transition-colors relative"
            >
              <h4 className="font-heading text-base text-[#D4AF37] tracking-wider uppercase mb-1 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8B2626]" />
                {pt.title}
              </h4>
              <p className="font-body text-sm text-[#d1cbbe] leading-relaxed">
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
            className="mt-6 p-4 rounded bg-[#161917] border-l-4 border-[#8B2626] border-y border-r border-[#3D493A] flex items-start gap-4"
          >
            <QuoteIcon size={28} className="text-[#8B2626] shrink-0 mt-1 opacity-70" />
            <div>
              <p className="font-body text-base text-[#f5f5f0] italic leading-relaxed">
                "{slide.content.quote.text}"
              </p>
              <div className="mt-2 flex items-center gap-2">
                <span className="font-heading text-sm text-[#D4AF37]">
                  — {slide.content.quote.author}
                </span>
                {slide.content.quote.role && (
                  <span className="font-typewriter text-xs text-[#8c978e]">
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
