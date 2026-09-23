import { Link } from 'react-router-dom';
import { useProgress } from '../lib/useProgress';
import { SyncPanel } from './SyncPanel';
import { useUI } from '../i18n/useLocale';

export function Footer() {
  const { reset, totalDone } = useProgress();
  const { footer: t, meta } = useUI();

  return (
    <footer className="foot">
      <div className="wrap">
        <div>
          <h5>{meta.title}</h5>
          <p>{t.about}</p>
        </div>
        <div>
          <h5>{t.sections}</h5>
          <ul>
            <li><Link to="/">{t.home}</Link></li>
            <li><Link to="/yol/web">{t.paths}</Link></li>
            <li><Link to="/kitab">{t.library}</Link></li>
            <li><Link to="/luget">{t.glossary}</Link></li>
          </ul>
        </div>
        <div>
          <h5>{t.progress}</h5>
          <ul>
            <li>
              <SyncPanel />
            </li>
            <li>{t.order}</li>
            <li>
              <button
                type="button"
                className="linklike"
                disabled={totalDone === 0}
                onClick={() => {
                  if (confirm(t.resetConfirm)) reset();
                }}
              >
                {t.reset}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
