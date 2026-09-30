import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SpeakerNoteData } from '../../types/slide';
import { X, Clock } from 'lucide-react';

interface SpeakerNotesModalProps {
  isOpen: boolean;
  onClose: () => void;
  note: SpeakerNoteData;
  slideNumber: number;
}

export const SpeakerNotesModal: React.FC<SpeakerNotesModalProps> = ({
  isOpen,
  onClose,
  note,
  slideNumber,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="absolute bottom-16 left-6 right-6 z-40 bg-[#141715]/95 border-2 border-[#8B2626] rounded-md shadow-[0_15px_40px_rgba(0,0,0,0.85)] p-5 backdrop-blur-md max-h-[45vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#3D493A]">
            <div className="flex items-center gap-3">
              <div>
                <span className="font-typewriter text-xs text-[#8B2626] font-bold tracking-widest uppercase block">
                  SPEAKER NOTES
                </span>
                <span className="font-heading text-sm text-[#D4AF37]">
                  SLIDE {slideNumber} SCRIPT
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="font-courier text-xs text-[#B89C62] flex items-center gap-1.5 bg-[#16181A] px-2.5 py-1 rounded border border-[#3D493A]">
                <Clock size={12} />
                TIMING TARGET: {note.timing}
              </span>
              <button
                onClick={onClose}
                className="p-1 rounded text-[#8c978e] hover:text-[#F5F5F0] hover:bg-[#3D493A] transition-colors"
                title="Close Notes [N]"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          <div className="p-4 rounded bg-[#1c221e] border border-[#3D493A]">
            <p className="font-body text-base text-[#f5f5f0] leading-relaxed whitespace-pre-line">
              {note.scriptSnippet}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
