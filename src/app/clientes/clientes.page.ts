import { Component, OnInit } from '@angular/core';
import { AlertController, IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Cliente, ClienteService } from '../services/cliente.service';
import { IonMenuToggle, ModalController } from '@ionic/angular/standalone';
import { ClienteCadastroPage } from '../cliente-cadastro/cliente-cadastro.page';
import { createOutline, trashOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.page.html',
  styleUrls: ['./clientes.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, IonMenuToggle],
})
export class ClientesPage implements OnInit {
  clientes: Cliente[] = [];

  constructor(
    private clienteService: ClienteService,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController
  ) {
    addIcons({
      'create-outline': createOutline,
      'trash-outline': trashOutline,
    });
    // Removed workaround for IonMenuToggle as 'toggle' does not exist on IonMenuToggle
  }

  ngOnInit() {
    this.clientes = this.clienteService.getClientes();
  }

  async abrirCadastro(cliente?: Cliente) {
    const modal = await this.modalCtrl.create({
      component: ClienteCadastroPage,
      componentProps: { cliente },
    });

    modal.onDidDismiss().then((result) => {
      if (result.data) {
        if (cliente) {
          this.clienteService.updateCliente(result.data);
        } else {
          this.clienteService.addCliente(result.data);
        }
        this.clientes = this.clienteService.getClientes();
      }
    });

    await modal.present();
  }

  async excluirCliente(cliente: Cliente) {
    const alert = await this.alertCtrl.create({
      header: 'Confirmar',
      message: `Deseja excluir o cliente <strong>${cliente.nome}</strong>?`,
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Excluir',
          handler: () => {
            this.clienteService.removeCliente(cliente.id);
            this.clientes = this.clienteService.getClientes();
          },
        },
      ],
    });

    await alert.present();
  }
}
