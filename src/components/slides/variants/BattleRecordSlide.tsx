import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { SlideData } from '../../../types/slide';
import { ArchivalImage } from '../../common/ArchivalImage';
import { Target, Calendar } from 'lucide-react';

interface BattleRecordSlideProps {
  slide: SlideData;
}

const galleryStateByGroup: Record<string, number> = {};

export const BattleRecordSlide: React.FC<BattleRecordSlideProps> = ({ slide }) => {
  const gallery = slide.media?.gallery;
  const galleryGroup = slide.media?.galleryGroup || `slide-${slide.id}`;
  const [galleryIndex, setGalleryIndex] = useState<number>(() => galleryStateByGroup[galleryGroup] || 0);
  const safeGalleryIndex = gallery && gallery.length > 0 ? galleryIndex % gallery.length : 0;
  const activeMedia = gallery?.[safeGalleryIndex] || slide.media;

  useEffect(() => {
    if (!gallery || gallery.length === 0) return;
    galleryStateByGroup[galleryGroup] = safeGalleryIndex;
  }, [gallery, galleryGroup, safeGalleryIndex]);

  useEffect(() => {
    const rememberedIndex = galleryStateByGroup[galleryGroup] || 0;
    setGalleryIndex(gallery && gallery.length > 0 ? rememberedIndex % gallery.length : 0);
  }, [galleryGroup, gallery]);

  useEffect(() => {
    if (!gallery || gallery.length <= 1) return;

    const interval = window.setInterval(() => {
      setGalleryIndex((index) => {
        const nextIndex = (index + 1) % gallery.length;
        galleryStateByGroup[galleryGroup] = nextIndex;
        return nextIndex;
      });
    }, 4000);

    return () => window.clearInterval(interval);
  }, [gallery, galleryGroup]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch h-full">
      {/* Left: Combat Record & Analysis */}
      <motion.div
        key={`battle-copy-${slide.id}`}
        initial={{ opacity: 0, x: -25 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="md:col-span-7 flex flex-col justify-between space-y-3"
      >
        <div>
          {/* Header Metadata */}
          <div className="flex flex-wrap items-center gap-3 mb-3">
            {slide.theater && (
              <span className="font-typewriter text-xs text-[#8B2626] font-bold tracking-wider uppercase border border-[#8B2626] px-2 py-0.5 rounded bg-[#8B2626]/10">
                {slide.theater}
              </span>
            )}
            {slide.date && (
              <span className="font-courier text-xs text-[#B89C62] flex items-center gap-1">
                <Calendar size={12} />
                {slide.date}
              </span>
            )}
          </div>

          {/* Lead Headline */}
          {slide.content.lead && (
            <div className="border-l-3 border-[#B89C62] pl-3 py-1 mb-2 bg-[#1c221e]/70 rounded-r">
              <h3 className="font-heading text-lg sm:text-xl text-[#F5F5F0] tracking-wide">
                {slide.content.lead}
              </h3>
            </div>
          )}

          {/* Key Points */}
          <div className="space-y-2 sm:space-y-2.5">
            {slide.content.points?.map((pt, idx) => {
              const borderAccent =
                pt.accent === 'red'
                  ? 'border-l-4 border-l-[#8B2626]'
                  : pt.accent === 'brass'
                  ? 'border-l-4 border-l-[#B89C62]'
                  : 'border-l-4 border-l-[#3D493A]';

              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + idx * 0.08 }}
                  className={`p-2.5 sm:p-3 rounded bg-[#1f2420]/90 border border-[#3D493A] ${borderAccent} hover:border-[#B89C62] transition-colors`}
                >
                  <h4 className="font-heading text-xs sm:text-sm text-[#D4AF37] tracking-wider uppercase flex items-center gap-2">
                    <Target size={13} className="text-[#8B2626]" />
                    {pt.title}
                  </h4>
                  <p className="font-body text-xs sm:text-sm text-[#d1cbbe] leading-relaxed mt-0.5">
                    {pt.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Statistical Telemetry Bar */}
        {slide.content.stats && slide.content.stats.length > 0 && (
          <div className="grid grid-cols-2 gap-3 pt-2">
            {slide.content.stats.map((st, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.35 + idx * 0.1 }}
                className="p-3 rounded bg-[#16181A] border border-[#3D493A] flex flex-col justify-between"
              >
                <span className="font-typewriter text-[11px] text-[#8c978e] uppercase">
                  {st.label}
                </span>
                <span className="font-heading text-2xl text-[#D4AF37] my-0.5 font-bold">
                  {st.value}
                </span>
                {st.detail && (
                  <span className="font-courier text-[10px] text-[#B89C62] truncate">
                    {st.detail}
                  </span>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>

      {/* Right: Archival Imagery & Declassified Evidence */}
      <motion.div
        initial={{ opacity: 0, x: 25 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="md:col-span-5 flex flex-col justify-center space-y-4"
      >
        {slide.media && gallery && gallery.length > 1 && activeMedia ? (
          <div className="relative border-2 border-[#3D493A] bg-[#1a1d1a] p-2 rounded shadow-2xl overflow-hidden">
            <div className="absolute -top-1.5 -left-1.5 w-3 h-3 border-t-2 border-l-2 border-[#B89C62] pointer-events-none" />
            <div className="absolute -top-1.5 -right-1.5 w-3 h-3 border-t-2 border-r-2 border-[#B89C62] pointer-events-none" />
            <div className="absolute -bottom-1.5 -left-1.5 w-3 h-3 border-b-2 border-l-2 border-[#B89C62] pointer-events-none" />
            <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 border-b-2 border-r-2 border-[#B89C62] pointer-events-none" />

            <div className="flex items-center justify-between px-1 pb-1 mb-1 border-b border-[#3D493A]/60 text-[11px] font-courier text-[#8c978e]">
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8B2626] animate-pulse" />
                CLASSIFIED BATTLE LOG
              </span>
              <span className="font-typewriter text-[#B89C62]">
                {String(safeGalleryIndex + 1).padStart(2, '0')} / {String(gallery.length).padStart(2, '0')}
              </span>
            </div>

            <div className="archival-feather-frame relative overflow-hidden bg-black/60 rounded-sm h-[300px] sm:h-[340px] lg:h-[380px]">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeMedia.url}
                  src={activeMedia.url}
                  alt={activeMedia.caption || slide.title}
                  referrerPolicy="no-referrer"
                  onError={(event) => {
                    event.currentTarget.src = slide.media?.url || '/assets/history/slide8-battleship-row-start.webp';
                  }}
                  initial={{ opacity: 0, scale: 1.035, filter: 'blur(8px)' }}
                  animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, scale: 0.985, filter: 'blur(8px)' }}
                  transition={{ duration: 0.75, ease: 'easeInOut' }}
                  className="absolute inset-0 w-full h-full object-cover archival-filter archival-feather-mask"
                />
              </AnimatePresence>
              <div className="absolute inset-0 pointer-events-none bg-[#1a1d1a]/10 mix-blend-multiply" />
            </div>

            <div className="mt-2 pt-1 border-t border-[#3D493A]/50 min-h-[4rem]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeMedia.caption}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.45, ease: 'easeInOut' }}
                >
                  <p className="font-courier text-xs text-[#d1cbbe] leading-tight italic">
                    "{activeMedia.caption}"
                  </p>
                  {activeMedia.source && (
                    <p className="font-typewriter text-[10px] text-[#B89C62] mt-0.5 tracking-wider uppercase">
                      Source: {activeMedia.source}
                    </p>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        ) : slide.media && (
          <ArchivalImage
            url={slide.media.url}
            caption={slide.media.caption}
            source={slide.media.source}
            badge="CLASSIFIED BATTLE LOG"
          />
        )}
      </motion.div>
    </div>
  );
};
