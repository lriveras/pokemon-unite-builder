import { DimensionScores } from './pokemon';

export type SynergySeverity = 'positive' | 'warning' | 'critical';

export interface SynergyFlag {
  id: string;
  label: string;
  description: string;
  severity: SynergySeverity;
}

export interface TeamEvaluation {
  compositeScore: number;
  tier: string;
  dimensionAverages: DimensionScores;
  synergyFlags: SynergyFlag[];
  strengths: string[];
  weaknesses: string[];
  coachingTips: string[];
  powerCurveData: PowerCurvePoint[];
}

export interface PowerCurvePoint {
  minute: number;
  power: number;
  label?: string;
}

export interface DamageCalculationResult {
  pokemonId: string;
  pokemonName: string;
  level: number;
  moves: MoveDamageResult[];
  basicAttack: BasicAttackResult;
  totalDPS: number;
}

export interface MoveDamageResult {
  moveId: string;
  moveName: string;
  baseDamage: number;
  critDamage: number | null;
  totalDamage: number;
  dps: number;
  cooldown: number;
  hitCount: number;
}

export interface BasicAttackResult {
  normalDamage: number;
  boostedDamage: number;
  boostInterval: number;
}

export interface HiddenStatsResult {
  pokemonId: string;
  pokemonName: string;
  level: number;
  effectiveHPPhysical: number;
  effectiveHPSpecial: number;
  damageReductionPhysical: number;
  damageReductionSpecial: number;
  boostInterval: number;
  evolutionLevel: number | null;
  totalCCDuration: number;
  moveDPS: MoveDPSEntry[];
  itemBreakpoints: ItemBreakpointEntry[];
  healingPerSecond: number;
}

export interface MoveDPSEntry {
  moveId: string;
  moveName: string;
  dps: number;
}

export interface ItemBreakpointEntry {
  itemId: string;
  itemName: string;
  grade1Value: number;
  grade20Value: number;
  grade30Value: number;
  statName: string;
}
