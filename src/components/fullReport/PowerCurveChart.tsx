import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { PowerCurvePoint } from '../../types/evaluation';

interface Props {
  data: PowerCurvePoint[];
}

export function PowerCurveChart({ data }: Props) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-slate-300 mb-3">Power Curve (Game Minutes)</h3>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e3a5f" />
          <XAxis
            dataKey="minute"
            tick={{ fill: '#94a3b8', fontSize: 11 }}
            tickFormatter={v => `${v}:00`}
          />
          <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} domain={[0, 100]} />
          <Tooltip
            contentStyle={{ backgroundColor: '#16213e', border: '1px solid #0f3460', borderRadius: 8, fontSize: 12 }}
            labelFormatter={v => `Minute ${v}:00`}
            formatter={(value: number) => [`${value}`, 'Power']}
          />
          <ReferenceLine x={5} stroke="#EAB308" strokeDasharray="4 2" label={{ value: 'Drednaw', fill: '#EAB308', fontSize: 10 }} />
          <ReferenceLine x={2} stroke="#22C55E" strokeDasharray="4 2" label={{ value: 'Zapdos', fill: '#22C55E', fontSize: 10 }} />
          <Line
            type="monotone"
            dataKey="power"
            stroke="#7C3AED"
            strokeWidth={2}
            dot={{ fill: '#7C3AED', r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
