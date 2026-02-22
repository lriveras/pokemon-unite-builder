import { Pokemon, PokemonRole } from '../../types/pokemon';
import { ROLE_CONFIG, ROLE_ORDER } from '../../constants/roles';

interface Props {
  pokemon: (Pokemon | null)[];
}

export function TeamRoleBar({ pokemon }: Props) {
  const filled = pokemon.filter(Boolean) as Pokemon[];
  if (filled.length === 0) return null;

  const roleCounts = ROLE_ORDER.reduce((acc, role) => {
    acc[role] = filled.filter(p => p.role === role).length;
    return acc;
  }, {} as Record<PokemonRole, number>);

  return (
    <div className="flex gap-2 flex-wrap">
      {ROLE_ORDER.map(role => {
        const count = roleCounts[role];
        if (count === 0) return null;
        const config = ROLE_CONFIG[role];
        return (
          <div
            key={role}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium"
            style={{ color: config.color, backgroundColor: config.bgColor }}
          >
            <span>×{count}</span>
            <span>{config.label}</span>
          </div>
        );
      })}
    </div>
  );
}
