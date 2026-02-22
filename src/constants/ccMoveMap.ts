import { CCType } from '../types/pokemon';

export interface CCMoveEntry {
  ccType: CCType;
  duration: number; // seconds
  quality: number;  // 0–1, higher = better (stun=1.0, slow=0.5, etc.)
}

// Curated CC move lookup table (~50 entries)
// Keys are moveId strings from pvpoke data
export const CC_MOVE_MAP: Record<string, CCMoveEntry> = {
  // Blastoise
  'water_spout': { ccType: 'slow', duration: 1.5, quality: 0.5 },
  'surf': { ccType: 'slow', duration: 1.0, quality: 0.5 },
  'rapid_spin': { ccType: 'slow', duration: 0.5, quality: 0.4 },
  'hydro_pump': { ccType: 'knockup', duration: 0.5, quality: 0.75 },
  'skull_bash': { ccType: 'stun', duration: 1.0, quality: 1.0 },
  'blizzard': { ccType: 'freeze', duration: 1.5, quality: 0.9 },

  // Snorlax
  'block': { ccType: 'root', duration: 2.0, quality: 0.8 },
  'heavy_slam': { ccType: 'stun', duration: 1.5, quality: 1.0 },
  'tackle': { ccType: 'knockup', duration: 0.5, quality: 0.75 },
  'flail': { ccType: 'knockup', duration: 0.75, quality: 0.75 },
  'yawn': { ccType: 'sleep', duration: 2.0, quality: 0.85 },

  // Slowbro
  'amnesia': { ccType: 'slow', duration: 2.0, quality: 0.5 },
  'scald': { ccType: 'slow', duration: 1.5, quality: 0.5 },
  'telekinesis': { ccType: 'suppress', duration: 2.5, quality: 0.95 },
  'surf_slowbro': { ccType: 'slow', duration: 1.0, quality: 0.5 },

  // Wigglytuff
  'sing': { ccType: 'sleep', duration: 3.0, quality: 0.85 },
  'pound': { ccType: 'stun', duration: 0.5, quality: 1.0 },
  'cute_charm': { ccType: 'slow', duration: 1.0, quality: 0.5 },
  'dazzling_gleam': { ccType: 'slow', duration: 1.5, quality: 0.5 },

  // Machamp
  'submission': { ccType: 'knockup', duration: 0.75, quality: 0.75 },
  'cross_chop': { ccType: 'knockup', duration: 0.5, quality: 0.75 },
  'dynamic_punch': { ccType: 'stun', duration: 1.0, quality: 1.0 },
  'close_combat': { ccType: 'knockup', duration: 0.5, quality: 0.75 },
  'seismic_toss': { ccType: 'suppress', duration: 1.5, quality: 0.95 },

  // Neos / Talonflame
  'fly': { ccType: 'suppress', duration: 1.5, quality: 0.95 },
  'aerial_ace': { ccType: 'slow', duration: 0.5, quality: 0.4 },

  // Crustle
  'shell_smash': { ccType: 'slow', duration: 1.0, quality: 0.5 },
  'rock_tomb': { ccType: 'root', duration: 1.5, quality: 0.8 },
  'x_scissor': { ccType: 'knockup', duration: 0.5, quality: 0.75 },

  // Tsareena
  'stomp': { ccType: 'stun', duration: 1.0, quality: 1.0 },
  'queens_ascent': { ccType: 'knockup', duration: 0.5, quality: 0.75 },
  'trop_kick': { ccType: 'knockup', duration: 0.75, quality: 0.75 },

  // Greedent
  'stuff_cheeks': { ccType: 'slow', duration: 1.0, quality: 0.5 },
  'covet': { ccType: 'knockup', duration: 0.5, quality: 0.75 },

  // Sylveon
  'mystical_fire': { ccType: 'slow', duration: 1.5, quality: 0.5 },
  'draining_kiss': { ccType: 'slow', duration: 1.0, quality: 0.4 },
  'hyper_voice': { ccType: 'slow', duration: 0.5, quality: 0.4 },

  // Azumarill
  'whirlpool': { ccType: 'root', duration: 2.0, quality: 0.8 },
  'aqua_jet': { ccType: 'slow', duration: 0.5, quality: 0.4 },

  // Gengar
  'sludge_bomb': { ccType: 'slow', duration: 1.0, quality: 0.5 },
  'hex': { ccType: 'slow', duration: 0.5, quality: 0.4 },
  'will_o_wisp': { ccType: 'slow', duration: 2.0, quality: 0.5 },

  // Lucario
  'meteor_mash': { ccType: 'knockup', duration: 0.5, quality: 0.75 },
  'extreme_speed': { ccType: 'stun', duration: 0.5, quality: 1.0 },

  // Umbreon
  'snarl': { ccType: 'slow', duration: 1.5, quality: 0.5 },
  'mean_look': { ccType: 'root', duration: 2.0, quality: 0.8 },
  'moonlight': { ccType: 'slow', duration: 1.0, quality: 0.4 },

  // Eldegoss
  'cotton_guard': { ccType: 'slow', duration: 1.0, quality: 0.4 },
  'leaf_tornado': { ccType: 'slow', duration: 1.5, quality: 0.5 },
};

// Quality weights for CC type scoring
export const CC_TYPE_WEIGHTS: Record<CCType, number> = {
  stun: 1.0,
  suppress: 1.0,
  freeze: 0.9,
  sleep: 0.85,
  knockup: 0.75,
  root: 0.8,
  pull: 0.7,
  slow: 0.5,
};
