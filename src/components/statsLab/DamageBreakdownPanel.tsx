import { DamageCalculationResult } from '../../types/evaluation';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface Props {
  result: DamageCalculationResult | null;
}

export function DamageBreakdownPanel({ result }: Props) {
  if (!result) {
    return (
      <div className="text-center py-12 text-slate-500">
        Configure a Pokémon slot to see damage calculations
      </div>
    );
  }

  const chartData = [
    ...result.moves.map(m => ({ name: m.moveName.slice(0, 12), damage: m.totalDamage, crit: m.critDamage ?? m.totalDamage })),
    { name: 'Basic (N)', damage: result.basicAttack.normalDamage, crit: result.basicAttack.normalDamage },
    { name: 'Basic (B)', damage: result.basicAttack.boostedDamage, crit: result.basicAttack.boostedDamage },
  ];

  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-sm font-bold text-slate-300 mb-3">Damage Output (Level {result.level})</h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={chartData} margin={{ top: 0, right: 10, bottom: 40, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e3a5f" />
            <XAxis dataKey="name" tick={{ fill: '#94a3b8', fontSize: 10 }} angle={-30} textAnchor="end" />
            <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} />
            <Tooltip
              contentStyle={{ backgroundColor: '#16213e', border: '1px solid #0f3460', borderRadius: 8, fontSize: 12 }}
              formatter={(v: number) => [v.toLocaleString(), '']}
            />
            <Bar dataKey="damage" name="Base Damage" fill="#7C3AED" radius={[4, 4, 0, 0]} />
            <Bar dataKey="crit" name="Crit Damage" fill="#EAB308" radius={[4, 4, 0, 0]} opacity={0.6} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Move Table */}
      <div>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-xs text-slate-500 border-b border-[#0f3460]">
              <th className="text-left py-2">Move</th>
              <th className="text-right py-2">Damage</th>
              <th className="text-right py-2">Crit</th>
              <th className="text-right py-2">DPS</th>
              <th className="text-right py-2">CD</th>
            </tr>
          </thead>
          <tbody>
            {result.moves.map(m => (
              <tr key={m.moveId} className="border-b border-[#0f3460]/50">
                <td className="py-2 text-slate-300">{m.moveName}</td>
                <td className="py-2 text-right font-mono text-white">{m.totalDamage.toLocaleString()}</td>
                <td className="py-2 text-right font-mono text-yellow-400">{m.critDamage?.toLocaleString() ?? '—'}</td>
                <td className="py-2 text-right font-mono text-green-400">{m.dps.toLocaleString()}</td>
                <td className="py-2 text-right text-slate-500">{m.cooldown}s</td>
              </tr>
            ))}
            <tr className="border-b border-[#0f3460]/50">
              <td className="py-2 text-slate-300">Basic (Normal)</td>
              <td className="py-2 text-right font-mono text-white">{result.basicAttack.normalDamage.toLocaleString()}</td>
              <td className="py-2 text-right text-slate-500">—</td>
              <td className="py-2 text-right text-slate-500">—</td>
              <td className="py-2 text-right text-slate-500">~0.5s</td>
            </tr>
            <tr>
              <td className="py-2 text-slate-300">Basic (Boosted)</td>
              <td className="py-2 text-right font-mono text-white">{result.basicAttack.boostedDamage.toLocaleString()}</td>
              <td className="py-2 text-right text-slate-500">—</td>
              <td className="py-2 text-right text-slate-500">—</td>
              <td className="py-2 text-right text-slate-500">every {result.basicAttack.boostInterval}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between p-3 bg-[#1a1a2e] rounded-lg">
        <span className="text-sm text-slate-400">Total Move DPS</span>
        <span className="font-bold text-purple-400 font-mono text-lg">{result.totalDPS.toLocaleString()}</span>
      </div>
    </div>
  );
}
