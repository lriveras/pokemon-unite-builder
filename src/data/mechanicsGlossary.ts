/**
 * Pokemon Unite Mechanics Glossary
 *
 * Sources:
 *   - Bulbapedia: https://bulbapedia.bulbagarden.net/wiki/Status_condition_(UNITE)
 *   - Bulbapedia: https://bulbapedia.bulbagarden.net/wiki/Move_(UNITE)
 *   - Unite DB FAQ: https://unite-db.com/faq/elementary-mechanics
 *   - Game8: https://game8.co/games/Pokemon-UNITE/archives/335908
 *
 * Keep this file updated when TiMi Studios patches add or change mechanics.
 */

export type MechanicCategory =
  | 'hindrance'     // CC effects inflicted on enemies
  | 'status'        // Positive/negative states on any Pokemon
  | 'moveCategory'  // How a move works spatially/mechanically
  | 'damageType';   // How damage is calculated

export interface MechanicDefinition {
  id: string;
  label: string;
  category: MechanicCategory;
  /** One-line description shown in badge tooltips */
  shortDescription: string;
  /** Full explanation shown in the glossary section */
  fullDescription: string;
  /** Tailwind color class for the badge */
  color: string;
  /** Whether Unstoppable blocks this effect */
  blockedByUnstoppable?: boolean;
  /** Whether Hindrance Resistance converts this to a slow */
  convertedByHindranceResistance?: boolean;
}

