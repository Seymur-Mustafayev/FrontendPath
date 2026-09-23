import { useMemo, useState } from 'react';
import { SearchInput } from '../components/SearchInput';
import { TERM_COUNT } from '../data/glossary';
import { filterTerms } from '../lib/search';
import { useTermDialog } from '../lib/useTermDialog';

/** A–Z termin lüğəti, öz axtarışı ilə. */
export function GlossaryPage() {
  const [q, setQ] = useState('');
  const { openTerm } = useTermDialog();
  const terms = useMemo(() => filterTerms(q), [q]);

  return (
    <section className="sec sec--alt">
      <div className="wrap">
        <div className="sec-head">
          <p className="kicker">Lüğət</p>
          <h2 className="sh">Frontend terminləri — ingiliscə və azərbaycanca</h2>
          <p>Müsahibədə və sənəddə qarşına çıxan terminlər. Kartın üstünə basanda izah açılır.</p>
        </div>

        <div className="gtools">
          <SearchInput
            id="glossary-search"
            value={q}
            onChange={setQ}
            label="Termin axtarışı"
            placeholder="Termin axtar — closure, hydration, rebase…"
          />
          <span className="navstat">
            {terms.length} / {TERM_COUNT} termin
          </span>
        </div>

        {terms.length === 0 ? (
          <p className="empty">Bu sorğuya uyğun termin tapılmadı.</p>
        ) : (
          <div className="gloss">
            {terms.map((t) => (
              <button key={t.key} type="button" className="gcard" onClick={() => openTerm(t.key)}>
                <b>{t.en}</b>
                <span>{t.az}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
