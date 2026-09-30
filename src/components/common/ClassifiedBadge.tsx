import React from 'react';
import { motion } from 'framer-motion';

interface ClassifiedBadgeProps {
  label: string;
  variant?: 'red' | 'brass' | 'olive';
  size?: 'sm' | 'md' | 'lg';
  rotation?: number;
  className?: string;
}

export const ClassifiedBadge: React.FC<ClassifiedBadgeProps> = ({
  label,
  variant = 'red',
  size = 'md',
  rotation = -2,
  className = '',
}) => {
  const colorStyles = {
    red: 'border-[#8B2626] text-[#c93b3b] bg-[#8B2626]/10 shadow-[0_0_15px_rgba(139,38,38,0.2)]',
    brass: 'border-[#B89C62] text-[#D4AF37] bg-[#B89C62]/10 shadow-[0_0_15px_rgba(184,156,98,0.2)]',
    olive: 'border-[#3D493A] text-[#7d9b76] bg-[#3D493A]/20 shadow-[0_0_15px_rgba(61,73,58,0.2)]',
  }[variant];

  const sizeStyles = {
    sm: 'text-xs px-2 py-0.5 tracking-wider border',
    md: 'text-sm px-3 py-1 tracking-widest border-2',
    lg: 'text-base px-4 py-1.5 tracking-widest border-2 font-bold',
  }[size];

  return (
    <motion.div
      initial={{ scale: 1.3, opacity: 0, rotate: rotation * 2 }}
      animate={{ scale: 1, opacity: 1, rotate: rotation }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className={`font-typewriter uppercase inline-flex items-center select-none rounded-[2px] ${colorStyles} ${sizeStyles} ${className}`}
    >
      <span className="opacity-70 mr-1.5 text-[0.8em]">★</span>
      {label}
      <span className="opacity-70 ml-1.5 text-[0.8em]">★</span>
    </motion.div>
  );
};
