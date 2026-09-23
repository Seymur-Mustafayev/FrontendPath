import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { TermChips } from '../components/TermChips';
import { TopicBody } from '../components/TopicBody';
import { GLOSSARY } from '../data/glossary';
import { getBook, getChapter, isCode, sectionText } from '../data/books';
import type { BookSection } from '../data/books';
import { readingMinutes, termRefs } from '../lib/content';
import { useProgress } from '../lib/useProgress';
import { NotFoundPage } from './NotFoundPage';

/** Hansı sütunlar görünür. */
type View = 'both' | 'en' | 'az';

const VIEWS: { key: View; label: string }[] = [
  { key: 'both', label: 'Paralel' },
  { key: 'en', label: 'Yalnız orijinal' },
  { key: 'az', label: 'Yalnız tərcümə' }
];

/** Bölmənin tərəqqi açarı — yol mövzularından ayrı saxlanılır. */
function sectionKey(bookId: string, chapterId: string, section: BookSection): string {
  return `book.${bookId}.${chapterId}.${section.id}`;
}

function sectionTerms(section: BookSection): string[] {
  const keys = [...new Set([...termRefs(sectionText(section)), ...(section.terms ?? [])])];
  return keys.filter((k) => GLOSSARY[k]);
}

/** Kitab fəslinin oxuma səhifəsi: solda orijinal, sağda azərbaycanca tərcümə. */
export function ChapterPage() {
  const { bookId = '', chapterId = '' } = useParams();
  const [view, setView] = useState<View>('both');
  const book = getBook(bookId);
  const chapter = getChapter(bookId, chapterId);

  if (!book || !chapter) return <NotFoundPage />;

  const allTerms = [...new Set(chapter.sections.flatMap(sectionTerms))];
  const minutes = chapter.sections.reduce((n, s) => n + readingMinutes(sectionText(s)), 0);

  return (
    <section className="sec">
      <div className="wrap">
        <div className="sec-head">
          <p className="kicker">
            <Link to="/kitab">Kitabxana</Link> · {book.title} · Fəsil {chapter.no}
          </p>
          <h2 className="sh">
            {chapter.title} <span className="sh-az">— {chapter.titleAz}</span>
          </h2>
          <p>{chapter.sum}</p>
        </div>

        <div className="chapter">
          <aside className="chapter-toc">
            <p className="rail-title">Bölmələr</p>
            <ol>
              {chapter.sections.map((s) => (
                <li key={s.id}>
                  <a href={`#s-${s.id}`}>{s.headingAz}</a>
                </li>
              ))}
            </ol>
            <p className="toc-meta">
              {chapter.sections.length} bölmə · ~{minutes} dəq · {allTerms.length} termin
            </p>

            <div className="views" role="group" aria-label="Sütun görünüşü">
              {VIEWS.map((v) => (
                <button
                  key={v.key}
                  type="button"
                  aria-pressed={view === v.key}
                  onClick={() => setView(v.key)}
                >
                  {v.label}
                </button>
              ))}
            </div>
          </aside>

          <article className="chapter-body">
            {chapter.sections.map((s) => (
              <Section
                key={s.id}
                bookId={bookId}
                chapterId={chapterId}
                section={s}
                view={view}
              />
            ))}

            <div className="chapter-end">
              <h3>Bu fəsildəki bütün terminlər</h3>
              <TermChips keys={allTerms} title={`${allTerms.length} termin — üstünə bas`} />
              <p className="src">
                Mənbə: <b>{book.title}</b> — {book.subtitle}, {book.author}. {book.license}.
                Tərcümə və mentor qeydləri bu sayta aiddir.
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

function Section({
  bookId,
  chapterId,
  section,
  view
}: {
  bookId: string;
  chapterId: string;
  section: BookSection;
  view: View;
}) {
  const [showNote, setShowNote] = useState(true);
  const { isDone, toggle } = useProgress();
  const key = sectionKey(bookId, chapterId, section);
  const done = isDone(key);
  const both = view === 'both';

  return (
    <section
      className={`chapter-section${done ? ' chapter-section--done' : ''}`}
      id={`s-${section.id}`}
    >
      <div className="chapter-section-head">
        <h3>
          {view === 'az' ? section.headingAz : section.heading}
          {both && <span className="head-az">{section.headingAz}</span>}
        </h3>
        <label className="readmark">
          <input className="chk" type="checkbox" checked={done} onChange={() => toggle(key)} />
          <span>Oxudum</span>
        </label>
      </div>

      {both && (
        <div className="parallel-head" aria-hidden="true">
          <span>Orijinal · EN</span>
          <span>Tərcümə · AZ</span>
        </div>
      )}

      <div className={`parallel${both ? '' : ' parallel--single'}`}>
        {section.blocks.map((block, i) => {
          if (isCode(block)) {
            return (
              <div className="parallel-code" key={i}>
                {block.caption && <p className="code-caption">{block.caption}</p>}
                <pre className="code">
                  <code>{block.code}</code>
                </pre>
              </div>
            );
          }
          return (
            <div className="parallel-row" key={i}>
              {view !== 'az' && (
                <div className="cell cell--en">
                  <span className="cell-tag">EN</span>
                  <TopicBody text={block.en} />
                </div>
              )}
              {view !== 'en' && (
                <div className="cell cell--az">
                  <span className="cell-tag">AZ</span>
                  <TopicBody text={block.az} />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {section.note && (
        <div className="explain">
          <button
            type="button"
            className="explain-toggle"
            aria-expanded={showNote}
            onClick={() => setShowNote((v) => !v)}
          >
            {showNote ? '−' : '+'} Mentor qeydi
          </button>
          {showNote && (
            <div className="body body--flush">
              <TopicBody text={section.note} />
            </div>
          )}
        </div>
      )}

      <TermChips keys={sectionTerms(section)} title="Bu bölmənin terminləri" />
    </section>
  );
}
