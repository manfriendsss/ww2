import React from 'react';
import { motion } from 'framer-motion';
import { SlideData } from '../../../types/slide';
import { MapPin, Navigation, Compass, Globe, ArrowRight } from 'lucide-react';

interface TacticalMapSlideProps {
  slide: SlideData;
}

export const TacticalMapSlide: React.FC<TacticalMapSlideProps> = ({ slide }) => {
  const stops = slide.content.stops || [];

  return (
    <div className="flex flex-col justify-center h-full my-auto space-y-5 max-w-7xl mx-auto w-full">
      {/* Lead banner */}
      <div className="flex items-center justify-between p-3.5 sm:p-4 rounded-lg bg-[#1f2420] border border-[#3D493A] shadow-md">
        <div className="flex items-center gap-3.5">
          <div className="p-2 rounded bg-[#16181A] text-[#D4AF37] border border-[#3D493A]">
            <Compass size={22} />
          </div>
          <div>
            <span className="font-typewriter text-xs text-[#B89C62] uppercase tracking-wider block font-semibold">
              OPERATIONAL ITINERARY // 1941–1945
            </span>
            <p className="font-heading text-lg sm:text-xl text-[#F5F5F0] leading-snug">
              {slide.content.lead}
            </p>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-2 font-courier text-xs text-[#8c978e] bg-[#16181A] px-3 py-1.5 rounded border border-[#3D493A]">
          <Globe size={14} className="text-[#B89C62]" />
          <span>4 STRATEGIC PIVOTS</span>
        </div>
      </div>

      {/* Strategic timeline route breadcrumb */}
      <div className="hidden lg:flex items-center justify-between px-4 py-2 rounded bg-[#16181A]/60 border border-[#3D493A]/50 text-xs font-courier text-[#a39882]">
        <span className="flex items-center gap-1.5 text-[#D4AF37] font-bold">
          <span className="w-2 h-2 rounded-full bg-[#8B2626]" />
          Pacific Theater
        </span>
        <ArrowRight size={13} className="text-[#3D493A]" />
        <span className="flex items-center gap-1.5 text-[#D4AF37] font-bold">
          <span className="w-2 h-2 rounded-full bg-[#8B2626]" />
          Eastern Front
        </span>
        <ArrowRight size={13} className="text-[#3D493A]" />
        <span className="flex items-center gap-1.5 text-[#D4AF37] font-bold">
          <span className="w-2 h-2 rounded-full bg-[#8B2626]" />
          Western Front
        </span>
        <ArrowRight size={13} className="text-[#3D493A]" />
        <span className="flex items-center gap-1.5 text-[#D4AF37] font-bold">
          <span className="w-2 h-2 rounded-full bg-[#8B2626]" />
          European Climax
        </span>
      </div>

      {/* 4 Stops Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch">
        {stops.map((stop, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.15 + idx * 0.1 }}
            className="flex flex-col justify-between p-5 lg:p-6 rounded-lg bg-[#202521] border-2 border-[#3D493A] hover:border-[#8B2626] transition-all shadow-xl group relative overflow-hidden"
          >
            {/* Background Stop Number Watermark */}
            <div className="absolute -top-3 -right-2 text-7xl font-heading text-[#3D493A]/25 select-none pointer-events-none">
              0{stop.num}
            </div>

            <div>
              {/* Stop Badge & Coordinates */}
              <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#3D493A]">
                <span className="font-typewriter text-xs text-[#8B2626] font-bold tracking-widest uppercase flex items-center gap-1">
                  <MapPin size={12} className="text-[#8B2626]" />
                  STOP 0{stop.num}
                </span>
                <span className="font-courier text-xs text-[#B89C62] font-semibold">
                  {stop.date}
                </span>
              </div>

              {/* Title & Theater */}
              <h3 className="font-heading text-xl lg:text-2xl text-[#D4AF37] group-hover:text-[#F5F5F0] transition-colors uppercase leading-tight">
                {stop.name}
              </h3>
              <p className="font-typewriter text-xs text-[#a39882] mt-1 mb-3">
                {stop.theater}
              </p>

              {/* Coordinates Bar */}
              <div className="p-2.5 rounded bg-[#16181A] border border-[#3D493A]/80 mb-3">
                <span className="font-courier text-xs text-[#B89C62] block truncate">
                  GRID: {stop.coords}
                </span>
              </div>

              {/* Status / Tactical Summary */}
              <p className="font-body text-sm sm:text-base text-[#d1cbbe] leading-relaxed my-2">
                {stop.status}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-[#3D493A]/60 flex items-center justify-between text-xs font-courier text-[#8c978e]">
              <span className="flex items-center gap-1.5 text-[#8B2626] font-medium">
                <Navigation size={12} />
                ENGAGED
              </span>
              <span className="text-[#D4AF37] font-typewriter font-semibold">KEY TURNING POINT</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
