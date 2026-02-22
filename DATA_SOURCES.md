# Pokemon Unite Builder — Data Sources & Maintenance Guide

This document explains where all data in the builder comes from and how to keep it up to date when TiMi Studios releases new Pokemon Unite licenses.

---

## 1. Primary Data Source — pvpoke-unite

**URL:** `https://raw.githubusercontent.com/pvpoke/pvpoke-unite/master/src/data/gamemaster/`

The builder fetches three JSON files at runtime (cached for 24 hours):

| File | Contents | URL constant |
|------|----------|-------------|
| `pokemon.json` | All Pokemon: stats per level, moves, ratings, roles | `DATA_URLS.pokemon` |
| `heldItems.json` | Held item stats and passives | `DATA_URLS.heldItems` |
| `battleItems.json` | Battle item cooldowns and effects | `DATA_URLS.battleItems` |

### What pvpoke provides (accurate, from game data):
- `pokemonId`, `dex`, `role`, `type` (melee/ranged), `style` (physical/special/mixed)
- `difficulty` (novice/intermediate/expert)
- `ratings` — offense, endurance, mobility, scoring, support, leveling (scale 1–5)
- `stages` — evolution chain with levels
- `stats` — HP, ATK, DEF, Sp.ATK, Sp.DEF, Speed at **every level 1–15** ✓ accurate
- `moves.basic` — basic attack style and boost count
- `moves.slot1` / `moves.slot2` — move options per slot with `moveId`, `category`, `cooldown`
- `moves.unite` — unite move id and name
- `moves.passive` — passive ability id

### What pvpoke does NOT provide:
- Move descriptions (flavour text / effect descriptions)
- Exact damage multipliers / coefficients
- Hindrance type per move (we curate this manually)

### When a new Pokemon is released:
1. The pvpoke-unite repo is typically updated within days of a game patch.
2. Hit **Refresh Data** in the app to pull the latest JSON.
3. The new Pokemon will appear automatically in the builder and Licenses page.
4. To add accurate CC/damage data for its moves, follow steps 2 and 3 below.

---

## 2. Curated CC Move Map — `src/constants/ccMoveMap.ts`

This file maps `moveId` → CC type, duration, and quality score.

**Source:** In-game observation, Bulbapedia (Unite), and Game8.

### Format:
```typescript
'move_id': {
  ccType: 'stun' | 'slow' | 'freeze' | 'sleep' | 'knockup' | 'pull' | 'root' | 'suppress' | 'bound',
  duration: number,   // seconds the CC lasts
  quality: number,    // 0–1 score used in team synergy engine (stun=1.0, slow=0.5, etc.)
}
```

### Adding a new Pokemon's CC moves:
1. Open the game and use the new license in Training Mode.
2. Observe which moves apply CC, what type, and for how long.
3. Cross-reference with Bulbapedia: `https://bulbapedia.bulbagarden.net/wiki/<MoveName>_(UNITE)`
4. Add entries to `CC_MOVE_MAP` in `ccMoveMap.ts`.

### CC type reference:
| CC Type | Duration range | Quality weight |
|---------|---------------|----------------|
| stun | 0.5–1.5s | 1.0 |
| suppress | 1.0–2.5s | 1.0 |
| freeze | 1.0–2.0s | 0.9 |
| sleep | 2.0–3.0s | 0.85 |
| knockup | 0.5–1.0s | 0.75 |
| root | 1.5–2.5s | 0.8 |
| pull | variable | 0.7 |
| slow | 0.5–2.0s | 0.5 |
| bound | rare | 1.0 |

---

## 3. Curated Damage Table — `src/constants/moveDamageTable.ts`

This file provides damage coefficients for moves where we have curated values.

> ⚠️ **Important:** These coefficients are community-curated estimates, NOT extracted from game files. They are derived from in-game testing and community sources. They are labeled "(approx.)" in the UI.

### Format:
```typescript
'move_id': {
  moveId: string,
  baseCoefficient: number,       // multiplier vs primary stat (e.g. 2.1 = 210% of Sp.ATK)
  scalingStat: 'atk' | 'sp_atk',
  scalingLevelMultiplier: number, // additional % gain per level (e.g. 0.08 = +8% per level)
  upgradeMultiplier: number,     // multiplier when the move is upgraded (e.g. 1.15 = +15%)
  isBurst: boolean,              // true if damage is single-hit burst
  hitCount: number,              // total hits the move deals
  cooldown: number,              // cooldown in seconds
}
```

