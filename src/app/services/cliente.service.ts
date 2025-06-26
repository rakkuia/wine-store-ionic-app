import { Injectable } from '@angular/core';

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
  private clientes: Cliente[] = [
    {
      id: 1,
      nome: 'Empório do Vinho',
      documento: '12.345.678/0001-99',
      endereco: 'Rua das Vinhas, 100',
      cidade: 'Bento Gonçalves',
      estado: 'RS',
      responsavel: 'Carlos Silva',
      contato: '(54) 99999-9999'
    }
  ];

  getClientes(): Cliente[] {
    return this.clientes;
  }

  addCliente(cliente: Cliente) {
    cliente.id = Date.now();
    this.clientes.push(cliente);
  }

  updateCliente(cliente: Cliente) {
    const index = this.clientes.findIndex(c => c.id === cliente.id);
    if (index > -1) this.clientes[index] = cliente;
  }

  removeCliente(id: number) {
    this.clientes = this.clientes.filter(c => c.id !== id);
  }
}
