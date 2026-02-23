/**
 * Pokémon UNITE — Move Descriptions
 *
 * All descriptions are sourced from Bulbapedia's individual Pokémon UNITE pages:
 *   https://bulbapedia.bulbagarden.net/wiki/<Name>_(Pok%C3%A9mon_UNITE)
 *
 * Example URLs:
 *   Pikachu  → https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon_UNITE)
 *   Snorlax  → https://bulbapedia.bulbagarden.net/wiki/Snorlax_(Pok%C3%A9mon_UNITE)
 *   Charizard→ https://bulbapedia.bulbagarden.net/wiki/Charizard_(Pok%C3%A9mon_UNITE)
 *   (etc.)
 *
 * HOW TO UPDATE FOR NEW RELEASES
 * ───────────────────────────────
 * 1. Navigate to https://bulbapedia.bulbagarden.net/wiki/<PokemonName>_(Pok%C3%A9mon_UNITE)
 * 2. Find the "Moves" section — each move has a description paragraph.
 * 3. Copy the description text and add an entry here: '<moveId>': '<description>'
 * 4. The moveId comes from the pvpoke-unite JSON:
 *    https://raw.githubusercontent.com/pvpoke/pvpoke-unite/master/src/data/pokemon.json
 *    Look in moves.slot1[], moves.slot2[], or moves.unite for the "moveId" field.
 *
 * NOTES
 * ─────
 * - Some Pokemon have Pokemon-specific move variants with unique IDs
 *   (e.g. surf_greninja, surf_blastoise, surf_slowbro are all the same move name
 *   but separate entries in the pvpoke JSON).
 * - Passive abilities (e.g. torrent, thick_fat) are included for completeness
 *   but are not shown in the Moves tab by default.
 * - Unite Move descriptions are included and mapped by their unite moveId.
 * - Last verified: February 2026
 */

