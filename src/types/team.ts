import { Pokemon } from './pokemon';
import { HeldItem, BattleItem } from './items';
import { MoveOption } from './pokemon';

export interface SlotConfig {
  slot1Choice: MoveOption | null;
  slot2Choice: MoveOption | null;
  heldItems: (HeldItem | null)[];
  battleItem: BattleItem | null;
  itemGrades: number[];
  pokemonLevel: number;
}

export interface TeamSlot {
  slotIndex: 0 | 1 | 2 | 3 | 4;
  pokemon: Pokemon | null;
  config: SlotConfig;
}

export interface SavedComposition {
  id: string;
  name: string;
  savedAt: string;
  slots: TeamSlot[];
  compositeScore: number;
  notes?: string;
}
