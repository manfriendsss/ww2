import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { SlideData } from '../../../types/slide';
import { Clock, ExternalLink, Maximize2, Minimize2 } from 'lucide-react';
import { WarVideoBackdrop } from '../../common/WarVideoBackdrop';

interface TimeMachineIntroProps {
  slide: SlideData;
  onAnimationComplete: () => void;
  isUnlocked: boolean;
  presenterUrl?: string;
  isFullscreen?: boolean;
  onToggleFullscreen?: () => void;
}

export const TimeMachineIntro: React.FC<TimeMachineIntroProps> = ({
  slide: _slide,
  onAnimationComplete,
  isUnlocked,
  presenterUrl,
  isFullscreen = false,
  onToggleFullscreen,
}) => {
  const [stage, setStage] = useState<'modern' | 'priming' | 'rewinding' | 'arrivalCue' | 'arrival'>(
    isUnlocked ? 'arrival' : 'modern'
  );
  const [currentYear, setCurrentYear] = useState<number>(2026);
  const [rewindProgress, setRewindProgress] = useState<number>(0);
  const hasCompletedRef = useRef<boolean>(isUnlocked);
  const animRef = useRef<number | null>(null);
  const timeoutRef = useRef<number | null>(null);

  const startRewind = () => {
    setStage('priming');
    setCurrentYear(2026);

    timeoutRef.current = window.setTimeout(() => {
      setStage('rewinding');
      runYearRewind();
    }, 1400);
  };

  const runYearRewind = () => {
    const startYear = 2026;
    const targetYear = 1939;
    const duration = 15500;
    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      setRewindProgress(progress);

      // S-curve easing: slow start, fast middle, slow end
      // Easing function: smoothstep / cubic bezier
      const ease = progress < 0.5 
        ? 4 * progress * progress * progress 
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;

      const year = Math.round(startYear - (startYear - targetYear) * ease);
      setCurrentYear(year);

      if (progress < 1) {
        animRef.current = requestAnimationFrame(animate);
      } else {
        setCurrentYear(targetYear);
        setRewindProgress(1);
        setStage('arrivalCue');
        timeoutRef.current = window.setTimeout(() => {
          setStage('arrival');
          timeoutRef.current = window.setTimeout(() => {
            if (!hasCompletedRef.current) {
              hasCompletedRef.current = true;
              onAnimationComplete();
            }
          }, 5900);
        }, 2100);
      }
    };

    animRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    if (isUnlocked) {
      hasCompletedRef.current = true;
      setStage('arrival');
      setCurrentYear(1939);
      setRewindProgress(1);
    }
  }, [isUnlocked]);

  useEffect(() => {
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, []);

  const modernBackdrop = (
    <>
      <div className="absolute inset-0 bg-[#07111f]" />
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(6,182,212,0.24),transparent_34%,rgba(99,102,241,0.26)_68%,rgba(15,23,42,0.96))]" />
      <div className="absolute inset-0 opacity-25 bg-[linear-gradient(to_right,rgba(125,211,252,0.3)_1px,transparent_1px),linear-gradient(to_bottom,rgba(125,211,252,0.22)_1px,transparent_1px)] bg-[size:48px_48px]" />
    </>
  );

  const classicBackdrop = (
    <>
      <div className="absolute inset-0 bg-[#24272A] military-grid-pattern" />
      <div className="absolute inset-0 vignette-overlay opacity-70" />
      <div className="absolute inset-0 opacity-15 bg-[repeating-linear-gradient(0deg,transparent,transparent_3px,rgba(245,245,240,0.2)_3px,rgba(245,245,240,0.2)_4px)]" />
    </>
  );

  const rewindMilestones = [
    { year: 2022, label: 'Russia-Ukraine war shocks Europe' },
    { year: 2019, label: 'COVID-19 outbreak' },
    { year: 2008, label: 'Global financial crisis' },
    { year: 2001, label: 'September 11 attacks' },
    { year: 1991, label: 'Soviet Union dissolves' },
    { year: 1989, label: 'Berlin Wall falls' },
    { year: 1975, label: 'End of the War in Vietnam' },
    { year: 1962, label: 'Cuban Missile Crisis' },
    { year: 1947, label: 'Cold War begins' },
  ];

  const activeMilestone = rewindMilestones.find((milestone, index) => {
    const nextMilestone = rewindMilestones[index + 1];
    return currentYear <= milestone.year && (!nextMilestone || currentYear > nextMilestone.year);
  });
  const timelineCaption = activeMilestone
    ? `${activeMilestone.year} - ${activeMilestone.label}`
    : '2026 - Present day';
  const finalMilestoneFade = currentYear <= 1947
    ? Math.max(0, Math.min(1, (rewindProgress - 0.94) / 0.055))
    : 0;

  const introControls = (
    <div className="absolute top-5 right-5 z-30 flex items-center gap-2">
      {presenterUrl && (
        <a
          href={presenterUrl}
          target="_blank"
          rel="noopener noreferrer"
          title="Open speaker notes"
          className="grid h-10 w-10 place-items-center rounded-full border border-cyan-300/30 bg-slate-950/45 text-cyan-100 shadow-lg backdrop-blur-md transition-colors hover:border-cyan-300/70 hover:bg-cyan-900/40"
        >
          <ExternalLink size={17} />
        </a>
      )}
      {onToggleFullscreen && (
        <button
          onClick={onToggleFullscreen}
          title="Toggle fullscreen"
          className="grid h-10 w-10 place-items-center rounded-full border border-cyan-300/30 bg-slate-950/45 text-cyan-100 shadow-lg backdrop-blur-md transition-colors hover:border-cyan-300/70 hover:bg-cyan-900/40"
        >
          {isFullscreen ? <Minimize2 size={17} /> : <Maximize2 size={17} />}
        </button>
      )}
    </div>
  );

  // 1. MODERN INITIAL STATE
  if (stage === 'modern') {
    return (
      <div className="relative w-full h-full flex flex-col items-center justify-center p-6 overflow-hidden font-sans">
        {modernBackdrop}
        {introControls}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 max-w-3xl text-center space-y-6"
        >
          {/* Modern Top Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 text-xs font-mono tracking-widest uppercase shadow-sm">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            PRESENT ERA // YEAR 2026
          </div>

          {/* The Big Modern Question */}
          <h1 className="mx-auto max-w-5xl text-balance text-3xl sm:text-5xl lg:text-[64px] font-extrabold text-white tracking-normal leading-[1.08] drop-shadow-lg">
            If you could travel back in time,
            <span className="mt-3 block bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-300 bg-clip-text text-transparent">
              which era would you choose?
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 font-normal max-w-2xl mx-auto leading-relaxed">
            Most would seek ancient wonders, peaceful renaissance gardens, or the romantic twenties.
            What if we set our temporal coordinates to the most defining crucible in human memory?
          </p>

          {/* Interactive Button */}
          <div className="pt-4">
            <motion.button
              whileHover={{ scale: 1.04, boxShadow: '0 0 34px rgba(34, 211, 238, 0.44)' }}
              whileTap={{ scale: 0.98 }}
              onClick={startRewind}
              className="group inline-flex items-center gap-4 rounded-full border border-cyan-300/40 bg-slate-950/55 py-2.5 pl-3 pr-6 text-left text-white shadow-[0_18px_48px_rgba(6,182,212,0.22)] backdrop-blur-md transition-all hover:border-cyan-200/75 hover:bg-cyan-950/55"
            >
              <span className="relative grid h-14 w-14 place-items-center rounded-full border border-cyan-200/60 bg-[radial-gradient(circle,rgba(34,211,238,0.28)_0%,rgba(15,23,42,0.95)_70%)] shadow-[inset_0_0_18px_rgba(125,211,252,0.22)]">
                <span className="absolute inset-1 rounded-full border border-cyan-100/20" />
                <span className="absolute left-1/2 top-1.5 h-2 w-px -translate-x-1/2 bg-cyan-100/70" />
                <span className="absolute bottom-1.5 left-1/2 h-2 w-px -translate-x-1/2 bg-cyan-100/45" />
                <span className="absolute left-1.5 top-1/2 h-px w-2 -translate-y-1/2 bg-cyan-100/45" />
                <span className="absolute right-1.5 top-1/2 h-px w-2 -translate-y-1/2 bg-cyan-100/45" />
                <span className="absolute left-1/2 top-1/2 h-5 w-0.5 origin-bottom -translate-x-1/2 -translate-y-full rotate-45 rounded-full bg-cyan-100 transition-transform duration-500 group-hover:rotate-[405deg]" />
                <span className="absolute left-1/2 top-1/2 h-3 w-0.5 origin-bottom -translate-x-1/2 -translate-y-full -rotate-45 rounded-full bg-[#D4AF37]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#D4AF37] shadow-[0_0_14px_rgba(212,175,55,0.8)]" />
              </span>
              <span className="flex flex-col">
                <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-cyan-200/80">
                  Set coordinates: 1939
                </span>
                <span className="font-bold uppercase tracking-[0.18em] text-sm sm:text-base">
                  Engage Time Dial
                </span>
              </span>
            </motion.button>
          </div>
        </motion.div>
      </div>
    );
  }

  if (stage === 'priming') {
    return (
      <div className="relative w-full h-full flex items-center justify-center p-6 overflow-hidden font-sans">
        {modernBackdrop}
        {introControls}

        <motion.div
          initial={{ opacity: 1, y: 0, scale: 1 }}
          animate={{ opacity: 0, y: -24, scale: 0.96 }}
          transition={{ duration: 0.85, ease: 'easeInOut' }}
          className="absolute z-10 max-w-3xl text-center space-y-5"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 text-xs font-mono tracking-widest uppercase">
            PRESENT ERA // YEAR 2026
          </div>
          <h1 className="mx-auto max-w-5xl text-balance text-3xl sm:text-5xl lg:text-[64px] font-extrabold text-white tracking-normal leading-[1.08]">
            If you could travel back in time,
            <span className="mt-3 block bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-300 bg-clip-text text-transparent">
              which era would you choose?
            </span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 1.28, filter: 'blur(18px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ delay: 0.35, duration: 1.05, ease: 'easeInOut' }}
          className="relative z-20 font-heading text-8xl sm:text-9xl md:text-[158px] font-black leading-none tracking-tight text-white drop-shadow-[0_0_45px_rgba(34,211,238,0.55)]"
        >
          2026
        </motion.div>
      </div>
    );
  }

  // 2. REWINDING TIME-WARP STATE
  if (stage === 'rewinding') {
    const modernOpacity = Math.max(0, 1 - rewindProgress * 1.25);
    const classicOpacity = Math.min(1, Math.max(0, (rewindProgress - 0.22) / 0.68));
    const videoOpacity = currentYear <= 1980
      ? Math.min(0.15, ((1980 - currentYear) / (1980 - 1939)) * 0.15)
      : 0;

    return (
      <div className="relative w-full h-full flex flex-col items-center justify-center p-6 overflow-hidden font-mono select-none">
        <motion.div className="absolute inset-0" style={{ opacity: modernOpacity }}>
          {modernBackdrop}
        </motion.div>
        <motion.div className="absolute inset-0" style={{ opacity: classicOpacity }}>
          {classicBackdrop}
        </motion.div>
        <WarVideoBackdrop opacity={videoOpacity} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(212,175,55,0.16)_0%,_transparent_70%)] animate-pulse" />
        <div className="absolute inset-0 opacity-20 pointer-events-none bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(255,255,255,0.1)_2px,rgba(255,255,255,0.1)_4px)]" />

        <div className="relative z-10 text-center space-y-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xs sm:text-sm font-typewriter text-[#D4AF37] tracking-[0.3em] uppercase flex items-center justify-center gap-2"
          >
            <Clock size={16} className="animate-spin text-[#8B2626]" />
            TEMPORAL FLUX REVERSAL IN PROGRESS...
          </motion.div>

          {/* Huge Rewinding Number */}
          <div className="relative min-h-[0.9em] font-heading text-8xl sm:text-9xl md:text-[158px] font-black tracking-tight leading-none">
            <motion.div
              className="absolute inset-0 text-white drop-shadow-[0_0_52px_rgba(34,211,238,0.58)]"
              style={{ opacity: modernOpacity }}
            >
              {currentYear}
            </motion.div>
            <motion.div
              className="relative text-[#D4AF37] drop-shadow-[0_0_50px_rgba(212,175,55,0.6)]"
              style={{ opacity: classicOpacity }}
            >
              {currentYear}
            </motion.div>
          </div>

          <div className="h-10 sm:h-12 flex items-center justify-center">
            <div
              key={timelineCaption}
              className="font-courier text-sm sm:text-base md:text-lg text-[#D4AF37] tracking-[0.14em] uppercase"
              style={{ opacity: 1 - finalMilestoneFade }}
            >
              {timelineCaption}
            </div>
          </div>

          {/* Velocity meter */}
          <div className="w-64 sm:w-80 h-1.5 bg-black/60 rounded-full mx-auto overflow-hidden border border-[#3D493A] mt-4">
            <div 
              className="h-full bg-gradient-to-r from-cyan-400 via-[#D4AF37] to-[#8B2626] transition-all duration-75"
              style={{ width: `${((2026 - currentYear) / (2026 - 1939)) * 100}%` }}
            />
          </div>
        </div>
      </div>
    );
  }

  if (stage === 'arrivalCue') {
    return (
      <div className="relative w-full h-full flex flex-col items-center justify-center p-6 overflow-hidden font-mono select-none">
        {classicBackdrop}
        <WarVideoBackdrop opacity={0.15} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(212,175,55,0.16)_0%,_transparent_70%)]" />
        <div className="absolute inset-0 opacity-20 pointer-events-none bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(255,255,255,0.1)_2px,rgba(255,255,255,0.1)_4px)]" />

        <div className="relative z-10 text-center space-y-4">
          <div className="font-heading text-8xl sm:text-9xl md:text-[158px] font-black tracking-tight leading-none text-[#D4AF37] drop-shadow-[0_0_50px_rgba(212,175,55,0.6)]">
            1939
          </div>

          <motion.div
            initial={{ opacity: 0, y: 12, filter: 'blur(8px)' }}
            animate={{ opacity: [0, 1, 1, 0], y: [12, 0, 0, -14], filter: ['blur(8px)', 'blur(0px)', 'blur(0px)', 'blur(8px)'] }}
            transition={{ duration: 1.85, times: [0, 0.28, 0.72, 1], ease: 'easeInOut' }}
            className="font-courier text-base sm:text-xl text-[#D4AF37] tracking-[0.28em] uppercase"
          >
            Arriving...
          </motion.div>
        </div>
      </div>
    );
  }

  if (stage === 'arrival') {
    return (
      <div className="relative w-full h-full flex items-center justify-center p-6 overflow-hidden">
        {classicBackdrop}
        <WarVideoBackdrop opacity={0.15} />

        <div className="relative z-10 text-center flex flex-col items-center">
          <motion.div
            initial={{ scale: 1, y: 0 }}
            animate={{ scale: 0.72, y: -4 }}
            transition={{ delay: 1.85, duration: 2.2, ease: 'easeInOut' }}
            className="font-heading text-8xl sm:text-9xl md:text-[158px] leading-none font-black tracking-tight text-[#D4AF37] drop-shadow-[0_8px_0_rgba(0,0,0,0.4)] flex items-center justify-center whitespace-nowrap origin-center"
          >
            <motion.span
              initial={{ x: '32%' }}
              animate={{ x: 0 }}
              transition={{ delay: 0.35, duration: 0.9, ease: 'easeInOut' }}
            >
              1939
            </motion.span>
            <motion.span
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 'auto' }}
              transition={{ delay: 1.05, duration: 0.75, ease: 'easeOut' }}
              className="overflow-hidden"
            >
              &nbsp;- 1945
            </motion.span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 3.45, duration: 1.05, ease: 'easeOut' }}
            className="-mt-2 h-2 w-[min(58vw,560px)] origin-center bg-[#8B2626] shadow-[0_0_18px_rgba(139,38,38,0.65)]"
          />

          <motion.div
            initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ delay: 4.15, duration: 1.45, ease: 'easeOut' }}
            className="mt-7 font-typewriter text-4xl sm:text-6xl md:text-7xl text-[#F5F5F0] uppercase tracking-[0.18em] drop-shadow-[0_8px_24px_rgba(0,0,0,0.85)]"
          >
            World War 2
          </motion.div>
        </div>
      </div>
    );
  }
};
