import { useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { TermChips } from '../components/TermChips';
import { useLocale } from '../i18n/useLocale';
import { search } from '../lib/search';

export function SearchPage() {
  const [params] = useSearchParams();
  const q = params.get('q') ?? '';
  const { ui, content } = useLocale();
  const t = ui.search;
  const { topics, terms } = useMemo(() => search(content, q), [content, q]);
  const shownTerms = terms.slice(0, 18);

  return (
    <section className="sec">
      <div className="wrap">
        <div className="sec-head">
          <p className="kicker">{t.kicker}</p>
          <h2 className="sh">{q}</h2>
          <p>{t.found(topics.length, terms.length)}</p>
        </div>

        {topics.length > 0 && (
          <ul className="res">
            {topics.map((hit) => (
              <li key={hit.topicId}>
                <Link to={`/yol/${hit.path.id}?t=${hit.topicIndex}`}>
                  <span className="where">
                    {t.pathNo(String(hit.pathIndex + 1).padStart(2, '0'))} · {hit.path.name}
                  </span>
                  {hit.topic.t}
                </Link>
              </li>
            ))}
          </ul>
        )}

        {shownTerms.length > 0 && (
          <TermChips keys={shownTerms.map((term) => term.key)} title={t.terms} />
        )}

        {topics.length === 0 && terms.length === 0 && <p className="empty">{t.empty}</p>}
      </div>
    </section>
  );
}
