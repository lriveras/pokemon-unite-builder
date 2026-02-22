import { GameDataCache } from '../types/meta';
import { CACHE_KEY, CACHE_VERSION, CACHE_TTL_HOURS } from '../constants/dataUrls';

export function saveCache(data: Omit<GameDataCache, 'version'>): void {
  const cache: GameDataCache = { ...data, version: CACHE_VERSION };
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
  } catch (e) {
    console.warn('Failed to save to localStorage:', e);
  }
}

export function loadCache(): GameDataCache | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const cache: GameDataCache = JSON.parse(raw);
    if (cache.version !== CACHE_VERSION) {
      localStorage.removeItem(CACHE_KEY);
      return null;
    }
    return cache;
  } catch {
    return null;
  }
}

export function clearCache(): void {
  localStorage.removeItem(CACHE_KEY);
}

export function isCacheStale(lastFetched: string): boolean {
  const fetchedAt = new Date(lastFetched).getTime();
  const now = Date.now();
  return (now - fetchedAt) > CACHE_TTL_HOURS * 60 * 60 * 1000;
}

export function getCacheAge(lastFetched: string): string {
  const fetchedAt = new Date(lastFetched).getTime();
  const diffMs = Date.now() - fetchedAt;
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffMins = Math.floor(diffMs / (1000 * 60));

  if (diffMins < 1) return 'just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  return `${Math.floor(diffHours / 24)}d ago`;
}
