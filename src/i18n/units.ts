import { BOOKS, isCode } from '../data/books';
import { DEEP } from '../data/deep';
import { TERM_SOURCE } from '../data/glossary';
import { PATHS } from '../data/paths';

export type Locale = 'az' | 'en' | 'ru';
export const LOCALES: Locale[] = ['az', 'en', 'ru'];

const AZ_LETTERS = /[əğıİöşçüƏĞÖŞÇÜ]/;

const AZ_WORDS = /\bSalam\b/;

export function needsCodeTranslation(code: string): boolean {
  return AZ_LETTERS.test(code) || AZ_WORDS.test(code);
}

export const unitKey = {
  path: (id: string, field: 'name' | 'sum' | 'goal') => `path.${id}.${field}`,
  topic: (id: string, i: number, field: 't' | 'body' | 'note') => `topic.${id}.${i}.${field}`,
  deep: (key: string) => `deep.${key}`,
  term: (key: string, field: 'tr' | 'def' | 'ex') => `term.${key}.${field}`,
  book: (id: string, field: 'license' | 'sum') => `book.${id}.${field}`,
  chapter: (b: string, c: string, field: 'title' | 'sum') => `ch.${b}.${c}.${field}`,
  section: (b: string, c: string, s: string, field: string) => `sec.${b}.${c}.${s}.${field}`,
  exam: (b: string, c: string, i: number, field: string) => `exam.${b}.${c}.${i}.${field}`
};

export function sourceUnits(locale: Exclude<Locale, 'az'>): Map<string, string> {
  const out = new Map<string, string>();

  for (const path of PATHS) {
    out.set(unitKey.path(path.id, 'name'), path.name);
    out.set(unitKey.path(path.id, 'sum'), path.sum);
    out.set(unitKey.path(path.id, 'goal'), path.goal);
    path.topics.forEach((topic, i) => {
      out.set(unitKey.topic(path.id, i, 't'), topic.t);
      out.set(unitKey.topic(path.id, i, 'body'), topic.body);
      if (topic.note) out.set(unitKey.topic(path.id, i, 'note'), topic.note);
    });
  }

  for (const [key, text] of Object.entries(DEEP)) out.set(unitKey.deep(key), text);

  for (const [key, [, az, def, ex]] of Object.entries(TERM_SOURCE)) {
    out.set(unitKey.term(key, 'tr'), az);
    out.set(unitKey.term(key, 'def'), def);
    if (ex && needsCodeTranslation(ex)) out.set(unitKey.term(key, 'ex'), ex);
  }

  for (const book of BOOKS) {
    out.set(unitKey.book(book.id, 'license'), book.license);
    out.set(unitKey.book(book.id, 'sum'), book.sum);
    for (const ch of book.chapters) {
      if (locale === 'ru') out.set(unitKey.chapter(book.id, ch.id, 'title'), ch.titleAz);
      out.set(unitKey.chapter(book.id, ch.id, 'sum'), ch.sum);
      for (const sec of ch.sections) {
        const k = (field: string) => unitKey.section(book.id, ch.id, sec.id, field);
        if (locale === 'ru') out.set(k('heading'), sec.headingAz);
        if (sec.note) out.set(k('note'), sec.note);
        sec.blocks.forEach((block, i) => {
          if (isCode(block)) {
            if (block.caption) out.set(k(`cap${i}`), block.caption);
            if (needsCodeTranslation(block.code)) out.set(k(`code${i}`), block.code);
          } else if (locale === 'ru') {
            out.set(k(`b${i}`), block.az);
          }
        });
      }
      ch.exam?.forEach((x, i) => {
        const k = (field: string) => unitKey.exam(book.id, ch.id, i, field);
        out.set(k('q'), x.q);
        if (x.code && needsCodeTranslation(x.code)) out.set(k('code'), x.code);
        x.options.forEach((o, j) => {
          if (needsCodeTranslation(o) || /\p{L}/u.test(o.replace(/`[^`]*`/g, ''))) out.set(k(`o${j}`), o);
        });
        out.set(k('why'), x.why);
      });
    }
  }

  return out;
}

export function parseUnits(raw: string): Map<string, string> {
  const out = new Map<string, string>();
  let key: string | null = null;
  let lines: string[] = [];
  const flush = () => {
    if (key) out.set(key, lines.join('\n').trim());
  };
  for (const line of raw.replace(/\r\n/g, '\n').split('\n')) {
    if (line.startsWith('@@ ')) {
      flush();
      key = line.slice(3).trim();
      lines = [];
    } else {
      lines.push(line);
    }
  }
  flush();
  return out;
}
