import { Pokemon, DimensionScores } from '../types/pokemon';
import { TeamEvaluation, SynergyFlag, PowerCurvePoint } from '../types/evaluation';
import { evaluateSynergies } from './synergyEngine';
import { DIMENSION_WEIGHTS, SYNERGY_BONUSES, getTierFromScore } from '../constants/evaluation';

const ZERO_DIMENSIONS: DimensionScores = { damageOutput: 0, durability: 0, crowdControl: 0, mobility: 0, healing: 0, shielding: 0, teamFight: 0, engage: 0, objectiveThreat: 0, earlyGame: 0, lateGame: 0 };
const DIMENSION_KEYS = Object.keys(ZERO_DIMENSIONS) as (keyof DimensionScores)[];

function avgDimensions(pokemon: Pokemon[]): DimensionScores {
  if (pokemon.length === 0) return { ...ZERO_DIMENSIONS };
  const avg = { ...ZERO_DIMENSIONS };
  for (const k of DIMENSION_KEYS) {
    // Use ?? 0 to guard against stale persisted data missing new dimension keys
    avg[k] = pokemon.reduce((sum, p) => sum + (p.dimensionScores[k] ?? 0), 0) / pokemon.length;
  }
  return avg;
}

function computeCompositeScore(dims: DimensionScores, flags: SynergyFlag[]): number {
  let score = 0;
  score += dims.damageOutput    * DIMENSION_WEIGHTS.damageOutput    * 10;
  score += dims.durability      * DIMENSION_WEIGHTS.durability      * 10;
  score += dims.crowdControl    * DIMENSION_WEIGHTS.crowdControl    * 10;
  score += dims.mobility        * DIMENSION_WEIGHTS.mobility        * 10;
  score += dims.healing         * DIMENSION_WEIGHTS.healing         * 10;
  score += dims.shielding       * DIMENSION_WEIGHTS.shielding       * 10;
  score += (dims.teamFight ?? 0) * DIMENSION_WEIGHTS.teamFight      * 10;
  score += (dims.engage    ?? 0) * DIMENSION_WEIGHTS.engage         * 10;
  score += dims.objectiveThreat * DIMENSION_WEIGHTS.objectiveThreat * 10;
  score += dims.earlyGame       * DIMENSION_WEIGHTS.earlyGame       * 10;
  score += dims.lateGame        * DIMENSION_WEIGHTS.lateGame        * 10;

  for (const flag of flags) {
    score += SYNERGY_BONUSES[flag.severity];
  }

  return Math.max(0, Math.min(100, Math.round(score)));
}

function generateStrengths(dims: DimensionScores, flags: SynergyFlag[]): string[] {
  const strengths: string[] = [];
  if (dims.damageOutput >= 7) strengths.push('Exceptional damage output that can burst enemies quickly');
  if (dims.durability >= 7) strengths.push('High durability allows sustained fighting and frontlining');
  if (dims.crowdControl >= 7) strengths.push('Strong Crowd Control lockdown limits enemy options in team fights');
  if (dims.mobility >= 7) strengths.push('High mobility enables excellent rotation and pick potential');
  if (dims.healing >= 7) strengths.push('Abundant healing keeps the team healthy through prolonged fights');
  if (dims.shielding >= 7) strengths.push('Strong shielding absorbs burst damage and protects carries');
  if ((dims.teamFight ?? 0) >= 7) strengths.push('Dominant team fight potential with AoE pressure and coordination');
  if ((dims.engage ?? 0) >= 7) strengths.push('Strong initiation threat — can start fights on favorable terms');
  if (dims.objectiveThreat >= 7) strengths.push('Strong objective threat secures Zapdos and Dreadnaw consistently');
  if (dims.earlyGame >= 7) strengths.push('Dominates early game, enabling snowball through objectives');
  if (dims.lateGame >= 7) strengths.push('Scales extremely well into the late game and Zapdos fights');
  flags.filter(f => f.severity === 'positive').forEach(f => strengths.push(f.description.split('.')[0]));
  return strengths.slice(0, 4);
}

