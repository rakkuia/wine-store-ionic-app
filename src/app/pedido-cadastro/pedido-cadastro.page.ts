import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Cliente, ClienteService } from '../services/cliente.service';
import { Vinho, VinhoService } from '../services/vinho.service';
import { Pedido } from '../services/pedido.service';
import { ModalController } from '@ionic/angular/standalone';
import {
  Representante,
  RepresentanteService,
} from '../services/representantes.service';

@Component({
  selector: 'app-pedido-cadastro',
  templateUrl: './pedido-cadastro.page.html',
  styleUrls: ['./pedido-cadastro.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class PedidoCadastroPage implements OnInit {
  quantidades: { [vinhoId: number]: number } = {};

  clientes: Cliente[] = [];
  vinhos: Vinho[] = [];
  representantes: Representante[] = [];
  pedido: Pedido = {
    id: 0,
    cliente_id: 0,
    clienteNome: '',
    data: '',
    condicaoPagamento: '',
    itens: [],
    representante_id: 0,
    comissao: 0,
    valorComissao: 0,
    total: 0,
  };

  constructor(
    private modalCtrl: ModalController,
    private clienteService: ClienteService,
    private vinhoService: VinhoService,
    private representanteService: RepresentanteService
  ) {}

  ngOnInit() {
    this.clienteService.getClientes().subscribe((clientes) => {
      this.clientes = clientes;
    });
    this.vinhoService.getVinhos().subscribe((vinhos) => {
      this.vinhos = vinhos;
    });
    this.representanteService
      .getRepresentantes()
      .subscribe((representantes) => {
        this.representantes = representantes;
      });
    if (this.pedido && this.pedido.itens) {
      this.quantidades = {};
      this.pedido.itens.forEach((item) => {
        this.quantidades[item.vinhoId] = item.quantidade;
      });
    }

    // if (this.pedido && this.pedido.itens && this.pedido.itens.length > 0) {
    //   this.quantidades = {};
    //   this.pedido.itens.forEach((item) => {
    //     this.quantidades[item.vinhoId] = item.quantidade;
    //   });
    // }
  }

  atualizarQuantidade(
    vinho: Vinho,
    quantidade: number,
    comissaoPorcentagem: number
  ) {
    this.quantidades[vinho.id] = quantidade;

    const idx = this.pedido.itens.findIndex((i) => i.vinhoId === vinho.id);

    if (quantidade > 0) {
      if (idx > -1) {
        this.pedido.itens[idx].quantidade = quantidade;
      } else {
        this.pedido.itens.push({
          vinhoId: vinho.id,
          nomeVinho: vinho.nome,
          preco: vinho.preco || 50,
          quantidade,
        });
      }
    } else if (idx > -1) {
      this.pedido.itens.splice(idx, 1);
    }
    this.calcularTotal();
  }

  atualizarComissao() {
    this.calcularTotal();
  }

  calcularTotal() {
    this.pedido.total = this.pedido.itens.reduce(
      (acc, item) => acc + item.preco * item.quantidade,
      0
    );
    const percentual = this.pedido.comissao || 0;
    this.pedido.valorComissao = (this.pedido.total * percentual) / 100;
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

  salvar() {
    const cliente = this.clientes.find((c) => c.id === this.pedido.cliente_id);
    if (cliente) this.pedido.clienteNome = cliente.nome;
    this.calcularTotal();
    this.modalCtrl.dismiss(this.pedido);
  }

  cancelar() {
    this.modalCtrl.dismiss();
  }
}
