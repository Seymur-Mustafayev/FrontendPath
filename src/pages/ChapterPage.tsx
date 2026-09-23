import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { TermChips } from '../components/TermChips';
import { TopicBody } from '../components/TopicBody';
import { isCodeView, sectionText } from '../i18n/content';
import type { Content, SectionView } from '../i18n/content';
import { useLocale } from '../i18n/useLocale';
import { readingMinutes, termRefs } from '../lib/content';
import { useProgress } from '../lib/useProgress';
import { NotFoundPage } from './NotFoundPage';

type View = 'both' | 'en' | 'tr';

function sectionKey(bookId: string, chapterId: string, section: SectionView): string {
  return `book.${bookId}.${chapterId}.${section.id}`;
}

function sectionTerms(content: Content, section: SectionView): string[] {
  const keys = [...new Set([...termRefs(sectionText(section)), ...(section.terms ?? [])])];
  return keys.filter((k) => content.glossary[k]);
}

export function ChapterPage() {
  const { bookId = '', chapterId = '' } = useParams();
  const [view, setView] = useState<View>('both');
  const { ui, content, locale } = useLocale();
  const { isDone } = useProgress();
  const t = ui.chapter;
  const book = content.books.find((b) => b.id === bookId);
  const chapter = book?.chapters.find((c) => c.id === chapterId);

  if (!book || !chapter) return <NotFoundPage />;

  const readCount = chapter.sections.filter((s) => isDone(sectionKey(bookId, chapterId, s))).length;
  const translated = locale !== 'en';
  const shownView: View = translated ? view : 'en';
  const allTerms = [...new Set(chapter.sections.flatMap((s) => sectionTerms(content, s)))];
  const minutes = chapter.sections.reduce((n, s) => n + readingMinutes(sectionText(s)), 0);
  const views: { key: View; label: string }[] = [
    { key: 'both', label: t.viewBoth },
    { key: 'en', label: t.viewEn },
    { key: 'tr', label: t.viewTr }
  ];

  return (
    <section className="sec">
      <div className="wrap">
        <div className="sec-head">
          <p className="kicker">
            <Link to="/kitab">{t.library}</Link> · {book.title} · {t.chapter(chapter.no)}
          </p>
          <h2 className="sh">
            {chapter.title}
            {translated && <span className="sh-az"> — {chapter.titleTr}</span>}
          </h2>
          <p>{chapter.sum}</p>
        </div>

        <div className="chapter">
          <aside className="chapter-toc">
            <p className="rail-title">{t.sections}</p>
            <ol>
              {chapter.sections.map((s) => {
                const read = isDone(sectionKey(bookId, chapterId, s));
                return (
                  <li key={s.id} className={read ? 'done' : undefined}>
                    <a href={`#s-${s.id}`}>{s.headingTr}</a>
                    {read && <span className="visually-hidden"> — {t.read}</span>}
                  </li>
                );
              })}
            </ol>
            <div className="toc-progress">
              <span>{t.tocRead(readCount, chapter.sections.length)}</span>
              <span className="bar" aria-hidden="true">
                <span style={{ width: `${(readCount / chapter.sections.length) * 100}%` }} />
              </span>
            </div>
            <p className="toc-meta">{t.tocMeta(chapter.sections.length, minutes, allTerms.length)}</p>

            {translated && (
              <div className="views" role="group" aria-label={t.viewsAria}>
                {views.map((v) => (
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
            )}
          </aside>

          <article className="chapter-body">
            {chapter.sections.map((s) => (
              <Section
                key={s.id}
                bookId={bookId}
                chapterId={chapterId}
                section={s}
                view={shownView}
              />
            ))}

            <div className="chapter-end">
              <h3>{t.allTerms}</h3>
              <TermChips keys={allTerms} title={t.allTermsChips(allTerms.length)} />
              <p className="src">
                {t.source} <b>{book.title}</b> — {book.subtitle}, {book.author}. {book.license}.{' '}
                {t.sourceNote}
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
  section: SectionView;
  view: View;
}) {
  const [showNote, setShowNote] = useState(true);
  const { isDone, toggle } = useProgress();
  const { ui, content } = useLocale();
  const t = ui.chapter;
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
          {view === 'tr' ? section.headingTr : section.heading}
          {both && <span className="head-az">{section.headingTr}</span>}
        </h3>
        <label className="readmark">
          <input className="chk" type="checkbox" checked={done} onChange={() => toggle(key)} />
          <span>{t.read}</span>
        </label>
      </div>

      {both && (
        <div className="parallel-head" aria-hidden="true">
          <span>{t.colEn}</span>
          <span>{t.colTr}</span>
        </div>
      )}

      <div className={`parallel${both ? '' : ' parallel--single'}`}>
        {section.blocks.map((block, i) => {
          if (isCodeView(block)) {
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
              {view !== 'tr' && (
                <div className="cell cell--en">
                  {both && <span className="cell-tag">EN</span>}
                  <TopicBody text={block.en} />
                </div>
              )}
              {view !== 'en' && (
                <div className="cell cell--az">
                  {both && <span className="cell-tag">{t.tag}</span>}
                  <TopicBody text={block.tr} />
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
            {showNote ? '−' : '+'} {t.mentor}
          </button>
          {showNote && (
            <div className="body body--flush">
              <TopicBody text={section.note} />
            </div>
          )}
        </div>
      )}

      <TermChips keys={sectionTerms(content, section)} title={t.sectionTerms} />
    </section>
  );
}
