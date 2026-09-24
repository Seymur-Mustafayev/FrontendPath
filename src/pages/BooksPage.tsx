import { Link } from 'react-router-dom';
import { ReadingLog } from '../components/ReadingLog';
import { sectionText } from '../i18n/content';
import { useLocale } from '../i18n/useLocale';
import { readingMinutes } from '../lib/content';
import { useProgress } from '../lib/useProgress';

export function BooksPage() {
  const { ui, content } = useLocale();
  const { isDone } = useProgress();
  const t = ui.books;

  return (
    <section className="sec sec--alt">
      <div className="wrap">
        <div className="sec-head">
          <p className="kicker">{t.kicker}</p>
          <h2 className="sh">{t.title}</h2>
          <p>{t.intro}</p>
        </div>

        {content.books.map((book) => (
          <div className="book" key={book.id}>
            <div className="book-head">
              <div>
                <p className="cno">{book.series.toUpperCase()}</p>
                <h3>{book.title}</h3>
                <p className="book-sub">
                  {book.subtitle} · {book.author}
                </p>
              </div>
              <p className="book-sum">{book.sum}</p>
            </div>

            <div className="cards">
              {book.chapters.map((ch) => {
                const minutes = ch.sections.reduce(
                  (n, s) => n + readingMinutes(sectionText(s)),
                  0
                );
                const read = ch.sections.filter((s) => isDone(`book.${book.id}.${ch.id}.${s.id}`)).length;
                return (
                  <Link className="card" to={`/kitab/${book.id}/${ch.id}`} key={ch.id}>
                    <span className="cno">{t.chapterNo(String(ch.no).padStart(2, '0'))}</span>
                    <h4>{ch.title}</h4>
                    <p>{ch.sum}</p>
                    <span className="cfoot">{t.chapterFoot(ch.sections.length, minutes)}</span>
                    {read > 0 && (
                      <span className={read === ch.sections.length ? 'cread cread--all' : 'cread'}>
                        {ui.chapter.tocRead(read, ch.sections.length)}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}

        <ReadingLog />

        <p className="empty">{t.howTo}</p>
      </div>
    </section>
  );
}
