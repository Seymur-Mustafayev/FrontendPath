import { useUI } from '../i18n/useLocale';

export function ProgressBar({ done, total }: { done: number; total: number }) {
  const pct = total === 0 ? 0 : Math.round((done / total) * 100);
  const ui = useUI();
  return (
    <span className="bar" role="img" aria-label={ui.progressAria(done, total)}>
      <i style={{ width: `${pct}%` }} />
    </span>
  );
}
