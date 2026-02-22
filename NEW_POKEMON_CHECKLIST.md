# Adding a New Pokémon UNITE License — Reference Guide

Use this document every time TiMi Studios releases a new license.
It lists every piece of data you need, exactly where to find it, and which file to update.

> New licenses in 2026 are releasing approximately 2 per month.
> Last confirmed: **Sirfetch'd** (January 30, 2026).
> Upcoming: **Zapdos**, **Articuno**, **Moltres** (February–March 2026).

---

## Quick Checklist

- [ ] 1. Basic attributes (role, range, style, difficulty, dex) → `pokemonRoster.ts`
- [ ] 2. Per-level stats (HP/ATK/DEF/Sp.ATK/Sp.DEF, levels 1–15) → `pokemonRoster.ts`
- [ ] 3. Evolution chain (which forms, at which levels) → `pokemonRoster.ts`
- [ ] 4. Move names and slots → automatic if pvpoke adds it; else manual
- [ ] 5. CC types per move → `ccMoveMap.ts`
- [ ] 6. Move descriptions → `src/data/moveDescriptions.ts` (once created)
- [ ] 7. Damage coefficients (optional, for Stats Lab) → `moveDamageTable.ts`
- [ ] 8. Mechanic glossary update (if new mechanic introduced) → `mechanicsGlossary.ts`

---

## 1. Basic Attributes
**Role · Range Type · Attack Style · Difficulty · National Dex Number**

### Primary sources (open, no login needed)

| Source | URL | What to look for |
|--------|-----|-----------------|
| **Bulbapedia — UNITE Pokémon list** | https://bulbapedia.bulbagarden.net/wiki/List_of_Pok%C3%A9mon_in_Pok%C3%A9mon_UNITE | Full table: Role, Range, Style, Difficulty. Most reliable for official classifications. |
| **Official Pokémon UNITE roster** | https://unite.pokemon.com/en-us/pokemon/ | Shows all released licenses with role icons. Good for confirming a new release exists. |
| **Pokémon UNITE Fandom Wiki — Pokémon list** | https://pokemonunite.fandom.com/wiki/List_of_Pok%C3%A9mon | Community-maintained, often updated day-of-release. |
| **Bulbapedia — individual Pokémon page (UNITE)** | `https://bulbapedia.bulbagarden.net/wiki/<PokemonName>_(Pok%C3%A9mon_UNITE)` | Individual license page: role, stats, full move list. Replace `<PokemonName>` with the name (e.g. `Sirfetch%27d`). |
| **National Dex numbers** | https://bulbapedia.bulbagarden.net/wiki/List_of_Pok%C3%A9mon_by_National_Pok%C3%A9dex_number | Always use the national dex number for the `dex` field. |

### Field mapping for `pokemonRoster.ts`

```
Role          → role: 'attacker' | 'defender' | 'supporter' | 'speedster' | 'all_rounder'
Range         → type: 'melee' | 'ranged'
Attack Style  → style: 'physical' | 'special' | 'mixed'
Difficulty    → difficulty: 'novice' | 'intermediate' | 'expert'
```

---

## 2. Per-Level Stats (HP, ATK, DEF, Sp.ATK, Sp.DEF at Levels 1–15)

> This is the hardest data to get. No public API provides it automatically.
> pvpoke-unite covers only 25 Pokémon and is not actively expanded.

### Where to find verified stats

| Source | URL pattern | Notes |
|--------|-------------|-------|
| **UniteAPI.dev — individual Pokémon page** | `https://uniteapi.dev/pokemon/best-builds-movesets-and-guide-for-<name>` | Shows stats at every level. Must be viewed in browser — blocks automated fetching. Example: https://uniteapi.dev/pokemon/best-builds-movesets-and-guide-for-sirfetchd |
| **Unite DB — stats page** | `https://unite-db.com/pokemon/<name>` | Community wiki with per-level stat tables. Example: https://unite-db.com/pokemon/sirfetchd |
| **Pokémon UNITE Fandom Wiki — individual Pokémon** | `https://pokemonunite.fandom.com/wiki/<PokemonName>` | Has stats section with level progression. Example: https://pokemonunite.fandom.com/wiki/Sirfetch%27d |
| **Game8 — Pokémon UNITE guides** | `https://game8.co/games/Pokemon-UNITE/archives/<article-id>` | Per-Pokémon guides include stat tables. Search "Game8 [PokemonName] Unite" to find the article. |
| **pvpoke-unite GitHub** | https://raw.githubusercontent.com/pvpoke/pvpoke-unite/master/src/data/gamemaster/pokemon.json | Only 25 Pokémon. Check if your Pokémon was added — if yes, the app picks it up automatically on Refresh. |

