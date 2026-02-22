import { create } from 'zustand';

type Modal = 'pokemon-picker' | 'pokemon-detail' | null;

interface UIStore {
  activeModal: Modal;
  pickerTargetSlot: number | null;
  pickerFilter: {
    role: string;
    tier: string;
    search: string;
  };
  detailPokemonId: string | null;
  sidebarOpen: boolean;

  openPokemonPicker: (slotIndex: number) => void;
  openPokemonDetail: (pokemonId: string) => void;
  closeModal: () => void;
  setPickerFilter: (filter: Partial<UIStore['pickerFilter']>) => void;
  toggleSidebar: () => void;
}

export const useUIStore = create<UIStore>((set) => ({
  activeModal: null,
  pickerTargetSlot: null,
  pickerFilter: { role: '', tier: '', search: '' },
  detailPokemonId: null,
  sidebarOpen: true,

  openPokemonPicker: (slotIndex) => set({
    activeModal: 'pokemon-picker',
    pickerTargetSlot: slotIndex,
  }),

  openPokemonDetail: (pokemonId) => set({
    activeModal: 'pokemon-detail',
    detailPokemonId: pokemonId,
  }),

  closeModal: () => set({
    activeModal: null,
    pickerTargetSlot: null,
    detailPokemonId: null,
  }),

  setPickerFilter: (filter) => set(state => ({
    pickerFilter: { ...state.pickerFilter, ...filter },
  })),

  toggleSidebar: () => set(state => ({ sidebarOpen: !state.sidebarOpen })),
}));
