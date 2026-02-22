import { MAPS } from '../../constants/maps';
import { MapInfo, MapObjective } from '../../types/meta';
import { clsx } from 'clsx';

function ObjectiveTimeline({ objectives }: { objectives: MapObjective[] }) {
  const sorted = [...objectives].sort((a, b) => b.time - a.time);
  const maxTime = Math.max(...objectives.map(o => o.time));

  const priorityColors: Record<MapObjective['priority'], string> = {
    high: '#EF4444',
    medium: '#EAB308',
    low: '#22C55E',
  };

  const laneColors: Record<MapObjective['lane'], string> = {
    top: '#3B82F6',
    center: '#A855F7',
    bottom: '#22C55E',
  };

  return (
    <div className="space-y-2">
      {sorted.map((obj, i) => (
        <div key={i} className="flex items-center gap-3">
          <div className="w-12 text-right text-xs font-mono text-slate-400">
            {String(obj.time).padStart(2, '0')}:00
          </div>
          <div
            className="flex-shrink-0 h-2 rounded-full"
            style={{
              width: `${(obj.time / maxTime) * 60}%`,
              backgroundColor: priorityColors[obj.priority],
              opacity: 0.7,
            }}
          />
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-white">{obj.name}</span>
            <span
              className="text-[10px] px-1.5 py-0.5 rounded capitalize"
              style={{ color: laneColors[obj.lane], backgroundColor: `${laneColors[obj.lane]}20` }}
            >
              {obj.lane}
            </span>
            {obj.points > 0 && (
              <span className="text-[10px] text-amber-400">+{obj.points} pts</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

function MapCard({ map }: { map: MapInfo }) {
  return (
    <div className={clsx(
      'bg-[#16213e] border rounded-xl p-5',
      map.isActive ? 'border-purple-600' : 'border-[#0f3460] opacity-60'
    )}>
      <div className="flex items-start justify-between mb-3">
        <div>
          <h2 className="text-lg font-bold text-white" style={{ fontFamily: 'Rajdhani, sans-serif' }}>{map.name}</h2>
          <span className={clsx(
            'text-xs px-2 py-0.5 rounded-full font-medium',
            map.isActive ? 'bg-green-500/20 text-green-400' : 'bg-slate-700 text-slate-500'
          )}>
            {map.isActive ? 'Active' : 'Inactive'}
          </span>
        </div>
      </div>
      <p className="text-sm text-slate-400 mb-4">{map.description}</p>

      <h3 className="text-xs font-semibold text-slate-500 uppercase mb-2">Objective Timeline</h3>
      <ObjectiveTimeline objectives={map.objectives} />

      <div className="mt-4 pt-4 border-t border-[#0f3460]">
        <h3 className="text-xs font-semibold text-slate-500 uppercase mb-2">Strategy</h3>
        <p className="text-sm text-slate-300">{map.laneStrategy}</p>
      </div>

      {map.recommendedRoles.length > 0 && (
        <div className="mt-3">
          <h3 className="text-xs font-semibold text-slate-500 uppercase mb-1">Strong Roles</h3>
          <div className="flex gap-1 flex-wrap">
            {map.recommendedRoles.map(role => (
              <span key={role} className="text-xs px-2 py-0.5 bg-[#1a1a2e] rounded text-slate-300 capitalize">{role}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function MapsView() {
  return (
    <div className="max-w-screen-xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: 'Rajdhani, sans-serif' }}>Maps & Strategy</h1>
      <p className="text-sm text-slate-400 mb-6">
        Current map rotation and objective timelines. Update <code className="text-purple-300">src/constants/maps.ts</code> on patch days.
      </p>

      <div className="space-y-4">
        {MAPS.map(map => <MapCard key={map.mapId} map={map} />)}
      </div>
    </div>
  );
}
