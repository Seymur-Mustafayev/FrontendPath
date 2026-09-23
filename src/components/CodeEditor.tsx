import { useRef } from 'react';
import type { KeyboardEvent } from 'react';

const INDENT = '  ';

export function CodeEditor({
  id,
  value,
  onChange,
  onRun,
  label
}: {
  id: string;
  value: string;
  onChange: (value: string) => void;
  onRun: () => void;
  label: string;
}) {
  const ref = useRef<HTMLTextAreaElement>(null);
  const escaped = useRef(false);
  const lines = value.split('\n').length;

  function replace(start: number, end: number, text: string, caret: number) {
    const el = ref.current;
    if (!el) return;
    onChange(value.slice(0, start) + text + value.slice(end));
    requestAnimationFrame(() => el.setSelectionRange(caret, caret));
  }

  function onKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    const el = e.currentTarget;
    const { selectionStart: start, selectionEnd: end } = el;

    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      onRun();
      return;
    }
    if (e.key === 'Escape') {
      escaped.current = true;
      return;
    }
    if (e.key === 'Tab' && !escaped.current) {
      e.preventDefault();
      if (e.shiftKey) {
        const lineStart = value.lastIndexOf('\n', start - 1) + 1;
        if (value.startsWith(INDENT, lineStart)) {
          replace(lineStart, lineStart + INDENT.length, '', Math.max(lineStart, start - INDENT.length));
        }
      } else {
        replace(start, end, INDENT, start + INDENT.length);
      }
      return;
    }
    escaped.current = false;
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      const lineStart = value.lastIndexOf('\n', start - 1) + 1;
      const indent = /^[ \t]*/.exec(value.slice(lineStart, start))?.[0] ?? '';
      const extra = /[{[(]\s*$/.test(value.slice(lineStart, start)) ? INDENT : '';
      const text = '\n' + indent + extra;
      replace(start, end, text, start + text.length);
    }
  }

  return (
    <div className="code-editor">
      <div className="code-editor-gutter" aria-hidden="true">
        {Array.from({ length: lines }, (_, i) => (
          <span key={i}>{i + 1}</span>
        ))}
      </div>
      <textarea
        ref={ref}
        id={id}
        aria-label={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={onKeyDown}
        spellCheck={false}
        autoCapitalize="off"
        autoComplete="off"
        autoCorrect="off"
        wrap="off"
        rows={Math.max(12, lines + 2)}
      />
    </div>
  );
}
