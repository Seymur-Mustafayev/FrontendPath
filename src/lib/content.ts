import { DEEP } from '../data/deep';
import { GLOSSARY } from '../data/glossary';
import { PATHS } from '../data/paths';
import type { Level, LearningPath, Topic } from '../types';

/** Mövzunun kimliyi: `${pathId}.${index}` — tərəqqi və DEEP açarı kimi istifadə olunur. */
export function topicId(pathId: string, index: number): string {
  return `${pathId}.${index}`;
}

/** Mövzunun göstəriləcək mətni: varsa geniş variant, yoxsa qısa mətn. */
export function topicText(pathId: string, index: number, topic: Topic): string {
  return DEEP[topicId(pathId, index)] ?? topic.body;
}

export function hasDeepText(pathId: string, index: number): boolean {
  return Boolean(DEEP[topicId(pathId, index)]);
}

/** Mətndə keçən [[termin]] açarları. */
export function termRefs(text: string): string[] {
  return [...text.matchAll(/\[\[([a-z0-9-]+)\]\]/g)].map((m) => m[1] as string);
}

/** Mövzunun bütün terminləri: mətndəkilər + əlavə göstərilənlər. */
export function topicTerms(pathId: string, index: number, topic: Topic): string[] {
  const text = topicText(pathId, index, topic);
  const keys = [...new Set([...termRefs(text), ...(topic.terms ?? [])])];
  return keys.filter((k) => GLOSSARY[k]);
}

/** Təxmini oxuma müddəti (dəqiqə). */
export function readingMinutes(text: string): number {
  return Math.max(2, Math.round(text.split(/\s+/).length / 170));
}

/** Yolların səviyyə üzrə mərhələləri. */
export interface Stage {
  level: Level;
  title: string;
  description: string;
  paths: LearningPath[];
}

export const STAGES: Stage[] = [
  {
    level: 'j',
    title: 'Mərhələ 01 — Təməl: veb, markup və stil',
    description: 'Bunlarsız React öyrənmək mühərriki bilmədən maşın sürməkdir.',
    paths: PATHS.filter((p) => p.lvl === 'j')
  },
  {
    level: 'jp',
    title: 'Mərhələ 02 — Dil və çərçivə: JS, TypeScript, React',
    description: 'Gündəlik işin nüvəsi. Burada dərinlik junior ilə middle arasındakı fərqi yaradır.',
    paths: PATHS.filter((p) => p.lvl === 'jp')
  },
  {
    level: 'm',
    title: 'Mərhələ 03 — Middle: sistem, keyfiyyət və komanda',
    description:
      'Kod yazmaqdan qərar verməyə keçid: state modeli, testing, CI/CD, performans, arxitektura.',
    paths: PATHS.filter((p) => p.lvl === 'm')
  }
];
