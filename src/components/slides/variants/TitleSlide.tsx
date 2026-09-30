import React from 'react';
import { motion } from 'framer-motion';
import { SlideData } from '../../../types/slide';
import { ArchivalImage } from '../../common/ArchivalImage';
import { ClassifiedBadge } from '../../common/ClassifiedBadge';
import { Compass, Clock, ShieldAlert } from 'lucide-react';

interface TitleSlideProps {
  slide: SlideData;
}

export const TitleSlide: React.FC<TitleSlideProps> = ({ slide }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center h-full">
      {/* Left Column: Title & Mission Directives */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="md:col-span-7 flex flex-col justify-center space-y-4 sm:space-y-6"
      >
        <div className="flex flex-wrap items-center gap-3">
          <ClassifiedBadge label="TOP SECRET // DECLASSIFIED" variant="red" />
          <span className="font-courier text-xs text-[#B89C62] tracking-widest uppercase flex items-center gap-1.5">
            <Clock size={13} className="text-[#B89C62]" />
            TEMPORAL COORDINATES: 1939.09 – 1945.09
          </span>
        </div>

        <div>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl text-[#D4AF37] font-bold tracking-tight uppercase leading-none drop-shadow-md">
            {slide.title}
          </h1>
          <p className="font-typewriter text-xl sm:text-2xl text-[#8B2626] font-semibold mt-3 tracking-wider">
            {slide.subtitle}
          </p>
        </div>

        <div className="border-l-4 border-[#B89C62] pl-4 py-1 bg-[#1a1d1a]/60 rounded-r">
          <p className="font-body text-lg text-[#e8e4d9] italic">
            "{slide.content.lead}"
          </p>
        </div>

        {/* Feature Cards */}
        <div className="space-y-3 pt-2">
          {slide.content.points?.map((point, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.25 + index * 0.1 }}
              className="flex items-start gap-3 p-3 rounded bg-[#252b27]/80 border border-[#3D493A] hover:border-[#B89C62] transition-colors"
            >
              <div className="mt-0.5 p-1.5 rounded bg-[#16181A] text-[#D4AF37] border border-[#3D493A]">
                {index === 0 ? <Clock size={16} /> : index === 1 ? <Compass size={16} /> : <ShieldAlert size={16} />}
              </div>
              <div>
                <h4 className="font-heading text-sm text-[#D4AF37] tracking-wider uppercase">
                  {point.title}
                </h4>
                <p className="font-body text-sm text-[#d1cbbe] leading-relaxed">
                  {point.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Right Column: Historical Navigator Artifact */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="md:col-span-5 flex flex-col justify-center"
      >
        {slide.media && (
          <ArchivalImage
            url={slide.media.url}
            caption={slide.media.caption}
            source={slide.media.source}
            badge="HISTORICAL CHRONOLOGY"
          />
        )}

        <div className="mt-4 p-3 border border-dashed border-[#B89C62]/50 bg-[#16181A]/80 rounded text-center">
          <span className="font-typewriter text-xs text-[#8c978e] tracking-widest block uppercase">
            War Department Operational Briefing
          </span>
          <span className="font-heading text-sm text-[#D4AF37] tracking-wide mt-1 block">
            THE INVISIBLE WITNESS // 20-MINUTE DEBRIEF
          </span>
        </div>
      </motion.div>
    </div>
  );
};
