import { useState, useMemo } from 'react';
import { useGameDataStore } from '../../store/useGameDataStore';
import { Pokemon } from '../../types/pokemon';
import { LicenseDetailPanel } from './LicenseDetailPanel';
import { ROLE_ORDER } from '../../constants/roles';

const ROLE_LABELS: Record<string, string> = {
  attacker: 'Attacker',
  defender: 'Defender',
  supporter: 'Supporter',
  speedster: 'Speedster',
  'all-rounder': 'All-Rounder',
};

function PokemonPickerCard({
  pokemon,
  selected,
  onClick,
}: {
  pokemon: Pokemon;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex flex-col items-center gap-1 p-2 rounded-xl border transition-all cursor-pointer ${
        selected
          ? 'border-purple-500 bg-purple-900/30 ring-1 ring-purple-500'
          : 'border-[#1e3a6e] bg-[#0d1b35] hover:border-[#2e5a9e] hover:bg-[#16213e]'
      }`}
    >
      <img
        src={pokemon.spriteUrl}
        alt={pokemon.name}
        width={48}
        height={48}
        className="object-contain"
        onError={e => {
          (e.target as HTMLImageElement).src =
            'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48"/>';
        }}
      />
      <span className="text-xs text-slate-300 font-medium text-center leading-tight max-w-[56px] truncate">
        {pokemon.name}
      </span>
    </button>
  );
}

export function LicensesView() {
  const { pokemon, isLoading } = useGameDataStore();
  const [selected, setSelected] = useState<Pokemon | null>(null);
  const [roleFilter, setRoleFilter] = useState('');
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    let list = pokemon;
    if (roleFilter) list = list.filter(p => p.role === roleFilter);
    if (search) list = list.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
    return list;
  }, [pokemon, roleFilter, search]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64 text-slate-400 text-sm">
        Loading license data...
      </div>
    );
  }

  return (
    <div className="max-w-screen-2xl mx-auto px-4 py-6 h-[calc(100vh-56px)] flex flex-col">
      <h1
        className="text-2xl font-bold text-white mb-4 shrink-0"
        style={{ fontFamily: 'Rajdhani, sans-serif' }}
      >
        Pokémon License Explorer
      </h1>

      <div className="flex flex-1 gap-4 min-h-0">
        {/* ── Left: Pokemon Picker ─────────────────────────────── */}
        <div className="w-64 shrink-0 flex flex-col gap-3">
          {/* Filters */}
          <div className="space-y-2">
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full px-3 py-1.5 rounded-lg bg-[#16213e] border border-[#0f3460] text-white text-sm placeholder-slate-500 focus:outline-none focus:border-purple-500"
            />
            <select
              value={roleFilter}
              onChange={e => setRoleFilter(e.target.value)}
              className="w-full px-3 py-1.5 rounded-lg bg-[#16213e] border border-[#0f3460] text-white text-sm focus:outline-none focus:border-purple-500"
            >
              <option value="">All Roles</option>
              {ROLE_ORDER.map(r => (
                <option key={r} value={r}>
                  {ROLE_LABELS[r] ?? r}
                </option>
              ))}
            </select>
            <div className="text-xs text-slate-500">{filtered.length} licenses</div>
          </div>

          {/* Grid */}
          <div className="flex-1 overflow-y-auto">
            <div className="grid grid-cols-3 gap-1.5">
              {filtered.map(p => (
                <PokemonPickerCard
                  key={p.pokemonId}
                  pokemon={p}
                  selected={selected?.pokemonId === p.pokemonId}
                  onClick={() => setSelected(p)}
                />
              ))}
            </div>
            {filtered.length === 0 && (
              <div className="text-center text-slate-500 text-sm py-8">No Pokémon found</div>
            )}
          </div>
        </div>

        {/* ── Right: Detail Panel ──────────────────────────────── */}
        <div className="flex-1 min-w-0 bg-[#16213e] border border-[#0f3460] rounded-xl overflow-hidden">
          {selected ? (
            <LicenseDetailPanel pokemon={selected} />
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-slate-500 gap-3">
              <svg
                className="w-12 h-12 opacity-30"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <p className="text-sm">Select a Pokémon to view its full license details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
