import { ch1 } from './book-scope/ch1';
import { ch2 } from './book-scope/ch2';
import { ch3 } from './book-scope/ch3';
import { ch4 } from './book-scope/ch4';
import { ch5 } from './book-scope/ch5';
import { ch6 } from './book-scope/ch6';
import { ch7 } from './book-scope/ch7';
import { ch8 } from './book-scope/ch8';

export interface TextPair {
  en: string;
  az: string;
}

export interface CodeBlock {
  code: string;
  caption?: string;
}

export type Block = TextPair | CodeBlock;

export function isCode(block: Block): block is CodeBlock {
  return 'code' in block;
}

export interface BookSection {
  id: string;
  heading: string;
  headingAz: string;
  blocks: Block[];
  note?: string;
  terms?: string[];
}

export interface ExamQuestion {
  q: string;
  code?: string;
  options: string[];
  answer: number;
  why: string;
}

export interface BookChapter {
  id: string;
  no: number;
  title: string;
  titleAz: string;
  sum: string;
  sections: BookSection[];
  exam?: ExamQuestion[];
}

export interface Book {
  id: string;
  title: string;
  subtitle: string;
  author: string;
  series: string;
  license: string;
  sum: string;
  chapters: BookChapter[];
}

export const BOOKS: Book[] = [
  {
    id: 'ydkjs-scope',
    title: 'Scope & Closures',
    subtitle: "You Don't Know JS Yet — Book 2",
    author: 'Kyle Simpson',
    series: "You Don't Know JS Yet",
    license: 'Şəxsi oxu üçün — orijinal mətn müəllifə aiddir',
    sum: 'JS-in üç sütunundan birincisi: scope sistemi, funksiya closure-ları və modul dizayn nümunəsi.',
    chapters: [
      ch1,
      ch2,
      ch3,
      ch4,
      ch5,
      ch6,
      ch7,
      ch8
    ]
  }
];

export function getBook(id: string): Book | undefined {
  return BOOKS.find((b) => b.id === id);
}

export function getChapter(bookId: string, chapterId: string): BookChapter | undefined {
  return getBook(bookId)?.chapters.find((c) => c.id === chapterId);
}

export function sectionText(section: BookSection): string {
  return section.blocks
    .map((b) => (isCode(b) ? b.code : `${b.en} ${b.az}`))
    .concat(section.note ?? '')
    .join(' ');
}

export const CHAPTER_COUNT = BOOKS.reduce((n, b) => n + b.chapters.length, 0);
