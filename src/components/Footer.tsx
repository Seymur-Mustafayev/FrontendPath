import { Link } from 'react-router-dom';
import { useProgress } from '../lib/useProgress';
import { SyncPanel } from './SyncPanel';

export function Footer() {
  const { reset, totalDone } = useProgress();

  return (
    <footer className="foot">
      <div className="wrap">
        <div>
          <h5>Frontend Yol Xəritəsi</h5>
          <p>
            Junior-dan middle səviyyəyə qədər lazım olan sahələrin tam siyahısı. Məzmun 2026
            praktikasına uyğundur: React Server Components, TanStack Query, Vitest, Core Web Vitals
            (INP), müasir CSS.
          </p>
        </div>
        <div>
          <h5>Bölmələr</h5>
          <ul>
            <li><Link to="/">Ana səhifə</Link></li>
            <li><Link to="/yol/web">Yollar və mövzular</Link></li>
            <li><Link to="/kitab">Kitabxana</Link></li>
            <li><Link to="/luget">Termin lüğəti</Link></li>
          </ul>
        </div>
        <div>
          <h5>Tərəqqi</h5>
          <ul>
            <li>
              <SyncPanel />
            </li>
            <li>Ardıcıllıq təklifdir — işinə uyğun dəyiş.</li>
            <li>
              <button
                type="button"
                className="linklike"
                disabled={totalDone === 0}
                onClick={() => {
                  if (confirm('Bütün tərəqqi silinsin?')) reset();
                }}
              >
                Tərəqqini sıfırla
              </button>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
