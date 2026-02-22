import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { TeamSlot as TTeamSlot } from '../../types/team';
import { useUIStore } from '../../store/useUIStore';
import { useTeamStore } from '../../store/useTeamStore';
import { RoleBadge } from '../common/RoleBadge';
import { TierBadge } from '../common/TierBadge';
import { clsx } from 'clsx';

interface Props {
  slot: TTeamSlot;
  isActive?: boolean;
  onSelect: () => void;
}

export function TeamSlotCard({ slot, isActive, onSelect }: Props) {
  const { openPokemonPicker } = useUIStore();
  const { clearSlot } = useTeamStore();
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: `slot-${slot.slotIndex}`,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const pokemon = slot.pokemon;

  return (
    <div
      ref={setNodeRef}
      style={style}
      onClick={onSelect}
      className={clsx(
        'relative rounded-xl border-2 transition-all cursor-pointer',
        isActive
          ? 'border-purple-500 bg-[#1e2742] shadow-lg shadow-purple-900/30'
          : 'border-[#0f3460] bg-[#16213e] hover:border-purple-500/50',
        'group'
      )}
    >
      {/* Drag handle */}
      <div
        {...attributes}
        {...listeners}
        className="absolute top-2 left-2 p-1 rounded text-slate-600 hover:text-slate-400 cursor-grab active:cursor-grabbing"
        onClick={e => e.stopPropagation()}
      >
        ⠿
      </div>

      {pokemon ? (
        <div className="p-3 pt-7">
          <div className="flex flex-col items-center gap-2">
            <div className="relative">
              <img
                src={pokemon.spriteUrl}
                alt={pokemon.name}
                width={72}
                height={72}
                className="rounded-lg bg-slate-700/30 object-contain"
                onError={(e) => { (e.target as HTMLImageElement).src = `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='72' height='72'><rect fill='%230f3460' width='72' height='72' rx='8'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='%23475569' font-size='24'>?</text></svg>`; }}
              />
              <div className="absolute -top-1.5 -right-1.5">
                <TierBadge tier={pokemon.tier} size="sm" />
              </div>
            </div>
            <div className="text-center">
              <div className="font-bold text-white text-sm leading-tight">{pokemon.name}</div>
              <div className="mt-1">
                <RoleBadge role={pokemon.role} size="sm" />
              </div>
            </div>
            {/* Remove button */}
            <button
              onClick={e => { e.stopPropagation(); clearSlot(slot.slotIndex); }}
              className="absolute top-2 right-2 p-1 rounded text-slate-600 hover:text-red-400 transition-colors"
              title="Remove"
            >
              ✕
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={e => { e.stopPropagation(); openPokemonPicker(slot.slotIndex); }}
          className="w-full h-full min-h-[130px] flex flex-col items-center justify-center gap-2 text-slate-600 hover:text-slate-400 transition-colors p-3"
        >
          <div className="w-14 h-14 rounded-xl border-2 border-dashed border-current flex items-center justify-center text-2xl">+</div>
          <span className="text-xs font-medium">Slot {slot.slotIndex + 1}</span>
        </button>
      )}
    </div>
  );
}
