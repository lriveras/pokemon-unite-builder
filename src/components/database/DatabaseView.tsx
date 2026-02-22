import { useState, useMemo } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
  createColumnHelper,
  SortingState,
} from '@tanstack/react-table';
import { useGameDataStore } from '../../store/useGameDataStore';
import { Pokemon, PokemonRole, Tier } from '../../types/pokemon';
import { RoleBadge } from '../common/RoleBadge';
import { TierBadge } from '../common/TierBadge';
import { PokemonDetailModal } from './PokemonDetailModal';
import { ROLE_ORDER } from '../../constants/roles';
import { getScoreColor } from '../../constants/evaluation';

const columnHelper = createColumnHelper<Pokemon>();

export function DatabaseView() {
  const { pokemon } = useGameDataStore();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [roleFilter, setRoleFilter] = useState('');
  const [tierFilter, setTierFilter] = useState('');
  const [search, setSearch] = useState('');
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);

  const filtered = useMemo(() => {
    let list = pokemon;
    if (roleFilter) list = list.filter(p => p.role === roleFilter);
    if (tierFilter) list = list.filter(p => p.tier === tierFilter);
    if (search) list = list.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
    return list;
  }, [pokemon, roleFilter, tierFilter, search]);

  const columns = useMemo(() => [
    columnHelper.display({
      id: 'sprite',
      header: '',
      cell: ({ row }) => (
        <img src={row.original.spriteUrl} alt={row.original.name} width={36} height={36} className="rounded-lg bg-slate-700/30 object-contain" onError={e => {(e.target as HTMLImageElement).style.display='none';}} />
      ),
    }),
    columnHelper.accessor('name', {
      header: 'Name',
      cell: info => <span className="font-semibold text-white">{info.getValue()}</span>,
    }),
    columnHelper.accessor('role', {
      header: 'Role',
      cell: info => <RoleBadge role={info.getValue()} size="sm" />,
    }),
    columnHelper.accessor('tier', {
      header: 'Tier',
      cell: info => <TierBadge tier={info.getValue()} size="sm" />,
    }),
    columnHelper.accessor('attackStyle', {
      header: 'Style',
      cell: info => <span className="capitalize text-slate-400 text-xs">{info.getValue()}</span>,
    }),
    columnHelper.accessor(row => row.dimensionScores.damageOutput, {
      id: 'damage',
      header: 'Damage',
      cell: info => <Score value={info.getValue()} />,
    }),
    columnHelper.accessor(row => row.dimensionScores.durability, {
      id: 'durability',
      header: 'Durability',
      cell: info => <Score value={info.getValue()} />,
    }),
    columnHelper.accessor(row => row.dimensionScores.crowdControl, {
      id: 'cc',
      header: 'CC',
      cell: info => <Score value={info.getValue()} />,
    }),
    columnHelper.accessor(row => row.dimensionScores.mobility, {
      id: 'mobility',
      header: 'Mobility',
      cell: info => <Score value={info.getValue()} />,
    }),
    columnHelper.accessor(row => row.dimensionScores.objectiveThreat, {
      id: 'objective',
      header: 'Objective',
      cell: info => <Score value={info.getValue()} />,
    }),
    columnHelper.accessor('difficulty', {
      header: 'Difficulty',
      cell: info => {
        const d = info.getValue();
        return <span className={`text-xs capitalize ${d === 'novice' ? 'text-green-400' : d === 'expert' ? 'text-red-400' : 'text-amber-400'}`}>{d}</span>;
      },
    }),
  ], []);

  const table = useReactTable({
    data: filtered,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-white mb-5" style={{ fontFamily: 'Rajdhani, sans-serif' }}>Pokémon Database</h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-4">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="px-3 py-1.5 rounded-lg bg-[#16213e] border border-[#0f3460] text-white text-sm placeholder-slate-500 focus:outline-none focus:border-purple-500 w-44"
        />
        <select
          value={roleFilter}
          onChange={e => setRoleFilter(e.target.value)}
          className="px-3 py-1.5 rounded-lg bg-[#16213e] border border-[#0f3460] text-white text-sm focus:outline-none focus:border-purple-500"
        >
          <option value="">All Roles</option>
          {ROLE_ORDER.map(r => <option key={r} value={r}>{r.replace(/-/g, ' ')}</option>)}
        </select>
        <select
          value={tierFilter}
          onChange={e => setTierFilter(e.target.value)}
          className="px-3 py-1.5 rounded-lg bg-[#16213e] border border-[#0f3460] text-white text-sm focus:outline-none focus:border-purple-500"
        >
          <option value="">All Tiers</option>
          {['S','A','B','C','D'].map(t => <option key={t} value={t}>Tier {t}</option>)}
        </select>
        <span className="text-sm text-slate-500 self-center">{filtered.length} Pokémon</span>
      </div>

      {/* Table */}
      <div className="bg-[#16213e] border border-[#0f3460] rounded-xl overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            {table.getHeaderGroups().map(hg => (
              <tr key={hg.id} className="border-b border-[#0f3460]">
                {hg.headers.map(header => (
                  <th
                    key={header.id}
                    className="px-3 py-3 text-left text-xs font-semibold text-slate-400 whitespace-nowrap"
                    onClick={header.column.getToggleSortingHandler()}
                    style={{ cursor: header.column.getCanSort() ? 'pointer' : 'default', userSelect: 'none' }}
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}
                    {header.column.getIsSorted() === 'asc' && ' ▲'}
                    {header.column.getIsSorted() === 'desc' && ' ▼'}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map(row => (
              <tr
                key={row.id}
                onClick={() => setSelectedPokemon(row.original)}
                className="border-b border-[#0f3460]/50 hover:bg-white/5 cursor-pointer transition-colors"
              >
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} className="px-3 py-2">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="py-12 text-center text-slate-500">
            {pokemon.length === 0 ? 'Loading data...' : 'No Pokémon match your filters'}
          </div>
        )}
      </div>

      <PokemonDetailModal pokemon={selectedPokemon} onClose={() => setSelectedPokemon(null)} />
    </div>
  );
}

function Score({ value }: { value: number }) {
  return (
    <span className="font-mono font-semibold text-sm" style={{ color: getScoreColor(value) }}>
      {value.toFixed(1)}
    </span>
  );
}
