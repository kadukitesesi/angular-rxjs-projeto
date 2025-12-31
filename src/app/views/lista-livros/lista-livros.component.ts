import { LivrosResultado } from './../../models/interfaces';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { tap, switchMap, map, filter, debounceTime, catchError, throwError, of } from 'rxjs';
import { Item } from 'src/app/models/interfaces';
import { LivroVolumeInfo } from 'src/app/models/livroVolumeInfo';
import { LivroService } from 'src/app/service/livro.service';

const PAUSA = 1000;

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css']
})
export class ListaLivrosComponent {

  campoBusca = new FormControl();
  mensagemErro = '';
  LivrosResultado: LivrosResultado;

  constructor(private service: LivroService) { }

  totalDeLivros$ =  this.campoBusca.valueChanges.pipe(
      debounceTime(PAUSA),
      filter((valorDigitado) => valorDigitado.length >=3),
      tap(() => console.log('fluxo inicial')),
      switchMap((valorDigitado) => this.service.buscarLivros(valorDigitado)),
      map(resultado => this.LivrosResultado = resultado),
      catchError(erro => {
        console.log(erro)
        return of()
      })
    )

  livrosEncontrados$ = this.campoBusca.valueChanges
    .pipe(
      debounceTime(PAUSA),
      filter((valorDigitado) => valorDigitado.length >=3),
      tap(() => console.log('fluxo inicial')),
      switchMap((valorDigitado) => this.service.buscarLivros(valorDigitado)),
      tap(() => console.log('Requisição ao servidor')),
      map(resultado => resultado.items ?? []),
      map(items => this.
        livrosResultadoParaLivros(items)),
        catchError(erro => {
          console.log(erro)
          return throwError(() => new Error(this.mensagemErro =
            'Ops, ocorreu um erro na aplicação'))
        })
    )

  livrosResultadoParaLivros(items: Item[]): LivroVolumeInfo[] {
    return items.map(item => {
      return new LivroVolumeInfo(item);
    })
  }

}



