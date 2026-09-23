import { NavLink } from 'react-router-dom';
import { PATHS } from '../data/paths';
import { useProgress } from '../lib/useProgress';
import { LEVEL_LABEL } from '../types';
import { ProgressBar } from './ProgressBar';

/** Sol tərəfdəki yol siyahısı (mobil ekranda üfüqi sürüşən lentə çevrilir). */
export function PathRail() {
  const { doneInPath } = useProgress();

  return (
    <nav className="rail" aria-label="Öyrənmə yolları">
      <p className="rail-title">{PATHS.length} yol</p>
      {PATHS.map((path, i) => {
        const done = doneInPath(path.id);
        return (
          <NavLink
            key={path.id}
            to={`/yol/${path.id}`}
            className={({ isActive }) => `pbtn${isActive ? ' pbtn--active' : ''}`}
          >
            <span className="no">{String(i + 1).padStart(2, '0')}</span>
            <span>
              <span className="nm">{path.name}</span>
              <span className="meta">
                <ProgressBar done={done} total={path.topics.length} />
                {done}/{path.topics.length} · {LEVEL_LABEL[path.lvl]}
              </span>
            </span>
          </NavLink>
        );
      })}
    </nav>
  );
}
