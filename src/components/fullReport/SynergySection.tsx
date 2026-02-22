import { SynergyFlag, SynergySeverity } from '../../types/evaluation';
import { clsx } from 'clsx';

const SEVERITY_COLORS: Record<SynergySeverity, { bg: string; border: string; title: string; icon: string }> = {
  positive: { bg: 'bg-green-500/5', border: 'border-green-500/20', title: 'text-green-400', icon: '✓' },
  warning: { bg: 'bg-amber-500/5', border: 'border-amber-500/20', title: 'text-amber-400', icon: '⚠' },
  critical: { bg: 'bg-red-500/5', border: 'border-red-500/20', title: 'text-red-400', icon: '✗' },
};

interface Props {
  flags: SynergyFlag[];
}

export function SynergySection({ flags }: Props) {
  if (flags.length === 0) {
    return (
      <div className="text-center py-8 text-slate-500">
        <p>Add at least 2 Pokémon to see synergy analysis</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {flags.map(flag => {
        const styles = SEVERITY_COLORS[flag.severity];
        return (
          <div key={flag.id} className={clsx('p-4 rounded-xl border', styles.bg, styles.border)}>
            <div className={clsx('font-semibold text-sm mb-1', styles.title)}>
              {styles.icon} {flag.label}
            </div>
            <p className="text-sm text-slate-300">{flag.description}</p>
          </div>
        );
      })}
    </div>
  );
}
