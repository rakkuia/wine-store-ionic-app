import { Injectable } from '@angular/core';
import { ClienteService } from './cliente.service';


export interface Rota {
  origem: string;
  destino: string;
}


@Injectable({
  providedIn: 'root'
})
export class RotasService { origem = '';
  destinoSelecionado = '';
  rotas: Rota[] = [];

  clientes: any[] = [];

  constructor(private clienteService: ClienteService) {}

  ngOnInit() {
    this.clientes = this.clienteService.getClientes(); 
  }

  gerarRota() {
    const cliente = this.clientes.find(c => c.endereco === this.destinoSelecionado);

    if (!cliente || !cliente.endereco) {
      alert('Cliente não encontrado ou endereço não definido.');
      return;
    }

    const novaRota: Rota = {
      origem: this.origem,
      destino: cliente.nome,
    };

    this.rotas.push(novaRota);
  }

  abrirNoMaps(rota: Rota) {
    const url = `https://www.google.com.br/maps/dir/${encodeURIComponent(rota.origem)}/${encodeURIComponent(rota.destino)}`;
    window.open(url, '_blank');
  }
}
