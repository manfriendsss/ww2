import React from 'react';
import { motion } from 'framer-motion';
import { SlideData } from '../../../types/slide';
import { MapPin, Navigation, Compass, Globe } from 'lucide-react';

interface TacticalMapSlideProps {
  slide: SlideData;
}

export const TacticalMapSlide: React.FC<TacticalMapSlideProps> = ({ slide }) => {
  const stops = slide.content.stops || [];

  return (
    <div className="flex flex-col h-full justify-between space-y-6">
      {/* Lead banner */}
      <div className="flex items-center justify-between p-3 rounded bg-[#1f2420] border border-[#3D493A]">
        <div className="flex items-center gap-3">
          <Compass size={22} className="text-[#D4AF37]" />
          <div>
            <span className="font-typewriter text-xs text-[#B89C62] uppercase tracking-wider block">
              OPERATIONAL ITINERARY // 1941–1945
            </span>
            <p className="font-heading text-lg text-[#F5F5F0]">
              {slide.content.lead}
            </p>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-2 font-courier text-xs text-[#8c978e]">
          <Globe size={14} className="text-[#B89C62]" />
          <span>4 STRATEGIC PIVOTS</span>
        </div>
      </div>

      {/* 4 Stops Grid / Timeline */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 flex-1 items-stretch">
        {stops.map((stop, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.15 + idx * 0.1 }}
            className="flex flex-col justify-between p-5 rounded bg-[#202521] border-2 border-[#3D493A] hover:border-[#8B2626] transition-all shadow-xl group relative overflow-hidden"
          >
            {/* Background Stop Number Watermark */}
            <div className="absolute -top-3 -right-2 text-7xl font-heading text-[#3D493A]/30 select-none pointer-events-none">
              0{stop.num}
            </div>

            <div>
              {/* Stop Badge & Coordinates */}
              <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#3D493A]">
                <span className="font-typewriter text-xs text-[#8B2626] font-bold tracking-widest uppercase flex items-center gap-1">
                  <MapPin size={12} className="text-[#8B2626]" />
                  STOP 0{stop.num}
                </span>
                <span className="font-courier text-[10px] text-[#B89C62]">
                  {stop.date}
                </span>
              </div>

              {/* Title & Theater */}
              <h3 className="font-heading text-xl text-[#D4AF37] group-hover:text-[#F5F5F0] transition-colors uppercase leading-tight">
                {stop.name}
              </h3>
              <p className="font-typewriter text-xs text-[#8c978e] mt-1 mb-3">
                {stop.theater}
              </p>

              {/* Coordinates Bar */}
              <div className="p-2 rounded bg-[#16181A] border border-[#3D493A]/70 mb-3">
                <span className="font-courier text-[11px] text-[#B89C62] block truncate">
                  GRID: {stop.coords}
                </span>
              </div>

              {/* Status / Tactical Summary */}
              <p className="font-body text-sm text-[#d1cbbe] leading-relaxed">
                {stop.status}
              </p>
            </div>

            <div className="mt-4 pt-2 border-t border-[#3D493A]/50 flex items-center justify-between text-xs font-courier text-[#8c978e]">
              <span className="flex items-center gap-1 text-[#8B2626]">
                <Navigation size={12} />
                ENGAGED
              </span>
              <span className="text-[#D4AF37] font-typewriter">KEY TURNING POINT</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
