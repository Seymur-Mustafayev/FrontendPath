import { Route, Routes, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Footer } from './components/Footer';
import { NavBar } from './components/NavBar';
import { BooksPage } from './pages/BooksPage';
import { ChapterPage } from './pages/ChapterPage';
import { GlossaryPage } from './pages/GlossaryPage';
import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { PathPage } from './pages/PathPage';
import { SearchPage } from './pages/SearchPage';

function ScrollToTop() {
  const { pathname, search } = useLocation();
  useEffect(() => {
    if (search.includes('t=')) return;
    window.scrollTo({ top: 0 });
  }, [pathname, search]);
  return null;
}

export function App() {
  return (
    <>
      <NavBar />
      <ScrollToTop />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/yol/:pathId" element={<PathPage />} />
          <Route path="/kitab" element={<BooksPage />} />
          <Route path="/kitab/:bookId/:chapterId" element={<ChapterPage />} />
          <Route path="/luget" element={<GlossaryPage />} />
          <Route path="/axtar" element={<SearchPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
