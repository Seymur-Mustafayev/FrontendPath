import { GLOSSARY } from '../data/glossary';
import { useTermDialog } from '../lib/useTermDialog';

/** Mövzunun altındakı termin çipləri: İngiliscə termin (azərbaycanca qarşılıq). */
export function TermChips({ keys, title }: { keys: string[]; title?: string }) {
  const { openTerm } = useTermDialog();
  if (keys.length === 0) return null;

  return (
    <div className="termbox">
      <h4>{title ?? 'Əsas terminlər — üstünə bas'}</h4>
      <div className="chips">
        {keys.map((key) => {
          const term = GLOSSARY[key];
          if (!term) return null;
          return (
            <button key={key} type="button" className="term" onClick={() => openTerm(key)}>
              {term.en} <span className="az">({term.az})</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
