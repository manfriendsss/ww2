import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Film } from 'lucide-react';
import { SlideCinematicVideo } from '../../types/slide';

interface ArchivalVideoOverlayProps {
  isOpen: boolean;
  video?: SlideCinematicVideo;
  onClose: () => void;
}

export const ArchivalVideoOverlay: React.FC<ArchivalVideoOverlayProps> = ({
  isOpen,
  video,
  onClose,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (!isOpen || !video) {
      if (videoRef.current) {
        videoRef.current.pause();
      }
      return;
    }

    const vid = videoRef.current;
    if (!vid) return;

    vid.currentTime = 0;
    vid.muted = true;
    const playPromise = vid.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {});
    }
  }, [isOpen, video]);

  return (
    <AnimatePresence mode="wait">
      {isOpen && video && (
        <motion.div
          key={`archival-video-backdrop-${video.src}`}
          initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
          animate={{ opacity: 1, backdropFilter: 'blur(8px)' }}
          exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8 bg-black/85 backdrop-blur-md"
          onClick={onClose}
        >
          {/* Main Archival Cinema Modal (Styled exactly like classified gallery photograph) */}
          <motion.div
            key={`archival-video-card-${video.src}`}
            initial={{ opacity: 0, scale: 0.94, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-5xl bg-[#181d19] border-2 border-[#3D493A] p-3 sm:p-4 rounded-lg shadow-[0_25px_70px_rgba(0,0,0,0.95)] flex flex-col overflow-hidden"
          >
            {/* Brass Corner Brackets */}
            <div className="absolute -top-1.5 -left-1.5 w-3.5 h-3.5 border-t-2 border-l-2 border-[#B89C62] pointer-events-none" />
            <div className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 border-t-2 border-r-2 border-[#B89C62] pointer-events-none" />
            <div className="absolute -bottom-1.5 -left-1.5 w-3.5 h-3.5 border-b-2 border-l-2 border-[#B89C62] pointer-events-none" />
            <div className="absolute -bottom-1.5 -right-1.5 w-3.5 h-3.5 border-b-2 border-r-2 border-[#B89C62] pointer-events-none" />

            {/* Top Classified Header */}
            <div className="flex items-center justify-between px-1 pb-2 mb-2 border-b border-[#3D493A]/60 text-xs font-courier text-[#8c978e]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#8B2626] animate-pulse" />
                <span className="font-typewriter text-[#D4AF37] font-bold tracking-wider uppercase text-[11px] sm:text-xs">
                  {video.badge || 'DECLASSIFIED MILITARY MOTION ARCHIVE'}
                </span>
              </div>

              <div className="flex items-center gap-2 sm:gap-3">
                <button
                  onClick={onClose}
                  title="Đóng video (ESC)"
                  className="p-1 rounded bg-[#202521] hover:bg-[#8B2626] text-[#e8e4d9] transition-colors border border-[#3D493A]"
                >
                  <X size={15} />
                </button>
              </div>
            </div>

            {/* Video Viewport Frame with Archival Black Border, Vignette & Sepia Layer */}
            <div className="archival-feather-frame relative overflow-hidden bg-black rounded-sm border-2 border-black/80 shadow-[inset_0_0_60px_rgba(0,0,0,0.95)] flex items-center justify-center w-full aspect-video max-h-[64vh] sm:max-h-[68vh]">
              <video
                ref={videoRef}
                src={video.src}
                autoPlay
                muted
                playsInline
                controls={false}
                loop={false}
                className="w-full h-full object-cover scale-[1.14] pointer-events-none archival-feather-mask"
                style={{
                  filter: 'sepia(0.42) contrast(1.18) brightness(0.92) grayscale(0.12)',
                }}
              />

              {/* Atmospheric Vintage Sepia Tint Overlay */}
              <div className="absolute inset-0 pointer-events-none mix-blend-color bg-[#704d26]/15" />

              {/* Vintage Edge Vignette Texture */}
              <div className="absolute inset-0 pointer-events-none vignette-overlay opacity-75" />

              {/* Subtle CRT / Film Scanline Texture */}
              <div
                className="absolute inset-0 pointer-events-none opacity-15"
                style={{
                  backgroundImage: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.45) 50%)',
                  backgroundSize: '100% 4px',
                }}
              />
            </div>

            {/* Footer Information & Controls */}
            <div className="mt-2.5 pt-2 border-t border-[#3D493A]/60 flex items-center justify-between gap-2">
              <div className="flex-1 min-w-[200px]">
                <h4 className="font-heading text-sm sm:text-base text-[#D4AF37] uppercase tracking-wide flex items-center gap-1.5">
                  <Film size={15} className="text-[#8B2626] shrink-0" />
                  {video.title}
                </h4>
                {video.caption && (
                  <p className="font-courier text-[11px] sm:text-xs text-[#d1cbbe] italic mt-0.5 line-clamp-1">
                    "{video.caption}"
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
