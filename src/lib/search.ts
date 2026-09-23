import { GLOSSARY } from '../data/glossary';
import { PATHS } from '../data/paths';
import type { TermEntry, TopicHit } from '../types';
import { topicId, topicText } from './content';

export interface SearchResult {
  topics: TopicHit[];
  terms: TermEntry[];
}

const EMPTY: SearchResult = { topics: [], terms: [] };

/** Mövzu mətnləri və lüğət üzrə sadə mətn axtarışı. */
export function search(query: string): SearchResult {
  const q = query.trim().toLowerCase();
  if (q.length < 2) return EMPTY;

  const topics: TopicHit[] = [];
  PATHS.forEach((path, pathIndex) => {
    path.topics.forEach((topic, topicIndex) => {
      const haystack = `${topic.t} ${topicText(path.id, topicIndex, topic)}`.toLowerCase();
      if (haystack.includes(q)) {
        topics.push({ path, pathIndex, topic, topicIndex, topicId: topicId(path.id, topicIndex) });
      }
    });
  });

  const terms = Object.values(GLOSSARY).filter((t) =>
    `${t.en} ${t.az} ${t.def}`.toLowerCase().includes(q)
  );

  return { topics, terms };
}

/** Lüğət kartları üçün filtr — əlifba sırası ilə. */
export function filterTerms(query: string): TermEntry[] {
  const q = query.trim().toLowerCase();
  const list = Object.values(GLOSSARY).filter(
    (t) => !q || `${t.en} ${t.az} ${t.def}`.toLowerCase().includes(q)
  );
  return list.sort((a, b) => a.en.toLowerCase().localeCompare(b.en.toLowerCase()));
}
