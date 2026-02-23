import { CCType } from '../types/pokemon';

export interface CCMoveEntry {
  ccType: CCType;
  duration: number; // seconds
  quality: number;  // 0–1, higher = better (stun=1.0, slow=0.5, etc.)
}

/**
 * Crowd Control move lookup table.
 *
 * Keys match the moveId strings in pvpoke data / pokemonRoster.ts.
 * Each entry records the CC type, duration (seconds), and quality (0–1).
 *
 * Sources:
 *   - Bulbapedia UNITE move pages (durations)
 *   - pvpoke-unite category tags
 *   - Community testing (unite-db.com, game8.co)
 */
export const CC_MOVE_MAP: Record<string, CCMoveEntry> = {

  // ── Blastoise ──────────────────────────────────────────────────────────
  water_spout:  { ccType: 'slow',    duration: 1.5, quality: 0.5 },
  surf:         { ccType: 'slow',    duration: 1.0, quality: 0.5 },
  rapid_spin:   { ccType: 'slow',    duration: 0.5, quality: 0.4 },
  hydro_pump:   { ccType: 'knockup', duration: 0.5, quality: 0.75 },
  skull_bash:   { ccType: 'stun',    duration: 1.0, quality: 1.0 },
  blizzard:     { ccType: 'freeze',  duration: 1.5, quality: 0.9 },

  // ── Snorlax ───────────────────────────────────────────────────────────
  block:        { ccType: 'root',    duration: 2.0, quality: 0.8 },
  heavy_slam:   { ccType: 'stun',    duration: 1.5, quality: 1.0 },
  tackle:       { ccType: 'knockup', duration: 0.5, quality: 0.75 },
  flail:        { ccType: 'knockup', duration: 0.75, quality: 0.75 },
  yawn:         { ccType: 'sleep',   duration: 2.0, quality: 0.85 },

  // ── Slowbro ───────────────────────────────────────────────────────────
  amnesia:      { ccType: 'slow',     duration: 2.0, quality: 0.5 },
  scald:        { ccType: 'slow',     duration: 1.5, quality: 0.5 },
  telekinesis:  { ccType: 'suppress', duration: 2.5, quality: 0.95 },
  surf_slowbro: { ccType: 'slow',     duration: 1.0, quality: 0.5 },
  slowbeam:     { ccType: 'root',     duration: 2.5, quality: 0.8 }, // leaves them unable to move

  // ── Wigglytuff ────────────────────────────────────────────────────────
  sing:         { ccType: 'sleep',   duration: 3.0, quality: 0.85 },
  pound:        { ccType: 'stun',    duration: 0.5, quality: 1.0 },
  cute_charm:   { ccType: 'slow',    duration: 1.0, quality: 0.5 },
  dazzling_gleam: { ccType: 'slow',  duration: 1.5, quality: 0.5 },

  // ── Machamp ───────────────────────────────────────────────────────────
  submission:    { ccType: 'knockup',  duration: 0.75, quality: 0.75 },
  cross_chop:    { ccType: 'knockup',  duration: 0.5,  quality: 0.75 },
  dynamic_punch: { ccType: 'stun',     duration: 1.0,  quality: 1.0 },
  close_combat:  { ccType: 'knockup',  duration: 0.5,  quality: 0.75 },
  seismic_toss:  { ccType: 'suppress', duration: 1.5,  quality: 0.95 },

  // ── Talonflame ────────────────────────────────────────────────────────
  fly:          { ccType: 'suppress', duration: 1.5, quality: 0.95 },
  aerial_ace:   { ccType: 'slow',     duration: 0.5, quality: 0.4 },

  // ── Crustle ───────────────────────────────────────────────────────────
  shell_smash:  { ccType: 'slow', duration: 1.0, quality: 0.5 },
  rock_tomb:    { ccType: 'root', duration: 1.5, quality: 0.8 },
  x_scissor:    { ccType: 'knockup', duration: 0.5, quality: 0.75 },

  // ── Tsareena ──────────────────────────────────────────────────────────
  stomp:         { ccType: 'stun',    duration: 1.0,  quality: 1.0 },
  queens_ascent: { ccType: 'knockup', duration: 0.5,  quality: 0.75 },
  trop_kick:     { ccType: 'knockup', duration: 0.75, quality: 0.75 },

  // ── Greedent ──────────────────────────────────────────────────────────
  stuff_cheeks: { ccType: 'slow',    duration: 1.0, quality: 0.5 },
  covet:        { ccType: 'knockup', duration: 0.5, quality: 0.75 },

  // ── Sylveon ───────────────────────────────────────────────────────────
  mystical_fire:  { ccType: 'slow', duration: 1.5, quality: 0.5 },
  draining_kiss:  { ccType: 'slow', duration: 1.0, quality: 0.4 },
  hyper_voice:    { ccType: 'slow', duration: 0.5, quality: 0.4 },

  // ── Azumarill ─────────────────────────────────────────────────────────
  whirlpool:     { ccType: 'root', duration: 2.0, quality: 0.8 },
  aqua_jet:      { ccType: 'slow', duration: 0.5, quality: 0.4 },
  water_pulse:   { ccType: 'slow', duration: 1.0, quality: 0.5 }, // confusion effect

  // ── Gengar ────────────────────────────────────────────────────────────
  sludge_bomb:  { ccType: 'slow', duration: 1.0, quality: 0.5 },
  hex:          { ccType: 'slow', duration: 0.5, quality: 0.4 },
  will_o_wisp:  { ccType: 'slow', duration: 2.0, quality: 0.5 },

  // ── Lucario ───────────────────────────────────────────────────────────
  meteor_mash:   { ccType: 'knockup', duration: 0.5, quality: 0.75 },
  extreme_speed: { ccType: 'stun',    duration: 0.5, quality: 1.0 },

  // ── Umbreon ───────────────────────────────────────────────────────────
  snarl:      { ccType: 'slow', duration: 1.5, quality: 0.5 },
  mean_look:  { ccType: 'root', duration: 2.0, quality: 0.8 },
  moonlight:  { ccType: 'slow', duration: 1.0, quality: 0.4 },

  // ── Eldegoss ──────────────────────────────────────────────────────────
  cotton_guard:  { ccType: 'slow',    duration: 1.0, quality: 0.4 },
  cotton_spore:  { ccType: 'knockup', duration: 0.5, quality: 0.75 }, // launching them + slow
  leaf_tornado:  { ccType: 'slow',    duration: 1.5, quality: 0.5 },

  // ── Lapras ────────────────────────────────────────────────────────────
  perish_song:  { ccType: 'suppress', duration: 2.5, quality: 0.85 }, // countdown to forced incapacitation
  ice_beam:     { ccType: 'freeze',   duration: 1.5, quality: 0.9 },
  bubble_beam:  { ccType: 'slow',     duration: 1.5, quality: 0.5 },
  ice_shard:    { ccType: 'slow',     duration: 0.5, quality: 0.4 },

  // ── Alolan Raichu ─────────────────────────────────────────────────────
  thunder_wave: { ccType: 'slow', duration: 2.0, quality: 0.5 }, // paralysis = slow in Unite
  // thunder_shock handled by pikachu entry; thunderbolt below
  thunderbolt:  { ccType: 'stun', duration: 0.5, quality: 1.0 },

  // ── Espeon ────────────────────────────────────────────────────────────
  psybeam:      { ccType: 'slow', duration: 1.0, quality: 0.5 }, // confusion
  future_sight: { ccType: 'stun', duration: 0.5, quality: 0.7 }, // delayed stun

  // ── Glaceon ───────────────────────────────────────────────────────────
  icy_wind_glaceon:  { ccType: 'slow',   duration: 1.5, quality: 0.5 },
  ice_shard_glaceon: { ccType: 'slow',   duration: 0.5, quality: 0.4 },
  freeze_dry:        { ccType: 'freeze', duration: 1.5, quality: 0.9 },
  icicle_spear:      { ccType: 'slow',   duration: 1.0, quality: 0.5 },

  // ── Darkrai ───────────────────────────────────────────────────────────
  hypnosis:   { ccType: 'sleep', duration: 2.5, quality: 0.85 },
  dark_void:  { ccType: 'sleep', duration: 3.0, quality: 0.85 },
  dark_pulse: { ccType: 'slow',  duration: 1.0, quality: 0.5 },

  // ── Galarian Rapidash ─────────────────────────────────────────────────
  confusion:       { ccType: 'slow', duration: 1.0, quality: 0.5 }, // confusion = slow
  fairy_wind:      { ccType: 'slow', duration: 1.0, quality: 0.4 },
  dazzling_gleam_alcremie: { ccType: 'slow', duration: 1.5, quality: 0.5 },

  // ── Latias ────────────────────────────────────────────────────────────
  dragon_breath:  { ccType: 'slow', duration: 1.5, quality: 0.5 },
  mist_ball:      { ccType: 'slow', duration: 1.0, quality: 0.5 },
  confusion_latios: { ccType: 'slow', duration: 1.5, quality: 0.5 },

  // ── Latios ────────────────────────────────────────────────────────────
  telekinesis_latios: { ccType: 'suppress', duration: 2.0, quality: 0.9 }, // pulls + stuns
  swift_latios:       { ccType: 'slow',     duration: 0.5, quality: 0.4 },

  // ── Goodra ────────────────────────────────────────────────────────────
  power_whip:   { ccType: 'slow', duration: 1.5, quality: 0.5 },
  muddy_water:  { ccType: 'slow', duration: 1.5, quality: 0.5 },
  acid_spray:   { ccType: 'slow', duration: 1.0, quality: 0.4 }, // Sp. Def down + slow

  // ── Trevenant ─────────────────────────────────────────────────────────
  wood_hammer: { ccType: 'stun', duration: 0.75, quality: 1.0 },
  curse:       { ccType: 'slow', duration: 2.0,  quality: 0.5 },
  horn_leech:  { ccType: 'slow', duration: 1.0,  quality: 0.4 },

  // ── Ho-Oh ─────────────────────────────────────────────────────────────
  fire_spin_ho_oh:    { ccType: 'slow', duration: 2.0, quality: 0.5 },
  sacred_fire:        { ccType: 'slow', duration: 2.0, quality: 0.5 }, // burn = slow
  flamethrower_ho_oh: { ccType: 'slow', duration: 1.0, quality: 0.4 }, // burn

  // ── Decidueye ─────────────────────────────────────────────────────────
  spirit_shackle: { ccType: 'root', duration: 2.0, quality: 0.8 },

  // ── Dragapult ─────────────────────────────────────────────────────────
  phantom_force:         { ccType: 'knockup', duration: 0.5, quality: 0.75 },
  dragon_breath_dragonite: { ccType: 'slow',  duration: 1.5, quality: 0.5 },

  // ── Gyarados / Mega Gyarados ──────────────────────────────────────────
  bounce:    { ccType: 'stun',    duration: 1.0, quality: 1.0 },
  waterfall: { ccType: 'knockup', duration: 0.5, quality: 0.75 },

  // ── Tyranitar ─────────────────────────────────────────────────────────
  stone_edge:    { ccType: 'knockup', duration: 0.5, quality: 0.75 },
  sand_tomb:     { ccType: 'root',    duration: 2.0, quality: 0.8 },
  ancient_power: { ccType: 'slow',    duration: 1.0, quality: 0.5 },

  // ── Blaziken ──────────────────────────────────────────────────────────
  fire_punch:  { ccType: 'knockup', duration: 0.5, quality: 0.75 }, // shoves/knocks
  focus_blast: { ccType: 'slow',    duration: 1.0, quality: 0.5 },

  // ── Metagross ─────────────────────────────────────────────────────────
  zen_headbutt:        { ccType: 'stun', duration: 0.75, quality: 1.0 },
  gyro_ball:           { ccType: 'slow', duration: 1.5,  quality: 0.5 },
  meteor_mash_metagross: { ccType: 'knockup', duration: 0.5, quality: 0.75 },

  // ── Aegislash ─────────────────────────────────────────────────────────
  shadow_claw_aegislash: { ccType: 'slow', duration: 1.0, quality: 0.5 },

  // ── Mimikyu ───────────────────────────────────────────────────────────
  play_rough:            { ccType: 'slow', duration: 1.5, quality: 0.5 },
  shadow_sneak_mimikyu:  { ccType: 'slow', duration: 1.0, quality: 0.4 },

  // ── Dhelmise ──────────────────────────────────────────────────────────
  anchor_shot:         { ccType: 'root',    duration: 2.0, quality: 0.8 },
  heavy_slam_dhelmise: { ccType: 'knockup', duration: 0.5, quality: 0.75 },
  whirlpool_dhelmise:  { ccType: 'root',    duration: 1.5, quality: 0.8 },
  bulldoze_dhelmise:   { ccType: 'slow',    duration: 1.5, quality: 0.5 },
  seaweed_snare:       { ccType: 'root',    duration: 2.0, quality: 0.8 },

  // ── Buzzwole ──────────────────────────────────────────────────────────
  lunge:      { ccType: 'slow',    duration: 1.5, quality: 0.5 },
  smack_down: { ccType: 'knockup', duration: 0.5, quality: 0.75 },

  // ── Zacian ────────────────────────────────────────────────────────────
  metal_claw_zacian: { ccType: 'slow', duration: 1.0, quality: 0.5 },

  // ── Urshifu ───────────────────────────────────────────────────────────
  wicked_blow:     { ccType: 'stun', duration: 0.5, quality: 1.0 },
  throat_chop:     { ccType: 'slow', duration: 1.5, quality: 0.5 },
  surging_strikes: { ccType: 'slow', duration: 1.0, quality: 0.5 },

  // ── Pawmot ────────────────────────────────────────────────────────────
  nuzzle:        { ccType: 'stun', duration: 0.75, quality: 1.0 }, // paralysis
  thunder_punch: { ccType: 'stun', duration: 0.5,  quality: 1.0 },
  supercell_slam: { ccType: 'stun', duration: 1.0, quality: 1.0 },

  // ── Ceruledge ─────────────────────────────────────────────────────────
  phantom_force_ceruledge: { ccType: 'suppress', duration: 1.5, quality: 0.95 },
  bitter_blade:            { ccType: 'slow',     duration: 1.0, quality: 0.5 },

  // ── Tinkaton ──────────────────────────────────────────────────────────
  gigaton_hammer:    { ccType: 'stun',    duration: 1.5, quality: 1.0 },
  ice_hammer:        { ccType: 'stun',    duration: 1.0, quality: 1.0 },
  smack_down_tinkaton: { ccType: 'knockup', duration: 0.5, quality: 0.75 },

  // ── Falinks ───────────────────────────────────────────────────────────
  iron_head_falinks: { ccType: 'stun',    duration: 0.5,  quality: 1.0 },
  megahorn:          { ccType: 'knockup', duration: 0.5,  quality: 0.75 },
  no_retreat:        { ccType: 'slow',    duration: 1.0,  quality: 0.5 }, // area slow as side effect

  // ── Sirfetch'd ────────────────────────────────────────────────────────
  brutal_swing: { ccType: 'slow',    duration: 1.0, quality: 0.5 },
  detect:       { ccType: 'knockup', duration: 0.5, quality: 0.75 }, // counter knockup

  // ── Dragonite ─────────────────────────────────────────────────────────
  outrage:    { ccType: 'stun',    duration: 0.5, quality: 1.0 }, // rage phase stun
  hyper_beam: { ccType: 'stun',    duration: 1.0, quality: 1.0 }, // brief stun on hit

  // ── Empoleon ──────────────────────────────────────────────────────────
  hydro_cannon:    { ccType: 'knockup', duration: 0.5, quality: 0.75 },
  sovereign_slide: { ccType: 'knockup', duration: 0.5, quality: 0.75 }, // shoving enemies
  // whirlpool shared with Azumarill entry above

  // ── Suicune ───────────────────────────────────────────────────────────
  whirlpool_suicune: { ccType: 'root',    duration: 2.0, quality: 0.8 },
  surf_suicune:      { ccType: 'knockup', duration: 0.5, quality: 0.75 }, // throwing them
  icy_wind:          { ccType: 'slow',    duration: 2.0, quality: 0.5 },
  avalanche:         { ccType: 'slow',    duration: 1.0, quality: 0.4 },

  // ── Clefable ──────────────────────────────────────────────────────────
  gravity: { ccType: 'root', duration: 2.0, quality: 0.7 }, // prevents dash & slow fall

  // ── Sableye ───────────────────────────────────────────────────────────
  confuse_ray:  { ccType: 'slow',    duration: 1.5, quality: 0.5 }, // confusion
  feint_attack: { ccType: 'slow',    duration: 1.0, quality: 0.4 },
  knock_off:    { ccType: 'knockup', duration: 0.5, quality: 0.75 },

  // ── Psyduck ───────────────────────────────────────────────────────────
  disable:       { ccType: 'suppress', duration: 2.0, quality: 0.9 }, // prevents move use
  confusion_psyduck: { ccType: 'slow',  duration: 1.0, quality: 0.5 },
  surf_psyduck:  { ccType: 'slow',     duration: 1.0, quality: 0.5 },

  // ── Hoopa ─────────────────────────────────────────────────────────────
  phantom_force_hoopa: { ccType: 'suppress', duration: 1.5, quality: 0.95 },
  shadow_ball_hoopa:   { ccType: 'slow',     duration: 1.0, quality: 0.5 },
  trick:               { ccType: 'slow',     duration: 1.0, quality: 0.4 }, // item swap disruption

  // ── Comfey ────────────────────────────────────────────────────────────
  sweet_kiss:    { ccType: 'sleep', duration: 1.5, quality: 0.85 },
  magical_leaf:  { ccType: 'slow',  duration: 1.0, quality: 0.4 },
  grass_knot:    { ccType: 'slow',  duration: 1.5, quality: 0.5 },

  // ── Alcremie ──────────────────────────────────────────────────────────
  charm: { ccType: 'slow', duration: 1.5, quality: 0.5 },

  // ── Miraidon ──────────────────────────────────────────────────────────
  thunder_wave_miraidon: { ccType: 'slow',    duration: 2.0, quality: 0.5 },
  thunder_miraidon:      { ccType: 'stun',    duration: 1.0, quality: 1.0 },
  electro_drift:         { ccType: 'stun',    duration: 0.5, quality: 1.0 },
  charge_beam:           { ccType: 'slow',    duration: 1.0, quality: 0.5 },
  parabolic_charge:      { ccType: 'slow',    duration: 1.0, quality: 0.4 },

  // ── Delphox ───────────────────────────────────────────────────────────
  will_o_wisp_delphox:  { ccType: 'slow', duration: 1.5, quality: 0.5 },
  fire_spin_delphox:    { ccType: 'slow', duration: 2.0, quality: 0.5 },

  // ── Armarouge ─────────────────────────────────────────────────────────
  armor_cannon:          { ccType: 'stun',    duration: 1.0, quality: 1.0 },
  psyshock_armarouge:    { ccType: 'knockup', duration: 0.5, quality: 0.75 }, // 3rd hit throws
  will_o_wisp_armarouge: { ccType: 'slow',    duration: 1.5, quality: 0.5 },
  fire_spin_armarouge:   { ccType: 'slow',    duration: 2.0, quality: 0.5 },

  // ── Inteleon ──────────────────────────────────────────────────────────
  tearful_look: { ccType: 'slow', duration: 1.0, quality: 0.4 }, // Atk/SpAtk down acts like soft CC

  // ── Mew ───────────────────────────────────────────────────────────────
  surf_mew:        { ccType: 'knockup', duration: 0.5, quality: 0.75 },
  light_screen_mew: { ccType: 'root',   duration: 3.0, quality: 0.6 }, // wall blocks movement

  // ── Vaporeon ──────────────────────────────────────────────────────────
  flip_turn:   { ccType: 'slow', duration: 1.0, quality: 0.5 },

  // ── Dodrio ────────────────────────────────────────────────────────────
  jump_kick:   { ccType: 'knockup', duration: 0.5, quality: 0.75 },

  // ── Meowscarada ───────────────────────────────────────────────────────
  trailblaze:  { ccType: 'slow', duration: 1.0, quality: 0.5 },

  // ── Duraludon ─────────────────────────────────────────────────────────
  dragon_tail: { ccType: 'knockup', duration: 0.5, quality: 0.75 },
  stealth_rock: { ccType: 'slow',   duration: 1.0, quality: 0.4 }, // terrain debuff
};

// Quality weights for CC type scoring
export const CC_TYPE_WEIGHTS: Record<CCType, number> = {
  stun:     1.0,
  suppress: 1.0,
  freeze:   0.9,
  sleep:    0.85,
  root:     0.8,
  knockup:  0.75,
  pull:     0.7,
  slow:     0.5,
};
