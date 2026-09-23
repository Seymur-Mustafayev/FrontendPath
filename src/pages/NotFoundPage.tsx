import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <section className="sec">
      <div className="wrap">
        <div className="sec-head">
          <p className="kicker">404</p>
          <h2 className="sh">Belə səhifə yoxdur</h2>
          <p>Ünvan səhv ola bilər. Yollara qayıdıb davam et.</p>
        </div>
        <Link className="btn btn-p btn--dark" to="/yol/web">Yollara qayıt</Link>
      </div>
    </section>
  );
}
