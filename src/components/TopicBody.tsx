import { Fragment } from 'react';
import type { ReactNode } from 'react';
import { useContent } from '../i18n/useLocale';
import { useTermDialog } from '../lib/useTermDialog';

export function TopicBody({ text }: { text: string }) {
  const blocks: string[] = [];
  for (const part of text.split('\n\n')) {
    const prev = blocks.at(-1);
    const inFence = prev !== undefined && (prev.match(/```/g) ?? []).length % 2 === 1;
    if (inFence) blocks[blocks.length - 1] = prev + '\n\n' + part;
    else blocks.push(part);
  }
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
  const lines = raw.split('\n');
  if (lines.length > 0 && lines.every((l) => /^[-*] /.test(l))) {
    return (
      <ul>
        {lines.map((l, i) => (
          <li key={i}>
            <Inline text={l.slice(2)} />
          </li>
        ))}
      </ul>
    );
  }
  if (lines.length > 0 && lines.every((l) => /^\d+\. /.test(l))) {
    return (
      <ol start={Number(/^\d+/.exec(lines[0]!)![0])}>
        {lines.map((l, i) => (
          <li key={i}>
            <Inline text={l.replace(/^\d+\. /, '')} />
          </li>
        ))}
      </ol>
    );
  }
  if (lines.every((l) => l === '>' || l.startsWith('> '))) {
    const paras = lines
      .map((l) => l.slice(2))
      .join('\n')
      .split(/\n{2,}/)
      .filter((p) => p.trim());
    return (
      <blockquote>
        {paras.length === 1 ? (
          <Inline text={paras[0]!} />
        ) : (
          paras.map((p, i) => (
            <p key={i}>
              <Inline text={p} />
            </p>
          ))
        )}
      </blockquote>
    );
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

const TOKEN = /\[\[([a-z0-9-]+)\]\]|`([^`]+)`|\*\*(.+?)\*\*|\*(?![\s*])([^*\n]+?)\*(?!\*)/g;

function Inline({ text }: { text: string }) {
  const { openTerm } = useTermDialog();
  const { glossary } = useContent();
  const nodes: ReactNode[] = [];
  let last = 0;
  let match: RegExpExecArray | null;

  const token = new RegExp(TOKEN);
  while ((match = token.exec(text)) !== null) {
    if (match.index > last) nodes.push(text.slice(last, match.index));

    const termKey = match[1];
    const code = match[2];
    const bold = match[3];
    const italic = match[4];

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
    } else if (bold) {
      nodes.push(
        <strong key={`b-${match.index}`}>
          <Inline text={bold} />
        </strong>
      );
    } else if (italic) {
      nodes.push(
        <em key={`i-${match.index}`}>
          <Inline text={italic} />
        </em>
      );
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
