import { PokemonRole } from '../types/pokemon';

export const ROLE_CONFIG: Record<PokemonRole, { label: string; color: string; bgColor: string; description: string }> = {
  attacker: {
    label: 'Attacker',
    color: '#EF4444',
    bgColor: 'rgba(239,68,68,0.15)',
    description: 'High damage dealers with lower durability',
  },
  defender: {
    label: 'Defender',
    color: '#3B82F6',
    bgColor: 'rgba(59,130,246,0.15)',
    description: 'Tanky Pokemon that protect allies',
  },
  supporter: {
    label: 'Supporter',
    color: '#22C55E',
    bgColor: 'rgba(34,197,94,0.15)',
    description: 'Healing and utility-focused Pokemon',
  },
  speedster: {
    label: 'Speedster',
    color: '#EAB308',
    bgColor: 'rgba(234,179,8,0.15)',
    description: 'Fast Pokemon with strong ganking and scoring',
  },
  'all-rounder': {
    label: 'All-Rounder',
    color: '#A855F7',
    bgColor: 'rgba(168,85,247,0.15)',
    description: 'Balanced offense and defense',
  },
};

export const ROLE_ORDER: PokemonRole[] = ['attacker', 'defender', 'supporter', 'speedster', 'all-rounder'];
