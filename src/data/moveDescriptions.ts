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

};
