import { clsx } from 'clsx';

interface Props {
  score: number; // 0-100
  tier: string;
}

const TIER_LABEL: Record<string, string> = {
  'S': 'Tournament Ready',
  'A': 'Highly Competitive',
  'B': 'Solid Composition',
  'C': 'Needs Work',
  'D': 'Unoptimized',
};

function getScoreStyle(score: number) {
  if (score >= 75) return { color: '#22C55E', label: 'Strong' };
  if (score >= 60) return { color: '#86EFAC', label: 'Good' };
  if (score >= 45) return { color: '#EAB308', label: 'Average' };
  if (score >= 30) return { color: '#F97316', label: 'Weak' };
  return { color: '#EF4444', label: 'Poor' };
}

export function CompScoreGauge({ score, tier }: Props) {
  const { color, label } = getScoreStyle(score);
  const circumference = 2 * Math.PI * 45;
  const progress = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative w-28 h-28">
        <svg width="112" height="112" viewBox="0 0 112 112">
          {/* Background ring */}
          <circle cx="56" cy="56" r="45" fill="none" stroke="#1e3a5f" strokeWidth="10" />
          {/* Progress ring */}
          <circle
            cx="56"
            cy="56"
            r="45"
            fill="none"
            stroke={color}
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={progress}
            transform="rotate(-90 56 56)"
            style={{ transition: 'stroke-dashoffset 0.5s ease' }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-white" style={{ fontFamily: 'Rajdhani, sans-serif' }}>{score}</span>
          <span className="text-xs" style={{ color }}>{label}</span>
        </div>
      </div>
      <div className="text-center">
        <div className="text-lg font-bold text-white" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
          Tier {tier}
        </div>
        <div className="text-xs text-slate-400">{TIER_LABEL[tier] || 'Building...'}</div>
      </div>
    </div>
  );
}
