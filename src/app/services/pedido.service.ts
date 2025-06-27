import { Injectable } from '@angular/core';

export interface PedidoItem {
  vinhoId: number;
  nomeVinho: string;
  preco: number;
  quantidade: number;
}

export interface Pedido {
  id: number;
  clienteId: number;
  clienteNome: string;
  data: string;
  itens: PedidoItem[];
  total: number;
  representanteId: number;
  comissao: number;
  condicaoPagamento: string;
}

@Injectable({ providedIn: 'root' })
export class PedidoService {
  private pedidos: Pedido[] = [];

  getPedidos(): Pedido[] {
    return this.pedidos;
  }

  addPedido(pedido: Pedido) {
    pedido.id = Date.now();
    pedido.data = new Date().toISOString().split('T')[0];
    this.pedidos.push(pedido);
  }

  deletePedido(id: number) {
    this.pedidos = this.pedidos.filter((p) => p.id !== id);
  }

  updatePedido(pedidoAtualizado: Pedido) {
    const index = this.pedidos.findIndex((p) => p.id === pedidoAtualizado.id);
    if (index > -1) {
      this.pedidos[index] = pedidoAtualizado;
    }
  }
}
