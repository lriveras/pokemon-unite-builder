import { Pokemon, MoveOption } from '../types/pokemon';
import { HeldItem, BattleItem } from '../types/items';
import { DamageCalculationResult, MoveDamageResult, BasicAttackResult } from '../types/evaluation';
import { MOVE_DAMAGE_TABLE } from '../constants/moveDamageTable';

interface CalcInputs {
  pokemon: Pokemon;
  level: number;
  slot1Choice: MoveOption | null;
  slot2Choice: MoveOption | null;
  heldItems: (HeldItem | null)[];
  battleItem: BattleItem | null;
  itemGrades: number[];
}

function getItemStatBonus(heldItems: (HeldItem | null)[], grades: number[], statName: string): number {
  let bonus = 0;
  heldItems.forEach((item, i) => {
    if (!item) return;
    const grade = grades[i] || 1;
    const stat = item.stats.find(s => s.statName.toLowerCase().includes(statName.toLowerCase()));
    if (stat) {
      // Interpolate between grade 1, 10, 20, 30
      if (grade <= 10) {
        bonus += stat.grade1 + ((stat.grade10 - stat.grade1) * (grade - 1)) / 9;
      } else if (grade <= 20) {
        bonus += stat.grade10 + ((stat.grade20 - stat.grade10) * (grade - 10)) / 10;
      } else {
        bonus += stat.grade20 + ((stat.grade30 - stat.grade20) * (grade - 20)) / 10;
      }
    }
  });
  return Math.round(bonus);
}

function hasItem(heldItems: (HeldItem | null)[], itemId: string): boolean {
  return heldItems.some(item => item?.itemId === itemId);
}

export function calculateDamage(inputs: CalcInputs): DamageCalculationResult {
  const { pokemon, level, slot1Choice, slot2Choice, heldItems, battleItem, itemGrades } = inputs;
  const stats = pokemon.statsProgression[Math.min(level - 1, 14)];

  const atkBonus = getItemStatBonus(heldItems, itemGrades, 'attack');
  const spAtkBonus = getItemStatBonus(heldItems, itemGrades, 'sp. atk');

  let effectiveAtk = stats.atk + atkBonus;
  let effectiveSpAtk = stats.sp_atk + spAtkBonus;

  // X Attack bonus
  if (battleItem?.itemId === 'x_attack') {
    effectiveAtk *= 1.3;
    effectiveSpAtk *= 1.3;
  }

  const hasScopeLens = hasItem(heldItems, 'scope_lens');
  const hasMuscleBand = hasItem(heldItems, 'muscle_band');

  function calcMove(move: MoveOption): MoveDamageResult {
    const entry = MOVE_DAMAGE_TABLE[move.moveId];
    let baseDamage: number;
    let cooldown = move.cooldown;

    if (entry) {
      const statVal = entry.scalingStat === 'atk' ? effectiveAtk : effectiveSpAtk;
      baseDamage = entry.baseCoefficient * statVal * (1 + (level - 1) * entry.scalingLevelMultiplier);
      const totalDamage = Math.round(baseDamage * entry.hitCount);
      const critDamage = hasScopeLens ? Math.round(totalDamage * 1.35) : null;
      cooldown = entry.cooldown;
      return {
        moveId: move.moveId,
        moveName: move.name,
        baseDamage: Math.round(baseDamage),
        critDamage,
        totalDamage,
        dps: cooldown > 0 ? Math.round(totalDamage / cooldown) : totalDamage,
        cooldown,
        hitCount: entry.hitCount,
      };
    } else {
      // Estimate from move.damageType
      const statVal = move.damageType === 'sp_atk' ? effectiveSpAtk : effectiveAtk;
      baseDamage = statVal * 1.5 * (1 + (level - 1) * 0.07);
      const totalDamage = Math.round(baseDamage);
      const critDamage = hasScopeLens ? Math.round(totalDamage * 1.35) : null;
      return {
        moveId: move.moveId,
        moveName: move.name,
        baseDamage: Math.round(baseDamage),
        critDamage,
        totalDamage,
        dps: cooldown > 0 ? Math.round(totalDamage / cooldown) : totalDamage,
        cooldown,
        hitCount: 1,
      };
    }
  }

  const moves: MoveDamageResult[] = [];
  if (slot1Choice) moves.push(calcMove(slot1Choice));
  if (slot2Choice) moves.push(calcMove(slot2Choice));

  // Basic attacks
  const boostStyle = pokemon.basicAttack.boostStyle;
  const baseAtkStat = boostStyle === 'special' ? effectiveSpAtk : effectiveAtk;
  const normalDamage = Math.round(baseAtkStat * 1.0);
  const boostedDamage = Math.round(baseAtkStat * (hasMuscleBand ? 2.1 : 1.8));
  const boostInterval = pokemon.basicAttack.boostCount;

  const basicAttack: BasicAttackResult = { normalDamage, boostedDamage, boostInterval };

  const totalDPS = moves.reduce((sum, m) => sum + m.dps, 0);

  return {
    pokemonId: pokemon.pokemonId,
    pokemonName: pokemon.name,
    level,
    moves,
    basicAttack,
    totalDPS,
  };
}

export function calculateItemGradeImpact(
  pokemon: Pokemon,
  level: number,
  heldItem: HeldItem,
  grade1: number,
  grade2: number,
  moveId: string
): { grade: number; damage: number }[] {
  const results: { grade: number; damage: number }[] = [];
  for (const grade of [grade1, grade2, 30]) {
    const fakeInputs: CalcInputs = {
      pokemon,
      level,
      slot1Choice: null,
      slot2Choice: null,
      heldItems: [heldItem],
      battleItem: null,
      itemGrades: [grade],
    };
    const stats = pokemon.statsProgression[Math.min(level - 1, 14)];
    const atkBonus = getItemStatBonus([heldItem], [grade], 'attack');
    const spAtkBonus = getItemStatBonus([heldItem], [grade], 'sp. atk');
    const entry = MOVE_DAMAGE_TABLE[moveId];
    if (entry) {
      const statVal = (entry.scalingStat === 'atk' ? stats.atk + atkBonus : stats.sp_atk + spAtkBonus);
      const dmg = Math.round(entry.baseCoefficient * statVal * (1 + (level - 1) * entry.scalingLevelMultiplier) * entry.hitCount);
      results.push({ grade, damage: dmg });
    }
  }
  return results;
}
