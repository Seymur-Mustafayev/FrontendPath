import { Link } from 'react-router-dom';
import { PATHS, TOPIC_COUNT } from '../data/paths';
import { TERM_COUNT } from '../data/glossary';
import { STAGES } from '../lib/content';

export function Hero() {
  return (
    <header className="hero">
      <div className="wrap">
        <p className="kicker">Frontend Development · 2026</p>
        <h1>
          Junior-dan <em>Middle</em> frontend developerə gedən yol
        </h1>
        <p className="lede">
          {PATHS.length} yol, {TOPIC_COUNT} mövzu və {TERM_COUNT}-dan çox texniki termin. Mövzunun
          üstünə bas — fəsil formatında izah açılır; ingilis terminə bas — tərcüməsi və izahı
          pop-up-da görünür.
        </p>
        <div className="cta">
          <Link className="btn btn-p" to="/yol/web">Yollara başla</Link>
          <Link className="btn btn-s" to="/kitab">Kitab oxu</Link>
          <Link className="btn btn-s" to="/luget">Termin lüğətinə bax</Link>
        </div>
        <div className="stats">
          <div><b>{PATHS.length}</b><span>öyrənmə yolu</span></div>
          <div><b>{TOPIC_COUNT}</b><span>mövzu</span></div>
          <div><b>{TERM_COUNT}</b><span>termin (EN → AZ)</span></div>
          <div><b>{STAGES.length}</b><span>səviyyə mərhələsi</span></div>
        </div>
      </div>
    </header>
  );
}
