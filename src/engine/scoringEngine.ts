import { PokemonRole, AttackStyle, DimensionScores, MoveSlot, MoveOption, UniteMove } from '../types/pokemon';
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

/**
 * Returns the single "active" move for a slot — the one whose flags are
 * used for scoring. Priority:
 *   1. The option matching `slot.defaultChoice` (could be set to the
 *      user's explicit pick or the first-upgrade default from normalization)
 *   2. First upgrade option (isUpgrade = true)
 *   3. First option of any kind
 */
function getActiveMove(slot: MoveSlot): MoveOption | undefined {
  if (slot.options.length === 0) return undefined;
  const byDefault = slot.options.find(o => o.moveId === slot.defaultChoice);
  if (byDefault) return byDefault;
  return slot.options.find(o => o.isUpgrade) ?? slot.options[0];
}

export function computeDimensionScores(input: ScoringInput): DimensionScores {
  const { ratings, role, attackStyle, slot1, slot2, uniteMove, normalizedStats } = input;
  // Score based on the *active* (selected/default) move per slot, not every option.
  // This means a build that picks Flip Turn will NOT get a healing bonus,
  // while one that picks Aqua Ring will.
  const slot1Active = getActiveMove(slot1);
  const slot2Active = getActiveMove(slot2);
  const allMoves = [slot1Active, slot2Active].filter((m): m is MoveOption => !!m);

  // Use max-level stats (index 14 = level 15) for stat-based calculations
  const maxStats = normalizedStats.length > 0
    ? normalizedStats[normalizedStats.length - 1]
    : { hp: 0, atk: 0, def: 0, sp_atk: 0, sp_def: 0 };

  // ── Damage Output (0-10) ────────────────────────────────────────────────
  // Primary: offense rating (captures move quality + actual role in game)
  // Secondary: actual offensive stat at max level vs. absolute max across all roles
  // This ensures attackers/speedsters score high and supports/defenders score lower.
  const offStat =
    attackStyle === 'special'  ? maxStats.sp_atk :
    attackStyle === 'physical' ? maxStats.atk :
    Math.max(maxStats.atk, maxStats.sp_atk); // mixed

  // Absolute reference: top offensive stat across all Pokemon archetypes (~750)
  const ABS_OFF_REF = 750;
  const statScore = Math.min(10, (offStat / ABS_OFF_REF) * 10);
  const ratingScore = (ratings.offense / 5) * 10;
  // Blend 40% stat, 60% rating — rating encodes move quality & burst which raw stat misses
  let damageOutput = statScore * 0.4 + ratingScore * 0.6;
  const burstMoves = allMoves.filter(m => m.isBurst);
  if (burstMoves.length > 0) damageOutput += 0.5;
  const hasAoEMove = allMoves.some(
    m => m.name.toLowerCase().includes('bomb') ||
         m.name.toLowerCase().includes('blast') ||
         m.name.toLowerCase().includes('quake') ||
         m.categories.includes('area')
  );
  if (hasAoEMove) damageOutput += 0.3;
  damageOutput = clamp(damageOutput);

  // ── Durability (0-10) ───────────────────────────────────────────────────
  // Uses Effective HP (EHP) derived from actual HP, Def, and Sp. Def stats.
  // Formula mirrors the game's damage reduction: damage ∝ 1 / (1 + def/400)
  // so EHP_physical = HP × (400 + Def) / 400 — higher Def = more effective HP.
  // Normalized absolutely (not role-relative) so full teams of squishies score low.
  const ehpPhysical = maxStats.hp * (400 + maxStats.def) / 400;
  const ehpSpecial  = maxStats.hp * (400 + maxStats.sp_def) / 400;
  const avgEHP = (ehpPhysical + ehpSpecial) / 2;
  // Reference: top defender archetype EHP at L15 ≈ 31 000
  const MAX_EHP_REF = 31000;
  const ehpScore = Math.min(10, (avgEHP / MAX_EHP_REF) * 10);
  const enduranceScore = (ratings.endurance / 5) * 10;
  // 60% EHP stat, 40% endurance rating
  let durability = ehpScore * 0.6 + enduranceScore * 0.4;
  const hasSelfSustainMove = allMoves.some(m => m.isSustain || m.isHeal);
  if (hasSelfSustainMove) durability += 0.5; // self-heal boosts staying power
  durability = clamp(durability);

  // ── Crowd Control (0-10) ────────────────────────────────────────────────
  // Derived from the CC_MOVE_MAP: each mapped move contributes its quality ×
  // CC type weight × duration multiplier. For unmapped moves, a flat weight
  // is applied if the move has a ccType flag. Longer & harder CC = higher score.
  let crowdControl = 0;
  const seenMoveIds = new Set<string>(); // count each move once (base + upgrade share id)
  for (const m of allMoves) {
    if (seenMoveIds.has(m.moveId)) continue;
    seenMoveIds.add(m.moveId);
    const entry = CC_MOVE_MAP[m.moveId];
    if (entry) {
      // Scale by duration: cap at 3s so extreme values don't dominate
      const durationFactor = Math.min(entry.duration, 3) / 3;
      crowdControl += entry.quality * CC_TYPE_WEIGHTS[entry.ccType] * durationFactor * 4;
    } else if (m.ccType) {
      crowdControl += CC_TYPE_WEIGHTS[m.ccType] * 2.0;
    }
  }
  crowdControl = clamp(crowdControl);

  // ── Mobility (0-10) ─────────────────────────────────────────────────────
  // Mobility rating from pvpoke captures map presence & chase potential.
  // Dash moves (+1.5 each, capped at 2 moves) and dash unite moves add bonuses.
  // Speedster role gets an inherent +1 to reflect passive movement speed.
  let mobility = (ratings.mobility / 5) * 10;
  const dashMoves = allMoves.filter(m => m.isDash);
  mobility += Math.min(2, dashMoves.length) * 1.5;
  if (uniteMove.isDash) mobility += 1;
  if (role === 'speedster') mobility += 1;
  mobility = clamp(mobility);

  // ── Healing (0-10) ──────────────────────────────────────────────────────
  // Measures HP recovery the Pokemon can provide to itself or teammates.
  // Derived from: number of heal moves (isHeal) × weight, role bonus for
  // Supporters (who specialize in recovery), and the support stat rating.
  // High healing enables extended fights and sustain-focused strategies.
  let healing = 0;
  const healMoves = allMoves.filter(m => m.isHeal);
  healing += healMoves.length * 3.0; // each heal move is significant
  if (role === 'supporter') healing += 2.5; // supporters heal as part of identity
  if (role === 'defender')  healing += 0.5; // some defenders have minor heals
  healing += (ratings.support / 5) * 1.5;  // support rating proxy for team utility
  healing = clamp(healing);

  // ── Shielding (0-10) ────────────────────────────────────────────────────
  // Measures damage absorption capacity via shield moves.
  // Shields absorb incoming damage before HP is affected. Higher shielding
  // means the team can survive burst damage windows.
  let shielding = 0;
  const shieldMoves = allMoves.filter(m => m.isShield);
  shielding += shieldMoves.length * 3.5; // shields are strong defensive tools
  if (role === 'defender')  shielding += 2.5; // defenders specialize in soaking damage
  if (role === 'supporter') shielding += 1.0; // some supporters provide shields
  shielding += (ratings.endurance / 5) * 1.0; // higher endurance = more robust shielding
  shielding = clamp(shielding);

  // ── Objective Threat (0-10) ─────────────────────────────────────────────
  // Measures ability to contest and secure Dreadnaw, Zapdos, and Score zones.
  // Scoring rating is the primary factor; All-rounders and Speedsters naturally
  // excel at objectives. AoE unite moves help burst down objectives quickly.
  let objectiveThreat = (ratings.scoring / 5) * 10;
  if (role === 'all-rounder' || role === 'speedster') objectiveThreat += 1;
  if (uniteMove.isAoE) objectiveThreat += 0.5;
  objectiveThreat = clamp(objectiveThreat);

  // ── Early Game (0-10) ───────────────────────────────────────────────────
  // The leveling rating from pvpoke directly encodes how well a Pokemon
  // performs in the early laning phase — farming speed, level advantage,
  // and pre-evolution power. This is the most direct game data available.
  const earlyGame = clamp((ratings.leveling / 5) * 10);

  // ── Late Game (0-10) ────────────────────────────────────────────────────
  // Blend of offense + endurance ratings at max level, plus bonuses for
  // having upgraded moves (post-level-11 power spikes) and AoE unite moves
  // that are most impactful in the final Zapdos fight.
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
    healing,
    shielding,
    objectiveThreat,
    earlyGame,
    lateGame,
  };
}

export function computeCompositeScore(dimensionScores: DimensionScores): number {
  const { damageOutput, durability, crowdControl, mobility, healing, shielding, objectiveThreat, earlyGame, lateGame } = dimensionScores;
  return (
    damageOutput    * 0.16 +
    durability      * 0.13 +
    crowdControl    * 0.13 +
    mobility        * 0.09 +
    healing         * 0.09 +
    shielding       * 0.09 +
    objectiveThreat * 0.11 +
    earlyGame       * 0.10 +
    lateGame        * 0.10
  ) * 10; // scale to 0-100
}
