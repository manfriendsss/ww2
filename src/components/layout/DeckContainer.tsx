import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { slidesData } from '../../data/slidesData';
import { useSlideSync } from '../../hooks/useSlideSync';
import { toggleFullscreen as execToggleFullscreen, isFullscreenActive, isFullscreenSupported } from '../../utils/fullscreen';
import { HeaderBar } from './HeaderBar';
import { FooterBar } from './FooterBar';
import { SlideRenderer } from '../slides/SlideRenderer';
import { SpeakerNotesModal } from './SpeakerNotesModal';
import { SlideOverviewModal } from './SlideOverviewModal';
import { WarVideoBackdrop } from '../common/WarVideoBackdrop';

export const DeckContainer: React.FC = () => {
  const deckRef = useRef<HTMLDivElement | null>(null);
  const [direction, setDirection] = useState<number>(0);
  const [showNotes, setShowNotes] = useState<boolean>(false);
  const [showOverview, setShowOverview] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isFullscreenFallback, setIsFullscreenFallback] = useState<boolean>(false);
  const [isIntroUnlocked, setIsIntroUnlocked] = useState<boolean>(false);
  const [isIntroExiting, setIsIntroExiting] = useState<boolean>(false);
  const [slide2RevealStep, setSlide2RevealStep] = useState<number>(0);
  const commandRevisionRef = useRef<number>(0);
  const commandReadyRef = useRef<boolean>(false);
  const currentIndexRef = useRef<number>(0);

  const onRemoteSlideChange = useCallback((newIndex: number) => {
    setIsIntroExiting(false);
    if (newIndex > 0) {
      setIsIntroUnlocked(true);
      try {
        localStorage.setItem('ww2_intro_complete', 'true');
      } catch {}
    }
    setDirection(newIndex > currentIndexRef.current ? 1 : -1);
    if (slidesData[newIndex]?.id !== 2) {
      setSlide2RevealStep(0);
    }
  }, []);

  const { currentIndex, setCurrentIndex } = useSlideSync(0, onRemoteSlideChange);

  useEffect(() => {
    currentIndexRef.current = currentIndex;
  }, [currentIndex]);

  const totalSlides = slidesData.length;
  const currentSlide = slidesData[currentIndex];
  const canAdvance = !(currentIndex === 0 && !isIntroUnlocked);
  const isIntroSlide = currentIndex === 0;
  const isProgressiveSlide2 = currentSlide.id === 2;
  const presenterUrl = new URL(window.location.href);
  presenterUrl.searchParams.set('mode', 'notes');
  presenterUrl.searchParams.set('slide', String(currentIndex + 1));

  const handleNext = () => {
    if (isIntroExiting) return;
    if (isProgressiveSlide2 && slide2RevealStep < 4) {
      setSlide2RevealStep((step) => Math.min(step + 1, 4));
      return;
    }
    if (currentIndex === 0) {
      setIsIntroUnlocked(true);
      try {
        localStorage.setItem('ww2_intro_complete', 'true');
      } catch {}
      setIsIntroExiting(true);
      window.setTimeout(() => {
        setDirection(1);
        setCurrentIndex(1);
        setIsIntroExiting(false);
      }, 720);
      return;
    }
    if (currentIndex < totalSlides - 1) {
      setDirection(1);
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (isProgressiveSlide2 && slide2RevealStep > 0) {
      setSlide2RevealStep((step) => Math.max(step - 1, 0));
      return;
    }
    if (currentIndex > 0) {
      setIsIntroExiting(false);
      setDirection(-1);
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleSelectSlide = (index: number) => {
    setIsIntroExiting(false);
    if (slidesData[index]?.id !== 2) setSlide2RevealStep(0);
    if (index > 0) setIsIntroUnlocked(true);
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const handleToggleFullscreen = async () => {
    if (isFullscreenFallback) {
      setIsFullscreenFallback(false);
      setIsFullscreen(isFullscreenActive());
      return;
    }

    if (!isFullscreenSupported()) {
      const nextFallbackState = !isFullscreenFallback;
      setIsFullscreenFallback(nextFallbackState);
      setIsFullscreen(nextFallbackState);
      return;
    }

    try {
      const wasActive = isFullscreenActive();
      await execToggleFullscreen(deckRef.current);
      const activeAfterToggle = isFullscreenActive();
      const shouldUseFallback = !wasActive && !activeAfterToggle;

      setIsFullscreenFallback(shouldUseFallback);
      setIsFullscreen(activeAfterToggle || shouldUseFallback);
    } catch (err) {
      console.error('Fullscreen toggle failed:', err);
      const nextFallbackState = !isFullscreenFallback;
      setIsFullscreenFallback(nextFallbackState);
      setIsFullscreen(nextFallbackState);
    }
  };

  const handleOpenPresenterTab = () => {
    const url = new URL(window.location.href);
    url.searchParams.set('mode', 'notes');
    url.searchParams.set('slide', String(currentIndex + 1));
    window.open(url.toString(), '_blank', 'noopener,noreferrer');
  };

  useEffect(() => {
    const interval = window.setInterval(() => {
      fetch('/api/command')
        .then((response) => (response.ok ? response.json() : null))
        .then((data: { action?: 'next' | 'prev' | 'goto' | null; index?: number; revision?: number } | null) => {
          if (!data || !Number.isFinite(data.revision)) return;

          const revision = Number(data.revision);
          if (!commandReadyRef.current) {
            commandReadyRef.current = true;
            commandRevisionRef.current = revision;
            return;
          }

          if (revision === commandRevisionRef.current) return;

          commandRevisionRef.current = revision;
          if (data.action === 'goto' && typeof data.index === 'number') {
            handleSelectSlide(data.index);
          } else if (data.action === 'next') {
            handleNext();
          } else if (data.action === 'prev') {
            handlePrev();
          }
        })
        .catch(() => {});
    }, 350);

    return () => window.clearInterval(interval);
  }, [currentIndex, isIntroExiting, isProgressiveSlide2, slide2RevealStep, totalSlides]);

  // Keyboard navigation listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is in an input or textarea
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) return;

      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        handlePrev();
      } else if (e.key.toLowerCase() === 'n') {
        e.preventDefault();
        setShowNotes((prev) => !prev);
      } else if (e.key.toLowerCase() === 'p') {
        e.preventDefault();
        handleOpenPresenterTab();
      } else if (e.key.toLowerCase() === 'g') {
        e.preventDefault();
        setShowOverview((prev) => !prev);
      } else if (e.key.toLowerCase() === 'f') {
        e.preventDefault();
        handleToggleFullscreen();
      } else if (e.key === 'Escape') {
        setShowOverview(false);
        setShowNotes(false);
        setIsFullscreenFallback(false);
        setIsFullscreen(isFullscreenActive());
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, totalSlides, canAdvance, isFullscreenFallback, isIntroExiting, slide2RevealStep]);

  // Fullscreen change listener
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(isFullscreenActive());
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
      document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
    };
  }, []);

  if (isIntroSlide) {
    return (
      <motion.div
        ref={deckRef}
        className="ww2-cursor w-screen h-screen overflow-hidden bg-[#07111f] relative"
        initial={{ opacity: 0, filter: 'blur(10px)' }}
        animate={{
          opacity: isIntroExiting ? 0 : 1,
          filter: isIntroExiting ? 'blur(12px)' : 'blur(0px)',
        }}
        transition={{ duration: isIntroExiting ? 0.68 : 0.8, ease: 'easeInOut' }}
      >
        <SlideRenderer
          slide={currentSlide}
          direction={direction}
          isIntroUnlocked={isIntroUnlocked}
          onIntroComplete={() => {
            setIsIntroUnlocked(true);
            localStorage.setItem('ww2_intro_complete', 'true');
          }}
          presenterUrl={presenterUrl.toString()}
          isFullscreen={isFullscreen}
          onToggleFullscreen={handleToggleFullscreen}
        />

        {isIntroUnlocked && !isIntroExiting && (
          <button
            onClick={handleNext}
            className="absolute bottom-7 right-7 z-30 px-6 py-3 rounded bg-[#8B2626] hover:bg-[#a32d2d] border border-[#B89C62] text-[#F5F5F0] shadow-[0_12px_40px_rgba(0,0,0,0.55)] font-typewriter text-sm tracking-widest uppercase transition-colors"
          >
            Next
          </button>
        )}
      </motion.div>
    );
  }

  return (
    <motion.div
      className="ww2-cursor w-screen h-screen flex items-center justify-center p-2 sm:p-4 md:p-6 bg-[#141614] overflow-hidden military-grid-pattern relative"
      initial={{ opacity: 0, filter: 'blur(10px)' }}
      animate={{ opacity: 1, filter: 'blur(0px)' }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      {/* Subtle Ambient WWII Vignette */}
      <div className="absolute inset-0 pointer-events-none vignette-overlay opacity-60 z-0" />

      {/* Main Dossier Presentation Deck */}
      <div
        ref={deckRef}
        className={`relative z-10 w-full bg-[#24272A] border-3 border-[#3D493A] shadow-[0_20px_60px_rgba(0,0,0,0.85)] flex flex-col p-4 sm:p-6 md:p-8 overflow-hidden ${
          isFullscreen || isFullscreenFallback
            ? 'fixed inset-0 max-w-none h-screen max-h-none rounded-none border-0 !p-3 sm:!p-4 md:!p-5'
            : 'max-w-7xl h-[94vh] max-h-[960px] rounded-sm'
        }`}
      >
        <WarVideoBackdrop opacity={0.05} />

        {/* Brass Screws at Corners */}
        <div className="absolute top-2 left-2 w-2.5 h-2.5 rounded-full bg-[#B89C62] border border-[#16181A] shadow" />
        <div className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-[#B89C62] border border-[#16181A] shadow" />
        <div className="absolute bottom-2 left-2 w-2.5 h-2.5 rounded-full bg-[#B89C62] border border-[#16181A] shadow" />
        <div className="absolute bottom-2 right-2 w-2.5 h-2.5 rounded-full bg-[#B89C62] border border-[#16181A] shadow" />

        {/* Top Header Bar */}
        <HeaderBar
          currentSlide={currentSlide}
          totalSlides={totalSlides}
          currentIndex={currentIndex}
          showNotes={showNotes}
          onToggleNotes={() => setShowNotes((prev) => !prev)}
          onOpenOverview={() => setShowOverview(true)}
          presenterUrl={presenterUrl.toString()}
          isFullscreen={isFullscreen}
          onToggleFullscreen={handleToggleFullscreen}
        />

        {/* Center Slide Viewport */}
        <main className="flex-1 overflow-hidden relative flex flex-col justify-center">
          <SlideRenderer 
            slide={currentSlide} 
            direction={direction} 
            isIntroUnlocked={isIntroUnlocked}
            progressiveStep={isProgressiveSlide2 ? slide2RevealStep : undefined}
            onIntroComplete={() => {
              setIsIntroUnlocked(true);
              localStorage.setItem('ww2_intro_complete', 'true');
            }}
          />
        </main>

        {/* Speaker Notes Overlay */}
        <SpeakerNotesModal
          isOpen={showNotes}
          onClose={() => setShowNotes(false)}
          note={currentSlide.speakerNote}
          slideNumber={currentIndex + 1}
        />

        {/* Bottom Footer Controls */}
        <FooterBar
          currentIndex={currentIndex}
          totalSlides={totalSlides}
          onPrev={handlePrev}
          onNext={handleNext}
          canAdvance={canAdvance}
        />
      </div>

      {/* Slide Overview Grid Modal */}
      <SlideOverviewModal
        isOpen={showOverview}
        onClose={() => setShowOverview(false)}
        slides={slidesData}
        currentIndex={currentIndex}
        onSelectSlide={handleSelectSlide}
      />
    </motion.div>
  );
};
