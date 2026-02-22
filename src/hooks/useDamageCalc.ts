import { useMemo } from 'react';
import { useTeamStore } from '../store/useTeamStore';
import { calculateDamage } from '../engine/damageCalculator';
import { DamageCalculationResult } from '../types/evaluation';

export function useDamageCalc(slotIndex: number): DamageCalculationResult | null {
  const slot = useTeamStore(state => state.slots[slotIndex]);

  return useMemo(() => {
    if (!slot.pokemon) return null;
    return calculateDamage({
      pokemon: slot.pokemon,
      level: slot.config.pokemonLevel,
      slot1Choice: slot.config.slot1Choice,
      slot2Choice: slot.config.slot2Choice,
      heldItems: slot.config.heldItems,
      battleItem: slot.config.battleItem,
      itemGrades: slot.config.itemGrades,
    });
  }, [
    slot.pokemon?.pokemonId,
    slot.config.pokemonLevel,
    slot.config.slot1Choice?.moveId,
    slot.config.slot2Choice?.moveId,
    slot.config.heldItems.map(h => h?.itemId).join(','),
    slot.config.battleItem?.itemId,
    slot.config.itemGrades.join(','),
  ]);
}
