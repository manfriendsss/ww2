import React from 'react';
import { motion } from 'framer-motion';
import { SlideData } from '../../../types/slide';
import { ArchivalImage } from '../../common/ArchivalImage';
import { Quote as QuoteIcon } from 'lucide-react';

interface MemorialQuoteSlideProps {
  slide: SlideData;
}

export const MemorialQuoteSlide: React.FC<MemorialQuoteSlideProps> = ({ slide }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch h-full">
      {/* Left: Quote & Philosophical Lessons */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.55 }}
        className="md:col-span-7 flex flex-col justify-between space-y-4"
      >
        {/* Solemn Quote Block */}
        {slide.content.quote && (
          <div className="p-6 rounded bg-[#25201c] border-2 border-[#B89C62] shadow-2xl relative overflow-hidden">
            <QuoteIcon size={36} className="text-[#B89C62]/40 absolute top-4 right-4 pointer-events-none" />
            <p className="font-body text-xl sm:text-2xl text-[#f5f5f0] italic leading-relaxed font-light">
              "{slide.content.quote.text}"
            </p>
            <div className="mt-4 pt-3 border-t border-[#B89C62]/40 flex flex-wrap items-center justify-between gap-2">
              <div>
                <span className="font-heading text-lg text-[#D4AF37] block font-semibold">
                  — {slide.content.quote.author}
                </span>
                {slide.content.quote.role && (
                  <span className="font-typewriter text-xs text-[#a39882]">
                    {slide.content.quote.role}
                  </span>
                )}
              </div>
              {slide.content.quote.source && (
                <span className="font-courier text-xs text-[#8c978e] italic">
                  {slide.content.quote.source}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Lead statement */}
        {slide.content.lead && (
          <div className="border-l-3 border-[#8B2626] pl-3 py-1 bg-[#1a1d1a]/60">
            <h4 className="font-heading text-base text-[#D4AF37] uppercase">
              {slide.content.lead}
            </h4>
          </div>
        )}

        {/* Lessons List */}
        <div className="space-y-3">
          {slide.content.points?.map((pt, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + idx * 0.1 }}
              className="p-3.5 rounded bg-[#1e231f] border border-[#3D493A] hover:border-[#B89C62] transition-colors"
            >
              <h5 className="font-heading text-sm text-[#D4AF37] uppercase flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#B89C62]" />
                {pt.title}
              </h5>
              <p className="font-body text-sm text-[#d1cbbe] leading-relaxed mt-1">
                {pt.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Right: Archival Record / Memorial Imagery */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="md:col-span-5 flex flex-col justify-center"
      >
        {slide.media && (
          <ArchivalImage
            url={slide.media.url}
            caption={slide.media.caption}
            source={slide.media.source}
            badge="MEMORIAL ARCHIVE"
          />
        )}
      </motion.div>
    </div>
  );
};
