import { SlideData } from '../../types/slide';
import { LayoutGrid, BookOpen, Maximize2, Minimize2, ExternalLink, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

interface HeaderBarProps {
  currentSlide: SlideData;
  totalSlides: number;
  currentIndex: number;
  showNotes: boolean;
  onToggleNotes: () => void;
  onOpenOverview: () => void;
  presenterUrl: string;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
}

export const HeaderBar: React.FC<HeaderBarProps> = ({
  currentSlide,
  totalSlides,
  currentIndex,
  showNotes,
  onToggleNotes,
  onOpenOverview,
  presenterUrl,
  isFullscreen,
  onToggleFullscreen,
}) => {
  const [showQr, setShowQr] = useState<boolean>(false);
  const qrSrc = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&margin=12&data=${encodeURIComponent(presenterUrl)}`;

  return (
    <header className="relative pb-4 mb-4 flex flex-wrap items-center justify-between gap-4">
      {/* Left: Tag & Title */}
      <div className="flex-1 min-w-[280px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide.id}
            initial={{ opacity: 0, y: 10, filter: 'blur(7px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -8, filter: 'blur(7px)' }}
            transition={{ duration: 0.42, ease: 'easeInOut' }}
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="font-typewriter text-xs text-[#8B2626] font-bold tracking-widest uppercase">
                {currentSlide.tag}
              </span>
              <span className="text-[#3D493A] font-courier text-xs">•</span>
              <span className="font-courier text-xs text-[#B89C62] tracking-wider uppercase hidden sm:inline">
                ARCHIVE CLASSIFICATION LEVEL 4
              </span>
            </div>
            <h2 className="font-heading text-xl sm:text-2xl lg:text-3xl text-[#D4AF37] uppercase tracking-wide leading-tight">
              {currentSlide.title}
            </h2>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Right: Slide Index & Utility Controls (NO countdown timer as requested) */}
      <div className="flex items-center gap-3">
        {/* Slide Counter Badge */}
        <div className="px-3 py-1.5 rounded bg-[#16181A] border border-[#3D493A] font-typewriter text-xs sm:text-sm text-[#B89C62] tracking-widest">
          SLIDE {String(currentIndex + 1).padStart(2, '0')} / {String(totalSlides).padStart(2, '0')}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-1.5 bg-[#16181A] p-1 rounded border border-[#3D493A]">
          <button
            onClick={onOpenOverview}
            title="Slide Overview Grid [G]"
            className="p-1.5 rounded hover:bg-[#3D493A] text-[#d1cbbe] hover:text-[#D4AF37] transition-colors"
          >
            <LayoutGrid size={16} />
          </button>

          <button
            onClick={onToggleNotes}
            title="Toggle Speaker Notes Panel [N]"
            className={`p-1.5 rounded transition-colors ${
              showNotes 
                ? 'bg-[#8B2626] text-[#F5F5F0]' 
                : 'hover:bg-[#3D493A] text-[#d1cbbe] hover:text-[#D4AF37]'
            }`}
          >
            <BookOpen size={16} />
          </button>

          <a
            href={presenterUrl}
            target="_blank"
            rel="noopener noreferrer"
            title="Open Speaker Notes in Separate Window / Tab [P]"
            onClick={() => setShowQr(true)}
            className="p-1.5 rounded hover:bg-[#3D493A] text-[#d1cbbe] hover:text-[#D4AF37] transition-colors"
          >
            <ExternalLink size={16} />
          </a>

          <button
            onClick={onToggleFullscreen}
            title="Toggle Fullscreen [F]"
            className="p-1.5 rounded hover:bg-[#3D493A] text-[#d1cbbe] hover:text-[#D4AF37] transition-colors"
          >
            {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
          </button>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-[#3D493A]" />
      <motion.div
        key={`red-rule-${currentSlide.id}`}
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        className="absolute bottom-0 left-0 right-0 h-[3px] origin-left bg-[#8B2626] shadow-[0_0_18px_rgba(139,38,38,0.75)]"
      />

      <AnimatePresence>
        {showQr && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-5 backdrop-blur-sm"
            onClick={() => setShowQr(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 16 }}
              className="w-full max-w-sm rounded border-2 border-[#8B2626] bg-[#202521] p-5 shadow-2xl"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-[#3D493A] pb-3">
                <span className="font-typewriter text-xs text-[#e57373] uppercase tracking-widest">
                  Mobile Speaker Notes
                </span>
                <button
                  onClick={() => setShowQr(false)}
                  className="rounded p-1 text-[#d1cbbe] hover:bg-[#3D493A]"
                  title="Close QR"
                >
                  <X size={18} />
                </button>
              </div>
              <div className="mt-4 grid place-items-center rounded bg-[#F5F5F0] p-3">
                <img src={qrSrc} alt="QR code for speaker notes" className="h-[220px] w-[220px]" />
              </div>
              <p className="mt-3 break-all font-courier text-[11px] leading-relaxed text-[#B89C62]">
                {presenterUrl}
              </p>
              <p className="mt-2 font-body text-xs leading-relaxed text-[#d1cbbe]">
                Open this on a phone connected to the same Wi-Fi. Use the phone console's Prev/Next controls to drive the main slide.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