### Damage formula used:
```
damage = baseCoefficient × stat × (1 + (level - 1) × scalingLevelMultiplier) × hitCount
```
Where `stat` is the Pokemon's ATK or Sp.ATK at the given level.

### How to get more accurate coefficients:
1. Go to Training Mode vs. a level-15 target dummy (Snorlax recommended for its known DEF).
2. Use the move at levels 5, 9, and 15 and record the damage numbers.
3. Back-calculate the coefficient: `coefficient = damage / (stat × hitCount)`.
4. Verify the scaling by checking at multiple levels.
5. Community resources: `https://unite-db.com` and Discord servers often publish tested values.

### Adding a new Pokemon's moves:
1. Test damage at levels 5, 9, 15 in Training Mode.
2. Record the stat values at those levels (shown in-game or from pvpoke data).
3. Calculate `baseCoefficient = recorded_damage / (stat × hitCount)`.
4. Add the entry to `MOVE_DAMAGE_TABLE`.

---

## 4. Move Descriptions — Currently Not Available Automatically

Move descriptions (the text explaining what the move does) are not provided by any public API or community JSON at the time of writing.

### Where to find them:
- **In-game:** License Compendium → select Pokemon → move details
- **Bulbapedia:** `https://bulbapedia.bulbagarden.net/wiki/<MoveName>_(UNITE)`
- **Unite DB:** `https://unite-db.com`

### How to add them to the builder:
The `MoveOption` interface has a `description: string` field. Currently it is always set to `''` in `normalizeMoveOption`. To add descriptions:

1. Create a lookup file `src/data/moveDescriptions.ts`:
```typescript
export const MOVE_DESCRIPTIONS: Record<string, string> = {
  'hydro_pump': 'Blasts out a high-pressure column of water in the designated direction...',
  // ...
};
```
2. Import it in `src/services/dataService.ts` and set:
```typescript
description: MOVE_DESCRIPTIONS[raw.moveId] ?? '',
```

---

## 5. Mechanics Glossary — `src/data/mechanicsGlossary.ts`

All game mechanic definitions (hindrance types, status conditions, move categories, damage types) are curated in this file.

**Sources:**
- Bulbapedia Status Conditions (UNITE): `https://bulbapedia.bulbagarden.net/wiki/Status_condition_(UNITE)`
- Bulbapedia Move (UNITE): `https://bulbapedia.bulbagarden.net/wiki/Move_(UNITE)`
- Unite DB FAQ: `https://unite-db.com/faq/elementary-mechanics`

### When the game adds a new mechanic:
1. Check the official Unite patch notes and community wikis.
2. Add a new `MechanicDefinition` entry to `MECHANICS_GLOSSARY` in `mechanicsGlossary.ts`.
3. To use it as a tag on a move, add the `moveId` to `CC_MOVE_MAP` with the appropriate `ccType`, or ensure the pvpoke `category` field includes the right keyword.

---

## 6. Sprites

Pokemon sprites are sourced from the PokeAPI sprite repository:
```
https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/{dex}.png
```

These are the main series sprites, not Unite-specific artwork. For Unite artwork, you would need to host the images yourself (official Unite art is copyright TiMi Studios / Nintendo).

---

## 7. Full Data Pipeline Summary

```
pvpoke-unite GitHub (automated, 24hr cache)
  └─ pokemon.json        → stats, moves, roles, evolution
  └─ heldItems.json      → held item stats
  └─ battleItems.json    → battle items

Manually curated (in this repo)
  └─ ccMoveMap.ts        → which moves apply CC and what type
  └─ moveDamageTable.ts  → damage coefficients (community-tested estimates)
  └─ mechanicsGlossary.ts → definitions of all game mechanics
  └─ moveDescriptions.ts → (to be added) in-game move text

PokeAPI Sprites (automated)
  └─ /sprites/pokemon/{dex}.png
```

### Recommended workflow for each new Unite patch:
1. Click **Refresh Data** in the app to pull the latest pvpoke JSON.
2. Check if any new Pokemon were added (they will appear with basic data automatically).
3. For new Pokemon, add their CC moves to `ccMoveMap.ts`.
4. Test and add damage coefficients for their moves in `moveDamageTable.ts`.
5. Optionally add move descriptions from Bulbapedia to a `moveDescriptions.ts` file.
6. Update `mechanicsGlossary.ts` if any new mechanics were introduced.
7. Commit and push changes to keep the repo current.
