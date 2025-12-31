import { LivrosResultado, Item } from './../models/interfaces';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LivroService {

  private readonly API = 'https://www.googleapis.com/books/v1/volumes';
  constructor(private http: HttpClient) { }

  buscarLivros(nome: string):Observable<LivrosResultado> {
      const params = new HttpParams().append('q',nome);
      return this.http.get<LivrosResultado>(this.API, { params })
        //.pipe(
        //  tap(retorno => console.log("TAP TAP",retorno)),
        //  map(resultado => resultado.items ?? []),
        //  tap(resultado => console.log('Fluxo após o map', resultado))
        //)
  }
}
