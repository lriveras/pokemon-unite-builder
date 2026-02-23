/**
 * Exhaustive set of move IDs that involve dashing / rapid repositioning
 * in Pokémon Unite.
 *
 * Used as a fallback in normalizeMoveOption() when:
 * - The pvpoke category field does not include 'dash', AND
 * - The move name doesn't contain "dash" or "rush"
 *
 * Covers moves like Flare Blitz, Flip Turn, Phantom Force, etc. whose
 * names give no indication that they involve movement.
 */
export const DASH_MOVE_IDS = new Set<string>([
  // ── Water / Wave surfers ────────────────────────────────────────────────
  'surf_blastoise',         // Blastoise — charge forward on a wave
  'surf_slowbro',           // Slowbro — charge forward on a wave
  'surf_greninja',          // Greninja — ride a wave forward
  'surf_suicune',           // Suicune — crash forward on a large wave
  'sovereign_slide',        // Empoleon — dash forward on wave, shoving enemies

  // ── Empoleon ───────────────────────────────────────────────────────────
  'metal_claw_empoleon',    // Empoleon — while dashing forward
  'aqua_jet',               // Empoleon — dash at blinding speed

  // ── Charizard ──────────────────────────────────────────────────────────
  'flare_blitz',            // Charizard — charge forward (also isShield)

  // ── Cinderace ──────────────────────────────────────────────────────────
  'flame_charge_cinderace', // Cinderace — charge forward

  // ── Delphox ────────────────────────────────────────────────────────────
  'flame_charge_delphox',   // Delphox — charge forward

  // ── Armarouge ──────────────────────────────────────────────────────────
  'flame_charge_armarouge', // Armarouge — charge in designated direction (also isShield)

  // ── Ceruledge ──────────────────────────────────────────────────────────
  'flame_charge',           // Ceruledge — charge in the designated direction
  'phantom_force_ceruledge',// Ceruledge — vanish + reappear at location (also suppress CC)

  // ── Absol ──────────────────────────────────────────────────────────────
  'feint_absol',            // Absol — dash in an arc
  'night_slash',            // Absol — dash in an outward arc
  'pursuit',                // Absol — dash to the designated location

  // ── Greninja ───────────────────────────────────────────────────────────
  'double_team',            // Greninja — quickly moves the user away
  'smokescreen',            // Greninja — roll away from current location

  // ── Vaporeon ───────────────────────────────────────────────────────────
  'flip_turn',              // Vaporeon — dash at the designated opposing Pokémon

  // ── Inteleon ───────────────────────────────────────────────────────────
  'acrobatics_inteleon',    // Inteleon — glide in the designated direction

  // ── Scrafty / Sableye ──────────────────────────────────────────────────
  'covet',                  // dash at the designated opposing Pokémon
  'thief',                  // dash at the designated opposing Pokémon

  // ── Meowscarada ────────────────────────────────────────────────────────
  'trailblaze',             // Meowscarada — dash in the designated direction

  // ── Trevenant ──────────────────────────────────────────────────────────
  'wood_hammer',            // Trevenant — launch itself at the designated area

  // ── Dragapult ──────────────────────────────────────────────────────────
  'phantom_force',          // Dragapult — vanish and reappear at location (also knockup CC)

  // ── Zoroark ────────────────────────────────────────────────────────────
  'night_slash_zoroark',    // Zoroark — slip into the shadows and dash

  // ── Gengar ─────────────────────────────────────────────────────────────
  'hex',                    // Gengar — move to the designated location

  // ── Alakazam ───────────────────────────────────────────────────────────
  'teleport',               // Alakazam — instantly teleport to a designated location

  // ── Zeraora ────────────────────────────────────────────────────────────
  'spark',                  // Zeraora — leap at an opposing Pokémon
  'wild_charge',            // Zeraora — charge in the designated direction

  // ── Buzzwole ───────────────────────────────────────────────────────────
  'lunge',                  // Buzzwole — lunge at the designated opposing Pokémon

  // ── Generic charge moves ────────────────────────────────────────────────
  'take_down',              // charge at the designated opposing Pokémon
  'dig',                    // burrow underground and move quickly to location

  // ── Dodrio ─────────────────────────────────────────────────────────────
  'agility_dodrio',         // Dodrio — sprint at high speed
  'drill_peck',             // Dodrio — charge in the designated direction

  // ── Miraidon ───────────────────────────────────────────────────────────
  'electro_drift',          // Miraidon — dash in the designated direction (also stun CC)

  // ── Decidueye ──────────────────────────────────────────────────────────
  'nock_nock',              // Decidueye — charges forward while firing

  // ── Latios ─────────────────────────────────────────────────────────────
  'dragon_pulse_latios',    // Latios — dives in the designated direction
]);
