import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Cliente, ClienteService } from '../services/cliente.service';
import { Vinho, VinhoService } from '../services/vinho.service';
import { Pedido } from '../services/pedido.service';
import { ModalController } from '@ionic/angular/standalone';
import { Representante, RepresentanteService } from '../services/representantes.service';

@Component({
  selector: 'app-pedido-cadastro',
  templateUrl: './pedido-cadastro.page.html',
  styleUrls: ['./pedido-cadastro.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class PedidoCadastroPage implements OnInit {
  clientes: Cliente[] = [];
  vinhos: Vinho[] = [];
  representantes: Representante[] = [];
  pedido: Pedido = {
    id: 0,
    clienteId: 0,
    clienteNome: '',
    data: '',
    condicaoPagamento: '',
    itens: [],
    representanteId: 0,
    comissao: 0,
    total: 0,
  };

  constructor(
    private modalCtrl: ModalController,
    private clienteService: ClienteService,
    private vinhoService: VinhoService,
    private representanteService: RepresentanteService 
  ) {}

  ngOnInit() {
    this.clientes = this.clienteService.getClientes();
    this.vinhos = this.vinhoService.getVinhos();
    this.representantes = this.representanteService.getRepresentantes();
  }

  toggleItem(vinho: Vinho, checked: boolean) {
    if (checked) {
      this.pedido.itens.push({
        vinhoId: vinho.id,
        nomeVinho: vinho.nome,
        preco: vinho.preco || 50,
        quantidade: 1,
      });
    } else {
      this.pedido.itens = this.pedido.itens.filter(
        (i) => i.vinhoId !== vinho.id
      );
    }

    this.calcularTotal();
  }

  calcularTotal() {
    this.pedido.total = this.pedido.itens.reduce(
      (acc, item) => acc + item.preco * item.quantidade,
      0
    );
  }

  salvar() {
    const cliente = this.clientes.find((c) => c.id === this.pedido.clienteId);
    if (cliente) this.pedido.clienteNome = cliente.nome;
    this.calcularTotal();
    this.modalCtrl.dismiss(this.pedido);
  }

  cancelar() {
    this.modalCtrl.dismiss();
  }
}
