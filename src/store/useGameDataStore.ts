import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Pokemon } from '../types/pokemon';
import { HeldItem, BattleItem } from '../types/items';

interface GameDataStore {
  pokemon: Pokemon[];
  heldItems: HeldItem[];
  battleItems: BattleItem[];
  lastFetched: string | null;
  isLoading: boolean;
  error: string | null;

  setPokemon: (pokemon: Pokemon[]) => void;
  setHeldItems: (items: HeldItem[]) => void;
  setBattleItems: (items: BattleItem[]) => void;
  setLastFetched: (ts: string) => void;
  setLoading: (v: boolean) => void;
  setError: (e: string | null) => void;
  reset: () => void;
}

export const useGameDataStore = create<GameDataStore>()(
  persist(
    (set) => ({
      pokemon: [],
      heldItems: [],
      battleItems: [],
      lastFetched: null,
      isLoading: false,
      error: null,

      setPokemon: (pokemon) => set({ pokemon }),
      setHeldItems: (heldItems) => set({ heldItems }),
      setBattleItems: (battleItems) => set({ battleItems }),
      setLastFetched: (ts) => set({ lastFetched: ts }),
      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),
      reset: () => set({ pokemon: [], heldItems: [], battleItems: [], lastFetched: null }),
    }),
    {
      name: 'unite-game-data',
      // Only persist lightweight metadata; actual data fetched fresh
      partialize: (state) => ({
        lastFetched: state.lastFetched,
      }),
    }
  )
);
