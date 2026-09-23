import { Link } from 'react-router-dom';
import { BOOKS, sectionText } from '../data/books';
import { readingMinutes } from '../lib/content';

/** Kitabxana: kitablar və onların fəsilləri. */
export function BooksPage() {
  return (
    <section className="sec sec--alt">
      <div className="wrap">
        <div className="sec-head">
          <p className="kicker">Kitabxana</p>
          <h2 className="sh">Kitab oxuma bölməsi</h2>
          <p>
            Orijinal mətn solda, azərbaycanca tərcüməsi sağda — abzas-abzas paralel. Mətndəki
            terminlərə basanda geniş izah pop-up-da açılır.
          </p>
        </div>

        {BOOKS.map((book) => (
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
                    <span className="cno">FƏSİL {String(ch.no).padStart(2, '0')}</span>
                    <h4>{ch.title}</h4>
                    <p>{ch.sum}</p>
                    <span className="cfoot">
                      {ch.sections.length} bölmə · ~{minutes} dəqiqə
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}

        <p className="empty">
          Yeni fəsil əlavə etmək: PDF-i göndər — mətn <code>src/data/books.ts</code> faylına bölmə-bölmə
          yazılır, yeni terminlər isə <code>src/data/terms.book.ts</code> faylına.
        </p>
      </div>
    </section>
  );
}
