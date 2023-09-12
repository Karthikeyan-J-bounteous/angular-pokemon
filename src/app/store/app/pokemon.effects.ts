import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { PokemonService } from '../../services/pokeapi.service'; // Import the service
import * as PokemonActions from './pokemon.actions';

@Injectable()
export class PokemonEffects {
  constructor(
    private actions$: Actions,
    private pokemonService: PokemonService
  ) {}

  loadPokemon$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PokemonActions.loadPokemon),
      mergeMap(() =>
        this.pokemonService.fetchPokemon().pipe(
          map((pokemonData) =>
            PokemonActions.loadPokemonSuccess({ pokemon: pokemonData.results })
          ),
          catchError((error) =>
            of(PokemonActions.loadPokemonFailure({ error: error.message }))
          )
        )
      )
    )
  );
}
