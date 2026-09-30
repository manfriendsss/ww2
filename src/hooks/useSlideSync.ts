import { useEffect, useState, useCallback, useRef } from 'react';

const CHANNEL_NAME = 'ww2_presentation_sync_channel';
const STORAGE_KEY = 'ww2_current_slide_index';
const SYNC_ENDPOINT = '/api/sync';
const COMMAND_ENDPOINT = '/api/command';

interface SyncMessage {
  type: 'SLIDE_CHANGE' | 'REQUEST_SYNC' | 'SYNC_STATE';
  index: number;
  sourceId: string;
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
  onRemoteChange?: (index: number) => void
) {
  const sourceIdRef = useRef<string>(
    typeof crypto !== 'undefined' && 'randomUUID' in crypto
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random()}`
  );
  const channelRef = useRef<BroadcastChannel | null>(null);
  const currentIndexRef = useRef<number>(initialIndex);
  const onRemoteChangeRef = useRef(onRemoteChange);
  const serverRevisionRef = useRef<number>(-1);

  const [currentIndex, setCurrentIndex] = useState<number>(() => {
    return getInitialSlideIndex(initialIndex);
  });

  useEffect(() => {
    currentIndexRef.current = currentIndex;
  }, [currentIndex]);

  useEffect(() => {
    onRemoteChangeRef.current = onRemoteChange;
  }, [onRemoteChange]);

  const broadcastChange = useCallback((newIndex: number) => {
    setCurrentIndex(newIndex);
    currentIndexRef.current = newIndex;

    try {
      localStorage.setItem(STORAGE_KEY, newIndex.toString());
    } catch {}

    // 1. BroadcastChannel: Instant (<1ms) synchronization between open tabs/windows
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

    // 2. Network sync endpoint for remote / mobile devices
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
      .catch(() => {});

    // 3. Command endpoint backup
    fetch(COMMAND_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'goto', index: newIndex }),
    }).catch(() => {});
  }, []);

  // Set up BroadcastChannel and localStorage listeners for instant cross-window sync
  useEffect(() => {
    if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
      const channel = new BroadcastChannel(CHANNEL_NAME);
      channelRef.current = channel;

      channel.onmessage = (event: MessageEvent<SyncMessage>) => {
        const data = event.data;
        if (!data || data.sourceId === sourceIdRef.current) return;

        if (data && (data.type === 'SLIDE_CHANGE' || data.type === 'SYNC_STATE')) {
          const nextIndex = data.index;
          if (nextIndex !== currentIndexRef.current) {
            setCurrentIndex(nextIndex);
            currentIndexRef.current = nextIndex;
            try {
              localStorage.setItem(STORAGE_KEY, nextIndex.toString());
            } catch {}
            onRemoteChangeRef.current?.(nextIndex);
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
        if (Number.isFinite(newIdx) && newIdx !== currentIndexRef.current) {
          setCurrentIndex(newIdx);
          currentIndexRef.current = newIdx;
          onRemoteChangeRef.current?.(newIdx);
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

  // Initial server sync on mount + network polling for mobile / cross-device
  useEffect(() => {
    const isNotesUrl = typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('mode') === 'notes';
    const hasUrlSlide = typeof window !== 'undefined' && (
      new URLSearchParams(window.location.search).has('slide') || 
      new URLSearchParams(window.location.search).has('index')
    );

    // Initial mount sync: Connect to server state
    fetch(SYNC_ENDPOINT)
      .then((response) => (response.ok ? response.json() : null))
      .then((data: { index?: number; revision?: number } | null) => {
        if (!data || !Number.isFinite(data.index) || !Number.isFinite(data.revision)) return;

        const revision = Number(data.revision);
        const serverIndex = Number(data.index);
        serverRevisionRef.current = revision;

        if (hasUrlSlide) {
          // If URL explicitly had a slide param, broadcast that to server
          broadcastChange(currentIndexRef.current);
        } else if (isNotesUrl) {
          // Presenter console opened without URL slide param: adopt active presentation slide
          if (serverIndex !== currentIndexRef.current) {
            setCurrentIndex(serverIndex);
            currentIndexRef.current = serverIndex;
            try {
              localStorage.setItem(STORAGE_KEY, serverIndex.toString());
            } catch {}
            onRemoteChangeRef.current?.(serverIndex);
          }
        } else {
          // Main presentation deck: initialize server with current deck index
          broadcastChange(currentIndexRef.current);
        }
      })
      .catch(() => {});

    // Polling interval for updates from remote / server (every 300ms)
    const interval = window.setInterval(() => {
      fetch(SYNC_ENDPOINT)
        .then((response) => (response.ok ? response.json() : null))
        .then((data: { index?: number; revision?: number } | null) => {
          if (!data || !Number.isFinite(data.index) || !Number.isFinite(data.revision)) return;

          const revision = Number(data.revision);
          const nextIndex = Number(data.index);

          // If revision hasn't changed, ignore
          if (revision === serverRevisionRef.current) return;

          serverRevisionRef.current = revision;
          if (nextIndex !== currentIndexRef.current) {
            setCurrentIndex(nextIndex);
            currentIndexRef.current = nextIndex;
            try {
              localStorage.setItem(STORAGE_KEY, nextIndex.toString());
            } catch {}
            onRemoteChangeRef.current?.(nextIndex);
          }
        })
        .catch(() => {});
    }, 300);

    return () => window.clearInterval(interval);
  }, [broadcastChange]);

  return {
    currentIndex,
    setCurrentIndex: broadcastChange,
  };
}
