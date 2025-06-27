import { Component, OnInit } from '@angular/core';
import { AlertController, IonicModule, ModalController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Cliente, ClienteService } from '../services/cliente.service';
import { createOutline, trashOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { ClienteCadastroPage } from '../cliente-cadastro/cliente-cadastro.page';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.page.html',
  styleUrls: ['./clientes.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
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
  }

  ngOnInit() {
    this.carregarClientes();
  }

  carregarClientes() {
    this.clienteService.getClientes().subscribe({
      next: (clientes) => {
        this.clientes = clientes;
      },
      error: (err) => {
        console.error('Erro ao carregar clientes', err);
      }
    });
  }

  async abrirCadastro(cliente?: Cliente) {
    const modal = await this.modalCtrl.create({
      component: ClienteCadastroPage,
      componentProps: { cliente },
    });

    modal.onDidDismiss().then((result) => {
      if (result.data) {
        const clienteData: Cliente = result.data;
        
        if (cliente) {
          this.clienteService.updateCliente(clienteData).subscribe({
            next: () => {
              this.carregarClientes(); 
            },
            error: (err) => {
              console.error('Erro ao atualizar cliente', err);
            }
          });
        } else {
          this.clienteService.addCliente(clienteData).subscribe({
            next: () => {
              this.carregarClientes(); 
            },
            error: (err) => {
              console.error('Erro ao adicionar cliente', err);
            }
          });
        }
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
            this.clienteService.removeCliente(cliente.id).subscribe({
              next: () => {
                this.clientes = this.clientes.filter(c => c.id !== cliente.id);
              },
              error: (err) => {
                console.error('Erro ao remover cliente', err);
              }
            });
          },
        },
      ],
    });

    await alert.present();
  }
}