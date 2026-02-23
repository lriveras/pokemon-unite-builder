import { useTeamStore } from '../../store/useTeamStore';
import { useTeamAnalysis } from '../../hooks/useTeamAnalysis';
import { TeamRadarChart } from '../common/TeamRadarChart';
import { CompScoreGauge } from '../analysis/CompScoreGauge';
import { DimensionBreakdown } from './DimensionBreakdown';
import { StrengthsWeaknesses } from './StrengthsWeaknesses';
import { SynergySection } from './SynergySection';
import { PowerCurveChart } from './PowerCurveChart';
import { RoleBadge } from '../common/RoleBadge';
import { TierBadge } from '../common/TierBadge';
import { ScoreBar } from '../common/ScoreBar';
import { Link } from 'react-router-dom';
import { DIMENSION_GLOSSARY_LIST } from '../../data/teamCompGlossary';

const CATEGORY_ORDER = ['offense', 'defense', 'support', 'utility', 'timing'] as const;
const CATEGORY_LABELS: Record<string, string> = {
  offense: 'Offense',
  defense: 'Defense',
  support: 'Support',
  utility: 'Utility',
  timing:  'Timing',
};

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

export function FullReportView() {
  const { slots } = useTeamStore();
  const analysis = useTeamAnalysis();
  const filledSlots = slots.filter(s => s.pokemon !== null);

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
          Full Team Report
        </h1>
        <Link
          to="/"
          className="px-3 py-1.5 rounded-lg border border-[#0f3460] text-slate-400 hover:text-white text-sm transition-colors"
        >
          ← Back to Builder
        </Link>
      </div>

      {filledSlots.length === 0 ? (
        <div className="text-center py-20 text-slate-500">
          <p className="text-lg mb-2">No Pokémon in your team</p>
          <Link to="/" className="text-purple-400 hover:text-purple-300">Go to Team Builder →</Link>
        </div>
      ) : (
        <>
          {/* Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Score + Radar */}
            <div className="bg-[#16213e] border border-[#0f3460] rounded-xl p-6 flex flex-col items-center gap-4">
              <CompScoreGauge score={analysis.compositeScore} tier={analysis.tier} />
              <TeamRadarChart scores={analysis.dimensionAverages} size={240} />
            </div>

            {/* Pokemon List */}
            <div className="bg-[#16213e] border border-[#0f3460] rounded-xl p-4 space-y-3">
              <h2 className="text-sm font-bold text-slate-300">Team Members</h2>
              {filledSlots.map(slot => slot.pokemon && (
                <div key={slot.slotIndex} className="flex items-center gap-3 p-2 rounded-lg bg-[#1a1a2e]">
                  <img
                    src={slot.pokemon.spriteUrl}
                    alt={slot.pokemon.name}
                    width={48}
                    height={48}
                    className="rounded-lg bg-slate-700/30"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-white text-sm">{slot.pokemon.name}</span>
                      <TierBadge tier={slot.pokemon.tier} size="sm" />
                    </div>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <RoleBadge role={slot.pokemon.role} size="sm" />
                      <span className="text-xs text-slate-500 capitalize">{slot.pokemon.attackStyle}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-slate-500">Damage</div>
                    <div className="text-sm font-bold" style={{ color: '#7C3AED' }}>
                      {slot.pokemon.dimensionScores.damageOutput.toFixed(1)}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Score breakdown */}
            <div className="bg-[#16213e] border border-[#0f3460] rounded-xl p-4">
              <h2 className="text-sm font-bold text-slate-300 mb-3">Score Breakdown</h2>
              <div className="space-y-2">
                {DIMENSION_LABELS.map(({ key, label }) => (
                  <ScoreBar key={key} label={label} score={analysis.dimensionAverages[key]} />
                ))}
              </div>
            </div>
          </div>

          {/* Dimension Chart */}
          <div className="bg-[#16213e] border border-[#0f3460] rounded-xl p-6">
            <h2 className="text-base font-bold text-slate-200 mb-4">Dimension Analysis</h2>
            <DimensionBreakdown scores={analysis.dimensionAverages} />
          </div>

          {/* Strengths & Weaknesses */}
          <div className="bg-[#16213e] border border-[#0f3460] rounded-xl p-6">
            <h2 className="text-base font-bold text-slate-200 mb-4">Strengths & Weaknesses</h2>
            <StrengthsWeaknesses strengths={analysis.strengths} weaknesses={analysis.weaknesses} />
          </div>

          {/* Power Curve */}
          <div className="bg-[#16213e] border border-[#0f3460] rounded-xl p-6">
            <h2 className="text-base font-bold text-slate-200 mb-4">Power Curve</h2>
            <PowerCurveChart data={analysis.powerCurveData} />
          </div>

          {/* Synergies */}
          <div className="bg-[#16213e] border border-[#0f3460] rounded-xl p-6">
            <h2 className="text-base font-bold text-slate-200 mb-4">Synergy Analysis</h2>
            <SynergySection flags={analysis.synergyFlags} />
          </div>

          {/* Coaching Tips */}
          <div className="bg-[#16213e] border border-[#0f3460] rounded-xl p-6">
            <h2 className="text-base font-bold text-slate-200 mb-4">Coaching Tips</h2>
            <ul className="space-y-3">
              {analysis.coachingTips.map((tip, i) => (
                <li key={i} className="flex gap-3 text-sm text-slate-300">
                  <span className="text-purple-400 text-base shrink-0">💡</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Per-Pokemon Deep Dive */}
          <div className="bg-[#16213e] border border-[#0f3460] rounded-xl p-6">
            <h2 className="text-base font-bold text-slate-200 mb-4">Per-Pokémon Deep Dive</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filledSlots.map(slot => slot.pokemon && (
                <div key={slot.slotIndex} className="bg-[#1a1a2e] rounded-xl p-4 border border-[#0f3460]">
                  <div className="flex items-center gap-2 mb-3">
                    <img src={slot.pokemon.spriteUrl} alt={slot.pokemon.name} width={40} height={40} className="rounded-lg" onError={e => { (e.target as HTMLImageElement).style.display='none'; }} />
                    <div>
                      <div className="font-bold text-white text-sm">{slot.pokemon.name}</div>
                      <RoleBadge role={slot.pokemon.role} size="sm" />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    {DIMENSION_LABELS.map(({ key, label }) => (
                      <ScoreBar key={key} label={label} score={slot.pokemon!.dimensionScores[key]} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Team Comp Glossary */}
          <div className="bg-[#16213e] border border-[#0f3460] rounded-xl p-6">
            <h2 className="text-base font-bold text-slate-200 mb-1">Team Composition Guide</h2>
            <p className="text-xs text-slate-500 mb-5">
              How each scoring dimension is calculated and what it means for your strategy.
              All scores are derived from real game data — stats, move flags, and Crowd Control durations.
            </p>
            {CATEGORY_ORDER.map(cat => {
              const entries = DIMENSION_GLOSSARY_LIST.filter(d => d.category === cat);
              if (entries.length === 0) return null;
              return (
                <div key={cat} className="mb-6 last:mb-0">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 border-b border-[#1e3a6e] pb-1">
                    {CATEGORY_LABELS[cat]}
                  </h3>
                  <div className="space-y-4">
                    {entries.map(def => (
                      <div key={def.id} className="grid grid-cols-1 lg:grid-cols-[180px_1fr] gap-3">
                        {/* Label + badge */}
                        <div className="flex flex-col gap-1.5">
                          <span className={`self-start inline-block px-2 py-0.5 rounded-full border text-xs font-semibold ${def.color}`}>
                            {def.label}
                          </span>
                          <p className="text-xs text-slate-500 leading-relaxed">{def.shortDescription}</p>
                        </div>
                        {/* Details */}
                        <div className="space-y-2">
                          <p className="text-xs text-slate-300 leading-relaxed">{def.fullDescription}</p>
                          <div className="flex flex-col sm:flex-row gap-2 text-xs">
                            <div className="flex-1 bg-[#0d1b35] border border-green-900/40 rounded-lg p-2">
                              <span className="text-green-400 font-semibold">High score: </span>
                              <span className="text-slate-400">{def.highMeaning}</span>
                            </div>
                            <div className="flex-1 bg-[#0d1b35] border border-red-900/40 rounded-lg p-2">
                              <span className="text-red-400 font-semibold">Low score: </span>
                              <span className="text-slate-400">{def.lowMeaning}</span>
                            </div>
                          </div>
                          <div className="text-xs bg-[#0d1b35] border border-[#1e3a6e] rounded-lg px-2 py-1.5">
                            <span className="text-slate-500 font-medium">Data source: </span>
                            <span className="text-slate-600">{def.dataSource}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
