import { getScoreColor } from '../../constants/evaluation';

interface Props {
  label: string;
  score: number;
  maxScore?: number;
  showValue?: boolean;
}

export function ScoreBar({ label, score, maxScore = 10, showValue = true }: Props) {
  const safeScore = score ?? 0;
  const pct = Math.min(100, (safeScore / maxScore) * 100);
  const color = getScoreColor(safeScore);

  return (
    <div className="flex items-center gap-2">
      <span className="w-28 text-xs text-slate-400 shrink-0">{label}</span>
      <div className="flex-1 h-2 bg-slate-700/50 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-300"
          style={{ width: `${pct}%`, backgroundColor: color }}
        />
      </div>
      {showValue && (
        <span className="w-8 text-right text-xs font-mono font-semibold" style={{ color }}>
          {safeScore.toFixed(1)}
        </span>
      )}
    </div>
  );
}
