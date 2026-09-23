import { Route, Routes, useLocation } from 'react-router-dom';
import { Suspense, lazy, useEffect } from 'react';
import { Footer } from './components/Footer';
import { NavBar } from './components/NavBar';
import { BooksPage } from './pages/BooksPage';
import { ChapterPage } from './pages/ChapterPage';
import { GlossaryPage } from './pages/GlossaryPage';
import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { PathPage } from './pages/PathPage';
import { SearchPage } from './pages/SearchPage';

const TasksPage = lazy(() => import('./pages/TasksPage').then((m) => ({ default: m.TasksPage })));
const TaskPage = lazy(() => import('./pages/TaskPage').then((m) => ({ default: m.TaskPage })));

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
          <Route
            path="/tapsiriqlar"
            element={
              <Suspense fallback={<div className="boot" />}>
                <TasksPage />
              </Suspense>
            }
          />
          <Route
            path="/tapsiriqlar/:taskId"
            element={
              <Suspense fallback={<div className="boot" />}>
                <TaskPage />
              </Suspense>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
