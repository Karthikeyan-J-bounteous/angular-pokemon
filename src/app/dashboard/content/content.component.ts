import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, combineLatest, map } from 'rxjs';
import { fetchPokemon, loadPokedex, loadPokemon } from 'src/app/store/app/pokemon.actions';
import { Pokemon } from 'src/app/store/app/pokemon.model';
import { selectPokedex, selectPokemon } from 'src/app/store/app/pokemon.selectors';
import { Pokedex } from 'src/interfaces/pokedex.interface';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent {
  pokedexData$: Observable<any[]>;
  pokemonData$: Observable<any[]>;

  constructor(private store: Store) {
    this.pokedexData$ = this.store.select(selectPokedex);
   this.pokemonData$ = this.store.select(selectPokemon);
  }

  ngOnInit(): void {
    this.store.dispatch(fetchPokemon({ name: 'ditto' }));
    this.store.dispatch(fetchPokemon({ name: 'pikachu' }));
    this.try()
  }

  try(){
    this.pokedexData$.subscribe((pokemonList) => {
      console.log('Updated Pokémon List:', pokemonList);
    });
    this.pokemonData$.subscribe((pokemonList) => {
      console.log('Updated ALL List:', pokemonList);
    });
  }
}






