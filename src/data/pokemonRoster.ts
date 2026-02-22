/**
 * Complete Pokémon UNITE License Roster
 *
 * Source: Bulbapedia — List of Pokémon in Pokémon UNITE
 * https://bulbapedia.bulbagarden.net/wiki/List_of_Pok%C3%A9mon_in_Pok%C3%A9mon_UNITE
 *
 * Role, range type (melee/ranged), attack style (physical/special/mixed), difficulty,
 * and dex numbers are sourced from Bulbapedia and are accurate as of February 2026.
 *
 * Per-level stats for Pokemon NOT in the pvpoke dataset are role-based ESTIMATES.
 * They follow the same scaling formula the app uses (scale = 1 + (level-1) * 0.12).
 * Replace them with verified values from uniteapi.dev — see DATA_SOURCES.md.
 *
 * Pokemon covered by pvpoke (accurate stats): venusaur, charizard, blastoise,
 * pikachu, alolan_ninetales, wigglytuff, machamp, slowbro, gengar, mr_mime,
 * snorlax, blissey, gardevoir, absol, garchomp, lucario, mamoswine, crustle,
 * greninja, talonflame, zeraora, cinderace, eldegoss, sylveon, cramorant.
 * All other entries below use estimated stats.
 */

import { RawPokemon } from '../types/pokemon';

/** Build a 15-level stat array using the same linear scaling formula as the app. */
function s(
  hp: number,
  atk: number,
  def: number,
  sp_atk: number,
  sp_def: number,
  speed = 3700
): RawPokemon['stats'] {
  return Array.from({ length: 15 }, (_, i) => {
    const scale = 1 + i * 0.12;
    return {
      level: i + 1,
      hp: Math.round(hp * scale),
      atk: Math.round(atk * scale),
      def: Math.round(def * scale),
      sp_atk: Math.round(sp_atk * scale),
      sp_def: Math.round(sp_def * scale),
      speed,
    };
  });
}

// ── Archetype base stats (L1) by role × range × style ──────────────────────
// Derived from pvpoke sample data and cross-referenced with Unite stat ranges.
// All values are for level 1.

const ATK_SP_RNG   = s(3200, 135, 35,  270, 30);   // Attacker · Ranged · Special
const ATK_PH_RNG   = s(3400, 275, 40,  100, 35);   // Attacker · Ranged · Physical
const ATK_SP_MEL   = s(3000, 145, 40,  260, 35);   // Attacker · Melee  · Special
const DEF_PH_MEL   = s(7000, 195, 115,  90, 80);   // Defender · Melee  · Physical
const DEF_SP_RNG   = s(6500, 145,  90, 210, 85);   // Defender · Ranged · Special
const DEF_PH_RNG   = s(6800, 170, 100, 100, 80);   // Defender · Ranged · Physical
const DEF_SP_MEL   = s(6600, 145,  98, 225, 88);   // Defender · Melee  · Special
const SPD_PH_MEL   = s(3100, 285,  50, 120, 40);   // Speedster · Melee  · Physical
const SPD_SP_MEL   = s(2900, 160,  45, 315, 40);   // Speedster · Melee  · Special
const SPD_SP_RNG   = s(3200, 155,  50, 290, 45);   // Speedster · Ranged · Special
const ALL_PH_MEL   = s(4200, 265,  75, 130, 60);   // All-Rounder · Melee  · Physical
const ALL_PH_RNG   = s(4500, 255,  70, 120, 55);   // All-Rounder · Ranged · Physical
const ALL_SP_MEL   = s(4000, 140,  78, 265, 68);   // All-Rounder · Melee  · Special
const ALL_SP_RNG   = s(4200, 135,  72, 270, 62);   // All-Rounder · Ranged · Special
const SUP_SP_RNG   = s(3000, 100,  60, 195, 65);   // Supporter · Ranged · Special
const SUP_PH_MEL   = s(3500, 195,  75, 125, 68);   // Supporter · Melee  · Physical
const SUP_SP_MEL   = s(3200, 110,  65, 205, 68);   // Supporter · Melee  · Special

