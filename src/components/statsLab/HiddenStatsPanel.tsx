import { HiddenStatsResult } from '../../types/evaluation';

interface Props {
  stats: HiddenStatsResult | null;
}

function StatRow({ label, value, unit = '', color = 'text-white' }: { label: string; value: string | number; unit?: string; color?: string }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-[#0f3460]/40">
      <span className="text-sm text-slate-400">{label}</span>
      <span className={`text-sm font-mono font-semibold ${color}`}>{typeof value === 'number' ? value.toLocaleString() : value}{unit}</span>
    </div>
  );
}

export function HiddenStatsPanel({ stats }: Props) {
  if (!stats) {
    return (
      <div className="text-center py-12 text-slate-500">
        Configure a Pokémon slot to see hidden stats
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-bold text-slate-300 mb-2">Effective HP (True Survivability)</h3>
        <StatRow label="vs Physical" value={stats.effectiveHPPhysical} color="text-blue-400" />
        <StatRow label="vs Special" value={stats.effectiveHPSpecial} color="text-purple-400" />
        <StatRow label="Physical Reduction" value={stats.damageReductionPhysical.toFixed(1)} unit="%" color="text-blue-400" />
        <StatRow label="Special Reduction" value={stats.damageReductionSpecial.toFixed(1)} unit="%" color="text-purple-400" />
      </div>

      <div>
        <h3 className="text-sm font-bold text-slate-300 mb-2">Attack Patterns</h3>
        <StatRow label="Boosted Attack Interval" value={`Every ${stats.boostInterval} hits`} />
        {stats.evolutionLevel && (
          <StatRow label="Evolution Level" value={stats.evolutionLevel} color="text-amber-400" />
        )}
      </div>

      {stats.totalCCDuration > 0 && (
        <div>
          <h3 className="text-sm font-bold text-slate-300 mb-2">Crowd Control</h3>
          <StatRow label="Total CC Duration" value={stats.totalCCDuration.toFixed(1)} unit="s" color="text-red-400" />
        </div>
      )}

      {stats.moveDPS.length > 0 && (
        <div>
          <h3 className="text-sm font-bold text-slate-300 mb-2">Move DPS</h3>
          {stats.moveDPS.map(m => (
            <StatRow key={m.moveId} label={m.moveName} value={m.dps} color="text-green-400" />
          ))}
        </div>
      )}

      {stats.itemBreakpoints.length > 0 && (
        <div>
          <h3 className="text-sm font-bold text-slate-300 mb-2">Item Stat Breakpoints</h3>
          {stats.itemBreakpoints.map(bp => (
            <div key={bp.itemId} className="mb-3">
              <div className="text-xs text-slate-500 mb-1">{bp.itemName} — {bp.statName}</div>
              <div className="flex gap-2">
                {[{ label: 'Grade 1', val: bp.grade1Value }, { label: 'Grade 20', val: bp.grade20Value }, { label: 'Grade 30', val: bp.grade30Value }].map(({ label, val }) => (
                  <div key={label} className="flex-1 bg-[#1a1a2e] rounded-lg p-2 text-center">
                    <div className="text-xs text-slate-500">{label}</div>
                    <div className="font-bold text-white">{val}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {stats.healingPerSecond > 0 && (
        <div>
          <h3 className="text-sm font-bold text-slate-300 mb-2">Sustain</h3>
          <StatRow label="Healing per Second" value={stats.healingPerSecond} unit=" HP/s" color="text-green-400" />
        </div>
      )}
    </div>
  );
}
