import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Vinho, VinhoService } from '../services/vinho.service';
import { ModalController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { VinhoCadastroPage } from '../vinho-cadastro/vinho-cadastro.page';
import { AlertController } from '@ionic/angular/standalone';
import { createOutline, trashOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';

@Component({
  selector: 'app-vinhos',
  templateUrl: './vinhos.page.html',
  styleUrls: ['./vinhos.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class VinhosPage implements OnInit {
  vinhos: Vinho[] = [];
  admin: boolean = false;
  constructor(
    private vinhoService: VinhoService,
    private auth: AuthService,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController
  ) {
    addIcons({
      'create-outline': createOutline,
      'trash-outline': trashOutline,
    });
  }

  ngOnInit() {
    this.vinhos = this.vinhoService.getVinhos();
    this.admin = this.auth.getTipo() === 'admin';
  }

  adicionarVinho(vinho: Vinho) {
    this.vinhoService.addVinho(vinho);
    this.vinhos = this.vinhoService.getVinhos();
  }

  async abrirCadastro() {
    const modal = await this.modalCtrl.create({
      component: VinhoCadastroPage,
    });

    modal.onDidDismiss().then((result) => {
      if (result.data) {
        this.adicionarVinho(result.data);
      }
    });

    await modal.present();
  }

  async editarVinho(vinho: Vinho) {
    const modal = await this.modalCtrl.create({
      component: VinhoCadastroPage,
      componentProps: { vinho },
    });

    modal.onDidDismiss().then((result) => {
      if (result.data) {
        this.vinhoService.atualizarVinho(result.data);
        this.vinhos = this.vinhoService.getVinhos();
      }
    });

    await modal.present();
  }

  async excluirVinho(vinho: Vinho) {
    const alert = await this.alertCtrl.create({
      header: 'Confirmação',
      message: `Deseja excluir o vinho <strong>${vinho.nome}</strong>?`,
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Excluir',
          handler: () => {
            this.vinhoService.removerVinho(vinho.id);
            this.vinhos = this.vinhoService.getVinhos();
          },
        },
      ],
    });

    await alert.present();
  }
}
