import React from 'react';
import { motion } from 'framer-motion';
import { SlideData } from '../../../types/slide';
import { ShieldCheck, Crosshair, Plane } from 'lucide-react';

interface MediaGridSlideProps {
  slide: SlideData;
}

export const MediaGridSlide: React.FC<MediaGridSlideProps> = ({ slide }) => {
  const cards = slide.content.cards || [];

  return (
    <div className="flex flex-col justify-center h-full my-auto space-y-4 max-w-7xl mx-auto w-full">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 items-stretch">
        {cards.map((card, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 + idx * 0.12 }}
            className="flex flex-col justify-between p-5 lg:p-6 rounded-lg bg-[#202521] border-2 border-[#3D493A] hover:border-[#B89C62] transition-all shadow-xl group"
          >
            <div>
              {/* Header Badge */}
              <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#3D493A]">
                <div className="p-2 rounded bg-[#16181A] text-[#D4AF37] border border-[#3D493A]">
                  {idx === 0 ? <ShieldCheck size={18} /> : idx === 1 ? <Crosshair size={18} /> : <Plane size={18} />}
                </div>
                <span className="font-typewriter text-[10px] text-[#8B2626] tracking-wider uppercase font-bold border border-[#8B2626] px-2 py-0.5 rounded bg-[#8B2626]/10">
                  THEATER 0{idx + 1}
                </span>
              </div>

              {/* Title & Unit */}
              <h3 className="font-heading text-xl lg:text-2xl text-[#D4AF37] group-hover:text-[#F5F5F0] transition-colors uppercase leading-tight">
                {card.title}
              </h3>
              <p className="font-typewriter text-xs sm:text-sm text-[#B89C62] font-semibold mt-1 mb-3">
                {card.unit}
              </p>

              {/* Image Frame: Generous cinematic image instead of tiny 144px strip */}
              {card.imageUrl && (
                <div className="my-3 overflow-hidden rounded border border-[#3D493A] h-48 sm:h-52 md:h-56 lg:h-64 bg-black/60 relative">
                  <img
                    src={card.imageUrl}
                    alt={card.title}
                    referrerPolicy="no-referrer"
                    onError={(event) => {
                      event.currentTarget.src = '/assets/saving-private-ryan-omaha.webp';
                    }}
                    className="w-full h-full object-cover archival-filter group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute bottom-1.5 right-1.5 font-courier text-[10px] bg-black/85 text-[#B89C62] px-1.5 py-0.5 rounded border border-[#3D493A]">
                    ARCHIVE REF
                  </div>
                </div>
              )}

              {/* Description */}
              <p className="font-body text-sm sm:text-base text-[#d1cbbe] leading-relaxed mt-3">
                {card.desc}
              </p>
            </div>

            <div className="mt-5 pt-3 border-t border-[#3D493A]/60 flex items-center justify-between text-xs font-courier text-[#8c978e]">
              <span className="text-[#a39882]">{card.theater}</span>
              <span className="text-[#D4AF37] font-typewriter font-semibold tracking-wider">DOCUMENTED</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
