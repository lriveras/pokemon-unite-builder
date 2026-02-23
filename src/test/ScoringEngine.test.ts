import { describe, it, expect } from 'vitest';
import { computeDimensionScores } from '../engine/scoringEngine';

/** Minimal stats for a level-15 Pokemon. */
const BASE_STATS = Array.from({ length: 15 }, (_, i) => ({
  level: i + 1, hp: 3000, atk: 200, def: 60, sp_atk: 200, sp_def: 60,
}));

const BASE_RATINGS = { offense: 3, endurance: 3, mobility: 3, scoring: 3, support: 3, leveling: 3 };

function makeMove(overrides: Partial<{ moveId: string; name: string; isHeal: boolean; isShield: boolean; isDash: boolean; isBurst: boolean; isSustain: boolean; isAoE: boolean; ccType: string | undefined; categories: string[] }>) {
  return {
    moveId: overrides.moveId ?? 'test_move',
    name: overrides.name ?? 'Test Move',
    description: '',
    damageType: 'atk' as const,
    isBurst: overrides.isBurst ?? false,
    isHeal: overrides.isHeal ?? false,
    isShield: overrides.isShield ?? false,
    isDash: overrides.isDash ?? false,
    isSustain: overrides.isSustain ?? false,
    isAoE: overrides.isAoE ?? false,
    ccType: overrides.ccType as any,
    cooldown: 7,
    isUpgrade: false,
    categories: overrides.categories ?? [],
  };
}

