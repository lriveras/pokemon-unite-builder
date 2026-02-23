import { describe, it, expect, beforeEach } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithRouter, makePokemon } from './helpers';
import { CompareView } from '../components/compare/CompareView';
import { useSavedCompsStore } from '../store/useSavedCompsStore';

const emptySlots = Array.from({ length: 5 }, (_, i) => ({
  slotIndex: i as 0 | 1 | 2 | 3 | 4,
  pokemon: null,
  config: { slot1Choice: null, slot2Choice: null, heldItems: [null, null, null] as [null, null, null], battleItem: null, itemGrades: [1, 1, 1] as [number, number, number], pokemonLevel: 15 },
}));

beforeEach(() => {
  useSavedCompsStore.setState({ compositions: [] });
});

describe('Compare Page', () => {
  it('renders without crashing', () => {
    renderWithRouter(<CompareView />);
    expect(screen.getByText('Compare Compositions')).toBeInTheDocument();
  });

  it('shows "need at least 2 saved compositions" message when fewer than 2 exist', () => {
    renderWithRouter(<CompareView />);
    expect(screen.getByText(/You need at least 2 saved compositions to compare/i)).toBeInTheDocument();
  });

  it('shows save prompt hint', () => {
    renderWithRouter(<CompareView />);
    expect(screen.getByText(/Save compositions from the Team Builder/i)).toBeInTheDocument();
  });

  it('renders composition selectors when 2+ comps exist', () => {
    useSavedCompsStore.setState({
      compositions: [
        { id: 'a', name: 'Comp Alpha', slots: emptySlots, compositeScore: 55, savedAt: '' },
        { id: 'b', name: 'Comp Beta', slots: emptySlots, compositeScore: 62, savedAt: '' },
      ],
    });
    renderWithRouter(<CompareView />);
    expect(screen.getByText('Composition A')).toBeInTheDocument();
    expect(screen.getByText('Composition B')).toBeInTheDocument();
  });

  it('shows composition names in selectors when 2+ comps exist', () => {
    useSavedCompsStore.setState({
      compositions: [
        { id: 'a', name: 'Comp Alpha', slots: emptySlots, compositeScore: 55, savedAt: '' },
        { id: 'b', name: 'Comp Beta', slots: emptySlots, compositeScore: 62, savedAt: '' },
      ],
    });
    renderWithRouter(<CompareView />);
    expect(screen.getAllByText('Comp Alpha').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Comp Beta').length).toBeGreaterThan(0);
  });

  it('shows Radar Comparison section when 2 comps are selected', () => {
    const pika = makePokemon();
    const slotsA = emptySlots.map((s, i) => i === 0 ? { ...s, pokemon: pika } : s);
    useSavedCompsStore.setState({
      compositions: [
        { id: 'a', name: 'Alpha', slots: slotsA, compositeScore: 55, savedAt: '' },
        { id: 'b', name: 'Beta', slots: slotsA, compositeScore: 62, savedAt: '' },
      ],
    });
    renderWithRouter(<CompareView />);
    expect(screen.getByText('Radar Comparison')).toBeInTheDocument();
    expect(screen.getByText('Dimension Comparison')).toBeInTheDocument();
  });
});
