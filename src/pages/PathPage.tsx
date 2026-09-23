import { useEffect } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { PathRail } from '../components/PathRail';
import { TopicItem } from '../components/TopicItem';
import { useLocale } from '../i18n/useLocale';
import { pathIndex } from '../lib/content';
import { useProgress } from '../lib/useProgress';
import { LEVEL_LABEL } from '../types';
import { NotFoundPage } from './NotFoundPage';

export function PathPage() {
  const { pathId = '' } = useParams();
  const [params] = useSearchParams();
  const { ui, content } = useLocale();
  const t = ui.path;
  const path = content.paths.find((p) => p.id === pathId);

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

  const index = pathIndex(content, path.id);
  const prev = content.paths[index - 1];
  const next = content.paths[index + 1];
  const done = doneInPath(path.id);

  return (
    <section className="sec">
      <div className="wrap">
        <div className="sec-head">
          <p className="kicker">{t.kicker}</p>
          <h2 className="sh">{t.title}</h2>
          <p>{t.intro}</p>
        </div>

        <div className="explorer">
          <div className="cols">
            <PathRail />

            <div className="panel">
              <div className="phead">
                <span className="no">
                  {t.head(
                    String(index + 1).padStart(2, '0'),
                    LEVEL_LABEL[path.lvl].toUpperCase(),
                    done,
                    path.topics.length
                  )}
                </span>
                <h2>{path.name}</h2>
                <p>{path.sum}</p>
                <div className="goal">
                  <b>{t.goal}</b>
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

              <nav className="pnav" aria-label={t.navAria}>
                {prev ? (
                  <Link to={`/yol/${prev.id}`}>← {prev.name.split(' — ')[0]}</Link>
                ) : (
                  <span className="pnav-disabled">{t.first}</span>
                )}
                {next ? (
                  <Link to={`/yol/${next.id}`}>{next.name.split(' — ')[0]} →</Link>
                ) : (
                  <span className="pnav-disabled">{t.last}</span>
                )}
              </nav>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
