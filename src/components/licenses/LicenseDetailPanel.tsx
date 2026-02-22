import { useState } from 'react';
import { Pokemon } from '../../types/pokemon';
import { RoleBadge } from '../common/RoleBadge';
import { TierBadge } from '../common/TierBadge';
import { StatsTable } from './StatsTable';
import { MoveDetailCard } from './MoveDetailCard';
import { MechanicTag } from './MechanicTag';
import { MECHANICS_GLOSSARY, HINDRANCE_TYPES, STATUS_CONDITIONS, MOVE_CATEGORIES } from '../../data/mechanicsGlossary';

interface Props {
  pokemon: Pokemon;
}

type Tab = 'overview' | 'stats' | 'moves' | 'glossary';

const TABS: { id: Tab; label: string }[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'stats', label: 'Stats (All Levels)' },
  { id: 'moves', label: 'Moves & Damage' },
  { id: 'glossary', label: 'Mechanics Glossary' },
];

function StatPill({ label, value, color }: { label: string; value: string | number; color: string }) {
  return (
    <div className="flex flex-col items-center bg-[#0d1b35] rounded-xl p-3 border border-[#1e3a6e]">
      <span className={`text-lg font-bold ${color}`}>{value}</span>
      <span className="text-xs text-slate-500 mt-0.5">{label}</span>
    </div>
  );
}

function RatingBar({ label, value }: { label: string; value: number }) {
  const pct = (value / 5) * 100;
  const color =
    value >= 4.5 ? 'bg-green-500' : value >= 3.5 ? 'bg-blue-500' : value >= 2.5 ? 'bg-yellow-500' : 'bg-red-500';
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-slate-400 w-20 shrink-0 capitalize">{label}</span>
      <div className="flex-1 h-2 rounded-full bg-[#1e3a6e]">
        <div className={`h-2 rounded-full ${color} transition-all`} style={{ width: `${pct}%` }} />
      </div>
      <span className="text-xs font-bold text-white w-6 text-right">{value}</span>
    </div>
  );
}

