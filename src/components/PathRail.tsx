import { NavLink } from 'react-router-dom';
import { useLocale } from '../i18n/useLocale';
import { useProgress } from '../lib/useProgress';
import { LEVEL_LABEL } from '../types';
import { ProgressBar } from './ProgressBar';

/** Sol tərəfdəki yol siyahısı (mobil ekranda üfüqi sürüşən lentə çevrilir). */
export function PathRail() {
  const { doneInPath } = useProgress();
  const { ui, content } = useLocale();

  return (
    <nav className="rail" aria-label={ui.rail.aria}>
      <p className="rail-title">{ui.rail.count(content.paths.length)}</p>
      {content.paths.map((path, i) => {
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
