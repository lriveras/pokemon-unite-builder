import { useCallback } from 'react';
import { useGameDataStore } from '../store/useGameDataStore';
import { fetchAllGameData } from '../services/dataService';

export function useRefreshData() {
  const { setLoading, setError, setPokemon, setHeldItems, setBattleItems, setLastFetched } = useGameDataStore();

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { pokemon, heldItems, battleItems } = await fetchAllGameData();
      setPokemon(pokemon);
      setHeldItems(heldItems);
      setBattleItems(battleItems);
      setLastFetched(new Date().toISOString());
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  }, [setLoading, setError, setPokemon, setHeldItems, setBattleItems, setLastFetched]);

  return { refresh };
}
