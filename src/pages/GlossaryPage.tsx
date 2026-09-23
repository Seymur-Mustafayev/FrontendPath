import { useMemo, useState } from 'react';
import { SearchInput } from '../components/SearchInput';
import { useLocale } from '../i18n/useLocale';
import { filterTerms } from '../lib/search';
import { useTermDialog } from '../lib/useTermDialog';

export function GlossaryPage() {
  const [q, setQ] = useState('');
  const { openTerm } = useTermDialog();
  const { ui, content } = useLocale();
  const t = ui.glossary;
  const terms = useMemo(() => filterTerms(content, q), [content, q]);

  return (
    <section className="sec sec--alt">
      <div className="wrap">
        <div className="sec-head">
          <p className="kicker">{t.kicker}</p>
          <h2 className="sh">{t.title}</h2>
          <p>{t.intro}</p>
        </div>

        <div className="gtools">
          <SearchInput
            id="glossary-search"
            value={q}
            onChange={setQ}
            label={t.searchLabel}
            placeholder={t.searchPlaceholder}
          />
          <span className="navstat">{t.count(terms.length, content.termCount)}</span>
        </div>

        {terms.length === 0 ? (
          <p className="empty">{t.empty}</p>
        ) : (
          <div className="gloss">
            {terms.map((term) => (
              <button key={term.key} type="button" className="gcard" onClick={() => openTerm(term.key)}>
                <b>{term.en}</b>
                <span>{term.tr}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
