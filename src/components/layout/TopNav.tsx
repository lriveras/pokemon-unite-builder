import { NavLink } from 'react-router-dom';
import { clsx } from 'clsx';
import { DataFreshnessBadge } from './DataFreshnessBadge';
import { useRefreshData } from '../../hooks/useRefreshData';
import { useGameDataStore } from '../../store/useGameDataStore';

const NAV_LINKS = [
  { to: '/', label: 'Builder', end: true },
  { to: '/report', label: 'Report' },
  { to: '/stats-lab', label: 'Stats Lab' },
  { to: '/compare', label: 'Compare' },
  { to: '/database', label: 'Database' },
  { to: '/items', label: 'Items' },
  { to: '/maps', label: 'Maps' },
  { to: '/licenses', label: 'Licenses' },
];

export function TopNav() {
  const { refresh } = useRefreshData();
  const { isLoading } = useGameDataStore();

  return (
    <nav className="sticky top-0 z-50 bg-[#16213e] border-b border-[#0f3460]">
      <div className="max-w-screen-2xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
        {/* Logo */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-lg font-bold text-white" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
            <span className="text-purple-400">UNITE</span>{' '}
            <span className="text-slate-300">Builder</span>
          </span>
        </div>

        {/* Nav Links */}
        <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide">
          {NAV_LINKS.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                clsx(
                  'px-3 py-1.5 rounded-md text-sm font-medium whitespace-nowrap transition-colors',
                  isActive
                    ? 'bg-purple-600 text-white'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2 shrink-0">
          <DataFreshnessBadge />
          <button
            onClick={refresh}
            disabled={isLoading}
            className={clsx(
              'px-3 py-1.5 rounded-md text-xs font-medium transition-colors',
              'bg-purple-600 hover:bg-purple-500 text-white',
              isLoading && 'opacity-50 cursor-not-allowed'
            )}
          >
            {isLoading ? 'Fetching...' : 'Refresh Data'}
          </button>
        </div>
      </div>
    </nav>
  );
}
