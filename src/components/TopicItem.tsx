import { useId, useState } from 'react';
import { useLocale } from '../i18n/useLocale';
import { hasDeepText, readingMinutes, topicId, topicTerms, topicText } from '../lib/content';
import { useProgress } from '../lib/useProgress';
import type { Topic } from '../types';
import { LevelBadge } from './LevelBadge';
import { TermChips } from './TermChips';
import { TopicBody } from './TopicBody';

interface Props {
  pathId: string;
  index: number;
  topic: Topic;
  defaultOpen?: boolean;
}

export function TopicItem({ pathId, index, topic, defaultOpen = false }: Props) {
  const [open, setOpen] = useState(defaultOpen);
  const { isDone, toggle } = useProgress();
  const { ui, content } = useLocale();
  const id = topicId(pathId, index);
  const bodyId = useId();
  const text = topicText(content, pathId, index, topic);
  const done = isDone(id);

  return (
    <li className={`topic${done ? ' topic--done' : ''}`} id={`t-${id}`}>
      <div className="thead">
        <input
          className="chk"
          type="checkbox"
          id={`c-${id}`}
          checked={done}
          onChange={() => toggle(id)}
          aria-label={ui.topic.markAria(topic.t)}
        />
        <button
          type="button"
          className="ttl"
          aria-expanded={open}
          aria-controls={bodyId}
          onClick={() => setOpen((v) => !v)}
        >
          {topic.t}
        </button>
        <LevelBadge level={topic.lvl} />
      </div>

      {open && (
        <div className="body" id={bodyId}>
          <p className="rmeta">
            {hasDeepText(content, pathId, index) ? ui.topic.deep : ''}
            {ui.topic.minutes(readingMinutes(text))}
          </p>
          <TopicBody text={text} />
          {topic.note && (
            <div className="note">
              <b>{ui.topic.mentor}</b>
              {topic.note}
            </div>
          )}
          <TermChips keys={topicTerms(content, pathId, index, topic)} />
        </div>
      )}
    </li>
  );
}
