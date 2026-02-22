import { MoveOption, Pokemon } from '../../types/pokemon';
import { MechanicTag } from './MechanicTag';
import { MECHANICS_GLOSSARY } from '../../data/mechanicsGlossary';
import { MOVE_DAMAGE_TABLE } from '../../constants/moveDamageTable';
import { CC_MOVE_MAP } from '../../constants/ccMoveMap';

interface Props {
  move: MoveOption;
  pokemon: Pokemon;
  /** If true, show a condensed level-damage table (levels 5,7,9,11,13,15) */
  showDamage?: boolean;
}

const KEY_LEVELS = [5, 7, 9, 11, 13, 15];

function estimateDamage(move: MoveOption, pokemon: Pokemon, level: number): number | null {
  const entry = MOVE_DAMAGE_TABLE[move.moveId];
  const statsAtLevel = pokemon.statsProgression[Math.min(level - 1, 14)];
  if (!statsAtLevel) return null;

  if (entry) {
    const statVal = entry.scalingStat === 'atk' ? statsAtLevel.atk : statsAtLevel.sp_atk;
    return Math.round(
      entry.baseCoefficient *
        statVal *
        (1 + (level - 1) * entry.scalingLevelMultiplier) *
        entry.hitCount
    );
  }
  // Generic estimate if no table entry
  const statVal = move.damageType === 'sp_atk' ? statsAtLevel.sp_atk : statsAtLevel.atk;
  return Math.round(statVal * 1.5 * (1 + (level - 1) * 0.07));
}

function hasDamageData(moveId: string): boolean {
  return moveId in MOVE_DAMAGE_TABLE;
}

export function MoveDetailCard({ move, pokemon, showDamage = true }: Props) {
  const ccEntry = CC_MOVE_MAP[move.moveId];
  const dmgEntry = MOVE_DAMAGE_TABLE[move.moveId];
  const isEstimated = !hasDamageData(move.moveId);

  // Build the set of mechanic tags to display
  const tags: string[] = [];

  // Move categories from pvpoke
  move.categories.forEach(cat => {
    if (MECHANICS_GLOSSARY[cat]) tags.push(cat);
  });

  // Derived boolean flags
  if (move.isDash && !tags.includes('dash')) tags.push('dash');
  if (move.isHeal && !tags.includes('recovery')) tags.push('recovery');
  if (move.isShield) tags.push('shielded');
  if (move.isBurst) tags.push('area');

  // CC type
  const ccTag = move.ccType ?? ccEntry?.ccType;

  return (
    <div className="rounded-xl border border-[#1e3a6e] bg-[#0d1b35] p-4 space-y-3">
      {/* Header */}
      <div className="flex items-start justify-between gap-2 flex-wrap">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-bold text-white text-sm">{move.name}</span>
            {move.isUpgrade && (
              <span className="text-xs px-1.5 py-0.5 rounded bg-purple-800/50 text-purple-300 border border-purple-600/30">
                Upgraded
              </span>
            )}
          </div>
          <div className="text-xs text-slate-500 mt-0.5">
            {move.damageType === 'sp_atk' ? 'Special' : 'Physical'} ·{' '}
            {move.cooldown > 0 ? `${move.cooldown}s cooldown` : 'No cooldown'}
            {dmgEntry && dmgEntry.hitCount > 1 && ` · ${dmgEntry.hitCount} hits`}
          </div>
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5">
        {tags.map(tag => (
          <MechanicTag key={tag} mechanic={tag} />
        ))}
        {ccTag && (
          <MechanicTag
            mechanic={ccTag}
            override={
              ccEntry
                ? {
                    label: `${MECHANICS_GLOSSARY[ccTag]?.label ?? ccTag} (${ccEntry.duration}s)`,
                  }
                : undefined
            }
          />
        )}
        {/* Damage type */}
        <MechanicTag mechanic={move.damageType === 'sp_atk' ? 'special' : 'physical'} />
      </div>

      {/* Description */}
      {move.description ? (
        <p className="text-xs text-slate-300 leading-relaxed">{move.description}</p>
      ) : (
        <p className="text-xs text-slate-600 italic">
          Description not yet available. See in-game License Compendium or{' '}
          <span className="text-slate-500">Bulbapedia (Unite)</span> for full details.
        </p>
      )}

      {/* Damage at key levels */}
      {showDamage && (
        <div>
          <div className="flex items-center gap-1 mb-1.5">
            <span className="text-xs font-semibold text-slate-400">Damage estimate by level</span>
            {isEstimated && (
              <span className="text-xs text-amber-500/80 italic">(approx.)</span>
            )}
          </div>
          <div className="grid grid-cols-6 gap-1">
            {KEY_LEVELS.map(lvl => {
              const dmg = estimateDamage(move, pokemon, lvl);
              return (
                <div
                  key={lvl}
                  className="flex flex-col items-center bg-[#16213e] rounded-lg py-1.5 px-1"
                >
                  <span className="text-xs text-slate-500">Lv{lvl}</span>
                  <span className="text-xs font-bold text-white">
                    {dmg !== null ? dmg.toLocaleString() : '—'}
                  </span>
                </div>
              );
            })}
          </div>
          {isEstimated && (
            <p className="text-xs text-slate-600 mt-1 italic">
              No verified coefficient — shown estimate uses 1.5× primary stat. See DATA_SOURCES.md to add exact values.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
