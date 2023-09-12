import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadPokemon } from 'src/app/store/app/pokemon.actions';
import { selectPokemon } from 'src/app/store/app/pokemon.selectors';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent {
  pokemonData: any[] = [];

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(loadPokemon());
    this.store.select(selectPokemon).subscribe((data) => {
      if (data) {
        this.pokemonData = data;
        console.log(this.pokemonData);
      }
      else{
        console.log("waiting..!")
      }
    });
  }
}






