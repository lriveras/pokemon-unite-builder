import { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Pokemon } from '../types/pokemon';

/** Wrap a component with MemoryRouter (needed for Link/useNavigate in page components) */
export function renderWithRouter(ui: ReactElement, options?: RenderOptions) {
  return render(
    <MemoryRouter>{ui}</MemoryRouter>,
    options,
  );
}

/** A minimal valid Pokemon object for testing */
export function makePokemon(overrides: Partial<Pokemon> = {}): Pokemon {
  const dimScores = {
    damageOutput: 6,
    durability: 4,
    crowdControl: 5,
    mobility: 3,
    healing: 1,
    shielding: 2,
    objectiveThreat: 5,
    earlyGame: 4,
    lateGame: 6,
    ...overrides.dimensionScores,
  };
  return {
    pokemonId: 'pikachu',
    dex: 25,
    statsSource: 'pvpoke',
    name: 'Pikachu',
    role: 'attacker',
    damageType: 'ranged',
    attackStyle: 'special',
    difficulty: 'novice',
    tier: 'A',
    isMega: false,
    maxHeldItems: 3,
    spriteUrl: '',
    ratings: { offense: 4, endurance: 2, mobility: 3, scoring: 3, support: 1, leveling: 4 },
    stages: [],
    statsProgression: Array.from({ length: 15 }, (_, i) => ({
      level: i + 1, hp: 3200, atk: 200, def: 50, sp_atk: 280, sp_def: 50, cdr: 0,
    })),
    statsAtMaxLevel: { level: 15, hp: 3200, atk: 200, def: 50, sp_atk: 280, sp_def: 50, cdr: 0 },
    basicAttack: { boostStyle: 'special', boostCount: 3 },
    slot1: { options: [], defaultChoice: '' },
    slot2: { options: [], defaultChoice: '' },
    uniteMove: { moveId: 'thunderstorm', name: 'Thunderstorm', description: '', isDash: false, isAoE: true },
    dimensionScores: dimScores,
    ...overrides,
  };
}
