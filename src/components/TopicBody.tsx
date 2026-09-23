import { Fragment } from 'react';
import type { ReactNode } from 'react';
import { useContent } from '../i18n/useLocale';
import { useTermDialog } from '../lib/useTermDialog';

/**
 * Mövzu mətnini render edir.
 *
 * Dəstəklənən format:
 *   `## Başlıq`     → alt başlıq
 *   ```kod```       → kod bloku
 *   `> mətn`        → sitat bloku
 *   [[term-key]]    → lüğət termini (klikləndə pop-up açılır)
 *   `kod`           → sətiriçi kod
 */
export function TopicBody({ text }: { text: string }) {
  const blocks = text.split('\n\n');
  return (
    <>
      {blocks.map((block, i) => (
        <Block key={i} raw={block} />
      ))}
    </>
  );
}

function Block({ raw }: { raw: string }) {
  if (raw.startsWith('```')) {
    const code = raw.replace(/^```[a-z]*\n?/, '').replace(/\n?```$/, '');
    return (
      <pre className="code">
        <code>{code}</code>
      </pre>
    );
  }
  if (raw.startsWith('## ')) {
    return <h4 className="sub">{raw.slice(3)}</h4>;
  }
  if (raw.startsWith('> ')) {
    return (
      <blockquote>
        <Inline text={raw.slice(2)} />
      </blockquote>
    );
  }
  return (
    <p>
      <Inline text={raw} />
    </p>
  );
}

const TOKEN = /\[\[([a-z0-9-]+)\]\]|`([^`]+)`/g;

function Inline({ text }: { text: string }) {
  const { openTerm } = useTermDialog();
  const { glossary } = useContent();
  const nodes: ReactNode[] = [];
  let last = 0;
  let match: RegExpExecArray | null;

  TOKEN.lastIndex = 0;
  while ((match = TOKEN.exec(text)) !== null) {
    if (match.index > last) nodes.push(text.slice(last, match.index));

    const termKey = match[1];
    const code = match[2];

    if (termKey) {
      const entry = glossary[termKey];
      nodes.push(
        entry ? (
          <button
            key={`${termKey}-${match.index}`}
            type="button"
            className="term term--inline"
            onClick={() => openTerm(termKey)}
            title={`${entry.en} — ${entry.tr}`}
          >
            {entry.en}
          </button>
        ) : (
          termKey.replace(/-/g, ' ')
        )
      );
    } else if (code) {
      nodes.push(<code key={`c-${match.index}`}>{code}</code>);
    }
    last = match.index + match[0].length;
  }
  if (last < text.length) nodes.push(text.slice(last));

  return (
    <>
      {nodes.map((n, i) => (
        <Fragment key={i}>{n}</Fragment>
      ))}
    </>
  );
}
