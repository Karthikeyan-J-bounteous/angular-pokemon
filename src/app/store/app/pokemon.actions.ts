import { createAction, props } from '@ngrx/store';
import { Pokemon } from './pokemon.model';
import { Pokedex } from 'src/interfaces/pokedex.interface';
export const loadPokemon = createAction('[Pokemon] Load Pokemon');
export const loadPokemonSuccess = createAction('[Pokemon] Load Pokemon Success', props<{ pokemon: Pokemon[] }>());
export const loadPokemonFailure = createAction('[Pokemon] Load Pokemon Failure', props<{ error: string }>());

export const fetchPokemon = createAction('[Pokedex] Fetch Pokemon', props<{ name: string }>());
export const loadPokedex = createAction('[Pokedex] Load Pokemon');
export const loadPokedexSuccess = createAction('[Pokedex] Load Pokedex Success', props<{ pokedex: Pokedex }>());
export const loadPokedexFailure = createAction('[Pokedex] Load Pokedex Failure', props<{ pokedex_error: string }>());