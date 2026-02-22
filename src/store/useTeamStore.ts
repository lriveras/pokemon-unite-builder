import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { TeamSlot, SlotConfig } from '../types/team';
import { Pokemon } from '../types/pokemon';
import { HeldItem, BattleItem } from '../types/items';
import { MoveOption } from '../types/pokemon';

function defaultConfig(): SlotConfig {
  return {
    slot1Choice: null,
    slot2Choice: null,
    heldItems: [null, null, null],
    battleItem: null,
    itemGrades: [1, 1, 1],
    pokemonLevel: 15,
  };
}

function defaultSlot(index: 0 | 1 | 2 | 3 | 4): TeamSlot {
  return { slotIndex: index, pokemon: null, config: defaultConfig() };
}

interface TeamStore {
  slots: [TeamSlot, TeamSlot, TeamSlot, TeamSlot, TeamSlot];
  activeSlotIndex: number;

  setPokemon: (slotIndex: number, pokemon: Pokemon | null) => void;
  clearSlot: (slotIndex: number) => void;
  setActiveSlot: (index: number) => void;
  updateConfig: (slotIndex: number, config: Partial<SlotConfig>) => void;
  setSlot1Choice: (slotIndex: number, choice: MoveOption | null) => void;
  setSlot2Choice: (slotIndex: number, choice: MoveOption | null) => void;
  setHeldItem: (slotIndex: number, itemIndex: number, item: HeldItem | null) => void;
  setBattleItem: (slotIndex: number, item: BattleItem | null) => void;
  setItemGrade: (slotIndex: number, itemIndex: number, grade: number) => void;
  setPokemonLevel: (slotIndex: number, level: number) => void;
  clearAll: () => void;
  reorderSlots: (from: number, to: number) => void;
}

export const useTeamStore = create<TeamStore>()(
  persist(
    (set, get) => ({
      slots: [defaultSlot(0), defaultSlot(1), defaultSlot(2), defaultSlot(3), defaultSlot(4)],
      activeSlotIndex: 0,

      setPokemon: (slotIndex, pokemon) => set(state => {
        const slots = [...state.slots] as typeof state.slots;
        const prevPokemon = slots[slotIndex].pokemon;
        const maxHeld = pokemon?.maxHeldItems ?? 3;
        slots[slotIndex] = {
          ...slots[slotIndex],
          pokemon,
          config: {
            ...defaultConfig(),
            heldItems: Array(maxHeld).fill(null),
            itemGrades: Array(maxHeld).fill(1),
            // Reset move choices when changing Pokemon
            slot1Choice: pokemon?.slot1.options[0] ?? null,
            slot2Choice: pokemon?.slot2.options[0] ?? null,
          },
        };
        return { slots };
      }),

      clearSlot: (slotIndex) => set(state => {
        const slots = [...state.slots] as typeof state.slots;
        slots[slotIndex] = defaultSlot(slotIndex as 0 | 1 | 2 | 3 | 4);
        return { slots };
      }),

      setActiveSlot: (index) => set({ activeSlotIndex: index }),

      updateConfig: (slotIndex, config) => set(state => {
        const slots = [...state.slots] as typeof state.slots;
        slots[slotIndex] = { ...slots[slotIndex], config: { ...slots[slotIndex].config, ...config } };
        return { slots };
      }),

      setSlot1Choice: (slotIndex, choice) => set(state => {
        const slots = [...state.slots] as typeof state.slots;
        slots[slotIndex] = { ...slots[slotIndex], config: { ...slots[slotIndex].config, slot1Choice: choice } };
        return { slots };
      }),

      setSlot2Choice: (slotIndex, choice) => set(state => {
        const slots = [...state.slots] as typeof state.slots;
        slots[slotIndex] = { ...slots[slotIndex], config: { ...slots[slotIndex].config, slot2Choice: choice } };
        return { slots };
      }),

      setHeldItem: (slotIndex, itemIndex, item) => set(state => {
        const slots = [...state.slots] as typeof state.slots;
        const heldItems = [...slots[slotIndex].config.heldItems];
        heldItems[itemIndex] = item;
        slots[slotIndex] = { ...slots[slotIndex], config: { ...slots[slotIndex].config, heldItems } };
        return { slots };
      }),

      setBattleItem: (slotIndex, item) => set(state => {
        const slots = [...state.slots] as typeof state.slots;
        slots[slotIndex] = { ...slots[slotIndex], config: { ...slots[slotIndex].config, battleItem: item } };
        return { slots };
      }),

      setItemGrade: (slotIndex, itemIndex, grade) => set(state => {
        const slots = [...state.slots] as typeof state.slots;
        const itemGrades = [...slots[slotIndex].config.itemGrades];
        itemGrades[itemIndex] = grade;
        slots[slotIndex] = { ...slots[slotIndex], config: { ...slots[slotIndex].config, itemGrades } };
        return { slots };
      }),

      setPokemonLevel: (slotIndex, level) => set(state => {
        const slots = [...state.slots] as typeof state.slots;
        slots[slotIndex] = { ...slots[slotIndex], config: { ...slots[slotIndex].config, pokemonLevel: level } };
        return { slots };
      }),

      clearAll: () => set({
        slots: [defaultSlot(0), defaultSlot(1), defaultSlot(2), defaultSlot(3), defaultSlot(4)],
        activeSlotIndex: 0,
      }),

      reorderSlots: (from, to) => set(state => {
        const slots = [...state.slots] as typeof state.slots;
        const [removed] = slots.splice(from, 1);
        slots.splice(to, 0, removed);
        // Fix slotIndex values
        slots.forEach((s, i) => { s.slotIndex = i as 0|1|2|3|4; });
        return { slots };
      }),
    }),
    {
      name: 'unite-team',
      partialize: (state) => ({ slots: state.slots }),
    }
  )
);
