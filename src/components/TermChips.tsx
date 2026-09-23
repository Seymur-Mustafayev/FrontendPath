import { useLocale } from '../i18n/useLocale';
import { useTermDialog } from '../lib/useTermDialog';

export function TermChips({ keys, title }: { keys: string[]; title?: string }) {
  const { openTerm } = useTermDialog();
  const { ui, content, locale } = useLocale();
  if (keys.length === 0) return null;

  return (
    <div className="termbox">
      <h4>{title ?? ui.topic.terms}</h4>
      <div className="chips">
        {keys.map((key) => {
          const term = content.glossary[key];
          if (!term) return null;
          return (
            <button key={key} type="button" className="term" onClick={() => openTerm(key)}>
              {term.en}
              {locale !== 'en' && <span className="az"> ({term.tr})</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}
