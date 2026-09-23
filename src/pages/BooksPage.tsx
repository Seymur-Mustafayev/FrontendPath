import { Link } from 'react-router-dom';
import { sectionText } from '../i18n/content';
import { useLocale } from '../i18n/useLocale';
import { readingMinutes } from '../lib/content';

/** Kitabxana: kitablar və onların fəsilləri. */
export function BooksPage() {
  const { ui, content } = useLocale();
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
                return (
                  <Link className="card" to={`/kitab/${book.id}/${ch.id}`} key={ch.id}>
                    <span className="cno">{t.chapterNo(String(ch.no).padStart(2, '0'))}</span>
                    <h4>{ch.title}</h4>
                    <p>{ch.sum}</p>
                    <span className="cfoot">{t.chapterFoot(ch.sections.length, minutes)}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}

        <p className="empty">{t.howTo}</p>
      </div>
    </section>
  );
}