### How to add stats to the codebase

Open `src/data/pokemonRoster.ts`. Find the Pokémon entry (add it if new).
Replace the archetype estimate `s(...)` call with exact values:

```typescript
// Replace:
stats: ATK_SP_RNG,   // archetype estimate

// With exact values from uniteapi.dev/unite-db (L1 values only — app scales the rest):
stats: s(3200, 134, 35, 270, 30),  // (hp, atk, def, sp_atk, sp_def) at Level 1
```

> **Tip:** The `s()` helper generates all 15 levels using linear scaling.
> If you have stats at multiple levels from the source, use L1 values.
> For maximum accuracy, consider listing all 15 levels manually — see the pvpoke
> JSON format (each level as an object) in the `RawPokemon.stats` field.

---

## 3. Evolution Chain

### Sources

| Source | URL |
|--------|-----|
| **Bulbapedia — UNITE Pokémon page** | `https://bulbapedia.bulbagarden.net/wiki/<PokemonName>_(Pok%C3%A9mon_UNITE)` |
| **UniteAPI.dev** | `https://uniteapi.dev/pokemon/best-builds-movesets-and-guide-for-<name>` |
| **In-game** | Battle or Training Mode — watch for on-screen evolution prompts |

### Format in `pokemonRoster.ts`

```typescript
stages: [
  { stageId: 'base_form',    level: 1  },  // starting form
  { stageId: 'middle_form',  level: 5  },  // evolves at level 5
  { stageId: 'final_form',   level: 9  },  // fully evolved
],
```

Use `snake_case` for `stageId` matching the national Pokédex name.
Leave `stages: []` for Pokémon with no in-battle evolution (most legendaries, single-stage licenses).

---

## 4. Moves (Names, Slots, Categories, Cooldowns)

### Sources

| Source | URL | Notes |
|--------|-----|-------|
| **pvpoke-unite JSON** | https://raw.githubusercontent.com/pvpoke/pvpoke-unite/master/src/data/gamemaster/pokemon.json | Automatic if your Pokémon is included. Has `slot1`, `slot2`, `unite`, `basic`, `passive` with cooldowns and categories. |
| **UniteAPI.dev** | `https://uniteapi.dev/pokemon/best-builds-movesets-and-guide-for-<name>` | Shows all moves, cooldowns, and move descriptions. View in browser. |
| **Bulbapedia — individual Pokémon UNITE page** | `https://bulbapedia.bulbagarden.net/wiki/<PokemonName>_(Pok%C3%A9mon_UNITE)` | Complete move list with descriptions. Most authoritative text source. |
| **Unite DB** | `https://unite-db.com/pokemon/<name>` | Move descriptions and upgrade effects. |
| **Pokémon UNITE Fandom Wiki** | `https://pokemonunite.fandom.com/wiki/<PokemonName>` | Full move table with descriptions. |

### What to record

For each move in Slot 1 and Slot 2 (base + upgrade):
- Move name
- Category: `melee` / `ranged` / `dash` / `area` / `recovery` / `hindrance` / `debuff` / `buff`
- Cooldown in seconds
- Whether it's the base or upgraded version

Move data for Pokémon not in pvpoke currently shows as empty in the Licenses page.
To add manually, extend `pokemonRoster.ts` entries with a `moves` field — see
`src/types/pokemon.ts` → `RawPokemon.moves` for the schema.

---

## 5. CC Types Per Move (Crowd Control)
**File to update:** `src/constants/ccMoveMap.ts`

### Sources

| Source | URL | Notes |
|--------|-----|-------|
| **Bulbapedia — Status Conditions (UNITE)** | https://bulbapedia.bulbagarden.net/wiki/Status_condition_(UNITE) | Definitive list of all CC types and how they work. |
| **Bulbapedia — individual move page** | `https://bulbapedia.bulbagarden.net/wiki/<MoveName>_(move)` | Check the UNITE section for CC details. |
| **UniteAPI.dev** | `https://uniteapi.dev/pokemon/best-builds-movesets-and-guide-for-<name>` | Move descriptions mention CC types. |
| **Unite DB** | `https://unite-db.com/pokemon/<name>` | Often notes hindrance types in move text. |
| **In-game License Compendium** | In-game → My Items → License Compendium | The most accurate source. Move descriptions explicitly name CC types. |

### CC type quick reference

