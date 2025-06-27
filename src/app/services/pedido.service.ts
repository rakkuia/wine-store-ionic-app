import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface PedidoItem {
  vinhoId: number;
  nomeVinho: string;
  preco: number;
  quantidade: number;
}

export interface Pedido {
  id: number;
  cliente_id: number;
  clienteNome: string;
  data: string;
  itens: PedidoItem[];
  total: number;
  representante_id: number;
  comissao: number;
  condicaoPagamento: string;
  valorComissao: number;
}

@Injectable({ providedIn: 'root' })
export class PedidoService {
  private apiUrl = 'http://localhost:3000/api/pedidos';

  constructor(private http: HttpClient) {}

  addPedido(pedido: Pedido): Observable<Pedido> {
    return this.http
      .post<Pedido>(this.apiUrl, pedido)
      .pipe(catchError(this.handleError<Pedido>('addPedido')));
  }

  getPedido(id: number): Observable<Pedido> {
    const url = `${this.apiUrl}/${id}`;
    return this.http
      .get<Pedido>(url)
      .pipe(catchError(this.handleError<Pedido>('getPedido')));
  }

  getPedidos(): Observable<Pedido[]> {
    return this.http
      .get<Pedido[]>(this.apiUrl)
      .pipe(catchError(this.handleError<Pedido[]>('getPedidos', [])));
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} falhou: ${error.message}`);
      return of(result as T);
    };
  }

  atualizarPedido(pedido: Pedido): Observable<Pedido> {
  const url = `${this.apiUrl}/${pedido.id}`;
  return this.http
    .put<Pedido>(url, pedido)
    .pipe(catchError(this.handleError<Pedido>('atualizarPedido')));
}
}
