import { PokemonRole } from '../../types/pokemon';
import { ROLE_CONFIG } from '../../constants/roles';
import { clsx } from 'clsx';

interface Props {
  role: PokemonRole;
  size?: 'sm' | 'md' | 'lg';
}

export function RoleBadge({ role, size = 'md' }: Props) {
  const config = ROLE_CONFIG[role];
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded font-semibold',
        size === 'sm' && 'px-1.5 py-0.5 text-xs',
        size === 'md' && 'px-2 py-0.5 text-xs',
        size === 'lg' && 'px-3 py-1 text-sm',
      )}
      style={{ color: config.color, backgroundColor: config.bgColor }}
    >
      {config.label}
    </span>
  );
}
