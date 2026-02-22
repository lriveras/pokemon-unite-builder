import { Pokemon } from '../types/pokemon';
import { HeldItem } from '../types/items';
import { HiddenStatsResult, MoveDPSEntry, ItemBreakpointEntry } from '../types/evaluation';
import { CC_MOVE_MAP } from '../constants/ccMoveMap';
import { MOVE_DAMAGE_TABLE } from '../constants/moveDamageTable';

export function computeHiddenStats(pokemon: Pokemon, level: number, heldItems: (HeldItem | null)[], itemGrades: number[]): HiddenStatsResult {
  const stats = pokemon.statsProgression[Math.min(level - 1, 14)];

  // Effective HP
  const effectiveHPPhysical = Math.round(stats.hp * (1 + stats.def / 2000));
  const effectiveHPSpecial = Math.round(stats.hp * (1 + stats.sp_def / 2000));

  // Damage reduction %
  const damageReductionPhysical = (stats.def / (stats.def + 2000)) * 100;
  const damageReductionSpecial = (stats.sp_def / (stats.sp_def + 2000)) * 100;

  // Boosted attack interval
  const boostInterval = pokemon.basicAttack.boostCount;

  // Evolution level
  const evolutionLevel = pokemon.stages.length > 0 ? pokemon.stages[pokemon.stages.length - 1]?.level ?? null : null;

  // CC duration sum
  const allMoves = [...pokemon.slot1.options, ...pokemon.slot2.options];
  let totalCCDuration = 0;
  for (const m of allMoves) {
    const entry = CC_MOVE_MAP[m.moveId];
    if (entry) totalCCDuration += entry.duration;
  }

  // Move DPS
  const moveDPS: MoveDPSEntry[] = [];
  for (const m of allMoves) {
    const entry = MOVE_DAMAGE_TABLE[m.moveId];
    if (entry) {
      const statVal = entry.scalingStat === 'atk' ? stats.atk : stats.sp_atk;
      const dmg = entry.baseCoefficient * statVal * (1 + (level - 1) * entry.scalingLevelMultiplier) * entry.hitCount;
      const dps = entry.cooldown > 0 ? dmg / entry.cooldown : 0;
      moveDPS.push({ moveId: m.moveId, moveName: m.name, dps: Math.round(dps) });
    }
  }

  // Item breakpoints
  const itemBreakpoints: ItemBreakpointEntry[] = [];
  heldItems.forEach((item, i) => {
    if (!item || !item.stats.length) return;
    const stat = item.stats[0];
    itemBreakpoints.push({
      itemId: item.itemId,
      itemName: item.name,
      grade1Value: stat.grade1,
      grade20Value: stat.grade20,
      grade30Value: stat.grade30,
      statName: stat.statName,
    });
  });

  // Healing per second (from heal moves)
  let healingPerSecond = 0;
  for (const m of allMoves) {
    if (m.isHeal) {
      const entry = MOVE_DAMAGE_TABLE[m.moveId];
      const approxHeal = (stats.hp * 0.12);
      const cd = entry?.cooldown ?? 8;
      healingPerSecond += approxHeal / cd;
    }
  }

  return {
    pokemonId: pokemon.pokemonId,
    pokemonName: pokemon.name,
    level,
    effectiveHPPhysical,
    effectiveHPSpecial,
    damageReductionPhysical,
    damageReductionSpecial,
    boostInterval,
    evolutionLevel,
    totalCCDuration,
    moveDPS,
    itemBreakpoints,
    healingPerSecond: Math.round(healingPerSecond),
  };
}
