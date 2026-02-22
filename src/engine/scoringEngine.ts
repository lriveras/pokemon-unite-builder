import { PokemonRole, AttackStyle, DimensionScores, MoveSlot, UniteMove } from '../types/pokemon';
import { CC_MOVE_MAP, CC_TYPE_WEIGHTS } from '../constants/ccMoveMap';

interface ScoringInput {
  ratings: {
    offense: number;
    endurance: number;
    mobility: number;
    scoring: number;
    support: number;
    leveling: number;
  };
  role: PokemonRole;
  attackStyle: AttackStyle;
  slot1: MoveSlot;
  slot2: MoveSlot;
  uniteMove: UniteMove;
  normalizedStats: Array<{ hp: number; atk: number; def: number; sp_atk: number; sp_def: number }>;
}

function clamp(val: number, min = 0, max = 10): number {
  return Math.max(min, Math.min(max, val));
}

export function computeDimensionScores(input: ScoringInput): DimensionScores {
  const { ratings, role, attackStyle, slot1, slot2, uniteMove, normalizedStats } = input;
  const allMoves = [...slot1.options, ...slot2.options];

  // Average HP across all levels for endurance reference
  const avgHP = normalizedStats.reduce((sum, s) => sum + (s.hp || 0), 0) / normalizedStats.length;
  const ROLE_AVG_HP: Record<PokemonRole, number> = {
    attacker: 3500,
    defender: 6500,
    supporter: 4000,
    speedster: 3200,
    'all-rounder': 4500,
  };

  // -- Damage Output (0-10) --
  let damageOutput = (ratings.offense / 5) * 10;
  if (attackStyle === 'special') damageOutput += 0.5;
  const hasAoEMove = allMoves.some(m => m.name.toLowerCase().includes('bomb') || m.name.toLowerCase().includes('blast') || m.name.toLowerCase().includes('quake'));
  if (hasAoEMove) damageOutput += 0.5;
  damageOutput = clamp(damageOutput);

  // -- Durability (0-10) --
  let durability = (ratings.endurance / 5) * 10;
  const hpFactor = avgHP / ROLE_AVG_HP[role];
  durability += (hpFactor - 1) * 3;
  const hasSustainMove = allMoves.some(m => m.isSustain || m.isHeal);
  if (hasSustainMove) durability += 1;
  durability = clamp(durability);

  // -- Crowd Control (0-10) --
  let crowdControl = 0;
  const ccMoves = allMoves.filter(m => {
    const entry = CC_MOVE_MAP[m.moveId];
    return entry || m.ccType;
  });
  for (const m of ccMoves) {
    const entry = CC_MOVE_MAP[m.moveId];
    if (entry) {
      crowdControl += entry.quality * CC_TYPE_WEIGHTS[entry.ccType] * 2.5;
    } else if (m.ccType) {
      crowdControl += CC_TYPE_WEIGHTS[m.ccType] * 2.0;
    }
  }
  crowdControl = clamp(crowdControl);

  // -- Mobility (0-10) --
  let mobility = (ratings.mobility / 5) * 10;
  const dashMoves = allMoves.filter(m => m.isDash);
  mobility += dashMoves.length * 1.5;
  if (uniteMove.isDash) mobility += 1;
  if (role === 'speedster') mobility += 1;
  mobility = clamp(mobility);

  // -- Sustain/Healing (0-10) --
  let sustain = 0;
  const healMoves = allMoves.filter(m => m.isHeal);
  const shieldMoves = allMoves.filter(m => m.isShield);
  sustain += healMoves.length * 2.5;
  sustain += shieldMoves.length * 2.0;
  if (role === 'supporter') sustain += 2;
  if (role === 'defender') sustain += 1;
  // also from leveling (recovery role proxy)
  sustain += (ratings.support / 5) * 2;
  sustain = clamp(sustain);

  // -- Objective Threat (0-10) --
  let objectiveThreat = (ratings.scoring / 5) * 10;
  if (role === 'all-rounder' || role === 'speedster') objectiveThreat += 1;
  if (uniteMove.isAoE) objectiveThreat += 0.5;
  objectiveThreat = clamp(objectiveThreat);

  // -- Early Game (0-10) --
  let earlyGame = (ratings.leveling / 5) * 10;
  // Penalty for late-evolving Pokemon (first evolution at high level)
  const lateEvolution = false; // Would check stages here if available
  if (lateEvolution) earlyGame -= 2;
  earlyGame = clamp(earlyGame);

  // -- Late Game (0-10) --
  let lateGame = ((ratings.offense + ratings.endurance) / 2 / 5) * 10;
  const hasUpgradedMove = allMoves.some(m => m.isUpgrade);
  if (hasUpgradedMove) lateGame += 0.5;
  if (uniteMove.isAoE) lateGame += 0.5;
  lateGame = clamp(lateGame);

  return {
    damageOutput,
    durability,
    crowdControl,
    mobility,
    sustain,
    objectiveThreat,
    earlyGame,
    lateGame,
  };
}

export function computeCompositeScore(dimensionScores: DimensionScores): number {
  const { damageOutput, durability, crowdControl, mobility, sustain, objectiveThreat, earlyGame, lateGame } = dimensionScores;
  return (
    damageOutput * 0.18 +
    durability * 0.15 +
    crowdControl * 0.15 +
    mobility * 0.10 +
    sustain * 0.10 +
    objectiveThreat * 0.12 +
    earlyGame * 0.10 +
    lateGame * 0.10
  ) * 10; // scale to 0-100
}
