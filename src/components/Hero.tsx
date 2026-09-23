import { Link } from 'react-router-dom';
import { useLocale } from '../i18n/useLocale';
import { LEVELS } from '../lib/content';

export function Hero() {
  const { ui, content } = useLocale();
  const h = ui.hero;
  return (
    <header className="hero">
      <div className="wrap">
        <p className="kicker">Frontend Development · 2026</p>
        <h1>
          {h.titleBefore}
          <em>Middle</em>
          {h.titleAfter}
        </h1>
        <p className="lede">{h.lede(content.paths.length, content.topicCount, content.termCount)}</p>
        <div className="cta">
          <Link className="btn btn-p" to="/yol/web">{h.start}</Link>
          <Link className="btn btn-s" to="/kitab">{h.read}</Link>
          <Link className="btn btn-s" to="/luget">{h.glossary}</Link>
        </div>
        <div className="stats">
          <div><b>{content.paths.length}</b><span>{h.statPaths}</span></div>
          <div><b>{content.topicCount}</b><span>{h.statTopics}</span></div>
          <div><b>{content.termCount}</b><span>{h.statTerms}</span></div>
          <div><b>{LEVELS.length}</b><span>{h.statStages}</span></div>
        </div>
      </div>
    </header>
  );
}
