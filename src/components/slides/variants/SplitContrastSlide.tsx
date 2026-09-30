import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { SlideData } from '../../../types/slide';
import { ArrowRight, CheckCircle2, AlertOctagon } from 'lucide-react';

interface SplitContrastSlideProps {
  slide: SlideData;
  progressiveStep?: number;
}

export const SplitContrastSlide: React.FC<SplitContrastSlideProps> = ({ slide, progressiveStep }) => {
  const { leftCol, rightCol } = slide.content;

  if (slide.id === 2 && leftCol && rightCol) {
    const step = progressiveStep ?? 0;
    const visibleItems = leftCol.items.slice(0, Math.min(step, 3));
    const imageStages = [
      {
        url: '/assets/history/slide2-pyramids.webp',
        caption: 'Ancient Egypt: The Great Pyramids of Giza',
      },
      {
        url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Florence%20Cathedral%20%28Duomo%29.jpg',
        caption: 'Renaissance Florence: art, science, and human imagination',
      },
      {
        url: '/assets/history/slide2-paris-1924.webp',
        caption: 'Paris in the Roaring Twenties: cafés, writers, and jazz-age dreams',
      },
    ];
    const currentImage = step > 0 && step < 4 ? imageStages[Math.min(step - 1, imageStages.length - 1)] : undefined;

    return (
      <div className="flex h-full overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full w-full min-h-0 items-stretch">
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55 }}
            className="flex flex-col justify-between p-6 lg:p-7 rounded bg-[#212622]/90 border-2 border-[#4a544b] shadow-xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#B89C62]/5 rounded-bl-full pointer-events-none" />

            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-[#B89C62]" />
                <span className="font-courier text-xs text-[#B89C62] tracking-widest uppercase">
                  PERSPECTIVE A
                </span>
              </div>
              <h3 className="font-heading text-3xl lg:text-4xl text-[#d4af37] uppercase tracking-wide">
                {leftCol.header}
              </h3>
              {leftCol.subtitle && (
                <p className="font-typewriter text-sm text-[#a39882] mb-6">
                  {leftCol.subtitle}
                </p>
              )}

              <ul className="space-y-5 mt-6">
                <AnimatePresence>
                  {visibleItems.map((item, idx) => (
                    <motion.li
                      key={item}
                      initial={{ opacity: 0, y: 14, filter: 'blur(8px)' }}
                      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                      exit={{ opacity: 0, y: -10, filter: 'blur(8px)' }}
                      transition={{ duration: 0.45, ease: 'easeOut' }}
                      className="flex items-start gap-3 font-body text-xl lg:text-[22px] text-[#d1cbbe] leading-snug"
                    >
                      <span className="text-[#B89C62] mt-0.5 shrink-0 font-typewriter text-lg">
                        0{idx + 1}.
                      </span>
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </AnimatePresence>
              </ul>
            </div>

            <div className="mt-5 pt-4 border-t border-[#3D493A]/60 flex items-center justify-between text-sm font-courier text-[#8c978e]">
              <span>ROMANTIC / THEORETICAL</span>
              <ArrowRight size={14} className="text-[#B89C62]" />
            </div>
          </motion.div>

          <div className="min-h-full rounded border-2 border-[#3D493A]/45 bg-[#16181A]/30 relative overflow-hidden">
            <AnimatePresence mode="wait">
              {step > 0 && step < 4 && currentImage && (
                <motion.div
                  key={currentImage.url}
                  initial={{ opacity: 0, x: 25, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, x: -12, filter: 'blur(10px)' }}
                  transition={{ duration: 0.62, ease: 'easeInOut' }}
                  className="absolute inset-0"
                >
                  <img
                    src={currentImage.url}
                    alt={currentImage.caption}
                    referrerPolicy="no-referrer"
                    className="absolute inset-0 w-full h-full object-cover archival-filter"
                  />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_42%,rgba(0,0,0,0.76)_100%)]" />
                  <div className="absolute bottom-0 left-0 right-0 bg-black/72 p-4">
                    <span className="font-typewriter text-xs text-[#B89C62] uppercase tracking-widest">
                      Historical Context Dispatch
                    </span>
                    <p className="font-body text-2xl text-[#f0eee9] italic mt-1">
                      {currentImage.caption}
                    </p>
                  </div>
                </motion.div>
              )}

              {step >= 4 && (
                <motion.div
                  key="destination-card"
                  initial={{ opacity: 0, x: 25, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, filter: 'blur(10px)' }}
                  transition={{ duration: 0.65, ease: 'easeOut' }}
                  className={`h-full flex flex-col justify-between p-6 lg:p-7 rounded bg-[#261f20]/90 border-2 border-[#8B2626] shadow-2xl relative overflow-hidden ${
                    rightCol.highlight ? 'ring-1 ring-[#8B2626]/50' : ''
                  }`}
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-[#8B2626]/10 rounded-bl-full pointer-events-none" />
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="w-2 h-2 rounded-full bg-[#8B2626] animate-ping" />
                      <span className="font-typewriter text-xs text-[#e57373] tracking-widest uppercase font-bold">
                        PERSPECTIVE B // THE CHOSEN REALITY
                      </span>
                    </div>
                    <h3 className="font-heading text-3xl lg:text-4xl text-[#f5f5f0] uppercase tracking-wide">
                      {rightCol.header}
                    </h3>
                    {rightCol.subtitle && (
                      <p className="font-typewriter text-xs text-[#c99595] mb-4">
                        {rightCol.subtitle}
                      </p>
                    )}
                    <ul className="space-y-5 mt-6">
                      {rightCol.items.map((item, idx) => (
                        <motion.li
                          key={item}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.08 }}
                          className="flex items-start gap-3 font-body text-xl lg:text-[22px] text-[#f0eee9] leading-snug"
                        >
                          <CheckCircle2 size={20} className="text-[#8B2626] mt-1 shrink-0" />
                          <span className="font-medium">{item}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-4 pt-3 border-t border-[#8B2626]/40 flex items-center justify-between text-xs font-typewriter text-[#e57373]">
                    <span className="flex items-center gap-1">
                      <AlertOctagon size={13} />
                      THE DEFINING CRUCIBLE
                    </span>
                    <span className="font-courier text-[#B89C62]">TARGET: 1939-1945</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: step > 0 && step < 4 ? 1 : 0, y: step > 0 && step < 4 ? 0 : 12 }}
          transition={{ duration: 0.45 }}
          className="hidden"
        >
          <div className="grid grid-cols-1 md:grid-cols-12 items-center bg-[#1a1d1a] p-3 gap-4 h-full">
            <div className="md:col-span-4 h-full min-h-[6.2rem] overflow-hidden rounded bg-black/60 relative">
              <AnimatePresence mode="wait">
                {currentImage && (
                  <motion.img
                    key={currentImage.url}
                    src={currentImage.url}
                    alt={currentImage.caption}
                    referrerPolicy="no-referrer"
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.55, ease: 'easeInOut' }}
                    className="absolute inset-0 w-full h-full object-cover archival-filter"
                  />
                )}
              </AnimatePresence>
            </div>
            <div className="md:col-span-8">
              <span className="font-typewriter text-xs text-[#B89C62] uppercase block">
                Historical Context Dispatch
              </span>
              <AnimatePresence mode="wait">
                {currentImage && (
                  <motion.p
                    key={currentImage.caption}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.45 }}
                    className="font-body text-sm text-[#d1cbbe] italic mt-1"
                  >
                    {currentImage.caption}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full justify-between space-y-6">
      {/* 2-Column Split Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1 items-stretch">
        {/* Left Column: Golden / Simulation */}
        {leftCol && (
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col justify-between p-6 rounded bg-[#212622]/90 border-2 border-[#4a544b] shadow-xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#B89C62]/5 rounded-bl-full pointer-events-none" />
            
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-[#B89C62]" />
                <span className="font-courier text-xs text-[#B89C62] tracking-widest uppercase">
                  PERSPECTIVE A
                </span>
              </div>
              <h3 className="font-heading text-2xl text-[#d4af37] uppercase tracking-wide">
                {leftCol.header}
              </h3>
              {leftCol.subtitle && (
                <p className="font-typewriter text-xs text-[#a39882] mb-4">
                  {leftCol.subtitle}
                </p>
              )}

              <ul className="space-y-3 mt-4">
                {leftCol.items.map((item, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + idx * 0.08 }}
                    className="flex items-start gap-2.5 font-body text-base text-[#d1cbbe] leading-relaxed"
                  >
                    <span className="text-[#B89C62] mt-1 shrink-0 font-typewriter">
                      0{idx + 1}.
                    </span>
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            <div className="mt-4 pt-3 border-t border-[#3D493A]/60 flex items-center justify-between text-xs font-courier text-[#8c978e]">
              <span>ROMANTIC / THEORETICAL</span>
              <ArrowRight size={14} className="text-[#B89C62]" />
            </div>
          </motion.div>
        )}

        {/* Right Column: Historical Crucible */}
        {rightCol && (
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={`flex flex-col justify-between p-6 rounded bg-[#261f20]/90 border-2 border-[#8B2626] shadow-2xl relative overflow-hidden ${
              rightCol.highlight ? 'ring-1 ring-[#8B2626]/50' : ''
            }`}
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#8B2626]/10 rounded-bl-full pointer-events-none" />
            
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-[#8B2626] animate-ping" />
                <span className="font-typewriter text-xs text-[#e57373] tracking-widest uppercase font-bold">
                  PERSPECTIVE B // THE CHOSEN REALITY
                </span>
              </div>
              <h3 className="font-heading text-2xl text-[#f5f5f0] uppercase tracking-wide">
                {rightCol.header}
              </h3>
              {rightCol.subtitle && (
                <p className="font-typewriter text-xs text-[#c99595] mb-4">
                  {rightCol.subtitle}
                </p>
              )}

              <ul className="space-y-3 mt-4">
                {rightCol.items.map((item, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + idx * 0.08 }}
                    className="flex items-start gap-2.5 font-body text-base text-[#f0eee9] leading-relaxed"
                  >
                    <CheckCircle2 size={16} className="text-[#8B2626] mt-1 shrink-0" />
                    <span className="font-medium">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            <div className="mt-4 pt-3 border-t border-[#8B2626]/40 flex items-center justify-between text-xs font-typewriter text-[#e57373]">
              <span className="flex items-center gap-1">
                <AlertOctagon size={13} />
                THE DEFINING CRUCIBLE
              </span>
              <span className="font-courier text-[#B89C62]">TARGET: 1939-1945</span>
            </div>
          </motion.div>
        )}
      </div>

      {/* Optional Archival Image Banner */}
      {slide.media && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="max-h-48 overflow-hidden rounded border border-[#3D493A]"
        >
          <div className="grid grid-cols-1 md:grid-cols-12 items-center bg-[#1a1d1a] p-3 gap-4">
            <div
              className={`archival-feather-frame md:col-span-4 h-28 overflow-hidden bg-black/60 relative ${
                slide.id === 17
                  ? 'rounded-sm border border-[#B89C62]/45'
                  : 'rounded-sm'
              }`}
            >
              <img
                src={slide.media.url}
                alt="Contrast Evidence"
                referrerPolicy="no-referrer"
                className={`w-full h-full object-cover archival-filter archival-feather-mask ${
                  slide.id === 17 ? 'sepia contrast-125 brightness-75 saturate-[0.55]' : ''
                }`}
              />
              {slide.id === 17 && (
                <>
                  <div className="absolute inset-0 bg-[#6f5324]/20 mix-blend-color pointer-events-none" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_34%,rgba(0,0,0,0.78)_100%)] pointer-events-none" />
                </>
              )}
            </div>
            <div className="md:col-span-8">
              <span className="font-typewriter text-xs text-[#B89C62] uppercase block">
                Historical Context Dispatch
              </span>
              <p className="font-body text-sm text-[#d1cbbe] italic mt-1">
                {slide.media.caption}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};
