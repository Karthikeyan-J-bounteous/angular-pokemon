import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PokemonState } from './pokemon.reducer';

const selectPokemonState = createFeatureSelector<PokemonState>('pokemon');

export const selectPokemon = createSelector(
  selectPokemonState,
  (state) => state.pokemon
);

export const selectError = createSelector(
  selectPokemonState,
  (state) => state.error
);
