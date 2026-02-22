import { TeamSlot } from '../../types/team';
import { useTeamStore } from '../../store/useTeamStore';
import { MoveSelector } from './MoveSelector';
import { HeldItemSelector } from './HeldItemSelector';
import { BattleItemSelector } from './BattleItemSelector';
import { RoleBadge } from '../common/RoleBadge';
import { TierBadge } from '../common/TierBadge';
import { ScoreBar } from '../common/ScoreBar';

const DIMENSION_LABELS = [
  { key: 'damageOutput', label: 'Damage' },
  { key: 'durability', label: 'Durability' },
  { key: 'crowdControl', label: 'CC' },
  { key: 'mobility', label: 'Mobility' },
  { key: 'sustain', label: 'Sustain' },
  { key: 'objectiveThreat', label: 'Objective' },
] as const;

interface Props {
  slot: TeamSlot;
}

export function SlotConfigPanel({ slot }: Props) {
  const { setSlot1Choice, setSlot2Choice, setHeldItem, setBattleItem, setItemGrade, setPokemonLevel } = useTeamStore();
  const pokemon = slot.pokemon;

  if (!pokemon) {
    return (
      <div className="p-6 text-center text-slate-500">
        <div className="text-4xl mb-3">⊕</div>
        <p>Select a Pokémon for this slot to configure it</p>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-5">
      {/* Header */}
      <div className="flex items-center gap-3">
        <img
          src={pokemon.spriteUrl}
          alt={pokemon.name}
          width={64}
          height={64}
          className="rounded-lg bg-slate-700/30 object-contain"
          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
        />
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-lg font-bold text-white" style={{ fontFamily: 'Rajdhani, sans-serif' }}>{pokemon.name}</h3>
            <TierBadge tier={pokemon.tier} />
          </div>
          <div className="flex items-center gap-2">
            <RoleBadge role={pokemon.role} />
            <span className="text-xs text-slate-500 capitalize">{pokemon.attackStyle} • {pokemon.damageType}</span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5 capitalize">Difficulty: {pokemon.difficulty}</p>
        </div>
      </div>

      {/* Level Slider */}
      <div>
        <label className="text-xs text-slate-500 block mb-1">
          Level: <span className="text-white font-semibold">{slot.config.pokemonLevel}</span>
        </label>
        <input
          type="range"
          min={1}
          max={15}
          value={slot.config.pokemonLevel}
          onChange={e => setPokemonLevel(slot.slotIndex, Number(e.target.value))}
          className="w-full h-2 accent-purple-500"
        />
        <div className="flex justify-between text-[10px] text-slate-600 mt-0.5">
          <span>1</span><span>5</span><span>10</span><span>15</span>
        </div>
      </div>

      {/* Moves */}
      {pokemon.slot1.options.length > 0 && (
        <MoveSelector
          slot={pokemon.slot1}
          selected={slot.config.slot1Choice}
          onSelect={m => setSlot1Choice(slot.slotIndex, m)}
          label="Move Slot 1"
        />
      )}
      {pokemon.slot2.options.length > 0 && (
        <MoveSelector
          slot={pokemon.slot2}
          selected={slot.config.slot2Choice}
          onSelect={m => setSlot2Choice(slot.slotIndex, m)}
          label="Move Slot 2"
        />
      )}

      {/* Unite Move */}
      <div>
        <label className="text-xs text-slate-500 block mb-1">Unite Move</label>
        <div className="px-3 py-2 rounded-lg bg-purple-900/20 border border-purple-800/40 text-sm text-purple-300 font-medium">
          {pokemon.uniteMove.name}
        </div>
      </div>

      {/* Held Items */}
      <HeldItemSelector
        heldItems={slot.config.heldItems}
        itemGrades={slot.config.itemGrades}
        maxSlots={pokemon.maxHeldItems}
        onSetItem={(i, item) => setHeldItem(slot.slotIndex, i, item)}
        onSetGrade={(i, grade) => setItemGrade(slot.slotIndex, i, grade)}
      />

      {/* Battle Item */}
      <BattleItemSelector
        battleItem={slot.config.battleItem}
        onSetItem={item => setBattleItem(slot.slotIndex, item)}
      />

      {/* Individual Scores */}
      <div>
        <label className="text-xs text-slate-500 block mb-2">Dimension Scores</label>
        <div className="space-y-1.5">
          {DIMENSION_LABELS.map(({ key, label }) => (
            <ScoreBar key={key} label={label} score={pokemon.dimensionScores[key]} />
          ))}
        </div>
      </div>
    </div>
  );
}
