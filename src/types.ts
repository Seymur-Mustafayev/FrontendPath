/** Mövzunun və yolun səviyyəsi. */
export type Level = 'j' | 'jp' | 'm';

export const LEVEL_LABEL: Record<Level, string> = {
  j: 'Junior',
  jp: 'Junior+',
  m: 'Middle'
};

/** Bir mövzu — yolun daxilindəki tək öyrənmə vahidi. */
export interface Topic {
  /** Mövzunun başlığı. */
  t: string;
  lvl: Level;
  /** Qısa mətn (DEEP-də geniş variantı olmayan hallarda istifadə olunur). */
  body: string;
  /** Mentor qeydi — nə vaxt istifadə etmə, nəyə diqqət et. */
  note?: string;
  /** Mətndə keçməyən, lakin siyahıya əlavə olunası termin açarları. */
  terms?: string[];
}

/** Bir öyrənmə yolu — mövzular toplusu. */
export interface LearningPath {
  id: string;
  name: string;
  lvl: Level;
  /** Yolun nə haqqında olduğu. */
  sum: string;
  /** Bu yolu bitirəndə nə bacarmalısan. */
  goal: string;
  topics: Topic[];
}

/** Lüğət termini. */
export interface TermEntry {
  key: string;
  /** İngiliscə termin. */
  en: string;
  /** Seçilmiş dildə qarşılıq (AZ/RU) və ya qısa izah (EN). */
  tr: string;
  def: string;
  /** İstəyə bağlı kod nümunəsi. */
  ex?: string;
}

/** Mövzu axtarışının nəticəsi. */
export interface TopicHit {
  path: LearningPath;
  pathIndex: number;
  topic: Topic;
  topicIndex: number;
  topicId: string;
}
