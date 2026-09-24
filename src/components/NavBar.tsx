import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useUI } from '../i18n/useLocale';
import { useProgress } from '../lib/useProgress';
import { LangSwitch } from './LangSwitch';
import { TimerPill } from './ReadingTimer';
import { SearchInput } from './SearchInput';

export function NavBar() {
  const [q, setQ] = useState('');
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { totalDone, totalTopics } = useProgress();
  const ui = useUI();

  useEffect(() => setOpen(false), [location.pathname, location.search]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  function submit(value: string) {
    setQ(value);
    if (value.trim().length > 1) navigate(`/axtar?q=${encodeURIComponent(value.trim())}`);
  }

  return (
    <header className="nav">
      <div className="wrap nav-in">
        <Link className="brand" to="/">
          <span className="mk">FE</span>
          {ui.nav.brand}
        </Link>

        <nav id="nav-menu" className={open ? 'nav-links open' : 'nav-links'} aria-label={ui.nav.aria}>
          <NavLink to="/" end>{ui.nav.home}</NavLink>
          <NavLink to="/yol/web">{ui.nav.paths}</NavLink>
          <NavLink to="/kitab">{ui.nav.book}</NavLink>
          <NavLink to="/tapsiriqlar">{ui.tasks.nav}</NavLink>
          <NavLink to="/luget">{ui.nav.glossary}</NavLink>
        </nav>

        <div className="nav-right">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              submit(q);
            }}
          >
            <SearchInput
              id="nav-search"
              value={q}
              onChange={submit}
              label={ui.nav.searchLabel}
              placeholder={ui.nav.searchPlaceholder}
            />
          </form>
          <span className="navstat">{ui.nav.stat(totalDone, totalTopics)}</span>
          <TimerPill />
          <LangSwitch />
        </div>

        <button
          type="button"
          className="nav-toggle"
          aria-controls="nav-menu"
          aria-expanded={open}
          aria-label={open ? ui.nav.menuClose : ui.nav.menuOpen}
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
            {open ? (
              <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            ) : (
              <path d="M3 6h14M3 10h14M3 14h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>
    </header>
  );
}
