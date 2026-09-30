import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SlideData } from '../../types/slide';
import { TitleSlide } from './variants/TitleSlide';
import { TimeMachineIntro } from './variants/TimeMachineIntro';
import { SplitContrastSlide } from './variants/SplitContrastSlide';
import { DossierSlide } from './variants/DossierSlide';
import { MediaGridSlide } from './variants/MediaGridSlide';
import { TacticalMapSlide } from './variants/TacticalMapSlide';
import { BattleRecordSlide } from './variants/BattleRecordSlide';
import { MemorialQuoteSlide } from './variants/MemorialQuoteSlide';
import { ConclusionSlide } from './variants/ConclusionSlide';

interface SlideRendererProps {
  slide: SlideData;
  direction: number;
  isIntroUnlocked?: boolean;
  onIntroComplete?: () => void;
  presenterUrl?: string;
  isFullscreen?: boolean;
  onToggleFullscreen?: () => void;
  progressiveStep?: number;
}

export const SlideRenderer: React.FC<SlideRendererProps> = ({ 
  slide, 
  direction: _direction,
  isIntroUnlocked = false,
  onIntroComplete = () => {},
  presenterUrl,
  isFullscreen = false,
  onToggleFullscreen,
  progressiveStep,
}) => {
  const renderSlideContent = () => {
    if (slide.id === 1) {
      return (
        <TimeMachineIntro
          slide={slide}
          isUnlocked={isIntroUnlocked}
          onAnimationComplete={onIntroComplete}
          presenterUrl={presenterUrl}
          isFullscreen={isFullscreen}
          onToggleFullscreen={onToggleFullscreen}
        />
      );
    }

    switch (slide.layoutType) {
      case 'title':
        return <TitleSlide slide={slide} />;
      case 'split-contrast':
        return <SplitContrastSlide slide={slide} progressiveStep={progressiveStep} />;
      case 'dossier':
        return <DossierSlide slide={slide} />;
      case 'media-grid':
        return <MediaGridSlide slide={slide} />;
      case 'tactical-map':
        return <TacticalMapSlide slide={slide} />;
      case 'memorial-quote':
        return <MemorialQuoteSlide slide={slide} />;
      case 'conclusion':
        return <ConclusionSlide slide={slide} />;
      case 'battle':
      default:
        return <BattleRecordSlide slide={slide} />;
    }
  };

  const slideVariants = {
    enter: () => ({
      x: 0,
      opacity: 0,
      filter: 'blur(10px)',
      scale: 0.985,
    }),
    center: {
      x: 0,
      opacity: 1,
      filter: 'blur(0px)',
      scale: 1,
      transition: {
        duration: 0.75,
        ease: 'easeOut' as const,
      },
    },
    exit: () => ({
      x: 0,
      opacity: 0,
      filter: 'blur(10px)',
      scale: 1.015,
      transition: {
        duration: 0.55,
        ease: 'easeIn' as const,
      },
    }),
  };
  const transitionKey =
    slide.layoutType === 'battle' && slide.media?.galleryGroup
      ? `battle-gallery-${slide.media.galleryGroup}`
      : `slide-${slide.id}`;

  return (
    <div className="relative w-full h-full overflow-hidden px-1 py-1">
      <AnimatePresence mode="wait">
        <motion.div
          key={transitionKey}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="w-full h-full"
        >
          {renderSlideContent()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
