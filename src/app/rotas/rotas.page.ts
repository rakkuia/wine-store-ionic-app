import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Cliente, ClienteService } from '../services/cliente.service';

@Component({
  selector: 'app-rotas',
  templateUrl: './rotas.page.html',
  styleUrls: ['./rotas.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class RotasPage {
enderecoPartida = '';
  clienteDestinoId!: number;
  clientes: Cliente[] = [];
  urlRota: string | null = null;

  constructor(private clienteService: ClienteService) {
    this.clientes = this.clienteService.getClientes();
  }

gerarRota() {
  const cliente = this.clientes.find(c => c.id === this.clienteDestinoId);
  if (!cliente || !this.enderecoPartida) {
    alert('Preencha todos os campos');
    return;
  }

  const partida = encodeURIComponent(this.enderecoPartida);
  const destino = encodeURIComponent(`${cliente.endereco}, ${cliente.cidade}, ${cliente.estado}`);

  this.urlRota = `https://www.google.com.br/maps/dir/${partida}/${destino}/?hl=pt-BR&entry=ttu`;
  window.open(this.urlRota, '_blank');
}

}