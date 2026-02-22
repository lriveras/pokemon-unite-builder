import { MoveSlot, MoveOption } from '../../types/pokemon';
import { clsx } from 'clsx';

interface Props {
  slot: MoveSlot;
  selected: MoveOption | null;
  onSelect: (move: MoveOption) => void;
  label: string;
}

export function MoveSelector({ slot, selected, onSelect, label }: Props) {
  if (slot.options.length === 0) return null;

  if (slot.options.length === 1) {
    return (
      <div>
        <label className="text-xs text-slate-500 block mb-1">{label}</label>
        <div className="px-3 py-2 rounded-lg bg-[#1a1a2e] border border-[#0f3460] text-sm text-slate-300">
          {slot.options[0].name}
          <span className="ml-1 text-xs text-slate-500">(fixed)</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      <label className="text-xs text-slate-500 block mb-1">{label}</label>
      <div className="flex gap-1">
        {slot.options.map(move => (
          <button
            key={move.moveId}
            onClick={() => onSelect(move)}
            className={clsx(
              'flex-1 px-2 py-2 rounded-lg border text-xs font-medium text-left transition-all',
              selected?.moveId === move.moveId
                ? 'border-purple-500 bg-purple-500/20 text-white'
                : 'border-[#0f3460] bg-[#1a1a2e] text-slate-400 hover:border-purple-500/50 hover:text-white'
            )}
            title={move.description || move.name}
          >
            <div className="font-semibold truncate">{move.name}</div>
            <div className="flex gap-1 mt-0.5 flex-wrap">
              {move.isDash && <span className="text-[10px] text-yellow-400">DASH</span>}
              {move.isHeal && <span className="text-[10px] text-green-400">HEAL</span>}
              {move.isShield && <span className="text-[10px] text-blue-400">SHIELD</span>}
              {move.ccType && <span className="text-[10px] text-red-400 uppercase">{move.ccType}</span>}
              {move.isUpgrade && <span className="text-[10px] text-purple-400">+</span>}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
