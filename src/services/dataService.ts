import { Pokemon, RawPokemon, RawPokemonMove, PokemonRole, AttackStyle, DamageType, Difficulty, Tier, MoveOption, MoveSlot, DimensionScores } from '../types/pokemon';
import { HeldItem, BattleItem, RawHeldItem, RawBattleItem } from '../types/items';
import { DATA_URLS, getSpriteUrl } from '../constants/dataUrls';
import { MEGA_POKEMON_IDS } from '../constants/moveDamageTable';
import { CC_MOVE_MAP } from '../constants/ccMoveMap';
import { HEAL_MOVE_IDS } from '../constants/healMoveIds';
import { SHIELD_MOVE_IDS } from '../constants/shieldMoveIds';
import { DASH_MOVE_IDS } from '../constants/dashMoveIds';
import { computeDimensionScores } from '../engine/scoringEngine';
import { FULL_POKEMON_ROSTER, PVPOKE_IDS } from '../data/pokemonRoster';
import { MOVE_DESCRIPTIONS } from '../data/moveDescriptions';

// ------ Normalize Pokemon ------

function normalizeRole(raw: string | undefined): PokemonRole {
  if (!raw) return 'all-rounder';
  const r = raw.toLowerCase().replace(/[\s-]/g, '');
  if (r.includes('attacker')) return 'attacker';
  if (r.includes('defender')) return 'defender';
  if (r.includes('supporter') || r.includes('support')) return 'supporter';
  if (r.includes('speedster')) return 'speedster';
  return 'all-rounder';
}

function normalizeAttackStyle(raw: string | undefined): AttackStyle {
  if (!raw) return 'physical';
  const s = raw.toLowerCase();
  if (s.includes('special')) return 'special';
  if (s.includes('mixed')) return 'mixed';
  return 'physical';
}

function normalizeDifficulty(raw: string | undefined): Difficulty {
  if (!raw) return 'intermediate';
  const d = raw.toLowerCase();
  if (d.includes('novice') || d.includes('beginner') || d.includes('easy')) return 'novice';
  if (d.includes('expert') || d.includes('hard')) return 'expert';
  return 'intermediate';
}

function normalizeMoveOption(raw: RawPokemonMove, isUpgrade = false): MoveOption {
  const ccEntry = CC_MOVE_MAP[raw.moveId];
  const name = raw.name || raw.moveId.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  const style = (raw.style || '').toLowerCase();
  const category = (raw.category || '').toLowerCase();
  const categories = category ? category.split(/[\s,]+/).filter(Boolean) : [];
  return {
    moveId: raw.moveId,
    name,
    description: MOVE_DESCRIPTIONS[raw.moveId] || '',
    damageType: style.includes('special') ? 'sp_atk' : 'atk',
    isBurst: category.includes('burst'),
    isHeal: category.includes('recovery') || name.toLowerCase().includes('heal') || name.toLowerCase().includes('recover') || HEAL_MOVE_IDS.has(raw.moveId),
    isShield: category.includes('shield') || name.toLowerCase().includes('shield') || SHIELD_MOVE_IDS.has(raw.moveId),
    isDash: category.includes('dash') || name.toLowerCase().includes('dash') || name.toLowerCase().includes('rush') || DASH_MOVE_IDS.has(raw.moveId),
    isSustain: category.includes('drain') || category.includes('sustain'),
    ccType: ccEntry?.ccType,
    cooldown: raw.cooldown || 7,
    isUpgrade,
    categories,
  };
}

function normalizeMoveSlot(rawMoves: RawPokemonMove[] | undefined): MoveSlot {
  if (!rawMoves || rawMoves.length === 0) {
    return { options: [], defaultChoice: '' };
  }
  // pvpoke lists the base move first, then upgraded version(s)
  // moves with an `upgrade` field are upgraded versions
  const baseMove = rawMoves.find(m => !m.upgrade) ?? rawMoves[0];
  const upgradedMoves = rawMoves.filter(m => m.upgrade && m !== baseMove);
  const options = [
    normalizeMoveOption(baseMove, false),
    ...upgradedMoves.map(m => normalizeMoveOption(m, true)),
  ];
  // Default to the first upgrade option (the real move at max level).
  // The base (level-1) move is a temporary pre-evolution placeholder.
  const firstUpgrade = upgradedMoves[0];
  const defaultChoice = firstUpgrade
    ? normalizeMoveOption(firstUpgrade, true).moveId
    : (options[0]?.moveId || '');
  return { options, defaultChoice };
}

