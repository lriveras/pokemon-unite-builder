/**
 * Pokemon UNITE — Team Composition Dimension Glossary
 *
 * Each entry explains one of the eleven scoring dimensions used to evaluate
 * a team composition. Scores are 0–10 per Pokemon; the team score is the
 * average across all filled slots, then a composite weighted score is
 * derived and rendered as a 0–100 gauge.
 *
 * Scores are derived from real game data where possible:
 *   - HP, Atk, Def, Sp. Atk, Sp. Def at max level (Level 15)
 *   - pvpoke ratings (offense, endurance, mobility, scoring, support, leveling)
 *   - Move flags (isHeal, isShield, isDash, isBurst, ccType) from pvpoke JSON
 *   - Crowd Control move map (ccMoveMap.ts) with duration & quality per move
 *
 * References:
 *   - pvpoke-unite data: https://github.com/pvpoke/pvpoke-unite
 *   - Damage formula: https://bulbapedia.bulbagarden.net/wiki/Damage_(UNITE)
 *   - Unite DB mechanics: https://unite-db.com/faq/elementary-mechanics
 */

import { DimensionScores } from '../types/pokemon';

export interface DimensionDefinition {
  id: keyof DimensionScores;
  label: string;
  /** Broad strategic category for grouping */
  category: 'offense' | 'defense' | 'support' | 'utility' | 'timing';
  /** One-line summary shown in tooltips / short contexts */
  shortDescription: string;
  /** Full explanation of what the dimension measures */
  fullDescription: string;
  /**
   * Exactly which game data sources feed into this score.
   * Written so a player can trace the number back to in-game values.
   */
  dataSource: string;
  /** Strategy tip when the team's score in this dimension is high (≥ 7) */
  highMeaning: string;
  /** Strategy tip when the team's score in this dimension is low (< 4) */
  lowMeaning: string;
  /** Tailwind color classes for the accent badge */
  color: string;
}

