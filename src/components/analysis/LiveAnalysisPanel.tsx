import { TeamRadarChart } from '../common/TeamRadarChart';
import { CompScoreGauge } from './CompScoreGauge';
import { SynergyBadges } from './SynergyBadges';
import { QuickInsights } from './QuickInsights';
import { ScoreBar } from '../common/ScoreBar';
import { useTeamAnalysis } from '../../hooks/useTeamAnalysis';

const DIMENSION_LABELS = [
  { key: 'damageOutput', label: 'Damage' },
  { key: 'durability', label: 'Durability' },
  { key: 'crowdControl', label: 'CC' },
  { key: 'mobility', label: 'Mobility' },
  { key: 'sustain', label: 'Sustain' },
  { key: 'objectiveThreat', label: 'Objective' },
  { key: 'earlyGame', label: 'Early Game' },
  { key: 'lateGame', label: 'Late Game' },
] as const;

export function LiveAnalysisPanel() {
  const analysis = useTeamAnalysis();

  return (
    <div className="space-y-5">
      {/* Score Gauge */}
      <div className="bg-[#16213e] border border-[#0f3460] rounded-xl p-4 flex flex-col items-center">
        <CompScoreGauge score={analysis.compositeScore} tier={analysis.tier} />
      </div>

      {/* Radar */}
      <div className="bg-[#16213e] border border-[#0f3460] rounded-xl p-4">
        <h3 className="text-sm font-semibold text-slate-300 mb-3">Team Radar</h3>
        <TeamRadarChart scores={analysis.dimensionAverages} size={240} />
      </div>

      {/* Dimension bars */}
      <div className="bg-[#16213e] border border-[#0f3460] rounded-xl p-4">
        <h3 className="text-sm font-semibold text-slate-300 mb-3">Dimensions</h3>
        <div className="space-y-1.5">
          {DIMENSION_LABELS.map(({ key, label }) => (
            <ScoreBar key={key} label={label} score={analysis.dimensionAverages[key]} />
          ))}
        </div>
      </div>

      {/* Synergy Flags */}
      <div className="bg-[#16213e] border border-[#0f3460] rounded-xl p-4">
        <h3 className="text-sm font-semibold text-slate-300 mb-3">Synergies</h3>
        <SynergyBadges flags={analysis.synergyFlags} />
      </div>

      {/* Coaching Tips */}
      <div className="bg-[#16213e] border border-[#0f3460] rounded-xl p-4">
        <h3 className="text-sm font-semibold text-slate-300 mb-3">Coaching Tips</h3>
        <QuickInsights tips={analysis.coachingTips} />
      </div>
    </div>
  );
}
