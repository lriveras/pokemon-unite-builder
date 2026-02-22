import { Pokemon } from '../../types/pokemon';
import { RoleBadge } from './RoleBadge';
import { TierBadge } from './TierBadge';
import { clsx } from 'clsx';

interface Props {
  pokemon: Pokemon;
  onClick?: () => void;
  selected?: boolean;
  compact?: boolean;
}

export function PokemonCard({ pokemon, onClick, selected, compact }: Props) {
  return (
    <button
      onClick={onClick}
      className={clsx(
        'w-full text-left rounded-lg border transition-all duration-150',
        'bg-[#1a1a2e] hover:bg-[#1e2742]',
        selected
          ? 'border-purple-500 ring-1 ring-purple-500/50'
          : 'border-[#0f3460] hover:border-purple-500/50',
        compact ? 'p-2' : 'p-3',
      )}
    >
      <div className="flex items-center gap-3">
        <div className="relative shrink-0">
          <img
            src={pokemon.spriteUrl}
            alt={pokemon.name}
            width={compact ? 40 : 56}
            height={compact ? 40 : 56}
            className="rounded-lg bg-slate-700/30 object-contain"
            onError={(e) => {
              (e.target as HTMLImageElement).src = `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='56' height='56'><rect fill='%230f3460' width='56' height='56' rx='8'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='%23475569' font-size='20'>?</text></svg>`;
            }}
          />
          <div className="absolute -top-1 -right-1">
            <TierBadge tier={pokemon.tier} size="sm" />
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-white text-sm truncate">{pokemon.name}</div>
          {!compact && (
            <div className="flex items-center gap-1.5 mt-1">
              <RoleBadge role={pokemon.role} size="sm" />
              <span className="text-xs text-slate-500 capitalize">{pokemon.attackStyle}</span>
            </div>
          )}
          {compact && <RoleBadge role={pokemon.role} size="sm" />}
        </div>
      </div>
    </button>
  );
}
