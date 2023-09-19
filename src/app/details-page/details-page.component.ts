import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Pokedex } from 'src/interfaces/pokedex.interface';
import { selectPokemonbyName } from '../store/app/pokemon.selectors';
import { fetchPokemon } from '../store/app/pokemon.actions';

@Component({
  selector: 'app-details-page',
  templateUrl: './details-page.component.html',
  styleUrls: ['./details-page.component.scss']
})
export class DetailsPageComponent {
  findPokemon$: Observable<Pokedex>;
  pokemon: Pokedex = null;

  constructor(private store: Store, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.findPokemon$ = this.store.select(selectPokemonbyName(params.name));
      this.findPokemon$.subscribe((data) => {
        if (data) {
          this.pokemon = data;
        }
        else{
          this.store.dispatch(fetchPokemon({ name: params.name }));
          this.router.navigate(['/content'], { queryParams: { name: params.name }, queryParamsHandling: 'merge' });
        }
      });
    });
  }

  loadClass(type: string){
    return ("details__container__button__" + type)
  }

  loadexp(point: number, base?:boolean){
    if(base){
      return "width:"+(point*100/700)+"%";
    }
    return "width:"+(point*100/300)+"%";
  }
}
