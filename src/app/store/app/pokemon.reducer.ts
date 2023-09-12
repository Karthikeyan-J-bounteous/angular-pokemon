import { createReducer, on } from '@ngrx/store';
import { Pokemon } from './pokemon.model';
import * as PokemonActions from './pokemon.actions';
import { Pokedex } from 'src/interfaces/pokedex.interface';

export interface PokemonState {
  pokemon: Pokemon[];
  pokedexData: Pokedex[];
  pokedex_error: string | null;
  error: string | null;
}

const initialState: PokemonState = {
  pokemon: [],
  pokedexData: [],
  error: null,
  pokedex_error: null
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
  })),

  on(PokemonActions.loadPokedexSuccess, (state, { pokedex }) => {
    return {
    ...state,
    pokedexData: [...state.pokedexData, pokedex],
    pokedex_error: null,
  }}),
  on(PokemonActions.loadPokedexFailure, (state, { pokedex_error }) => ({
    ...state,
    pokedex_error,
  })),
);