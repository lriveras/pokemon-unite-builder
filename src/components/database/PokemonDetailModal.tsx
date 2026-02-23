import { Pokemon } from '../../types/pokemon';
import { Modal } from '../common/Modal';
import { RoleBadge } from '../common/RoleBadge';
import { TierBadge } from '../common/TierBadge';
import { ScoreBar } from '../common/ScoreBar';
import { TeamRadarChart } from '../common/TeamRadarChart';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface Props {
  pokemon: Pokemon | null;
  onClose: () => void;
}

export function PokemonDetailModal({ pokemon, onClose }: Props) {
  if (!pokemon) return null;

  const statData = pokemon.statsProgression.map(s => ({
    level: s.level,
    HP: s.hp,
    Atk: s.atk,
    'Sp.Atk': s.sp_atk,
    Def: s.def,
  }));

  return (
    <Modal open={!!pokemon} onClose={onClose} title={pokemon.name} size="xl">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-5">
          <img
            src={pokemon.spriteUrl}
            alt={pokemon.name}
            width={96}
            height={96}
            className="rounded-2xl bg-slate-700/30 object-contain"
            onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
          />
          <div>
            <div className="flex items-center gap-2 mb-2">
              <h2 className="text-2xl font-bold text-white" style={{ fontFamily: 'Rajdhani, sans-serif' }}>{pokemon.name}</h2>
              <TierBadge tier={pokemon.tier} size="lg" />
            </div>
            <div className="flex items-center gap-2 mb-1">
              <RoleBadge role={pokemon.role} size="md" />
              <span className="text-sm text-slate-400 capitalize">{pokemon.attackStyle} attacker</span>
              <span className="text-sm text-slate-400 capitalize">• {pokemon.damageType}</span>
            </div>
            <div className="text-sm text-slate-500 capitalize">
              Difficulty: {pokemon.difficulty} • {pokemon.isMega ? 'Mega (2 items)' : '3 item slots'}
            </div>
          </div>
        </div>

        {/* Radar + Scores */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TeamRadarChart scores={pokemon.dimensionScores} size={240} />
          <div className="space-y-1.5">
            {(['damageOutput', 'durability', 'crowdControl', 'mobility', 'healing', 'shielding', 'objectiveThreat', 'earlyGame', 'lateGame'] as const).map(key => (
              <ScoreBar key={key} label={key.replace(/([A-Z])/g, ' $1').replace(/^./, c => c.toUpperCase())} score={pokemon.dimensionScores[key]} />
            ))}
          </div>
        </div>

        {/* Stat Curves */}
        <div>
          <h3 className="text-sm font-bold text-slate-300 mb-3">Stat Progression</h3>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={statData} margin={{ top: 5, right: 10, bottom: 5, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e3a5f" />
              <XAxis dataKey="level" tick={{ fill: '#94a3b8', fontSize: 11 }} />
              <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} />
              <Tooltip contentStyle={{ backgroundColor: '#16213e', border: '1px solid #0f3460', borderRadius: 8, fontSize: 12 }} />
              <Line type="monotone" dataKey="Atk" stroke="#EF4444" dot={false} />
              <Line type="monotone" dataKey="Sp.Atk" stroke="#A855F7" dot={false} />
              <Line type="monotone" dataKey="Def" stroke="#3B82F6" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Moves */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {pokemon.slot1.options.length > 0 && (
            <div>
              <h3 className="text-sm font-bold text-slate-300 mb-2">Move Slot 1</h3>
              {pokemon.slot1.options.map(m => (
                <div key={m.moveId} className="p-2 mb-1 bg-[#1a1a2e] rounded-lg text-sm">
                  <span className="text-white font-medium">{m.name}</span>
                  <div className="flex gap-1 mt-0.5">
                    {m.ccType && <span className="text-xs text-red-400 uppercase">{m.ccType}</span>}
                    {m.isDash && <span className="text-xs text-yellow-400">DASH</span>}
                    {m.isHeal && <span className="text-xs text-green-400">HEAL</span>}
                    <span className="text-xs text-slate-500">{m.cooldown}s CD</span>
                  </div>
                </div>
              ))}
            </div>
          )}
          {pokemon.slot2.options.length > 0 && (
            <div>
              <h3 className="text-sm font-bold text-slate-300 mb-2">Move Slot 2</h3>
              {pokemon.slot2.options.map(m => (
                <div key={m.moveId} className="p-2 mb-1 bg-[#1a1a2e] rounded-lg text-sm">
                  <span className="text-white font-medium">{m.name}</span>
                  <div className="flex gap-1 mt-0.5">
                    {m.ccType && <span className="text-xs text-red-400 uppercase">{m.ccType}</span>}
                    {m.isDash && <span className="text-xs text-yellow-400">DASH</span>}
                    {m.isHeal && <span className="text-xs text-green-400">HEAL</span>}
                    <span className="text-xs text-slate-500">{m.cooldown}s CD</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Unite Move */}
        <div className="p-3 bg-purple-900/20 border border-purple-800/40 rounded-xl">
          <div className="text-xs text-purple-300 font-semibold uppercase mb-1">Unite Move</div>
          <div className="text-white font-medium">{pokemon.uniteMove.name}</div>
        </div>
      </div>
    </Modal>
  );
}
