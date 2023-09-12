import { createReducer, on } from '@ngrx/store';
import { Pokemon } from './pokemon.model';
import * as PokemonActions from './pokemon.actions';

export interface PokemonState {
  pokemon: Pokemon[];
  error: string | null;
}

const initialState: PokemonState = {
  pokemon: [],
  error: null,
};

export const pokemonReducer = createReducer(
  initialState,
  on(PokemonActions.loadPokemonSuccess, (state, { pokemon }) => ({
    ...state,
    pokemon,
    error: null,
  })),
  on(PokemonActions.loadPokemonFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);
