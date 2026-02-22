import { Tier } from '../../types/pokemon';
import { clsx } from 'clsx';

const TIER_COLORS: Record<Tier, { text: string; bg: string }> = {
  S: { text: '#FFD700', bg: 'rgba(255,215,0,0.15)' },
  A: { text: '#C0C0C0', bg: 'rgba(192,192,192,0.15)' },
  B: { text: '#CD7F32', bg: 'rgba(205,127,50,0.15)' },
  C: { text: '#9CA3AF', bg: 'rgba(156,163,175,0.15)' },
  D: { text: '#6B7280', bg: 'rgba(107,114,128,0.15)' },
};

interface Props {
  tier: Tier;
  size?: 'sm' | 'md' | 'lg';
}

export function TierBadge({ tier, size = 'md' }: Props) {
  const colors = TIER_COLORS[tier];
  return (
    <span
      className={clsx(
        'inline-flex items-center justify-center rounded font-bold',
        size === 'sm' && 'w-5 h-5 text-xs',
        size === 'md' && 'w-6 h-6 text-sm',
        size === 'lg' && 'w-8 h-8 text-base',
      )}
      style={{ color: colors.text, backgroundColor: colors.bg, border: `1px solid ${colors.text}40` }}
    >
      {tier}
    </span>
  );
}
