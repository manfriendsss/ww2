import { useEffect, useState, useCallback, useRef } from 'react';
import { slidesData } from '../data/slidesData';

const CHANNEL_NAME = 'ww2_presentation_sync_channel';
const STORAGE_KEY = 'ww2_current_slide_index';
const STORAGE_STEP_KEY = 'ww2_current_slide_step';

interface SyncMessage {
  type: 'SLIDE_CHANGE' | 'REQUEST_SYNC' | 'SYNC_STATE';
  index: number;
  step: number;
  sourceId: string;
}

export function getMaxStepsForSlide(slideIndex: number): number {
  const slide = slidesData[slideIndex];
  if (!slide) return 0;
  // Slide 2 has id: 2, 4 sub-steps
  if (slide.id === 2) return 4;
  // Slide with cinematic video overlay has 1 sub-step (step 1 = open video overlay)
  if (slide.cinematicVideo) return 1;
  return 0;
}

function getInitialSlideIndex(defaultIndex: number): number {
  if (typeof window === 'undefined') return defaultIndex;

  try {
    const params = new URLSearchParams(window.location.search);

    // 1-based slide index: ?slide=1 -> index 0
    const slideParam = params.get('slide');
    if (slideParam !== null) {
      const s = parseInt(slideParam, 10);
      if (Number.isFinite(s) && s >= 1) {
        const idx = s - 1;
        try {
          localStorage.setItem(STORAGE_KEY, idx.toString());
        } catch {}
        return idx;
      }
    }

    // 0-based slide index: ?index=0 -> index 0
    const indexParam = params.get('index');
    if (indexParam !== null) {
      const i = parseInt(indexParam, 10);
      if (Number.isFinite(i) && i >= 0) {
        try {
          localStorage.setItem(STORAGE_KEY, i.toString());
        } catch {}
        return i;
      }
    }

    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved !== null) {
      const parsed = parseInt(saved, 10);
      if (Number.isFinite(parsed) && parsed >= 0) {
        return parsed;
      }
    }
  } catch {}

  return defaultIndex;
}

function getInitialSlideStep(slideIndex: number): number {
  if (typeof window === 'undefined') return 0;

  try {
    const params = new URLSearchParams(window.location.search);
    const stepParam = params.get('step');
    if (stepParam !== null) {
      const s = parseInt(stepParam, 10);
      if (Number.isFinite(s) && s >= 0) {
        return Math.min(s, getMaxStepsForSlide(slideIndex));
      }
    }

    const saved = localStorage.getItem(STORAGE_STEP_KEY);
    if (saved !== null) {
      const parsed = parseInt(saved, 10);
      if (Number.isFinite(parsed) && parsed >= 0) {
        return Math.min(parsed, getMaxStepsForSlide(slideIndex));
      }
    }
  } catch {}

  return 0;
}

