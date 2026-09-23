import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { PATHS, TOPIC_COUNT } from '../data/paths';
import { topicId } from './content';
import { pull, push, readCode, writeCode } from './sync';

const STORAGE_KEY = 'fe-path-progress-v1';
const CHAT_KEY = 'claude-chat-url';

type DoneMap = Record<string, true>;

export type SyncStatus = 'off' | 'loading' | 'saved' | 'error';

function read(): DoneMap {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as DoneMap) : {};
  } catch {
    return {};
  }
}

function readChat(): string {
  try {
    return localStorage.getItem(CHAT_KEY) ?? '';
  } catch {
    return '';
  }
}

interface ProgressValue {
  isDone: (id: string) => boolean;
  toggle: (id: string) => void;
  doneInPath: (pathId: string) => number;
  totalDone: number;
  totalTopics: number;
  reset: () => void;
  chat: string;
  setChat: (url: string) => void;
  syncCode: string;
  setSyncCode: (code: string) => void;
  syncStatus: SyncStatus;
}

const ProgressContext = createContext<ProgressValue | null>(null);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [done, setDone] = useState<DoneMap>(read);
  const [chat, setChat] = useState(readChat);
  const [syncCode, setCode] = useState(readCode);
  const [syncStatus, setSyncStatus] = useState<SyncStatus>(syncCode ? 'loading' : 'off');
  const loaded = useRef(false);
  const pending = useRef<number | undefined>(undefined);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(done));
      if (chat) localStorage.setItem(CHAT_KEY, chat);
      else localStorage.removeItem(CHAT_KEY);
    } catch {
    }
  }, [done, chat]);

  useEffect(() => {
    loaded.current = false;
    if (!syncCode) {
      setSyncStatus('off');
      return;
    }
    let cancelled = false;

    async function load(first: boolean) {
      if (!first && pending.current !== undefined) return; // göndərilməmiş dəyişiklik var
      if (first) setSyncStatus('loading');
      try {
        const doc = await pull(syncCode);
        if (cancelled) return;
        if (doc) {
          setDone(doc.done ?? {});
          setChat(doc.chat ?? '');
        } else if (first) {
          await push(syncCode, { done: read(), chat: readChat() });
        }
        loaded.current = true;
        setSyncStatus('saved');
      } catch {
        if (!cancelled) setSyncStatus('error');
      }
    }

    load(true);
    const onVisible = () => {
      if (document.visibilityState === 'visible') load(false);
    };
    document.addEventListener('visibilitychange', onVisible);
    return () => {
      cancelled = true;
      document.removeEventListener('visibilitychange', onVisible);
    };
  }, [syncCode]);

  useEffect(() => {
    if (!syncCode || !loaded.current) return;
    window.clearTimeout(pending.current);
    pending.current = window.setTimeout(async () => {
      try {
        await push(syncCode, { done, chat });
        setSyncStatus('saved');
      } catch {
        setSyncStatus('error');
      } finally {
        pending.current = undefined;
      }
    }, 800);
  }, [done, chat, syncCode]);

  const setSyncCode = useCallback((code: string) => {
    writeCode(code);
    setCode(code);
  }, []);

  const toggle = useCallback((id: string) => {
    setDone((prev) => {
      const next = { ...prev };
      if (next[id]) delete next[id];
      else next[id] = true;
      return next;
    });
  }, []);

  const value = useMemo<ProgressValue>(() => {
    const isDone = (id: string) => Boolean(done[id]);
    return {
      isDone,
      toggle,
      doneInPath: (pathId: string) => {
        const path = PATHS.find((p) => p.id === pathId);
        if (!path) return 0;
        return path.topics.filter((_, i) => isDone(topicId(pathId, i))).length;
      },
      totalDone: Object.keys(done).filter((k) => !k.startsWith('book.')).length,
      totalTopics: TOPIC_COUNT,
      reset: () => setDone({}),
      chat,
      setChat,
      syncCode,
      setSyncCode,
      syncStatus
    };
  }, [done, toggle, chat, syncCode, setSyncCode, syncStatus]);

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export function useProgress(): ProgressValue {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error('useProgress must be used inside ProgressProvider');
  return ctx;
}
