import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface Cliente {
  id: number;
  nome: string;
  documento: string;
  endereco: string;
  cidade: string;
  estado: string;
  responsavel: string;
  contato: string;
}

@Injectable({ providedIn: 'root' })
export class ClienteService {
  private apiUrl = 'http://localhost:3000/api/clientes';

  constructor(private http: HttpClient) {}

  getClientes(): Observable<Cliente[]> {
    return this.http
      .get<Cliente[]>(this.apiUrl)
      .pipe(catchError(this.handleError<Cliente[]>('getClientes', [])));
  }

  getCliente(id: number): Observable<Cliente> {
    const url = `${this.apiUrl}/${id}`;
    return this.http
      .get<Cliente>(url)
      .pipe(catchError(this.handleError<Cliente>('getCliente')));
  }

  addCliente(cliente: Omit<Cliente, 'id'>): Observable<Cliente> {
    return this.http
      .post<Cliente>(this.apiUrl, cliente)
      .pipe(catchError(this.handleError<Cliente>('addCliente')));
  }

  updateCliente(cliente: Cliente): Observable<Cliente> {
    const url = `${this.apiUrl}/${cliente.id}`;
    return this.http
      .put<Cliente>(url, cliente)
      .pipe(catchError(this.handleError<Cliente>('updateCliente')));
  }

  removeCliente(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http
      .delete(url)
      .pipe(catchError(this.handleError('removeCliente')));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} falhou: ${error.message}`);
      return of(result as T);
    };
  }
}