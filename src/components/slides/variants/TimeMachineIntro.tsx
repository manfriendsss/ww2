import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  const [stage, setStage] = useState<'modern' | 'priming' | 'rewinding' | 'landing1939' | 'titleReveal'>(
    isUnlocked ? 'titleReveal' : 'modern'
  );
  const [currentYear, setCurrentYear] = useState<number>(isUnlocked ? 1939 : 2026);
  const [rewindProgress, setRewindProgress] = useState<number>(isUnlocked ? 1 : 0);
  const [isDialHovered, setIsDialHovered] = useState<boolean>(false);
  const [dialSeconds, setDialSeconds] = useState<number>(12 * 3600); // Initial 12:00:00
  const hasCompletedRef = useRef<boolean>(isUnlocked);
  const animRef = useRef<number | null>(null);
  const timeoutRef = useRef<number | null>(null);
  const hoverAnimRef = useRef<number | null>(null);
  const lastHoverTimeRef = useRef<number | null>(null);

  // Fast hour countdown when hovering over the Time Dial button
  useEffect(() => {
    if (!isDialHovered) {
      lastHoverTimeRef.current = null;
      if (hoverAnimRef.current) {
        cancelAnimationFrame(hoverAnimRef.current);
        hoverAnimRef.current = null;
      }
      return;
    }

    // Rewinds ~3.5 hours per real second (12600 seconds/second)
    const SECONDS_PER_REAL_SECOND = 12600;
    const cycleSeconds = 12 * 3600;

    const animateDial = (now: number) => {
      if (lastHoverTimeRef.current === null) {
        lastHoverTimeRef.current = now;
      }
      const delta = (now - lastHoverTimeRef.current) / 1000;
      lastHoverTimeRef.current = now;

      setDialSeconds((prev) => {
        const next = prev - delta * SECONDS_PER_REAL_SECOND;
        return ((next % cycleSeconds) + cycleSeconds) % cycleSeconds;
      });

      hoverAnimRef.current = requestAnimationFrame(animateDial);
    };

    hoverAnimRef.current = requestAnimationFrame(animateDial);

    return () => {
      if (hoverAnimRef.current) {
        cancelAnimationFrame(hoverAnimRef.current);
        hoverAnimRef.current = null;
      }
    };
  }, [isDialHovered]);

  const formatDialTime = (totalSec: number) => {
    const s = Math.floor(totalSec) % 60;
    const m = Math.floor(totalSec / 60) % 60;
    let h = Math.floor(totalSec / 3600) % 12;
    if (h === 0) h = 12;
    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${pad(h)}:${pad(m)}:${pad(s)}`;
  };

  const startRewind = () => {
    setStage('priming');
    setCurrentYear(2026);
    setRewindProgress(0);

    timeoutRef.current = window.setTimeout(() => {
      setStage('rewinding');
      runYearRewind();
    }, 1200);
  };

  const runYearRewind = () => {
    const startYear = 2026;
    const targetYear = 1939;
    const duration = 16000;
    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      setRewindProgress(progress);

      // Two-phase easing to ensure 1945 is clearly visible, then gently settles into 1939:
      // Phase 1 (0 -> 0.74): Rewinds from 2026 to 1946 (rapid historic rewind)
      // Phase 2 (0.74 -> 1.0): Decelerates smoothly from 1946 through 1945 ("The end of WW2") down to 1939
      let year: number;
      if (progress < 0.74) {
        const t = progress / 0.74;
        const ease1 = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        year = Math.round(startYear - (startYear - 1946) * ease1);
      } else {
        const t = (progress - 0.74) / 0.26;
        // Smooth deceleration curve
        const ease2 = 1 - Math.pow(1 - t, 2.2);
        year = Math.round(1946 - (1946 - targetYear) * ease2);
      }

      setCurrentYear(year);

      if (progress < 1) {
        animRef.current = requestAnimationFrame(animate);
      } else {
        setCurrentYear(targetYear);
        setRewindProgress(1);
        setStage('landing1939');

        // Hold on 1939 with "World War II begins" so the viewer clearly reads it
        timeoutRef.current = window.setTimeout(() => {
          // Then fade out the entire rewind cluster, and reveal the 1939 - 1945 title
          setStage('titleReveal');

          timeoutRef.current = window.setTimeout(() => {
            if (!hasCompletedRef.current) {
              hasCompletedRef.current = true;
              onAnimationComplete();
            }
          }, 3600);
        }, 2200);
      }
    };

    animRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    if (isUnlocked) {
      hasCompletedRef.current = true;
      setStage('titleReveal');
      setCurrentYear(1939);
      setRewindProgress(1);
    }
  }, [isUnlocked]);

  useEffect(() => {
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
      if (hoverAnimRef.current) cancelAnimationFrame(hoverAnimRef.current);
    };
  }, []);

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
    { year: 1945, label: 'The end of World War II' },
    { year: 1939, label: 'World War II begins' },
  ];

  const activeMilestone = rewindMilestones.find((milestone, index) => {
    const nextMilestone = rewindMilestones[index + 1];
    return currentYear <= milestone.year && (!nextMilestone || currentYear > nextMilestone.year);
  });

  const timelineCaption = activeMilestone
    ? `${activeMilestone.year} - ${activeMilestone.label}`
    : '2026 - Present day';

  const modernBackdrop = (
    <div className="absolute inset-0">
      <div className="absolute inset-0 bg-[#07111f]" />
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(6,182,212,0.24),transparent_34%,rgba(99,102,241,0.26)_68%,rgba(15,23,42,0.96))]" />
      <div className="absolute inset-0 opacity-25 bg-[linear-gradient(to_right,rgba(125,211,252,0.3)_1px,transparent_1px),linear-gradient(to_bottom,rgba(125,211,252,0.22)_1px,transparent_1px)] bg-[size:48px_48px]" />
    </div>
  );

  const classicBackdrop = (
    <div className="absolute inset-0">
      <div className="absolute inset-0 bg-[#24272A] military-grid-pattern" />
      <div className="absolute inset-0 vignette-overlay opacity-75" />
      <div className="absolute inset-0 opacity-15 bg-[repeating-linear-gradient(0deg,transparent,transparent_3px,rgba(245,245,240,0.2)_3px,rgba(245,245,240,0.2)_4px)]" />
    </div>
  );

  // Smooth continuous video opacity calculation
  let videoOpacity = 0;
  if (stage === 'priming') {
    videoOpacity = 0.14;
  } else if (stage === 'rewinding') {
    videoOpacity = 0.14 + rewindProgress * 0.08;
  } else if (stage === 'landing1939' || stage === 'titleReveal') {
    videoOpacity = 0.22;
  }

  // Smooth backdrop blend calculation
  let modernOpacity = 1;
  let classicOpacity = 0;
  if (stage === 'priming') {
    modernOpacity = 0.75;
    classicOpacity = 0.25;
  } else if (stage === 'rewinding') {
    modernOpacity = Math.max(0, 1 - rewindProgress * 1.35);
    classicOpacity = Math.min(1, Math.max(0, (rewindProgress - 0.12) / 0.72));
  } else if (stage === 'landing1939' || stage === 'titleReveal') {
    modernOpacity = 0;
    classicOpacity = 1;
  }

  const introControls = (
    <div className="absolute top-5 right-5 z-40 flex items-center gap-2">
      {presenterUrl && (
        <a
          href={presenterUrl}
          target="_blank"
          rel="noopener noreferrer"
          title="Open speaker notes"
          className="grid h-10 w-10 place-items-center rounded-full border border-[#B89C62]/40 bg-slate-950/60 text-[#D4AF37] shadow-lg backdrop-blur-md transition-colors hover:border-[#D4AF37] hover:bg-slate-900/80"
        >
          <ExternalLink size={17} />
        </a>
      )}
      {onToggleFullscreen && (
        <button
          onClick={onToggleFullscreen}
          title="Toggle fullscreen"
          className="grid h-10 w-10 place-items-center rounded-full border border-[#B89C62]/40 bg-slate-950/60 text-[#D4AF37] shadow-lg backdrop-blur-md transition-colors hover:border-[#D4AF37] hover:bg-slate-900/80"
        >
          {isFullscreen ? <Minimize2 size={17} /> : <Maximize2 size={17} />}
        </button>
      )}
    </div>
  );

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center p-6 overflow-hidden select-none">
      {/* 1. LAYERED BACKDROPS (Mounted permanently, smoothly crossfaded) */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ opacity: modernOpacity }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        {modernBackdrop}
      </motion.div>

      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ opacity: classicOpacity }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        {classicBackdrop}
      </motion.div>

      {/* 2. BACKGROUND VIDEO (Mounted at root, runs continuously without interruption) */}
      <WarVideoBackdrop opacity={videoOpacity} />

      {/* 3. VINTAGE ATMOSPHERIC CRT SCANLINES & GOLDEN GLOW */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          opacity: stage === 'modern' ? 0 : 1,
        }}
        transition={{ duration: 1.2 }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(212,175,55,0.18)_0%,_transparent_72%)] animate-pulse" />
        <div className="absolute inset-0 opacity-20 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(255,255,255,0.1)_2px,rgba(255,255,255,0.1)_4px)]" />
      </motion.div>

      {introControls}

      {/* 4. MAIN INTERACTIVE / PRESENTATION CONTENT */}
      <div className="relative z-10 w-full max-w-5xl flex flex-col items-center text-center">
        <AnimatePresence mode="wait">
          {/* === STAGE 1: MODERN INITIAL STATE === */}
          {stage === 'modern' && (
            <motion.div
              key="modern-view"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24, filter: 'blur(8px)' }}
              transition={{ duration: 0.6 }}
              className="space-y-6 font-sans max-w-3xl"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/70 border border-cyan-500/40 text-cyan-300 text-xs font-mono tracking-widest uppercase shadow-sm">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                PRESENT ERA // YEAR 2026
              </div>

              <h1 className="mx-auto text-balance text-3xl sm:text-5xl lg:text-[64px] font-extrabold text-white tracking-normal leading-tight drop-shadow-lg pb-1">
                If you could travel back in time,
                <span className="mt-3 block bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-300 bg-clip-text text-transparent pb-3 pt-1 leading-normal">
                  which era would you choose?
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 font-normal max-w-2xl mx-auto leading-relaxed">
                Most would seek ancient wonders, peaceful renaissance gardens, or the romantic twenties.
                What if we set our temporal coordinates to the most defining crucible in human memory?
              </p>

              <div className="pt-4">
                <motion.button
                  whileHover={{ scale: 1.04, boxShadow: '0 0 34px rgba(34, 211, 238, 0.44)' }}
                  whileTap={{ scale: 0.98 }}
                  onClick={startRewind}
                  onMouseEnter={() => setIsDialHovered(true)}
                  onMouseLeave={() => setIsDialHovered(false)}
                  className="group relative inline-flex items-center gap-4 rounded-full border border-cyan-300/40 bg-slate-950/75 py-2.5 pl-3 pr-6 text-left text-white shadow-[0_18px_48px_rgba(6,182,212,0.22)] backdrop-blur-md transition-all hover:border-cyan-200/75 hover:bg-cyan-950/65"
                >
                  {/* === CHRONO DIAL ICON === */}
                  <span className="relative grid h-14 w-14 shrink-0 place-items-center rounded-full border border-cyan-200/60 bg-[radial-gradient(circle,rgba(34,211,238,0.28)_0%,rgba(15,23,42,0.95)_70%)] shadow-[inset_0_0_18px_rgba(125,211,252,0.25)] overflow-hidden">
                    <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 56 56">
                      {/* Outer Dashed Orbit (Spins counter-clockwise when hovered) */}
                      <g
                        style={{
                          transformOrigin: '28px 28px',
                          animation: isDialHovered ? 'spin-reverse 4s linear infinite' : 'none',
                          opacity: isDialHovered ? 0.85 : 0.25,
                          transition: 'opacity 0.3s ease-out',
                        }}
                      >
                        <circle
                          cx="28"
                          cy="28"
                          r="25"
                          fill="none"
                          stroke="#22d3ee"
                          strokeWidth="0.8"
                          strokeDasharray="2 3"
                        />
                      </g>

                      {/* 12 Clock Hour Ticks */}
                      {[...Array(12)].map((_, i) => {
                        const angle = (i * 30 * Math.PI) / 180;
                        const isMajor = i % 3 === 0;
                        const rInner = isMajor ? 19 : 21.5;
                        const rOuter = 24;
                        const x1 = 28 + rInner * Math.sin(angle);
                        const y1 = 28 - rInner * Math.cos(angle);
                        const x2 = 28 + rOuter * Math.sin(angle);
                        const y2 = 28 - rOuter * Math.cos(angle);
                        return (
                          <line
                            key={i}
                            x1={x1}
                            y1={y1}
                            x2={x2}
                            y2={y2}
                            stroke={isMajor ? '#a5f3fc' : '#38bdf8'}
                            strokeWidth={isMajor ? 1.6 : 0.9}
                            strokeOpacity={isMajor ? 0.9 : 0.45}
                            strokeLinecap="round"
                          />
                        );
                      })}

                      {/* Hour Hand: Gold Vintage Brass (Rotates counter-clockwise continuously when hovered) */}
                      <g
                        style={{
                          transformOrigin: '28px 28px',
                          animation: isDialHovered ? 'spin-reverse 3.6s linear infinite' : 'none',
                          transform: isDialHovered ? undefined : 'rotate(-45deg)',
                          transition: 'transform 0.4s ease-out',
                        }}
                      >
                        <line
                          x1="28"
                          y1="28"
                          x2="28"
                          y2="16"
                          stroke="#D4AF37"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                        />
                      </g>

                      {/* Minute Hand: Bright Cyan (Spins counter-clockwise rapidly) */}
                      <g
                        style={{
                          transformOrigin: '28px 28px',
                          animation: isDialHovered ? 'spin-reverse 0.65s linear infinite' : 'none',
                          transform: isDialHovered ? undefined : 'rotate(45deg)',
                          transition: 'transform 0.4s ease-out',
                        }}
                      >
                        <line
                          x1="28"
                          y1="28"
                          x2="28"
                          y2="10"
                          stroke="#a5f3fc"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                        />
                      </g>

                      {/* Second Hand Needle: High-speed sweep needle counter-clockwise */}
                      <g
                        style={{
                          transformOrigin: '28px 28px',
                          animation: isDialHovered ? 'spin-reverse 0.22s linear infinite' : 'none',
                          transform: isDialHovered ? undefined : 'rotate(120deg)',
                          transition: 'transform 0.4s ease-out',
                        }}
                      >
                        <line
                          x1="28"
                          y1="33"
                          x2="28"
                          y2="7"
                          stroke="#f43f5e"
                          strokeWidth="1.1"
                          strokeLinecap="round"
                        />
                        <circle cx="28" cy="11" r="1.4" fill="#f43f5e" />
                      </g>

                      {/* Center Cap Pin */}
                      <circle
                        cx="28"
                        cy="28"
                        r="2.6"
                        fill="#D4AF37"
                        stroke="#0f172a"
                        strokeWidth="1"
                      />
                    </svg>
                  </span>

                  {/* === BUTTON LABELS & RAPID REWIND HOUR DISPLAY === */}
                  <span className="flex flex-col">
                    <span className="flex items-center gap-2">
                      <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-cyan-200/80">
                        {isDialHovered ? 'REVERSING TIME' : 'Set coordinates: 1939'}
                      </span>
                      <span className="inline-flex items-center gap-1 font-mono text-[11px] font-bold text-cyan-300 bg-cyan-950/90 border border-cyan-400/40 px-2 py-0.5 rounded shadow-[0_0_12px_rgba(34,211,238,0.25)]">
                        <Clock
                          size={11}
                          className={`text-cyan-400 ${isDialHovered ? 'animate-spin-reverse' : ''}`}
                        />
                        <span className="tabular-nums">{formatDialTime(dialSeconds)}</span>
                      </span>
                    </span>
                    <span className="font-bold uppercase tracking-[0.18em] text-sm sm:text-base flex items-center gap-2">
                      <span>Engage Time Dial</span>
                      {isDialHovered && (
                        <span className="text-[11px] font-mono tracking-widest text-[#D4AF37] animate-pulse">
                          ◄ REWINDING
                        </span>
                      )}
                    </span>
                  </span>
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* === STAGE 2: PRIMING === */}
          {stage === 'priming' && (
            <motion.div
              key="priming-view"
              initial={{ opacity: 0, scale: 1.15, filter: 'blur(16px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 0.95, filter: 'blur(8px)' }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="font-heading text-8xl sm:text-9xl md:text-[150px] font-black leading-none tracking-tight text-white drop-shadow-[0_0_45px_rgba(34,211,238,0.65)]"
            >
              2026
            </motion.div>
          )}

          {/* === STAGE 3 & 4: REWINDING & LANDING AT 1939 === */}
          {/* Entire cluster stays intact while rewinding and showing 1939, then fades out as a whole */}
          {(stage === 'rewinding' || stage === 'landing1939') && (
            <motion.div
              key="rewind-cluster"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ 
                opacity: 0, 
                scale: 0.94, 
                filter: 'blur(12px)',
                transition: { duration: 0.85, ease: 'easeInOut' }
              }}
              className="w-full flex flex-col items-center space-y-4"
            >
              <div className="text-xs sm:text-sm font-typewriter text-[#D4AF37] tracking-[0.3em] uppercase flex items-center justify-center gap-2">
                {stage === 'landing1939' ? (
                  <>
                    <span className="w-2.5 h-2.5 rounded-full bg-[#8B2626] animate-pulse" />
                    <span>TEMPORAL TARGET LOCKED // YEAR 1939</span>
                  </>
                ) : (
                  <>
                    <Clock size={16} className="animate-spin text-[#8B2626]" />
                    TEMPORAL FLUX REVERSAL IN PROGRESS...
                  </>
                )}
              </div>

              {/* Glowing Year Display */}
              <div className="relative min-h-[0.95em] flex items-center justify-center font-heading text-7xl sm:text-8xl md:text-9xl lg:text-[150px] font-black tracking-tight leading-none">
                <motion.div
                  className="absolute text-white drop-shadow-[0_0_52px_rgba(34,211,238,0.58)]"
                  style={{ opacity: modernOpacity }}
                >
                  {currentYear}
                </motion.div>
                <motion.div
                  className="relative text-[#D4AF37] drop-shadow-[0_0_50px_rgba(212,175,55,0.7)] drop-shadow-[0_8px_24px_rgba(0,0,0,0.85)]"
                  style={{ opacity: classicOpacity }}
                >
                  {currentYear}
                </motion.div>
              </div>

              {/* Caption: Matches the exact same text-[#D4AF37] style as all previous milestone lines */}
              <div className="h-10 sm:h-12 flex items-center justify-center">
                <motion.div
                  key={timelineCaption}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35 }}
                  className="font-courier text-sm sm:text-base md:text-lg text-[#D4AF37] tracking-[0.16em] uppercase"
                >
                  {timelineCaption}
                </motion.div>
              </div>

              {/* Velocity meter */}
              <div className="w-64 sm:w-80 h-1.5 bg-black/60 rounded-full mx-auto overflow-hidden border border-[#3D493A] mt-4">
                <div 
                  className="h-full bg-gradient-to-r from-cyan-400 via-[#D4AF37] to-[#8B2626] transition-all duration-75"
                  style={{ width: `${((2026 - currentYear) / (2026 - 1939)) * 100}%` }}
                />
              </div>
            </motion.div>
          )}

          {/* === STAGE 5: TITLE REVEAL === */}
          {/* Fades in ONLY AFTER the entire rewind cluster has completely faded out */}
          {stage === 'titleReveal' && (
            <motion.div
              key="title-reveal"
              initial={{ opacity: 0, scale: 0.93, filter: 'blur(14px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              transition={{ duration: 1.15, ease: [0.16, 1, 0.3, 1] }}
              className="w-full flex flex-col items-center justify-center"
            >
              {/* Grand 1939 – 1945 Heading */}
              <div className="flex items-center justify-center whitespace-nowrap font-heading font-black text-6xl sm:text-8xl md:text-9xl lg:text-[140px] leading-none tracking-tight origin-center">
                <span className="text-[#D4AF37] drop-shadow-[0_0_45px_rgba(212,175,55,0.7)] drop-shadow-[0_8px_24px_rgba(0,0,0,0.9)]">
                  1939&nbsp;–&nbsp;1945
                </span>
              </div>

              {/* Deep Crimson Divider Line */}
              <motion.div
                initial={isUnlocked ? false : { scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ delay: 0.35, duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                className="mt-3 sm:mt-4 h-2 w-[min(65vw,600px)] origin-center bg-[#8B2626] shadow-[0_0_22px_rgba(139,38,38,0.75)]"
              />

              {/* World War II Grand Typewriter Title */}
              <motion.div
                initial={isUnlocked ? false : { opacity: 0, y: 18, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ delay: 0.8, duration: 1.0, ease: 'easeOut' }}
                className="mt-6 font-typewriter text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-[#F5F5F0] uppercase tracking-[0.2em] drop-shadow-[0_8px_28px_rgba(0,0,0,0.95)]"
              >
                World War II
              </motion.div>

              {/* Historical Declassified Archive Stamp Badge */}
              <motion.div
                initial={isUnlocked ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4, duration: 0.75, ease: 'easeOut' }}
                className="mt-5 inline-flex items-center gap-2.5 px-4 py-1.5 rounded border border-[#B89C62]/50 bg-black/50 text-[#D4AF37] font-courier text-xs sm:text-sm tracking-[0.25em] uppercase backdrop-blur-sm shadow-[0_4px_16px_rgba(0,0,0,0.6)]"
              >
                <span className="w-2 h-2 rounded-full bg-[#8B2626] animate-pulse" />
                TOP SECRET // HISTORICAL ARCHIVES DECLASSIFIED
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
