import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private all_poke_url: string = "https://pokeapi.co/api/v2/pokemon?limit=1281";
  private url: string = "https://pokeapi.co/api/v2/pokemon/"
  constructor(private http: HttpClient) { }

  fetchPokemon(): Observable<any> {
    return this.http.get(this.all_poke_url);
  }

  fetchPokemonByName(name: string): Observable<any> {
    return this.http.get(this.url+name);
  }
}
