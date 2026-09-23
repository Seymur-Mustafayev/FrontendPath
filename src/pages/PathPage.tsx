import { useEffect } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { PathRail } from '../components/PathRail';
import { TopicItem } from '../components/TopicItem';
import { PATHS, getPath, pathIndex } from '../data/paths';
import { useProgress } from '../lib/useProgress';
import { LEVEL_LABEL } from '../types';
import { NotFoundPage } from './NotFoundPage';

/** Bir yolun səhifəsi: sol rail + mövzu siyahısı. */
export function PathPage() {
  const { pathId = '' } = useParams();
  const [params] = useSearchParams();
  const path = getPath(pathId);

  // Axtarışdan gələndə ?t=3 ilə konkret mövzu açılır və ekrana gətirilir.
  const openIndex = params.get('t') ? Number(params.get('t')) : null;

  const { doneInPath } = useProgress();

  useEffect(() => {
    if (openIndex === null) {
      window.scrollTo({ top: 0 });
      return;
    }
    const el = document.getElementById(`t-${pathId}.${openIndex}`);
    el?.scrollIntoView({ block: 'center', behavior: 'smooth' });
  }, [pathId, openIndex]);

  if (!path) return <NotFoundPage />;

  const index = pathIndex(path.id);
  const prev = PATHS[index - 1];
  const next = PATHS[index + 1];
  const done = doneInPath(path.id);

  return (
    <section className="sec">
      <div className="wrap">
        <div className="sec-head">
          <p className="kicker">Oxuma paneli</p>
          <h2 className="sh">Yollar və mövzular</h2>
          <p>Solda yolu seç, mövzu başlığına basıb izahı aç, altındakı terminlərə basıb tərcüməni oxu.</p>
        </div>

        <div className="explorer">
          <div className="cols">
            <PathRail />

            <div className="panel">
              <div className="phead">
                <span className="no">
                  YOL {String(index + 1).padStart(2, '0')} · {LEVEL_LABEL[path.lvl].toUpperCase()} ·{' '}
                  {done}/{path.topics.length} TAMAMLANIB
                </span>
                <h2>{path.name}</h2>
                <p>{path.sum}</p>
                <div className="goal">
                  <b>Hədəf</b>
                  <span>{path.goal}</span>
                </div>
              </div>

              <ul className="topics">
                {path.topics.map((topic, i) => (
                  <TopicItem
                    key={`${path.id}.${i}`}
                    pathId={path.id}
                    index={i}
                    topic={topic}
                    defaultOpen={openIndex === i}
                  />
                ))}
              </ul>

              <nav className="pnav" aria-label="Yollar arası keçid">
                {prev ? (
                  <Link to={`/yol/${prev.id}`}>← {prev.name.split(' — ')[0]}</Link>
                ) : (
                  <span className="pnav-disabled">İlk yol</span>
                )}
                {next ? (
                  <Link to={`/yol/${next.id}`}>{next.name.split(' — ')[0]} →</Link>
                ) : (
                  <span className="pnav-disabled">Sonuncu yol</span>
                )}
              </nav>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