export function useSlideSync(
  initialIndex: number = 0,
  onRemoteChange?: (index: number, step: number) => void
) {
  const sourceIdRef = useRef<string>(
    typeof crypto !== 'undefined' && 'randomUUID' in crypto
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random()}`
  );
  const channelRef = useRef<BroadcastChannel | null>(null);
  const currentIndexRef = useRef<number>(initialIndex);
  const currentStepRef = useRef<number>(0);
  const onRemoteChangeRef = useRef(onRemoteChange);

  const [currentIndex, setCurrentIndex] = useState<number>(() => {
    return getInitialSlideIndex(initialIndex);
  });

  const [currentStep, setCurrentStep] = useState<number>(() => {
    const initialSlideIdx = getInitialSlideIndex(initialIndex);
    return getInitialSlideStep(initialSlideIdx);
  });

  useEffect(() => {
    currentIndexRef.current = currentIndex;
  }, [currentIndex]);

  useEffect(() => {
    currentStepRef.current = currentStep;
  }, [currentStep]);

  useEffect(() => {
    onRemoteChangeRef.current = onRemoteChange;
  }, [onRemoteChange]);

  const broadcastChange = useCallback((newIndex: number, newStep: number = 0) => {
    setCurrentIndex(newIndex);
    setCurrentStep(newStep);
    currentIndexRef.current = newIndex;
    currentStepRef.current = newStep;

    try {
      localStorage.setItem(STORAGE_KEY, newIndex.toString());
      localStorage.setItem(STORAGE_STEP_KEY, newStep.toString());
    } catch {}

    if (channelRef.current) {
      try {
        channelRef.current.postMessage({
          type: 'SLIDE_CHANGE',
          index: newIndex,
          step: newStep,
          sourceId: sourceIdRef.current,
        } satisfies SyncMessage);
      } catch (err) {
        console.error('BroadcastChannel error:', err);
      }
    }
  }, []);

  const handleNext = useCallback(() => {
    const idx = currentIndexRef.current;
    const step = currentStepRef.current;
    const maxSteps = getMaxStepsForSlide(idx);

    if (maxSteps > 0 && step < maxSteps) {
      const nextStep = step + 1;
      broadcastChange(idx, nextStep);
      return;
    }

    if (idx < slidesData.length - 1) {
      const nextIndex = idx + 1;
      broadcastChange(nextIndex, 0);
    }
  }, [broadcastChange]);

  const handlePrev = useCallback(() => {
    const idx = currentIndexRef.current;
    const step = currentStepRef.current;
    const maxSteps = getMaxStepsForSlide(idx);

    if (maxSteps > 0 && step > 0) {
      const prevStep = step - 1;
      broadcastChange(idx, prevStep);
      return;
    }

    if (idx > 0) {
      const prevIndex = idx - 1;
      const targetMaxSteps = getMaxStepsForSlide(prevIndex);
      broadcastChange(prevIndex, targetMaxSteps);
    }
  }, [broadcastChange]);

  const handleGoto = useCallback(
    (targetIndex: number, targetStep: number = 0) => {
      if (targetIndex >= 0 && targetIndex < slidesData.length) {
        broadcastChange(targetIndex, targetStep);
      }
    },
    [broadcastChange]
  );

  // Keep optional same-browser tabs in sync without any network calls.
  useEffect(() => {
    if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
      const channel = new BroadcastChannel(CHANNEL_NAME);
      channelRef.current = channel;

      channel.onmessage = (event: MessageEvent<SyncMessage>) => {
        const data = event.data;
        if (!data || data.sourceId === sourceIdRef.current) return;

        if (data && (data.type === 'SLIDE_CHANGE' || data.type === 'SYNC_STATE')) {
          const nextIndex = data.index;
          const nextStep = typeof data.step === 'number' && Number.isFinite(data.step) ? data.step : 0;
          if (nextIndex !== currentIndexRef.current || nextStep !== currentStepRef.current) {
            setCurrentIndex(nextIndex);
            setCurrentStep(nextStep);
            currentIndexRef.current = nextIndex;
            currentStepRef.current = nextStep;
            try {
              localStorage.setItem(STORAGE_KEY, nextIndex.toString());
              localStorage.setItem(STORAGE_STEP_KEY, nextStep.toString());
            } catch {}
            onRemoteChangeRef.current?.(nextIndex, nextStep);
          }
        } else if (data && data.type === 'REQUEST_SYNC') {
          channel.postMessage({
            type: 'SYNC_STATE',
            index: currentIndexRef.current,
            step: currentStepRef.current,
            sourceId: sourceIdRef.current,
          } satisfies SyncMessage);
        }
      };

      channel.postMessage({
        type: 'REQUEST_SYNC',
        index: currentIndexRef.current,
        step: currentStepRef.current,
        sourceId: sourceIdRef.current,
      } satisfies SyncMessage);
    }

    const handleStorage = (e: StorageEvent) => {
      if ((e.key === STORAGE_KEY || e.key === STORAGE_STEP_KEY) && e.newValue !== null) {
        const savedIndex = localStorage.getItem(STORAGE_KEY);
        const savedStep = localStorage.getItem(STORAGE_STEP_KEY);
        const newIdx = savedIndex !== null ? parseInt(savedIndex, 10) : currentIndexRef.current;
        const newStep = savedStep !== null ? parseInt(savedStep, 10) : 0;
        if (Number.isFinite(newIdx) && (newIdx !== currentIndexRef.current || newStep !== currentStepRef.current)) {
          setCurrentIndex(newIdx);
          setCurrentStep(newStep);
          currentIndexRef.current = newIdx;
          currentStepRef.current = newStep;
          onRemoteChangeRef.current?.(newIdx, newStep);
        }
      }
    };

    window.addEventListener('storage', handleStorage);

    return () => {
      channelRef.current?.close();
      channelRef.current = null;
      window.removeEventListener('storage', handleStorage);
    };
  }, []);

  return {
    currentIndex,
    currentStep,
    setCurrentIndex: (index: number, step?: number) => broadcastChange(index, step ?? 0),
    setCurrentStep: (step: number) => broadcastChange(currentIndexRef.current, step),
    handleNext,
    handlePrev,
    handleGoto,
  };
}
