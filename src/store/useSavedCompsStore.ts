import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { SavedComposition } from '../types/team';
import { v4 as uuidv4 } from 'uuid';

interface SavedCompsStore {
  compositions: SavedComposition[];
  saveComposition: (comp: Omit<SavedComposition, 'id' | 'savedAt'>) => string;
  deleteComposition: (id: string) => void;
  renameComposition: (id: string, name: string) => void;
  getComposition: (id: string) => SavedComposition | undefined;
}

export const useSavedCompsStore = create<SavedCompsStore>()(
  persist(
    (set, get) => ({
      compositions: [],

      saveComposition: (comp) => {
        const id = uuidv4();
        const saved: SavedComposition = {
          ...comp,
          id,
          savedAt: new Date().toISOString(),
        };
        set(state => ({ compositions: [saved, ...state.compositions] }));
        return id;
      },

      deleteComposition: (id) => set(state => ({
        compositions: state.compositions.filter(c => c.id !== id),
      })),

      renameComposition: (id, name) => set(state => ({
        compositions: state.compositions.map(c => c.id === id ? { ...c, name } : c),
      })),

      getComposition: (id) => get().compositions.find(c => c.id === id),
    }),
    { name: 'unite-saved-comps' }
  )
);