describe('Scoring Engine', () => {
  describe('healing score', () => {
    it('awards healing score for each isHeal move', () => {
      const withHeal = computeDimensionScores({
        ratings: BASE_RATINGS,
        role: 'attacker',
        attackStyle: 'physical',
        slot1: { options: [makeMove({ isHeal: true })], defaultChoice: '' },
        slot2: { options: [], defaultChoice: '' },
        uniteMove: { moveId: 'u', name: 'U', description: '', isDash: false, isAoE: false, isHeal: false, isShield: false },
        normalizedStats: BASE_STATS,
      });
      const withoutHeal = computeDimensionScores({
        ratings: BASE_RATINGS,
        role: 'attacker',
        attackStyle: 'physical',
        slot1: { options: [makeMove({})], defaultChoice: '' },
        slot2: { options: [], defaultChoice: '' },
        uniteMove: { moveId: 'u', name: 'U', description: '', isDash: false, isAoE: false, isHeal: false, isShield: false },
        normalizedStats: BASE_STATS,
      });
      // A Pokemon with a heal move must score higher on healing than one without
      expect(withHeal.healing).toBeGreaterThan(withoutHeal.healing);
    });

    it('supporter role gets a healing bonus regardless of moves', () => {
      const supporter = computeDimensionScores({
        ratings: BASE_RATINGS,
        role: 'supporter',
        attackStyle: 'special',
        slot1: { options: [], defaultChoice: '' },
        slot2: { options: [], defaultChoice: '' },
        uniteMove: { moveId: 'u', name: 'U', description: '', isDash: false, isAoE: false, isHeal: false, isShield: false },
        normalizedStats: BASE_STATS,
      });
      const attacker = computeDimensionScores({
        ratings: BASE_RATINGS,
        role: 'attacker',
        attackStyle: 'special',
        slot1: { options: [], defaultChoice: '' },
        slot2: { options: [], defaultChoice: '' },
        uniteMove: { moveId: 'u', name: 'U', description: '', isDash: false, isAoE: false, isHeal: false, isShield: false },
        normalizedStats: BASE_STATS,
      });
      expect(supporter.healing).toBeGreaterThan(attacker.healing);
    });

    it('two heal moves score higher than one', () => {
      const oneHeal = computeDimensionScores({
        ratings: BASE_RATINGS,
        role: 'attacker',
        attackStyle: 'physical',
        slot1: { options: [makeMove({ moveId: 'h1', isHeal: true })], defaultChoice: '' },
        slot2: { options: [], defaultChoice: '' },
        uniteMove: { moveId: 'u', name: 'U', description: '', isDash: false, isAoE: false, isHeal: false, isShield: false },
        normalizedStats: BASE_STATS,
      });
      const twoHeals = computeDimensionScores({
        ratings: BASE_RATINGS,
        role: 'attacker',
        attackStyle: 'physical',
        slot1: { options: [makeMove({ moveId: 'h1', isHeal: true })], defaultChoice: '' },
        slot2: { options: [makeMove({ moveId: 'h2', isHeal: true })], defaultChoice: '' },
        uniteMove: { moveId: 'u', name: 'U', description: '', isDash: false, isAoE: false, isHeal: false, isShield: false },
        normalizedStats: BASE_STATS,
      });
      expect(twoHeals.healing).toBeGreaterThan(oneHeal.healing);
    });
  });

  describe('isHeal flag via HEAL_MOVE_IDS', () => {
    it('aqua_ring is in HEAL_MOVE_IDS', async () => {
      const { HEAL_MOVE_IDS } = await import('../constants/healMoveIds');
      expect(HEAL_MOVE_IDS.has('aqua_ring')).toBe(true);
    });

    it('wish is in HEAL_MOVE_IDS', async () => {
      const { HEAL_MOVE_IDS } = await import('../constants/healMoveIds');
      expect(HEAL_MOVE_IDS.has('wish')).toBe(true);
    });

    it('moonlight is in HEAL_MOVE_IDS', async () => {
      const { HEAL_MOVE_IDS } = await import('../constants/healMoveIds');
      expect(HEAL_MOVE_IDS.has('moonlight')).toBe(true);
    });

    it('synthesis is in HEAL_MOVE_IDS', async () => {
      const { HEAL_MOVE_IDS } = await import('../constants/healMoveIds');
      expect(HEAL_MOVE_IDS.has('synthesis')).toBe(true);
    });
  });

  describe('shielding score', () => {
    it('awards shielding score for each isShield move', () => {
      const withShield = computeDimensionScores({
        ratings: BASE_RATINGS,
        role: 'attacker',
        attackStyle: 'physical',
        slot1: { options: [makeMove({ isShield: true })], defaultChoice: '' },
        slot2: { options: [], defaultChoice: '' },
        uniteMove: { moveId: 'u', name: 'U', description: '', isDash: false, isAoE: false, isHeal: false, isShield: false },
        normalizedStats: BASE_STATS,
      });
      const withoutShield = computeDimensionScores({
        ratings: BASE_RATINGS,
        role: 'attacker',
        attackStyle: 'physical',
        slot1: { options: [makeMove({})], defaultChoice: '' },
        slot2: { options: [], defaultChoice: '' },
        uniteMove: { moveId: 'u', name: 'U', description: '', isDash: false, isAoE: false, isHeal: false, isShield: false },
        normalizedStats: BASE_STATS,
      });
      expect(withShield.shielding).toBeGreaterThan(withoutShield.shielding);
    });
  });

  describe('all scores in valid range', () => {
    it('all dimension scores are between 0 and 10', () => {
      const scores = computeDimensionScores({
        ratings: { offense: 5, endurance: 5, mobility: 5, scoring: 5, support: 5, leveling: 5 },
        role: 'supporter',
        attackStyle: 'special',
        slot1: { options: [makeMove({ isHeal: true }), makeMove({ moveId: 'h2', isHeal: true })], defaultChoice: '' },
        slot2: { options: [makeMove({ moveId: 's1', isShield: true }), makeMove({ moveId: 'd1', isDash: true })], defaultChoice: '' },
        uniteMove: { moveId: 'u', name: 'U', description: '', isDash: true, isAoE: true, isHeal: false, isShield: false },
        normalizedStats: BASE_STATS,
      });
      for (const [key, value] of Object.entries(scores)) {
        expect(value, `${key} should be >= 0`).toBeGreaterThanOrEqual(0);
        expect(value, `${key} should be <= 10`).toBeLessThanOrEqual(10);
      }
    });
  });
});
