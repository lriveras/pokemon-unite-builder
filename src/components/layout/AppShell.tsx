import { Outlet } from 'react-router-dom';
import { TopNav } from './TopNav';
import { useEffect } from 'react';
import { useGameDataStore } from '../../store/useGameDataStore';
import { useRefreshData } from '../../hooks/useRefreshData';
import { ErrorBoundary } from '../common/ErrorBoundary';
import { LoadingOverlay } from '../common/LoadingState';

export function AppShell() {
  const { pokemon, isLoading, error } = useGameDataStore();
  const { refresh } = useRefreshData();

  // Auto-fetch on first load if no data
  useEffect(() => {
    if (pokemon.length === 0 && !isLoading) {
      refresh();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="min-h-screen bg-[#1a1a2e] flex flex-col">
      <TopNav />
      {isLoading && <LoadingOverlay />}
      {error && (
        <div className="mx-4 mt-2 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-sm text-red-400 flex items-center justify-between">
          <span>⚠ Data fetch failed: {error}. Using cached/sample data.</span>
          <button onClick={() => useGameDataStore.getState().setError(null)} className="text-red-300 hover:text-white ml-3">✕</button>
        </div>
      )}
      <main className="flex-1 overflow-auto">
        <ErrorBoundary>
          <Outlet />
        </ErrorBoundary>
      </main>

      {/* Mobile bottom nav */}
      <nav className="sm:hidden fixed bottom-0 left-0 right-0 bg-[#16213e] border-t border-[#0f3460] flex z-40">
        {[
          { to: '/', icon: '⚡', label: 'Build' },
          { to: '/report', icon: '📊', label: 'Report' },
          { to: '/stats-lab', icon: '🔬', label: 'Stats' },
          { to: '/database', icon: '📋', label: 'DB' },
          { to: '/items', icon: '🎒', label: 'Items' },
        ].map(link => (
          <a key={link.to} href={link.to} className="flex-1 flex flex-col items-center py-2 text-slate-500 hover:text-white text-xs gap-0.5">
            <span>{link.icon}</span>
            <span>{link.label}</span>
          </a>
        ))}
      </nav>
    </div>
  );
}
