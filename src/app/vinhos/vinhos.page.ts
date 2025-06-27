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
    this.carregarVinhos();
    this.admin = this.auth.getTipo() === 'admin';
  }

  carregarVinhos() {
    this.vinhoService.getVinhos().subscribe({
      next: (vinhos) => {
        this.vinhos = vinhos;
      },
      error: (err) => {
        console.error('Erro ao carregar vinhos', err);
        // Trate erros aqui (ex: mostrar alerta)
      }
    });
  }

  adicionarVinho(vinho: Omit<Vinho, 'id'>) {
    this.vinhoService.addVinho(vinho).subscribe({
      next: (novoVinho) => {
        this.vinhos = [...this.vinhos, novoVinho];
      },
      error: (err) => {
        console.error('Erro ao adicionar vinho', err);
      }
    });
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
        this.atualizarVinho(result.data);
      }
    });

    await modal.present();
  }

  atualizarVinho(vinho: Vinho) {
    this.vinhoService.atualizarVinho(vinho).subscribe({
      next: () => {
        const index = this.vinhos.findIndex(v => v.id === vinho.id);
        if (index > -1) {
          this.vinhos[index] = vinho;
          this.vinhos = [...this.vinhos]; // Atualiza a referência
        }
      },
      error: (err) => {
        console.error('Erro ao atualizar vinho', err);
      }
    });
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
            this.removerVinho(vinho.id);
          },
        },
      ],
    });

    await alert.present();
  }

  removerVinho(id: number) {
    this.vinhoService.removerVinho(id).subscribe({
      next: () => {
        this.vinhos = this.vinhos.filter(v => v.id !== id);
      },
      error: (err) => {
        console.error('Erro ao remover vinho', err);
      }
    });
  }
}
