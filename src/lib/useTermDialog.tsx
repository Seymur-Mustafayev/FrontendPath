import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { useContent } from '../i18n/useLocale';
import { TermDialog } from '../components/TermDialog';

interface TermDialogValue {
  /** Termin pop-up-ını açır. Naməlum açar səssizcə nəzərə alınmır. */
  openTerm: (key: string) => void;
}

const TermDialogContext = createContext<TermDialogValue | null>(null);

export function TermDialogProvider({ children }: { children: ReactNode }) {
  // Açar saxlanılır ki, dil dəyişəndə açıq pop-up da yeni dildə göstərilsin.
  const [termKey, setTermKey] = useState<string | null>(null);
  const { glossary } = useContent();

  const openTerm = useCallback(
    (key: string) => {
      if (glossary[key]) setTermKey(key);
    },
    [glossary]
  );

  const value = useMemo<TermDialogValue>(() => ({ openTerm }), [openTerm]);

  return (
    <TermDialogContext.Provider value={value}>
      {children}
      <TermDialog term={termKey ? (glossary[termKey] ?? null) : null} onClose={() => setTermKey(null)} />
    </TermDialogContext.Provider>
  );
}

export function useTermDialog(): TermDialogValue {
  const ctx = useContext(TermDialogContext);
  if (!ctx) throw new Error('useTermDialog must be used inside TermDialogProvider');
  return ctx;
}
