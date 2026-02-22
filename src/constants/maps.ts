import { MapInfo } from '../types/meta';

export const MAPS: MapInfo[] = [
  {
    mapId: 'remoat_stadium',
    name: 'Remoat Stadium',
    isActive: true,
    description: 'The classic 3-lane map with Regice, Regrock, Regirock, and Rayquaza as key objectives.',
    objectives: [
      { name: 'Regice', time: 2, lane: 'top', points: 0, priority: 'medium' },
      { name: 'Regrock', time: 2, lane: 'bottom', points: 0, priority: 'medium' },
      { name: 'Regirock', time: 2, lane: 'center', points: 0, priority: 'medium' },
      { name: 'Dreadnaw', time: 5, lane: 'bottom', points: 20, priority: 'high' },
      { name: 'Rotom', time: 5, lane: 'top', points: 0, priority: 'high' },
      { name: 'Zapdos', time: 2, lane: 'center', points: 0, priority: 'high' },
    ],
    recommendedRoles: ['speedster', 'all-rounder', 'attacker'],
    laneStrategy: 'Focus on Dreadnaw at 5:00 for the early XP boost. Contest Rotom for goal disruption. Secure Zapdos at the 2:00 mark as it can flip the game.',
  },
  {
    mapId: 'theia_sky_ruins',
    name: 'Theia Sky Ruins',
    isActive: true,
    description: 'A 3-lane map featuring Rayquaza as the central late-game objective.',
    objectives: [
      { name: 'Drednaw', time: 5, lane: 'bottom', points: 20, priority: 'high' },
      { name: 'Regieleki', time: 5, lane: 'top', points: 0, priority: 'high' },
      { name: 'Rayquaza', time: 2, lane: 'center', points: 0, priority: 'high' },
    ],
    recommendedRoles: ['defender', 'supporter', 'attacker'],
    laneStrategy: 'Control the center jungle for energy advantage. Secure Drednaw for bonus points and Regieleki for goal disruption. Team fight around Rayquaza at 2:00.',
  },
  {
    mapId: 'mer_stadium',
    name: 'Mer Stadium',
    isActive: false,
    description: 'A 2-lane map with unique scoring mechanics and Swampert as a major objective.',
    objectives: [
      { name: 'Swampert', time: 7, lane: 'center', points: 0, priority: 'high' },
      { name: 'Xerneas', time: 2, lane: 'center', points: 0, priority: 'high' },
    ],
    recommendedRoles: ['speedster', 'all-rounder'],
    laneStrategy: 'With only 2 lanes, aggressive early plays are critical. Swampert provides a massive power spike. Secure Xerneas in the final 2 minutes.',
  },
];

export const ACTIVE_MAPS = MAPS.filter(m => m.isActive);
