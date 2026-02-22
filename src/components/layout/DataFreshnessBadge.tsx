import { useGameDataStore } from '../../store/useGameDataStore';
import { getCacheAge, isCacheStale } from '../../services/cacheService';
import { useRefreshData } from '../../hooks/useRefreshData';
import { clsx } from 'clsx';

export function DataFreshnessBadge() {
  const { lastFetched, isLoading } = useGameDataStore();
  const { refresh } = useRefreshData();

  if (!lastFetched) return null;

  const stale = isCacheStale(lastFetched);
  const age = getCacheAge(lastFetched);

  return (
    <button
      onClick={refresh}
      disabled={isLoading}
      className={clsx(
        'flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-colors',
        stale
          ? 'bg-amber-500/20 text-amber-400 hover:bg-amber-500/30'
          : 'bg-green-500/20 text-green-400 hover:bg-green-500/30',
        isLoading && 'opacity-50 cursor-not-allowed'
      )}
      title={`Data fetched ${age}. Click to refresh.`}
    >
      <span className={clsx('w-1.5 h-1.5 rounded-full', stale ? 'bg-amber-400' : 'bg-green-400')} />
      <span>Updated {age}</span>
      {stale && <span className="text-amber-300">⚠</span>}
    </button>
  );
}
