import { useMemo } from 'react';
import { useTeamStore } from '../store/useTeamStore';
import { evaluateTeam } from '../engine/teamEvaluator';
import { TeamEvaluation } from '../types/evaluation';

export function useTeamAnalysis(): TeamEvaluation {
  const slots = useTeamStore(state => state.slots);
  const pokemon = slots.map(s => s.pokemon);

  return useMemo(() => evaluateTeam(pokemon), [
    // Deep dependency on pokemon IDs to avoid unnecessary recalcs
    pokemon.map(p => p?.pokemonId ?? 'empty').join(','),
  ]);
}