export function normalizePokemon(raw: RawPokemon, statsSource: Pokemon['statsSource'] = 'pvpoke'): Pokemon {
  const pokemonId = raw.pokemonId;
  const isMega = MEGA_POKEMON_IDS.has(pokemonId);
  const role = normalizeRole(raw.role);
  const attackStyle = normalizeAttackStyle(raw.style);
  const damageType: DamageType = (raw.type === 'melee' ? 'melee' : 'ranged');

  const ratings = {
    offense: raw.ratings?.offense ?? 3,
    endurance: raw.ratings?.endurance ?? 3,
    mobility: raw.ratings?.mobility ?? 3,
    scoring: raw.ratings?.scoring ?? 3,
    support: raw.ratings?.support ?? 3,
    leveling: raw.ratings?.leveling ?? 3,
  };

  // pvpoke stats is a per-level array
  const normalizedStats = Array.from({ length: 15 }, (_, i) => {
    const level = i + 1;
    const found = Array.isArray(raw.stats) ? raw.stats.find(s => s.level === level) : undefined;
    const scale = 1 + (level - 1) * 0.12;
    return {
      level,
      hp: found?.hp ?? Math.round(3000 * scale),
      atk: found?.atk ?? Math.round(200 * scale),
      def: found?.def ?? Math.round(50 * scale),
      sp_atk: found?.sp_atk ?? Math.round(200 * scale),
      sp_def: found?.sp_def ?? Math.round(50 * scale),
      cdr: 0,
    };
  });

  // Evolution stages — pvpoke uses stages[].stageId
  const stages = (raw.stages ?? []).map(e => ({
    name: e.stageId,
    level: e.level,
  }));

  // Moves
  const slot1 = normalizeMoveSlot(raw.moves?.slot1);
  const slot2 = normalizeMoveSlot(raw.moves?.slot2);
  const uniteRaw = raw.moves?.unite;
  const uniteMoveId = uniteRaw?.moveId ?? `${pokemonId}_unite`;
  const uniteMove = {
    moveId: uniteMoveId,
    name: uniteRaw?.name ?? 'Unite Move',
    description: MOVE_DESCRIPTIONS[uniteMoveId] || '',
    isDash: (uniteRaw?.category || '').includes('dash'),
    isAoE: role === 'attacker' || role === 'all-rounder',
  };

  const basicRaw = raw.moves?.basic;
  const basicAttack = {
    boostStyle: (basicRaw?.boostStyle === 'special' ? 'special' : 'physical') as 'physical' | 'special',
    boostCount: basicRaw?.boostCount ?? 3,
  };

  // Compute dimension scores
  const dimensionScores = computeDimensionScores({ ratings, role, attackStyle, slot1, slot2, uniteMove, normalizedStats });

  // Derive tier from ratings
  const avgRating = (ratings.offense + ratings.endurance + ratings.mobility + ratings.scoring) / 4;
  let tier: Tier;
  if (avgRating >= 4.5) tier = 'S';
  else if (avgRating >= 3.8) tier = 'A';
  else if (avgRating >= 3.0) tier = 'B';
  else if (avgRating >= 2.2) tier = 'C';
  else tier = 'D';

  const name = pokemonId.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

  return {
    pokemonId,
    dex: raw.dex ?? 0,
    statsSource,
    name,
    role,
    damageType,
    attackStyle,
    difficulty: normalizeDifficulty(raw.difficulty),
    tier,
    isMega,
    maxHeldItems: isMega ? 2 : 3,
    spriteUrl: getSpriteUrl(raw.dex ?? 0),
    ratings,
    stages,
    statsProgression: normalizedStats,
    statsAtMaxLevel: normalizedStats[14],
    basicAttack,
    slot1,
    slot2,
    uniteMove,
    dimensionScores,
  };
}

// ------ Normalize Items ------

