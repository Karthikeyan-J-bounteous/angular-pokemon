import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, combineLatest, map } from 'rxjs';
import { fetchPokemon, loadPokedex, loadPokemon } from 'src/app/store/app/pokemon.actions';
import { Pokemon } from 'src/app/store/app/pokemon.model';
import { selectPokedex, selectPokemon, selectPokemonbyName } from 'src/app/store/app/pokemon.selectors';
import { Pokedex } from 'src/interfaces/pokedex.interface';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent {
  pokemonObservable$: Observable<Pokemon[]>;
  pokemonList: Pokemon[];
  pokemonRange: Pokemon[];
  max_load: number = 0;
  range: [number,number] = [0,20];

  rightDisable: boolean = false;
  leftDisable: boolean = true;

  // pokedexData$: Observable<any[]>;
  // findPokemon$: Observable<Pokedex>;

  constructor(private store: Store) {
   this.pokemonObservable$ = this.store.select(selectPokemon);
  //  this.pokedexData$ = this.store.select(selectPokedex);
  //  this.findPokemon$ = this.store.select(selectPokemonbyName("pikachu"));
  }

  ngOnInit(): void {
    this.pokemonObservable$.subscribe((pokemonList: Pokemon[]) => {
      this.pokemonList = pokemonList;
      this. getItemsFromIndex();
    });
    // this.store.dispatch(fetchPokemon({ name: 'pikachu' }));
    // this.store.dispatch(fetchPokemon({ name: 'mesprit' }));
   // this.try()
  }

  try(){
    // this.pokedexData$.subscribe((pokemonList) => {
    //   console.log('Updated Pokémon List:', pokemonList);
    // });
      //console.log('Pokemon List:', this.pokemonRange);
    // this.findPokemon$.subscribe((pokemon) => {
    //   console.log('Ditto Data:', pokemon);
    // });
  }

  getItemsFromIndex() {
    this.pokemonRange = this.pokemonList.slice(this.range[0], this.range[0] + this.range[1]);

    if(this.max_load < this.range[0] + 20){
      for(let poke of this.pokemonRange){
        this.store.dispatch(fetchPokemon({ name: poke.name }));
      }
      this.max_load = this.max_load < this.range[0]? this.range[0] : this.max_load;
    }
  }

  selectNext() {
    if (this.range[0] + this.range[1] < this.pokemonList.length) {
      this.range[0] += this.range[1];
      this.getItemsFromIndex();
      this.leftDisable = false;
    }
    else{
      this.rightDisable = true;
    }
  }

  selectPrevious() {
    if (this.range[0] - this.range[1] > 0) {
      this.range[0] -= this.range[1];
      this.getItemsFromIndex();
      this.rightDisable = false;
    }
    else if(this.range[0] - this.range[1] == 0){
      this.range[0] -= this.range[1];
      this.getItemsFromIndex();
      this.leftDisable = true;
    }
    else{
      this.leftDisable = true;
    }
  }
}






