import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

export interface Vinho {
  id: number;
  nome: string;
  tipo: string;
  safra: string;
  preco: number;
}

@Injectable({ providedIn: 'root' })
export class VinhoService {
  private apiUrl = 'http://localhost:3000/api/vinhos';

  constructor(private http: HttpClient) {}
  getVinhos(): Observable<Vinho[]> {
    return this.http
      .get<Vinho[]>(this.apiUrl)
      .pipe(catchError(this.handleError<Vinho[]>('getVinhos', [])));
  }

  addVinho(vinho: Omit<Vinho, 'id'>): Observable<Vinho> {
    return this.http
      .post<Vinho>(this.apiUrl, vinho)
      .pipe(catchError(this.handleError<Vinho>('addVinho')));
  }

  atualizarVinho(vinho: Vinho): Observable<Vinho> {
    const url = `${this.apiUrl}/${vinho.id}`;
    return this.http
      .put<Vinho>(url, vinho)
      .pipe(catchError(this.handleError<Vinho>('atualizarVinho')));
  }

  removerVinho(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http
      .delete(url)
      .pipe(catchError(this.handleError('removerVinho')));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} falhou: ${error.message}`);
      return of(result as T);
    };
  }
}
