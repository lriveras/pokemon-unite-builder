import { HeldItem } from '../../types/items';
import { useGameDataStore } from '../../store/useGameDataStore';
import { clsx } from 'clsx';

interface Props {
  heldItems: (HeldItem | null)[];
  itemGrades: number[];
  maxSlots: number;
  onSetItem: (index: number, item: HeldItem | null) => void;
  onSetGrade: (index: number, grade: number) => void;
}

export function HeldItemSelector({ heldItems, itemGrades, maxSlots, onSetItem, onSetGrade }: Props) {
  const { heldItems: allItems } = useGameDataStore();

  return (
    <div>
      <label className="text-xs text-slate-500 block mb-2">Held Items ({maxSlots} slots)</label>
      <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${maxSlots}, 1fr)` }}>
        {Array.from({ length: maxSlots }).map((_, i) => {
          const item = heldItems[i];
          return (
            <div key={i} className="space-y-1">
              <select
                value={item?.itemId ?? ''}
                onChange={(e) => {
                  const found = allItems.find(x => x.itemId === e.target.value) ?? null;
                  onSetItem(i, found);
                }}
                className="w-full px-2 py-1.5 rounded-lg bg-[#1a1a2e] border border-[#0f3460] text-xs text-white focus:outline-none focus:border-purple-500"
              >
                <option value="">— None —</option>
                {allItems.map(it => (
                  <option key={it.itemId} value={it.itemId}>{it.name}</option>
                ))}
              </select>
              {item && (
                <div className="flex items-center gap-1">
                  <span className="text-[10px] text-slate-500">Grade</span>
                  <input
                    type="range"
                    min={1}
                    max={30}
                    value={itemGrades[i] ?? 1}
                    onChange={e => onSetGrade(i, Number(e.target.value))}
                    className="flex-1 h-1 accent-purple-500"
                  />
                  <span className="text-[10px] text-purple-400 w-5 text-right">{itemGrades[i] ?? 1}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
