import { BattleItem } from '../../types/items';
import { useGameDataStore } from '../../store/useGameDataStore';

interface Props {
  battleItem: BattleItem | null;
  onSetItem: (item: BattleItem | null) => void;
}

export function BattleItemSelector({ battleItem, onSetItem }: Props) {
  const { battleItems } = useGameDataStore();

  return (
    <div>
      <label className="text-xs text-slate-500 block mb-1">Battle Item</label>
      <select
        value={battleItem?.itemId ?? ''}
        onChange={(e) => {
          const found = battleItems.find(x => x.itemId === e.target.value) ?? null;
          onSetItem(found);
        }}
        className="w-full px-2 py-1.5 rounded-lg bg-[#1a1a2e] border border-[#0f3460] text-xs text-white focus:outline-none focus:border-purple-500"
      >
        <option value="">— None —</option>
        {battleItems.map(item => (
          <option key={item.itemId} value={item.itemId}>
            {item.name} ({item.cooldown}s CD)
          </option>
        ))}
      </select>
      {battleItem && (
        <p className="text-xs text-slate-500 mt-1">{battleItem.description}</p>
      )}
    </div>
  );
}
