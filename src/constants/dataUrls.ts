export const DATA_URLS = {
  pokemon: 'https://raw.githubusercontent.com/pvpoke/pvpoke-unite/master/src/data/gamemaster/pokemon.json',
  heldItems: 'https://raw.githubusercontent.com/pvpoke/pvpoke-unite/master/src/data/gamemaster/heldItems.json',
  battleItems: 'https://raw.githubusercontent.com/pvpoke/pvpoke-unite/master/src/data/gamemaster/battleItems.json',
} as const;

export const SPRITE_BASE_URL = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon';

export function getSpriteUrl(dex: number): string {
  return `${SPRITE_BASE_URL}/${dex}.png`;
}

export const CACHE_VERSION = 1;
export const CACHE_KEY = 'unite_builder_cache_v1';
export const CACHE_TTL_HOURS = 24;
