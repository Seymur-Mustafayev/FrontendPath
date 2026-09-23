import { Link } from 'react-router-dom';
import { useUI } from '../i18n/useLocale';

export function NotFoundPage() {
  const { notFound: t } = useUI();
  return (
    <section className="sec">
      <div className="wrap">
        <div className="sec-head">
          <p className="kicker">404</p>
          <h2 className="sh">{t.title}</h2>
          <p>{t.text}</p>
        </div>
        <Link className="btn btn-p btn--dark" to="/yol/web">{t.back}</Link>
      </div>
    </section>
  );
}
