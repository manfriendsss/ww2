import React, { useState, useEffect, useRef } from 'react';
import { slidesData } from '../../data/slidesData';
import { useSlideSync } from '../../hooks/useSlideSync';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Radio, 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
} from 'lucide-react';

export const PresenterConsole: React.FC = () => {
  const { currentIndex, setCurrentIndex } = useSlideSync(0);
  const totalSlides = slidesData.length;
  const currentSlide = slidesData[currentIndex];
  const nextSlide = currentIndex < totalSlides - 1 ? slidesData[currentIndex + 1] : null;
  const presenterUrl = window.location.href;
  const qrSrc = `https://api.qrserver.com/v1/create-qr-code/?size=132x132&margin=8&data=${encodeURIComponent(presenterUrl)}`;
  const [isIntroComplete, setIsIntroComplete] = useState<boolean>(() => {
    return localStorage.getItem('ww2_intro_complete') === 'true';
  });

  // Stopwatch timer for the speaker
  const [seconds, setSeconds] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(true);

  // Swipe gesture support for mobile
  const touchStartXRef = useRef<number | null>(null);
  const touchStartYRef = useRef<number | null>(null);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning]);

  useEffect(() => {
    const handleStorage = (event: StorageEvent) => {
      if (event.key === 'ww2_intro_complete') {
        setIsIntroComplete(event.newValue === 'true');
      }
    };

    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const formatTime = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const sendNavigationCommand = (action: 'next' | 'prev') => {
    fetch('/api/command', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action }),
    }).catch(() => {
      if (action === 'next' && currentIndex < totalSlides - 1) {
        setCurrentIndex(currentIndex + 1);
      }
      if (action === 'prev' && currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
      }
    });
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      sendNavigationCommand('prev');
    }
  };

  const handleNext = () => {
    if (currentIndex === 0 && !isIntroComplete) return;
    if (currentIndex < totalSlides - 1) {
      sendNavigationCommand('next');
    }
  };

  // Touch gesture listeners for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
    touchStartYRef.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null || touchStartYRef.current === null) return;
    const diffX = e.changedTouches[0].clientX - touchStartXRef.current;
    const diffY = e.changedTouches[0].clientY - touchStartYRef.current;
    touchStartXRef.current = null;
    touchStartYRef.current = null;

    // Detect horizontal swipe if deltaX is larger than vertical movement
    if (Math.abs(diffX) > 60 && Math.abs(diffX) > Math.abs(diffY) * 1.5) {
      if (diffX < 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
  };

  // Keyboard navigation inside presenter window
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, totalSlides]);

  const note = currentSlide.speakerNote;

  return (
    <div className="min-h-screen bg-[#141614] text-[#F5F5F0] flex flex-col font-serif select-none">
      {/* ============================================================== */}
      {/* 1. MOBILE SPEAKER INTERFACE (Visible on mobile screens only)     */}
      {/* Minimalist: Only speaking content & large thumb navigation     */}
      {/* ============================================================== */}
      <div 
        className="flex md:hidden flex-col h-[100dvh] w-full overflow-hidden bg-[#141614]"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Minimal Mobile Header: Current slide info & timing */}
        <header className="shrink-0 bg-[#1b1f1c] border-b-2 border-[#3D493A] px-4 py-2.5 flex items-center justify-between gap-3 shadow-md">
          <div className="flex items-center gap-2 min-w-0">
            <span className="w-2 h-2 rounded-full bg-[#4ade80] animate-pulse shrink-0" title="Connected" />
            <span className="font-typewriter text-xs font-bold text-[#D4AF37] uppercase tracking-wider shrink-0">
              {currentIndex + 1}/{totalSlides}
            </span>
            <span className="font-heading text-sm text-[#F5F5F0] uppercase truncate font-bold">
              {currentSlide.title}
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="font-courier text-xs text-[#B89C62] bg-[#16181A] px-2 py-0.5 rounded border border-[#3D493A]">
              {note.timing}
            </span>
            <span className="font-courier text-xs text-[#8c978e] bg-[#16181A] px-2 py-0.5 rounded border border-[#3D493A]">
              {formatTime(seconds)}
            </span>
          </div>
        </header>

        {/* Mobile Main Body: 100% Focused on Speaking Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-5 flex flex-col">
          <div className="flex-1 rounded-lg bg-[#1c221e] border border-[#3D493A] p-5 shadow-inner overflow-y-auto">
            <p className="font-body text-xl sm:text-2xl text-[#F5F5F0] leading-relaxed whitespace-pre-line selection:bg-[#8B2626]">
              {note.scriptSnippet}
            </p>
          </div>
        </main>

        {/* Mobile Sticky Bottom Controls: Large, Thumb-Friendly Prev / Next Buttons */}
        <footer className="shrink-0 bg-[#1b1f1c] border-t-2 border-[#3D493A] px-4 py-3 pb-6 flex items-center justify-between gap-3 shadow-2xl">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className={`flex-1 py-4 px-4 rounded-lg font-typewriter text-sm font-bold uppercase flex items-center justify-center gap-2 border transition-all active:scale-95 ${
              currentIndex === 0
                ? 'opacity-30 cursor-not-allowed border-[#3D493A] text-[#8c978e]'
                : 'bg-[#202521] hover:bg-[#3D493A] border-[#B89C62]/40 text-[#F5F5F0] shadow-md'
            }`}
          >
            <ChevronLeft size={20} />
            PREV
          </button>

          <button
            onClick={handleNext}
            disabled={currentIndex === totalSlides - 1 || (currentIndex === 0 && !isIntroComplete)}
            className={`flex-1 py-4 px-4 rounded-lg font-typewriter text-sm font-bold uppercase flex items-center justify-center gap-2 border transition-all active:scale-95 shadow-lg ${
              currentIndex === totalSlides - 1 || (currentIndex === 0 && !isIntroComplete)
                ? 'opacity-30 cursor-not-allowed border-[#3D493A] text-[#8c978e]'
                : 'bg-[#8B2626] hover:bg-[#a32d2d] border-[#B89C62] text-[#F5F5F0]'
            }`}
          >
            NEXT
            <ChevronRight size={20} />
          </button>
        </footer>
      </div>

      {/* ============================================================== */}
      {/* 2. DESKTOP PRESENTER CONSOLE (Visible on screens md and wider) */}
      {/* Full comprehensive dashboard with stopwatch, previews & QR     */}
      {/* ============================================================== */}
      <div className="hidden md:flex flex-col min-h-screen w-full">
        {/* Top Bar: Connection & Speaking Stopwatch */}
        <header className="bg-[#1b1f1c] border-b-2 border-[#B89C62] px-6 py-3 flex flex-wrap items-center justify-between gap-4">
          {/* Left: Branding & Sync Indicator */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1 rounded bg-[#202521] border border-[#3D493A]">
              <Radio size={14} className="text-[#4ade80] animate-pulse" />
              <span className="font-typewriter text-xs text-[#4ade80] font-bold tracking-wider uppercase">
                LIVE SYNC // MAIN DISPLAY CONNECTED
              </span>
            </div>
            <span className="font-heading text-lg text-[#D4AF37] uppercase tracking-wide">
              WWII PRESENTER CONSOLE
            </span>
          </div>

          {/* Center: Speaking Stopwatch */}
          <div className="flex items-center gap-3 bg-[#16181A] px-4 py-1.5 rounded border border-[#3D493A]">
            <Clock size={16} className="text-[#B89C62]" />
            <span className="font-typewriter text-xs text-[#8c978e] uppercase mr-1">ELAPSED:</span>
            <span className="font-courier text-xl font-bold text-[#F5F5F0] tracking-widest min-w-[60px]">
              {formatTime(seconds)}
            </span>
            <div className="flex items-center gap-1 ml-2">
              <button
                onClick={() => setIsTimerRunning(!isTimerRunning)}
                className="p-1 rounded hover:bg-[#3D493A] text-[#B89C62] transition-colors"
                title={isTimerRunning ? 'Pause Stopwatch' : 'Resume Stopwatch'}
              >
                {isTimerRunning ? <Pause size={14} /> : <Play size={14} />}
              </button>
              <button
                onClick={() => {
                  setSeconds(0);
                  setIsTimerRunning(false);
                }}
                className="p-1 rounded hover:bg-[#3D493A] text-[#8c978e] hover:text-[#c93b3b] transition-colors"
                title="Reset Stopwatch"
              >
                <RotateCcw size={14} />
              </button>
            </div>
          </div>

          {/* Right: Slide Selector & Counter */}
          <div className="flex items-center gap-3">
            <select
              value={currentIndex}
              onChange={(e) => setCurrentIndex(Number(e.target.value))}
              className="bg-[#202521] border border-[#3D493A] text-[#D4AF37] font-typewriter text-xs px-3 py-1.5 rounded focus:outline-none focus:border-[#B89C62]"
            >
              {slidesData.map((s, idx) => (
                <option key={s.id} value={idx}>
                  {String(idx + 1).padStart(2, '0')}. {s.title}
                </option>
              ))}
            </select>
            <div className="font-typewriter text-sm text-[#B89C62] bg-[#16181A] px-3 py-1 rounded border border-[#3D493A]">
              {currentIndex + 1} / {totalSlides}
            </div>
          </div>
        </header>

        {/* Main Body */}
        <div className="flex-1 grid grid-cols-12 gap-6 p-6 overflow-hidden">
          {/* Left Column: Previews & Controls (col-span-5) */}
          <div className="col-span-5 flex flex-col space-y-4">
            {/* Current Slide Card */}
            <div className="p-4 rounded bg-[#202521] border-2 border-[#8B2626] shadow-xl flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#3D493A]">
                  <span className="font-typewriter text-xs text-[#8B2626] font-bold tracking-widest uppercase">
                    ● CURRENT ON PROJECTOR (SLIDE {currentIndex + 1})
                  </span>
                  <span className="font-courier text-xs text-[#B89C62]">
                    {note.timing}
                  </span>
                </div>
                <h2 className="font-heading text-2xl text-[#D4AF37] uppercase leading-tight mb-2">
                  {currentSlide.title}
                </h2>
                {currentSlide.subtitle && (
                  <p className="font-typewriter text-xs text-[#e57373] mb-3">
                    {currentSlide.subtitle}
                  </p>
                )}
                {currentSlide.content.lead && (
                  <p className="font-body text-sm text-[#d1cbbe] italic bg-[#16181A] p-2.5 rounded border border-[#3D493A]">
                    "{currentSlide.content.lead}"
                  </p>
                )}
              </div>

              {/* Media thumbnail if exists */}
              {currentSlide.media && (
                <div className="my-3 h-28 rounded overflow-hidden border border-[#3D493A] bg-black/60">
                  <img
                    src={currentSlide.media.url}
                    alt="Slide Media"
                    className="w-full h-full object-cover grayscale contrast-110"
                  />
                </div>
              )}

              {/* Slide Navigation Buttons */}
              <div className="pt-3 border-t border-[#3D493A] flex items-center justify-between gap-3 mt-2">
                <button
                  onClick={handlePrev}
                  disabled={currentIndex === 0}
                  className={`flex-1 py-2 px-4 rounded font-typewriter text-xs uppercase flex items-center justify-center gap-1 border transition-colors ${
                    currentIndex === 0
                      ? 'opacity-40 cursor-not-allowed border-[#3D493A] text-[#8c978e]'
                      : 'bg-[#16181A] hover:bg-[#3D493A] border-[#3D493A] text-[#F5F5F0]'
                  }`}
                >
                  <ChevronLeft size={16} />
                  PREV
                </button>

                <button
                  onClick={handleNext}
                  disabled={currentIndex === totalSlides - 1 || (currentIndex === 0 && !isIntroComplete)}
                  className={`flex-1 py-2 px-4 rounded font-typewriter text-xs uppercase flex items-center justify-center gap-1 border transition-colors ${
                    currentIndex === totalSlides - 1 || (currentIndex === 0 && !isIntroComplete)
                      ? 'opacity-40 cursor-not-allowed border-[#3D493A] text-[#8c978e]'
                      : 'bg-[#8B2626] hover:bg-[#a32d2d] border-[#8B2626] text-[#F5F5F0] font-bold shadow-md'
                  }`}
                >
                  NEXT
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>

            {/* Next Slide Preview Card */}
            {nextSlide ? (
              <div className="p-3.5 rounded bg-[#1a1d1a] border border-[#3D493A] opacity-90">
                <div className="flex items-center justify-between text-[11px] font-typewriter text-[#8c978e] mb-1">
                  <span>NEXT SLIDE COMING UP:</span>
                  <span>SLIDE {currentIndex + 2}</span>
                </div>
                <h4 className="font-heading text-base text-[#B89C62] uppercase truncate">
                  {nextSlide.title}
                </h4>
                <p className="font-body text-xs text-[#8c978e] line-clamp-1 mt-0.5">
                  {nextSlide.content.lead || nextSlide.subtitle || 'Ready on deck'}
                </p>
              </div>
            ) : (
              <div className="p-3.5 rounded bg-[#1a1d1a] border border-[#3D493A] text-center font-typewriter text-xs text-[#8c978e]">
                FINAL SLIDE REACHED
              </div>
            )}

            {/* QR Code pairing card */}
            <div className="p-3.5 rounded bg-[#1a1d1a] border border-[#3D493A] flex items-center gap-3">
              <div className="shrink-0 rounded bg-[#F5F5F0] p-1.5">
                <img src={qrSrc} alt="QR code for mobile speaker notes" className="h-24 w-24" />
              </div>
              <div className="min-w-0">
                <div className="font-typewriter text-[11px] text-[#B89C62] uppercase tracking-wider">
                  Phone Notes
                </div>
                <p className="mt-1 font-body text-xs leading-relaxed text-[#d1cbbe]">
                  Scan on the same Wi-Fi, then use Prev/Next on the phone to control the main display.
                </p>
                <p className="mt-1 break-all font-courier text-[10px] text-[#8c978e]">
                  {presenterUrl}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Speaker Script (col-span-7) */}
          <div className="col-span-7 flex flex-col overflow-y-auto pr-1">
            <div className="p-5 rounded bg-[#202521] border-2 border-[#3D493A] shadow-xl flex-1 flex flex-col">
              <span className="font-typewriter text-xs text-[#8B2626] font-bold uppercase tracking-widest block pb-2 mb-3 border-b border-[#3D493A]">
                ENGLISH SPEECH SCRIPT
              </span>
              <div className="flex-1 overflow-y-auto">
                <p className="font-body text-lg sm:text-xl text-[#F5F5F0] leading-relaxed whitespace-pre-line">
                  {note.scriptSnippet}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
