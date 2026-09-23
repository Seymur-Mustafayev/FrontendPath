import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useProgress } from '../lib/useProgress';
import { SearchInput } from './SearchInput';

export function NavBar() {
  const [q, setQ] = useState('');
  const navigate = useNavigate();
  const { totalDone, totalTopics } = useProgress();

  function submit(value: string) {
    setQ(value);
    if (value.trim().length > 1) navigate(`/axtar?q=${encodeURIComponent(value.trim())}`);
  }

  return (
    <header className="nav">
      <div className="wrap nav-in">
        <Link className="brand" to="/">
          <span className="mk">FE</span>
          Yol Xəritəsi
        </Link>

        <nav className="nav-links" aria-label="Əsas naviqasiya">
          <NavLink to="/" end>Ana səhifə</NavLink>
          <NavLink to="/yol/web">Yollar</NavLink>
          <NavLink to="/kitab">Kitab</NavLink>
          <NavLink to="/luget">Lüğət</NavLink>
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
              label="Mövzu və termin axtarışı"
              placeholder="Mövzu və ya termin axtar…"
            />
          </form>
          <span className="navstat">
            {totalDone} / {totalTopics} mövzu
          </span>
        </div>
      </div>
    </header>
  );
}
