import { Component, OnInit } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Pedido, PedidoService } from '../services/pedido.service';
import { AlertController } from '@ionic/angular/standalone';
import { PedidoCadastroPage } from '../pedido-cadastro/pedido-cadastro.page';
import { addIcons } from 'ionicons';
import { createOutline, trashOutline } from 'ionicons/icons';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.page.html',
  styleUrls: ['./pedidos.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class PedidosPage implements OnInit {

  pedidos: Pedido[] = [];
  admin: boolean = false;

  constructor(
    private pedidoService: PedidoService,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private auth: AuthService
  ) {
    addIcons({
      'create-outline': createOutline,
      'trash-outline': trashOutline,
    });
  }

  ngOnInit() {
    this.carregarPedidos();
    this.admin = this.auth.getTipo() === 'admin';
  }

carregarPedidos() {
  this.pedidoService.getPedidos().subscribe((pedidos) => {
    this.pedidos = pedidos;
  });
}

  contarItens(pedido: Pedido): number {
    return pedido.itens.reduce((soma, item) => soma + item.quantidade, 0);
  }

  async novoPedido() {
    const modal = await this.modalCtrl.create({
      component: PedidoCadastroPage,
    });

    modal.onDidDismiss().then((res) => {
      if (res.data) {
        this.pedidoService.addPedido(res.data).subscribe((pedidoSalvo) => {
          // Não é possível atualizar a lista completa, pois não há endpoint para listar todos
          // Você pode adicionar manualmente à lista local, se desejar:
          this.pedidos.push(pedidoSalvo);
        });
      }
    });

    await modal.present();
  }

  async excluir(pedido: Pedido) {
    const alert = await this.alertCtrl.create({
      header: 'Excluir Pedido?',
      message: `Deseja excluir o pedido de ${pedido.clienteNome}?`,
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Excluir',
          handler: () => {
            // Não há endpoint DELETE /api/pedidos/:id na sua API, então não é possível excluir via API.
            // Se for implementado, use:
            // this.pedidoService.deletePedido(pedido.id).subscribe(() => { ... });
            // Por enquanto, apenas remova localmente:
            this.pedidos = this.pedidos.filter(p => p.id !== pedido.id);
          },
        },
      ],
    });
    await alert.present();
  }

async editar(pedido: Pedido) {
  console.log(pedido)
  const modal = await this.modalCtrl.create({
    component: PedidoCadastroPage,
    componentProps: { pedido }, 
  });

    modal.onDidDismiss().then((result) => {
      if (result.data) {
        this.atualizarPedido(result.data);
      }
    });

    await modal.present();
  }
  atualizarPedido(pedido: Pedido) {
      this.pedidoService.atualizarPedido(pedido).subscribe({
        next: () => {
          const index = this.pedidos.findIndex(v => v.id === pedido.id);
          if (index > -1) {
            this.pedidos[index] = pedido;
            this.pedidos = [...this.pedidos]; 
          }
        },
        error: (err) => {
          console.error('Erro ao atualizar pedido', err);
        }
      });
    }
}