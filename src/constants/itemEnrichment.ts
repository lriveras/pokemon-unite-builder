export interface ItemEnrichment {
  description: string;
  recommendedFor: string[];
  passive?: string;
  category: 'offense' | 'defense' | 'support' | 'mobility';
}

export const HELD_ITEM_ENRICHMENT: Record<string, ItemEnrichment> = {
  'muscle_band': {
    description: 'Increases basic attack speed and deals bonus damage proportional to the target\'s remaining HP.',
    recommendedFor: ['attacker', 'speedster', 'all-rounder'],
    passive: 'Basic attacks deal additional damage equal to 3% of target\'s current HP',
    category: 'offense',
  },
  'scope_lens': {
    description: 'Increases the damage of critical hits and slightly increases critical-hit rate.',
    recommendedFor: ['attacker', 'speedster'],
    passive: 'Critical hits deal 15% more damage',
    category: 'offense',
  },
  'wise_glasses': {
    description: 'Increases Sp. Attack and provides a passive bonus to move damage.',
    recommendedFor: ['attacker'],
    passive: 'Increases Sp. Atk by 3% when activated',
    category: 'offense',
  },
  'sp_amp': {
    description: 'Boosts Sp. Attack and amplifies the power of special moves.',
    recommendedFor: ['attacker'],
    category: 'offense',
  },
  'energy_amplifier': {
    description: 'Charges your Unite Move faster and deals bonus damage after using it.',
    recommendedFor: ['attacker', 'all-rounder'],
    passive: 'Boosts damage for 4s after Unite Move use',
    category: 'offense',
  },
  'focus_band': {
    description: 'Provides HP regeneration when HP drops below 20%. Critical survivability item.',
    recommendedFor: ['all-rounder', 'speedster', 'attacker'],
    passive: 'Recover 14% HP over 3s when HP drops below 20%',
    category: 'defense',
  },
  'rocky_helmet': {
    description: 'When damaged, deals percentage-based damage back to the attacker.',
    recommendedFor: ['defender', 'all-rounder'],
    passive: 'Reflects HP% damage when hit',
    category: 'defense',
  },
  'assault_vest': {
    description: 'Provides a Sp. Def shield when out of combat.',
    recommendedFor: ['defender', 'all-rounder'],
    passive: 'Grants a Sp. Def shield when not taking damage',
    category: 'defense',
  },
  'leftovers': {
    description: 'Gradually restores HP when not in combat. Excellent sustain item.',
    recommendedFor: ['defender', 'supporter', 'all-rounder'],
    passive: 'Restore 1% max HP per second out of combat',
    category: 'support',
  },
  'exp_share': {
    description: 'Grants bonus XP to the ally with the least XP on your team.',
    recommendedFor: ['supporter', 'defender'],
    passive: 'Team-wide XP distribution to lowest ally',
    category: 'support',
  },
  'shell_bell': {
    description: 'Restores HP based on Sp. Attack. Great sustain for special attackers.',
    recommendedFor: ['attacker', 'supporter'],
    passive: 'Recover HP proportional to Sp. Atk on hit',
    category: 'support',
  },
  'buddy_barrier': {
    description: 'After using your Unite Move, you and the nearby ally with the lowest HP receive a shield.',
    recommendedFor: ['defender', 'supporter', 'all-rounder'],
    passive: 'Shield self and lowest HP ally after Unite Move',
    category: 'support',
  },
  'score_shield': {
    description: 'Provides a shield while you are scoring goals, protecting you from interruption.',
    recommendedFor: ['speedster', 'all-rounder'],
    passive: 'Shield while scoring goals',
    category: 'support',
  },
  'float_stone': {
    description: 'Increases movement speed significantly when not in combat.',
    recommendedFor: ['speedster', 'all-rounder'],
    passive: '+10% move speed out of combat',
    category: 'mobility',
  },
  'rapid_strike_band': {
    description: 'Reduces cooldowns on third consecutive hit with basic attacks.',
    recommendedFor: ['attacker', 'all-rounder'],
    passive: 'Reduce cooldowns on 3rd hit streak',
    category: 'offense',
  },
  'weakness_policy': {
    description: 'When you take damage, your Attack stat is increased for a short time.',
    recommendedFor: ['attacker', 'all-rounder'],
    passive: '+Atk when taking damage',
    category: 'offense',
  },
};

export const BATTLE_ITEM_ENRICHMENT: Record<string, { description: string; category: 'combat' | 'mobility' | 'support' | 'recovery' }> = {
  'x_attack': {
    description: 'Temporarily increases your Atk and Sp. Atk by 30%. Best on high-damage attackers.',
    category: 'combat',
  },
  'x_speed': {
    description: 'Temporarily increases movement speed. Great for escaping or chasing.',
    category: 'mobility',
  },
  'eject_button': {
    description: 'Quickly teleports you in a direction. Escape tool or positioning tool.',
    category: 'mobility',
  },
  'full_heal': {
    description: 'Removes all status conditions and makes you immune briefly.',
    category: 'support',
  },
  'fluffy_tail': {
    description: 'Stuns wild Pokemon and makes them take more damage. Great for jungling.',
    category: 'combat',
  },
  'goal_getter': {
    description: 'Doubles goal-scoring speed. Best for scoring-focused Pokemon.',
    category: 'support',
  },
  'slow_smoke': {
    description: 'Creates a smokescreen that slows enemies. Good for team fights.',
    category: 'combat',
  },
  'potion': {
    description: 'Restores a moderate amount of HP. Simple sustain option.',
    category: 'recovery',
  },
  'max_potion': {
    description: 'Fully restores HP. Situational but powerful.',
    category: 'recovery',
  },
};
