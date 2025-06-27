import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface Representante {
  id: number;
  nome: string;
  email: string;
  telefone: string;
}

@Injectable({ providedIn: 'root' })
export class RepresentanteService {
  private apiUrl = 'http://localhost:3000/api/representantes';

  constructor(private http: HttpClient) {}

  getRepresentantes(): Observable<Representante[]> {
    return this.http
      .get<Representante[]>(this.apiUrl)
      .pipe(catchError(this.handleError<Representante[]>('getRepresentantes', [])));
  }

  getRepresentante(id: number): Observable<Representante> {
    const url = `${this.apiUrl}/${id}`;
    return this.http
      .get<Representante>(url)
      .pipe(catchError(this.handleError<Representante>('getRepresentante')));
  }

  addRepresentante(rep: Omit<Representante, 'id'>): Observable<Representante> {
    return this.http
      .post<Representante>(this.apiUrl, rep)
      .pipe(catchError(this.handleError<Representante>('addRepresentante')));
  }

  updateRepresentante(rep: Representante): Observable<Representante> {
    const url = `${this.apiUrl}/${rep.id}`;
    return this.http
      .put<Representante>(url, rep)
      .pipe(catchError(this.handleError<Representante>('updateRepresentante')));
  }

  removeRepresentante(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http
      .delete(url)
      .pipe(catchError(this.handleError('removeRepresentante')));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} falhou: ${error.message}`);
      return of(result as T);
    };
  }
}