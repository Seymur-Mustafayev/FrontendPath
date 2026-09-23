import type { Content } from '../i18n/content';
import type { Level, LearningPath, Topic } from '../types';

export function topicId(pathId: string, index: number): string {
  return `${pathId}.${index}`;
}

export function topicText(content: Content, pathId: string, index: number, topic: Topic): string {
  return content.deep[topicId(pathId, index)] ?? topic.body;
}

export function hasDeepText(content: Content, pathId: string, index: number): boolean {
  return Boolean(content.deep[topicId(pathId, index)]);
}

export function termRefs(text: string): string[] {
  return [...text.matchAll(/\[\[([a-z0-9-]+)\]\]/g)].map((m) => m[1] as string);
}

export function topicTerms(content: Content, pathId: string, index: number, topic: Topic): string[] {
  const text = topicText(content, pathId, index, topic);
  const keys = [...new Set([...termRefs(text), ...(topic.terms ?? [])])];
  return keys.filter((k) => content.glossary[k]);
}

export function readingMinutes(text: string): number {
  return Math.max(2, Math.round(text.split(/\s+/).length / 170));
}

export const LEVELS: Level[] = ['j', 'jp', 'm'];

export function pathsOfLevel(content: Content, level: Level): LearningPath[] {
  return content.paths.filter((p) => p.lvl === level);
}

export function pathIndex(content: Content, id: string): number {
  return content.paths.findIndex((p) => p.id === id);
}
