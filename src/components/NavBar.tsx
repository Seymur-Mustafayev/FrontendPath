import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useUI } from '../i18n/useLocale';
import { useProgress } from '../lib/useProgress';
import { LangSwitch } from './LangSwitch';
import { SearchInput } from './SearchInput';

export function NavBar() {
  const [q, setQ] = useState('');
  const navigate = useNavigate();
  const { totalDone, totalTopics } = useProgress();
  const ui = useUI();

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

        <nav className="nav-links" aria-label={ui.nav.aria}>
          <NavLink to="/" end>{ui.nav.home}</NavLink>
          <NavLink to="/yol/web">{ui.nav.paths}</NavLink>
          <NavLink to="/kitab">{ui.nav.book}</NavLink>
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
          <LangSwitch />
        </div>
      </div>
    </header>
  );
}