function EvolutionChain({ stages }: { stages: Pokemon['stages'] }) {
  if (stages.length === 0) return null;
  return (
    <div className="flex items-center gap-2 flex-wrap">
      {stages.map((stage, i) => (
        <div key={stage.name} className="flex items-center gap-2">
          {i > 0 && (
            <div className="text-slate-500 text-sm">→</div>
          )}
          <div className="flex flex-col items-center bg-[#0d1b35] rounded-xl px-4 py-2 border border-[#1e3a6e]">
            <span className="text-white font-semibold text-sm capitalize">
              {stage.name.replace(/_/g, ' ')}
            </span>
            {stage.level > 1 && (
              <span className="text-xs text-purple-400">Lv {stage.level}</span>
            )}
            {stage.level === 1 && (
              <span className="text-xs text-slate-500">Start</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

function GlossarySection({ title, items }: { title: string; items: ReturnType<typeof Object.values<typeof MECHANICS_GLOSSARY[string]>> }) {
  return (
    <div>
      <h4 className="text-sm font-bold text-slate-300 mb-3 border-b border-[#1e3a6e] pb-2">{title}</h4>
      <div className="space-y-3">
        {items.map(def => (
          <div key={def.id} className="flex gap-3">
            <div className="shrink-0 mt-0.5">
              <span className={`inline-block px-2 py-0.5 rounded-full border text-xs font-medium ${def.color}`}>
                {def.label}
              </span>
            </div>
            <div>
              <p className="text-xs text-slate-300 leading-relaxed">{def.fullDescription}</p>
              {def.blockedByUnstoppable === false && (
                <p className="text-xs text-red-400 mt-1 font-medium">
                  Bypasses Unstoppable &amp; Hindrance Resistance
                </p>
              )}
              {def.blockedByUnstoppable === true && (
                <p className="text-xs text-slate-500 mt-1">Blocked by Unstoppable</p>
              )}
              {def.convertedByHindranceResistance && (
                <p className="text-xs text-amber-600/80 mt-0.5">
                  Converted to Slow by Hindrance Resistance
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function LicenseDetailPanel({ pokemon }: Props) {
  const [tab, setTab] = useState<Tab>('overview');

  const maxStats = pokemon.statsAtMaxLevel;

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-start gap-5 p-6 border-b border-[#1e3a6e] bg-[#16213e]">
        <img
          src={pokemon.spriteUrl}
          alt={pokemon.name}
          width={80}
          height={80}
          className="rounded-2xl bg-slate-700/30 object-contain shrink-0"
          onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <h2 className="text-2xl font-bold text-white" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
              {pokemon.name}
            </h2>
            <TierBadge tier={pokemon.tier} size="lg" />
          </div>
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <RoleBadge role={pokemon.role} size="md" />
            <MechanicTag mechanic={pokemon.damageType === 'melee' ? 'melee' : 'ranged'} />
            <MechanicTag mechanic={pokemon.attackStyle === 'special' ? 'special' : 'physical'} />
          </div>
          <div className="text-xs text-slate-500 capitalize">
            Difficulty: <span className={
              pokemon.difficulty === 'novice' ? 'text-green-400' :
              pokemon.difficulty === 'expert' ? 'text-red-400' : 'text-amber-400'
            }>{pokemon.difficulty}</span>
            {pokemon.isMega && <span className="ml-2 text-purple-400">· Mega (2 item slots)</span>}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#1e3a6e] bg-[#16213e] px-4 overflow-x-auto">
        {TABS.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-4 py-2.5 text-xs font-semibold whitespace-nowrap transition-colors border-b-2 -mb-px ${
              tab === t.id
                ? 'border-purple-500 text-purple-400'
                : 'border-transparent text-slate-500 hover:text-slate-300'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">

        {/* ── OVERVIEW ─────────────────────────────────────────── */}
        {tab === 'overview' && (
          <>
            {/* Max-level stat pills */}
            <div>
              <h3 className="text-sm font-bold text-slate-300 mb-3">Stats at Level 15</h3>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                <StatPill label="HP" value={maxStats.hp.toLocaleString()} color="text-green-300" />
                <StatPill label="ATK" value={maxStats.atk.toLocaleString()} color="text-orange-300" />
                <StatPill label="DEF" value={maxStats.def.toLocaleString()} color="text-blue-300" />
                <StatPill label="Sp.ATK" value={maxStats.sp_atk.toLocaleString()} color="text-purple-300" />
                <StatPill label="Sp.DEF" value={maxStats.sp_def.toLocaleString()} color="text-cyan-300" />
                <StatPill
                  label="CDR"
                  value={maxStats.cdr ? `${maxStats.cdr}%` : '—'}
                  color="text-yellow-300"
                />
              </div>
            </div>

            {/* pvpoke ratings */}
            <div>
              <h3 className="text-sm font-bold text-slate-300 mb-3">Official Ratings (pvpoke)</h3>
              <div className="space-y-2">
                {Object.entries(pokemon.ratings).map(([key, val]) => (
                  <RatingBar key={key} label={key} value={val} />
                ))}
              </div>
            </div>

            {/* Basic attack */}
            <div>
              <h3 className="text-sm font-bold text-slate-300 mb-2">Basic Attack</h3>
              <div className="bg-[#0d1b35] border border-[#1e3a6e] rounded-xl p-4 text-sm text-slate-300 space-y-1">
                <div>
                  Style:{' '}
                  <span className="text-white font-medium capitalize">{pokemon.basicAttack.boostStyle}</span>
                </div>
                <div>
                  Boosted every:{' '}
                  <span className="text-white font-medium">{pokemon.basicAttack.boostCount} attacks</span>
                </div>
              </div>
            </div>

            {/* Evolution chain */}
            {pokemon.stages.length > 0 && (
              <div>
                <h3 className="text-sm font-bold text-slate-300 mb-3">Evolution Chain</h3>
                <EvolutionChain stages={pokemon.stages} />
              </div>
            )}
          </>
        )}

        {/* ── STATS ────────────────────────────────────────────── */}
        {tab === 'stats' && (
          <>
            <h3 className="text-sm font-bold text-slate-300">Full Stat Progression (Levels 1–15)</h3>
            <StatsTable pokemon={pokemon} />
          </>
        )}

        {/* ── MOVES ────────────────────────────────────────────── */}
        {tab === 'moves' && (
          <>
            {/* Basic attack */}
            <div>
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Basic Attack</h3>
              <div className="bg-[#0d1b35] border border-[#1e3a6e] rounded-xl p-4 text-sm space-y-1 text-slate-300">
                <div className="font-semibold text-white">Basic Attack</div>
                <div className="text-xs text-slate-500">
                  {pokemon.basicAttack.boostStyle === 'special' ? 'Special' : 'Physical'} ·{' '}
                  Boosted every {pokemon.basicAttack.boostCount} attacks
                </div>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  <MechanicTag mechanic={pokemon.basicAttack.boostStyle === 'special' ? 'special' : 'physical'} />
                  <MechanicTag mechanic={pokemon.damageType === 'melee' ? 'melee' : 'ranged'} />
                </div>
              </div>
            </div>

            {/* Slot 1 */}
            {pokemon.slot1.options.length > 0 && (
              <div>
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Move Slot 1</h3>
                <div className="space-y-3">
                  {pokemon.slot1.options.map(move => (
                    <MoveDetailCard key={move.moveId} move={move} pokemon={pokemon} showDamage />
                  ))}
                </div>
              </div>
            )}

            {/* Slot 2 */}
            {pokemon.slot2.options.length > 0 && (
              <div>
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Move Slot 2</h3>
                <div className="space-y-3">
                  {pokemon.slot2.options.map(move => (
                    <MoveDetailCard key={move.moveId} move={move} pokemon={pokemon} showDamage />
                  ))}
                </div>
              </div>
            )}

            {/* Unite Move */}
            <div>
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Unite Move</h3>
              <div className="bg-purple-900/20 border border-purple-700/40 rounded-xl p-4 space-y-2">
                <div className="font-bold text-purple-300 text-sm">{pokemon.uniteMove.name}</div>
                <div className="flex flex-wrap gap-1.5">
                  {pokemon.uniteMove.isDash && <MechanicTag mechanic="dash" />}
                  {pokemon.uniteMove.isAoE && <MechanicTag mechanic="area" />}
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full border text-xs font-medium bg-yellow-900/50 text-yellow-300 border-yellow-700/50">
                    Unstoppable (during use)
                  </span>
                </div>
                {pokemon.uniteMove.description ? (
                  <p className="text-xs text-slate-300">{pokemon.uniteMove.description}</p>
                ) : (
                  <p className="text-xs text-slate-600 italic">
                    Description not yet available. See in-game License Compendium.
                  </p>
                )}
              </div>
            </div>
          </>
        )}

        {/* ── GLOSSARY ─────────────────────────────────────────── */}
        {tab === 'glossary' && (
          <>
            <p className="text-xs text-slate-500 italic">
              All definitions sourced from Bulbapedia (Pokemon Unite) and unite-db.com.
            </p>

            <GlossarySection title="Move Categories" items={MOVE_CATEGORIES} />
            <GlossarySection title="Hindrance Types (Crowd Control)" items={HINDRANCE_TYPES} />
            <GlossarySection title="Status Conditions" items={STATUS_CONDITIONS} />

            <div>
              <h4 className="text-sm font-bold text-slate-300 mb-3 border-b border-[#1e3a6e] pb-2">
                Damage Types
              </h4>
              <div className="space-y-3">
                {['physical', 'special', 'true_damage'].map(id => {
                  const def = MECHANICS_GLOSSARY[id];
                  if (!def) return null;
                  return (
                    <div key={id} className="flex gap-3">
                      <div className="shrink-0 mt-0.5">
                        <span className={`inline-block px-2 py-0.5 rounded-full border text-xs font-medium ${def.color}`}>
                          {def.label}
                        </span>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">{def.fullDescription}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
