/** Yol üzrə tamamlanma zolağı. */
export function ProgressBar({ done, total }: { done: number; total: number }) {
  const pct = total === 0 ? 0 : Math.round((done / total) * 100);
  return (
    <span className="bar" role="img" aria-label={`${done} / ${total} mövzu tamamlanıb`}>
      <i style={{ width: `${pct}%` }} />
    </span>
  );
}
