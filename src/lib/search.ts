import type { Content } from '../i18n/content';
import type { TermEntry, TopicHit } from '../types';
import { topicId, topicText } from './content';

export interface SearchResult {
  topics: TopicHit[];
  terms: TermEntry[];
}

const EMPTY: SearchResult = { topics: [], terms: [] };

export function search(content: Content, query: string): SearchResult {
  const q = query.trim().toLowerCase();
  if (q.length < 2) return EMPTY;

  const topics: TopicHit[] = [];
  content.paths.forEach((path, pathIndex) => {
    path.topics.forEach((topic, topicIndex) => {
      const haystack = `${topic.t} ${topicText(content, path.id, topicIndex, topic)}`.toLowerCase();
      if (haystack.includes(q)) {
        topics.push({ path, pathIndex, topic, topicIndex, topicId: topicId(path.id, topicIndex) });
      }
    });
  });

  const terms = Object.values(content.glossary).filter((t) =>
    `${t.en} ${t.tr} ${t.def}`.toLowerCase().includes(q)
  );

  return { topics, terms };
}

export function filterTerms(content: Content, query: string): TermEntry[] {
  const q = query.trim().toLowerCase();
  const list = Object.values(content.glossary).filter(
    (t) => !q || `${t.en} ${t.tr} ${t.def}`.toLowerCase().includes(q)
  );
  return list.sort((a, b) => a.en.toLowerCase().localeCompare(b.en.toLowerCase()));
}
