import { useState } from 'react';
import { useSavedCompsStore } from '../../store/useSavedCompsStore';
import { TeamRadarChart } from '../common/TeamRadarChart';
import { evaluateTeam } from '../../engine/teamEvaluator';
import { ScoreBar } from '../common/ScoreBar';
import { DimensionScores } from '../../types/pokemon';

const DIMENSION_LABELS = [
  { key: 'damageOutput',    label: 'Damage' },
  { key: 'durability',      label: 'Durability' },
  { key: 'crowdControl',    label: 'Crowd Control' },
  { key: 'mobility',        label: 'Mobility' },
  { key: 'healing',         label: 'Healing' },
  { key: 'shielding',       label: 'Shielding' },
  { key: 'objectiveThreat', label: 'Objective' },
  { key: 'earlyGame',       label: 'Early Game' },
  { key: 'lateGame',        label: 'Late Game' },
] as const;

export function CompareView() {
  const { compositions } = useSavedCompsStore();
  const [compAId, setCompAId] = useState(compositions[0]?.id ?? '');
  const [compBId, setCompBId] = useState(compositions[1]?.id ?? '');

  const compA = compositions.find(c => c.id === compAId);
  const compB = compositions.find(c => c.id === compBId);

  const evalA = compA ? evaluateTeam(compA.slots.map(s => s.pokemon)) : null;
  const evalB = compB ? evaluateTeam(compB.slots.map(s => s.pokemon)) : null;

  if (compositions.length < 2) {
    return (
      <div className="max-w-screen-xl mx-auto px-4 py-6 text-center">
        <h1 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: 'Rajdhani, sans-serif' }}>Compare Compositions</h1>
        <div className="py-20 text-slate-500">
          <p className="text-lg mb-2">You need at least 2 saved compositions to compare</p>
          <p className="text-sm">Save compositions from the Team Builder using the "Save Comp" button</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-6 space-y-6">
      <h1 className="text-2xl font-bold text-white" style={{ fontFamily: 'Rajdhani, sans-serif' }}>Compare Compositions</h1>

      {/* Selectors */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-[#16213e] border border-purple-600 rounded-xl p-4">
          <label className="text-xs text-slate-500 block mb-1">Composition A</label>
          <select
            value={compAId}
            onChange={e => setCompAId(e.target.value)}
            className="w-full bg-[#1a1a2e] border border-[#0f3460] text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-purple-500"
          >
            {compositions.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
          {compA && (
            <div className="mt-2 text-xs text-slate-500">
              Score: <span className="text-purple-400 font-bold">{compA.compositeScore}</span>
            </div>
          )}
        </div>
        <div className="bg-[#16213e] border border-amber-600 rounded-xl p-4">
          <label className="text-xs text-slate-500 block mb-1">Composition B</label>
          <select
            value={compBId}
            onChange={e => setCompBId(e.target.value)}
            className="w-full bg-[#1a1a2e] border border-[#0f3460] text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-amber-500"
          >
            {compositions.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
          {compB && (
            <div className="mt-2 text-xs text-slate-500">
              Score: <span className="text-amber-400 font-bold">{compB.compositeScore}</span>
            </div>
          )}
        </div>
      </div>

      {evalA && evalB && (
        <>
          {/* Overlaid Radar */}
          <div className="bg-[#16213e] border border-[#0f3460] rounded-xl p-6">
            <h2 className="text-base font-bold text-slate-200 mb-4">Radar Comparison</h2>
            <div className="flex gap-4 text-xs text-slate-400 mb-3">
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-purple-500 inline-block" />{compA.name} (A)</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />{compB.name} (B)</span>
            </div>
            <TeamRadarChart scores={evalA.dimensionAverages} compareScores={evalB.dimensionAverages} size={320} />
          </div>

          {/* Dimension Table */}
          <div className="bg-[#16213e] border border-[#0f3460] rounded-xl p-6">
            <h2 className="text-base font-bold text-slate-200 mb-4">Dimension Comparison</h2>
            <div className="space-y-3">
              {DIMENSION_LABELS.map(({ key, label }) => {
                const a = evalA.dimensionAverages[key];
                const b = evalB.dimensionAverages[key];
                const winner = a > b ? 'A' : b > a ? 'B' : '=';
                return (
                  <div key={key}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-slate-400">{label}</span>
                      <span className={`text-xs font-bold ${winner === 'A' ? 'text-purple-400' : winner === 'B' ? 'text-amber-400' : 'text-slate-500'}`}>
                        {winner === 'A' ? `A wins (${a.toFixed(1)} vs ${b.toFixed(1)})` : winner === 'B' ? `B wins (${b.toFixed(1)} vs ${a.toFixed(1)})` : `Tied (${a.toFixed(1)})`}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <ScoreBar label="" score={a} showValue={false} />
                      <ScoreBar label="" score={b} showValue={false} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
