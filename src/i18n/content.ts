import { BOOKS, isCode } from '../data/books';
import type { Book, BookChapter, BookSection, CodeBlock } from '../data/books';
import { DEEP } from '../data/deep';
import { TERM_SOURCE } from '../data/glossary';
import { PATHS } from '../data/paths';
import type { LearningPath, TermEntry } from '../types';
import { parseUnits, unitKey } from './units';
import type { Locale } from './units';

export interface TextPairView {
  en: string;
  tr: string;
}

export type BlockView = TextPairView | CodeBlock;

export interface SectionView extends Omit<BookSection, 'headingAz' | 'blocks'> {
  headingTr: string;
  blocks: BlockView[];
}

export interface ChapterView extends Omit<BookChapter, 'titleAz' | 'sections'> {
  titleTr: string;
  sections: SectionView[];
}

export interface BookView extends Omit<Book, 'chapters'> {
  chapters: ChapterView[];
}

export interface Content {
  paths: LearningPath[];
  deep: Record<string, string>;
  glossary: Record<string, TermEntry>;
  books: BookView[];
  topicCount: number;
  termCount: number;
}

export function isCodeView(block: BlockView): block is CodeBlock {
  return 'code' in block;
}

const FILES = import.meta.glob<string>('./locales/*/*.txt', { query: '?raw', import: 'default' });

export async function loadTranslations(locale: Locale): Promise<Map<string, string>> {
  const out = new Map<string, string>();
  if (locale === 'az') return out;
  const loaders = Object.entries(FILES)
    .filter(([path]) => path.startsWith(`./locales/${locale}/`))
    .map(([, load]) => load());
  for (const raw of await Promise.all(loaders)) {
    for (const [k, v] of parseUnits(raw)) out.set(k, v);
  }
  return out;
}

export function buildContent(locale: Locale, tr: Map<string, string>): Content {
  const t = (key: string, az: string) => (locale === 'az' ? az : (tr.get(key) ?? az));

  const paths: LearningPath[] = PATHS.map((p) => ({
    ...p,
    name: t(unitKey.path(p.id, 'name'), p.name),
    sum: t(unitKey.path(p.id, 'sum'), p.sum),
    goal: t(unitKey.path(p.id, 'goal'), p.goal),
    topics: p.topics.map((topic, i) => ({
      ...topic,
      t: t(unitKey.topic(p.id, i, 't'), topic.t),
      body: t(unitKey.topic(p.id, i, 'body'), topic.body),
      note: topic.note && t(unitKey.topic(p.id, i, 'note'), topic.note)
    }))
  }));

  const deep = Object.fromEntries(
    Object.entries(DEEP).map(([k, v]) => [k, t(unitKey.deep(k), v)])
  );

  const glossary: Record<string, TermEntry> = Object.fromEntries(
    Object.entries(TERM_SOURCE).map(([key, [en, az, def, ex]]) => [
      key,
      {
        key,
        en,
        tr: t(unitKey.term(key, 'tr'), az),
        def: t(unitKey.term(key, 'def'), def),
        ex: ex && t(unitKey.term(key, 'ex'), ex)
      }
    ])
  );

  const books: BookView[] = BOOKS.map((book) => ({
    ...book,
    license: t(unitKey.book(book.id, 'license'), book.license),
    sum: t(unitKey.book(book.id, 'sum'), book.sum),
    chapters: book.chapters.map((ch) => ({
      ...ch,
      titleTr: locale === 'en' ? ch.title : t(unitKey.chapter(book.id, ch.id, 'title'), ch.titleAz),
      sum: t(unitKey.chapter(book.id, ch.id, 'sum'), ch.sum),
      sections: ch.sections.map((sec) => {
        const k = (field: string) => unitKey.section(book.id, ch.id, sec.id, field);
        return {
          ...sec,
          headingTr: locale === 'en' ? sec.heading : t(k('heading'), sec.headingAz),
          note: sec.note && t(k('note'), sec.note),
          blocks: sec.blocks.map((block, i): BlockView => {
            if (isCode(block)) {
              return {
                code: t(k(`code${i}`), block.code),
                caption: block.caption && t(k(`cap${i}`), block.caption)
              };
            }
            return { en: block.en, tr: locale === 'en' ? '' : t(k(`b${i}`), block.az) };
          })
        };
      })
    }))
  }));

  return {
    paths,
    deep,
    glossary,
    books,
    topicCount: paths.reduce((n, p) => n + p.topics.length, 0),
    termCount: Object.keys(glossary).length
  };
}

export function sectionText(section: SectionView): string {
  return section.blocks
    .map((b) => (isCodeView(b) ? b.code : `${b.en} ${b.tr}`))
    .concat(section.note ?? '')
    .join(' ');
}
