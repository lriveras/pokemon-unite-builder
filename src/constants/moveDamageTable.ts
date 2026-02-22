export interface MoveDamageEntry {
  moveId: string;
  baseCoefficient: number;
  scalingStat: 'atk' | 'sp_atk';
  scalingLevelMultiplier: number;
  upgradeMultiplier: number;
  isBurst: boolean;
  hitCount: number;
  cooldown: number;
}

// Static curated damage table for select moves
// baseCoefficient: multiplier against primary stat (1.0 = 100% of stat)
export const MOVE_DAMAGE_TABLE: Record<string, MoveDamageEntry> = {
  // Blastoise
  'hydro_pump': { moveId: 'hydro_pump', baseCoefficient: 2.1, scalingStat: 'sp_atk', scalingLevelMultiplier: 0.08, upgradeMultiplier: 1.15, isBurst: true, hitCount: 1, cooldown: 6 },
  'surf': { moveId: 'surf', baseCoefficient: 1.3, scalingStat: 'sp_atk', scalingLevelMultiplier: 0.07, upgradeMultiplier: 1.12, isBurst: false, hitCount: 3, cooldown: 7 },
  'water_spout': { moveId: 'water_spout', baseCoefficient: 0.8, scalingStat: 'sp_atk', scalingLevelMultiplier: 0.06, upgradeMultiplier: 1.1, isBurst: false, hitCount: 5, cooldown: 8 },

  // Pikachu / Raichu / Thunderstrike
  'thunder': { moveId: 'thunder', baseCoefficient: 2.5, scalingStat: 'sp_atk', scalingLevelMultiplier: 0.09, upgradeMultiplier: 1.2, isBurst: true, hitCount: 1, cooldown: 7 },
  'thunderbolt': { moveId: 'thunderbolt', baseCoefficient: 1.8, scalingStat: 'sp_atk', scalingLevelMultiplier: 0.08, upgradeMultiplier: 1.15, isBurst: true, hitCount: 1, cooldown: 5 },
  'volt_tackle': { moveId: 'volt_tackle', baseCoefficient: 3.0, scalingStat: 'atk', scalingLevelMultiplier: 0.10, upgradeMultiplier: 1.2, isBurst: true, hitCount: 1, cooldown: 10 },

  // Charizard
  'fire_punch': { moveId: 'fire_punch', baseCoefficient: 1.4, scalingStat: 'atk', scalingLevelMultiplier: 0.07, upgradeMultiplier: 1.12, isBurst: false, hitCount: 1, cooldown: 5 },
  'flamethrower': { moveId: 'flamethrower', baseCoefficient: 1.6, scalingStat: 'sp_atk', scalingLevelMultiplier: 0.08, upgradeMultiplier: 1.15, isBurst: false, hitCount: 4, cooldown: 6 },
  'fire_spin': { moveId: 'fire_spin', baseCoefficient: 0.7, scalingStat: 'sp_atk', scalingLevelMultiplier: 0.06, upgradeMultiplier: 1.1, isBurst: false, hitCount: 6, cooldown: 7 },
  'dragon_claw': { moveId: 'dragon_claw', baseCoefficient: 1.5, scalingStat: 'atk', scalingLevelMultiplier: 0.07, upgradeMultiplier: 1.12, isBurst: false, hitCount: 3, cooldown: 5 },

  // Machamp
  'dynamic_punch': { moveId: 'dynamic_punch', baseCoefficient: 1.8, scalingStat: 'atk', scalingLevelMultiplier: 0.08, upgradeMultiplier: 1.15, isBurst: true, hitCount: 1, cooldown: 7 },
  'cross_chop': { moveId: 'cross_chop', baseCoefficient: 2.2, scalingStat: 'atk', scalingLevelMultiplier: 0.09, upgradeMultiplier: 1.2, isBurst: true, hitCount: 2, cooldown: 6 },
  'submission': { moveId: 'submission', baseCoefficient: 1.6, scalingStat: 'atk', scalingLevelMultiplier: 0.07, upgradeMultiplier: 1.12, isBurst: false, hitCount: 1, cooldown: 8 },

  // Gengar
  'shadow_ball': { moveId: 'shadow_ball', baseCoefficient: 2.0, scalingStat: 'sp_atk', scalingLevelMultiplier: 0.09, upgradeMultiplier: 1.18, isBurst: true, hitCount: 1, cooldown: 5 },
  'hex': { moveId: 'hex', baseCoefficient: 1.4, scalingStat: 'sp_atk', scalingLevelMultiplier: 0.07, upgradeMultiplier: 1.12, isBurst: false, hitCount: 3, cooldown: 6 },
  'sludge_bomb': { moveId: 'sludge_bomb', baseCoefficient: 1.2, scalingStat: 'sp_atk', scalingLevelMultiplier: 0.06, upgradeMultiplier: 1.1, isBurst: false, hitCount: 4, cooldown: 8 },
  'will_o_wisp': { moveId: 'will_o_wisp', baseCoefficient: 0.5, scalingStat: 'sp_atk', scalingLevelMultiplier: 0.04, upgradeMultiplier: 1.08, isBurst: false, hitCount: 6, cooldown: 9 },

  // Lucario
  'aura_cannon': { moveId: 'aura_cannon', baseCoefficient: 2.3, scalingStat: 'atk', scalingLevelMultiplier: 0.09, upgradeMultiplier: 1.18, isBurst: true, hitCount: 1, cooldown: 6 },
  'bone_rush': { moveId: 'bone_rush', baseCoefficient: 1.0, scalingStat: 'atk', scalingLevelMultiplier: 0.06, upgradeMultiplier: 1.1, isBurst: false, hitCount: 5, cooldown: 7 },
  'extreme_speed': { moveId: 'extreme_speed', baseCoefficient: 1.5, scalingStat: 'atk', scalingLevelMultiplier: 0.07, upgradeMultiplier: 1.12, isBurst: true, hitCount: 1, cooldown: 5 },
  'close_combat': { moveId: 'close_combat', baseCoefficient: 1.9, scalingStat: 'atk', scalingLevelMultiplier: 0.08, upgradeMultiplier: 1.15, isBurst: false, hitCount: 3, cooldown: 8 },

  // Sylveon
  'hyper_voice': { moveId: 'hyper_voice', baseCoefficient: 1.5, scalingStat: 'sp_atk', scalingLevelMultiplier: 0.08, upgradeMultiplier: 1.15, isBurst: false, hitCount: 5, cooldown: 6 },
  'mystical_fire': { moveId: 'mystical_fire', baseCoefficient: 1.2, scalingStat: 'sp_atk', scalingLevelMultiplier: 0.07, upgradeMultiplier: 1.12, isBurst: false, hitCount: 4, cooldown: 7 },
  'psyshock': { moveId: 'psyshock', baseCoefficient: 1.8, scalingStat: 'sp_atk', scalingLevelMultiplier: 0.08, upgradeMultiplier: 1.15, isBurst: true, hitCount: 1, cooldown: 5 },
  'draining_kiss': { moveId: 'draining_kiss', baseCoefficient: 1.0, scalingStat: 'sp_atk', scalingLevelMultiplier: 0.06, upgradeMultiplier: 1.1, isBurst: false, hitCount: 3, cooldown: 8 },

  // Umbreon
  'snarl': { moveId: 'snarl', baseCoefficient: 1.0, scalingStat: 'atk', scalingLevelMultiplier: 0.05, upgradeMultiplier: 1.1, isBurst: false, hitCount: 3, cooldown: 7 },
  'mean_look': { moveId: 'mean_look', baseCoefficient: 0.5, scalingStat: 'atk', scalingLevelMultiplier: 0.04, upgradeMultiplier: 1.08, isBurst: false, hitCount: 1, cooldown: 10 },

  // Basic attacks (approximate coefficients)
  'basic_physical': { moveId: 'basic_physical', baseCoefficient: 1.0, scalingStat: 'atk', scalingLevelMultiplier: 0.05, upgradeMultiplier: 1.0, isBurst: false, hitCount: 1, cooldown: 0.5 },
  'basic_special': { moveId: 'basic_special', baseCoefficient: 1.0, scalingStat: 'sp_atk', scalingLevelMultiplier: 0.05, upgradeMultiplier: 1.0, isBurst: false, hitCount: 1, cooldown: 0.5 },
  'basic_boosted_physical': { moveId: 'basic_boosted_physical', baseCoefficient: 1.8, scalingStat: 'atk', scalingLevelMultiplier: 0.06, upgradeMultiplier: 1.0, isBurst: true, hitCount: 1, cooldown: 0 },
  'basic_boosted_special': { moveId: 'basic_boosted_special', baseCoefficient: 1.8, scalingStat: 'sp_atk', scalingLevelMultiplier: 0.06, upgradeMultiplier: 1.0, isBurst: true, hitCount: 1, cooldown: 0 },
};

// Known Mega Pokemon (2 held item slots instead of 3)
export const MEGA_POKEMON_IDS = new Set<string>([
  'mewtwo',
  'mewtwo_y',
  'mewtwo_x',
]);
