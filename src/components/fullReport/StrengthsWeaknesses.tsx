interface Props {
  strengths: string[];
  weaknesses: string[];
}

export function StrengthsWeaknesses({ strengths, weaknesses }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-green-500/5 border border-green-500/20 rounded-xl p-4">
        <h3 className="text-sm font-bold text-green-400 mb-3">✓ Strengths</h3>
        {strengths.length > 0 ? (
          <ul className="space-y-2">
            {strengths.map((s, i) => (
              <li key={i} className="flex gap-2 text-sm text-slate-300">
                <span className="text-green-400 shrink-0">•</span>
                <span>{s}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-slate-500">Add Pokémon to see strengths</p>
        )}
      </div>
      <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-4">
        <h3 className="text-sm font-bold text-red-400 mb-3">✗ Weaknesses</h3>
        {weaknesses.length > 0 ? (
          <ul className="space-y-2">
            {weaknesses.map((w, i) => (
              <li key={i} className="flex gap-2 text-sm text-slate-300">
                <span className="text-red-400 shrink-0">•</span>
                <span>{w}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-slate-500">No significant weaknesses detected</p>
        )}
      </div>
    </div>
  );
}
