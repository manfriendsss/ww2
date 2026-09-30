import { useEffect, useState, useCallback, useRef } from 'react';

const CHANNEL_NAME = 'ww2_presentation_sync_channel';
const STORAGE_KEY = 'ww2_current_slide_index';
const SYNC_ENDPOINT = '/api/sync';

interface SyncMessage {
  type: 'SLIDE_CHANGE' | 'REQUEST_SYNC' | 'SYNC_STATE';
  index: number;
  sourceId: string;
}

export interface SlideSyncOptions {
  isPresenterNotes?: boolean;
  autoFollow?: boolean;
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

export function useSlideSync(
  initialIndex: number = 0,
  onRemoteChange?: (index: number) => void,
  options?: SlideSyncOptions
) {
  const isPresenterNotes = options?.isPresenterNotes ?? false;
  const autoFollow = options?.autoFollow ?? false;
  const autoFollowRef = useRef(autoFollow);
  autoFollowRef.current = autoFollow;

  const sourceIdRef = useRef<string>(
    typeof crypto !== 'undefined' && 'randomUUID' in crypto
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random()}`
  );
  const channelRef = useRef<BroadcastChannel | null>(null);
  const currentIndexRef = useRef<number>(initialIndex);
  const onRemoteChangeRef = useRef(onRemoteChange);
  const serverRevisionRef = useRef<number>(-1);
  const initialSyncedRef = useRef<boolean>(false);

  const [currentIndex, setCurrentIndex] = useState<number>(() => {
    return getInitialSlideIndex(initialIndex);
  });

  const [desktopIndex, setDesktopIndex] = useState<number>(currentIndex);
  const desktopIndexRef = useRef<number>(currentIndex);

  useEffect(() => {
    currentIndexRef.current = currentIndex;
  }, [currentIndex]);

  useEffect(() => {
    desktopIndexRef.current = desktopIndex;
  }, [desktopIndex]);

  useEffect(() => {
    onRemoteChangeRef.current = onRemoteChange;
  }, [onRemoteChange]);

  const broadcastChange = useCallback((newIndex: number) => {
    setCurrentIndex(newIndex);
    currentIndexRef.current = newIndex;
    setDesktopIndex(newIndex);
    desktopIndexRef.current = newIndex;

    try {
      localStorage.setItem(STORAGE_KEY, newIndex.toString());
    } catch {}

    fetch(SYNC_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ index: newIndex }),
    })
      .then((response) => (response.ok ? response.json() : null))
      .then((data: { revision?: number } | null) => {
        if (data && Number.isFinite(data.revision)) {
          serverRevisionRef.current = Number(data.revision);
        }
      })
      .catch(() => {
        // Preview builds or offline fallback
      });

    if (channelRef.current) {
      try {
        channelRef.current.postMessage({
          type: 'SLIDE_CHANGE',
          index: newIndex,
          sourceId: sourceIdRef.current,
        } satisfies SyncMessage);
      } catch (err) {
        console.error('BroadcastChannel error:', err);
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
      const channel = new BroadcastChannel(CHANNEL_NAME);
      channelRef.current = channel;

      channel.onmessage = (event: MessageEvent<SyncMessage>) => {
        const data = event.data;
        if (!data || data.sourceId === sourceIdRef.current) return;

        if (data && (data.type === 'SLIDE_CHANGE' || data.type === 'SYNC_STATE')) {
          setDesktopIndex(data.index);
          desktopIndexRef.current = data.index;

          // If not in presenter notes mode, or auto-follow is active, adopt the change
          if (!isPresenterNotes || autoFollowRef.current) {
            setCurrentIndex(data.index);
            currentIndexRef.current = data.index;
            try {
              localStorage.setItem(STORAGE_KEY, data.index.toString());
            } catch {}
            onRemoteChangeRef.current?.(data.index);
          }
        } else if (data && data.type === 'REQUEST_SYNC') {
          channel.postMessage({
            type: 'SYNC_STATE',
            index: currentIndexRef.current,
            sourceId: sourceIdRef.current,
          } satisfies SyncMessage);
        }
      };

      channel.postMessage({
        type: 'REQUEST_SYNC',
        index: currentIndexRef.current,
        sourceId: sourceIdRef.current,
      } satisfies SyncMessage);
    }

    const handleStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && e.newValue !== null) {
        const newIdx = parseInt(e.newValue, 10);
        if (Number.isFinite(newIdx)) {
          setDesktopIndex(newIdx);
          desktopIndexRef.current = newIdx;

          if (!isPresenterNotes || autoFollowRef.current) {
            if (newIdx !== currentIndexRef.current) {
              setCurrentIndex(newIdx);
              currentIndexRef.current = newIdx;
              onRemoteChangeRef.current?.(newIdx);
            }
          }
        }
      }
    };

    window.addEventListener('storage', handleStorage);

    return () => {
      channelRef.current?.close();
      channelRef.current = null;
      window.removeEventListener('storage', handleStorage);
    };
  }, [isPresenterNotes]);

  useEffect(() => {
    const isNotesUrl = typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('mode') === 'notes';
    const hasUrlSlide = typeof window !== 'undefined' && (
      new URLSearchParams(window.location.search).has('slide') || 
      new URLSearchParams(window.location.search).has('index')
    );

    // Initial mount sync
    fetch(SYNC_ENDPOINT)
      .then((response) => (response.ok ? response.json() : null))
      .then((data: { index?: number; revision?: number } | null) => {
        if (!data || !Number.isFinite(data.index) || !Number.isFinite(data.revision)) return;

        const revision = Number(data.revision);
        const serverIndex = Number(data.index);
        serverRevisionRef.current = revision;
        setDesktopIndex(serverIndex);
        desktopIndexRef.current = serverIndex;

        if (hasUrlSlide) {
          // If URL explicitly had a slide param, broadcast that to server
          broadcastChange(currentIndexRef.current);
          initialSyncedRef.current = true;
        } else if (isNotesUrl || isPresenterNotes) {
          // On initial connection in notes mode: align with active server slide
          if (!initialSyncedRef.current) {
            initialSyncedRef.current = true;
            if (serverIndex !== currentIndexRef.current) {
              setCurrentIndex(serverIndex);
              currentIndexRef.current = serverIndex;
              try {
                localStorage.setItem(STORAGE_KEY, serverIndex.toString());
              } catch {}
              onRemoteChangeRef.current?.(serverIndex);
            }
          }
        } else {
          // Main presentation deck: initialize server with current deck index
          broadcastChange(currentIndexRef.current);
          initialSyncedRef.current = true;
        }
      })
      .catch(() => {});

    // Polling interval for updates from remote / server
    const interval = window.setInterval(() => {
      fetch(SYNC_ENDPOINT)
        .then((response) => (response.ok ? response.json() : null))
        .then((data: { index?: number; revision?: number } | null) => {
          if (!data || !Number.isFinite(data.index) || !Number.isFinite(data.revision)) return;

          const revision = Number(data.revision);
          const nextIndex = Number(data.index);

          // If revision hasn't changed, nothing new from server
          if (revision === serverRevisionRef.current) return;

          serverRevisionRef.current = revision;
          setDesktopIndex(nextIndex);
          desktopIndexRef.current = nextIndex;

          // For presenter notes: only auto-jump if autoFollow is enabled
          if (!isPresenterNotes || autoFollowRef.current) {
            if (nextIndex !== currentIndexRef.current) {
              setCurrentIndex(nextIndex);
              currentIndexRef.current = nextIndex;
              try {
                localStorage.setItem(STORAGE_KEY, nextIndex.toString());
              } catch {}
              onRemoteChangeRef.current?.(nextIndex);
            }
          }
        })
        .catch(() => {});
    }, 400);

    return () => window.clearInterval(interval);
  }, [broadcastChange, isPresenterNotes]);

  return {
    currentIndex,
    setCurrentIndex: broadcastChange,
    desktopIndex,
    isSynced: currentIndex === desktopIndex,
    syncToDesktop: () => broadcastChange(desktopIndexRef.current),
  };
}
