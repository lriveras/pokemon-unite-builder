import { Pokemon } from '../types/pokemon';
import { SynergyFlag } from '../types/evaluation';
import { CC_MOVE_MAP } from '../constants/ccMoveMap';

export function evaluateSynergies(slots: (Pokemon | null)[]): SynergyFlag[] {
  const pokemon = slots.filter((p): p is Pokemon => p !== null);
  const flags: SynergyFlag[] = [];
  if (pokemon.length === 0) return flags;

  // -- Positive flags --

  // CC Chain: 2+ Pokemon with CC, different CC types
  const ccTypes = new Set<string>();
  let ccCount = 0;
  for (const p of pokemon) {
    const allMoves = [...p.slot1.options, ...p.slot2.options];
    for (const m of allMoves) {
      const entry = CC_MOVE_MAP[m.moveId];
      if (entry) {
        ccTypes.add(entry.ccType);
        ccCount++;
        break; // only count each pokemon once
      }
    }
  }
  if (ccCount >= 2 && ccTypes.size >= 2) {
    flags.push({
      id: 'cc_chain',
      label: 'Crowd Control Chain',
      description: `Your team has ${ccCount} Pokémon with different Crowd Control types (${Array.from(ccTypes).join(', ')}), enabling chains that keep enemies locked down for extended periods.`,
      severity: 'positive',
    });
  }

  // Protect-Carry: Attacker + Defender or Supporter
  const hasAttacker = pokemon.some(p => p.role === 'attacker');
  const hasDefenderOrSupporter = pokemon.some(p => p.role === 'defender' || p.role === 'supporter');
  if (hasAttacker && hasDefenderOrSupporter) {
    flags.push({
      id: 'protect_carry',
      label: 'Protect the Carry',
      description: 'Your team has attackers protected by defenders or supporters, a strong competitive archetype.',
      severity: 'positive',
    });
  }

  // Mixed Damage: both physical and special
  const hasPhysical = pokemon.some(p => p.attackStyle === 'physical' || p.attackStyle === 'mixed');
  const hasSpecial = pokemon.some(p => p.attackStyle === 'special' || p.attackStyle === 'mixed');
  if (hasPhysical && hasSpecial) {
    flags.push({
      id: 'mixed_damage',
      label: 'Mixed Damage',
      description: 'Your team deals both physical and special damage, making it harder for enemies to build optimal defenses.',
      severity: 'positive',
    });
  }

  // Only evaluate composition warnings/criticals on teams of 3+
  if (pokemon.length < 3) return flags;

  // -- Critical flags --

  // Missing Defender: no Defender or Supporter in full team
  if (pokemon.length >= 4 && !hasDefenderOrSupporter) {
    flags.push({
      id: 'missing_defender',
      label: 'No Frontline',
      description: 'Your team has no Defender or Supporter. Attackers will be extremely vulnerable in team fights.',
      severity: 'critical',
    });
  }

  // No Crowd Control: avg CC score < 3
  const avgCC = pokemon.reduce((sum, p) => sum + p.dimensionScores.crowdControl, 0) / pokemon.length;
  if (avgCC < 3) {
    flags.push({
      id: 'no_cc',
      label: 'No Crowd Control',
      description: 'Your team lacks meaningful Crowd Control. Enemy Pokémon can act freely in team fights, reducing your ability to land follow-up damage.',
      severity: 'critical',
    });
  }

  // -- Warning flags --

  // Double Carry: 3+ Attackers
  const attackerCount = pokemon.filter(p => p.role === 'attacker').length;
  if (attackerCount >= 3) {
    flags.push({
      id: 'double_carry',
      label: 'Too Many Carries',
      description: `${attackerCount} Attackers means very low durability. Your team may collapse under focused fire.`,
      severity: 'warning',
    });
  }

  // Late Game Deficit: avg early game < 4 in full team
  const avgEarlyGame = pokemon.reduce((sum, p) => sum + p.dimensionScores.earlyGame, 0) / pokemon.length;
  if (avgEarlyGame < 4 && pokemon.length >= 4) {
    flags.push({
      id: 'late_game_deficit',
      label: 'Weak Early Game',
      description: 'Your team is slow to come online. Opponents may snowball the early objectives before you scale.',
      severity: 'warning',
    });
  }

  // No Objective Threat: avg objective threat < 4 in 4+ team
  const avgObjective = pokemon.reduce((sum, p) => sum + p.dimensionScores.objectiveThreat, 0) / pokemon.length;
  if (avgObjective < 4 && pokemon.length >= 4) {
    flags.push({
      id: 'no_objective_threat',
      label: 'Low Objective Threat',
      description: 'Your team struggles to contest or secure objectives like Dreadnaw and Zapdos.',
      severity: 'warning',
    });
  }

  return flags;
}
