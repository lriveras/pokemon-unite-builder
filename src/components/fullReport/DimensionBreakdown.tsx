import { DimensionScores } from '../../types/pokemon';
import { ScoreBar } from '../common/ScoreBar';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { getScoreColor } from '../../constants/evaluation';

const LABELS: Record<keyof DimensionScores, string> = {
  damageOutput:    'Damage Output',
  durability:      'Durability',
  crowdControl:    'Crowd Control',
  mobility:        'Mobility',
  healing:         'Healing',
  shielding:       'Shielding',
  teamFight:       'Team Fight',
  engage:          'Engage / Pick',
  objectiveThreat: 'Objective Threat',
  earlyGame:       'Early Game',
  lateGame:        'Late Game',
};

interface Props {
  scores: DimensionScores;
}

export function DimensionBreakdown({ scores }: Props) {
  const data = (Object.keys(LABELS) as (keyof DimensionScores)[]).map(k => ({
    name: LABELS[k],
    score: scores[k],
  }));

  return (
    <div className="space-y-4">
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data} layout="vertical" margin={{ top: 0, right: 20, bottom: 0, left: 90 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e3a5f" horizontal={false} />
          <XAxis type="number" domain={[0, 10]} tick={{ fill: '#94a3b8', fontSize: 11 }} />
          <YAxis type="category" dataKey="name" tick={{ fill: '#94a3b8', fontSize: 11 }} width={90} />
          <Tooltip
            contentStyle={{ backgroundColor: '#16213e', border: '1px solid #0f3460', borderRadius: 8, fontSize: 12 }}
            formatter={(value: number) => [value.toFixed(1), 'Score']}
          />
          <Bar dataKey="score" radius={[0, 4, 4, 0]}>
            {data.map(entry => (
              <Cell key={entry.name} fill={getScoreColor(entry.score)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