| In-game text | `ccType` value to use | Quality |
|--------------|----------------------|---------|
| "leaves the opposing Pokémon unable to act" | `stun` | 1.0 |
| "leaves the opposing Pokémon unable to move or act" | `suppress` | 1.0 |
| "puts the opposing Pokémon to sleep" | `sleep` | 0.85 |
| "freezes the opposing Pokémon" | `freeze` | 0.9 |
| "throws / shoves the opposing Pokémon" | `knock` | 0.75 |
| "launches the opposing Pokémon into the air" | `knockup` | 0.75 |
| "pulls the opposing Pokémon" | `pull` | 0.7 |
| "immobilizes the opposing Pokémon" | `root` | 0.8 |
| "decreases movement speed" | `slow` | 0.5 |
| "binds the opposing Pokémon" | `bound` | 1.0 |

### Adding an entry

```typescript
// In src/constants/ccMoveMap.ts:
'move_name': { ccType: 'stun', duration: 1.0, quality: 1.0 },
```

The `moveId` must match the snake_case ID in the pvpoke JSON (e.g. `meteor_mash`, `close_combat`).
For new Pokémon not yet in pvpoke, use the snake_case of the English move name.

---

## 6. Move Descriptions
**File to update:** `src/data/moveDescriptions.ts`

> This file **exists** and is populated with descriptions for all 25 pvpoke-covered Pokémon
> (verified February 2026 from Bulbapedia). Add entries for new releases as they come out.

### Sources (in order of accuracy)

| Source | URL | Notes |
|--------|-----|-------|
| **In-game License Compendium** | In-game only | Gold standard. Exact text used by TiMi Studios. |
| **Bulbapedia — individual Pokémon UNITE page** | `https://bulbapedia.bulbagarden.net/wiki/<PokemonName>_(Pok%C3%A9mon_UNITE)` | Transcribes in-game text verbatim. Most reliable automated source. |
| **UniteAPI.dev** | `https://uniteapi.dev/pokemon/best-builds-movesets-and-guide-for-<name>` | Includes move effect descriptions. Must be viewed in browser (blocks bots). |
| **Unite DB** | `https://unite-db.com/pokemon/<name>` | Move descriptions and upgrade effects. |
| **Pokémon UNITE Fandom Wiki** | `https://pokemonunite.fandom.com/wiki/<MoveName>` | Individual move pages with full description. |

### How to add descriptions for a new release

1. Go to `https://bulbapedia.bulbagarden.net/wiki/<PokemonName>_(Pok%C3%A9mon_UNITE)`
2. Copy the description text for each move from the Moves section.
3. Open `src/data/moveDescriptions.ts` and add a block at the bottom:

```typescript
// ══════════════════════════════════════════════════════
// NEW POKEMON NAME
// Source: https://bulbapedia.bulbagarden.net/wiki/NewPokemon_(Pok%C3%A9mon_UNITE)
// ══════════════════════════════════════════════════════
new_move_id: 'Description text here.',
upgraded_new_move_id: 'Upgraded description here.',
new_pokemon_unite: 'Unite Move description here.',
```

4. The `moveId` for each move must match the pvpoke JSON field:
   - Look in `moves.slot1[].moveId`, `moves.slot2[].moveId`, `moves.unite.moveId`
   - Source: https://raw.githubusercontent.com/pvpoke/pvpoke-unite/master/src/data/pokemon.json

The description is automatically shown in the **Licenses → Moves & Damage** tab once added.

---

## 7. Damage Coefficients (for Stats Lab damage calculator)
**File to update:** `src/constants/moveDamageTable.ts`

> These must be derived from in-game testing — no source publishes them as structured data.

### How to test in-game

1. Open **Training Mode**
2. Set the training dummy to a known level (use **Level 15 Snorlax** — it has published DEF values)
3. Use the move at **Level 5, 9, and 15** and record the damage number shown
4. The damage formula is:
   ```
   damage = coefficient × stat × (1 + (level - 1) × scalingPerLevel) × hitCount
   ```
5. Solve for `coefficient` at each level to verify it's consistent

### Community sources for pre-tested values

| Source | URL |
|--------|-----|
| **Unite DB** | https://unite-db.com |
| **Game8 damage guides** | https://game8.co/games/Pokemon-UNITE |
| **Pokémon UNITE subreddit** | https://www.reddit.com/r/PokemonUnite/ |
| **Pokémon UNITE Discord servers** | Search "Pokemon UNITE damage calculator" on Discord |

---

## 8. Game Mechanic Definitions (new mechanics only)
**File to update:** `src/data/mechanicsGlossary.ts`

