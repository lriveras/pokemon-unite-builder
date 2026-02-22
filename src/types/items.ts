export interface ItemStat {
  statName: string;
  grade1: number;
  grade10: number;
  grade20: number;
  grade30: number;
  unit: string;
}

export interface HeldItem {
  itemId: string;
  name: string;
  description: string;
  category: 'offense' | 'defense' | 'support' | 'mobility';
  stats: ItemStat[];
  passive?: string;
  recommendedFor?: string[];
}

export interface BattleItem {
  itemId: string;
  name: string;
  description: string;
  cooldown: number;
  category: 'combat' | 'mobility' | 'support' | 'recovery';
  effect: string;
}

// Raw pvpoke shape
export interface RawHeldItem {
  itemId: string;
  name?: string;
  description?: string;
  category?: string;
  stats?: Record<string, number[]>;
  passive?: string;
}

export interface RawBattleItem {
  itemId: string;
  name?: string;
  description?: string;
  cooldown?: number;
  category?: string;
  effect?: string;
}
