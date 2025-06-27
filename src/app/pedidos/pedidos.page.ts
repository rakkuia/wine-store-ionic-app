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
    this.pedidos = this.pedidoService.getPedidos();
    this.admin = this.auth.getTipo() === 'admin';
  }

  async novoPedido() {
    const modal = await this.modalCtrl.create({
      component: PedidoCadastroPage,
    });

    modal.onDidDismiss().then((res) => {
      if (res.data) {
        this.pedidoService.addPedido(res.data);
        this.pedidos = this.pedidoService.getPedidos();
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
            this.pedidoService.deletePedido(pedido.id);
            this.pedidos = this.pedidoService.getPedidos();
          },
        },
      ],
    });
    await alert.present();
  }

  async editar(pedido: Pedido) {
    const modal = await this.modalCtrl.create({
      component: PedidoCadastroPage,
      componentProps: { pedido: { ...pedido } },
    });

    modal.onDidDismiss().then((res) => {
      if (res.data) {
        this.pedidoService.updatePedido(res.data);
        this.pedidos = this.pedidoService.getPedidos();
      }
    });

    await modal.present();
  }
}
