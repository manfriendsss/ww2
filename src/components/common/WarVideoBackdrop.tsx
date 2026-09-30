import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const WAR_VIDEO_FADE_SECONDS = 3;
const VIDEO_SEGMENTS = [
  { src: '/assets/bg/warthunder-bg.mp4', start: 0, end: 126 },
  { src: '/assets/bg/warpath-bg.mp4', start: 0, end: 215 },
  { src: '/assets/bg/wait-for-me-bg.mp4', start: 0, end: 185 },
] as const;

const PLAYLIST_DURATION = VIDEO_SEGMENTS.reduce(
  (total, segment) => total + segment.end - segment.start,
  0
);
let warVideoAnchorMs = Date.now();

interface WarVideoBackdropProps {
  opacity: number;
}

export const WarVideoBackdrop: React.FC<WarVideoBackdropProps> = ({ opacity }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [loopFade, setLoopFade] = useState(1);
  const [activeIndex, setActiveIndex] = useState(0);

  const getPlaylistPosition = () => {
    const elapsedSeconds = ((Date.now() - warVideoAnchorMs) / 1000) % PLAYLIST_DURATION;
    let cursor = elapsedSeconds;

    for (let index = 0; index < VIDEO_SEGMENTS.length; index += 1) {
      const segment = VIDEO_SEGMENTS[index];
      const duration = segment.end - segment.start;
      if (cursor <= duration) {
        return {
          index,
          segment,
          offset: cursor,
          time: segment.start + cursor,
          timeLeft: duration - cursor,
        };
      }
      cursor -= duration;
    }

    const segment = VIDEO_SEGMENTS[0];
    return {
      index: 0,
      segment,
      offset: 0,
      time: segment.start,
      timeLeft: segment.end - segment.start,
    };
  };

  const syncToPlaylist = () => {
    const position = getPlaylistPosition();
    setActiveIndex(position.index);
    const fadeIn = Math.min(1, position.offset / WAR_VIDEO_FADE_SECONDS);
    const fadeOut = Math.min(1, position.timeLeft / WAR_VIDEO_FADE_SECONDS);
    setLoopFade(Math.max(0, Math.min(fadeIn, fadeOut)));
    return position;
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const syncSegment = () => {
      const position = syncToPlaylist();
      video.currentTime = position.time;
      void video.play();
    };

    const handleTimeUpdate = () => {
      const segment = VIDEO_SEGMENTS[activeIndex];
      const offset = video.currentTime - segment.start;
      const timeLeft = segment.end - video.currentTime;
      const fadeIn = Math.min(1, Math.max(0, offset / WAR_VIDEO_FADE_SECONDS));
      const fadeOut = Math.min(1, Math.max(0, timeLeft / WAR_VIDEO_FADE_SECONDS));
      setLoopFade(Math.min(fadeIn, fadeOut));

      if (video.currentTime >= segment.end) {
        const wasLastSegment = activeIndex === VIDEO_SEGMENTS.length - 1;
        if (wasLastSegment) {
          warVideoAnchorMs = Date.now();
        }
        const nextIndex = wasLastSegment ? 0 : activeIndex + 1;
        setLoopFade(0);
        setActiveIndex(nextIndex);
      }
    };

    const syncInterval = window.setInterval(() => {
      const position = getPlaylistPosition();
      if (position.index !== activeIndex) {
        setActiveIndex(position.index);
      }
    }, 500);

    video.addEventListener('loadedmetadata', syncSegment);
    video.addEventListener('timeupdate', handleTimeUpdate);
    return () => {
      window.clearInterval(syncInterval);
      video.removeEventListener('loadedmetadata', syncSegment);
      video.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [activeIndex]);

  return (
    <motion.div
      className="absolute inset-0 pointer-events-none"
      style={{ opacity: opacity * loopFade }}
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
        onLoadedMetadata={(event) => {
          event.currentTarget.currentTime = getPlaylistPosition().time;
          void event.currentTarget.play();
        }}
      />
      <div className="absolute inset-0 bg-[#6f5324]/25 mix-blend-color" />
      <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,rgba(255,255,255,0.07)_0,rgba(255,255,255,0.07)_1px,transparent_1px,transparent_4px)] opacity-35" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_34%,rgba(0,0,0,0.72)_100%)]" />
    </motion.div>
  );
};