// ── Role-based default ratings ──────────────────────────────────────────────
const R_ATK  = { offense: 4.5, endurance: 2, mobility: 2.5, scoring: 3,   support: 1,   leveling: 3   };
const R_DEF  = { offense: 2,   endurance: 5, mobility: 1.5, scoring: 2,   support: 3,   leveling: 3   };
const R_SPD  = { offense: 4,   endurance: 2, mobility: 5,   scoring: 4,   support: 1,   leveling: 4   };
const R_ALL  = { offense: 3.5, endurance: 3, mobility: 3,   scoring: 3,   support: 1.5, leveling: 3.5 };
const R_SUP  = { offense: 1.5, endurance: 3, mobility: 2,   scoring: 2,   support: 5,   leveling: 3   };

/**
 * Full roster of all Pokémon UNITE licenses.
 * Pokemon already covered by pvpoke are included here so the merge is clean;
 * the dataService will prefer live pvpoke data over these entries.
 */
export const FULL_POKEMON_ROSTER: RawPokemon[] = [

  // ── Attacker ──────────────────────────────────────────────────────────────

  { pokemonId: 'venusaur',         dex: 3,    role: 'attacker',    type: 'ranged', style: 'special',  difficulty: 'intermediate', ratings: R_ATK, stats: ATK_SP_RNG,
    stages: [{ stageId: 'bulbasaur', level: 1 }, { stageId: 'ivysaur', level: 5 }] },

  { pokemonId: 'pikachu',          dex: 25,   role: 'attacker',    type: 'ranged', style: 'special',  difficulty: 'novice',        ratings: R_ATK, stats: ATK_SP_RNG },

  { pokemonId: 'alolan_raichu',    dex: 26,   role: 'attacker',    type: 'ranged', style: 'special',  difficulty: 'intermediate',  ratings: R_ATK, stats: ATK_SP_RNG,
    stages: [{ stageId: 'pichu', level: 1 }, { stageId: 'pikachu', level: 4 }, { stageId: 'alolan_raichu', level: 8 }] },

  { pokemonId: 'alolan_ninetales', dex: 38,   role: 'attacker',    type: 'ranged', style: 'special',  difficulty: 'novice',        ratings: R_ATK, stats: ATK_SP_RNG,
    stages: [{ stageId: 'alolan_vulpix', level: 1 }] },

  { pokemonId: 'gardevoir',        dex: 282,  role: 'attacker',    type: 'ranged', style: 'special',  difficulty: 'intermediate',  ratings: R_ATK, stats: ATK_SP_RNG,
    stages: [{ stageId: 'ralts', level: 1 }, { stageId: 'kirlia', level: 5 }] },

  { pokemonId: 'sylveon',          dex: 700,  role: 'attacker',    type: 'ranged', style: 'special',  difficulty: 'novice',        ratings: R_ATK, stats: ATK_SP_RNG,
    stages: [{ stageId: 'eevee', level: 1 }] },

  { pokemonId: 'cramorant',        dex: 845,  role: 'attacker',    type: 'ranged', style: 'special',  difficulty: 'expert',        ratings: R_ATK, stats: ATK_SP_RNG },

  { pokemonId: 'espeon',           dex: 196,  role: 'attacker',    type: 'ranged', style: 'special',  difficulty: 'intermediate',  ratings: R_ATK, stats: ATK_SP_RNG,
    stages: [{ stageId: 'eevee', level: 1 }] },

  { pokemonId: 'glaceon',          dex: 471,  role: 'attacker',    type: 'ranged', style: 'special',  difficulty: 'intermediate',  ratings: R_ATK, stats: ATK_SP_RNG,
    stages: [{ stageId: 'eevee', level: 1 }] },

  { pokemonId: 'chandelure',       dex: 609,  role: 'attacker',    type: 'ranged', style: 'special',  difficulty: 'novice',        ratings: R_ATK, stats: ATK_SP_RNG,
    stages: [{ stageId: 'litwick', level: 1 }, { stageId: 'lampent', level: 5 }] },

  { pokemonId: 'delphox',          dex: 655,  role: 'attacker',    type: 'ranged', style: 'special',  difficulty: 'intermediate',  ratings: R_ATK, stats: ATK_SP_RNG,
    stages: [{ stageId: 'fennekin', level: 1 }, { stageId: 'braixen', level: 5 }] },

  { pokemonId: 'mewtwo_y',         dex: 150,  role: 'attacker',    type: 'ranged', style: 'special',  difficulty: 'novice',        ratings: { ...R_ATK, offense: 5 }, stats: ATK_SP_RNG },

  { pokemonId: 'mew',              dex: 151,  role: 'attacker',    type: 'ranged', style: 'special',  difficulty: 'expert',        ratings: { ...R_ATK, mobility: 4 }, stats: ATK_SP_RNG },

  { pokemonId: 'latios',           dex: 381,  role: 'attacker',    type: 'ranged', style: 'special',  difficulty: 'intermediate',  ratings: { ...R_ATK, mobility: 4 }, stats: ATK_SP_RNG },

  { pokemonId: 'inteleon',         dex: 818,  role: 'attacker',    type: 'ranged', style: 'special',  difficulty: 'intermediate',  ratings: R_ATK, stats: ATK_SP_RNG,
    stages: [{ stageId: 'sobble', level: 1 }, { stageId: 'drizzile', level: 5 }] },

  { pokemonId: 'armarouge',        dex: 936,  role: 'attacker',    type: 'ranged', style: 'special',  difficulty: 'intermediate',  ratings: R_ATK, stats: ATK_SP_RNG },

  { pokemonId: 'miraidon',         dex: 1002, role: 'attacker',    type: 'ranged', style: 'special',  difficulty: 'novice',        ratings: { ...R_ATK, offense: 5 }, stats: ATK_SP_RNG },

  { pokemonId: 'greninja',         dex: 658,  role: 'attacker',    type: 'ranged', style: 'physical', difficulty: 'expert',        ratings: { ...R_ATK, mobility: 4 }, stats: ATK_PH_RNG,
    stages: [{ stageId: 'froakie', level: 1 }, { stageId: 'frogadier', level: 5 }] },

  { pokemonId: 'cinderace',        dex: 815,  role: 'attacker',    type: 'ranged', style: 'physical', difficulty: 'novice',        ratings: R_ATK, stats: ATK_PH_RNG,
    stages: [{ stageId: 'scorbunny', level: 1 }, { stageId: 'raboot', level: 5 }] },

  { pokemonId: 'decidueye',        dex: 724,  role: 'attacker',    type: 'ranged', style: 'physical', difficulty: 'intermediate',  ratings: R_ATK, stats: ATK_PH_RNG,
    stages: [{ stageId: 'rowlet', level: 1 }, { stageId: 'dartrix', level: 5 }] },

  { pokemonId: 'duraludon',        dex: 884,  role: 'attacker',    type: 'ranged', style: 'physical', difficulty: 'intermediate',  ratings: R_ATK, stats: ATK_PH_RNG },

  { pokemonId: 'dragapult',        dex: 887,  role: 'attacker',    type: 'ranged', style: 'physical', difficulty: 'intermediate',  ratings: R_ATK, stats: ATK_PH_RNG,
    stages: [{ stageId: 'dreepy', level: 1 }, { stageId: 'drakloak', level: 5 }] },

  // ── Defender ──────────────────────────────────────────────────────────────

  { pokemonId: 'blastoise',        dex: 9,    role: 'defender',    type: 'ranged', style: 'special',  difficulty: 'novice',        ratings: R_DEF, stats: DEF_SP_RNG,
    stages: [{ stageId: 'squirtle', level: 1 }, { stageId: 'wartortle', level: 5 }] },

  { pokemonId: 'slowbro',          dex: 80,   role: 'defender',    type: 'ranged', style: 'special',  difficulty: 'novice',        ratings: R_DEF, stats: DEF_SP_RNG },

  { pokemonId: 'lapras',           dex: 131,  role: 'defender',    type: 'ranged', style: 'special',  difficulty: 'intermediate',  ratings: R_DEF, stats: DEF_SP_RNG },

  { pokemonId: 'vaporeon',         dex: 134,  role: 'defender',    type: 'ranged', style: 'special',  difficulty: 'intermediate',  ratings: { ...R_DEF, support: 4 }, stats: DEF_SP_RNG,
    stages: [{ stageId: 'eevee', level: 1 }] },

  { pokemonId: 'goodra',           dex: 706,  role: 'defender',    type: 'melee',  style: 'special',  difficulty: 'intermediate',  ratings: R_DEF, stats: DEF_SP_MEL,
    stages: [{ stageId: 'goomy', level: 1 }, { stageId: 'sliggoo', level: 5 }] },

  { pokemonId: 'snorlax',          dex: 143,  role: 'defender',    type: 'melee',  style: 'physical', difficulty: 'novice',        ratings: { ...R_DEF, support: 4 }, stats: DEF_PH_MEL },

  { pokemonId: 'mamoswine',        dex: 473,  role: 'defender',    type: 'melee',  style: 'physical', difficulty: 'intermediate',  ratings: R_DEF, stats: DEF_PH_MEL,
    stages: [{ stageId: 'swinub', level: 1 }, { stageId: 'piloswine', level: 5 }] },

  { pokemonId: 'crustle',          dex: 558,  role: 'defender',    type: 'melee',  style: 'physical', difficulty: 'intermediate',  ratings: R_DEF, stats: DEF_PH_MEL,
    stages: [{ stageId: 'dwebble', level: 1 }] },

  { pokemonId: 'umbreon',          dex: 197,  role: 'defender',    type: 'melee',  style: 'physical', difficulty: 'novice',        ratings: { ...R_DEF, support: 4 }, stats: DEF_PH_MEL,
    stages: [{ stageId: 'eevee', level: 1 }] },

  { pokemonId: 'trevenant',        dex: 709,  role: 'defender',    type: 'melee',  style: 'physical', difficulty: 'intermediate',  ratings: R_DEF, stats: DEF_PH_MEL,
    stages: [{ stageId: 'phantump', level: 1 }] },

  { pokemonId: 'greedent',         dex: 820,  role: 'defender',    type: 'melee',  style: 'physical', difficulty: 'expert',        ratings: R_DEF, stats: DEF_PH_MEL,
    stages: [{ stageId: 'skwovet', level: 1 }] },

  { pokemonId: 'ho_oh',            dex: 250,  role: 'defender',    type: 'ranged', style: 'physical', difficulty: 'novice',        ratings: { ...R_DEF, offense: 3 }, stats: DEF_PH_RNG },

  // ── Speedster ─────────────────────────────────────────────────────────────

  { pokemonId: 'absol',            dex: 359,  role: 'speedster',   type: 'melee',  style: 'physical', difficulty: 'expert',        ratings: R_SPD, stats: SPD_PH_MEL },

  { pokemonId: 'zeraora',          dex: 807,  role: 'speedster',   type: 'melee',  style: 'physical', difficulty: 'intermediate',  ratings: R_SPD, stats: SPD_PH_MEL },

  { pokemonId: 'talonflame',       dex: 663,  role: 'speedster',   type: 'melee',  style: 'physical', difficulty: 'intermediate',  ratings: R_SPD, stats: SPD_PH_MEL,
    stages: [{ stageId: 'fletchling', level: 1 }, { stageId: 'fletchinder', level: 5 }] },

  { pokemonId: 'leafeon',          dex: 470,  role: 'speedster',   type: 'melee',  style: 'physical', difficulty: 'intermediate',  ratings: R_SPD, stats: SPD_PH_MEL,
    stages: [{ stageId: 'eevee', level: 1 }] },

  { pokemonId: 'dodrio',           dex: 85,   role: 'speedster',   type: 'melee',  style: 'physical', difficulty: 'expert',        ratings: R_SPD, stats: SPD_PH_MEL,
    stages: [{ stageId: 'doduo', level: 1 }] },

  { pokemonId: 'meowth',           dex: 52,   role: 'speedster',   type: 'melee',  style: 'physical', difficulty: 'intermediate',  ratings: R_SPD, stats: SPD_PH_MEL },

  { pokemonId: 'zoroark',          dex: 571,  role: 'speedster',   type: 'melee',  style: 'physical', difficulty: 'expert',        ratings: { ...R_SPD, mobility: 4 }, stats: SPD_PH_MEL,
    stages: [{ stageId: 'zorua', level: 1 }] },

  { pokemonId: 'meowscarada',      dex: 908,  role: 'speedster',   type: 'melee',  style: 'physical', difficulty: 'intermediate',  ratings: R_SPD, stats: SPD_PH_MEL,
    stages: [{ stageId: 'sprigatito', level: 1 }, { stageId: 'floragato', level: 5 }] },

  { pokemonId: 'gengar',           dex: 94,   role: 'speedster',   type: 'melee',  style: 'special',  difficulty: 'expert',        ratings: R_SPD, stats: SPD_SP_MEL,
    stages: [{ stageId: 'gastly', level: 1 }, { stageId: 'haunter', level: 5 }] },

  { pokemonId: 'darkrai',          dex: 491,  role: 'speedster',   type: 'melee',  style: 'special',  difficulty: 'expert',        ratings: R_SPD, stats: SPD_SP_MEL },

  { pokemonId: 'galarian_rapidash', dex: 78,  role: 'speedster',   type: 'ranged', style: 'special',  difficulty: 'intermediate',  ratings: { ...R_SPD, mobility: 4 }, stats: SPD_SP_RNG,
    stages: [{ stageId: 'galarian_ponyta', level: 1 }] },

  // ── All-Rounder ───────────────────────────────────────────────────────────

  { pokemonId: 'charizard',        dex: 6,    role: 'all_rounder', type: 'melee',  style: 'physical', difficulty: 'novice',        ratings: R_ALL, stats: ALL_PH_MEL,
    stages: [{ stageId: 'charmander', level: 1 }, { stageId: 'charmeleon', level: 4 }] },

  { pokemonId: 'mega_charizard_x', dex: 6,    role: 'all_rounder', type: 'melee',  style: 'physical', difficulty: 'novice',        ratings: { ...R_ALL, offense: 5 }, stats: ALL_PH_MEL },

  { pokemonId: 'mega_charizard_y', dex: 6,    role: 'all_rounder', type: 'melee',  style: 'physical', difficulty: 'novice',        ratings: { ...R_ALL, offense: 5 }, stats: ALL_PH_MEL },

  { pokemonId: 'machamp',          dex: 68,   role: 'all_rounder', type: 'melee',  style: 'physical', difficulty: 'intermediate',  ratings: R_ALL, stats: ALL_PH_MEL,
    stages: [{ stageId: 'machop', level: 1 }, { stageId: 'machoke', level: 5 }] },

  { pokemonId: 'lucario',          dex: 448,  role: 'all_rounder', type: 'melee',  style: 'physical', difficulty: 'expert',        ratings: { ...R_ALL, mobility: 4 }, stats: ALL_PH_MEL },

  { pokemonId: 'mega_lucario',     dex: 448,  role: 'all_rounder', type: 'melee',  style: 'physical', difficulty: 'expert',        ratings: { ...R_ALL, mobility: 4, offense: 5 }, stats: ALL_PH_MEL },

  { pokemonId: 'garchomp',         dex: 445,  role: 'all_rounder', type: 'melee',  style: 'physical', difficulty: 'intermediate',  ratings: R_ALL, stats: ALL_PH_MEL,
    stages: [{ stageId: 'gible', level: 1 }, { stageId: 'gabite', level: 5 }] },

  { pokemonId: 'tsareena',         dex: 763,  role: 'all_rounder', type: 'melee',  style: 'physical', difficulty: 'expert',        ratings: R_ALL, stats: ALL_PH_MEL,
    stages: [{ stageId: 'bounsweet', level: 1 }, { stageId: 'steenee', level: 5 }] },

  { pokemonId: 'azumarill',        dex: 184,  role: 'all_rounder', type: 'melee',  style: 'physical', difficulty: 'novice',        ratings: R_ALL, stats: ALL_PH_MEL,
    stages: [{ stageId: 'marill', level: 1 }] },

  { pokemonId: 'scizor',           dex: 212,  role: 'all_rounder', type: 'melee',  style: 'physical', difficulty: 'intermediate',  ratings: R_ALL, stats: ALL_PH_MEL,
    stages: [{ stageId: 'scyther', level: 1 }] },

  { pokemonId: 'tyranitar',        dex: 248,  role: 'all_rounder', type: 'melee',  style: 'physical', difficulty: 'intermediate',  ratings: R_ALL, stats: ALL_PH_MEL,
    stages: [{ stageId: 'larvitar', level: 1 }, { stageId: 'pupitar', level: 5 }] },

  { pokemonId: 'blaziken',         dex: 257,  role: 'all_rounder', type: 'melee',  style: 'physical', difficulty: 'expert',        ratings: { ...R_ALL, mobility: 4 }, stats: ALL_PH_MEL,
    stages: [{ stageId: 'torchic', level: 1 }, { stageId: 'combusken', level: 5 }] },

  { pokemonId: 'metagross',        dex: 376,  role: 'all_rounder', type: 'melee',  style: 'physical', difficulty: 'intermediate',  ratings: R_ALL, stats: ALL_PH_MEL,
    stages: [{ stageId: 'beldum', level: 1 }, { stageId: 'metang', level: 5 }] },

  { pokemonId: 'gyarados',         dex: 130,  role: 'all_rounder', type: 'melee',  style: 'physical', difficulty: 'intermediate',  ratings: R_ALL, stats: ALL_PH_MEL,
    stages: [{ stageId: 'magikarp', level: 1 }] },

  { pokemonId: 'mega_gyarados',    dex: 130,  role: 'all_rounder', type: 'melee',  style: 'physical', difficulty: 'intermediate',  ratings: { ...R_ALL, offense: 4.5 }, stats: ALL_PH_MEL,
    stages: [{ stageId: 'magikarp', level: 1 }] },

  { pokemonId: 'mewtwo_x',         dex: 150,  role: 'all_rounder', type: 'melee',  style: 'physical', difficulty: 'novice',        ratings: { ...R_ALL, offense: 5 }, stats: ALL_PH_MEL },

  { pokemonId: 'aegislash',        dex: 681,  role: 'all_rounder', type: 'melee',  style: 'physical', difficulty: 'expert',        ratings: R_ALL, stats: ALL_PH_MEL,
    stages: [{ stageId: 'honedge', level: 1 }, { stageId: 'doublade', level: 5 }] },

  { pokemonId: 'mimikyu',          dex: 778,  role: 'all_rounder', type: 'melee',  style: 'physical', difficulty: 'intermediate',  ratings: R_ALL, stats: ALL_PH_MEL },

  { pokemonId: 'dhelmise',         dex: 781,  role: 'all_rounder', type: 'melee',  style: 'physical', difficulty: 'intermediate',  ratings: R_ALL, stats: ALL_PH_MEL },

  { pokemonId: 'buzzwole',         dex: 794,  role: 'all_rounder', type: 'melee',  style: 'physical', difficulty: 'intermediate',  ratings: R_ALL, stats: ALL_PH_MEL },

  { pokemonId: 'zacian',           dex: 888,  role: 'all_rounder', type: 'melee',  style: 'physical', difficulty: 'intermediate',  ratings: { ...R_ALL, offense: 4.5 }, stats: ALL_PH_MEL },

  { pokemonId: 'urshifu',          dex: 892,  role: 'all_rounder', type: 'melee',  style: 'physical', difficulty: 'intermediate',  ratings: R_ALL, stats: ALL_PH_MEL },

  { pokemonId: 'pawmot',           dex: 923,  role: 'all_rounder', type: 'melee',  style: 'physical', difficulty: 'intermediate',  ratings: R_ALL, stats: ALL_PH_MEL,
    stages: [{ stageId: 'pawmi', level: 1 }, { stageId: 'pawmo', level: 5 }] },

  { pokemonId: 'ceruledge',        dex: 937,  role: 'all_rounder', type: 'melee',  style: 'physical', difficulty: 'intermediate',  ratings: R_ALL, stats: ALL_PH_MEL },

  { pokemonId: 'tinkaton',         dex: 959,  role: 'all_rounder', type: 'melee',  style: 'physical', difficulty: 'novice',        ratings: R_ALL, stats: ALL_PH_MEL,
    stages: [{ stageId: 'tinkatink', level: 1 }, { stageId: 'tinkatuff', level: 5 }] },

  { pokemonId: 'falinks',          dex: 875,  role: 'all_rounder', type: 'melee',  style: 'physical', difficulty: 'expert',        ratings: R_ALL, stats: ALL_PH_MEL },

  { pokemonId: 'sirfetchd',        dex: 865,  role: 'all_rounder', type: 'melee',  style: 'physical', difficulty: 'expert',        ratings: { ...R_ALL, offense: 4.5 }, stats: ALL_PH_MEL,
    stages: [{ stageId: 'galarian_farfetchd', level: 1 }] },

  { pokemonId: 'dragonite',        dex: 149,  role: 'all_rounder', type: 'ranged', style: 'physical', difficulty: 'intermediate',  ratings: { ...R_ALL, mobility: 4 }, stats: ALL_PH_RNG,
    stages: [{ stageId: 'dratini', level: 1 }, { stageId: 'dragonair', level: 5 }] },

  { pokemonId: 'empoleon',         dex: 395,  role: 'all_rounder', type: 'melee',  style: 'special',  difficulty: 'intermediate',  ratings: R_ALL, stats: ALL_SP_MEL,
    stages: [{ stageId: 'piplup', level: 1 }, { stageId: 'prinplup', level: 5 }] },

  { pokemonId: 'suicune',          dex: 245,  role: 'all_rounder', type: 'ranged', style: 'special',  difficulty: 'intermediate',  ratings: R_ALL, stats: ALL_SP_RNG },

  // ── Supporter ─────────────────────────────────────────────────────────────

  { pokemonId: 'wigglytuff',       dex: 40,   role: 'supporter',   type: 'melee',  style: 'special',  difficulty: 'intermediate',  ratings: R_SUP, stats: SUP_SP_MEL,
    stages: [{ stageId: 'igglybuff', level: 1 }, { stageId: 'jigglypuff', level: 4 }] },

  { pokemonId: 'mr_mime',          dex: 122,  role: 'supporter',   type: 'melee',  style: 'special',  difficulty: 'intermediate',  ratings: R_SUP, stats: SUP_SP_MEL },

  { pokemonId: 'blissey',          dex: 242,  role: 'supporter',   type: 'melee',  style: 'special',  difficulty: 'intermediate',  ratings: { ...R_SUP, endurance: 4 }, stats: SUP_SP_MEL,
    stages: [{ stageId: 'happiny', level: 1 }, { stageId: 'chansey', level: 4 }] },

  { pokemonId: 'clefable',         dex: 36,   role: 'supporter',   type: 'melee',  style: 'special',  difficulty: 'novice',        ratings: R_SUP, stats: SUP_SP_MEL,
    stages: [{ stageId: 'clefairy', level: 1 }] },

  { pokemonId: 'sableye',          dex: 302,  role: 'supporter',   type: 'melee',  style: 'physical', difficulty: 'intermediate',  ratings: R_SUP, stats: SUP_PH_MEL },

  { pokemonId: 'eldegoss',         dex: 830,  role: 'supporter',   type: 'ranged', style: 'special',  difficulty: 'novice',        ratings: R_SUP, stats: SUP_SP_RNG,
    stages: [{ stageId: 'gossifleur', level: 1 }] },

  { pokemonId: 'psyduck',          dex: 54,   role: 'supporter',   type: 'ranged', style: 'special',  difficulty: 'novice',        ratings: R_SUP, stats: SUP_SP_RNG },

  { pokemonId: 'hoopa',            dex: 720,  role: 'supporter',   type: 'ranged', style: 'special',  difficulty: 'expert',        ratings: { ...R_SUP, support: 5 }, stats: SUP_SP_RNG },

  { pokemonId: 'comfey',           dex: 764,  role: 'supporter',   type: 'ranged', style: 'special',  difficulty: 'novice',        ratings: R_SUP, stats: SUP_SP_RNG },

  { pokemonId: 'alcremie',         dex: 869,  role: 'supporter',   type: 'ranged', style: 'special',  difficulty: 'novice',        ratings: R_SUP, stats: SUP_SP_RNG,
    stages: [{ stageId: 'milcery', level: 1 }] },

  { pokemonId: 'latias',           dex: 380,  role: 'supporter',   type: 'ranged', style: 'special',  difficulty: 'novice',        ratings: { ...R_SUP, mobility: 4 }, stats: SUP_SP_RNG },
];

/** Set of pokemonIds that are in the live pvpoke dataset (accurate stats). */
export const PVPOKE_IDS = new Set([
  'venusaur', 'charizard', 'blastoise', 'pikachu', 'alolan_ninetales',
  'wigglytuff', 'machamp', 'slowbro', 'gengar', 'mr_mime', 'snorlax',
  'blissey', 'gardevoir', 'absol', 'garchomp', 'lucario', 'mamoswine',
  'crustle', 'greninja', 'talonflame', 'zeraora', 'cinderace',
  'eldegoss', 'sylveon', 'cramorant',
]);
