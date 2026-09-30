import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2, X } from 'lucide-react';

interface ArchivalImageProps {
  url: string;
  caption?: string;
  source?: string;
  className?: string;
  alt?: string;
  badge?: string;
}

export const ArchivalImage: React.FC<ArchivalImageProps> = ({
  url,
  caption,
  source,
  className = '',
  alt = 'Historical WWII Document',
  badge,
}) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [imgSrc, setImgSrc] = useState<string>(url);
  const [hasError, setHasError] = useState<boolean>(false);

  React.useEffect(() => {
    setImgSrc(url);
    setHasError(false);
  }, [url]);

  return (
    <>
      <div className={`relative group border-2 border-[#3D493A] bg-[#1a1d1a] p-2 rounded shadow-2xl ${className}`}>
        {/* Brass corner brackets */}
        <div className="absolute -top-1.5 -left-1.5 w-3 h-3 border-t-2 border-l-2 border-[#B89C62] pointer-events-none" />
        <div className="absolute -top-1.5 -right-1.5 w-3 h-3 border-t-2 border-r-2 border-[#B89C62] pointer-events-none" />
        <div className="absolute -bottom-1.5 -left-1.5 w-3 h-3 border-b-2 border-l-2 border-[#B89C62] pointer-events-none" />
        <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 border-b-2 border-r-2 border-[#B89C62] pointer-events-none" />

        {/* Top bar controls */}
        <div className="flex items-center justify-between px-1 pb-1 mb-1 border-b border-[#3D493A]/60 text-[11px] font-courier text-[#8c978e]">
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#8B2626] animate-pulse" />
            {badge || 'ARCHIVE PHOTO RECORD'}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsModalOpen(true)}
              title="Expand Archival Photograph"
              className="p-1 rounded bg-[#252b27] hover:bg-[#3D493A] text-[#e8e4d9] transition-colors border border-[#3D493A]"
            >
              <Maximize2 size={11} />
            </button>
          </div>
        </div>

        {/* Image Frame */}
        <div 
          className="archival-feather-frame relative overflow-hidden bg-black/60 rounded-sm cursor-pointer h-[260px] sm:h-[320px] md:h-[380px] lg:h-[420px] xl:h-[460px] w-full flex items-center justify-center"
          onClick={() => setIsModalOpen(true)}
        >
          <img
            src={imgSrc}
            alt={alt}
            referrerPolicy="no-referrer"
            onError={() => {
              if (!hasError) {
                setHasError(true);
                setImgSrc('/assets/saving-private-ryan-omaha.webp');
              }
            }}
            className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105 archival-filter archival-feather-mask"
            loading="lazy"
          />

          {/* Vignette texture overlay */}
          <div className="absolute inset-0 pointer-events-none bg-[#1a1d1a]/10 mix-blend-multiply" />
          
        </div>

        {/* Caption & Source Footer */}
        {caption && (
          <div className="mt-2 pt-1 border-t border-[#3D493A]/50">
            <p className="font-courier text-xs text-[#d1cbbe] leading-tight italic">
              "{caption}"
            </p>
            {source && (
              <p className="font-typewriter text-[10px] text-[#B89C62] mt-0.5 tracking-wider uppercase">
                Source: {source}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Fullscreen Examination Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-6 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative max-w-5xl max-h-[90vh] bg-[#1a1d1a] border-2 border-[#B89C62] p-4 rounded shadow-2xl overflow-hidden flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center pb-2 mb-2 border-b border-[#3D493A]">
                <span className="font-typewriter text-sm text-[#D4AF37] tracking-widest uppercase">
                  MILITARY DECLASSIFIED PHOTOGRAPHIC ARCHIVE
                </span>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-1 rounded text-[#e8e4d9] hover:bg-[#8B2626] transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="relative flex-1 overflow-auto flex items-center justify-center bg-black/80 p-2 rounded-sm">
                <img
                  src={imgSrc}
                  alt={alt}
                  referrerPolicy="no-referrer"
                  className="max-w-full max-h-[72vh] object-contain rounded-sm archival-filter"
                />
              </div>

              {caption && (
                <div className="mt-3 text-center">
                  <p className="font-courier text-sm text-[#e8e4d9]">{caption}</p>
                  {source && (
                    <p className="font-typewriter text-xs text-[#B89C62] mt-1 uppercase">
                      Archive Reference: {source}
                    </p>
                  )}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
