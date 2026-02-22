import { useState, useMemo } from 'react';
import { Modal } from '../common/Modal';
import { PokemonCard } from '../common/PokemonCard';
import { useGameDataStore } from '../../store/useGameDataStore';
import { useUIStore } from '../../store/useUIStore';
import { useTeamStore } from '../../store/useTeamStore';
import { PokemonRole, Tier } from '../../types/pokemon';
import { ROLE_CONFIG, ROLE_ORDER } from '../../constants/roles';

const TIERS: Tier[] = ['S', 'A', 'B', 'C', 'D'];

export function PokemonPicker() {
  const { activeModal, pickerTargetSlot, pickerFilter, setPickerFilter, closeModal } = useUIStore();
  const { pokemon } = useGameDataStore();
  const { setPokemon, slots } = useTeamStore();
  const [localSearch, setLocalSearch] = useState('');

  const isOpen = activeModal === 'pokemon-picker';
  const usedIds = new Set(slots.map(s => s.pokemon?.pokemonId).filter(Boolean));

  const filtered = useMemo(() => {
    let list = pokemon;
    if (pickerFilter.role) list = list.filter(p => p.role === pickerFilter.role);
    if (pickerFilter.tier) list = list.filter(p => p.tier === pickerFilter.tier);
    const search = localSearch.toLowerCase();
    if (search) list = list.filter(p => p.name.toLowerCase().includes(search));
    return list;
  }, [pokemon, pickerFilter, localSearch]);

  function handleSelect(pokemonId: string) {
    if (pickerTargetSlot === null) return;
    const p = pokemon.find(x => x.pokemonId === pokemonId);
    if (p) {
      setPokemon(pickerTargetSlot, p);
      closeModal();
    }
  }

  return (
    <Modal open={isOpen} onClose={closeModal} title="Choose a Pokémon" size="xl">
      <div className="p-4 space-y-4">
        {/* Filters */}
        <div className="flex flex-wrap gap-2">
          <input
            type="text"
            placeholder="Search..."
            value={localSearch}
            onChange={e => setLocalSearch(e.target.value)}
            className="px-3 py-1.5 rounded-lg bg-[#1a1a2e] border border-[#0f3460] text-white text-sm placeholder-slate-500 focus:outline-none focus:border-purple-500 w-40"
          />
          {/* Role filter */}
          <div className="flex gap-1">
            <button
              onClick={() => setPickerFilter({ role: '' })}
              className={`px-2 py-1 rounded text-xs font-medium transition-colors ${!pickerFilter.role ? 'bg-purple-600 text-white' : 'bg-[#1a1a2e] text-slate-400 hover:text-white'}`}
            >
              All
            </button>
            {ROLE_ORDER.map(role => (
              <button
                key={role}
                onClick={() => setPickerFilter({ role: pickerFilter.role === role ? '' : role })}
                className={`px-2 py-1 rounded text-xs font-medium transition-colors`}
                style={pickerFilter.role === role
                  ? { backgroundColor: ROLE_CONFIG[role].color, color: '#fff' }
                  : { backgroundColor: ROLE_CONFIG[role].bgColor, color: ROLE_CONFIG[role].color }
                }
              >
                {ROLE_CONFIG[role].label}
              </button>
            ))}
          </div>
          {/* Tier filter */}
          <div className="flex gap-1">
            {TIERS.map(tier => (
              <button
                key={tier}
                onClick={() => setPickerFilter({ tier: pickerFilter.tier === tier ? '' : tier })}
                className={`w-7 h-7 rounded text-xs font-bold transition-colors ${pickerFilter.tier === tier ? 'bg-purple-600 text-white' : 'bg-[#1a1a2e] text-slate-400 hover:text-white'}`}
              >
                {tier}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 max-h-[60vh] overflow-y-auto pr-1">
          {filtered.length === 0 ? (
            <div className="col-span-full text-center py-12 text-slate-500">
              {pokemon.length === 0 ? 'Loading data...' : 'No Pokémon match your filters'}
            </div>
          ) : (
            filtered.map(p => (
              <PokemonCard
                key={p.pokemonId}
                pokemon={p}
                onClick={() => handleSelect(p.pokemonId)}
                selected={usedIds.has(p.pokemonId)}
                compact
              />
            ))
          )}
        </div>
        <p className="text-xs text-slate-500">{filtered.length} Pokémon shown</p>
      </div>
    </Modal>
  );
}
