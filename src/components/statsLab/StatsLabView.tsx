import { useState, useMemo } from 'react';
import { useTeamStore } from '../../store/useTeamStore';
import { useDamageCalc } from '../../hooks/useDamageCalc';
import { computeHiddenStats } from '../../engine/hiddenStatsEngine';
import { DamageBreakdownPanel } from './DamageBreakdownPanel';
import { HiddenStatsPanel } from './HiddenStatsPanel';
import { RoleBadge } from '../common/RoleBadge';

export function StatsLabView() {
  const { slots } = useTeamStore();
  const [activeSlot, setActiveSlot] = useState(0);
  const [activeTab, setActiveTab] = useState<'damage' | 'hidden'>('damage');

  const slot = slots[activeSlot];
  const damageResult = useDamageCalc(activeSlot);

  const hiddenStats = useMemo(() => {
    if (!slot.pokemon) return null;
    return computeHiddenStats(slot.pokemon, slot.config.pokemonLevel, slot.config.heldItems, slot.config.itemGrades);
  }, [slot.pokemon, slot.config.pokemonLevel, slot.config.heldItems, slot.config.itemGrades]);

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-white mb-6" style={{ fontFamily: 'Rajdhani, sans-serif' }}>Stats Lab</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Slot selector */}
        <div className="bg-[#16213e] border border-[#0f3460] rounded-xl p-4">
          <h2 className="text-sm font-bold text-slate-300 mb-3">Select Pokémon Slot</h2>
          <div className="space-y-2">
            {slots.map((slot, i) => (
              <button
                key={i}
                onClick={() => setActiveSlot(i)}
                className={`w-full flex items-center gap-3 p-3 rounded-xl border text-left transition-all ${
                  activeSlot === i
                    ? 'border-purple-500 bg-purple-500/10'
                    : 'border-[#0f3460] bg-[#1a1a2e] hover:border-purple-500/40'
                }`}
              >
                {slot.pokemon ? (
                  <>
                    <img src={slot.pokemon.spriteUrl} alt={slot.pokemon.name} width={40} height={40} className="rounded-lg bg-slate-700/30" onError={e => {(e.target as HTMLImageElement).style.display='none';}} />
                    <div>
                      <div className="font-semibold text-white text-sm">{slot.pokemon.name}</div>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <RoleBadge role={slot.pokemon.role} size="sm" />
                        <span className="text-xs text-slate-500">Lv.{slot.config.pokemonLevel}</span>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="text-slate-500 text-sm">Slot {i + 1} — Empty</div>
                )}
              </button>
            ))}
          </div>

          {slot.pokemon && (
            <div className="mt-4 space-y-3">
              <div>
                <label className="text-xs text-slate-500 block mb-1">
                  Level: <span className="text-white font-bold">{slot.config.pokemonLevel}</span>
                </label>
                <div className="text-xs text-slate-500 mt-1">
                  Configure levels and items in the Team Builder
                </div>
              </div>
              {slot.pokemon && (
                <div className="text-xs text-slate-500 space-y-1">
                  <div>HP: <span className="text-white">{slot.pokemon.statsProgression[slot.config.pokemonLevel-1]?.hp.toLocaleString()}</span></div>
                  <div>Atk: <span className="text-white">{slot.pokemon.statsProgression[slot.config.pokemonLevel-1]?.atk.toLocaleString()}</span></div>
                  <div>Sp.Atk: <span className="text-white">{slot.pokemon.statsProgression[slot.config.pokemonLevel-1]?.sp_atk.toLocaleString()}</span></div>
                  <div>Def: <span className="text-white">{slot.pokemon.statsProgression[slot.config.pokemonLevel-1]?.def.toLocaleString()}</span></div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Main Panel */}
        <div className="lg:col-span-2 bg-[#16213e] border border-[#0f3460] rounded-xl">
          {/* Tabs */}
          <div className="flex border-b border-[#0f3460]">
            <button
              onClick={() => setActiveTab('damage')}
              className={`flex-1 py-3 text-sm font-medium transition-colors ${activeTab === 'damage' ? 'text-white border-b-2 border-purple-500' : 'text-slate-500 hover:text-slate-300'}`}
            >
              Damage Calculator
            </button>
            <button
              onClick={() => setActiveTab('hidden')}
              className={`flex-1 py-3 text-sm font-medium transition-colors ${activeTab === 'hidden' ? 'text-white border-b-2 border-purple-500' : 'text-slate-500 hover:text-slate-300'}`}
            >
              Hidden Stats
            </button>
          </div>
          <div className="p-5">
            {activeTab === 'damage' ? (
              <DamageBreakdownPanel result={damageResult} />
            ) : (
              <HiddenStatsPanel stats={hiddenStats} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
