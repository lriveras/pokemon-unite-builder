import { describe, it, expect, beforeEach } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouter } from './helpers';
import { TeamBuilderView } from '../components/teamBuilder/TeamBuilderView';
import { useTeamStore } from '../store/useTeamStore';

// Reset Zustand store state before each test
beforeEach(() => {
  useTeamStore.setState({
    slots: [
      { slotIndex: 0, pokemon: null, config: { slot1Choice: null, slot2Choice: null, heldItems: [null,null,null], battleItem: null, itemGrades: [1,1,1], pokemonLevel: 15 } },
      { slotIndex: 1, pokemon: null, config: { slot1Choice: null, slot2Choice: null, heldItems: [null,null,null], battleItem: null, itemGrades: [1,1,1], pokemonLevel: 15 } },
      { slotIndex: 2, pokemon: null, config: { slot1Choice: null, slot2Choice: null, heldItems: [null,null,null], battleItem: null, itemGrades: [1,1,1], pokemonLevel: 15 } },
      { slotIndex: 3, pokemon: null, config: { slot1Choice: null, slot2Choice: null, heldItems: [null,null,null], battleItem: null, itemGrades: [1,1,1], pokemonLevel: 15 } },
      { slotIndex: 4, pokemon: null, config: { slot1Choice: null, slot2Choice: null, heldItems: [null,null,null], battleItem: null, itemGrades: [1,1,1], pokemonLevel: 15 } },
    ],
    activeSlotIndex: 0,
  });
});

describe('Builder Page', () => {
  it('renders without crashing', () => {
    renderWithRouter(<TeamBuilderView />);
    expect(screen.getByText('Team Builder')).toBeInTheDocument();
  });

  it('shows 5 Pokémon selected count', () => {
    renderWithRouter(<TeamBuilderView />);
    expect(screen.getByText('0/5 Pokémon selected')).toBeInTheDocument();
  });

  it('renders 5 slot tabs and 5 slot cards (10 "Slot N" occurrences total)', () => {
    renderWithRouter(<TeamBuilderView />);
    // "Slot N" appears once in the tab bar and once in each empty slot card
    const slotLabels = screen.getAllByText(/Slot \d/);
    expect(slotLabels.length).toBe(10);
  });

  it('Clear All button is present', () => {
    renderWithRouter(<TeamBuilderView />);
    expect(screen.getByRole('button', { name: /Clear All/i })).toBeInTheDocument();
  });

  it('Save Comp button is disabled when no Pokémon selected', () => {
    renderWithRouter(<TeamBuilderView />);
    const saveButton = screen.getByRole('button', { name: /Save Comp/i });
    expect(saveButton).toBeDisabled();
  });

  it('View Report link is present', () => {
    renderWithRouter(<TeamBuilderView />);
    expect(screen.getByRole('link', { name: /View Report/i })).toBeInTheDocument();
  });

  it('slot config panel shows placeholder when no Pokémon selected', () => {
    renderWithRouter(<TeamBuilderView />);
    expect(screen.getByText(/Select a Pokémon for this slot to configure it/i)).toBeInTheDocument();
  });

  it('switching slots updates the active tab', async () => {
    const user = userEvent.setup();
    renderWithRouter(<TeamBuilderView />);
    const slot2Tab = screen.getByRole('button', { name: 'Slot 2' });
    await user.click(slot2Tab);
    // Slot 2 is now active (slotIndex 1, label "Slot 2")
    expect(slot2Tab).toHaveClass('text-white');
  });
});
