import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadPokemon } from 'src/app/store/app/pokemon.actions';
import { Pokemon } from 'src/app/store/app/pokemon.model';
import { selectPokemon } from 'src/app/store/app/pokemon.selectors';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  collapsed: boolean = true;
  selectedType: string = "Type";
  typeNames = [
    "clear",
    "normal",
    "fighting",
    "flying",
    "poison",
    "ground",
    "rock",
    "bug",
    "ghost",
    "steel",
    "fire",
    "water",
    "grass",
    "electric",
    "psychic",
    "ice",
    "dragon",
    "dark",
    "fairy",
    "unknown",
    "shadow"
  ];
  pokemonData: Pokemon[] = [];
  pokemonName: string[] = [];
  suggestion: string[] = [];
  searchQuery = '';
  private searchSubject = new Subject<string>();

  constructor(private store: Store) {}

  ngOnInit(): void {

    this.searchSubject
    .pipe(
      debounceTime(500), // Adjust the debounce time as needed (milliseconds)
      distinctUntilChanged()
    )
    .subscribe(query => {
      this.suggestion = this.getSuggestions(query);
      console.log(this.suggestion)
    });

    this.store.dispatch(loadPokemon());

    this.store.select(selectPokemon).subscribe((data) => {
      if (data) {
        this.pokemonData = data;
        this.pokemonName = [];
        this.pokemonData.forEach((pokemon) => {
          this.pokemonName.push(pokemon.name);
        })
      }
      else{
        console.log("Error..!")
      }
    });
  }

  onSearchInput(event: any) {
    const query = event.target.value;
    if(query){
      this.searchSubject.next(query);
    }
    else{
      this.suggestion = [];
    }
  }

  getSuggestions(query: string): string[] {
    return this.pokemonName.filter(suggestion =>
      suggestion.toLowerCase().includes(query.toLowerCase())
    );
  }

  loadClass(type: string){
    return "navbar__filters__button__"+type;
  }

  typeClick(type: string){
    
    this.selectedType = type == "clear"? "Type" : type;
  }

}