export const TEAM_COMP_GLOSSARY: Record<keyof DimensionScores, DimensionDefinition> = {

  damageOutput: {
    id: 'damageOutput',
    label: 'Damage Output',
    category: 'offense',
    shortDescription: 'Raw offensive firepower of the team.',
    fullDescription:
      'Measures the team\'s capacity to deal damage in fights and burst down opponents. '
      + 'The score blends two data sources: the actual Attack or Sp. Atk stat of each '
      + 'Pokémon at Level 15 (normalized against the highest offensive stat across all '
      + 'archetypes, ~750) and the pvpoke offense rating (1–5 scale). Burst moves '
      + '(moves flagged as one-shot / spike damage) and Area-of-Effect moves each add '
      + 'a small bonus, since they translate raw stat power into high kill potential.',
    dataSource:
      'Atk or Sp. Atk at Level 15 (normalized / 750) × 40% '
      + '+ pvpoke offense rating (×2) × 60% '
      + '+ bonus for burst moves & AoE moves.',
    highMeaning:
      'Your team can burst enemies quickly. Prioritize picking off isolated targets '
      + 'before major objectives. Coordinate unite moves for the Zapdos fight.',
    lowMeaning:
      'Your team lacks raw firepower. Extend fights to benefit from sustained CC '
      + 'or objective pressure rather than attempting burst kills.',
    color: 'bg-red-900/60 text-red-300 border-red-700/50',
  },

  durability: {
    id: 'durability',
    label: 'Durability',
    category: 'defense',
    shortDescription: 'How much punishment the team can absorb.',
    fullDescription:
      'Derived from each Pokémon\'s Effective HP (EHP) at Level 15. '
      + 'EHP is calculated using the game\'s actual damage formula: '
      + 'EHP_physical = HP × (400 + Def) / 400 and '
      + 'EHP_special = HP × (400 + Sp. Def) / 400. '
      + 'The average of both is compared against the maximum possible EHP in the game '
      + '(~31 000, achieved by top-tier defenders). This means defenders score near 10, '
      + 'all-rounders score 5–6, and attackers/speedsters score 3–4, accurately '
      + 'reflecting how durable they are in actual combat. '
      + 'The pvpoke endurance rating and any self-sustain moves add secondary weight.',
    dataSource:
      'Average EHP at Level 15 (HP × (400+Def)/400 + HP × (400+SpDef)/400) / 2 '
      + 'normalized against max EHP (31 000) × 60% '
      + '+ pvpoke endurance rating × 40% '
      + '+ +0.5 if the Pokémon has self-sustain or heal moves.',
    highMeaning:
      'Your team can sustain prolonged engagements. Contest objectives head-on '
      + 'and consider diving the enemy backline without fear of being burst down.',
    lowMeaning:
      'Your team is fragile. Play from range, use hit-and-run tactics, and '
      + 'never overcommit without escape options. Eject Button is essential.',
    color: 'bg-blue-900/60 text-blue-300 border-blue-700/50',
  },

  crowdControl: {
    id: 'crowdControl',
    label: 'Crowd Control',
    category: 'utility',
    shortDescription: 'Ability to limit enemy movement and actions.',
    fullDescription:
      'Measures the quantity and quality of hindrance effects (stun, sleep, freeze, '
      + 'root, knock up, suppress, slow, pull) that the team can apply. '
      + 'Each Crowd Control move is looked up in a curated move database that records '
      + 'the exact CC type, duration in seconds, and quality (0–1 scale). '
      + 'The score formula is: quality × CC_type_weight × (duration / 3s cap). '
      + 'Hard CC (stun, suppress, freeze, sleep) contributes far more than soft CC (slow). '
      + 'Teams with diverse CC types can chain effects — e.g., knock up into stun — '
      + 'preventing enemies from ever acting.',
    dataSource:
      'Σ per CC move: quality × CC_type_weight × min(duration, 3s) / 3 × 4 '
      + 'where CC_type_weight: stun/suppress=1.0, freeze=0.9, sleep=0.85, root=0.8, '
      + 'knock up=0.75, pull=0.7, slow=0.5. '
      + 'Unmapped moves with ccType flag use type_weight × 2.0.',
    highMeaning:
      'Your team can dominate team fights by keeping enemies locked down. '
      + 'Stagger your Crowd Control abilities — don\'t use them all at once — '
      + 'to maintain constant pressure and deny enemy unite moves.',
    lowMeaning:
      'Enemies can act freely in team fights. Use terrain and positioning '
      + 'to compensate; consider equipping X Attack or Full Heal for survivability.',
    color: 'bg-purple-900/60 text-purple-300 border-purple-700/50',
  },

  mobility: {
    id: 'mobility',
    label: 'Mobility',
    category: 'utility',
    shortDescription: 'Speed of rotation, escape ability, and map coverage.',
    fullDescription:
      'Reflects how quickly the team can rotate between lanes, chase down enemies, '
      + 'or escape unfavorable situations. The pvpoke mobility rating (1–5) is the '
      + 'primary signal. Dash moves — moves where the Pokémon physically relocates '
      + 'during the animation — each add +1.5 (capped at 2 dash moves). If the '
      + 'unite move is a dash, +1 is added. Speedsters receive an inherent +1 for '
      + 'their class-level passive movement advantage.',
    dataSource:
      'pvpoke mobility rating × 2 '
      + '+ dash move count (capped at 2) × 1.5 '
      + '+ 1 if unite move is a dash '
      + '+ 1 if Speedster role.',
    highMeaning:
      'Your team can rotate rapidly and apply pressure across all three lanes. '
      + 'Exploit early objectives aggressively — you can disengage if things '
      + 'go wrong and reset before the next objective.',
    lowMeaning:
      'Your team is slow to respond to threats. Assign lanes early and avoid '
      + 'leaving your lane unattended. Use Eject Button or X Speed to patch gaps.',
    color: 'bg-yellow-900/60 text-yellow-300 border-yellow-700/50',
  },

  healing: {
    id: 'healing',
    label: 'Healing',
    category: 'support',
    shortDescription: 'HP recovery provided to self or teammates.',
    fullDescription:
      'Measures the team\'s capacity to restore HP during or after combat. '
      + 'Healing extends fight duration, negates burst damage over time, and '
      + 'reduces the need to retreat to base. Each move flagged as a heal (isHeal) '
      + 'contributes +3 to the score. Supporters receive +2.5 as a role identity '
      + 'bonus, reflecting that their primary purpose is team recovery. '
      + 'The pvpoke support rating also adds a small signal, since high-support '
      + 'Pokémon often have better healing tools even if individual flags are missed.',
    dataSource:
      'Number of heal moves (isHeal) × 3.0 '
      + '+ Supporter role bonus: +2.5 '
      + '+ Defender role bonus: +0.5 '
      + '+ pvpoke support rating × 0.3.',
    highMeaning:
      'Your team can sustain prolonged fights without retreating. Play aggressively '
      + 'near objectives; your healer can keep the team topped up through the fight.',
    lowMeaning:
      'No significant healing in the composition. Play conservatively and avoid '
      + 'over-extending. Consider equipping Sitrus Berry or Leftovers to self-sustain.',
    color: 'bg-green-900/60 text-green-300 border-green-700/50',
  },

  shielding: {
    id: 'shielding',
    label: 'Shielding',
    category: 'defense',
    shortDescription: 'Damage absorption via protective shields.',
    fullDescription:
      'Measures how much incoming burst damage the team can absorb before HP is '
      + 'affected. Shields are temporary HP buffers that disappear after taking '
      + 'enough damage. Unlike healing, shields are instantaneous and protect '
      + 'against sudden spike damage. Each shield move (isShield) contributes +3.5 '
      + 'to the score — shields are generally stronger than heals at preventing '
      + 'burst deaths. Defenders receive +2.5 as a role bonus, and a small endurance '
      + 'rating weight captures Pokémon with passive damage reduction.',
    dataSource:
      'Number of shield moves (isShield) × 3.5 '
      + '+ Defender role bonus: +2.5 '
      + '+ Supporter role bonus: +1.0 '
      + '+ pvpoke endurance rating × 0.2.',
    highMeaning:
      'Your team can withstand burst damage windows. Contest Zapdos even into '
      + 'enemy initiation — shields absorb the initial burst. Time shields '
      + 'proactively before engage rather than reactively.',
    lowMeaning:
      'Your team is exposed to burst damage. Add Buddy Barrier held items to '
      + 'grant unite move shields, and position carefully to avoid being one-shotted.',
    color: 'bg-cyan-900/60 text-cyan-300 border-cyan-700/50',
  },

  teamFight: {
    id: 'teamFight',
    label: 'Team Fight',
    category: 'offense',
    shortDescription: 'Effectiveness in 5v5 clashes around Zapdos and objectives.',
    fullDescription:
      'Measures how well the team performs in the pivotal 5v5 team fights that '
      + 'determine objective control. AoE moves hit multiple enemies simultaneously, '
      + 'turning a single action into multi-target pressure. AoE moves that also apply '
      + 'Crowd Control (e.g., Blastoise\'s Surf, Wigglytuff\'s Sing) are especially '
      + 'potent — they displace and lock down multiple enemies at once. The single '
      + 'biggest team-fight factor is the unite move: an AoE unite (e.g., Blastoise '
      + 'Hydro Typhoon, Venusaur Verdant Anger) can flip an entire fight instantly. '
      + 'Defenders and Supporters receive a role bonus as frontline anchors.',
    dataSource:
      'AoE regular moves × 2.0 '
      + '+ AoE + CC regular moves × 1.5 '
      + '+ AoE unite move: +3.5 (+ 1.0 more if also CC) '
      + '+ Defender/Supporter role: +2.0, All-Rounder: +1.0 '
      + '+ (pvpoke support + endurance ratings) / 2 × 0.3.',
    highMeaning:
      'Your team dominates team fights. Force 5v5 engagements at every objective, '
      + 'especially Zapdos. Coordinate AoE unite moves to hit multiple enemies and '
      + 'use AoE CC to prevent enemies from retreating or using their unites.',
    lowMeaning:
      'Your team is weak in extended 5v5 fights. Avoid head-to-head clashes and '
      + 'instead win through split-pushing, objective stealing, or pick strategies. '
      + 'Add AoE Pokémon (Blastoise, Venusaur, Decidueye) to improve team fight power.',
    color: 'bg-rose-900/60 text-rose-300 border-rose-700/50',
  },

  engage: {
    id: 'engage',
    label: 'Engage / Pick',
    category: 'utility',
    shortDescription: 'Ability to initiate fights and pick off isolated targets.',
    fullDescription:
      'Measures how well the team can start fights on its own terms — diving the '
      + 'enemy backline, locking down high-value targets, or initiating before the '
      + 'opponent is ready. The gold standard engage tool is a dash move that also '
      + 'applies Crowd Control (gap-close + immediate lockdown). Hard CC from range '
      + '(stun, suppress, sleep, freeze, root) is also very effective since it '
      + 'initiates a fight without needing to close the gap. Unite moves with '
      + 'dash+CC (e.g., Talonflame, Cramorant) or suppression (e.g., Slowbro) '
      + 'are the strongest initiation tools in the game. Speedsters excel at '
      + 'picking off isolated targets; All-Rounders are reliable divers.',
    dataSource:
      'Dash + CC moves × 3.5 '
      + '+ Hard CC (stun/suppress/sleep/freeze/root) without dash × 1.5 '
      + '+ Dash moves without CC × 0.5 '
      + '+ Unite move: dash+CC +3.0, suppress/stun +2.5, dash-only +1.0, CC-only +1.0 '
      + '+ Speedster role: +2.0, All-Rounder: +1.0 '
      + '+ pvpoke mobility rating × 0.2.',
    highMeaning:
      'Your team can dictate fight timing. Look for isolated enemies to pick, '
      + 'force fights near objectives when advantaged, and use engage tools to '
      + 'interrupt enemy scoring plays. Coordinate engage with your damage dealers '
      + 'to burst the target before they can react.',
    lowMeaning:
      'Your team cannot reliably start fights. Play reactively — set up in '
      + 'objective zones and wait for enemies to commit before responding. '
      + 'Eject Button can serve as an emergency disengage when opponents engage first.',
    color: 'bg-fuchsia-900/60 text-fuchsia-300 border-fuchsia-700/50',
  },

  objectiveThreat: {
    id: 'objectiveThreat',
    label: 'Objective Threat',
    category: 'utility',
    shortDescription: 'Capacity to contest and secure Dreadnaw, Zapdos, and goals.',
    fullDescription:
      'Measures how effectively the team can claim map objectives. '
      + 'The pvpoke scoring rating (1–5) is the primary signal — it encodes '
      + 'dunking potential and scoring zone presence. All-Rounders and Speedsters '
      + 'receive a +1 bonus for their natural objective-taking tendencies. '
      + 'Pokémon with AoE unite moves (+0.5) can clear Dreadnaw and Zapdos '
      + 'health bars faster in team fights.',
    dataSource:
      'pvpoke scoring rating × 2 '
      + '+ 1 if All-Rounder or Speedster role '
      + '+ 0.5 if unite move is AoE.',
    highMeaning:
      'Your team is built to win objectives. Force fights at Dreadnaw (5:00) '
      + 'and Zapdos (2:00) — your objective pressure can snowball the game.',
    lowMeaning:
      'Your team may struggle to contest objectives. Rotate early to secure '
      + 'Dreadnaw before the enemy; if behind, protect the Zapdos goal zone '
      + 'rather than contesting directly.',
    color: 'bg-amber-900/60 text-amber-300 border-amber-700/50',
  },

  earlyGame: {
    id: 'earlyGame',
    label: 'Early Game',
    category: 'timing',
    shortDescription: 'Power and farm efficiency in the early laning phase.',
    fullDescription:
      'Reflects how strong the team is during the opening minutes of the match '
      + '(approximately minutes 10:00 – 7:00 on the in-game timer). '
      + 'The pvpoke leveling rating (1–5) is the primary data source — it captures '
      + 'early farming speed, level advantage over opponents, and pre-evolution '
      + 'power. Pokémon with high leveling ratings come online faster, '
      + 'enabling early Dreadnaw control and lane dominance.',
    dataSource:
      'pvpoke leveling rating × 2.',
    highMeaning:
      'Your team spikes early. Contest the first Dreadnaw aggressively, '
      + 'invade the enemy jungle at level 5+, and try to snowball the point lead '
      + 'before opponents can scale.',
    lowMeaning:
      'Your team is weak early. Farm safely, do not over-extend before you\'re '
      + 'at full power (level 7–9+), and cede Dreadnaw if contested. '
      + 'Your window is late-game Zapdos.',
    color: 'bg-orange-900/60 text-orange-300 border-orange-700/50',
  },

  lateGame: {
    id: 'lateGame',
    label: 'Late Game',
    category: 'timing',
    shortDescription: 'Power spike at full level and during the final Zapdos fight.',
    fullDescription:
      'Measures how strong the team is once all Pokémon reach Level 13–15 '
      + 'and have their upgraded moves unlocked. The score blends the pvpoke '
      + 'offense and endurance ratings (average) to capture both damage ceiling '
      + 'and survivability at max power. Pokémon with upgraded moves (+0.5) '
      + 'have notably stronger final-level move variants, and Pokémon with '
      + 'AoE unite moves (+0.5) are especially dangerous in the climactic '
      + 'Zapdos team fight.',
    dataSource:
      '(pvpoke offense rating + endurance rating) / 2 × 2 '
      + '+ 0.5 if any upgraded moves available '
      + '+ 0.5 if unite move is AoE.',
    highMeaning:
      'Your team peaks late. Survive to the Zapdos window intact — '
      + 'save unite moves for the final push and contest every Zapdos.',
    lowMeaning:
      'Your team does not scale well. Earn your lead in the early-mid game '
      + 'and maintain point advantages rather than banking on a late comeback.',
    color: 'bg-violet-900/60 text-violet-300 border-violet-700/50',
  },
};

/** All dimension definitions in display order */
export const DIMENSION_GLOSSARY_LIST = Object.values(TEAM_COMP_GLOSSARY);
