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
    stages: [{ stageId: 'pichu', level: 1 }, { stageId: 'pikachu', level: 4 }, { stageId: 'alolan_raichu', level: 8 }],
    moves: {
      basic: { boostStyle: 'special', boostCount: 4 },
      slot1: [{ moveId: 'thunder_shock', level: 1 }, { moveId: 'stored_power', upgrade: 4 }, { moveId: 'electro_ball', upgrade: 4 }],
      slot2: [{ moveId: 'thunder_wave', level: 1 }, { moveId: 'thunderbolt', upgrade: 6 }, { moveId: 'psychic', upgrade: 6 }],
      unite: { moveId: 'thunderstorm_aerial', name: 'Thunderstorm Aerial' },
    } },

  { pokemonId: 'alolan_ninetales', dex: 38,   role: 'attacker',    type: 'ranged', style: 'special',  difficulty: 'novice',        ratings: R_ATK, stats: ATK_SP_RNG,
    stages: [{ stageId: 'alolan_vulpix', level: 1 }] },

  { pokemonId: 'gardevoir',        dex: 282,  role: 'attacker',    type: 'ranged', style: 'special',  difficulty: 'intermediate',  ratings: R_ATK, stats: ATK_SP_RNG,
    stages: [{ stageId: 'ralts', level: 1 }, { stageId: 'kirlia', level: 5 }] },

  { pokemonId: 'sylveon',          dex: 700,  role: 'attacker',    type: 'ranged', style: 'special',  difficulty: 'novice',        ratings: R_ATK, stats: ATK_SP_RNG,
    stages: [{ stageId: 'eevee', level: 1 }] },

  { pokemonId: 'cramorant',        dex: 845,  role: 'attacker',    type: 'ranged', style: 'special',  difficulty: 'expert',        ratings: R_ATK, stats: ATK_SP_RNG },

  { pokemonId: 'espeon',           dex: 196,  role: 'attacker',    type: 'ranged', style: 'special',  difficulty: 'intermediate',  ratings: R_ATK, stats: ATK_SP_RNG,
    stages: [{ stageId: 'eevee', level: 1 }],
    moves: {
      basic: { boostStyle: 'special', boostCount: 3 },
      slot1: [{ moveId: 'swift', level: 1 }, { moveId: 'psyshock', upgrade: 4 }, { moveId: 'stored_power', upgrade: 4 }],
      slot2: [{ moveId: 'growl', level: 1 }, { moveId: 'psybeam', upgrade: 6 }, { moveId: 'future_sight', upgrade: 6 }],
      unite: { moveId: 'psychic_solare', name: 'Psychic Solare' },
    } },

  { pokemonId: 'glaceon',          dex: 471,  role: 'attacker',    type: 'ranged', style: 'special',  difficulty: 'intermediate',  ratings: R_ATK, stats: ATK_SP_RNG,
    stages: [{ stageId: 'eevee', level: 1 }],
    moves: {
      basic: { boostStyle: 'special', boostCount: 3 },
      slot1: [{ moveId: 'swift', level: 1 }, { moveId: 'icicle_spear', upgrade: 4 }, { moveId: 'icy_wind_glaceon', upgrade: 4 }],
      slot2: [{ moveId: 'tail_whip', level: 1 }, { moveId: 'ice_shard_glaceon', upgrade: 6 }, { moveId: 'freeze_dry', upgrade: 6 }],
      unite: { moveId: 'glacial_stage', name: 'Glacial Stage' },
    } },

  { pokemonId: 'chandelure',       dex: 609,  role: 'attacker',    type: 'ranged', style: 'special',  difficulty: 'novice',        ratings: R_ATK, stats: ATK_SP_RNG,
    stages: [{ stageId: 'litwick', level: 1 }, { stageId: 'lampent', level: 5 }],
    moves: {
      basic: { boostStyle: 'special', boostCount: 3 },
      slot1: [{ moveId: 'ember', level: 1 }, { moveId: 'flamethrower', upgrade: 5 }, { moveId: 'overheat', upgrade: 5 }],
      slot2: [{ moveId: 'night_shade', level: 1 }, { moveId: 'poltergeist', upgrade: 7 }, { moveId: 'imprison', upgrade: 7 }],
      unite: { moveId: 'ignite_midnight', name: 'Ignite Midnight' },
    } },

  { pokemonId: 'delphox',          dex: 655,  role: 'attacker',    type: 'ranged', style: 'special',  difficulty: 'intermediate',  ratings: R_ATK, stats: ATK_SP_RNG,
    stages: [{ stageId: 'fennekin', level: 1 }, { stageId: 'braixen', level: 5 }],
    moves: {
      basic: { boostStyle: 'special', boostCount: 3 },
      slot1: [{ moveId: 'ember_delphox', level: 1 }, { moveId: 'fire_blast', upgrade: 6 }, { moveId: 'mystical_fire_delphox', upgrade: 6 }],
      slot2: [{ moveId: 'will_o_wisp_delphox', level: 3 }, { moveId: 'flame_charge_delphox', upgrade: 7 }, { moveId: 'fire_spin_delphox', upgrade: 7 }],
      unite: { moveId: 'fanciful_fireworks', name: 'Fanciful Fireworks' },
    } },

  { pokemonId: 'mewtwo_y',         dex: 150,  role: 'attacker',    type: 'ranged', style: 'special',  difficulty: 'novice',        ratings: { ...R_ATK, offense: 5 }, stats: ATK_SP_RNG,
    moves: {
      basic: { boostStyle: 'special', boostCount: 3 },
      slot1: [{ moveId: 'confusion_mewtwo', level: 1 }, { moveId: 'future_sight', upgrade: 5 }, { moveId: 'psystrike', upgrade: 5 }],
      slot2: [{ moveId: 'barrier', level: 1 }, { moveId: 'recover', upgrade: 7 }, { moveId: 'teleport', upgrade: 7 }],
      unite: { moveId: 'infinite_psyburn', name: 'Infinite Psyburn' },
    } },

  { pokemonId: 'mew',              dex: 151,  role: 'attacker',    type: 'ranged', style: 'special',  difficulty: 'expert',        ratings: { ...R_ATK, mobility: 4 }, stats: ATK_SP_RNG,
    moves: {
      basic: { boostStyle: 'special', boostCount: 3 },
      slot1: [
        { moveId: 'electro_ball_mew', level: 1 }, { moveId: 'solar_beam_mew', level: 1 }, { moveId: 'surf_mew', level: 1 },
        { moveId: 'electro_ball_mew', upgrade: 10 }, { moveId: 'solar_beam_mew', upgrade: 10 }, { moveId: 'surf_mew', upgrade: 10 },
      ],
      slot2: [
        { moveId: 'coaching', level: 3 }, { moveId: 'light_screen_mew', level: 3 }, { moveId: 'agility_mew', level: 3 },
        { moveId: 'coaching', upgrade: 12 }, { moveId: 'light_screen_mew', upgrade: 12 }, { moveId: 'agility_mew', upgrade: 12 },
      ],
      unite: { moveId: 'mystical_mirage', name: 'Mystical Mirage' },
    } },

  { pokemonId: 'latios',           dex: 381,  role: 'attacker',    type: 'ranged', style: 'special',  difficulty: 'intermediate',  ratings: { ...R_ATK, mobility: 4 }, stats: ATK_SP_RNG,
    moves: {
      basic: { boostStyle: 'special', boostCount: 3 },
      slot1: [{ moveId: 'confusion_latios', level: 1 }, { moveId: 'luster_purge', upgrade: 7 }, { moveId: 'telekinesis_latios', upgrade: 7 }],
      slot2: [{ moveId: 'swift_latios', level: 1 }, { moveId: 'dragon_pulse_latios', upgrade: 5 }, { moveId: 'draco_meteor', upgrade: 5 }],
      unite: { moveId: 'eon_blast', name: 'Eon Blast' },
    } },

  { pokemonId: 'inteleon',         dex: 818,  role: 'attacker',    type: 'ranged', style: 'special',  difficulty: 'intermediate',  ratings: R_ATK, stats: ATK_SP_RNG,
    stages: [{ stageId: 'sobble', level: 1 }, { stageId: 'drizzile', level: 5 }],
    moves: {
      basic: { boostStyle: 'physical', boostCount: 3 },
      slot1: [{ moveId: 'tearful_look', level: 1 }, { moveId: 'fell_stinger', upgrade: 5 }, { moveId: 'acrobatics_inteleon', upgrade: 5 }],
      slot2: [{ moveId: 'water_gun_inteleon', level: 1 }, { moveId: 'snipe_shot', upgrade: 7 }, { moveId: 'liquidation', upgrade: 7 }],
      unite: { moveId: 'azure_spy_vision', name: 'Azure Spy Vision' },
    } },

  { pokemonId: 'armarouge',        dex: 936,  role: 'attacker',    type: 'ranged', style: 'special',  difficulty: 'intermediate',  ratings: R_ATK, stats: ATK_SP_RNG,
    moves: {
      basic: { boostStyle: 'special', boostCount: 3 },
      slot1: [{ moveId: 'incinerate', level: 1 }, { moveId: 'armor_cannon', upgrade: 5 }, { moveId: 'fire_spin_armarouge', upgrade: 5 }],
      slot2: [{ moveId: 'will_o_wisp_armarouge', level: 3 }, { moveId: 'flame_charge_armarouge', upgrade: 7 }, { moveId: 'psyshock_armarouge', upgrade: 7 }],
      unite: { moveId: 'psykaboom', name: 'Psykaboom' },
    } },

  { pokemonId: 'miraidon',         dex: 1002, role: 'attacker',    type: 'ranged', style: 'special',  difficulty: 'novice',        ratings: { ...R_ATK, offense: 5 }, stats: ATK_SP_RNG,
    moves: {
      basic: { boostStyle: 'special', boostCount: 0 },
      slot1: [{ moveId: 'thunder_shock_miraidon', level: 1 }, { moveId: 'charge_beam', upgrade: 5 }, { moveId: 'electro_drift', upgrade: 5 }],
      slot2: [{ moveId: 'thunder_wave_miraidon', level: 1 }, { moveId: 'thunder_miraidon', upgrade: 7 }, { moveId: 'parabolic_charge', upgrade: 7 }],
      unite: { moveId: 'bright_future_meteor_storm', name: 'Bright Future Meteor Storm' },
    } },

  { pokemonId: 'greninja',         dex: 658,  role: 'attacker',    type: 'ranged', style: 'physical', difficulty: 'expert',        ratings: { ...R_ATK, mobility: 4 }, stats: ATK_PH_RNG,
    stages: [{ stageId: 'froakie', level: 1 }, { stageId: 'frogadier', level: 5 }] },

  { pokemonId: 'cinderace',        dex: 815,  role: 'attacker',    type: 'ranged', style: 'physical', difficulty: 'novice',        ratings: R_ATK, stats: ATK_PH_RNG,
    stages: [{ stageId: 'scorbunny', level: 1 }, { stageId: 'raboot', level: 5 }] },

  { pokemonId: 'decidueye',        dex: 724,  role: 'attacker',    type: 'ranged', style: 'physical', difficulty: 'intermediate',  ratings: R_ATK, stats: ATK_PH_RNG,
    stages: [{ stageId: 'rowlet', level: 1 }, { stageId: 'dartrix', level: 5 }],
    moves: {
      basic: { boostStyle: 'physical', boostCount: 3 },
      slot1: [{ moveId: 'leafage', level: 1 }, { moveId: 'razor_leaf', upgrade: 7 }, { moveId: 'spirit_shackle', upgrade: 7 }],
      slot2: [{ moveId: 'astonish_decidueye', level: 1 }, { moveId: 'leaf_storm', upgrade: 8 }, { moveId: 'shadow_sneak', upgrade: 8 }],
      unite: { moveId: 'nock_nock', name: 'Nock Nock' },
    } },

  { pokemonId: 'duraludon',        dex: 884,  role: 'attacker',    type: 'ranged', style: 'special',  difficulty: 'intermediate',  ratings: R_ATK, stats: ATK_SP_RNG,
    moves: {
      basic: { boostStyle: 'special', boostCount: 3 },
      slot1: [{ moveId: 'laser_focus', level: 1 }, { moveId: 'flash_cannon', upgrade: 5 }, { moveId: 'dragon_pulse', upgrade: 5 }],
      slot2: [{ moveId: 'metal_claw', level: 1 }, { moveId: 'dragon_tail', upgrade: 7 }, { moveId: 'stealth_rock', upgrade: 7 }],
      unite: { moveId: 'revolving_ruin', name: 'Revolving Ruin' },
    } },

  { pokemonId: 'dragapult',        dex: 887,  role: 'attacker',    type: 'ranged', style: 'physical', difficulty: 'intermediate',  ratings: R_ATK, stats: ATK_PH_RNG,
    stages: [{ stageId: 'dreepy', level: 1 }, { stageId: 'drakloak', level: 5 }],
    moves: {
      basic: { boostStyle: 'physical', boostCount: 3 },
      slot1: [{ moveId: 'astonish', level: 1 }, { moveId: 'dragon_breath', upgrade: 7 }, { moveId: 'shadow_ball_dragapult', upgrade: 7 }],
      slot2: [{ moveId: 'quick_attack', level: 1 }, { moveId: 'dragon_dance', upgrade: 5 }, { moveId: 'phantom_force', upgrade: 5 }],
      unite: { moveId: 'dreep_and_destroy', name: 'Dreep and Destroy' },
    } },

  // ── Defender ──────────────────────────────────────────────────────────────

  { pokemonId: 'blastoise',        dex: 9,    role: 'defender',    type: 'ranged', style: 'special',  difficulty: 'novice',        ratings: R_DEF, stats: DEF_SP_RNG,
    stages: [{ stageId: 'squirtle', level: 1 }, { stageId: 'wartortle', level: 5 }] },

  { pokemonId: 'slowbro',          dex: 80,   role: 'defender',    type: 'ranged', style: 'special',  difficulty: 'novice',        ratings: R_DEF, stats: DEF_SP_RNG },

  { pokemonId: 'lapras',           dex: 131,  role: 'defender',    type: 'ranged', style: 'special',  difficulty: 'intermediate',  ratings: R_DEF, stats: DEF_SP_RNG,
    moves: {
      basic: { boostStyle: 'special', boostCount: 3 },
      slot1: [{ moveId: 'whirlpool', level: 1 }, { moveId: 'water_pulse', upgrade: 4 }, { moveId: 'perish_song', upgrade: 4 }],
      slot2: [{ moveId: 'ice_shard', level: 1 }, { moveId: 'bubble_beam', upgrade: 6 }, { moveId: 'ice_beam', upgrade: 6 }],
      unite: { moveId: 'lapras_express', name: 'Lapras Express' },
    } },

  { pokemonId: 'vaporeon',         dex: 134,  role: 'defender',    type: 'ranged', style: 'special',  difficulty: 'intermediate',  ratings: { ...R_DEF, support: 4 }, stats: DEF_SP_RNG,
    stages: [{ stageId: 'eevee', level: 1 }],
    moves: {
      basic: { boostStyle: 'special', boostCount: 3 },
      slot1: [{ moveId: 'swift', level: 1 }, { moveId: 'hydro_pump', upgrade: 4 }, { moveId: 'muddy_water', upgrade: 4 }],
      slot2: [{ moveId: 'tackle', level: 1 }, { moveId: 'aqua_ring', upgrade: 6 }, { moveId: 'flip_turn', upgrade: 6 }],
      unite: { moveId: 'aquamarine_splash', name: 'Aquamarine Splash' },
    } },

  { pokemonId: 'goodra',           dex: 706,  role: 'defender',    type: 'melee',  style: 'special',  difficulty: 'intermediate',  ratings: R_DEF, stats: DEF_SP_MEL,
    stages: [{ stageId: 'goomy', level: 1 }, { stageId: 'sliggoo', level: 5 }],
    moves: {
      basic: { boostStyle: 'physical', boostCount: 3 },
      slot1: [{ moveId: 'bubble', level: 1 }, { moveId: 'muddy_water', upgrade: 5 }, { moveId: 'dragon_pulse', upgrade: 5 }],
      slot2: [{ moveId: 'tackle', level: 1 }, { moveId: 'power_whip', upgrade: 7 }, { moveId: 'acid_spray', upgrade: 7 }],
      unite: { moveId: 'right_as_rain', name: 'Right as Rain' },
    } },

  { pokemonId: 'snorlax',          dex: 143,  role: 'defender',    type: 'melee',  style: 'physical', difficulty: 'novice',        ratings: { ...R_DEF, support: 4 }, stats: DEF_PH_MEL },

  { pokemonId: 'mamoswine',        dex: 473,  role: 'defender',    type: 'melee',  style: 'physical', difficulty: 'intermediate',  ratings: R_DEF, stats: DEF_PH_MEL,
    stages: [{ stageId: 'swinub', level: 1 }, { stageId: 'piloswine', level: 5 }] },

  { pokemonId: 'crustle',          dex: 558,  role: 'defender',    type: 'melee',  style: 'physical', difficulty: 'intermediate',  ratings: R_DEF, stats: DEF_PH_MEL,
    stages: [{ stageId: 'dwebble', level: 1 }] },

  { pokemonId: 'umbreon',          dex: 197,  role: 'defender',    type: 'melee',  style: 'physical', difficulty: 'novice',        ratings: { ...R_DEF, support: 4 }, stats: DEF_PH_MEL,
    stages: [{ stageId: 'eevee', level: 1 }],
    moves: {
      basic: { boostStyle: 'physical', boostCount: 3 },
      slot1: [{ moveId: 'swift', level: 1 }, { moveId: 'mean_look', upgrade: 4 }, { moveId: 'foul_play', upgrade: 4 }],
      slot2: [{ moveId: 'fake_tears', level: 1 }, { moveId: 'wish', upgrade: 6 }, { moveId: 'snarl', upgrade: 6 }],
      unite: { moveId: 'moonlight_prance', name: 'Moonlight Prance' },
    } },

  { pokemonId: 'trevenant',        dex: 709,  role: 'defender',    type: 'melee',  style: 'physical', difficulty: 'intermediate',  ratings: R_DEF, stats: DEF_PH_MEL,
    stages: [{ stageId: 'phantump', level: 1 }],
    moves: {
      basic: { boostStyle: 'physical', boostCount: 3 },
      slot1: [{ moveId: 'will_o_wisp', level: 1 }, { moveId: 'wood_hammer', upgrade: 5 }, { moveId: 'curse', upgrade: 5 }],
      slot2: [{ moveId: 'branch_poke', level: 1 }, { moveId: 'horn_leech', upgrade: 7 }, { moveId: 'pain_split', upgrade: 7 }],
      unite: { moveId: 'phantom_forest', name: 'Phantom Forest' },
    } },

  { pokemonId: 'greedent',         dex: 820,  role: 'defender',    type: 'melee',  style: 'physical', difficulty: 'expert',        ratings: R_DEF, stats: DEF_PH_MEL,
    stages: [{ stageId: 'skwovet', level: 1 }],
    moves: {
      basic: { boostStyle: 'physical', boostCount: 3 },
      slot1: [{ moveId: 'tackle', level: 1 }, { moveId: 'bullet_seed', upgrade: 7 }, { moveId: 'belch', upgrade: 7 }],
      slot2: [{ moveId: 'defense_curl', level: 1 }, { moveId: 'stuff_cheeks', upgrade: 5 }, { moveId: 'covet', upgrade: 5 }],
      unite: { moveId: 'berry_belly_flop', name: 'Berry Belly Flop' },
    } },

  { pokemonId: 'ho_oh',            dex: 250,  role: 'defender',    type: 'ranged', style: 'physical', difficulty: 'novice',        ratings: { ...R_DEF, offense: 3 }, stats: DEF_PH_RNG,
    moves: {
      basic: { boostStyle: 'physical', boostCount: 3 },
      slot1: [{ moveId: 'safeguard_ho_oh', level: 1 }, { moveId: 'sacred_fire', upgrade: 7 }, { moveId: 'fire_spin_ho_oh', upgrade: 7 }],
      slot2: [{ moveId: 'tailwind', level: 1 }, { moveId: 'flamethrower_ho_oh', upgrade: 5 }, { moveId: 'sky_attack', upgrade: 5 }],
      unite: { moveId: 'rekindling_flame', name: 'Rekindling Flame' },
    } },

  // ── Speedster ─────────────────────────────────────────────────────────────

  { pokemonId: 'absol',            dex: 359,  role: 'speedster',   type: 'melee',  style: 'physical', difficulty: 'expert',        ratings: R_SPD, stats: SPD_PH_MEL },

  { pokemonId: 'zeraora',          dex: 807,  role: 'speedster',   type: 'melee',  style: 'physical', difficulty: 'intermediate',  ratings: R_SPD, stats: SPD_PH_MEL },

  { pokemonId: 'talonflame',       dex: 663,  role: 'speedster',   type: 'melee',  style: 'physical', difficulty: 'intermediate',  ratings: R_SPD, stats: SPD_PH_MEL,
    stages: [{ stageId: 'fletchling', level: 1 }, { stageId: 'fletchinder', level: 5 }] },

  { pokemonId: 'leafeon',          dex: 470,  role: 'speedster',   type: 'melee',  style: 'physical', difficulty: 'intermediate',  ratings: R_SPD, stats: SPD_PH_MEL,
    stages: [{ stageId: 'eevee', level: 1 }],
    moves: {
      basic: { boostStyle: 'physical', boostCount: 3 },
      slot1: [{ moveId: 'swift', level: 1 }, { moveId: 'razor_leaf', upgrade: 4 }, { moveId: 'solar_blade', upgrade: 4 }],
      slot2: [{ moveId: 'quick_attack_leafeon', level: 1 }, { moveId: 'aerial_ace', upgrade: 6 }, { moveId: 'leaf_blade', upgrade: 6 }],
      unite: { moveId: 'emerald_two_step', name: 'Emerald Two-Step' },
    } },

  { pokemonId: 'dodrio',           dex: 85,   role: 'speedster',   type: 'melee',  style: 'physical', difficulty: 'expert',        ratings: R_SPD, stats: SPD_PH_MEL,
    stages: [{ stageId: 'doduo', level: 1 }],
    moves: {
      basic: { boostStyle: 'physical', boostCount: 3 },
      slot1: [{ moveId: 'peck', level: 1 }, { moveId: 'tri_attack', upgrade: 5 }, { moveId: 'drill_peck', upgrade: 5 }],
      slot2: [{ moveId: 'quick_attack_dodrio', level: 1 }, { moveId: 'agility_dodrio', upgrade: 7 }, { moveId: 'jump_kick', upgrade: 7 }],
      unite: { moveId: 'triple_trample', name: 'Triple Trample' },
    } },

  { pokemonId: 'meowth',           dex: 52,   role: 'speedster',   type: 'melee',  style: 'physical', difficulty: 'intermediate',  ratings: R_SPD, stats: SPD_PH_MEL,
    moves: {
      basic: { boostStyle: 'physical', boostCount: 3 },
      slot1: [{ moveId: 'scratch', level: 1 }, { moveId: 'pay_day', upgrade: 5 }, { moveId: 'fury_swipes_meowth', upgrade: 5 }],
      slot2: [{ moveId: 'feint_meowth', level: 1 }, { moveId: 'feint_attack_meowth', upgrade: 7 }, { moveId: 'assurance', upgrade: 7 }],
      unite: { moveId: 'gold_coin_barrage', name: 'Gold Coin Barrage' },
    } },

  { pokemonId: 'zoroark',          dex: 571,  role: 'speedster',   type: 'melee',  style: 'physical', difficulty: 'expert',        ratings: { ...R_SPD, mobility: 4 }, stats: SPD_PH_MEL,
    stages: [{ stageId: 'zorua', level: 1 }],
    moves: {
      basic: { boostStyle: 'physical', boostCount: 3 },
      slot1: [{ moveId: 'slash_zoroark', level: 1 }, { moveId: 'shadow_claw', upgrade: 7 }, { moveId: 'cut', upgrade: 7 }],
      slot2: [{ moveId: 'fury_swipes_zoroark', level: 1 }, { moveId: 'night_slash_zoroark', upgrade: 5 }, { moveId: 'feint_attack_zoroark', upgrade: 5 }],
      unite: { moveId: 'nightfall_daze', name: 'Nightfall Daze' },
    } },

  { pokemonId: 'meowscarada',      dex: 908,  role: 'speedster',   type: 'melee',  style: 'physical', difficulty: 'intermediate',  ratings: R_SPD, stats: SPD_PH_MEL,
    stages: [{ stageId: 'sprigatito', level: 1 }, { stageId: 'floragato', level: 5 }],
    moves: {
      basic: { boostStyle: 'physical', boostCount: 3 },
      slot1: [{ moveId: 'leafage', level: 1 }, { moveId: 'flower_trick', upgrade: 6 }, { moveId: 'night_slash', upgrade: 6 }],
      slot2: [{ moveId: 'hone_claws', level: 1 }, { moveId: 'double_team', upgrade: 7 }, { moveId: 'trailblaze', upgrade: 7 }],
      unite: { moveId: 'floral_flourish', name: 'Floral Flourish' },
    } },

  { pokemonId: 'gengar',           dex: 94,   role: 'speedster',   type: 'melee',  style: 'special',  difficulty: 'expert',        ratings: R_SPD, stats: SPD_SP_MEL,
    stages: [{ stageId: 'gastly', level: 1 }, { stageId: 'haunter', level: 5 }] },

  { pokemonId: 'darkrai',          dex: 491,  role: 'speedster',   type: 'melee',  style: 'special',  difficulty: 'expert',        ratings: R_SPD, stats: SPD_SP_MEL,
    moves: {
      basic: { boostStyle: 'special', boostCount: 0 },
      slot1: [{ moveId: 'hypnosis', level: 1 }, { moveId: 'dark_void', upgrade: 5 }, { moveId: 'shadow_claw', upgrade: 5 }],
      slot2: [{ moveId: 'calm_mind', level: 1 }, { moveId: 'nasty_plot', upgrade: 7 }, { moveId: 'dark_pulse', upgrade: 7 }],
      unite: { moveId: 'worst_nightmare', name: 'Worst Nightmare' },
    } },

  { pokemonId: 'galarian_rapidash', dex: 78,  role: 'speedster',   type: 'ranged', style: 'special',  difficulty: 'intermediate',  ratings: { ...R_SPD, mobility: 4 }, stats: SPD_SP_RNG,
    stages: [{ stageId: 'galarian_ponyta', level: 1 }],
    moves: {
      basic: { boostStyle: 'special', boostCount: 3 },
      slot1: [{ moveId: 'confusion', level: 1 }, { moveId: 'dazzling_gleam', upgrade: 5 }, { moveId: 'fairy_wind', upgrade: 5 }],
      slot2: [{ moveId: 'tackle_rapidash', level: 1 }, { moveId: 'smart_strike', upgrade: 7 }, { moveId: 'agility', upgrade: 7 }],
      unite: { moveId: 'triad_blitz', name: 'Triad Blitz' },
    } },

  // ── All-Rounder ───────────────────────────────────────────────────────────

  { pokemonId: 'charizard',        dex: 6,    role: 'all_rounder', type: 'melee',  style: 'physical', difficulty: 'novice',        ratings: R_ALL, stats: ALL_PH_MEL,
    stages: [{ stageId: 'charmander', level: 1 }, { stageId: 'charmeleon', level: 4 }] },

  { pokemonId: 'mega_charizard_x', dex: 6,    role: 'all_rounder', type: 'melee',  style: 'physical', difficulty: 'novice',        ratings: { ...R_ALL, offense: 5 }, stats: ALL_PH_MEL,
    moves: {
      basic: { boostStyle: 'physical', boostCount: 3 },
      slot1: [{ moveId: 'flame_burst', level: 1 }, { moveId: 'flamethrower', upgrade: 5 }, { moveId: 'flare_blitz', upgrade: 5 }],
      slot2: [{ moveId: 'ember', level: 1 }, { moveId: 'fire_spin', upgrade: 7 }, { moveId: 'fire_punch', upgrade: 7 }],
      unite: { moveId: 'seismic_slam', name: 'Seismic Slam' },
    } },

  { pokemonId: 'mega_charizard_y', dex: 6,    role: 'all_rounder', type: 'melee',  style: 'physical', difficulty: 'novice',        ratings: { ...R_ALL, offense: 5 }, stats: ALL_PH_MEL,
    moves: {
      basic: { boostStyle: 'special', boostCount: 3 },
      slot1: [{ moveId: 'flame_burst', level: 1 }, { moveId: 'flamethrower', upgrade: 5 }, { moveId: 'flare_blitz', upgrade: 5 }],
      slot2: [{ moveId: 'ember', level: 1 }, { moveId: 'fire_spin', upgrade: 7 }, { moveId: 'fire_punch', upgrade: 7 }],
      unite: { moveId: 'seismic_slam', name: 'Seismic Slam' },
    } },

  { pokemonId: 'machamp',          dex: 68,   role: 'all_rounder', type: 'melee',  style: 'physical', difficulty: 'intermediate',  ratings: R_ALL, stats: ALL_PH_MEL,
    stages: [{ stageId: 'machop', level: 1 }, { stageId: 'machoke', level: 5 }] },

  { pokemonId: 'lucario',          dex: 448,  role: 'all_rounder', type: 'melee',  style: 'physical', difficulty: 'expert',        ratings: { ...R_ALL, mobility: 4 }, stats: ALL_PH_MEL },

  { pokemonId: 'mega_lucario',     dex: 448,  role: 'all_rounder', type: 'melee',  style: 'physical', difficulty: 'expert',        ratings: { ...R_ALL, mobility: 4, offense: 5 }, stats: ALL_PH_MEL,
    moves: {
      basic: { boostStyle: 'physical', boostCount: 3 },
      slot1: [{ moveId: 'bone_rush', level: 1 }, { moveId: 'meteor_mash', upgrade: 5 }, { moveId: 'power_up_punch', upgrade: 5 }],
      slot2: [{ moveId: 'extreme_speed', level: 1 }, { moveId: 'close_combat_lucario', upgrade: 7 }],
      unite: { moveId: 'aura_cannon', name: 'Aura Cannon' },
    } },

  { pokemonId: 'garchomp',         dex: 445,  role: 'all_rounder', type: 'melee',  style: 'physical', difficulty: 'intermediate',  ratings: R_ALL, stats: ALL_PH_MEL,
    stages: [{ stageId: 'gible', level: 1 }, { stageId: 'gabite', level: 5 }] },

  { pokemonId: 'tsareena',         dex: 763,  role: 'all_rounder', type: 'melee',  style: 'physical', difficulty: 'expert',        ratings: R_ALL, stats: ALL_PH_MEL,
    stages: [{ stageId: 'bounsweet', level: 1 }, { stageId: 'steenee', level: 5 }],
    moves: {
      basic: { boostStyle: 'physical', boostCount: 3 },
      slot1: [{ moveId: 'razor_leaf', level: 1 }, { moveId: 'triple_axel', upgrade: 5 }, { moveId: 'stomp', upgrade: 5 }],
      slot2: [{ moveId: 'rapid_spin', level: 1 }, { moveId: 'trop_kick', upgrade: 6 }, { moveId: 'grassy_glide', upgrade: 6 }],
      unite: { moveId: 'queen_ascendant', name: 'Queen Ascendant' },
    } },

  { pokemonId: 'azumarill',        dex: 184,  role: 'all_rounder', type: 'melee',  style: 'physical', difficulty: 'novice',        ratings: R_ALL, stats: ALL_PH_MEL,
    stages: [{ stageId: 'marill', level: 1 }],
    moves: {
      basic: { boostStyle: 'physical', boostCount: 3 },
      slot1: [{ moveId: 'tackle_azumarill', level: 1 }, { moveId: 'whirlpool', upgrade: 4 }, { moveId: 'aqua_tail', upgrade: 4 }],
      slot2: [{ moveId: 'bubble', level: 1 }, { moveId: 'play_rough', upgrade: 6 }, { moveId: 'water_pulse', upgrade: 6 }],
      unite: { moveId: 'belly_bash', name: 'Belly Bash' },
    } },

  { pokemonId: 'scizor',           dex: 212,  role: 'all_rounder', type: 'melee',  style: 'physical', difficulty: 'intermediate',  ratings: R_ALL, stats: ALL_PH_MEL,
    stages: [{ stageId: 'scyther', level: 1 }],
    moves: {
      basic: { boostStyle: 'physical', boostCount: 3 },
      slot1: [{ moveId: 'fury_cutter', level: 1 }, { moveId: 'dual_wingbeat', upgrade: 5 }, { moveId: 'bullet_punch', upgrade: 5 }],
      slot2: [{ moveId: 'quick_attack', level: 1 }, { moveId: 'double_hit', upgrade: 7 }, { moveId: 'swords_dance', upgrade: 7 }],
      unite: { moveId: 'red_illusion_dive', name: 'Red Illusion Dive' },
    } },

  { pokemonId: 'tyranitar',        dex: 248,  role: 'all_rounder', type: 'melee',  style: 'physical', difficulty: 'intermediate',  ratings: R_ALL, stats: ALL_PH_MEL,
    stages: [{ stageId: 'larvitar', level: 1 }, { stageId: 'pupitar', level: 5 }],
    moves: {
      basic: { boostStyle: 'physical', boostCount: 3 },
      slot1: [{ moveId: 'bite', level: 1 }, { moveId: 'dark_pulse', upgrade: 5 }, { moveId: 'stone_edge', upgrade: 5 }],
      slot2: [{ moveId: 'rock_polish', level: 1 }, { moveId: 'ancient_power', upgrade: 9 }, { moveId: 'sand_tomb', upgrade: 9 }],
      unite: { moveId: 'tyrannical_rampage', name: 'Tyrannical Rampage' },
    } },

  { pokemonId: 'blaziken',         dex: 257,  role: 'all_rounder', type: 'melee',  style: 'physical', difficulty: 'expert',        ratings: { ...R_ALL, mobility: 4 }, stats: ALL_PH_MEL,
    stages: [{ stageId: 'torchic', level: 1 }, { stageId: 'combusken', level: 5 }],
    moves: {
      basic: { boostStyle: 'physical', boostCount: 3 },
      slot1: [{ moveId: 'aerial_ace', level: 1 }, { moveId: 'overheat', upgrade: 7 }, { moveId: 'fire_punch', upgrade: 7 }],
      slot2: [{ moveId: 'ember', level: 1 }, { moveId: 'blaze_kick', upgrade: 5 }, { moveId: 'focus_blast', upgrade: 5 }],
      unite: { moveId: 'spinning_flame_kick', name: 'Spinning Flame Kick' },
    } },

  { pokemonId: 'metagross',        dex: 376,  role: 'all_rounder', type: 'melee',  style: 'physical', difficulty: 'intermediate',  ratings: R_ALL, stats: ALL_PH_MEL,
    stages: [{ stageId: 'beldum', level: 1 }, { stageId: 'metang', level: 5 }],
    moves: {
      basic: { boostStyle: 'physical', boostCount: 3 },
      slot1: [{ moveId: 'iron_defense', level: 1 }, { moveId: 'meteor_mash_metagross', upgrade: 5 }, { moveId: 'gyro_ball', upgrade: 5 }],
      slot2: [{ moveId: 'tackle_metagross', level: 1 }, { moveId: 'zen_headbutt', upgrade: 7 }, { moveId: 'magnet_rise', upgrade: 7 }],
      unite: { moveId: 'compute_and_crush', name: 'Compute and Crush' },
    } },

  { pokemonId: 'gyarados',         dex: 130,  role: 'all_rounder', type: 'melee',  style: 'physical', difficulty: 'intermediate',  ratings: R_ALL, stats: ALL_PH_MEL,
    stages: [{ stageId: 'magikarp', level: 1 }],
    moves: {
      basic: { boostStyle: 'physical', boostCount: 3 },
      slot1: [{ moveId: 'flail_gyarados', level: 1 }, { moveId: 'dragon_breath', upgrade: 7 }, { moveId: 'aqua_tail', upgrade: 7 }],
      slot2: [{ moveId: 'splash', level: 1 }, { moveId: 'waterfall', upgrade: 7 }, { moveId: 'bounce', upgrade: 7 }],
      unite: { moveId: 'dragon_current', name: 'Dragon Current' },
    } },

  { pokemonId: 'mega_gyarados',    dex: 130,  role: 'all_rounder', type: 'melee',  style: 'physical', difficulty: 'intermediate',  ratings: { ...R_ALL, offense: 4.5 }, stats: ALL_PH_MEL,
    stages: [{ stageId: 'magikarp', level: 1 }],
    moves: {
      basic: { boostStyle: 'physical', boostCount: 3 },
      slot1: [{ moveId: 'flail_gyarados', level: 1 }, { moveId: 'dragon_breath', upgrade: 7 }, { moveId: 'aqua_tail', upgrade: 7 }],
      slot2: [{ moveId: 'splash', level: 1 }, { moveId: 'waterfall', upgrade: 7 }, { moveId: 'bounce', upgrade: 7 }],
      unite: { moveId: 'dragon_current', name: 'Dragon Current' },
    } },

  { pokemonId: 'mewtwo_x',         dex: 150,  role: 'all_rounder', type: 'melee',  style: 'physical', difficulty: 'novice',        ratings: { ...R_ALL, offense: 5 }, stats: ALL_PH_MEL,
    moves: {
      basic: { boostStyle: 'physical', boostCount: 3 },
      slot1: [{ moveId: 'confusion_mewtwo', level: 1 }, { moveId: 'future_sight', upgrade: 5 }, { moveId: 'psystrike', upgrade: 5 }],
      slot2: [{ moveId: 'barrier', level: 1 }, { moveId: 'recover', upgrade: 7 }, { moveId: 'teleport', upgrade: 7 }],
      unite: { moveId: 'infinite_psyburn', name: 'Infinite Psyburn' },
    } },

  { pokemonId: 'aegislash',        dex: 681,  role: 'all_rounder', type: 'melee',  style: 'physical', difficulty: 'expert',        ratings: R_ALL, stats: ALL_PH_MEL,
    stages: [{ stageId: 'honedge', level: 1 }, { stageId: 'doublade', level: 5 }],
    moves: {
      basic: { boostStyle: 'physical', boostCount: 3 },
      slot1: [{ moveId: 'shadow_sneak', level: 1 }, { moveId: 'sacred_sword', upgrade: 5 }, { moveId: 'shadow_claw_aegislash', upgrade: 5 }],
      slot2: [{ moveId: 'iron_defense', level: 1 }, { moveId: 'wide_guard', upgrade: 7 }, { moveId: 'iron_head', upgrade: 7 }],
      unite: { moveId: 'coup_de_grace', name: 'Coup de Grâce' },
    } },

  { pokemonId: 'mimikyu',          dex: 778,  role: 'all_rounder', type: 'melee',  style: 'physical', difficulty: 'intermediate',  ratings: R_ALL, stats: ALL_PH_MEL,
    moves: {
      basic: { boostStyle: 'physical', boostCount: 3 },
      slot1: [{ moveId: 'astonish', level: 1 }, { moveId: 'play_rough', upgrade: 5 }, { moveId: 'shadow_claw', upgrade: 5 }],
      slot2: [{ moveId: 'scratch', level: 1 }, { moveId: 'shadow_sneak_mimikyu', upgrade: 7 }, { moveId: 'trick_room', upgrade: 7 }],
      unite: { moveId: 'play_with_me', name: 'Play With Me...' },
    } },

  { pokemonId: 'dhelmise',         dex: 781,  role: 'all_rounder', type: 'melee',  style: 'physical', difficulty: 'intermediate',  ratings: R_ALL, stats: ALL_PH_MEL,
    moves: {
      basic: { boostStyle: 'physical', boostCount: 1 },
      slot1: [{ moveId: 'payback', level: 1 }, { moveId: 'power_whip', upgrade: 5 }, { moveId: 'whirlpool_dhelmise', upgrade: 5 }],
      slot2: [{ moveId: 'bulldoze_dhelmise', level: 1 }, { moveId: 'anchor_shot', upgrade: 7 }, { moveId: 'heavy_slam_dhelmise', upgrade: 7 }],
      unite: { moveId: 'seaweed_snare', name: 'Seaweed Snare' },
    } },

  { pokemonId: 'buzzwole',         dex: 794,  role: 'all_rounder', type: 'melee',  style: 'physical', difficulty: 'intermediate',  ratings: R_ALL, stats: ALL_PH_MEL,
    moves: {
      basic: { boostStyle: 'physical', boostCount: 3 },
      slot1: [{ moveId: 'mega_punch', level: 1 }, { moveId: 'lunge', upgrade: 7 }, { moveId: 'smack_down', upgrade: 7 }],
      slot2: [{ moveId: 'fell_stinger', level: 1 }, { moveId: 'leech_life', upgrade: 5 }, { moveId: 'superpower', upgrade: 5 }],
      unite: { moveId: 'ultra_swole_slam', name: 'Ultra Swole Slam' },
    } },

  { pokemonId: 'zacian',           dex: 888,  role: 'all_rounder', type: 'melee',  style: 'physical', difficulty: 'intermediate',  ratings: { ...R_ALL, offense: 4.5 }, stats: ALL_PH_MEL,
    moves: {
      basic: { boostStyle: 'physical', boostCount: 3 },
      slot1: [{ moveId: 'slash', level: 1 }, { moveId: 'metal_claw_zacian', upgrade: 5 }, { moveId: 'sacred_sword_zacian', upgrade: 5 }],
      slot2: [{ moveId: 'quick_attack', level: 1 }, { moveId: 'agility', upgrade: 7 }, { moveId: 'play_rough', upgrade: 7 }],
      unite: { moveId: 'sovereign_sword', name: 'Sovereign Sword' },
    } },

  { pokemonId: 'urshifu',          dex: 892,  role: 'all_rounder', type: 'melee',  style: 'physical', difficulty: 'intermediate',  ratings: R_ALL, stats: ALL_PH_MEL,
    moves: {
      basic: { boostStyle: 'physical', boostCount: 3 },
      slot1: [{ moveId: 'rock_smash', level: 1 }, { moveId: 'wicked_blow', upgrade: 5 }, { moveId: 'surging_strikes', upgrade: 5 }],
      slot2: [{ moveId: 'headbutt', level: 1 }, { moveId: 'throat_chop', upgrade: 7 }, { moveId: 'liquidation', upgrade: 7 }],
      unite: { moveId: 'ebon_fist', name: 'Ebon Fist' },
    } },

  { pokemonId: 'pawmot',           dex: 923,  role: 'all_rounder', type: 'melee',  style: 'physical', difficulty: 'intermediate',  ratings: R_ALL, stats: ALL_PH_MEL,
    stages: [{ stageId: 'pawmi', level: 1 }, { stageId: 'pawmo', level: 5 }],
    moves: {
      basic: { boostStyle: 'physical', boostCount: 3 },
      slot1: [{ moveId: 'nuzzle', level: 1 }, { moveId: 'thunder_punch', upgrade: 5 }, { moveId: 'supercell_slam', upgrade: 5 }],
      slot2: [{ moveId: 'scratch', level: 1 }, { moveId: 'volt_switch', upgrade: 7 }, { moveId: 'mach_punch', upgrade: 7 }],
      unite: { moveId: 'zip_zap_full_charge_spark', name: 'Zip Zap Full-Charge Spark' },
    } },

  { pokemonId: 'ceruledge',        dex: 937,  role: 'all_rounder', type: 'melee',  style: 'physical', difficulty: 'intermediate',  ratings: R_ALL, stats: ALL_PH_MEL,
    moves: {
      basic: { boostStyle: 'physical', boostCount: 4 },
      slot1: [{ moveId: 'lava_plume', level: 1 }, { moveId: 'bitter_blade', upgrade: 5 }, { moveId: 'psycho_cut', upgrade: 5 }],
      slot2: [{ moveId: 'take_down', level: 1 }, { moveId: 'phantom_force_ceruledge', upgrade: 7 }, { moveId: 'flame_charge', upgrade: 7 }],
      unite: { moveId: 'revenant_rend', name: 'Revenant Rend' },
    } },

  { pokemonId: 'tinkaton',         dex: 959,  role: 'all_rounder', type: 'melee',  style: 'physical', difficulty: 'novice',        ratings: R_ALL, stats: ALL_PH_MEL,
    stages: [{ stageId: 'tinkatink', level: 1 }, { stageId: 'tinkatuff', level: 5 }],
    moves: {
      basic: { boostStyle: 'physical', boostCount: 3 },
      slot1: [{ moveId: 'rock_smash', level: 1 }, { moveId: 'gigaton_hammer', upgrade: 7 }, { moveId: 'smack_down_tinkaton', upgrade: 7 }],
      slot2: [{ moveId: 'fairy_wind', level: 1 }, { moveId: 'ice_hammer', upgrade: 5 }, { moveId: 'thief_tinkaton', upgrade: 5 }],
      unite: { moveId: 'kiss_bliss_kaboom', name: 'Kiss Bliss Kaboom' },
    } },

  { pokemonId: 'falinks',          dex: 875,  role: 'all_rounder', type: 'melee',  style: 'physical', difficulty: 'expert',        ratings: R_ALL, stats: ALL_PH_MEL,
    moves: {
      basic: { boostStyle: 'physical', boostCount: 3 },
      slot1: [{ moveId: 'tackle', level: 1 }, { moveId: 'megahorn', upgrade: 4 }, { moveId: 'iron_head_falinks', upgrade: 4 }],
      slot2: [{ moveId: 'bulk_up', level: 1 }, { moveId: 'no_retreat', upgrade: 6 }, { moveId: 'beat_up', upgrade: 6 }],
      unite: { moveId: 'dust_devil_formation', name: 'Dust Devil Formation' },
    } },

  { pokemonId: 'sirfetchd',        dex: 865,  role: 'all_rounder', type: 'melee',  style: 'physical', difficulty: 'expert',        ratings: { ...R_ALL, offense: 4.5 }, stats: ALL_PH_MEL,
    stages: [{ stageId: 'galarian_farfetchd', level: 1 }],
    moves: {
      basic: { boostStyle: 'physical', boostCount: 3 },
      slot1: [{ moveId: 'dual_wingbeat', level: 1 }, { moveId: 'fury_cutter', upgrade: 5 }, { moveId: 'leaf_blade', upgrade: 5 }],
      slot2: [{ moveId: 'quick_attack_sirfetchd', level: 1 }, { moveId: 'brutal_swing', upgrade: 7 }, { moveId: 'detect', upgrade: 7 }],
      unite: { moveId: 'lunging_leek_nova_blast', name: 'Lunging Leek Nova Blast' },
    } },

  { pokemonId: 'dragonite',        dex: 149,  role: 'all_rounder', type: 'ranged', style: 'physical', difficulty: 'intermediate',  ratings: { ...R_ALL, mobility: 4 }, stats: ALL_PH_RNG,
    stages: [{ stageId: 'dratini', level: 1 }, { stageId: 'dragonair', level: 5 }],
    moves: {
      basic: { boostStyle: 'physical', boostCount: 3 },
      slot1: [{ moveId: 'twister', level: 1 }, { moveId: 'dragon_dance', upgrade: 5 }, { moveId: 'extreme_speed', upgrade: 5 }],
      slot2: [{ moveId: 'dragon_breath_dragonite', level: 1 }, { moveId: 'hyper_beam', upgrade: 8 }, { moveId: 'outrage', upgrade: 8 }],
      unite: { moveId: 'draco_impact', name: 'Draco Impact' },
    } },

  { pokemonId: 'empoleon',         dex: 395,  role: 'all_rounder', type: 'melee',  style: 'special',  difficulty: 'intermediate',  ratings: R_ALL, stats: ALL_SP_MEL,
    stages: [{ stageId: 'piplup', level: 1 }, { stageId: 'prinplup', level: 5 }],
    moves: {
      basic: { boostStyle: 'special', boostCount: 3 },
      slot1: [{ moveId: 'water_gun', level: 1 }, { moveId: 'hydro_cannon', upgrade: 7 }, { moveId: 'whirlpool', upgrade: 7 }],
      slot2: [{ moveId: 'peck_empoleon', level: 1 }, { moveId: 'metal_claw_empoleon', upgrade: 5 }, { moveId: 'aqua_jet', upgrade: 5 }],
      unite: { moveId: 'sovereign_slide', name: 'Sovereign Slide' },
    } },

  { pokemonId: 'suicune',          dex: 245,  role: 'all_rounder', type: 'ranged', style: 'special',  difficulty: 'intermediate',  ratings: R_ALL, stats: ALL_SP_RNG,
    moves: {
      basic: { boostStyle: 'special', boostCount: 3 },
      slot1: [{ moveId: 'water_pulse', level: 1 }, { moveId: 'whirlpool_suicune', upgrade: 5 }, { moveId: 'surf_suicune', upgrade: 5 }],
      slot2: [{ moveId: 'avalanche', level: 1 }, { moveId: 'ice_beam', upgrade: 7 }, { moveId: 'icy_wind', upgrade: 7 }],
      unite: { moveId: 'endless_ice_spikes', name: 'Endless Ice Spikes' },
    } },

  // ── Supporter ─────────────────────────────────────────────────────────────

  { pokemonId: 'wigglytuff',       dex: 40,   role: 'supporter',   type: 'melee',  style: 'special',  difficulty: 'intermediate',  ratings: R_SUP, stats: SUP_SP_MEL,
    stages: [{ stageId: 'igglybuff', level: 1 }, { stageId: 'jigglypuff', level: 4 }] },

  { pokemonId: 'mr_mime',          dex: 122,  role: 'supporter',   type: 'melee',  style: 'special',  difficulty: 'intermediate',  ratings: R_SUP, stats: SUP_SP_MEL },

  { pokemonId: 'blissey',          dex: 242,  role: 'supporter',   type: 'melee',  style: 'special',  difficulty: 'intermediate',  ratings: { ...R_SUP, endurance: 4 }, stats: SUP_SP_MEL,
    stages: [{ stageId: 'happiny', level: 1 }, { stageId: 'chansey', level: 4 }] },

  { pokemonId: 'clefable',         dex: 36,   role: 'supporter',   type: 'melee',  style: 'special',  difficulty: 'novice',        ratings: R_SUP, stats: SUP_SP_MEL,
    stages: [{ stageId: 'clefairy', level: 1 }],
    moves: {
      basic: { boostStyle: 'special', boostCount: 3 },
      slot1: [{ moveId: 'heal_pulse', level: 1 }, { moveId: 'moonlight', upgrade: 4 }, { moveId: 'draining_kiss', upgrade: 4 }],
      slot2: [{ moveId: 'disarming_voice', level: 1 }, { moveId: 'gravity', upgrade: 6 }, { moveId: 'follow_me', upgrade: 6 }],
      unite: { moveId: 'wonder_wish', name: 'Wonder Wish' },
    } },

  { pokemonId: 'sableye',          dex: 302,  role: 'supporter',   type: 'melee',  style: 'physical', difficulty: 'intermediate',  ratings: R_SUP, stats: SUP_PH_MEL,
    moves: {
      basic: { boostStyle: 'physical', boostCount: 3 },
      slot1: [{ moveId: 'thief', level: 1 }, { moveId: 'knock_off', upgrade: 5 }, { moveId: 'shadow_sneak', upgrade: 5 }],
      slot2: [{ moveId: 'astonish', level: 1 }, { moveId: 'feint_attack', upgrade: 7 }, { moveId: 'confuse_ray', upgrade: 7 }],
      unite: { moveId: 'chaos_glower', name: 'Chaos Glower' },
    } },

  { pokemonId: 'eldegoss',         dex: 830,  role: 'supporter',   type: 'ranged', style: 'special',  difficulty: 'novice',        ratings: R_SUP, stats: SUP_SP_RNG,
    stages: [{ stageId: 'gossifleur', level: 1 }] },

  { pokemonId: 'psyduck',          dex: 54,   role: 'supporter',   type: 'ranged', style: 'special',  difficulty: 'novice',        ratings: R_SUP, stats: SUP_SP_RNG,
    moves: {
      basic: { boostStyle: 'physical', boostCount: 3 },
      slot1: [{ moveId: 'confusion_psyduck', level: 1 }, { moveId: 'surf_psyduck', upgrade: 5 }, { moveId: 'bubble_beam', upgrade: 5 }],
      slot2: [{ moveId: 'tail_whip', level: 1 }, { moveId: 'disable', upgrade: 7 }, { moveId: 'psychic_psyduck', upgrade: 7 }],
      unite: { moveId: 'full_power_psy_ay_ay', name: 'Full-Power Psy-ay-ay!' },
    } },

  { pokemonId: 'hoopa',            dex: 720,  role: 'supporter',   type: 'ranged', style: 'special',  difficulty: 'expert',        ratings: { ...R_SUP, support: 5 }, stats: SUP_SP_RNG,
    moves: {
      basic: { boostStyle: 'special', boostCount: 3 },
      slot1: [{ moveId: 'astonish_hoopa', level: 1 }, { moveId: 'phantom_force', upgrade: 7 }, { moveId: 'shadow_ball_hoopa', upgrade: 7 }],
      slot2: [{ moveId: 'confusion_hoopa', level: 1 }, { moveId: 'hyperspace_hole', upgrade: 5 }, { moveId: 'trick', upgrade: 5 }],
      unite: { moveId: 'rings_unbound', name: 'Rings Unbound' },
    } },

  { pokemonId: 'comfey',           dex: 764,  role: 'supporter',   type: 'ranged', style: 'special',  difficulty: 'novice',        ratings: R_SUP, stats: SUP_SP_RNG,
    moves: {
      basic: { boostStyle: 'special', boostCount: 3 },
      slot1: [{ moveId: 'synthesis', level: 1 }, { moveId: 'floral_healing', upgrade: 5 }, { moveId: 'sweet_kiss', upgrade: 5 }],
      slot2: [{ moveId: 'vine_whip', level: 1 }, { moveId: 'magical_leaf', upgrade: 7 }, { moveId: 'grass_knot', upgrade: 7 }],
      unite: { moveId: 'flowery_fields_forever', name: 'Flowery Fields Forever' },
    } },

  { pokemonId: 'alcremie',         dex: 869,  role: 'supporter',   type: 'ranged', style: 'special',  difficulty: 'novice',        ratings: R_SUP, stats: SUP_SP_RNG,
    stages: [{ stageId: 'milcery', level: 1 }],
    moves: {
      basic: { boostStyle: 'special', boostCount: 0 },
      slot1: [{ moveId: 'helping_hand_alcremie', level: 1 }, { moveId: 'decorate', upgrade: 5 }, { moveId: 'recover_alcremie', upgrade: 5 }],
      slot2: [{ moveId: 'charm', level: 1 }, { moveId: 'dazzling_gleam_alcremie', upgrade: 7 }, { moveId: 'sweet_scent', upgrade: 7 }],
      unite: { moveId: 'fluffy_cream_supreme', name: 'Fluffy Cream Supreme' },
    } },

  { pokemonId: 'latias',           dex: 380,  role: 'supporter',   type: 'ranged', style: 'special',  difficulty: 'novice',        ratings: { ...R_SUP, mobility: 4 }, stats: SUP_SP_RNG,
    moves: {
      basic: { boostStyle: 'special', boostCount: 0 },
      slot1: [{ moveId: 'confusion', level: 1 }, { moveId: 'mist_ball', upgrade: 6 }, { moveId: 'dragon_cheer', upgrade: 6 }],
      slot2: [{ moveId: 'swift', level: 1 }, { moveId: 'dragon_pulse', upgrade: 4 }, { moveId: 'dragon_breath', upgrade: 4 }],
      unite: { moveId: 'mist_blast', name: 'Mist Blast' },
    } },
];

/** Set of pokemonIds that are in the live pvpoke dataset (accurate stats). */
export const PVPOKE_IDS = new Set([
  'venusaur', 'charizard', 'blastoise', 'pikachu', 'alolan_ninetales',
  'wigglytuff', 'machamp', 'slowbro', 'gengar', 'mr_mime', 'snorlax',
  'blissey', 'gardevoir', 'absol', 'garchomp', 'lucario', 'mamoswine',
  'crustle', 'greninja', 'talonflame', 'zeraora', 'cinderace',
  'eldegoss', 'sylveon', 'cramorant',
]);
