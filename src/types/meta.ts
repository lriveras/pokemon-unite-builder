import { Pokemon } from './pokemon';
import { HeldItem, BattleItem } from './items';

export interface GameDataCache {
  version: number;
  lastFetched: string;
  pokemon: Pokemon[];
  heldItems: HeldItem[];
  battleItems: BattleItem[];
}

export interface MapObjective {
  name: string;
  time: number;
  lane: 'top' | 'bottom' | 'center';
  points: number;
  priority: 'high' | 'medium' | 'low';
}

export interface MapInfo {
  mapId: string;
  name: string;
  isActive: boolean;
  description: string;
  objectives: MapObjective[];
  recommendedRoles: string[];
  laneStrategy: string;
}
