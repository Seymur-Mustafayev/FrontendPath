export type Level = 'j' | 'jp' | 'm';

export const LEVEL_LABEL: Record<Level, string> = {
  j: 'Junior',
  jp: 'Junior+',
  m: 'Middle'
};

export interface Topic {
  t: string;
  lvl: Level;
  body: string;
  note?: string;
  terms?: string[];
}

export interface LearningPath {
  id: string;
  name: string;
  lvl: Level;
  sum: string;
  goal: string;
  topics: Topic[];
}

export interface TermEntry {
  key: string;
  en: string;
  tr: string;
  def: string;
  ex?: string;
}

export interface TopicHit {
  path: LearningPath;
  pathIndex: number;
  topic: Topic;
  topicIndex: number;
  topicId: string;
}
