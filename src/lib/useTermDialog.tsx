import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { GLOSSARY } from '../data/glossary';
import { TermDialog } from '../components/TermDialog';
import type { TermEntry } from '../types';

interface TermDialogValue {
  /** Termin pop-up-ını açır. Naməlum açar səssizcə nəzərə alınmır. */
  openTerm: (key: string) => void;
}

const TermDialogContext = createContext<TermDialogValue | null>(null);

export function TermDialogProvider({ children }: { children: ReactNode }) {
  const [term, setTerm] = useState<TermEntry | null>(null);

  const openTerm = useCallback((key: string) => {
    const entry = GLOSSARY[key];
    if (entry) setTerm(entry);
  }, []);

  const value = useMemo<TermDialogValue>(() => ({ openTerm }), [openTerm]);

  return (
    <TermDialogContext.Provider value={value}>
      {children}
      <TermDialog term={term} onClose={() => setTerm(null)} />
    </TermDialogContext.Provider>
  );
}

export function useTermDialog(): TermDialogValue {
  const ctx = useContext(TermDialogContext);
  if (!ctx) throw new Error('useTermDialog yalnız TermDialogProvider daxilində işləyir');
  return ctx;
}