TiMi Studios occasionally introduces new mechanic keywords (e.g. a new status condition or
move category). Check these sources after each major patch:

| Source | URL |
|--------|-----|
| **Official patch notes** | https://unite.pokemon.com/en-us/news/ |
| **Bulbapedia — Status Conditions (UNITE)** | https://bulbapedia.bulbagarden.net/wiki/Status_condition_(UNITE) |
| **Bulbapedia — Move (UNITE)** | https://bulbapedia.bulbagarden.net/wiki/Move_(UNITE) |
| **Unite DB FAQ** | https://unite-db.com/faq/elementary-mechanics |
| **Pokémon UNITE Fandom Wiki — Game Mechanics** | https://pokemonunite.fandom.com/wiki/Game_mechanics |

---

## 9. Official Announcements & Release Schedule

Use these to know when a new license is coming before it drops:

| Source | URL | Notes |
|--------|-----|-------|
| **Official Pokémon UNITE site — News** | https://unite.pokemon.com/en-us/news/ | Official announcements. Usually 1–2 weeks before release. |
| **Pokémon UNITE Twitter/X** | https://x.com/PokemonUnite | First announcements often here. |
| **Serebii — Pokémon UNITE** | https://www.serebii.net/pokemonunite/ | Fast aggregation of official news and datamines. |
| **Pokémon UNITE Fandom Wiki — Upcoming** | https://pokemonunite.fandom.com/wiki/Pok%C3%A9mon_UNITE_Wiki | Tracks confirmed upcoming Pokemon. |
| **Bulbapedia — UNITE Pokémon list** | https://bulbapedia.bulbagarden.net/wiki/List_of_Pok%C3%A9mon_in_Pok%C3%A9mon_UNITE | Updated promptly after releases. |

---

## 10. Sprites

Sprites are fetched automatically from PokeAPI using the national dex number:
```
https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/{dex}.png
```

For new Pokémon from Generation 9+ (dex > 905), PokeAPI may not have sprites immediately.
Check: https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/

**Alternative sprite sources:**
| Source | URL |
|--------|-----|
| PokeAPI sprites GitHub | https://github.com/PokeAPI/sprites |
| Serebii artwork | https://www.serebii.net/unite/pokemon.shtml (official Unite art, not for redistribution) |

---

## Summary Table — One Line Per Data Type

| Data | Best Source | URL |
|------|------------|-----|
| Role / Range / Style / Difficulty | Bulbapedia | https://bulbapedia.bulbagarden.net/wiki/List_of_Pok%C3%A9mon_in_Pok%C3%A9mon_UNITE |
| National Dex number | Bulbapedia | https://bulbapedia.bulbagarden.net/wiki/List_of_Pok%C3%A9mon_by_National_Pok%C3%A9dex_number |
| Per-level stats | UniteAPI.dev (browser) | `https://uniteapi.dev/pokemon/best-builds-movesets-and-guide-for-<name>` |
| Per-level stats (alt) | Unite DB | `https://unite-db.com/pokemon/<name>` |
| Per-level stats (alt) | Fandom Wiki | `https://pokemonunite.fandom.com/wiki/<Name>` |
| Move names / slots / cooldowns | pvpoke (if available) | https://raw.githubusercontent.com/pvpoke/pvpoke-unite/master/src/data/gamemaster/pokemon.json |
| Move descriptions | Bulbapedia individual page | `https://bulbapedia.bulbagarden.net/wiki/<Name>_(Pok%C3%A9mon_UNITE)` |
| CC types | In-game + Bulbapedia | https://bulbapedia.bulbagarden.net/wiki/Status_condition_(UNITE) |
| Damage coefficients | In-game testing | Training Mode vs Level 15 Snorlax |
| New mechanics | Official patch notes | https://unite.pokemon.com/en-us/news/ |
| Release announcements | Serebii | https://www.serebii.net/pokemonunite/ |
| Sprites | PokeAPI | `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/{dex}.png` |

---

## URL Name Formatting Tips

Most sources use lowercase with hyphens for Pokémon names in URLs:

| Pokémon | URL slug |
|---------|----------|
| Alolan Ninetales | `alolanninetales` or `alolan-ninetales` |
| Mr. Mime | `mr-mime` or `mrmime` |
| Galarian Rapidash | `galarian-rapidash` or `galarian_rapidash` |
| Sirfetch'd | `sirfetchd` (drop the apostrophe) |
| Ho-Oh | `ho-oh` |
| Mewtwo (X form) | `mewtwo` or `mewtwox` depending on site |

When in doubt, search the site's own Pokémon index page first.
