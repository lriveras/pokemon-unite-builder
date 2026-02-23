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
