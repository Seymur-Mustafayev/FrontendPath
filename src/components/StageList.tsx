import { Link } from 'react-router-dom';
import { pathIndex } from '../data/paths';
import { STAGES } from '../lib/content';
import { useProgress } from '../lib/useProgress';
import { LEVEL_LABEL } from '../types';
import { ProgressBar } from './ProgressBar';

/** Yolların üç mərhələ üzrə kart siyahısı. */
export function StageList() {
  const { doneInPath } = useProgress();

  return (
    <section className="sec sec--alt" id="merhele">
      <div className="wrap">
        <div className="sec-head">
          <p className="kicker">Mərhələlər</p>
          <h2 className="sh">Yolların səviyyə üzrə bölgüsü</h2>
          <p>Kartın üstünə bas — həmin yolun mövzuları açılır.</p>
        </div>

        {STAGES.map((stage) => (
          <div className="stage" key={stage.level}>
            <div className="stage-head">
              <h3>{stage.title}</h3>
              <span>{stage.description}</span>
            </div>
            <div className="cards">
              {stage.paths.map((path) => {
                const done = doneInPath(path.id);
                return (
                  <Link className="card" to={`/yol/${path.id}`} key={path.id}>
                    <span className="cno">
                      YOL {String(pathIndex(path.id) + 1).padStart(2, '0')} ·{' '}
                      {LEVEL_LABEL[path.lvl].toUpperCase()}
                    </span>
                    <h4>{path.name}</h4>
                    <p>{path.sum}</p>
                    <span className="cfoot">
                      <ProgressBar done={done} total={path.topics.length} />
                      {done}/{path.topics.length} mövzu
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
