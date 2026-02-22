export type PokemonRole = 'attacker' | 'defender' | 'supporter' | 'speedster' | 'all-rounder';
export type AttackStyle = 'physical' | 'special' | 'mixed';
export type DamageType = 'ranged' | 'melee';
export type Difficulty = 'novice' | 'intermediate' | 'expert';
export type Tier = 'S' | 'A' | 'B' | 'C' | 'D';
export type CCType = 'stun' | 'slow' | 'freeze' | 'sleep' | 'knockup' | 'pull' | 'root' | 'suppress';

export interface RawRatings {
  offense: number;
  endurance: number;
  mobility: number;
  scoring: number;
  support: number;
  leveling: number;
}

export interface PokemonStats {
  level: number;
  hp: number;
  atk: number;
  def: number;
  sp_atk: number;
  sp_def: number;
  cdr: number;
}

export interface EvolutionStage {
  name: string;
  level: number;
}

export interface MoveOption {
  moveId: string;
  name: string;
  description: string;
  damageType: 'atk' | 'sp_atk';
  isBurst: boolean;
  isHeal: boolean;
  isShield: boolean;
  isDash: boolean;
  isSustain: boolean;
  ccType?: CCType;
  cooldown: number;
  isUpgrade: boolean;
}

export interface MoveSlot {
  options: MoveOption[];
  defaultChoice: string;
}

export interface UniteMove {
  moveId: string;
  name: string;
  description: string;
  isDash: boolean;
  isAoE: boolean;
}

export interface DimensionScores {
  damageOutput: number;
  durability: number;
  crowdControl: number;
  mobility: number;
  sustain: number;
  objectiveThreat: number;
  earlyGame: number;
  lateGame: number;
}

export interface Pokemon {
  pokemonId: string;
  dex: number;
  name: string;
  role: PokemonRole;
  damageType: DamageType;
  attackStyle: AttackStyle;
  difficulty: Difficulty;
  tier: Tier;
  isMega: boolean;
  maxHeldItems: 2 | 3;
  spriteUrl: string;
  ratings: RawRatings;
  stages: EvolutionStage[];
  statsProgression: PokemonStats[];
  statsAtMaxLevel: PokemonStats;
  basicAttack: {
    boostStyle: 'physical' | 'special';
    boostCount: number;
  };
  slot1: MoveSlot;
  slot2: MoveSlot;
  uniteMove: UniteMove;
  dimensionScores: DimensionScores;
}

// Raw shape from pvpoke-unite JSON (actual field names)
export interface RawPokemonMove {
  moveId: string;
  name?: string;
  style?: string;       // 'physical' | 'special'
  category?: string;    // 'ranged' | 'melee' | 'dash' | 'recovery' | 'shield' | 'debuff'
  cooldown?: number;
  level?: number;
  upgrade?: number;
}

export interface RawPokemon {
  pokemonId: string;    // e.g. "venusaur"
  dex: number;
  role?: string;
  type?: string;        // 'ranged' | 'melee'
  style?: string;       // 'physical' | 'special' | 'mixed'
  difficulty?: string;
  ratings?: Partial<RawRatings>;
  stages?: Array<{ stageId: string; level: number }>;
  stats?: Array<{ level: number; hp: number; atk: number; def: number; sp_atk: number; sp_def: number; speed?: number }>;
  moves?: {
    basic?: { moveId?: string; style?: string; boostStyle?: string; boostCount?: number };
    slot1?: RawPokemonMove[];
    slot2?: RawPokemonMove[];
    unite?: { moveId: string; name?: string; style?: string; category?: string };
  };
}
