import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { SlideData } from '../../../types/slide';
import { ArchivalImage } from '../../common/ArchivalImage';
import { Quote as QuoteIcon } from 'lucide-react';

interface MemorialQuoteSlideProps {
  slide: SlideData;
}

const memorialGalleryStateByGroup: Record<string, number> = {};

export const MemorialQuoteSlide: React.FC<MemorialQuoteSlideProps> = ({ slide }) => {
  const gallery = slide.media?.gallery;
  const galleryGroup = slide.media?.galleryGroup || `memorial-${slide.id}`;
  const [galleryIndex, setGalleryIndex] = useState<number>(() => memorialGalleryStateByGroup[galleryGroup] || 0);
  const safeGalleryIndex = gallery && gallery.length > 0 ? galleryIndex % gallery.length : 0;
  const activeMedia = gallery?.[safeGalleryIndex] || slide.media;

  useEffect(() => {
    if (!gallery || gallery.length === 0) return;
    memorialGalleryStateByGroup[galleryGroup] = safeGalleryIndex;
  }, [gallery, galleryGroup, safeGalleryIndex]);

  useEffect(() => {
    const rememberedIndex = memorialGalleryStateByGroup[galleryGroup] || 0;
    setGalleryIndex(gallery && gallery.length > 0 ? rememberedIndex % gallery.length : 0);
  }, [galleryGroup, gallery]);

  useEffect(() => {
    if (!gallery || gallery.length <= 1) return;

    const interval = window.setInterval(() => {
      setGalleryIndex((index) => {
        const nextIndex = (index + 1) % gallery.length;
        memorialGalleryStateByGroup[galleryGroup] = nextIndex;
        return nextIndex;
      });
    }, 4000);

    return () => window.clearInterval(interval);
  }, [gallery, galleryGroup]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center h-full my-auto">
      {/* Left: Quote & Philosophical Lessons */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.55 }}
        className="lg:col-span-7 flex flex-col justify-center space-y-4 my-auto"
      >
        {/* Solemn Quote Block */}
        {slide.content.quote && (
          <div className="p-6 sm:p-7 rounded-xl bg-[#25201c] border-2 border-[#B89C62] shadow-2xl relative overflow-hidden">
            <QuoteIcon size={36} className="text-[#B89C62]/30 absolute top-4 right-4 pointer-events-none" />
            <p className="font-body text-xl sm:text-2xl text-[#f5f5f0] italic leading-relaxed font-light">
              "{slide.content.quote.text}"
            </p>
            <div className="mt-4 pt-3 border-t border-[#B89C62]/40 flex flex-wrap items-center justify-between gap-2">
              <div>
                <span className="font-heading text-lg sm:text-xl text-[#D4AF37] block font-semibold">
                  — {slide.content.quote.author}
                </span>
                {slide.content.quote.role && (
                  <span className="font-typewriter text-xs sm:text-sm text-[#a39882]">
                    {slide.content.quote.role}
                  </span>
                )}
              </div>
              {slide.content.quote.source && (
                <span className="font-courier text-xs sm:text-sm text-[#8c978e] italic">
                  {slide.content.quote.source}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Lead statement */}
        {slide.content.lead && (
          <div className="border-l-3 border-[#8B2626] pl-3.5 py-1.5 bg-[#1a1d1a]/60 rounded-r">
            <h4 className="font-heading text-base sm:text-lg text-[#D4AF37] uppercase tracking-wide">
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
              className="p-4 rounded-lg bg-[#1e231f] border border-[#3D493A] hover:border-[#B89C62] transition-colors"
            >
              <h5 className="font-heading text-sm sm:text-base text-[#D4AF37] uppercase flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#B89C62]" />
                {pt.title}
              </h5>
              <p className="font-body text-sm sm:text-base text-[#d1cbbe] leading-relaxed mt-1">
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
        className="lg:col-span-5 flex flex-col justify-center my-auto"
      >
        {slide.media && gallery && gallery.length > 1 && activeMedia ? (
          <div className="relative border-2 border-[#3D493A] bg-[#1a1d1a] p-2.5 rounded-lg shadow-2xl overflow-hidden">
            {/* Brass Corner Accents */}
            <div className="absolute -top-1.5 -left-1.5 w-3 h-3 border-t-2 border-l-2 border-[#B89C62] pointer-events-none" />
            <div className="absolute -top-1.5 -right-1.5 w-3 h-3 border-t-2 border-r-2 border-[#B89C62] pointer-events-none" />
            <div className="absolute -bottom-1.5 -left-1.5 w-3 h-3 border-b-2 border-l-2 border-[#B89C62] pointer-events-none" />
            <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 border-b-2 border-r-2 border-[#B89C62] pointer-events-none" />

            <div className="flex items-center justify-between px-1 pb-1 mb-1 border-b border-[#3D493A]/60 text-[11px] font-courier text-[#8c978e]">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8B2626] animate-pulse" />
                VETERAN & PACIFIC ARCHIVE
              </span>
              <span className="font-typewriter text-[#B89C62] font-semibold">
                {String(safeGalleryIndex + 1).padStart(2, '0')} / {String(gallery.length).padStart(2, '0')}
              </span>
            </div>

            <div className="archival-feather-frame relative overflow-hidden bg-black/60 rounded-sm h-[320px] sm:h-[380px] md:h-[420px] lg:h-[460px] xl:h-[480px]">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeMedia.url}
                  src={activeMedia.url}
                  alt={activeMedia.caption || slide.title}
                  referrerPolicy="no-referrer"
                  onError={(event) => {
                    event.currentTarget.src = slide.media?.url || '/assets/history/slide5-peleliu-marines.webp';
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

            <div className="mt-2 pt-1.5 border-t border-[#3D493A]/50 min-h-[4rem]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeMedia.caption}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.45, ease: 'easeInOut' }}
                >
                  <p className="font-courier text-xs sm:text-sm text-[#d1cbbe] leading-tight italic">
                    "{activeMedia.caption}"
                  </p>
                  {activeMedia.source && (
                    <p className="font-typewriter text-[10px] sm:text-[11px] text-[#B89C62] mt-0.5 tracking-wider uppercase">
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
            badge="MEMORIAL ARCHIVE"
          />
        )}
      </motion.div>
    </div>
  );
};
