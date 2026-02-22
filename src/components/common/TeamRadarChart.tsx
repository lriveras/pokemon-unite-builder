import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, Tooltip } from 'recharts';
import { DimensionScores } from '../../types/pokemon';
import { getScoreColor } from '../../constants/evaluation';

interface Props {
  scores: DimensionScores;
  compareScores?: DimensionScores;
  size?: number;
}

const DIMENSION_LABELS: Record<keyof DimensionScores, string> = {
  damageOutput: 'Damage',
  durability: 'Durability',
  crowdControl: 'CC',
  mobility: 'Mobility',
  sustain: 'Sustain',
  objectiveThreat: 'Objective',
  earlyGame: 'Early',
  lateGame: 'Late',
};

export function TeamRadarChart({ scores, compareScores, size = 280 }: Props) {
  const data = (Object.keys(DIMENSION_LABELS) as (keyof DimensionScores)[]).map(key => ({
    dimension: DIMENSION_LABELS[key],
    value: Math.round(scores[key] * 10) / 10,
    compare: compareScores ? Math.round(compareScores[key] * 10) / 10 : undefined,
  }));

  return (
    <ResponsiveContainer width="100%" height={size}>
      <RadarChart data={data} cx="50%" cy="50%" outerRadius="80%">
        <PolarGrid stroke="#1e3a5f" />
        <PolarAngleAxis
          dataKey="dimension"
          tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 500 }}
        />
        <Radar
          name="Team"
          dataKey="value"
          stroke="#7C3AED"
          fill="#7C3AED"
          fillOpacity={0.25}
          dot={{ fill: '#7C3AED', r: 3 }}
        />
        {compareScores && (
          <Radar
            name="Compare"
            dataKey="compare"
            stroke="#EAB308"
            fill="#EAB308"
            fillOpacity={0.2}
            dot={{ fill: '#EAB308', r: 3 }}
          />
        )}
        <Tooltip
          contentStyle={{ backgroundColor: '#16213e', border: '1px solid #0f3460', borderRadius: 8, fontSize: 12 }}
          labelStyle={{ color: '#e2e8f0' }}
          formatter={(value: number) => [value.toFixed(1), '']}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
}