export const MECHANICS_GLOSSARY: Record<string, MechanicDefinition> = {

  // ── Move Categories ────────────────────────────────────────────────────────

  melee: {
    id: 'melee',
    label: 'Melee',
    category: 'moveCategory',
    shortDescription: 'Hits targets in front of the user at close range.',
    fullDescription:
      'The move damages opposing Pokémon directly in front of or around the user. Range is short — typically 1–3 body lengths.',
    color: 'bg-orange-900/60 text-orange-300 border-orange-700/50',
  },
  ranged: {
    id: 'ranged',
    label: 'Ranged',
    category: 'moveCategory',
    shortDescription: 'Projectile or beam that travels across a longer distance.',
    fullDescription:
      'The move fires a projectile, beam, or creates an effect at range. Ranged moves generally have longer reach than melee moves and can hit targets before they close the gap.',
    color: 'bg-blue-900/60 text-blue-300 border-blue-700/50',
  },
  dash: {
    id: 'dash',
    label: 'Dash',
    category: 'moveCategory',
    shortDescription: 'User moves rapidly to a target location or direction while attacking.',
    fullDescription:
      'The user dashes to a specific location or in a direction as part of the move. Dash moves can pass through certain obstacles if the endpoint is clear. They often provide both mobility and damage in one action.',
    color: 'bg-yellow-900/60 text-yellow-300 border-yellow-700/50',
  },
  area: {
    id: 'area',
    label: 'Area (AoE)',
    category: 'moveCategory',
    shortDescription: 'Hits all targets within a zone around the user or a point.',
    fullDescription:
      'The move damages or affects all Pokémon within a defined area simultaneously. The exact shape (circle, cone, line) and whether it hits allies or only enemies varies by move. Effects may differ based on distance from the center.',
    color: 'bg-purple-900/60 text-purple-300 border-purple-700/50',
  },
  sure_hit: {
    id: 'sure_hit',
    label: 'Sure Hit',
    category: 'moveCategory',
    shortDescription: 'Locks onto and follows a specific opposing Pokémon.',
    fullDescription:
      'The move targets a particular opposing Pokémon rather than a fixed area. It will track the target\'s movement. Sure Hit moves are affected by Hindrance Resistance but are not blocked by it.',
    color: 'bg-cyan-900/60 text-cyan-300 border-cyan-700/50',
  },
  recovery: {
    id: 'recovery',
    label: 'Recovery',
    category: 'moveCategory',
    shortDescription: 'Restores HP to the user or an ally.',
    fullDescription:
      'The move heals the user or a targeted ally for a set amount of HP. Some recovery moves also grant shields or other beneficial effects.',
    color: 'bg-green-900/60 text-green-300 border-green-700/50',
  },
  buff: {
    id: 'buff',
    label: 'Buff',
    category: 'moveCategory',
    shortDescription: 'Grants a beneficial effect to the user or allies.',
    fullDescription:
      'The move applies a positive status or stat boost to the user or nearby allies, such as increased movement speed, attack power, or damage reduction.',
    color: 'bg-emerald-900/60 text-emerald-300 border-emerald-700/50',
  },
  debuff: {
    id: 'debuff',
    label: 'Debuff',
    category: 'moveCategory',
    shortDescription: 'Reduces the stats or effectiveness of opposing Pokémon.',
    fullDescription:
      'The move lowers the stats (Attack, Defense, etc.) of affected opponents without necessarily inflicting a hindrance status. Debuffs weaken the target\'s overall combat performance.',
    color: 'bg-rose-900/60 text-rose-300 border-rose-700/50',
  },
  hindrance: {
    id: 'hindrance',
    label: 'Hindrance',
    category: 'moveCategory',
    shortDescription: 'Inflicts a crowd-control status condition on opponents.',
    fullDescription:
      'The move inflicts one or more hindrance status conditions on opposing Pokémon, limiting their ability to move, attack, or act. See the individual hindrance types below for details.',
    color: 'bg-red-900/60 text-red-300 border-red-700/50',
  },

  // ── Hindrance Types (CC) ───────────────────────────────────────────────────

  stun: {
    id: 'stun',
    label: 'Stun',
    category: 'hindrance',
    shortDescription: 'Prevents all movement and basic attacks for the duration.',
    fullDescription:
      'The target is fully incapacitated — it cannot move, use basic attacks, or use moves. One of the strongest hindrance types. Blocked by Unstoppable; converted to a slow by Hindrance Resistance.',
    color: 'bg-yellow-800/60 text-yellow-200 border-yellow-600/50',
    blockedByUnstoppable: true,
    convertedByHindranceResistance: true,
  },
  sleep: {
    id: 'sleep',
    label: 'Sleep',
    category: 'hindrance',
    shortDescription: 'Completely immobilizes the target; woken by any damage.',
    fullDescription:
      'The target falls asleep and cannot move or act for the duration, or until it takes any damage. Blocked by Unstoppable; converted to a slow by Hindrance Resistance.',
    color: 'bg-indigo-800/60 text-indigo-200 border-indigo-600/50',
    blockedByUnstoppable: true,
    convertedByHindranceResistance: true,
  },
  freeze: {
    id: 'freeze',
    label: 'Freeze',
    category: 'hindrance',
    shortDescription: 'Prevents movement; target can still use non-dash moves.',
    fullDescription:
      'The target is frozen in place and cannot move or dash. Unlike stun, the frozen target can still use basic attacks and non-dash moves. Blocked by Unstoppable; converted to a slow by Hindrance Resistance.',
    color: 'bg-sky-800/60 text-sky-200 border-sky-600/50',
    blockedByUnstoppable: true,
    convertedByHindranceResistance: true,
  },
  bound: {
    id: 'bound',
    label: 'Bound',
    category: 'hindrance',
    shortDescription: 'Prevents ALL actions. Uniquely bypasses Unstoppable and Hindrance Resistance.',
    fullDescription:
      'Bound prevents every action — movement, attacks, and move usage. It is the only hindrance that cannot be blocked by Unstoppable or converted by Hindrance Resistance, making it uniquely powerful. Very few moves in the game apply Bound.',
    color: 'bg-red-800/60 text-red-200 border-red-600/50',
    blockedByUnstoppable: false,
    convertedByHindranceResistance: false,
  },
  knock: {
    id: 'knock',
    label: 'Knock / Throw',
    category: 'hindrance',
    shortDescription: 'Forcibly displaces the target; target cannot act during the movement.',
    fullDescription:
      'The target is thrown or shoved to a new position against its will. The target cannot act during the displacement. Also called "Throw" or "Shove" in some contexts. Blocked by Unstoppable.',
    color: 'bg-amber-800/60 text-amber-200 border-amber-600/50',
    blockedByUnstoppable: true,
    convertedByHindranceResistance: true,
  },
  knockup: {
    id: 'knockup',
    label: 'Knock Up',
    category: 'hindrance',
    shortDescription: 'Launches the target into the air briefly.',
    fullDescription:
      'The target is launched upward and briefly cannot act. Knock Up typically lasts a short duration but can set up follow-up combos. Blocked by Unstoppable; converted to a slow by Hindrance Resistance.',
    color: 'bg-amber-800/60 text-amber-200 border-amber-600/50',
    blockedByUnstoppable: true,
    convertedByHindranceResistance: true,
  },
  pull: {
    id: 'pull',
    label: 'Pull',
    category: 'hindrance',
    shortDescription: 'Draws the target toward a point.',
    fullDescription:
      'The target is pulled toward the user or a specific point, repositioning them involuntarily. Often used to pull enemies into AoE zones or away from allies. Blocked by Unstoppable.',
    color: 'bg-violet-800/60 text-violet-200 border-violet-600/50',
    blockedByUnstoppable: true,
    convertedByHindranceResistance: true,
  },
  root: {
    id: 'root',
    label: 'Root / Immobilize',
    category: 'hindrance',
    shortDescription: 'Prevents movement but the target can still attack and use non-dash moves.',
    fullDescription:
      'The target is rooted in place and cannot move or dash. Unlike Stun or Freeze, a rooted Pokémon can still use basic attacks and non-dash moves. Blocked by Unstoppable; converted to a slow by Hindrance Resistance.',
    color: 'bg-lime-800/60 text-lime-200 border-lime-600/50',
    blockedByUnstoppable: true,
    convertedByHindranceResistance: true,
  },
  suppress: {
    id: 'suppress',
    label: 'Suppress',
    category: 'hindrance',
    shortDescription: 'Holds the target in place and prevents all actions.',
    fullDescription:
      'Similar to Stun, Suppress fully incapacitates the target. It is often associated with grab or channel moves where the user also cannot act freely. Blocked by Unstoppable.',
    color: 'bg-fuchsia-800/60 text-fuchsia-200 border-fuchsia-600/50',
    blockedByUnstoppable: true,
    convertedByHindranceResistance: true,
  },
  slow: {
    id: 'slow',
    label: 'Slow',
    category: 'hindrance',
    shortDescription: 'Reduces the target\'s movement speed.',
    fullDescription:
      'The target\'s movement speed is reduced for the duration. The slowest and most common hindrance type — many moves apply a slow as a secondary effect. Blocked by Unstoppable.',
    color: 'bg-teal-800/60 text-teal-200 border-teal-600/50',
    blockedByUnstoppable: true,
    convertedByHindranceResistance: false, // it already IS a slow
  },
  vision_obscured: {
    id: 'vision_obscured',
    label: 'Vision Obscured',
    category: 'hindrance',
    shortDescription: 'Darkens the target\'s screen, limiting their field of view.',
    fullDescription:
      'The affected Pokémon\'s vision is obscured, making it very hard to see what is around them. Blocked by both Unstoppable and Invincible.',
    color: 'bg-gray-800/60 text-gray-300 border-gray-600/50',
    blockedByUnstoppable: true,
  },
  burn: {
    id: 'burn',
    label: 'Burn',
    category: 'hindrance',
    shortDescription: 'Deals damage over time. Damage type matches the attacker\'s style.',
    fullDescription:
      'The target takes periodic damage over the duration of the burn. The damage is physical or special depending on the attacker\'s damage type. Burn does less damage per tick than Poison.',
    color: 'bg-red-900/60 text-red-300 border-red-700/50',
  },
  poison: {
    id: 'poison',
    label: 'Poison',
    category: 'hindrance',
    shortDescription: 'Deals damage over time — more damage per tick than Burn.',
    fullDescription:
      'The target takes periodic damage over the duration. Poison deals more total damage per application than Burn.',
    color: 'bg-purple-900/60 text-purple-300 border-purple-700/50',
  },

  // ── Status Conditions ──────────────────────────────────────────────────────

  unstoppable: {
    id: 'unstoppable',
    label: 'Unstoppable',
    category: 'status',
    shortDescription: 'Immune to all hindrances except Bound.',
    fullDescription:
      'While Unstoppable, a Pokémon is immune to all hindrance effects (stun, sleep, freeze, slow, knock, pull, root, etc.) and cannot have its vision obscured or movement speed reduced by hindrances. The only exception is Bound, which bypasses Unstoppable. Unstoppable is often granted during a move\'s active frames (e.g., dashes and unite moves).',
    color: 'bg-yellow-700/60 text-yellow-200 border-yellow-500/50',
  },
  hindrance_resistance: {
    id: 'hindrance_resistance',
    label: 'Hindrance Resistance',
    category: 'status',
    shortDescription: 'Converts all hindrances into movement speed reductions instead.',
    fullDescription:
      'When a Pokémon has Hindrance Resistance, any hindrance applied to it is converted into a movement speed reduction for the same duration instead of the original effect. This allows the Pokémon to keep acting even when opponents try to CC it. Bound bypasses Hindrance Resistance.',
    color: 'bg-amber-700/60 text-amber-200 border-amber-500/50',
  },
  invincible: {
    id: 'invincible',
    label: 'Invincible',
    category: 'status',
    shortDescription: 'Cannot take damage. Also blocks Vision Obscured.',
    fullDescription:
      'An Invincible Pokémon cannot take damage from any source for the duration. It also blocks Vision Obscured. Note: Invincible is different from Unstoppable — an Invincible Pokémon can still be affected by hindrances unless it also has Unstoppable.',
    color: 'bg-cyan-700/60 text-cyan-200 border-cyan-500/50',
  },
  shielded: {
    id: 'shielded',
    label: 'Shield',
    category: 'status',
    shortDescription: 'Absorbs incoming damage before HP is affected.',
    fullDescription:
      'A shield grants a buffer of hit points that absorbs damage before the Pokémon\'s actual HP is reduced. Once the shield is depleted, remaining damage is applied to HP normally. Shields do not stack with each other by default.',
    color: 'bg-blue-700/60 text-blue-200 border-blue-500/50',
  },

  // ── Damage Types ───────────────────────────────────────────────────────────

  physical: {
    id: 'physical',
    label: 'Physical',
    category: 'damageType',
    shortDescription: 'Uses the attacker\'s Attack stat vs the defender\'s Defense.',
    fullDescription:
      'Physical damage scales with the attacker\'s Attack (Atk) stat and is reduced by the target\'s Defense (Def) stat. Formula base value: 600 / (400 + Def) × Atk × move coefficient. Physical Pokémon typically deal damage with punches, slashes, and body contact.',
    color: 'bg-orange-900/60 text-orange-300 border-orange-700/50',
  },
  special: {
    id: 'special',
    label: 'Special',
    category: 'damageType',
    shortDescription: 'Uses the attacker\'s Sp. Atk stat vs the defender\'s Sp. Def.',
    fullDescription:
      'Special damage scales with the attacker\'s Special Attack (Sp. Atk) stat and is reduced by the target\'s Special Defense (Sp. Def) stat. Uses the same formula structure as Physical but with Sp. Atk and Sp. Def values. Special Pokémon typically use energy, elemental, or projectile-based attacks.',
    color: 'bg-purple-900/60 text-purple-300 border-purple-700/50',
  },
  true_damage: {
    id: 'true_damage',
    label: 'True Damage',
    category: 'damageType',
    shortDescription: 'Bypasses all Defense and Sp. Def — deals full damage always.',
    fullDescription:
      'True damage ignores the defender\'s Defense and Special Defense stats entirely. It always deals its full listed value regardless of how tanky the target is. Some unite moves and specific move effects deal true damage.',
    color: 'bg-red-700/60 text-red-200 border-red-500/50',
  },
};

/** Ordered list of all hindrance types for display */
export const HINDRANCE_TYPES = Object.values(MECHANICS_GLOSSARY).filter(
  m => m.category === 'hindrance'
);

/** Ordered list of all status conditions for display */
export const STATUS_CONDITIONS = Object.values(MECHANICS_GLOSSARY).filter(
  m => m.category === 'status'
);

/** Ordered list of all move categories for display */
export const MOVE_CATEGORIES = Object.values(MECHANICS_GLOSSARY).filter(
  m => m.category === 'moveCategory'
);
