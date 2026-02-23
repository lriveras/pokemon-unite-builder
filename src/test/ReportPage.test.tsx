import { describe, it, expect, beforeEach } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithRouter, makePokemon } from './helpers';
import { FullReportView } from '../components/fullReport/FullReportView';
import { useTeamStore } from '../store/useTeamStore';

const defaultConfig = {
  slot1Choice: null, slot2Choice: null,
  heldItems: [null, null, null] as [null, null, null],
  battleItem: null,
  itemGrades: [1, 1, 1] as [number, number, number],
  pokemonLevel: 15,
};

function makeEmptySlots() {
  return Array.from({ length: 5 }, (_, i) => ({
    slotIndex: i as 0 | 1 | 2 | 3 | 4,
    pokemon: null,
    config: { ...defaultConfig },
  })) as ReturnType<typeof useTeamStore.getState>['slots'];
}

beforeEach(() => {
  useTeamStore.setState({ slots: makeEmptySlots(), activeSlotIndex: 0 });
});

describe('Report Page', () => {
  it('renders without crashing', () => {
    renderWithRouter(<FullReportView />);
    expect(screen.getByText('Full Team Report')).toBeInTheDocument();
  });

  it('shows empty state when no Pokémon in team', () => {
    renderWithRouter(<FullReportView />);
    expect(screen.getByText(/No Pokémon in your team/i)).toBeInTheDocument();
  });

  it('shows link to Team Builder from empty state', () => {
    renderWithRouter(<FullReportView />);
    expect(screen.getByRole('link', { name: /Go to Team Builder/i })).toBeInTheDocument();
  });

  it('shows "← Back to Builder" link', () => {
    renderWithRouter(<FullReportView />);
    expect(screen.getByRole('link', { name: /Back to Builder/i })).toBeInTheDocument();
  });

  it('renders team report sections when Pokémon are in the team', () => {
    const slots = makeEmptySlots();
    slots[0] = { slotIndex: 0, pokemon: makePokemon(), config: { ...defaultConfig } };
    slots[1] = { slotIndex: 1, pokemon: makePokemon({ pokemonId: 'snorlax', name: 'Snorlax', dex: 143, role: 'defender' }), config: { ...defaultConfig } };
    useTeamStore.setState({ slots, activeSlotIndex: 0 });

    renderWithRouter(<FullReportView />);
    expect(screen.getByText('Team Members')).toBeInTheDocument();
    expect(screen.getByText('Score Breakdown')).toBeInTheDocument();
    expect(screen.getByText('Dimension Analysis')).toBeInTheDocument();
    expect(screen.getByText('Strengths & Weaknesses')).toBeInTheDocument();
    expect(screen.getByText('Power Curve')).toBeInTheDocument();
    expect(screen.getByText('Synergy Analysis')).toBeInTheDocument();
    expect(screen.getByText('Coaching Tips')).toBeInTheDocument();
  });

  it('lists Pokémon names in team members section', () => {
    const slots = makeEmptySlots();
    slots[0] = { slotIndex: 0, pokemon: makePokemon(), config: { ...defaultConfig } };
    useTeamStore.setState({ slots, activeSlotIndex: 0 });

    renderWithRouter(<FullReportView />);
    // Pikachu name appears in team members and deep dive sections
    expect(screen.getAllByText('Pikachu').length).toBeGreaterThan(0);
  });

  it('renders Team Composition Guide glossary section', () => {
    const slots = makeEmptySlots();
    slots[0] = { slotIndex: 0, pokemon: makePokemon(), config: { ...defaultConfig } };
    useTeamStore.setState({ slots, activeSlotIndex: 0 });

    renderWithRouter(<FullReportView />);
    expect(screen.getByText('Team Composition Guide')).toBeInTheDocument();
  });
});
