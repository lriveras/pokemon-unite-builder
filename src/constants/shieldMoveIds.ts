/**
 * Exhaustive set of move IDs that grant shields in Pokémon Unite.
 *
 * Used as a fallback in normalizeMoveOption() when:
 * - The pvpoke category field does not include 'shield', AND
 * - The move name doesn't contain "shield"
 *
 * Covers moves like Rollout, Block, Discharge, etc. whose names give
 * no indication that they generate damage-absorbing shields.
 */
export const SHIELD_MOVE_IDS = new Set<string>([
  // ── Wigglytuff ─────────────────────────────────────────────────────────
  'rollout',           // Wigglytuff — granting it a shield while rolling
  'star_recital',      // Wigglytuff Unite — granting itself and nearby allies a shield

  // ── Slowbro ────────────────────────────────────────────────────────────
  'slowbeam',          // Slowbro — Grants a shield while channeling

  // ── Snorlax ────────────────────────────────────────────────────────────
  'block',             // Snorlax — grants it a shield (also heal)

  // ── Zeraora ────────────────────────────────────────────────────────────
  'discharge',         // Zeraora — granting the user a shield when it hits

  // ── Ho-Oh ──────────────────────────────────────────────────────────────
  'safeguard_ho_oh',   // Ho-Oh — granting it and nearby ally Pokémon a shield

  // ── Mew ────────────────────────────────────────────────────────────────
  'coaching',          // Mew — grant that Pokémon a shield
  'surf_mew',          // Mew — The user gains a shield (also dash/CC)

  // ── Charizard ──────────────────────────────────────────────────────────
  'flare_blitz',       // Charizard — Also grants the user a shield (also dash)

  // ── Blastoise ──────────────────────────────────────────────────────────
  'hydro_typhoon',     // Blastoise Unite — grants the user a shield

  // ── Armarouge ──────────────────────────────────────────────────────────
  'flame_charge_armarouge', // Armarouge — Grants the user a shield when it hits (also dash)

  // ── Aegislash ──────────────────────────────────────────────────────────
  'wide_guard',        // Aegislash — protecting them from wide-ranging attacks

  // ── Blissey ────────────────────────────────────────────────────────────
  'safeguard',         // Blissey — grants both Pokémon a shield
  'bliss_assistance',  // Blissey — granting that Pokémon a shield

  // ── Lucario ────────────────────────────────────────────────────────────
  'steadfast',         // Lucario — it is granted a shield when hit below threshold

  // ── Eldegoss ────────────────────────────────────────────────────────────
  'cotton_guard',      // Eldegoss — absorbs damage (shield) and restores HP on expiry (also heal)
]);
