import { useState } from 'react';
import { useGameDataStore } from '../../store/useGameDataStore';
import { HeldItem, BattleItem } from '../../types/items';
import { HELD_ITEM_ENRICHMENT } from '../../constants/itemEnrichment';

function HeldItemCard({ item }: { item: HeldItem }) {
  const [grade, setGrade] = useState(20);
  const enrichment = HELD_ITEM_ENRICHMENT[item.itemId];

  function interpolateStat(stat: { grade1: number; grade10: number; grade20: number; grade30: number }) {
    if (grade <= 10) return stat.grade1 + ((stat.grade10 - stat.grade1) * (grade - 1)) / 9;
    if (grade <= 20) return stat.grade10 + ((stat.grade20 - stat.grade10) * (grade - 10)) / 10;
    return stat.grade20 + ((stat.grade30 - stat.grade20) * (grade - 20)) / 10;
  }

  const categoryColors: Record<string, string> = {
    offense: '#EF4444',
    defense: '#3B82F6',
    support: '#22C55E',
    mobility: '#EAB308',
  };

  return (
    <div className="bg-[#16213e] border border-[#0f3460] rounded-xl p-4">
      <div className="flex items-start justify-between mb-2">
        <h3 className="font-bold text-white text-sm">{item.name}</h3>
        <span
          className="text-xs px-2 py-0.5 rounded-full font-medium capitalize"
          style={{ color: categoryColors[item.category] || '#9CA3AF', backgroundColor: `${categoryColors[item.category]}20` }}
        >
          {item.category}
        </span>
      </div>
      <p className="text-xs text-slate-400 mb-3">{enrichment?.description || item.description || '—'}</p>
      {enrichment?.passive && (
        <p className="text-xs text-purple-300 mb-3 italic">Passive: {enrichment.passive}</p>
      )}

      {/* Grade slider */}
      <div className="mb-3">
        <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
          <span>Grade</span>
          <span className="text-purple-400 font-bold">{grade}</span>
        </div>
        <input
          type="range"
          min={1}
          max={30}
          value={grade}
          onChange={e => setGrade(Number(e.target.value))}
          className="w-full h-1.5 accent-purple-500"
        />
        <div className="flex justify-between text-[10px] text-slate-600">
          <span>1</span><span>10</span><span>20</span><span>30</span>
        </div>
      </div>

      {/* Stats at current grade */}
      {item.stats.length > 0 && (
        <div className="space-y-1">
          {item.stats.map(stat => (
            <div key={stat.statName} className="flex items-center justify-between">
              <span className="text-xs text-slate-500">{stat.statName}</span>
              <span className="text-xs font-mono text-white font-semibold">
                +{interpolateStat(stat).toFixed(1)}{stat.unit}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function BattleItemCard({ item }: { item: BattleItem }) {
  const categoryColors: Record<string, string> = {
    combat: '#EF4444',
    mobility: '#EAB308',
    support: '#22C55E',
    recovery: '#3B82F6',
  };

  return (
    <div className="bg-[#16213e] border border-[#0f3460] rounded-xl p-4">
      <div className="flex items-start justify-between mb-2">
        <h3 className="font-bold text-white text-sm">{item.name}</h3>
        <span
          className="text-xs px-2 py-0.5 rounded-full font-medium capitalize"
          style={{ color: categoryColors[item.category] || '#9CA3AF', backgroundColor: `${categoryColors[item.category]}20` }}
        >
          {item.category}
        </span>
      </div>
      <p className="text-xs text-slate-400 mb-3">{item.description}</p>
      <div className="flex items-center gap-3 text-xs text-slate-500">
        <span>CD: <span className="text-white font-semibold">{item.cooldown}s</span></span>
        <span className="text-slate-600">|</span>
        <span>{item.effect}</span>
      </div>
    </div>
  );
}

export function ItemsView() {
  const { heldItems, battleItems } = useGameDataStore();
  const [tab, setTab] = useState<'held' | 'battle'>('held');
  const [catFilter, setCatFilter] = useState('');

  const filteredHeld = catFilter ? heldItems.filter(i => i.category === catFilter) : heldItems;
  const filteredBattle = catFilter ? battleItems.filter(i => i.category === catFilter) : battleItems;

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-white mb-5" style={{ fontFamily: 'Rajdhani, sans-serif' }}>Items Reference</h1>

      <div className="flex gap-2 mb-5">
        <button
          onClick={() => { setTab('held'); setCatFilter(''); }}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${tab === 'held' ? 'bg-purple-600 text-white' : 'bg-[#16213e] text-slate-400 hover:text-white border border-[#0f3460]'}`}
        >
          Held Items ({heldItems.length})
        </button>
        <button
          onClick={() => { setTab('battle'); setCatFilter(''); }}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${tab === 'battle' ? 'bg-purple-600 text-white' : 'bg-[#16213e] text-slate-400 hover:text-white border border-[#0f3460]'}`}
        >
          Battle Items ({battleItems.length})
        </button>

        {tab === 'held' && (
          <div className="flex gap-1 ml-2">
            {['offense','defense','support','mobility'].map(cat => (
              <button
                key={cat}
                onClick={() => setCatFilter(catFilter === cat ? '' : cat)}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors ${catFilter === cat ? 'bg-purple-600 text-white' : 'bg-[#16213e] text-slate-400 hover:text-white border border-[#0f3460]'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {tab === 'held'
          ? filteredHeld.map(item => <HeldItemCard key={item.itemId} item={item} />)
          : filteredBattle.map(item => <BattleItemCard key={item.itemId} item={item} />)
        }
      </div>
    </div>
  );
}
