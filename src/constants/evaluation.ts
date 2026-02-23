import { Tier } from '../types/pokemon';

export const DIMENSION_WEIGHTS = {
  damageOutput:    0.14,
  durability:      0.12,
  crowdControl:    0.11,
  mobility:        0.08,
  healing:         0.08,
  shielding:       0.08,
  teamFight:       0.08,
  engage:          0.07,
  objectiveThreat: 0.09,
  earlyGame:       0.08,
  lateGame:        0.07,
} as const; // total = 1.00

export const SYNERGY_BONUSES = {
  positive: 3,
  warning: -2,
  critical: -5,
} as const;

export const TIER_THRESHOLDS: { min: number; tier: Tier }[] = [
  { min: 8.5, tier: 'S' },
  { min: 7.0, tier: 'A' },
  { min: 5.5, tier: 'B' },
  { min: 4.0, tier: 'C' },
  { min: 0, tier: 'D' },
];

export const SCORE_COLORS = {
  high: '#22C55E',   // >= 7
  mid: '#EAB308',    // 4-7
  low: '#EF4444',    // < 4
} as const;

export function getScoreColor(score: number): string {
  if (score >= 7) return SCORE_COLORS.high;
  if (score >= 4) return SCORE_COLORS.mid;
  return SCORE_COLORS.low;
}

export function getTierFromScore(score: number): Tier {
  for (const { min, tier } of TIER_THRESHOLDS) {
    if (score >= min) return tier;
  }
  return 'D';
}

export const COMPOSITE_TIER_LABELS: Record<string, string> = {
  'S+': 'Meta-Defining',
  'S':  'Tournament Ready',
  'A':  'Highly Competitive',
  'B':  'Solid Composition',
  'C':  'Needs Work',
  'D':  'Unoptimized',
};
