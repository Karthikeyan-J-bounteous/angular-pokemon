import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  searchString: string;
  typeSelected: string;
  constructor() {
   }
}