export function normalizeHeldItem(raw: RawHeldItem): HeldItem {
  return {
    itemId: raw.itemId,
    name: raw.name || raw.itemId.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
    description: raw.description || '',
    category: (raw.category as HeldItem['category']) || 'offense',
    stats: raw.stats ? Object.entries(raw.stats).map(([name, vals]) => ({
      statName: name,
      grade1: vals[0] ?? 0,
      grade10: vals[1] ?? 0,
      grade20: vals[2] ?? 0,
      grade30: vals[3] ?? 0,
      unit: name.toLowerCase().includes('hp') ? 'HP' : name.toLowerCase().includes('speed') ? '%' : '',
    })) : [],
    passive: raw.passive,
    recommendedFor: [],
  };
}

export function normalizeBattleItem(raw: RawBattleItem): BattleItem {
  return {
    itemId: raw.itemId,
    name: raw.name || raw.itemId.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
    description: raw.description || '',
    cooldown: raw.cooldown ?? 60,
    category: (raw.category as BattleItem['category']) || 'combat',
    effect: raw.effect || '',
  };
}

// ------ Fetch & Normalize ------

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`);
  return res.json();
}

// Fallback sample data if network fails
function getSamplePokemon(): Pokemon[] {
  // Return minimal built-in data for offline/error use
  return SAMPLE_POKEMON_DATA.map(normalizePokemon);
}

export async function fetchAllGameData(): Promise<{
  pokemon: Pokemon[];
  heldItems: HeldItem[];
  battleItems: BattleItem[];
}> {
  try {
    const [rawPokemon, rawHeldItems, rawBattleItems] = await Promise.all([
      fetchJson<RawPokemon[]>(DATA_URLS.pokemon).catch(() => null),
      fetchJson<RawHeldItem[]>(DATA_URLS.heldItems).catch(() => null),
      fetchJson<RawBattleItem[]>(DATA_URLS.battleItems).catch(() => null),
    ]);

    // Build the full roster from static data first (all 86 Pokemon, estimated stats)
    const staticById = new Map(
      FULL_POKEMON_ROSTER.map(r => [r.pokemonId, normalizePokemon(r, 'estimated')])
    );

    // Override with live pvpoke data where available (accurate per-level stats)
    if (rawPokemon) {
      rawPokemon
        .filter(r => r.pokemonId && (r.dex ?? 0) > 0)
        .forEach(r => staticById.set(r.pokemonId, normalizePokemon(r, 'pvpoke')));
    }

    // Stamp any pvpoke Pokemon not already in our static list (future new releases)
    if (rawPokemon) {
      rawPokemon
        .filter(r => !PVPOKE_IDS.has(r.pokemonId) && r.pokemonId && (r.dex ?? 0) > 0)
        .forEach(r => staticById.set(r.pokemonId, normalizePokemon(r, 'pvpoke')));
    }

    const pokemon = Array.from(staticById.values())
      .sort((a, b) => a.dex - b.dex || a.name.localeCompare(b.name));

    const heldItems = rawHeldItems
      ? rawHeldItems.map(normalizeHeldItem)
      : SAMPLE_HELD_ITEMS.map(normalizeHeldItem);

    const battleItems = rawBattleItems
      ? rawBattleItems.map(normalizeBattleItem)
      : SAMPLE_BATTLE_ITEMS.map(normalizeBattleItem);

    return { pokemon, heldItems, battleItems };
  } catch {
    // Full static roster is always available as fallback
    const pokemon = FULL_POKEMON_ROSTER
      .map(r => normalizePokemon(r, 'estimated'))
      .sort((a, b) => a.dex - b.dex || a.name.localeCompare(b.name));
    return {
      pokemon,
      heldItems: SAMPLE_HELD_ITEMS.map(normalizeHeldItem),
      battleItems: SAMPLE_BATTLE_ITEMS.map(normalizeBattleItem),
    };
  }
}

// Minimal sample data as offline fallback — matches pvpoke RawPokemon shape
function makeSampleStats(hp: number, atk: number, def: number, sp_atk: number, sp_def: number) {
  return Array.from({ length: 15 }, (_, i) => {
    const scale = 1 + i * 0.12;
    return { level: i + 1, hp: Math.round(hp * scale), atk: Math.round(atk * scale), def: Math.round(def * scale), sp_atk: Math.round(sp_atk * scale), sp_def: Math.round(sp_def * scale) };
  });
}

const SAMPLE_POKEMON_DATA: RawPokemon[] = [
  { pokemonId: 'pikachu', dex: 25, role: 'attacker', style: 'special', difficulty: 'novice', ratings: { offense: 5, endurance: 2, mobility: 3, scoring: 3, support: 1, leveling: 4 }, stats: makeSampleStats(3200, 180, 40, 280, 50) },
  { pokemonId: 'snorlax', dex: 143, role: 'defender', style: 'physical', difficulty: 'novice', ratings: { offense: 2, endurance: 5, mobility: 1, scoring: 2, support: 3, leveling: 3 }, stats: makeSampleStats(7500, 200, 120, 100, 80) },
  { pokemonId: 'eldegoss', dex: 830, role: 'supporter', style: 'special', difficulty: 'novice', ratings: { offense: 2, endurance: 2, mobility: 3, scoring: 2, support: 5, leveling: 3 }, stats: makeSampleStats(2900, 100, 60, 200, 70) },
  { pokemonId: 'zeraora', dex: 807, role: 'speedster', style: 'physical', difficulty: 'expert', ratings: { offense: 4, endurance: 2, mobility: 5, scoring: 4, support: 1, leveling: 4 }, stats: makeSampleStats(3100, 300, 50, 150, 40) },
  { pokemonId: 'lucario', dex: 448, role: 'all-rounder', style: 'physical', difficulty: 'intermediate', ratings: { offense: 4, endurance: 3, mobility: 4, scoring: 3, support: 1, leveling: 4 }, stats: makeSampleStats(3800, 280, 70, 180, 60) },
  { pokemonId: 'charizard', dex: 6, role: 'all-rounder', style: 'physical', difficulty: 'novice', ratings: { offense: 4, endurance: 3, mobility: 3, scoring: 3, support: 1, leveling: 3 }, stats: makeSampleStats(4200, 270, 80, 200, 60), stages: [{ stageId: 'charmander', level: 1 }, { stageId: 'charmeleon', level: 5 }] },
  { pokemonId: 'blastoise', dex: 9, role: 'defender', style: 'special', difficulty: 'intermediate', ratings: { offense: 3, endurance: 4, mobility: 2, scoring: 2, support: 3, leveling: 3 }, stats: makeSampleStats(6000, 180, 100, 220, 90) },
  { pokemonId: 'gengar', dex: 94, role: 'speedster', style: 'special', difficulty: 'expert', ratings: { offense: 5, endurance: 2, mobility: 4, scoring: 3, support: 1, leveling: 3 }, stats: makeSampleStats(2800, 160, 45, 350, 45) },
  { pokemonId: 'machamp', dex: 68, role: 'all-rounder', style: 'physical', difficulty: 'intermediate', ratings: { offense: 4, endurance: 3, mobility: 3, scoring: 3, support: 1, leveling: 4 }, stats: makeSampleStats(4500, 320, 70, 120, 60), stages: [{ stageId: 'machop', level: 1 }, { stageId: 'machoke', level: 5 }] },
  { pokemonId: 'sylveon', dex: 700, role: 'attacker', style: 'special', difficulty: 'novice', ratings: { offense: 4, endurance: 2, mobility: 2, scoring: 3, support: 2, leveling: 3 }, stats: makeSampleStats(3000, 100, 50, 310, 70) },
  { pokemonId: 'umbreon', dex: 197, role: 'defender', style: 'physical', difficulty: 'intermediate', ratings: { offense: 2, endurance: 5, mobility: 2, scoring: 2, support: 4, leveling: 3 }, stats: makeSampleStats(7000, 180, 110, 100, 110) },
  { pokemonId: 'wigglytuff', dex: 40, role: 'supporter', style: 'special', difficulty: 'novice', ratings: { offense: 2, endurance: 3, mobility: 2, scoring: 2, support: 5, leveling: 4 }, stats: makeSampleStats(5000, 120, 70, 200, 70) },
  { pokemonId: 'slowbro', dex: 80, role: 'defender', style: 'special', difficulty: 'novice', ratings: { offense: 3, endurance: 4, mobility: 1, scoring: 2, support: 3, leveling: 3 }, stats: makeSampleStats(6500, 150, 100, 250, 80) },
  { pokemonId: 'crustle', dex: 558, role: 'defender', style: 'physical', difficulty: 'novice', ratings: { offense: 3, endurance: 4, mobility: 2, scoring: 3, support: 2, leveling: 3 }, stats: makeSampleStats(6200, 230, 115, 100, 80) },
  { pokemonId: 'tsareena', dex: 763, role: 'all-rounder', style: 'physical', difficulty: 'intermediate', ratings: { offense: 4, endurance: 3, mobility: 3, scoring: 3, support: 2, leveling: 4 }, stats: makeSampleStats(4000, 290, 75, 130, 65) },
];

const SAMPLE_HELD_ITEMS: RawHeldItem[] = [
  { itemId: 'muscle_band', name: 'Muscle Band', description: 'Increases basic attack damage by % of HP', category: 'offense', stats: { 'Attack': [10, 15, 20, 30] } },
  { itemId: 'scope_lens', name: 'Scope Lens', description: 'Boosts critical hit damage and rate', category: 'offense', stats: { 'Crit Rate': [2, 4, 6, 8] } },
  { itemId: 'wise_glasses', name: 'Wise Glasses', description: 'Boosts Sp. Atk', category: 'offense', stats: { 'Sp. Atk': [15, 25, 35, 50] } },
  { itemId: 'focus_band', name: 'Focus Band', description: 'Restores HP when low', category: 'defense', stats: { 'Defense': [10, 15, 20, 30], 'Sp. Def': [10, 15, 20, 30] } },
  { itemId: 'buddy_barrier', name: 'Buddy Barrier', description: 'Shield after Unite Move', category: 'support', stats: { 'HP': [600, 900, 1200, 1500] } },
  { itemId: 'leftovers', name: 'Leftovers', description: 'HP regen out of combat', category: 'support', stats: { 'HP': [240, 360, 480, 600] } },
  { itemId: 'exp_share', name: 'Exp. Share', description: 'Grants XP to lowest ally', category: 'support', stats: { 'HP': [240, 360, 480, 600] } },
  { itemId: 'float_stone', name: 'Float Stone', description: 'Speed boost out of combat', category: 'mobility', stats: { 'Attack': [10, 15, 20, 30] } },
  { itemId: 'rocky_helmet', name: 'Rocky Helmet', description: 'Reflects damage when hit', category: 'defense', stats: { 'HP': [390, 630, 870, 1200], 'Defense': [10, 15, 20, 30] } },
  { itemId: 'score_shield', name: 'Score Shield', description: 'Shield while scoring', category: 'support', stats: { 'HP': [240, 360, 480, 600] } },
  { itemId: 'assault_vest', name: 'Assault Vest', description: 'Sp. Def shield out of combat', category: 'defense', stats: { 'HP': [390, 630, 870, 1200], 'Sp. Def': [20, 30, 40, 60] } },
  { itemId: 'shell_bell', name: 'Shell Bell', description: 'HP on Sp. Atk hit', category: 'support', stats: { 'Sp. Atk': [15, 25, 35, 50], 'CDR': [1, 2, 3, 4.5] } },
  { itemId: 'energy_amplifier', name: 'Energy Amplifier', description: 'Faster Unite Move charge', category: 'offense', stats: { 'CDR': [2, 3, 4, 6] } },
];

const SAMPLE_BATTLE_ITEMS: RawBattleItem[] = [
  { itemId: 'x_attack', name: 'X Attack', description: '+30% Atk & Sp. Atk for 8s', cooldown: 40, category: 'combat', effect: 'Boosts attack stats' },
  { itemId: 'x_speed', name: 'X Speed', description: '+20% movement speed for 5s', cooldown: 40, category: 'mobility', effect: 'Speed boost' },
  { itemId: 'eject_button', name: 'Eject Button', description: 'Instantly teleport a short distance', cooldown: 55, category: 'mobility', effect: 'Blink/teleport' },
  { itemId: 'full_heal', name: 'Full Heal', description: 'Remove status effects, brief immunity', cooldown: 40, category: 'support', effect: 'Cleanse' },
  { itemId: 'fluffy_tail', name: 'Fluffy Tail', description: 'Stun wild Pokemon, increase their damage taken', cooldown: 20, category: 'combat', effect: 'Jungle clear' },
  { itemId: 'goal_getter', name: 'Goal-Getter', description: 'Double scoring speed', cooldown: 60, category: 'support', effect: 'Score faster' },
  { itemId: 'slow_smoke', name: 'Slow Smoke', description: 'AOE slow field', cooldown: 30, category: 'combat', effect: 'Team slow' },
  { itemId: 'potion', name: 'Potion', description: 'Restore HP', cooldown: 30, category: 'recovery', effect: 'Heal' },
];