function generateWeaknesses(dims: DimensionScores, flags: SynergyFlag[]): string[] {
  const weaknesses: string[] = [];
  if (dims.damageOutput < 4) weaknesses.push('Low damage output — struggles to burst enemies or apply pressure');
  if (dims.durability < 4) weaknesses.push('Fragile composition — vulnerable to dive and assassination');
  if (dims.crowdControl < 4) weaknesses.push('Lack of Crowd Control makes it difficult to control team fights');
  if (dims.mobility < 4) weaknesses.push('Low mobility — easily kited and struggles to cover map');
  if (dims.healing < 3 && dims.shielding < 3) weaknesses.push('No healing or shielding — team has no recovery during fights');
  if ((dims.teamFight ?? 0) < 4) weaknesses.push('Weak team fight potential — struggles in 5v5 Zapdos clashes');
  if ((dims.engage ?? 0) < 4) weaknesses.push('Low initiation threat — opponents control fight timing');
  if (dims.objectiveThreat < 4) weaknesses.push('Weak objective play — may lose Dreadnaw and Zapdos contests');
  if (dims.earlyGame < 4) weaknesses.push('Slow early game — vulnerable to early objective loss');
  flags.filter(f => f.severity === 'critical').forEach(f => weaknesses.push(f.description.split('.')[0]));
  flags.filter(f => f.severity === 'warning').forEach(f => weaknesses.push(f.description.split('.')[0]));
  return weaknesses.slice(0, 4);
}

function generateCoachingTips(dims: DimensionScores, flags: SynergyFlag[], compositeScore: number): string[] {
  const tips: string[] = [];

  if (flags.some(f => f.id === 'missing_defender')) {
    tips.push('Add a Defender or Supporter to protect your damage dealers and increase survivability');
  }
  if (flags.some(f => f.id === 'no_cc')) {
    tips.push('Add a Pokémon with Crowd Control moves (stun, sleep, root) to control enemy movement in team fights');
  }
  if (flags.some(f => f.id === 'double_carry')) {
    tips.push('Replace one Attacker with a Defender or All-Rounder to improve team durability');
  }
  if (dims.objectiveThreat < 5) {
    tips.push('Focus Dreadnaw at 5:00 to secure early point bonus, then rotate for Rotom/Regis');
  }
  if (dims.earlyGame < 5 && dims.lateGame >= 7) {
    tips.push('Play safe early and farm to level — this is a scaling comp that wins late if kept alive');
  }
  if (dims.mobility < 4) {
    tips.push('Equip Eject Button or X Speed on key Pokemon to compensate for low mobility');
  }
  if ((dims.teamFight ?? 0) < 5) {
    tips.push('Pick Pokémon with AoE moves or CC to improve 5v5 performance around objectives');
  }
  if ((dims.engage ?? 0) < 4) {
    tips.push('Add a dash+CC initiator (e.g. Tsareena, Blastoise, Talonflame) to gain fight control');
  }
  if (flags.some(f => f.id === 'cc_chain')) {
    tips.push('Coordinate CC rotation: stagger your CC abilities to maintain enemy lock-out');
  }
  if (compositeScore >= 70) {
    tips.push('Strong composition — focus on coordination and objective timing execution');
  }
  return tips.slice(0, 3);
}

function generatePowerCurve(pokemon: Pokemon[]): PowerCurvePoint[] {
  const curve: PowerCurvePoint[] = [];
  const gameMinutes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  for (const minute of gameMinutes) {
    // Early game weight decreases, late game increases
    const earlyWeight = Math.max(0, 1 - (minute / 10));
    const lateWeight = Math.min(1, minute / 10);
    const avgEarly = pokemon.reduce((s, p) => s + p.dimensionScores.earlyGame, 0) / (pokemon.length || 1);
    const avgLate = pokemon.reduce((s, p) => s + p.dimensionScores.lateGame, 0) / (pokemon.length || 1);
    const power = (avgEarly * earlyWeight + avgLate * lateWeight) * 10;
    curve.push({
      minute,
      power: Math.round(power),
      label: minute === 5 ? 'Dreadnaw' : minute === 2 ? 'Zapdos' : undefined,
    });
  }
  return curve;
}

export function evaluateTeam(slots: (Pokemon | null)[]): TeamEvaluation {
  const pokemon = slots.filter((p): p is Pokemon => p !== null);
  const dimensionAverages = avgDimensions(pokemon);
  const synergyFlags = evaluateSynergies(slots);
  const compositeScore = computeCompositeScore(dimensionAverages, synergyFlags);
  const tier = getTierFromScore(compositeScore / 10);

  return {
    compositeScore,
    tier,
    dimensionAverages,
    synergyFlags,
    strengths: generateStrengths(dimensionAverages, synergyFlags),
    weaknesses: generateWeaknesses(dimensionAverages, synergyFlags),
    coachingTips: generateCoachingTips(dimensionAverages, synergyFlags, compositeScore),
    powerCurveData: generatePowerCurve(pokemon),
  };
}
