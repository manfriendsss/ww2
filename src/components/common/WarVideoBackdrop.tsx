import React, { useEffect, useRef, useState } from 'react';

const VIDEO_SEGMENTS = [
  { src: '/assets/bg/warthunder-bg.mp4', start: 0, end: 126 },
  { src: '/assets/bg/warpath-bg.mp4', start: 0, end: 215 },
  { src: '/assets/bg/wait-for-me-bg.mp4', start: 0, end: 185 },
] as const;

interface WarVideoBackdropProps {
  opacity: number;
  className?: string;
}

export const WarVideoBackdrop: React.FC<WarVideoBackdropProps> = ({ opacity, className = '' }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const playVideo = () => {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Handled silently if waiting for interaction
        });
      }
    };

    playVideo();
  }, [activeIndex]);

  const handleEnded = () => {
    setActiveIndex((prev) => (prev + 1) % VIDEO_SEGMENTS.length);
  };

  return (
    <div
      className={`absolute inset-0 pointer-events-none transition-opacity duration-1000 ease-out ${className}`}
      style={{ opacity }}
      aria-hidden="true"
    >
      <video
        ref={videoRef}
        key={VIDEO_SEGMENTS[activeIndex].src}
        className="absolute inset-0 w-full h-full object-cover sepia contrast-125 brightness-75 saturate-[0.45]"
        src={VIDEO_SEGMENTS[activeIndex].src}
        muted
        playsInline
        autoPlay
        preload="auto"
        onEnded={handleEnded}
      />
      <div className="absolute inset-0 bg-[#6f5324]/25 mix-blend-color" />
      <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,rgba(255,255,255,0.07)_0,rgba(255,255,255,0.07)_1px,transparent_1px,transparent_4px)] opacity-35" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_34%,rgba(0,0,0,0.72)_100%)]" />
    </div>
  );
};
