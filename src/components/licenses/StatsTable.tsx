import { Pokemon, PokemonStats } from '../../types/pokemon';

interface Props {
  pokemon: Pokemon;
}

const HEADERS = ['Lvl', 'HP', 'ATK', 'DEF', 'Sp.ATK', 'Sp.DEF', 'Speed'];

function fmt(n: number) {
  return n.toLocaleString();
}

function EvolutionLabel({ stages, level }: { stages: Pokemon['stages']; level: number }) {
  const stage = stages.find(s => s.level === level);
  if (!stage) return null;
  const name = stage.name.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  return (
    <span className="ml-2 px-1.5 py-0.5 text-xs rounded bg-purple-900/50 text-purple-300 border border-purple-700/40 font-medium whitespace-nowrap">
      → {name}
    </span>
  );
}

export function StatsTable({ pokemon }: Props) {
  const { statsProgression, stages } = pokemon;

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-xs border-collapse">
        <thead>
          <tr className="bg-[#0d1b35]">
            {HEADERS.map(h => (
              <th
                key={h}
                className="px-2 py-2 text-right first:text-left text-slate-400 font-semibold border-b border-[#1e3a6e] whitespace-nowrap"
              >
                {h}
              </th>
            ))}
            <th className="px-2 py-2 text-left text-slate-400 font-semibold border-b border-[#1e3a6e]">
              Stage
            </th>
          </tr>
        </thead>
        <tbody>
          {statsProgression.map((s: PokemonStats, idx: number) => {
            const isEvo = stages.some(st => st.level === s.level);
            return (
              <tr
                key={s.level}
                className={`border-b border-[#1e3a6e]/40 ${isEvo ? 'bg-purple-950/20' : idx % 2 === 0 ? 'bg-transparent' : 'bg-white/[0.02]'}`}
              >
                <td className="px-2 py-1.5 font-bold text-white">{s.level}</td>
                <td className="px-2 py-1.5 text-right text-green-300">{fmt(s.hp)}</td>
                <td className="px-2 py-1.5 text-right text-orange-300">{fmt(s.atk)}</td>
                <td className="px-2 py-1.5 text-right text-blue-300">{fmt(s.def)}</td>
                <td className="px-2 py-1.5 text-right text-purple-300">{fmt(s.sp_atk)}</td>
                <td className="px-2 py-1.5 text-right text-cyan-300">{fmt(s.sp_def)}</td>
                <td className="px-2 py-1.5 text-right text-slate-300">
                  {(s as PokemonStats & { speed?: number }).speed
                    ? fmt((s as PokemonStats & { speed?: number }).speed!)
                    : '—'}
                </td>
                <td className="px-2 py-1.5">
                  <EvolutionLabel stages={stages} level={s.level} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <p className="mt-2 text-xs text-slate-500 italic">
        Stats sourced from pvpoke-unite game data. Speed shown where available.
      </p>
    </div>
  );
}
