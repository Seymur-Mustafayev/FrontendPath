import { useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { TermChips } from '../components/TermChips';
import { search } from '../lib/search';

/** Mövzu + termin axtarışının nəticə səhifəsi. */
export function SearchPage() {
  const [params] = useSearchParams();
  const q = params.get('q') ?? '';
  const { topics, terms } = useMemo(() => search(q), [q]);
  const shownTerms = terms.slice(0, 18);

  return (
    <section className="sec">
      <div className="wrap">
        <div className="sec-head">
          <p className="kicker">Axtarış nəticəsi</p>
          <h2 className="sh">{q}</h2>
          <p>
            {topics.length} mövzu, {terms.length} termin tapıldı.
          </p>
        </div>

        {topics.length > 0 && (
          <ul className="res">
            {topics.map((hit) => (
              <li key={hit.topicId}>
                <Link to={`/yol/${hit.path.id}?t=${hit.topicIndex}`}>
                  <span className="where">
                    Yol {String(hit.pathIndex + 1).padStart(2, '0')} · {hit.path.name}
                  </span>
                  {hit.topic.t}
                </Link>
              </li>
            ))}
          </ul>
        )}

        {shownTerms.length > 0 && (
          <TermChips keys={shownTerms.map((t) => t.key)} title="Uyğun terminlər" />
        )}

        {topics.length === 0 && terms.length === 0 && (
          <p className="empty">
            Nəticə yoxdur. Başqa söz yoxla — məsələn «closure», «rebase», «hydration».
          </p>
        )}
      </div>
    </section>
  );
}
