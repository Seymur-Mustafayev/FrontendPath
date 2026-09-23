import { LEVEL_LABEL } from '../types';
import type { Level } from '../types';

export function LevelBadge({ level }: { level: Level }) {
  return <span className={`lvl lvl--${level}`}>{LEVEL_LABEL[level]}</span>;
}