export const MOVE_DESCRIPTIONS: Record<string, string> = {

  // ══════════════════════════════════════════════════════
  // PIKACHU
  // Source: https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon_UNITE)
  // ══════════════════════════════════════════════════════
  thunder_shock:
    'Releases electricity, dealing damage to opposing Pokémon in the area of effect. Also paralyzes opposing Pokémon for a short time.',
  electro_ball:
    "Hurls an electric orb, dealing damage to opposing Pokémon in the area of effect and leaving them paralyzed for a short time. This move's damage increases the lower the opposing Pokémon's remaining HP is.",
  thunder:
    'Drops wicked thunderbolts, dealing damage to opposing Pokémon in the area of effect.',
  electro_web:
    'Attacks and captures opposing Pokémon using an electric net, leaving them unable to move.',
  volt_switch:
    'Has the user electrify itself and charge ahead, throwing opposing Pokémon. For a short time after the user lands, the user\'s movement speed is increased.',
  thunderbolt:
    'Attacks with a strong electric blast, dealing damage to opposing Pokémon in the area of effect and leaving them unable to act.',
  plasma_gale:
    'Attacks the opposing team\'s Pokémon near the user with tremendous bolts of lightning, then attacks two Pokémon from the opposing team near the user multiple times with lightning.',

  // ══════════════════════════════════════════════════════
  // SNORLAX
  // Source: https://bulbapedia.bulbagarden.net/wiki/Snorlax_(Pok%C3%A9mon_UNITE)
  // ══════════════════════════════════════════════════════
  tackle:
    'Has the user charge forward belly first, dealing damage when it hits and shoving the first opposing Pokémon it comes in contact with. After this move, the user\'s next basic attack becomes a boosted attack.',
  flail:
    'Has the user flail about and increases its movement speed for a short time. Increases the user\'s basic attack damage the lower the user\'s HP is and decreases the movement speed of opposing Pokémon for a short time when basic attacks hit.',
  block:
    'Has the user spread its arms wide to create a wall and grants it a shield. Prevents opposing Pokémon from passing through the wall and shoves them if they run into it.',
  yawn:
    'Has the user let loose a huge yawn that lulls opposing Pokémon into a sleepy haze, putting opposing Pokémon hit by this move to sleep.',
  heavy_slam:
    'Has the user slam its heavy body down, dealing damage to opposing Pokémon in the area of effect and throwing them.',
  rest:
    'Has the user fall asleep on the spot and restores its HP. Blocks the movement of all Pokémon not on the user\'s team while this move is in effect.',
  power_nap:
    'Has the user go to sleep and begin snoring, dealing damage over time to opposing Pokémon in the area of effect and throwing them. While sleeping, the user becomes immune to hindrances and its HP is continually restored.',

  // ══════════════════════════════════════════════════════
  // CHARIZARD
  // Source: https://bulbapedia.bulbagarden.net/wiki/Charizard_(Pok%C3%A9mon_UNITE)
  // ══════════════════════════════════════════════════════
  ember:
    'Shoots out a small flame, dealing damage to opposing Pokémon, leaving them burned and decreasing their Attack for a short time.',
  flame_burst:
    'Attacks with a bursting flame. When this move hits, it leaves opposing Pokémon burned and increases the user\'s movement speed for a short time.',
  flamethrower:
    'Attacks with an intense blast of fire. When this move hits, it leaves opposing Pokémon burned and increases the user\'s movement speed for a short time.',
  fire_spin:
    'Encircles opposing Pokémon in the area of effect in a vortex of fire. After this move hits, it deals damage over time and decreases the movement speed of opposing Pokémon for a short time.',
  flare_blitz:
    'Has the user charge forward cloaked in fire, throwing opposing Pokémon. Also grants the user a shield.',
  fire_punch:
    'Has the user punch with a fiery fist, dealing damage and shoving opposing Pokémon when it hits. Also leaves the opposing Pokémon it shoves burned.',
  seismic_slam:
    "Has the user grab a Pokémon from the opposing team and slam it onto the ground from the air. For a set amount of time afterward, the user can move freely over obstacles. While this Unite Move is being used, the user's basic attacks deal increased damage and leave opposing Pokémon burned. In addition, when the user deals damage to an opposing Pokémon, the user recovers HP.",

  // ══════════════════════════════════════════════════════
  // BLASTOISE
  // Source: https://bulbapedia.bulbagarden.net/wiki/Blastoise_(Pok%C3%A9mon_UNITE)
  // ══════════════════════════════════════════════════════
  water_gun_blastoise:
    'Attacks with a shot of water, shoving opposing Pokémon and decreasing their movement speed for a short time.',
  water_spout:
    'Fires a powerful spout of water in a wide area, dealing damage to opposing Pokémon in the area of effect.',
  surf_blastoise:
    'Has the user charge forward on a wave, shoving opposing Pokémon and leaving them unable to act. The user becomes immune to hindrances while using this move and can jump in a designated direction once this move ends.',
  rapid_spin:
    "Has the user spin rapidly, dealing damage over time to nearby opposing Pokémon. Changes the mechanics of the user's basic attacks as well as its Hydro Pump and Water Spout moves.",
  skull_bash:
    'Fiercely rams an opposing Pokémon and leaves it unable to act.',
  hydro_pump:
    'Has the user attack by blasting out a huge volume of water, dealing damage to opposing Pokémon and shoving them when it hits.',
  hydro_typhoon:
    'Has the user spout water to attack while spinning, throwing opposing Pokémon in a large area. This also grants the user a shield.',

  // ══════════════════════════════════════════════════════
  // MACHAMP
  // Source: https://bulbapedia.bulbagarden.net/wiki/Machamp_(Pok%C3%A9mon_UNITE)
  // ══════════════════════════════════════════════════════
  karate_chop:
    'Attacks opposing Pokémon with a sharp chop.',
  submission:
    "Increases the user's movement speed and makes it immune to hindrances. When the user's next basic attack hits, the attack deals increased damage and slams the opposing Pokémon onto the ground, leaving them unable to act.",
  cross_chop:
    "Has the user deliver a double chop with forearms crossed while dashing forward. This also increases the user's critical-hit rate.",
  dynamic_punch:
    'Has the user jump to the designated location, dealing damage to opposing Pokémon in the area of effect and leaving them unable to act when it hits. For a short time after using this move, the user becomes immune to hindrances and its movement speed and Attack are increased.',
  close_combat_machamp:
    'Unleashes a series of punches in the designated direction, dealing increased damage with the last punch. The user can move while using this move and becomes immune to hindrances.',
  seismic_toss:
    'Has the user grab an opposing Pokémon and hurl it, dealing damage. The more HP the opposing Pokémon has, the greater the damage dealt.',
  barrage_blow:
    "Has the user unleash a combo attack using its four arms, dealing damage to opposing Pokémon in the area of effect and shoving them. The final blow deals an especially large amount of damage. Increases the user's movement speed, Attack, Defense, and Sp. Def for a short time.",
  bulk_up:
    "Tenses the muscles to raise the user's Attack and Defense for a short time.",

  // ══════════════════════════════════════════════════════
  // VENUSAUR
  // Source: https://bulbapedia.bulbagarden.net/wiki/Venusaur_(Pok%C3%A9mon_UNITE)
  // ══════════════════════════════════════════════════════
  razor_leaf:
    'Launches many sharp-edged leaves in a quick succession of attacks, dealing damage to opposing Pokémon in the area of effect.',
  seed_bomb:
    'Hurls a large seed at the designated area, dealing damage to opposing Pokémon in the area of effect.',
  giga_drain:
    "Drains HP from opposing Pokémon in the area of effect, dealing damage to them and restoring the user's HP when it hits. Also reduces the damage the user receives for a short time.",
  petal_dance:
    'Scatters petals around the user, increasing movement speed for a short time and dealing damage over time to opposing Pokémon in the area of effect. If this move hits Pokémon on the opposing team, the cooldown of Giga Drain or Sludge Bomb is reduced.',
  solar_beam:
    'Blasts a bundled beam of light, dealing damage to opposing Pokémon in the area of effect.',
  sludge_bomb_venusaur:
    'Hurls unsanitary sludge to the designated area, dealing damage to opposing Pokémon in the area of effect, leaving them poisoned and decreasing their movement speed and Sp. Def for a short time.',
  verdant_anger:
    'Launches a giant seed toward the designated area. The seed then splits apart, dealing damage to opposing Pokémon in the area of effect and decreasing their movement speed for a short time.',

  // ══════════════════════════════════════════════════════
  // ALOLAN NINETALES
  // Source: https://bulbapedia.bulbagarden.net/wiki/Alolan_Ninetales_(Pok%C3%A9mon_UNITE)
  // ══════════════════════════════════════════════════════
  powder_snow:
    'Attacks with a chilly gust of powdery snow, decreasing the movement speed of opposing Pokémon for a short time when it hits.',
  dazzling_gleam_ninetales:
    'Attacks with a powerful cone of blinding light, leaving opposing Pokémon unable to act when this move hits.',
  blizzard:
    'Summons a howling blizzard in two blasts in a forward direction. The first blast deals damage to opposing Pokémon in the area of effect and decreases their movement speed for a short time. The second blast deals damage to opposing Pokémon in the area of effect and shoves them.',
  aurora_veil:
    'Has the user leap to the designated location and create an aurora around itself that reduces damage received by the user and ally Pokémon in the area of effect.',
  avalanche:
    'Attacks with a gush of chilly ice toward the designated area. The ice forms a wall that cannot be passed through on land. After a short time, this wall melts and collapses, dealing damage to opposing Pokémon in the area of effect.',
  icy_wind:
    'Blows an icy cold wind in a wide area forward, dealing damage to opposing Pokémon in the area of effect and decreasing their movement speed for a short time.',
  snow_globe:
    'Attacks with chilly snow and ice, dealing damage to opposing Pokémon in the area of effect when it hits. Deals increased damage to opposing Pokémon that are frozen.',
  snow_warning:
    'When the Pokémon enters battle, it summons a hailstorm in the area. While the hailstorm is active, the Pokémon and its ally Pokémon in the area take less damage, and opposing Pokémon in the area have their movement speed decreased.',

  // ══════════════════════════════════════════════════════
  // WIGGLYTUFF
  // Source: https://bulbapedia.bulbagarden.net/wiki/Wigglytuff_(Pok%C3%A9mon_UNITE)
  // ══════════════════════════════════════════════════════
  pound:
    'Has the user perform a combo attack in front of itself, dealing damage to opposing Pokémon and decreasing their movement speed for a short time when the attack hits.',
  sing:
    "Has the user sing, decreasing the movement speed of nearby Pokémon for a short time. Opposing Pokémon that do not leave the move's area of effect within a set period of time are put to sleep for a short time, which also decreases their Defense and Sp. Def. Using this move increases the user's movement speed for a short time.",
  cute_charm:
    "Has the user blow a kiss at a nearby opposing Pokémon, charming that Pokémon and causing it to become infatuated for a short time. While infatuated, the Pokémon's movement speed and Attack are decreased.",
  dazzling_gleam_wigglytuff:
    'Emits a powerful flash in the designated direction, dealing damage to opposing Pokémon in the area of effect twice.',
  double_slap:
    'Has the user perform a combo attack in front of itself, dealing damage to opposing Pokémon and decreasing their movement speed for a short time when the attack hits.',
  rollout:
    'Has the user perform a quick roll, granting it a shield. Also deals damage to any opposing Pokémon hit by the roll and throws them. Hitting an obstacle while rolling will change the direction the user is moving and reset the cooldown of Pound, Double Slap, or Dazzling Gleam.',
  star_recital:
    'Has the user begin performing a recital, granting itself and nearby ally Pokémon a shield as well as removing all status conditions from the affected Pokémon and making them immune to hindrances for a short time.',

  // ══════════════════════════════════════════════════════
  // SLOWBRO
  // Source: https://bulbapedia.bulbagarden.net/wiki/Slowbro_(Pok%C3%A9mon_UNITE)
  // ══════════════════════════════════════════════════════
  water_gun:
    'Shoots water forcefully, dealing damage to opposing Pokémon and decreasing their movement speed for a short time when it hits.',
  scald:
    'Shoots boiling hot water, dealing damage to opposing Pokémon and creating steam when it hits. Opposing Pokémon inside the steam\'s area of effect are left burned and have their movement speed decreased for a short time.',
  surf_slowbro:
    'Has the user charge forward on a wave, dealing damage to opposing Pokémon and throwing them. This is followed by two more waves that deal damage to opposing Pokémon in the area of effect and decrease their movement speed for a short time.',
  amnesia:
    "Has the user recover some of its HP using its stored-up lost HP. For a short time after using this move, the user becomes immune to hindrances and gains increased Defense.",
  telekenisis:
    'Makes opposing Pokémon float with psychic power, leaving them unable to move. If used again, pulls the opposing Pokémon toward the user.',
  psyshock:
    'Fires multiple psychic projectiles in a forward direction, dealing damage to opposing Pokémon they hit.',
  slack_off:
    "Has the user take it easy and restore a portion of its HP. For a short time after using this move, the user's HP is gradually restored.",
  slowbeam:
    'Fires a beam that deals damage to opposing Pokémon and leaves them unable to move. Grants a shield and makes the user immune to hindrances while using this move.',

  // ══════════════════════════════════════════════════════
  // GENGAR
  // Source: https://bulbapedia.bulbagarden.net/wiki/Gengar_(Pok%C3%A9mon_UNITE)
  // ══════════════════════════════════════════════════════
  lick:
    "Attacks with the user's tongue and pulls opposing Pokémon toward the user.",
  sludge_bomb_gengar:
    'Hurls unsanitary sludge to the designated area, leaving opposing Pokémon poisoned when it hits.',
  hex:
    'Has the user disappear and move to the designated location, dealing damage to opposing Pokémon in the area of effect when the user reappears. If this hits an opposing Pokémon that is afflicted by a status condition, it deals increased damage and its cooldown is reduced.',
  will_o_wisp:
    'Shoots multiple sinister flames, dealing damage to opposing Pokémon and leaving them burned when it hits.',
  shadow_ball:
    'Hurls a shadowy blob at the target, decreasing the movement speed and Sp. Def of opposing Pokémon for a short time when it hits.',
  dream_eater:
    "Puts opposing Pokémon to sleep when it hits. If used again while a nearby opposing Pokémon is asleep, the user appears behind the sleeping Pokémon and attacks, restoring the user's HP and reducing the cooldown of Will-O-Wisp, Shadow Ball, or Sludge Bomb.",
  phantom_ambush:
    'Has the user jump to the designated area and enter stealth (becomes invisible to enemies) with increased movement speed. If the Unite Move is used again, it deals damage to opposing Pokémon in the area of effect and decreases their movement speed for a short time.',

  // ══════════════════════════════════════════════════════
  // GARDEVOIR
  // Source: https://bulbapedia.bulbagarden.net/wiki/Gardevoir_(Pok%C3%A9mon_UNITE)
  // ══════════════════════════════════════════════════════
  confusion_gardevoir:
    'Attacks straight in the designated direction, dealing damage to opposing Pokémon it hits and decreasing their movement speed for a short time.',
  psychic_gardevoir:
    'After hitting an opposing Pokémon or traveling its maximum distance, deals damage over time to opposing Pokémon in the area of effect.',
  moonblast:
    "Has the user attack while moving back to create distance. When the move's blast hits, it deals damage to opposing Pokémon in a cone and leaves the opposing Pokémon closest to the user unable to act for a short time.",
  future_sight:
    "Sets a delayed explosion at the designated location. When the explosion hits a Pokémon from the opposing team, it reduces this move's cooldown.",
  calm_mind:
    "Increases the user's Sp. Atk, Sp. Def, and movement speed for a short time.",
  fairy_singularity:
    'Warps space in the designated area, drawing in opposing Pokémon while dealing damage over time to them.',

  // ══════════════════════════════════════════════════════
  // ABSOL
  // Source: https://bulbapedia.bulbagarden.net/wiki/Absol_(Pok%C3%A9mon_UNITE)
  // ══════════════════════════════════════════════════════
  feint_absol:
    "Has the user dash in an arc, attacking Pokémon it comes in contact with. This move ignores the Defense stat and shield effects of opposing Pokémon.",
  night_slash:
    "Has the user dash in an outward arc, dealing damage to opposing Pokémon. If this first attack hits, a second attack can also be performed. The second attack has the user dash straight ahead, dealing damage to opposing Pokémon and increasing the user's critical-hit rate.",
  slash_absol:
    "Slashes with sharp claws in front of the user, increasing this move's critical-hit rate.",
  psycho_cut:
    'Has the user attack with blades formed by psychic power that decreases the movement speed of opposing Pokémon for a short time when the move hits.',
  sucker_punch:
    'Has the user look for an opening to attack an opposing Pokémon, decreasing the movement speed of the user and the opposing Pokémon for the duration. After a short time, the user charges to attack the opposing Pokémon.',
  pursuit:
    "Has the user dash to the designated location and quickly charge an opposing Pokémon with the next basic attack. If the basic attack lands from behind, its damage is increased and this move's cooldown is reduced.",
  midnight_slash:
    'Unleashes a flurry of slashes in front of the user. This move ends by unleashing powerful blades of energy, dealing increased damage to opposing Pokémon and shoving them.',
  super_luck:
    "When the Pokémon lands a critical hit, the user's movement speed is increased for a short time.",
  fury_cutter:
    "Slashes at opposing Pokémon rapidly. The more times it hits an opposing Pokémon in a row, the greater the move's power.",

  // ══════════════════════════════════════════════════════
  // LUCARIO
  // Source: https://bulbapedia.bulbagarden.net/wiki/Lucario_(Pok%C3%A9mon_UNITE)
  // ══════════════════════════════════════════════════════
  bone_rush:
    'Performs a combo with a bone, dealing damage and applying Extreme Speed marks to opposing Pokémon. If this move is used again, the user rushes to the location of the bone, dealing damage to nearby opposing Pokémon.',
  power_up_punch:
    "Charges power before unleashing a powerful attack. While charging, movement speed decreases but Attack increases and damage received is reduced. The move deals more damage based on the target's remaining HP.",
  aura_cannon:
    'Deals damage to opposing Pokémon in the area of effect. Opposing Pokémon damaged by this Unite Move have an Extreme Speed mark applied to them. The user\'s next Power-Up Punch deals increased damage.',
  meteor_mash:
    'Blasts forward with a punch like a comet, dealing damage to opposing Pokémon and shoving them.',
  extreme_speed:
    "Has the user charge forward with breathtaking speed. If the user performs a basic attack immediately after using this move, that attack's damage is increased. Marks nearby opposing Pokémon; hitting marked Pokémon resets the cooldown and restores HP.",
  close_combat_lucario:
    "Unleashes a combo attack, dealing multiple blows to opposing Pokémon. When this move hits, it restores a certain amount of the user's HP. The user becomes immune to hindrances during use.",
  steadfast:
    "When the Pokémon is at low HP, it is granted a shield and its movement speed is increased.",

  // ══════════════════════════════════════════════════════
  // SYLVEON
  // Source: https://bulbapedia.bulbagarden.net/wiki/Sylveon_(Pok%C3%A9mon_UNITE)
  // ══════════════════════════════════════════════════════
  baby_doll_eyes:
    "Stares at an opposing Pokémon, dealing damage and decreasing the opposing Pokémon's Attack and movement speed.",
  mystical_fire:
    'Creates four small flames while advancing, shooting toward opposing Pokémon one by one, dealing damage and decreasing their Sp. Atk.',
  draining_kiss:
    "Blows a kiss that bounces between the user and an opposing Pokémon, restoring the user's HP when touching the user and dealing damage when hitting the opposing Pokémon.",
  hyper_voice:
    "Unleashes multiple sound waves, dealing damage to opposing Pokémon. Damage increases with distance from the target. Each hit increases the next wave's damage.",
  fairy_frolic:
    "Jumps into the air, briefly becoming invincible. Upon landing, deals damage to nearby opposing Pokémon and restores the user's HP. Subsequently converts a percentage of damage dealt into healing.",
  pixilate:
    "The Pokémon's basic attacks become infused with Fairy energy, dealing bonus damage to opposing Pokémon.",

  // ══════════════════════════════════════════════════════
  // ELDEGOSS
  // Source: https://bulbapedia.bulbagarden.net/wiki/Eldegoss_(Pok%C3%A9mon_UNITE)
  // ══════════════════════════════════════════════════════
  leafage:
    'Pelts the target with leaves, decreasing the movement speed of opposing Pokémon for a short time when it hits.',
  pollen_puff:
    "Throws a pollen projectile that attaches to Pokémon. Attaching to an ally restores their HP; attaching to an opposing Pokémon deals damage. The upgraded version adds damage-over-time for enemies and damage reduction for allies.",
  leaf_tornado:
    'Attacks with a tornado of sharp leaves, leaving a path in its wake that increases the movement speed of ally Pokémon for a short time.',
  cotton_guard:
    "Protects the user and nearby ally Pokémon with cotton that absorbs damage and restores HP when it expires. The upgraded version also boosts the user's movement speed.",
  cotton_spore:
    'Generates spores that increase the user\'s movement speed. After activation, the spores burst, dealing damage to opposing Pokémon, launching them, and reducing their movement speed.',
  cotton_cloud_crash:
    "The user becomes invincible while floating. Reactivation pounds the ground, dealing damage to opposing Pokémon and pushing them back, while restoring nearby ally Pokémon's HP.",
  cotton_down:
    'When the Pokémon receives a certain amount of damage, it recovers HP, deals damage in return, and decreases the movement speed of nearby opposing Pokémon for a short time.',

  // ══════════════════════════════════════════════════════
  // MR. MIME
  // Source: https://bulbapedia.bulbagarden.net/wiki/Mr._Mime_(Pok%C3%A9mon_UNITE)
  // ══════════════════════════════════════════════════════
  confusion_mime:
    'Attacks straight in front of the user, dealing damage to opposing Pokémon and shoving it. If an opposing Pokémon shoved by this move hits an obstacle, it receives increased damage from this move and is left unable to act for a short time.',
  psychic_mime:
    'For a short time, has the user deal damage over time to nearby opposing Pokémon and decrease their Sp. Def. Afterward, the user releases a telekinetic blast on opposing Pokémon near the user, near any guard-swapped Pokémon, or near any Light Screen or Barrier walls.',
  barrier:
    'Has the user throw up a sturdy wall in the designated location that prevents opposing Pokémon from passing. If an opposing Pokémon is near the location where the wall is created, they are shoved and left unable to act for a short time.',
  light_screen:
    'Creates a wall of light in the designated area that prevents opposing Pokémon from passing. If an opposing Pokémon is near the location where the wall of light is created, they are shoved and left unable to act for a short time.',
  guard_swap:
    "Swaps the user's Defense and Sp. Def stats with those of the nearest opposing Pokémon for a short time.",
  filter:
    'Reduces damage received by the Pokémon for a short time after it uses a move.',
  showtime:
    'Has the user jump to the designated location and start a pantomime performance, dealing damage over time to opposing Pokémon in the area of effect and leaving them unable to act for a short time.',

  // ══════════════════════════════════════════════════════
  // MAMOSWINE
  // Source: https://bulbapedia.bulbagarden.net/wiki/Mamoswine_(Pok%C3%A9mon_UNITE)
  // ══════════════════════════════════════════════════════
  tackle_mamoswine:
    'Has the user charge forward and deal damage to opposing Pokémon it hits, shoving them. The first opposing Pokémon hit by this move is thrown.',
  ice_fang:
    'Uses cold-infused fangs to throw the opposing Pokémon closest to the user, dealing damage and leaving the Pokémon frozen for a short time.',
  ice_shard:
    'Hurls three chunks of ice at the designated location, dealing damage to opposing Pokémon in the area of effect and decreasing their movement speed for a short time.',
  icicle_crash:
    'Drops icicles on the designated location, dealing damage to opposing Pokémon in the area of effect and decreasing their movement speed for a short time.',
  earthquake_mamoswine:
    'Has the user leap up in the designated direction and then land forcefully, dealing damage to opposing Pokémon in the area of effect and pulling them toward the user.',
  thick_fat:
    "Every time the Pokémon deals damage, its Defense and Sp. Def are increased for a short time (up to three times).",
  mammoth_mash:
    'Has the user jump to the designated location and become immune to hindrances. The user then repeatedly stomps the ground, dealing damage to opposing Pokémon in the area of effect and decreasing their movement speed.',

  // ══════════════════════════════════════════════════════
  // GRENINJA
  // Source: https://bulbapedia.bulbagarden.net/wiki/Greninja_(Pok%C3%A9mon_UNITE)
  // ══════════════════════════════════════════════════════
  bubble:
    'Attacks with a spray of bubbles, decreasing the movement speed of opposing Pokémon for a short time when it hits.',
  water_shuriken:
    "Throws shurikens made of water in quick succession. Decreases the movement speed of opposing Pokémon for a short time and restores the user's HP when it hits.",
  surf_greninja:
    "Has the user ride a wave, dealing damage to opposing Pokémon and restoring the user's HP. If this move knocks out an opposing Pokémon, its cooldown is reset.",
  double_team:
    'Quickly moves the user away from the current position, creating illusory copies of it to aid in battle.',
  smokescreen:
    "Creates a smokescreen and has the user roll away from its current location. Immediately afterward, the user enters stealth and has its movement speed increased for a short time.",
  torrent:
    "When the Pokémon is at half HP or less, its Attack and movement speed are increased.",
  waterburst_shuriken:
    'Has the user throw a giant water shuriken toward the designated area, dealing damage to opposing Pokémon in the area of effect and decreasing their movement speed for a short time.',

  // ══════════════════════════════════════════════════════
  // TALONFLAME
  // Source: https://bulbapedia.bulbagarden.net/wiki/Talonflame_(Pok%C3%A9mon_UNITE)
  // ══════════════════════════════════════════════════════
  // ember is shared — description already entered under Charizard
  flame_charge_talonflame:
    'Flies in the designated direction cloaked in flame, attacking opposing Pokémon in the path. This also increases the user\'s movement speed.',
  aerial_ace:
    'Flies toward the target Pokémon and deals damage. The next basic attack becomes a boosted attack.',
  acrobatics:
    'Has the user fly toward the designated area and attack multiple times. Allows the user to escape in a direction of their choice after using this move.',
  brave_bird:
    'Has the user fly high into the air before diving in the designated direction at blinding speed, dealing damage to opposing Pokémon it hits and shoving them. This move also deals recoil damage to the user.',
  fly:
    'Flies up into the sky. Using this move again will cause the user to dive to the designated area and deal damage to opposing Pokémon in the area of effect.',
  flame_sweep:
    'Has the user perform an aerial somersault before charging forward, dealing damage to opposing Pokémon in this move\'s path and shoving them.',
  gale_wings:
    "When the Pokémon is at high HP, its movement speed is increased.",

  // ══════════════════════════════════════════════════════
  // ZERAORA
  // Source: https://bulbapedia.bulbagarden.net/wiki/Zeraora_(Pok%C3%A9mon_UNITE)
  // ══════════════════════════════════════════════════════
  slash_zeraora:
    "Slashes with sharp claws, dealing damage to opposing Pokémon in the area of effect and increasing the user's movement speed for a short time.",
  spark:
    'Has the user leap at an opposing Pokémon while electrically charged, dealing damage to them. Can be used three times before cooldown.',
  discharge:
    "Releases an electric discharge, dealing damage to nearby opposing Pokémon and granting the user a shield when it hits.",
  wild_charge:
    'Has the user charge in the designated direction. If this move hits an opposing Pokémon, the user unleashes a combo attack.',
  agility:
    "Drastically increases the user's movement speed for a short time and makes the user immune to hindrances during this period.",
  swift:
    'Fires star-shaped rays that never miss, dealing damage to opposing Pokémon in the area of effect.',
  thunderstorm:
    'Calls down a fierce thunderstorm to attack opposing Pokémon in a wide area, dealing damage and leaving them unable to act for a short time.',
  volt_absorb:
    "The Pokémon gains an electric charge whenever it receives damage, converting a portion of that damage into an additional electric attack.",
  static:
    "When the Pokémon receives damage, there is a chance of the attacking opposing Pokémon becoming paralyzed.",

  // ══════════════════════════════════════════════════════
  // CINDERACE
  // Source: https://bulbapedia.bulbagarden.net/wiki/Cinderace_(Pok%C3%A9mon_UNITE)
  // ══════════════════════════════════════════════════════
  // ember is shared — description already entered under Charizard
  feint_cinderace:
    "Increases the user's movement speed for a short time and makes the user briefly invincible.",
  flame_charge_cinderace:
    'Has the user charge forward cloaked in flame, dealing damage to any opposing Pokémon it hits.',
  pyro_ball:
    'Has the user kick a ball of flame in the designated direction, dealing damage to opposing Pokémon and leaving them burned for a short time when this move hits.',
  blaze_kick:
    'Has the user perform a fiery flying kick. This move is always a critical hit and it shoves opposing Pokémon and leaves them burned for a short time. In addition, the user becomes immune to hindrances while using this move.',
  blazing_bicycle_kick:
    "Kicks a giant fireball toward the designated location, which then explodes, dealing damage to opposing Pokémon in the area of effect. This Unite Move increases the user's movement speed for a short time when it hits.",
  low_sweep:
    'Has the user make a swift low sweep in the designated direction, dealing damage to any opposing Pokémon it hits.',
  blaze_cinderace:
    "When the Pokémon uses a move, its next basic attack becomes a boosted attack. When the Pokémon hits an opposing Pokémon with a basic attack or move, a cinder is placed on that opposing Pokémon. Attacking a cindered opposing Pokémon a certain number of times will cause the cinder to flare, dealing damage. When at half HP or less, critical-hit rate and basic attack speed are increased for a short time.",
  guts:
    "When the Pokémon receives a status condition, its Attack is increased for a short time.",
  blaze:
    "When the Pokémon is at low HP, the power of its Fire-type moves is increased.",

  // ══════════════════════════════════════════════════════
  // CRAMORANT
  // Source: https://bulbapedia.bulbagarden.net/wiki/Cramorant_(Pok%C3%A9mon_UNITE)
  // ══════════════════════════════════════════════════════
  air_slash:
    "Has the user shoot out many blades of air while moving backward to create distance. Deals damage to opposing Pokémon in the area of effect and reduces this move's cooldown when it hits.",
  hurricane:
    'Creates a fierce wind, dealing damage to opposing Pokémon that get caught in it and throwing them.',
  dive:
    "Changes the designated area into a puddle and has the user dive to that area, dealing damage to opposing Pokémon and shoving them when they hit. The user also catches Arrokuda or other wild Pokémon as they emerge from the puddle. For a short time after that, the user's next boosted attack will deal increased damage.",
  whirlpool:
    "Creates a whirlpool that deals damage to opposing Pokémon in the area of effect. The whirlpool slowly shrinks but deals increasing damage. Just before disappearing, it decreases the movement speed of opposing Pokémon in the area of effect for a short time.",
  gatling_gulp_missile:
    "Creates a puddle at the user's current location. The user continuously uses its mouth to grab Arrokuda from the puddle and spits them out to attack the nearest opposing Pokémon. The user cannot move or use other moves while this move is in effect.",
  gulp_missile:
    "During certain moves, the Pokémon dives into water and catches an Arrokuda in its mouth, which it then uses in subsequent basic attacks to deal additional damage and apply a hindrance to opposing Pokémon.",

  // ══════════════════════════════════════════════════════
  // GARCHOMP
  // Source: https://bulbapedia.bulbagarden.net/wiki/Garchomp_(Pok%C3%A9mon_UNITE)
  // ══════════════════════════════════════════════════════
  bulldoze:
    'Has the user stomp down on the ground, dealing damage to opposing Pokémon in the area of effect.',
  dig:
    "Has the user burrow underground and move quickly in the designated direction, jumping out when it comes in contact with an opposing Pokémon or when it has traveled the maximum distance. The jump deals damage to opposing Pokémon in the area of effect and throws them. Using this move increases the user's Defense and Sp. Def for a short time.",
  sand_attack:
    "Hurls sand, narrowing the field of vision of opposing Pokémon and decreasing their movement speed for a short time when it hits. This also increases the user's movement speed and basic attack speed.",
  dragon_claw:
    'Has the user attack twice in front of itself using its claws. The first attack deals damage to opposing Pokémon and then throws them. The second deals increased damage and decreases the movement speed of the opposing Pokémon for a short time.',
  dragon_rush:
    "Has the user back up to create distance before diving to attack in the designated direction, shoving opposing Pokémon. The user can use Dragon Claw while creating distance at the beginning of this move to create a combo attack, which strengthens Dragon Claw's movement-speed-reduction effect.",
  earthquake:
    'Has the user jump high into the air and crash forcefully to the ground, dealing damage over time to opposing Pokémon in the area of effect and decreasing their movement speed for a short time.',
  rubble_rouser:
    "Garchomp goes berserk, taking 30% less damage and unleashing a powerful, unstoppable chain attack. Dashes and deals damage in the designated area five times, with each attack dealing more damage than the last. The final attack throws all opposing Pokémon hit into the air.",
  rough_skin:
    "When the Pokémon receives damage from an opposing Pokémon, that Pokémon also receives damage.",

  // ══════════════════════════════════════════════════════
  // BLISSEY
  // Source: https://bulbapedia.bulbagarden.net/wiki/Blissey_(Pok%C3%A9mon_UNITE)
  // ══════════════════════════════════════════════════════
  pound_blissey:
    'Has the user attack by pounding in the designated direction, dealing damage to opposing Pokémon in the area of effect and decreasing their movement speed for a short time when it hits.',
  soft_boiled:
    "Throws an egg to an ally Pokémon, restoring its HP as well as the user's. A maximum of two uses can be kept in reserve for this move.",
  egg_bomb:
    'Hurls an egg at the designated location. The egg then explodes, dealing damage to opposing Pokémon in the area of effect and throwing them. A maximum of two uses can be kept in reserve for this move.',
  heal_pulse:
    "Continually restores the user's and designated ally Pokémon's HP for a short time.",
  helping_hand:
    "For a short time, greatly increases the user's and nearby ally Pokémon's movement speed and basic attack speed. While this move's effects last, all of the user's basic attacks become boosted attacks.",
  safeguard:
    'Removes all status conditions from the user and the designated ally Pokémon and grants both Pokémon a shield. While these shields are active, the shielded Pokémon become immune to hindrances.',
  bliss_assistance:
    "Has the user dash to the designated ally Pokémon to give it an egg, granting that Pokémon a shield and increasing its Attack and Sp. Atk for a short time. The user also intercepts a portion of the damage received by the Pokémon for a short time.",
  natural_cure:
    "When the Pokémon is defeated, ally Pokémon in the area around the point of defeat have their status conditions removed.",

  // ══════════════════════════════════════════════════════
  // LAPRAS
  // Source: https://bulbapedia.bulbagarden.net/wiki/Lapras_(Pok%C3%A9mon_UNITE)
  // ══════════════════════════════════════════════════════
  water_pulse:
    'Fires a pulse of water at the designated area, dealing damage to opposing Pokémon in the area of effect and leaving them confused for a short time.',
  perish_song:
    'Has the user sing a song that places a countdown on all Pokémon in the area of effect. When the countdown reaches zero, those Pokémon are left unable to act for a short time.',
  bubble_beam:
    'Fires a beam of bubbles in a forward direction, dealing damage to opposing Pokémon it hits and decreasing their movement speed for a short time.',
  ice_beam:
    'Fires a beam of icy energy in a forward direction, dealing damage to opposing Pokémon it hits and leaving them frozen for a short time.',
  lapras_express:
    'Has the user turn into a massive surf wave that carries nearby ally Pokémon. Ally Pokémon can ride the wave, and opposing Pokémon that are hit receive damage and are thrown.',

  // ══════════════════════════════════════════════════════
  // ALOLAN RAICHU
  // Source: https://bulbapedia.bulbagarden.net/wiki/Alolan_Raichu_(Pok%C3%A9mon_UNITE)
  // ══════════════════════════════════════════════════════
  thunder_wave:
    'Shoots a weak electric shock, dealing damage to opposing Pokémon in the area of effect and leaving them paralyzed for a short time.',
  stored_power:
    'Has the user charge power based on its stat boosts, then release it in a burst. The more stat boosts the user has, the greater the damage dealt.',
  psychic:
    'Uses psychic power to attack opposing Pokémon, dealing damage and decreasing their movement speed and Sp. Def for a short time.',
  thunderstorm_aerial:
    'Has the user fly into the air on a surfboard made of electricity and deal damage to all nearby opposing Pokémon. While airborne, the user becomes invincible and its movement speed is increased.',

  // ══════════════════════════════════════════════════════
  // ESPEON
  // Source: https://bulbapedia.bulbagarden.net/wiki/Espeon_(Pok%C3%A9mon_UNITE)
  // ══════════════════════════════════════════════════════
  growl:
    'Releases a cute growl that decreases the Attack of nearby opposing Pokémon for a short time.',
  psybeam:
    'Fires a peculiar beam of light in a forward direction, dealing damage to opposing Pokémon it hits. Opposing Pokémon hit by this move may become confused.',
  psychic_solare:
    'Has the user release a powerful psychic burst, dealing damage to opposing Pokémon in a large area and decreasing their movement speed for a short time. The user then gains boosted Sp. Atk for the rest of the match.',

  // ══════════════════════════════════════════════════════
  // GLACEON
  // Source: https://bulbapedia.bulbagarden.net/wiki/Glaceon_(Pok%C3%A9mon_UNITE)
  // ══════════════════════════════════════════════════════
  tail_whip:
    'Whips with a tail, dealing damage to opposing Pokémon and decreasing their Defense for a short time.',
  icicle_spear:
    'Launches sharp icicles at the designated area, dealing damage to opposing Pokémon in the area of effect multiple times.',
  icy_wind_glaceon:
    'Breathes out a chilling wind in a cone in front of the user, dealing damage to opposing Pokémon in the area of effect and decreasing their movement speed for a short time.',
  ice_shard_glaceon:
    'Creates sharp ice shards in the designated area, dealing damage to opposing Pokémon in the area of effect and temporarily leaving them frozen.',
  freeze_dry:
    'Sprays very cold air in a forward direction, dealing damage to opposing Pokémon it hits and leaving them frozen for a short time. This move is super effective against Water-type Pokémon.',
  glacial_stage:
    'Has the user skate around, creating an icy stage. Ally Pokémon in the area of effect have their movement speed increased, while opposing Pokémon in the area of effect have their movement speed decreased and may be frozen.',

  // ══════════════════════════════════════════════════════
  // CHANDELURE
  // Source: https://bulbapedia.bulbagarden.net/wiki/Chandelure_(Pok%C3%A9mon_UNITE)
  // ══════════════════════════════════════════════════════
  night_shade:
    'Launches a blob of spectral energy in a forward direction, dealing damage to opposing Pokémon it hits.',
  overheat:
    'Has the user attack by venting all its heat at once in a cone in front of itself, dealing damage to opposing Pokémon in the area of effect. After using this move, the user\'s Sp. Atk is decreased for a short time.',
  poltergeist:
    'Has the user manifest a strange aura around itself and nearby opposing Pokémon. After a delay, the aura explodes on each opponent, dealing damage.',
  imprison:
    'Creates a field that restricts the movements of opposing Pokémon caught inside, preventing them from using their moves for a short time.',
  ignite_midnight:
    'Has the user absorb the HP of nearby opposing Pokémon, restoring its own HP. For a short time afterward, the user becomes invincible and its movement speed and Sp. Atk are increased.',

  // ══════════════════════════════════════════════════════
  // UMBREON
  // Source: https://bulbapedia.bulbagarden.net/wiki/Umbreon_(Pok%C3%A9mon_UNITE)
  // ══════════════════════════════════════════════════════
  mean_look:
    'Has the user fix an opposing Pokémon with an intimidating stare, preventing that Pokémon from moving away from the user for a short time.',
  foul_play:
    'Uses the opposing Pokémon\'s own power against it, dealing damage based on a portion of the opposing Pokémon\'s Attack.',
  fake_tears:
    'Has the user feign crying to lower the Sp. Def of nearby opposing Pokémon for a short time.',
  wish:
    'Has the user make a wish. After a short time, the wish is granted, restoring the HP of the user or a nearby ally Pokémon.',
  snarl:
    'Lets out a snarl to attack multiple opposing Pokémon in a cone, dealing damage and decreasing their Sp. Atk for a short time.',
  moonlight_prance:
    'Has the user perform a series of dashes while emitting lunar energy, damaging opposing Pokémon it hits. The user and nearby ally Pokémon are also granted a shield.',

  // ══════════════════════════════════════════════════════
  // VAPOREON
  // Source: https://bulbapedia.bulbagarden.net/wiki/Vaporeon_(Pok%C3%A9mon_UNITE)
  // ══════════════════════════════════════════════════════
  muddy_water:
    'Fires a muddy stream of water in a forward direction, dealing damage to opposing Pokémon it hits and decreasing their accuracy and movement speed for a short time.',
  aqua_ring:
    'Surrounds the user or a nearby ally Pokémon with a veil of water that gradually restores HP for a short time.',
  flip_turn:
    'Has the user dash at the designated opposing Pokémon and deal damage, then dash away to safety.',
  aquamarine_splash:
    'Has the user melt into water and flood the area, dealing damage to all opposing Pokémon in the area of effect. Ally Pokémon in the area have their HP restored.',

  // ══════════════════════════════════════════════════════
  // GOODRA
  // Source: https://bulbapedia.bulbagarden.net/wiki/Goodra_(Pok%C3%A9mon_UNITE)
  // ══════════════════════════════════════════════════════
  dragon_pulse:
    'Fires a pulse of dragon energy, dealing damage to opposing Pokémon in the area of effect.',
  power_whip:
    'Has the user lash the target with vines or tentacles, dealing damage to opposing Pokémon and throwing them.',
  acid_spray:
    'Sprays a toxic acid at the designated area, dealing damage to opposing Pokémon in the area of effect and sharply decreasing their Sp. Def for a short time.',
  right_as_rain:
    'Has the user call down rain that weakens the power of Fire-type moves. During this rainfall, the user and nearby ally Pokémon gradually restore HP.',

  // ══════════════════════════════════════════════════════
  // TREVENANT
  // Source: https://bulbapedia.bulbagarden.net/wiki/Trevenant_(Pok%C3%A9mon_UNITE)
  // ══════════════════════════════════════════════════════
  branch_poke:
    'Pokes at the designated opposing Pokémon with a sharp branch, dealing damage.',
  wood_hammer:
    'Has the user launch itself at the designated area, dealing damage to opposing Pokémon in the area of effect and throwing them. After using this move, the user\'s Defense and Sp. Def decrease for a short time.',
  curse:
    'Places a curse on the designated opposing Pokémon, dealing damage over time for a short time.',
  horn_leech:
    'Has the user hit the designated opposing Pokémon, dealing damage and restoring a portion of the user\'s HP.',
  pain_split:
    'Has the user share pain with the designated opposing Pokémon, bringing both Pokémon\'s HP closer together.',
  phantom_forest:
    'Has the user spread its roots throughout the area, ensnaring opposing Pokémon and dealing damage over time. Ally Pokémon in the area have their HP gradually restored.',

  // ══════════════════════════════════════════════════════
  // GREEDENT
  // Source: https://bulbapedia.bulbagarden.net/wiki/Greedent_(Pok%C3%A9mon_UNITE)
  // ══════════════════════════════════════════════════════
  defense_curl:
    'Has the user curl up to raise its Defense for a short time. If the user takes a hit while curled up, it rolls forward.',
  bullet_seed:
    'Has the user rapidly fire seeds in a forward direction, dealing damage to opposing Pokémon they hit multiple times.',
  belch:
    'Has the user let out a massive belch in a forward direction, dealing damage to opposing Pokémon in the area of effect.',
  stuff_cheeks:
    'Has the user stuff a berry into its cheeks, restoring HP and temporarily boosting its Defense and Sp. Def.',
  covet:
    'Has the user dash at the designated opposing Pokémon and steal any items it is holding, temporarily disabling them.',
  berry_belly_flop:
    'Has the user scatter berries across the area, then dive in to pick them all up, dealing damage to opposing Pokémon and restoring the user\'s HP with each berry collected.',

  // ══════════════════════════════════════════════════════
  // HO-OH
  // Source: https://bulbapedia.bulbagarden.net/wiki/Ho-Oh_(Pok%C3%A9mon_UNITE)
  // ══════════════════════════════════════════════════════
  safeguard_ho_oh:
    'Creates a barrier of light around the user, granting it and nearby ally Pokémon a shield and making them immune to status conditions for a short time.',
  sacred_fire:
    'Has the user release a powerful flame in a forward direction, dealing damage to opposing Pokémon in the area of effect and leaving them burned. This move has a set chance of leaving opposing Pokémon unable to act.',
  fire_spin_ho_oh:
    'Has the user spiral upward and surround itself with a vortex of flame, dealing damage to nearby opposing Pokémon and decreasing their movement speed for a short time.',
  tailwind:
    'Creates a tailwind around the user, increasing the movement speed of the user and nearby ally Pokémon for a short time.',
  flamethrower_ho_oh:
    'Breathes out intense fire in a broad cone, dealing damage to opposing Pokémon in the area of effect and leaving them burned.',
  sky_attack:
    'Has the user charge power and launch itself upward before diving down at high speed, dealing massive damage to the first opposing Pokémon it strikes and throwing them.',
  rekindling_flame:
    'Has the user soar high and unleash a massive pillar of sacred flame, dealing damage to opposing Pokémon in the area of effect. Ally Pokémon KO\'d nearby are revived with a portion of their HP restored.',

  // ══════════════════════════════════════════════════════
  // LEAFEON
  // Source: https://bulbapedia.bulbagarden.net/wiki/Leafeon_(Pok%C3%A9mon_UNITE)
  // ══════════════════════════════════════════════════════
  quick_attack_leafeon:
    'Has the user dart at the designated opposing Pokémon with blinding speed, dealing damage.',
  solar_blade:
    'Has the user absorb sunlight and then slash with a blade of light, dealing massive damage to opposing Pokémon in a forward direction.',
  leaf_blade:
    'Slashes with a sharp-edged leaf, dealing damage. This move has a high critical-hit rate.',
  emerald_two_step:
    'Has the user perform a two-step dance, dealing damage to all nearby opposing Pokémon with each step and creating a zone of grassy terrain that increases the user\'s movement speed.',

  // ══════════════════════════════════════════════════════
  // DODRIO
  // Source: https://bulbapedia.bulbagarden.net/wiki/Dodrio_(Pok%C3%A9mon_UNITE)
  // ══════════════════════════════════════════════════════
  peck:
    'Attacks the designated opposing Pokémon with a jabbing motion, dealing damage.',
  quick_attack_dodrio:
    'Has the user charge forward with blinding speed, dealing damage to opposing Pokémon it hits.',
  tri_attack:
    'Has the user fire three beams—fire, ice, and electric—in a forward direction. Each beam deals damage to opposing Pokémon it hits and leaves them with either a burn, freeze, or paralysis.',
  drill_peck:
    'Has the user spin its beaks like a drill and charge in the designated direction, dealing damage to opposing Pokémon it hits.',
  agility_dodrio:
    'Has the user sprint at high speed in the designated direction, leaving afterimages that deal damage to opposing Pokémon they touch.',
  jump_kick:
    'Has the user jump and deliver a powerful kick to the designated opposing Pokémon, dealing damage and throwing them.',
  triple_trample:
    'Has the user stomp forward with all three heads in a frenzy, dealing damage to all opposing Pokémon in its path and increasing its movement speed for the duration.',

  // ══════════════════════════════════════════════════════
  // MEOWTH
  // Source: https://bulbapedia.bulbagarden.net/wiki/Meowth_(Pok%C3%A9mon_UNITE)
  // ══════════════════════════════════════════════════════
  scratch:
    'Scratches the opposing Pokémon with sharp claws, dealing damage.',
  pay_day:
    'Has the user fling coins at opposing Pokémon, dealing damage. Coins scatter on the ground after hitting and can be collected for bonus effects.',
  fury_swipes_meowth:
    'Has the user rapidly scratch at the designated opposing Pokémon with sharp claws multiple times, dealing damage with each hit.',
  feint_meowth:
    'Has the user feint to lower the guard of an opposing Pokémon, increasing the user\'s critical-hit rate for the next attack.',
  feint_attack_meowth:
    'Has the user approach the target while feigning innocence, then strike from an unexpected angle, dealing damage that ignores the target\'s evasiveness.',
  assurance:
    'Has the user strike the designated opposing Pokémon, dealing damage. The damage is doubled if the opposing Pokémon has already received damage this turn.',
  gold_coin_barrage:
    'Has the user launch a barrage of gold coins at all nearby opposing Pokémon, dealing massive damage. Coins remain on the field after impact.',

  // ══════════════════════════════════════════════════════
  // ZOROARK
  // Source: https://bulbapedia.bulbagarden.net/wiki/Zoroark_(Pok%C3%A9mon_UNITE)
  // ══════════════════════════════════════════════════════
  slash_zoroark:
    'Has the user slash at the designated opposing Pokémon with sharp claws, dealing damage.',
  fury_swipes_zoroark:
    'Has the user rapidly claw at the designated opposing Pokémon multiple times, dealing damage with each hit.',
  shadow_claw:
    'Has the user slash with a shadowy claw, dealing damage to opposing Pokémon. This move has a high critical-hit rate.',
  cut:
    'Attacks with a cut that deals damage to opposing Pokémon. If this move hits an opposing Pokémon, it can be used again for a combo.',
  night_slash_zoroark:
    'Has the user slip into the shadows and dash at the designated opposing Pokémon, dealing damage. If this move hits, the user can use it again immediately.',
  feint_attack_zoroark:
    'Has the user create an illusion to disorient opposing Pokémon, then strike from behind for increased damage.',
  nightfall_daze:
    'Has the user create an illusion of itself and charge at opposing Pokémon, dealing damage and leaving them confused. The user then enters stealth for a short time.',

  // ══════════════════════════════════════════════════════
  // MEOWSCARADA
  // Source: https://bulbapedia.bulbagarden.net/wiki/Meowscarada_(Pok%C3%A9mon_UNITE)
  // ══════════════════════════════════════════════════════
  hone_claws:
    'Sharpens the user\'s claws to increase its Attack and critical-hit rate for a short time.',
  flower_trick:
    'Has the user throw an explosive bouquet at the designated opposing Pokémon, dealing damage. This move always results in a critical hit.',
  trailblaze:
    'Has the user dash in the designated direction, leaving a trail of grass energy. The user\'s movement speed and Attack are increased while in the trail.',
  floral_flourish:
    'Has the user rapidly slash all nearby opposing Pokémon with floral energy blades, dealing damage. The user then enters stealth for a short time.',

  // ══════════════════════════════════════════════════════
  // DARKRAI
  // Source: https://bulbapedia.bulbagarden.net/wiki/Darkrai_(Pok%C3%A9mon_UNITE)
  // ══════════════════════════════════════════════════════
  hypnosis:
    'Emits a peculiar wave that puts the designated opposing Pokémon to sleep.',
  dark_void:
    'Creates a void of darkness at the designated location, pulling in and putting to sleep any opposing Pokémon in the area of effect.',
  nasty_plot:
    'Stimulates the user\'s brain by thinking bad thoughts, sharply increasing its Sp. Atk for a short time.',
  dark_pulse:
    'Fires a burst of dark energy, dealing damage to opposing Pokémon in the area of effect and potentially causing them to flinch.',
  worst_nightmare:
    'Has the user enter the dreams of opposing Pokémon in the area of effect, putting them to sleep. While they sleep, the user deals bonus damage to them.',

  // ══════════════════════════════════════════════════════
  // GALARIAN RAPIDASH
  // Source: https://bulbapedia.bulbagarden.net/wiki/Galarian_Rapidash_(Pok%C3%A9mon_UNITE)
  // ══════════════════════════════════════════════════════
  confusion:
    'Attacks straight ahead with telekinetic force, dealing damage to opposing Pokémon it hits and decreasing their movement speed for a short time.',
  dazzling_gleam:
    'Emits a powerful flash of blinding light in a forward direction, dealing damage to opposing Pokémon in the area of effect.',
  fairy_wind:
    'Stirs up a fairy wind at the designated location, dealing damage to opposing Pokémon in the area of effect.',
  tackle_rapidash:
    'Has the user charge forward, dealing damage to opposing Pokémon it hits.',
  smart_strike:
    'Has the user use its horn to deal damage to the designated opposing Pokémon. This move never misses.',
  triad_blitz:
    'Has the user perform a three-hit combo with psychic and fairy energy, dealing massive damage to opposing Pokémon in its path.',
  pastel_veil:
    'When this Pokémon enters battle, it removes poison status conditions from itself and nearby ally Pokémon.',

  // ══════════════════════════════════════════════════════
  // TSAREENA
  // Source: https://bulbapedia.bulbagarden.net/wiki/Tsareena_(Pok%C3%A9mon_UNITE)
  // ══════════════════════════════════════════════════════
  triple_axel:
    'Has the user perform three consecutive kicks, dealing damage with each kick. The damage dealt increases with each successive hit.',
  stomp:
    'Has the user stomp on the designated opposing Pokémon, dealing damage and potentially leaving them unable to act for a short time.',
  trop_kick:
    'Has the user perform a powerful tropical kick on the designated opposing Pokémon, dealing damage and lowering their Attack for a short time.',
  grassy_glide:
    'Has the user slide along a bed of grass, dealing damage to opposing Pokémon it hits. If used on grassy terrain, this move has increased priority.',
  queen_ascendant:
    'Has the user perform a combo of rapid kicks on all nearby opposing Pokémon, dealing massive damage. During this Unite Move, the user is immune to hindrances.',

  // ══════════════════════════════════════════════════════
  // AZUMARILL
  // Source: https://bulbapedia.bulbagarden.net/wiki/Azumarill_(Pok%C3%A9mon_UNITE)
  // ══════════════════════════════════════════════════════
  tackle_azumarill:
    'Has the user charge forward, dealing damage to the first opposing Pokémon it hits and shoving them.',
  aqua_tail:
    'Has the user swing its tail in the designated area, dealing damage to opposing Pokémon in the area of effect and throwing them.',
  play_rough:
    'Has the user play rough with the designated opposing Pokémon, dealing damage and potentially decreasing the opposing Pokémon\'s Attack.',
  belly_bash:
    'Has the user spin its belly into nearby opposing Pokémon, dealing damage and throwing them. The user is immune to hindrances during this Unite Move.',

  // ══════════════════════════════════════════════════════
  // SCIZOR
  // Source: https://bulbapedia.bulbagarden.net/wiki/Scizor_(Pok%C3%A9mon_UNITE)
  // ══════════════════════════════════════════════════════
  quick_attack:
    'Has the user dart at the designated opposing Pokémon with blinding speed, dealing damage.',
  dual_wingbeat:
    'Has the user strike with both wings in succession, dealing damage to opposing Pokémon twice.',
  bullet_punch:
    'Has the user move at bullet speed and deliver a metal punch, dealing damage. This move always strikes first.',
  double_hit:
    'Has the user strike the designated opposing Pokémon twice in a row, dealing damage with each hit.',
  swords_dance:
    'Has the user perform a frenetic swords dance that sharply increases its Attack for a short time.',
  green_illusion_dive:
    'Has the user (Scyther) dive at all nearby opposing Pokémon at blinding speed, dealing damage.',
  red_illusion_dive:
    'Has the user (Scizor) dive at all nearby opposing Pokémon at blinding speed, dealing damage. Pincer attacks deal increased damage.',

  // ══════════════════════════════════════════════════════
  // TYRANITAR
  // Source: https://bulbapedia.bulbagarden.net/wiki/Tyranitar_(Pok%C3%A9mon_UNITE)
  // ══════════════════════════════════════════════════════
  bite:
    'Has the user bite the designated opposing Pokémon with dark energy, dealing damage and potentially causing them to flinch.',
  stone_edge:
    'Has the user pierce the ground to create sharp stones that shoot up in a wide area, dealing damage to opposing Pokémon in the area of effect. This move has a high critical-hit rate.',
  rock_polish:
    'Polishes the user\'s surface smooth to sharply increase its movement speed for a short time.',
  ancient_power:
    'Has the user attack with an ancient power that deals damage to opposing Pokémon in the area of effect. May also increase all the user\'s stats for a short time.',
  sand_tomb:
    'Creates a swirling sandstorm at the designated area, dealing damage over time to opposing Pokémon caught in it and preventing them from escaping for a short time.',
  tyrannical_rampage:
    'Has the user go on a rampage, becoming immune to hindrances and attacking all nearby opposing Pokémon with increased power. The rampage ends after a set time or when the user is KO\'d.',

  // ══════════════════════════════════════════════════════
  // BLAZIKEN
  // Source: https://bulbapedia.bulbagarden.net/wiki/Blaziken_(Pok%C3%A9mon_UNITE)
  // ══════════════════════════════════════════════════════
  focus_blast:
    'Has the user focus its mind and launch a powerful sphere of energy, dealing massive damage to opposing Pokémon in the area of effect.',
  spinning_flame_fist:
    'Has the user surround its fists with fire and deliver rapid spinning punches to all nearby opposing Pokémon, dealing damage.',
  spinning_flame_kick:
    'Has the user surround its legs with fire and deliver rapid spinning kicks to all nearby opposing Pokémon, dealing damage.',

  // ══════════════════════════════════════════════════════
  // METAGROSS
  // Source: https://bulbapedia.bulbagarden.net/wiki/Metagross_(Pok%C3%A9mon_UNITE)
  // ══════════════════════════════════════════════════════
  iron_defense:
    'Has the user harden its body like steel, sharply increasing its Defense and Sp. Def for a short time.',
  meteor_mash_metagross:
    'Has the user form a powerful fist and launch itself forward, dealing damage to opposing Pokémon it hits and shoving them.',
  gyro_ball:
    'Has the user spin rapidly and charge in the designated direction, dealing damage to opposing Pokémon it hits. The slower the user is compared to the target, the greater the damage.',
  tackle_metagross:
    'Has the user charge forward and slam into opposing Pokémon, dealing damage.',
  zen_headbutt:
    'Has the user focus its willpower and charge headfirst at the designated opposing Pokémon, dealing damage and potentially causing them to flinch.',
  magnet_rise:
    'Has the user levitate using its magnetic force, becoming immune to ground-based attacks and increasing its movement speed for a short time.',
  compute_and_crush:
    'Has the user analyze the battlefield and then crash down with tremendous force, dealing massive damage to all opposing Pokémon in the area of effect.',

  // ══════════════════════════════════════════════════════
  // GYARADOS
  // Source: https://bulbapedia.bulbagarden.net/wiki/Gyarados_(Pok%C3%A9mon_UNITE)
  // ══════════════════════════════════════════════════════
  flail_gyarados:
    'Has the user thrash about wildly, dealing damage to opposing Pokémon it hits. The lower the user\'s HP, the greater the damage dealt.',
  dragon_breath:
    'Breathes out a gust of draconic energy, dealing damage to opposing Pokémon in a forward direction and potentially leaving them paralyzed.',
  splash:
    'Has the user leap up and splash down, dealing damage to nearby opposing Pokémon.',
  waterfall:
    'Has the user charge upward wrapped in water, dealing damage to opposing Pokémon it hits and potentially causing them to flinch.',
  bounce:
    'Has the user leap high into the air, then crash down on the designated location, dealing damage to opposing Pokémon in the area of effect and potentially leaving them paralyzed.',
  dragon_current:
    'Has the user create a powerful current that carries all nearby Pokémon in a designated direction. Opposing Pokémon caught in the current receive damage, while ally Pokémon gain increased movement speed.',

  // ══════════════════════════════════════════════════════
  // MEWTWO X / MEWTWO Y
  // Source: https://bulbapedia.bulbagarden.net/wiki/Mewtwo_(Pok%C3%A9mon_UNITE)
  // ══════════════════════════════════════════════════════
  confusion_mewtwo:
    'Releases a telekinetic blast in the designated direction, dealing damage to opposing Pokémon it hits and decreasing their movement speed for a short time.',
  psystrike:
    'Has the user materialize odd psychic waves and fire them at the designated opposing Pokémon, dealing damage while partially ignoring their Sp. Def.',
  recover:
    'Has the user restore a large portion of its own HP.',
  teleport:
    'Has the user instantly teleport to a designated location, avoiding any attacks in the process.',
  infinite_psyburn:
    'Has the user unleash an infinite supply of psychic power, dealing damage to all opposing Pokémon in the area of effect. The user\'s power increases the lower its HP is.',

  // ══════════════════════════════════════════════════════
  // AEGISLASH
  // Source: https://bulbapedia.bulbagarden.net/wiki/Aegislash_(Pok%C3%A9mon_UNITE)
  // ══════════════════════════════════════════════════════
  shadow_sneak:
    'Has the user extend its shadow to grab and pull in the designated opposing Pokémon, dealing damage.',
  sacred_sword:
    'Has the user slash with a blade of sacred energy, dealing damage to opposing Pokémon in a forward direction and ignoring their stat changes.',
  shadow_claw_aegislash:
    'Has the user transform into Blade Forme and slash with a shadowy claw, dealing damage to opposing Pokémon in front of it.',
  wide_guard:
    'Has the user and nearby ally Pokémon take a defensive stance, protecting them from wide-ranging attacks for a short time.',
  iron_head:
    'Has the user make its head as hard as iron and then ram the designated opposing Pokémon, dealing damage and potentially causing them to flinch.',
  coup_de_grace:
    'Has the user alternate between Shield Forme and Blade Forme, dealing damage to all nearby opposing Pokémon in multiple waves.',

  // ══════════════════════════════════════════════════════
  // MIMIKYU
  // Source: https://bulbapedia.bulbagarden.net/wiki/Mimikyu_(Pok%C3%A9mon_UNITE)
  // ══════════════════════════════════════════════════════
  astonish:
    'Has the user jump out and startle the opposing Pokémon, dealing damage and potentially causing them to flinch.',
  trick_room:
    'Creates a strange field where slower Pokémon move first for a short time. Slower Pokémon in the area have their movement speed increased.',
  shadow_sneak_mimikyu:
    'Has the user stealthily approach the designated opposing Pokémon from the shadows and strike, dealing damage.',
  play_with_me:
    'Has the user disguise itself and lure in nearby opposing Pokémon. If an opposing Pokémon falls for the disguise, it is left unable to act.',

  // ══════════════════════════════════════════════════════
  // BUZZWOLE
  // Source: https://bulbapedia.bulbagarden.net/wiki/Buzzwole_(Pok%C3%A9mon_UNITE)
  // ══════════════════════════════════════════════════════
  mega_punch:
    'Has the user deliver a powerful punch to the designated opposing Pokémon, dealing damage and shoving them.',
  lunge:
    'Has the user lunge at the designated opposing Pokémon, dealing damage and decreasing their Attack for a short time.',
  smack_down:
    'Has the user throw a rock at the designated opposing Pokémon, dealing damage and grounding them so they cannot avoid ground-based moves.',
  fell_stinger:
    'Has the user stab the designated opposing Pokémon with a sharp stinger, dealing damage. If this move KOs a Pokémon, the user\'s Attack is sharply increased.',
  leech_life:
    'Has the user suck the life force from the designated opposing Pokémon, dealing damage and restoring the user\'s HP.',
  superpower:
    'Has the user attack with full power, dealing massive damage to nearby opposing Pokémon. After using this move, the user\'s Attack and Defense are decreased for a short time.',
  ultra_swole_slam:
    'Has the user flex its muscles and then deliver a devastating slam to all nearby opposing Pokémon, dealing massive damage. The user\'s Attack is greatly increased for a short time afterward.',

  // ══════════════════════════════════════════════════════
  // MIRAIDON
  // Source: https://bulbapedia.bulbagarden.net/wiki/Miraidon_(Pok%C3%A9mon_UNITE)
  // ══════════════════════════════════════════════════════
  thunder_shock_miraidon:
    'Discharges electric energy that deals damage to opposing Pokémon in the area of effect and leaves them paralyzed for a short time.',
  charge_beam:
    'Has the user fire a beam of electricity in a forward direction, dealing damage to opposing Pokémon it hits. May raise the user\'s Sp. Atk.',
  electro_drift:
    'Has the user convert into vehicle mode and dash in the designated direction, dealing damage to opposing Pokémon it hits and leaving them paralyzed.',
  thunder_wave_miraidon:
    'Emits a weak electric shock that deals damage to opposing Pokémon in the area of effect and leaves them paralyzed for a short time.',
  thunder_miraidon:
    'Calls down a bolt of lightning at the designated location, dealing damage to opposing Pokémon in the area of effect. If there are paralyzed Pokémon in the area, the damage is increased.',
  parabolic_charge:
    'Has the user release electric energy in a circular area around itself, dealing damage to nearby opposing Pokémon and restoring the user\'s HP for a portion of the damage dealt.',
  bright_future_meteor_storm:
    'Has the user fly high and unleash a storm of meteors on a large area, dealing massive damage to all opposing Pokémon in the area of effect and leaving them unable to act.',

  // ══════════════════════════════════════════════════════
  // DECIDUEYE
  // Source: https://bulbapedia.bulbagarden.net/wiki/Decidueye_(Pok%C3%A9mon_UNITE)
  // ══════════════════════════════════════════════════════
  astonish_decidueye:
    'Has the user jump out and startle nearby opposing Pokémon with a ghostly screech, dealing damage and decreasing their movement speed for a short time.',
  spirit_shackle:
    'Has the user shoot an arrow of spectral energy that pins the first opposing Pokémon hit, dealing damage and preventing them from moving away for a short time.',
  leaf_storm:
    'Has the user whip up a fierce storm of sharp leaves in the designated area, dealing damage to opposing Pokémon in the area of effect. Afterward, the user\'s Sp. Atk is decreased.',
  nock_nock:
    'Has the user vanish and reappear at the designated location, then unleash a barrage of spirit arrows at all nearby opposing Pokémon, dealing damage.',

  // ══════════════════════════════════════════════════════
  // DURALUDON
  // Source: https://bulbapedia.bulbagarden.net/wiki/Duraludon_(Pok%C3%A9mon_UNITE)
  // ══════════════════════════════════════════════════════
  laser_focus:
    'Has the user concentrate intensely on the target, guaranteeing that the next move will result in a critical hit.',
  flash_cannon:
    'Has the user gather light and fire a powerful beam in a forward direction, dealing damage to opposing Pokémon it hits and decreasing their Sp. Def for a short time.',
  metal_claw:
    'Has the user slash with steel-hard claws, dealing damage to opposing Pokémon. May raise the user\'s Attack.',
  dragon_tail:
    'Has the user swing its tail and strike opposing Pokémon, dealing damage and shoving them away.',
  stealth_rock:
    'Has the user scatter sharp rocks across the designated area. Opposing Pokémon that walk over the rocks take damage.',
  revolving_ruin:
    'Has the user transform into a towering ruin form and shoot powerful lasers from its body, dealing massive damage to all opposing Pokémon in the area of effect.',

  // ══════════════════════════════════════════════════════
  // DRAGAPULT
  // Source: https://bulbapedia.bulbagarden.net/wiki/Dragapult_(Pok%C3%A9mon_UNITE)
  // ══════════════════════════════════════════════════════
  shadow_ball_dragapult:
    'Launches a shadowy blob charged with dragon energy, dealing damage to opposing Pokémon in the area of effect and decreasing their movement speed and Sp. Def for a short time.',
  dragon_dance:
    'Has the user perform an enchanting dance that raises its Attack and movement speed for a short time.',
  phantom_force:
    'Has the user vanish into another dimension and reappear at the designated location, dealing damage to opposing Pokémon in the area of effect.',
  dreep_and_destroy:
    'Has the user launch Dreepy projectiles in a wide area at high speed, dealing damage to all opposing Pokémon hit. The user\'s movement speed is greatly increased for a short time.',

  // ══════════════════════════════════════════════════════
  // CLEFABLE
  // Source: https://bulbapedia.bulbagarden.net/wiki/Clefable_(Pok%C3%A9mon_UNITE)
  // ══════════════════════════════════════════════════════
  moonlight:
    'Has the user bathe in moonlight to restore its own or a nearby ally Pokémon\'s HP. The amount restored depends on the weather.',
  disarming_voice:
    'Has the user let out a charming cry that never misses, dealing damage to nearby opposing Pokémon.',
  gravity:
    'Has the user intensify gravity in the designated area, pulling in all opposing Pokémon caught in the area and dealing damage. While gravity is in effect, flying and levitating Pokémon are grounded.',
  follow_me:
    'Has the user call attention to itself, drawing all opposing Pokémon\'s attacks toward itself for a short time and reducing damage taken.',
  wonder_wish:
    'Has the user make a wish on a shooting star, granting a random powerful effect to the user and nearby ally Pokémon.',

  // ══════════════════════════════════════════════════════
  // DELPHOX
  // Source: https://www.serebii.net/pokemonunite/pokemon/delphox.shtml
  //         https://game8.co/games/Pokemon-UNITE/archives/379004
  // ══════════════════════════════════════════════════════
  ember_delphox:
    'Has the user shoot a small flame in front of itself, dealing damage to opposing Pokémon it hits.',
  fire_blast:
    'Has the user launch intense fire in a forward direction, dealing damage to opposing Pokémon it hits. The fire leaves behind a zone of flames where a delayed explosion will occur, dealing damage to opposing Pokémon in the area of effect.',
  mystical_fire_delphox:
    'Has the user unleash a special ball of fire that explodes on impact, dealing damage to opposing Pokémon in the area of effect and decreasing their Sp. Atk.',
  will_o_wisp_delphox:
    'Has the user conjure up sinister flames and launch them toward the designated area. The flames deal damage to opposing Pokémon and decrease their movement speed for a short time.',
  flame_charge_delphox:
    'Has the user charge forward in the designated direction and summon flames that deal damage to opposing Pokémon and decrease their movement speed for a short time.',
  fire_spin_delphox:
    'Has the user create a vortex of fire that moves toward the nearest opposing Pokémon, dealing damage over time and decreasing movement speed. Opposing Pokémon caught in the center are left unable to act.',
  fanciful_fireworks:
    'Deals damage over time to opposing Pokémon in the designated area. Opposing Pokémon that are hit have decreased movement speed and weakened HP recovery effects for a short time.',

  // ══════════════════════════════════════════════════════
  // MEW
  // Source: https://www.serebii.net/pokemonunite/pokemon/mew.shtml
  //         https://game8.co/games/Pokemon-UNITE/archives/387579
  // ══════════════════════════════════════════════════════
  electro_ball_mew:
    'Has the user hurl an electric orb, dealing damage to opposing Pokémon in the area of effect and leaving them paralyzed. This move deals more damage the lower the opposing Pokémon\'s remaining HP is.',
  solar_beam_mew:
    'Has the user blast a bundled beam of light, dealing damage to opposing Pokémon in the area of effect. If this move hits any opposing Pokémon, the user gains one additional boost counter.',
  surf_mew:
    'Has the user charge forward on a wave, shoving opposing Pokémon and leaving them unable to act. The user gains a shield and becomes immune to hindrances while using this move.',
  coaching:
    'Has the user move toward an ally Pokémon, grant that Pokémon a shield, and increase that Pokémon\'s basic attack speed.',
  light_screen_mew:
    'Has the user create a translucent wall at the designated location. Opposing Pokémon cannot pass through the wall and are shoved if they make contact with it.',
  agility_mew:
    'Has the user move quickly in the designated direction, increasing its movement speed for a short time. A maximum of two uses can be kept in reserve.',
  mystical_mirage:
    'Has the user create a field and enter stealth. The user and ally Pokémon in the area of effect also enter stealth. After a set time, the move deals damage to opposing Pokémon in the area of effect.',

  // ══════════════════════════════════════════════════════
  // LATIOS
  // Source: https://www.serebii.net/pokemonunite/pokemon/latios.shtml
  //         https://game8.co/games/Pokemon-UNITE/archives/534323
  // ══════════════════════════════════════════════════════
  confusion_latios:
    'Releases a weak telekinetic force in the designated direction, dealing damage and applying a slowing effect to opposing Pokémon it hits.',
  swift_latios:
    'Shoots star-shaped rays across a large area in the designated direction, dealing damage to opposing Pokémon it hits.',
  luster_purge:
    'Has the user let loose a ball of light that later releases all at once, dealing damage to opposing Pokémon and marking them. Marked opposing Pokémon take increased damage from Latios and Latias.',
  telekinesis_latios:
    'Unleashes psychic power in the designated direction. If this move hits an opposing Pokémon, it can be used again to link two Pokémon and pull them together, leaving them unable to act.',
  dragon_pulse_latios:
    'Has the user dash and make its next basic attack a boosted attack that releases telekinetic projectiles. The user gains Eon power when defeating wild Pokémon or hitting with boosted attacks; more Eon power means more projectiles and greater damage.',
  draco_meteor:
    'Has the user summon down comets onto the designated area, dealing damage to opposing Pokémon. If this move hits, the user gains Eon power; more Eon power means more comets and greater damage.',
  eon_blast:
    'Has the user aim at the designated opposing Pokémon and release a pulse, dealing damage. Latios\'s move cooldowns reset and are reduced for a short time. If Latias also targets the same Pokémon simultaneously, the pulses combine for massive damage.',

  // ══════════════════════════════════════════════════════
  // INTELEON
  // Source: https://www.serebii.net/pokemonunite/pokemon/inteleon.shtml
  //         https://game8.co/games/Pokemon-UNITE/archives/417092
  // ══════════════════════════════════════════════════════
  tearful_look:
    'Decreases the Attack and Sp. Atk of the designated opposing Pokémon and increases the user\'s movement speed for a short time. Grants the user one critical counter.',
  acrobatics_inteleon:
    'Has the user glide in the designated direction; if it hits an opposing Pokémon or wall it can glide again, dealing damage and decreasing movement speed. Each use grants one critical counter.',
  water_gun_inteleon:
    'Has the user squirt water in a forward direction, dealing damage to opposing Pokémon it hits. This move has a set chance of becoming a critical hit.',
  snipe_shot:
    'Has the user aim and then fire a water projectile, dealing damage while partially ignoring the target\'s Sp. Def. The farther away the target, the more damage this move deals. This move has a high critical-hit rate.',
  liquidation:
    'Has the user fire rapid water projectiles at the designated opposing Pokémon, dealing damage. If this move hits enough times in a short period, the target takes increased damage from all attacks for a short time.',
  azure_spy_vision:
    'For a short time, enables the user to see nearby Pokémon in stealth or in tall grass. Also doubles the user\'s critical-hit rate, and the user gains one critical counter periodically.',

  // ══════════════════════════════════════════════════════
  // ARMAROUGE
  // Source: https://www.serebii.net/pokemonunite/pokemon/armarouge.shtml
  //         https://game8.co/games/Pokemon-UNITE/archives/471865
  // ══════════════════════════════════════════════════════
  incinerate:
    'Attacks the designated opposing Pokémon with a flame, setting it ablaze and dealing damage over time. When a burned Pokémon picks up a berry, the berry\'s effects are halved.',
  armor_cannon:
    'Has the user combine its shoulder armor to fire a blazing ball of flame that explodes on impact, dealing damage to opposing Pokémon and leaving them unable to act. The user\'s Defense and Sp. Def decrease briefly after use.',
  fire_spin_armarouge:
    'Has the user generate a fierce vortex of fire around itself, dealing damage to opposing Pokémon and increasing the user\'s Defense and Sp. Def each time it deals damage (up to 3 stacks).',
  will_o_wisp_armarouge:
    'Shoots a flame in the designated direction, dealing damage and applying a slowing effect to opposing Pokémon it hits while leaving them burned.',
  flame_charge_armarouge:
    'Has the user cloak itself in flame and charge in the designated direction, dealing damage and shoving opposing Pokémon. Grants the user a shield when it hits an opposing Pokémon.',
  psyshock_armarouge:
    'Has the user materialize psychic waves to attack in three areas in front of itself, dealing damage while partially ignoring Sp. Def. The third wave throws opposing Pokémon it hits.',
  psykaboom:
    'Has the user jump up and charge psychic power, creating an area that leaves opposing Pokémon unable to act, then fires a ball of flame to deal damage and throw them outside the area.',

  // ══════════════════════════════════════════════════════
  // SABLEYE
  // Source: https://bulbapedia.bulbagarden.net/wiki/Sableye_(Pok%C3%A9mon_UNITE)
  // ══════════════════════════════════════════════════════
  thief:
    'Has the user dash at the designated opposing Pokémon and steal any held items, temporarily disabling them and dealing damage.',
  knock_off:
    'Has the user knock away the designated opposing Pokémon\'s held items, dealing damage and temporarily disabling the item\'s effect.',
  feint_attack:
    'Has the user approach the target while feigning innocence, then strike from an unexpected angle, dealing damage that ignores evasiveness.',
  confuse_ray:
    'Has the user emit a sinister ray that confuses opposing Pokémon in the area of effect, causing them to occasionally attack their allies.',
  chaos_glower:
    'Has the user glare at all nearby opposing Pokémon, leaving them unable to act for a short time and temporarily reducing their held item effects.',

  // ══════════════════════════════════════════════════════
  // PSYDUCK
  // Source: https://bulbapedia.bulbagarden.net/wiki/Psyduck_(Pok%C3%A9mon_UNITE)
  // ══════════════════════════════════════════════════════
  confusion_psyduck:
    'Has the user emit confusion waves in a forward direction, dealing damage to opposing Pokémon and decreasing their movement speed for a short time.',
  surf_psyduck:
    'Has the user ride a wave forward, dealing damage to opposing Pokémon and throwing them.',
  disable:
    'Has the user focus on the designated opposing Pokémon, preventing it from using its most recently used move for a short time.',
  psychic_psyduck:
    'Uses psychic energy to create a vortex that pulls in and damages opposing Pokémon in the area of effect, also decreasing their Sp. Def for a short time.',
  full_power_psy_ay_ay:
    'Has the user fully release its pent-up psychic power in a massive explosion, dealing massive damage to all opposing Pokémon in the area of effect.',

  // ══════════════════════════════════════════════════════
  // HOOPA
  // Source: https://bulbapedia.bulbagarden.net/wiki/Hoopa_(Pok%C3%A9mon_UNITE)
  // ══════════════════════════════════════════════════════
  astonish_hoopa:
    'Has the user suddenly appear from a ring and startle opposing Pokémon, dealing damage and decreasing their movement speed for a short time.',
  shadow_ball_hoopa:
    'Has the user throw a shadowy blob through one of its rings, dealing damage to opposing Pokémon in the area of effect and decreasing their Sp. Def.',
  confusion_hoopa:
    'Has the user unleash telekinetic force through a ring in the designated direction, dealing damage and decreasing the movement speed of opposing Pokémon it hits.',
  hyperspace_hole:
    'Has the user open a hyperspace hole that teleports up to two ally Pokémon to the user\'s location. During this time, the user can also teleport itself.',
  trick:
    'Has the user use one of its rings to confuse the designated opposing Pokémon, swapping their held item with the user\'s temporarily.',
  rings_unbound:
    'Has the user transform into its Unbound Forme and open giant rings, pulling in all opposing Pokémon in a large area and dealing massive damage.',

  // ══════════════════════════════════════════════════════
  // COMFEY
  // Source: https://bulbapedia.bulbagarden.net/wiki/Comfey_(Pok%C3%A9mon_UNITE)
  // ══════════════════════════════════════════════════════
  synthesis:
    'Has the user absorb sunlight to restore its own HP and that of a nearby ally Pokémon.',
  floral_healing:
    'Has the user create a floral ring around a nearby ally Pokémon, gradually restoring the ally\'s HP for a short time.',
  sweet_kiss:
    'Has the user blow a kiss at the designated opposing Pokémon, leaving them confused for a short time.',
  vine_whip:
    'Has the user attack with a vine in the designated direction, dealing damage to opposing Pokémon it hits.',
  magical_leaf:
    'Has the user shoot glowing leaves that never miss, dealing damage to opposing Pokémon in a forward direction.',
  grass_knot:
    'Has the user create a trip wire of grass at the designated location. Opposing Pokémon that walk over it are tripped and left unable to act for a short time.',
  flowery_fields_forever:
    'Has the user create a large field of flowers. Ally Pokémon in the field have their HP gradually restored and their movement speed increased.',

  // ══════════════════════════════════════════════════════
  // ALCREMIE
  // Source: https://bulbapedia.bulbagarden.net/wiki/Alcremie_(Pok%C3%A9mon_UNITE)
  // ══════════════════════════════════════════════════════
  helping_hand_alcremie:
    'Has the user support a nearby ally Pokémon, greatly increasing that Pokémon\'s movement speed and basic attack speed for a short time.',
  decorate:
    'Has the user decorate a nearby ally Pokémon with cream, increasing its Attack and Sp. Atk for a short time.',
  recover_alcremie:
    'Has the user restore a portion of its own HP.',
  charm:
    'Has the user charm the designated opposing Pokémon, decreasing its Attack for a short time.',
  dazzling_gleam_alcremie:
    'Has the user emit a powerful flash of light in all directions, dealing damage to nearby opposing Pokémon.',
  sweet_scent:
    'Has the user emit a sweet scent that lures opposing Pokémon toward the user and decreases their evasiveness for a short time.',
  fluffy_cream_supreme:
    'Has the user cover the area with cream, creating a large zone where ally Pokémon are continuously healed and opposing Pokémon are slowed.',

  // ══════════════════════════════════════════════════════
  // LATIAS
  // Source: https://bulbapedia.bulbagarden.net/wiki/Latias_(Pok%C3%A9mon_UNITE)
  // ══════════════════════════════════════════════════════
  mist_ball:
    'Has the user drop a large ball of down that explodes after a short time, dealing damage to opposing Pokémon in the area of effect and decreasing their Sp. Atk for a short time.',
  dragon_cheer:
    'Has the user cheer on ally Pokémon, increasing their critical-hit rate for a short time. For Dragon-type allies, the effect is stronger.',
  mist_blast:
    'Has the user team up with Latios to fire a massive mist beam that deals damage to all opposing Pokémon in its path. If Latios uses Eon Blast simultaneously, the effects combine.',

  // ══════════════════════════════════════════════════════
  // ZACIAN
  // Source: https://bulbapedia.bulbagarden.net/wiki/Zacian_(Pok%C3%A9mon_UNITE)
  // ══════════════════════════════════════════════════════
  slash:
    'Has the user slash with sharp claws, dealing damage to opposing Pokémon in front of it.',
  metal_claw_zacian:
    'Has the user slash with steel-hard claws, dealing damage to opposing Pokémon it hits and raising the user\'s Attack.',
  sacred_sword_zacian:
    'Has the user slash with the Fairy King\'s Sword, dealing damage to opposing Pokémon in a forward direction and ignoring their stat changes.',
  sovereign_sword:
    'Has the user charge power and unleash an all-out attack with the Fairy King\'s Sword, dealing massive damage to all opposing Pokémon in the area of effect.',

  // ══════════════════════════════════════════════════════
  // URSHIFU
  // Source: https://bulbapedia.bulbagarden.net/wiki/Urshifu_(Pok%C3%A9mon_UNITE)
  // ══════════════════════════════════════════════════════
  rock_smash:
    'Has the user smash a rock with a punch, dealing damage to opposing Pokémon in front of it and decreasing their Defense for a short time.',
  wicked_blow:
    'Has the user strike the designated opposing Pokémon with a single devastating blow that always results in a critical hit.',
  surging_strikes:
    'Has the user strike the designated opposing Pokémon with a rapid three-hit combo, each hit always resulting in a critical hit.',
  headbutt:
    'Has the user lower its head and charge at the designated opposing Pokémon, dealing damage and potentially causing them to flinch.',
  throat_chop:
    'Has the user deliver a powerful chop to the designated opposing Pokémon\'s throat, dealing damage and preventing them from using sound-based moves for a short time.',
  ebon_fist:
    'Has the user (Single Strike Style) deliver a single massive punch that creates a dark vortex, dealing damage to all opposing Pokémon in the area of effect.',
  flowing_fists:
    'Has the user (Rapid Strike Style) deliver a series of rapid water-powered strikes to all nearby opposing Pokémon, dealing damage.',

  // ══════════════════════════════════════════════════════
  // PAWMOT
  // Source: https://bulbapedia.bulbagarden.net/wiki/Pawmot_(Pok%C3%A9mon_UNITE)
  // ══════════════════════════════════════════════════════
  nuzzle:
    'Has the user rub its cheeks against the designated opposing Pokémon, dealing damage and leaving them paralyzed for a short time.',
  thunder_punch:
    'Has the user throw an electrically charged punch at the designated opposing Pokémon, dealing damage and potentially leaving them paralyzed.',
  supercell_slam:
    'Has the user leap up and slam down with tremendous electric force, dealing damage to opposing Pokémon in the area of effect and leaving them unable to act for a short time.',
  mach_punch:
    'Has the user unleash a punch at mach speed. This move always strikes first.',
  zip_zap_full_charge_spark:
    'Has the user charge up electricity and unleash it in a devastating electric dash, dealing massive damage to all opposing Pokémon in its path.',

  // ══════════════════════════════════════════════════════
  // CERULEDGE
  // Source: https://bulbapedia.bulbagarden.net/wiki/Ceruledge_(Pok%C3%A9mon_UNITE)
  // ══════════════════════════════════════════════════════
  lava_plume:
    'Has the user release a wave of scorching-hot flames in all directions around itself, dealing damage to nearby opposing Pokémon and potentially leaving them burned.',
  bitter_blade:
    'Has the user slash with blades of fiery grudges, dealing damage to opposing Pokémon in front of it and restoring the user\'s HP for a portion of the damage dealt.',
  take_down:
    'Has the user charge at the designated opposing Pokémon, dealing damage and shoving them. This move also deals recoil damage to the user.',
  phantom_force_ceruledge:
    'Has the user vanish into another dimension while cloaked in ghostly flames, then reappear to strike, dealing damage to opposing Pokémon in the area of effect.',
  flame_charge:
    'Has the user cloak itself in flame and charge in the designated direction, dealing damage to opposing Pokémon it hits and raising the user\'s movement speed.',
  revenant_rend:
    'Has the user slash with blades of vengeance, dealing damage to all opposing Pokémon in the area of effect and restoring HP with each hit.',

  // ══════════════════════════════════════════════════════
  // TINKATON
  // Source: https://bulbapedia.bulbagarden.net/wiki/Tinkaton_(Pok%C3%A9mon_UNITE)
  // ══════════════════════════════════════════════════════
  gigaton_hammer:
    'Has the user swing its giant hammer in the designated direction, dealing massive damage to opposing Pokémon it hits and throwing them.',
  smack_down_tinkaton:
    'Has the user throw a small rock at the designated opposing Pokémon, dealing damage and grounding them.',
  ice_hammer:
    'Has the user swing its hammer imbued with ice energy, dealing damage to opposing Pokémon in a wide area and leaving them frozen for a short time.',
  thief_tinkaton:
    'Has the user snatch a held item from the designated opposing Pokémon, temporarily disabling it and dealing damage.',
  kiss_bliss_kaboom:
    'Has the user blow a giant kiss made of energy, dealing damage to all opposing Pokémon in a large forward area. Ally Pokémon in the area have their HP restored.',

  // ══════════════════════════════════════════════════════
  // FALINKS
  // Source: https://bulbapedia.bulbagarden.net/wiki/Falinks_(Pok%C3%A9mon_UNITE)
  // ══════════════════════════════════════════════════════
  megahorn:
    'Has the user attack viciously with an enormous horn, dealing damage to opposing Pokémon in the area of effect.',
  iron_head_falinks:
    'Has the user make its head as hard as iron and then perform a charging attack, dealing damage to opposing Pokémon it hits and potentially causing them to flinch.',
  no_retreat:
    'Has the user take a do-or-die stance, sharply raising all its stats but preventing it from retreating. The user cannot move away from opposing Pokémon while this move is in effect.',
  beat_up:
    'Has the user call on ally Pokémon to each make one strike against the designated opposing Pokémon, dealing damage.',
  dust_devil_formation:
    'Has all troop members form a formation and charge in the designated direction, dealing damage to opposing Pokémon and leaving them unable to act.',

  // ══════════════════════════════════════════════════════
  // SIRFETCH'D
  // Source: https://bulbapedia.bulbagarden.net/wiki/Sirfetch%27d_(Pok%C3%A9mon_UNITE)
  // ══════════════════════════════════════════════════════
  quick_attack_sirfetchd:
    'Has the user charge forward with its lance, dealing damage to the first opposing Pokémon it hits.',
  brutal_swing:
    'Has the user swing its lance and leek in a wide arc, dealing damage to all opposing Pokémon in the area of effect.',
  detect:
    'Has the user detect incoming attacks and dodge, becoming temporarily invincible and counterattacking the next opposing Pokémon to strike.',
  lunging_leek_nova_blast:
    'Has the user charge forward with lance raised, then unleash a powerful leek blast that deals massive damage to all opposing Pokémon in the area of effect.',

  // ══════════════════════════════════════════════════════
  // DRAGONITE
  // Source: https://bulbapedia.bulbagarden.net/wiki/Dragonite_(Pok%C3%A9mon_UNITE)
  // ══════════════════════════════════════════════════════
  twister:
    'Has the user cause a commotion to stir up a twisting tornado, dealing damage to opposing Pokémon in the area of effect.',
  dragon_breath_dragonite:
    'Has the user breathe a gust of draconic energy in a forward direction, dealing damage to opposing Pokémon and potentially leaving them paralyzed. If the target is already statused, the damage is increased.',
  hyper_beam:
    'Has the user unleash all its energy in a powerful beam, dealing massive damage to opposing Pokémon in a forward direction. The user must rest afterward and cannot move.',
  outrage:
    'Has the user thrash about for two to three turns, dealing damage to all nearby opposing Pokémon. After the move ends, the user becomes confused.',
  draco_impact:
    'Has the user fly high and then dive down with tremendous force, dealing massive damage to all opposing Pokémon in the area of effect.',

  // ══════════════════════════════════════════════════════
  // EMPOLEON
  // Source: https://bulbapedia.bulbagarden.net/wiki/Empoleon_(Pok%C3%A9mon_UNITE)
  // ══════════════════════════════════════════════════════
  peck_empoleon:
    'Has the user peck at the designated opposing Pokémon with its beak, dealing damage.',
  hydro_cannon:
    'Has the user fire a powerful torrent of water in a forward direction, dealing damage to opposing Pokémon in the area of effect.',
  metal_claw_empoleon:
    'Has the user slash with steel-hard claws while dashing forward, dealing damage to opposing Pokémon it hits.',
  aqua_jet:
    'Has the user cloak itself in water and dash at blinding speed, dealing damage to opposing Pokémon it hits. This move always strikes first.',
  sovereign_slide:
    'Has the user dash forward on a wave of water, dealing damage to all opposing Pokémon in its path and shoving them. The user then attacks with its wings, dealing additional damage.',

  // ══════════════════════════════════════════════════════
  // SUICUNE
  // Source: https://bulbapedia.bulbagarden.net/wiki/Suicune_(Pok%C3%A9mon_UNITE)
  // ══════════════════════════════════════════════════════
  whirlpool_suicune:
    'Has the user create a whirlpool at the designated location, dealing damage over time to opposing Pokémon in the area of effect and trapping them inside.',
  surf_suicune:
    'Has the user crash forward on a large wave, dealing damage to opposing Pokémon and throwing them. The user becomes immune to hindrances while using this move.',
  endless_ice_spikes:
    'Has the user create a massive field of ice spikes, dealing damage to all opposing Pokémon in the area of effect and leaving them unable to act.',
  pressure:
    'When the Pokémon is targeted by an opposing Pokémon\'s move, the opposing Pokémon\'s move\'s PP is decreased by 2 instead of 1.',

  // ══════════════════════════════════════════════════════
  // DHELMISE
  // Source: https://bulbapedia.bulbagarden.net/wiki/Dhelmise_(Pok%C3%A9mon_UNITE)
  // ══════════════════════════════════════════════════════
  steelworker:
    'The Pokémon\'s Steel-type moves deal increased damage.',
  payback:
    'Has the user wait and then strike the designated opposing Pokémon, dealing damage. The damage is doubled if the user was attacked first.',
  whirlpool_dhelmise:
    'Has the user spin its anchor to create a whirlpool, pulling in and damaging opposing Pokémon in the area of effect.',
  bulldoze_dhelmise:
    'Has the user stomp the ground forcefully, dealing damage to opposing Pokémon in the area of effect and decreasing their movement speed.',
  anchor_shot:
    'Has the user fling its anchor at the designated opposing Pokémon, dealing damage and preventing them from escaping for a short time.',
  heavy_slam_dhelmise:
    'Has the user slam down with tremendous weight on the designated opposing Pokémon, dealing damage. The heavier the user compared to the target, the more damage is dealt.',
  seaweed_snare:
    'Has the user ensnare all nearby opposing Pokémon with seaweed, dealing damage and preventing them from moving for a short time, then deals additional damage when the seaweed snaps.',

};
