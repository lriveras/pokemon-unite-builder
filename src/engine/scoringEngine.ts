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
  const offStat =
    attackStyle === 'special'  ? maxStats.sp_atk :
    attackStyle === 'physical' ? maxStats.atk :
    Math.max(maxStats.atk, maxStats.sp_atk);

  const ABS_OFF_REF = 750;
  const statScore = Math.min(10, (offStat / ABS_OFF_REF) * 10);
  const ratingScore = (ratings.offense / 5) * 10;
  let damageOutput = statScore * 0.4 + ratingScore * 0.6;
  // Burst moves (spike damage, one-shot potential)
  const burstMoves = allMoves.filter(m => m.isBurst);
  damageOutput += burstMoves.length * 0.75;
  // AoE move bonus — spreading damage across multiple targets
  const aoeMovesForDmg = allMoves.filter(m => m.isAoE);
  damageOutput += aoeMovesForDmg.length * 0.4;
  // Unite move AoE bonus
  if (uniteMove.isAoE) damageOutput += 0.3;
  damageOutput = clamp(damageOutput);

  // ── Durability (0-10) ───────────────────────────────────────────────────
  const ehpPhysical = maxStats.hp * (400 + maxStats.def) / 400;
  const ehpSpecial  = maxStats.hp * (400 + maxStats.sp_def) / 400;
  const avgEHP = (ehpPhysical + ehpSpecial) / 2;
  const MAX_EHP_REF = 31000;
  const ehpScore = Math.min(10, (avgEHP / MAX_EHP_REF) * 10);
  const enduranceScore = (ratings.endurance / 5) * 10;
  let durability = ehpScore * 0.6 + enduranceScore * 0.4;
  // Self-heal or shield moves increase effective staying power
  const hasSelfSustain = allMoves.some(m => m.isSustain || m.isHeal || m.isShield);
  if (hasSelfSustain) durability += 0.5;
  if (uniteMove.isHeal || uniteMove.isShield) durability += 0.3;
  durability = clamp(durability);

  // ── Crowd Control (0-10) ────────────────────────────────────────────────
  // Each CC move is looked up in CC_MOVE_MAP for type, duration, and quality.
  // Hard CC (stun, suppress, sleep, freeze) scores far higher than soft CC (slow).
  // Unite moves are now included since they often carry powerful CC.
  let crowdControl = 0;
  const seenMoveIds = new Set<string>();

  const ccMoves: Array<{ moveId: string; ccType?: string }> = [
    ...allMoves.map(m => ({ moveId: m.moveId, ccType: m.ccType })),
    { moveId: uniteMove.moveId, ccType: uniteMove.ccType },
  ];

  for (const m of ccMoves) {
    if (!m.ccType && !CC_MOVE_MAP[m.moveId]) continue;
    if (seenMoveIds.has(m.moveId)) continue;
    seenMoveIds.add(m.moveId);

    const entry = CC_MOVE_MAP[m.moveId];
    if (entry) {
      const durationFactor = Math.min(entry.duration, 3) / 3;
      crowdControl += entry.quality * CC_TYPE_WEIGHTS[entry.ccType] * durationFactor * 4;
    } else if (m.ccType) {
      crowdControl += CC_TYPE_WEIGHTS[m.ccType as keyof typeof CC_TYPE_WEIGHTS] * 2.0;
    }
  }
  crowdControl = clamp(crowdControl);

  // ── Mobility (0-10) ─────────────────────────────────────────────────────
  // pvpoke mobility rating + dash move bonuses + speedster class bonus.
  let mobility = (ratings.mobility / 5) * 10;
  const dashMoves = allMoves.filter(m => m.isDash);
  mobility += Math.min(2, dashMoves.length) * 1.5;
  if (uniteMove.isDash) mobility += 1.0;
  if (role === 'speedster') mobility += 1.0;
  mobility = clamp(mobility);

  // ── Healing (0-10) ──────────────────────────────────────────────────────
  // HP recovery for self or teammates. Each heal move is significant.
  // Supporter role bonus reflects their identity as primary healers.
  let healing = 0;
  const healMoves = allMoves.filter(m => m.isHeal);
  healing += healMoves.length * 3.0;
  if (uniteMove.isHeal) healing += 2.0; // unite heals are very powerful
  if (role === 'supporter') healing += 2.5;
  if (role === 'defender')  healing += 0.5;
  healing += (ratings.support / 5) * 1.5;
  healing = clamp(healing);

  // ── Shielding (0-10) ────────────────────────────────────────────────────
  // Damage absorption via shields. Shields counter burst damage.
  let shielding = 0;
  const shieldMoves = allMoves.filter(m => m.isShield);
  shielding += shieldMoves.length * 3.5;
  if (uniteMove.isShield) shielding += 2.5; // unite shields are very powerful
  if (role === 'defender')  shielding += 2.5;
  if (role === 'supporter') shielding += 1.0;
  shielding += (ratings.endurance / 5) * 1.0;
  shielding = clamp(shielding);

  // ── Team Fight (0-10) ───────────────────────────────────────────────────
  // Effectiveness in 5v5 team fights. AoE moves hit multiple targets at once,
  // AoE CC locks down the whole enemy team, and AoE unite moves can flip fights.
  // Defenders and Supporters contribute by anchoring team fights.
  let teamFight = 0;
  const aoeMoves = allMoves.filter(m => m.isAoE);
  teamFight += aoeMoves.length * 2.0;
  // AoE moves with CC are especially powerful in team fights
  const aoeCCMoves = allMoves.filter(m => m.isAoE && m.ccType);
  teamFight += aoeCCMoves.length * 1.5;
  // AoE unite move is the single biggest team-fight contribution
  if (uniteMove.isAoE) teamFight += 3.5;
  // AoE unite with CC (e.g. Blastoise hydro_typhoon = knockup AoE)
  if (uniteMove.isAoE && uniteMove.ccType) teamFight += 1.0;
  // Role bonuses — defenders and supporters anchor team fights
  if (role === 'defender'   || role === 'supporter') teamFight += 2.0;
  if (role === 'all-rounder') teamFight += 1.0;
  // Rating blend: support+endurance = team fight presence
  teamFight += ((ratings.support + ratings.endurance) / 2 / 5) * 1.5;
  teamFight = clamp(teamFight);

  // ── Engage / Pick Potential (0-10) ──────────────────────────────────────
  // Ability to initiate fights advantageously: gap-closing dashes combined
  // with hard CC to lock down a target or dive the enemy backline.
  // This captures the "who starts the fight" competitive dimension.
  let engage = 0;
  // Dash + CC combo (best engage tool — gap-close AND immediate lockdown)
  const engageMoves = allMoves.filter(m => m.isDash && m.ccType);
  engage += engageMoves.length * 3.5;
  // Hard CC from range (stun/suppress/sleep/freeze/root — powerful even without dash)
  const hardCCNoSmash = allMoves.filter(m =>
    m.ccType && ['stun', 'suppress', 'sleep', 'freeze', 'root'].includes(m.ccType) && !m.isDash
  );
  engage += hardCCNoSmash.length * 1.5;
  // Pure dash without CC still provides gap-close
  const dashNoCCMoves = allMoves.filter(m => m.isDash && !m.ccType);
  engage += dashNoCCMoves.length * 0.5;
  // Unite move engage: dash+CC unite = massive initiation
  if (uniteMove.isDash && uniteMove.ccType) engage += 3.0;
  else if (uniteMove.ccType === 'suppress' || uniteMove.ccType === 'stun') engage += 2.5;
  else if (uniteMove.isDash) engage += 1.0;
  else if (uniteMove.ccType) engage += 1.0;
  // Role bonuses: speedsters are natural assassins, all-rounders are divers
  if (role === 'speedster')   engage += 2.0;
  if (role === 'all-rounder') engage += 1.0;
  // Mobility rating contributes to engage potential
  engage += (ratings.mobility / 5) * 1.0;
  engage = clamp(engage);

  // ── Objective Threat (0-10) ─────────────────────────────────────────────
  // Ability to contest and secure Zapdos, Dreadnaw, and score points.
  let objectiveThreat = (ratings.scoring / 5) * 10;
  if (role === 'all-rounder' || role === 'speedster') objectiveThreat += 1;
  if (uniteMove.isAoE) objectiveThreat += 0.5; // AoE unite for objective bursting
  objectiveThreat = clamp(objectiveThreat);

  // ── Early Game (0-10) ───────────────────────────────────────────────────
  const earlyGame = clamp((ratings.leveling / 5) * 10);

  // ── Late Game (0-10) ────────────────────────────────────────────────────
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
    teamFight,
    engage,
    objectiveThreat,
    earlyGame,
    lateGame,
  };
}

export function computeCompositeScore(dimensionScores: DimensionScores): number {
  const { damageOutput, durability, crowdControl, mobility, healing, shielding, teamFight, engage, objectiveThreat, earlyGame, lateGame } = dimensionScores;
  return (
    damageOutput    * 0.14 +
    durability      * 0.12 +
    crowdControl    * 0.11 +
    mobility        * 0.08 +
    healing         * 0.08 +
    shielding       * 0.08 +
    teamFight       * 0.08 +
    engage          * 0.07 +
    objectiveThreat * 0.09 +
    earlyGame       * 0.08 +
    lateGame        * 0.07
  ) * 10; // scale to 0-100
}
