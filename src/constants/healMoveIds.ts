/**
 * Exhaustive set of move IDs that restore HP in Pokémon Unite.
 *
 * Used as a fallback in normalizeMoveOption() when:
 * - The pvpoke category field does not include 'recovery', AND
 * - The move name doesn't contain "heal" or "recover"
 *
 * Covers moves like Aqua Ring, Wish, Moonlight, Synthesis, etc.
 * whose names give no indication of their healing function.
 */
export const HEAL_MOVE_IDS = new Set<string>([
  // ── Defender / Attacker heals ──────────────────────────────────────────
  'aqua_ring',         // Vaporeon — AoE regen over time
  'wish',              // Umbreon — delayed heal for self + adjacent ally
  'moonlight',         // Clefable — instant HP restore
  'draining_kiss',     // Clefable — lifesteal (also isSustain)
  'leech_life',        // Scizor  — lifesteal (also isSustain)
  'amnesia',           // Slowbro — restores HP while in meditation state
  'rest',              // Snorlax — restores HP fully (sleep to wake)
  'power_nap',         // Snorlax — HP continually restored during nap
  'block',             // Snorlax — also grants a shield; heals passive
  'aqua_jet',          // Empoleon — minor heal on dash hit
  'slack_off',         // Slowbro/Snorlax — restores a portion of HP
  'giga_drain',        // Venusaur/Sceptile — restores HP when it hits

  // ── Greninja ────────────────────────────────────────────────────────────
  'water_shuriken',    // Greninja — restores HP when it hits
  'surf_greninja',     // Greninja — restores HP on wave hit

  // ── Lucario ────────────────────────────────────────────────────────────
  'close_combat_lucario', // Lucario — restores a certain amount of HP
  'extreme_speed',        // Lucario — restores HP when hitting marked targets

  // ── Sylveon ────────────────────────────────────────────────────────────
  'fairy_frolic',      // Sylveon Unite — restores the user's HP

  // ── Eldegoss ────────────────────────────────────────────────────────────
  'cotton_guard',      // Eldegoss — absorbs damage and restores HP when expires (also isShield)
  'cotton_down',       // Eldegoss — it recovers HP

  // ── Greedent ────────────────────────────────────────────────────────────
  'stuff_cheeks',      // Greedent — restoring HP (also slow CC)
  'berry_belly_flop',  // Greedent — restoring HP with each berry collected

  // ── Goodra ─────────────────────────────────────────────────────────────
  'right_as_rain',     // Goodra Unite — gradually restore HP

  // ── Trevenant ────────────────────────────────────────────────────────────
  'horn_leech',        // Trevenant — restoring a portion of the user's HP (also slow CC)

  // ── Chandelure / Ceruledge ───────────────────────────────────────────────
  'ignite_midnight',   // Chandelure Unite — restoring its own HP
  'bitter_blade',      // Ceruledge — restoring the user's HP (also slow CC)
  'revenant_rend',     // Ceruledge Unite — restoring HP with each hit

  // ── Miraidon ─────────────────────────────────────────────────────────────
  'parabolic_charge',  // Miraidon — restoring the user's HP (also slow CC)

  // ── Charizard ────────────────────────────────────────────────────────────
  'seismic_slam',      // Charizard Unite — the user recovers HP

  // ── Gengar ───────────────────────────────────────────────────────────────
  'dream_eater',       // Gengar — restoring the user's HP while target is asleep

  // ── Supporter heals ───────────────────────────────────────────────────
  'synthesis',           // Comfey  — regen burst
  'helping_hand_alcremie', // Alcremie — heals user + boosts ally ATK
  'soft_boiled',         // Blissey — major self + ally heal
  'pollen_puff',         // Eldegoss — heals allies on hit
  'jungle_healing',      // Leafeon / shared — area HP regen (name has "healing" but add for safety)
  'life_dew',            // utility supporters
  'lunar_blessing',      // Ho-Oh / legendary variants
  'aromatherapy',        // cleanse + minor heal
]);
