import { useId, useState } from 'react';
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
  /** Səhifə açılanda bu mövzu dərhal açıq gəlsin (axtarış nəticəsindən keçid). */
  defaultOpen?: boolean;
}

export function TopicItem({ pathId, index, topic, defaultOpen = false }: Props) {
  const [open, setOpen] = useState(defaultOpen);
  const { isDone, toggle } = useProgress();
  const id = topicId(pathId, index);
  const bodyId = useId();
  const text = topicText(pathId, index, topic);
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
          aria-label={`«${topic.t}» mövzusunu tamamlandı kimi işarələ`}
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
            {hasDeepText(pathId, index) ? 'GENİŞ MƏTN · ' : ''}~{readingMinutes(text)} DƏQİQƏ OXU
          </p>
          <TopicBody text={text} />
          {topic.note && (
            <div className="note">
              <b>Mentor qeydi</b>
              {topic.note}
            </div>
          )}
          <TermChips keys={topicTerms(pathId, index, topic)} />
        </div>
      )}
    </li>
  );
}
