import { SynergyFlag, SynergySeverity } from '../../types/evaluation';
import { clsx } from 'clsx';

const SEVERITY_STYLES: Record<SynergySeverity, string> = {
  positive: 'bg-green-500/20 text-green-400 border-green-500/30',
  warning: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  critical: 'bg-red-500/20 text-red-400 border-red-500/30',
};

const SEVERITY_ICONS: Record<SynergySeverity, string> = {
  positive: '✓',
  warning: '⚠',
  critical: '✗',
};

interface Props {
  flags: SynergyFlag[];
}

export function SynergyBadges({ flags }: Props) {
  if (flags.length === 0) {
    return <p className="text-xs text-slate-500">Add more Pokémon to see synergy analysis</p>;
  }

  return (
    <div className="flex flex-wrap gap-2">
      {flags.map(flag => (
        <div
          key={flag.id}
          className={clsx(
            'flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-medium cursor-default',
            SEVERITY_STYLES[flag.severity]
          )}
          title={flag.description}
        >
          <span>{SEVERITY_ICONS[flag.severity]}</span>
          <span>{flag.label}</span>
        </div>
      ))}
    </div>
  );
}
