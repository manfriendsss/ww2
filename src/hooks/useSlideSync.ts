import { useEffect, useState, useCallback, useRef } from 'react';

const CHANNEL_NAME = 'ww2_presentation_sync_channel';
const STORAGE_KEY = 'ww2_current_slide_index';
const SYNC_ENDPOINT = '/api/sync';

interface SyncMessage {
  type: 'SLIDE_CHANGE' | 'REQUEST_SYNC' | 'SYNC_STATE';
  index: number;
  sourceId: string;
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
  const serverRevisionRef = useRef<number>(0);

  const [currentIndex, setCurrentIndex] = useState<number>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    const parsed = saved !== null ? parseInt(saved, 10) : initialIndex;
    return Number.isFinite(parsed) ? parsed : initialIndex;
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
    localStorage.setItem(STORAGE_KEY, newIndex.toString());

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
        // Static preview builds do not expose the LAN sync endpoint.
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
          setCurrentIndex(data.index);
          currentIndexRef.current = data.index;
          localStorage.setItem(STORAGE_KEY, data.index.toString());
          onRemoteChangeRef.current?.(data.index);
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

  useEffect(() => {
    const isNotesMode = new URLSearchParams(window.location.search).get('mode') === 'notes';

    if (!isNotesMode) {
      window.setTimeout(() => {
        fetch(SYNC_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ index: currentIndexRef.current }),
        })
          .then((response) => (response.ok ? response.json() : null))
          .then((data: { revision?: number } | null) => {
            if (data && Number.isFinite(data.revision)) {
              serverRevisionRef.current = Number(data.revision);
            }
          })
          .catch(() => {});
      }, 250);
    }

    const interval = window.setInterval(() => {
      fetch(SYNC_ENDPOINT)
        .then((response) => (response.ok ? response.json() : null))
        .then((data: { index?: number; revision?: number } | null) => {
          if (!data || !Number.isFinite(data.index) || !Number.isFinite(data.revision)) return;

          const revision = Number(data.revision);
          const nextIndex = Number(data.index);
          if (revision <= serverRevisionRef.current) return;

          serverRevisionRef.current = revision;
          if (nextIndex !== currentIndexRef.current) {
            setCurrentIndex(nextIndex);
            currentIndexRef.current = nextIndex;
            localStorage.setItem(STORAGE_KEY, nextIndex.toString());
            onRemoteChangeRef.current?.(nextIndex);
          }
        })
        .catch(() => {});
    }, 450);

    return () => window.clearInterval(interval);
  }, []);

  return {
    currentIndex,
    setCurrentIndex: broadcastChange,
  };
}
