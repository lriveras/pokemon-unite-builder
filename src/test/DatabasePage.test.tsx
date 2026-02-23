import { describe, it, expect, beforeEach } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouter, makePokemon } from './helpers';
import { DatabaseView } from '../components/database/DatabaseView';
import { useGameDataStore } from '../store/useGameDataStore';

beforeEach(() => {
  useGameDataStore.setState({ pokemon: [], heldItems: [], battleItems: [], isLoading: false, error: null });
});

describe('Database Page', () => {
  it('renders without crashing', () => {
    renderWithRouter(<DatabaseView />);
    expect(screen.getByText('Pokémon Database')).toBeInTheDocument();
  });

  it('shows search input', () => {
    renderWithRouter(<DatabaseView />);
    expect(screen.getByPlaceholderText(/Search/i)).toBeInTheDocument();
  });

  it('shows role filter dropdown', () => {
    renderWithRouter(<DatabaseView />);
    expect(screen.getByDisplayValue('All Roles')).toBeInTheDocument();
  });

  it('shows tier filter dropdown', () => {
    renderWithRouter(<DatabaseView />);
    expect(screen.getByDisplayValue('All Tiers')).toBeInTheDocument();
  });

  it('shows "Loading data..." when no Pokémon are loaded', () => {
    renderWithRouter(<DatabaseView />);
    expect(screen.getByText(/Loading data/i)).toBeInTheDocument();
  });

  it('shows Pokémon count when data is loaded', () => {
    useGameDataStore.setState({ pokemon: [makePokemon(), makePokemon({ pokemonId: 'snorlax', name: 'Snorlax', dex: 143 })] });
    renderWithRouter(<DatabaseView />);
    expect(screen.getByText('2 Pokémon')).toBeInTheDocument();
  });

  it('renders table headers for key columns', () => {
    renderWithRouter(<DatabaseView />);
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Role')).toBeInTheDocument();
    expect(screen.getByText('Tier')).toBeInTheDocument();
    expect(screen.getByText('Damage')).toBeInTheDocument();
  });

  it('renders Pokémon rows when data is loaded', () => {
    useGameDataStore.setState({ pokemon: [makePokemon()] });
    renderWithRouter(<DatabaseView />);
    expect(screen.getByText('Pikachu')).toBeInTheDocument();
  });

  it('filters Pokémon by search query', async () => {
    const user = userEvent.setup();
    useGameDataStore.setState({
      pokemon: [
        makePokemon(),
        makePokemon({ pokemonId: 'snorlax', name: 'Snorlax', dex: 143 }),
      ],
    });
    renderWithRouter(<DatabaseView />);
    await user.type(screen.getByPlaceholderText(/Search/i), 'Snorlax');
    expect(screen.getByText('Snorlax')).toBeInTheDocument();
    expect(screen.queryByText('Pikachu')).not.toBeInTheDocument();
    expect(screen.getByText('1 Pokémon')).toBeInTheDocument();
  });

  it('shows "No Pokémon match your filters" when search has no results', async () => {
    const user = userEvent.setup();
    useGameDataStore.setState({ pokemon: [makePokemon()] });
    renderWithRouter(<DatabaseView />);
    await user.type(screen.getByPlaceholderText(/Search/i), 'zzz');
    expect(screen.getByText(/No Pokémon match your filters/i)).toBeInTheDocument();
  });
});
