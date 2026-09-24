import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { useProgress } from './useProgress';

const TIMER_KEY = 'fe-reading-timer';
export const MIN_SESSION_MS = 10_000;

export interface TimerState {
  book: string;
  ch: string;
  firstStart: number;
  runningSince: number | null;
  acc: number;
}

function readTimer(): TimerState | null {
  try {
    const raw = localStorage.getItem(TIMER_KEY);
    return raw ? (JSON.parse(raw) as TimerState) : null;
  } catch {
    return null;
  }
}

function writeTimer(state: TimerState | null) {
  try {
    if (state) localStorage.setItem(TIMER_KEY, JSON.stringify(state));
    else localStorage.removeItem(TIMER_KEY);
  } catch {
  }
}

export function elapsedOf(state: TimerState | null, now = Date.now()): number {
  if (!state) return 0;
  return state.acc + (state.runningSince === null ? 0 : now - state.runningSince);
}

interface TimerValue {
  timer: TimerState | null;
  start: (book: string, ch: string) => void;
  pause: () => void;
  resume: () => void;
  finish: () => boolean;
  discard: () => void;
}

const TimerContext = createContext<TimerValue | null>(null);

export function ReadingTimerProvider({ children }: { children: ReactNode }) {
  const { addLog } = useProgress();
  const [timer, setTimerState] = useState<TimerState | null>(readTimer);

  const setTimer = useCallback((next: TimerState | null) => {
    writeTimer(next);
    setTimerState(next);
  }, []);

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === TIMER_KEY) setTimerState(readTimer());
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const save = useCallback(
    (state: TimerState | null): boolean => {
      const ms = elapsedOf(state);
      if (!state || ms < MIN_SESSION_MS) return false;
      addLog({
        id: `${state.firstStart.toString(36)}-${Math.random().toString(36).slice(2, 6)}`,
        book: state.book,
        ch: state.ch,
        start: state.firstStart,
        ms: Math.round(ms)
      });
      return true;
    },
    [addLog]
  );

  const value = useMemo<TimerValue>(
    () => ({
      timer,
      start: (book, ch) => {
        const current = readTimer();
        if (current && (current.book !== book || current.ch !== ch)) save(current);
        const now = Date.now();
        setTimer({ book, ch, firstStart: now, runningSince: now, acc: 0 });
      },
      pause: () => {
        const current = readTimer();
        if (!current || current.runningSince === null) return;
        setTimer({ ...current, acc: elapsedOf(current), runningSince: null });
      },
      resume: () => {
        const current = readTimer();
        if (!current || current.runningSince !== null) return;
        setTimer({ ...current, runningSince: Date.now() });
      },
      finish: () => {
        const saved = save(readTimer());
        setTimer(null);
        return saved;
      },
      discard: () => setTimer(null)
    }),
    [timer, save, setTimer]
  );

  return <TimerContext.Provider value={value}>{children}</TimerContext.Provider>;
}

export function useReadingTimer(): TimerValue {
  const ctx = useContext(TimerContext);
  if (!ctx) throw new Error('useReadingTimer must be used inside ReadingTimerProvider');
  return ctx;
}

export function useElapsed(timer: TimerState | null): number {
  const [now, setNow] = useState(Date.now);
  const running = timer?.runningSince != null;
  useEffect(() => {
    if (!running) return;
    setNow(Date.now());
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, [running]);
  return elapsedOf(timer, running ? now : undefined);
}

export function clock(ms: number): string {
  const total = Math.floor(ms / 1000);
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = String(total % 60).padStart(2, '0');
  return h > 0 ? `${h}:${String(m).padStart(2, '0')}:${s}` : `${String(m).padStart(2, '0')}:${s}`;
}
