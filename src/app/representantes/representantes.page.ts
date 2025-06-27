import { Component, OnInit } from '@angular/core';
import { IonicModule, ModalController, AlertController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  Representante,
  RepresentanteService,
} from 'src/app/services/representantes.service';
import { RepresentanteCadastroPage } from 'src/app/representante-cadastro/representante-cadastro.page';
import { addIcons } from 'ionicons';
import { createOutline, trashOutline } from 'ionicons/icons';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-representantes',
  templateUrl: 'representantes.page.html',
  styleUrls: ['representantes.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class RepresentantesPage implements OnInit {
  representantes: Representante[] = [];
  admin: boolean = false;
  constructor(
    private representanteService: RepresentanteService,
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
    this.carregarRepresentantes();
    this.admin = this.auth.getTipo() === 'admin';
  }

  carregarRepresentantes() {
    this.representanteService.getRepresentantes().subscribe((reps) => {
      this.representantes = reps;
    });
  }

  async abrirCadastro(rep?: Representante) {
    const modal = await this.modalCtrl.create({
      component: RepresentanteCadastroPage,
      componentProps: { representante: rep ? { ...rep } : { id: null, nome: '', email: '', telefone: '', comissao: 0 } },
    });

    modal.onDidDismiss().then((result) => {
      if (result.data) {
        if (rep) {
          this.representanteService.updateRepresentante(result.data).subscribe(() => {
            this.carregarRepresentantes();
          });
        } else {
          this.representanteService.addRepresentante(result.data).subscribe(() => {
            this.carregarRepresentantes();
          });
        }
      }
    });

    await modal.present();
  }

  async excluir(rep: Representante) {
    const alert = await this.alertCtrl.create({
      header: 'Confirmar',
      message: `Deseja excluir o representante <strong>${rep.nome}</strong>?`,
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Excluir',
          handler: () => {
            this.representanteService.removeRepresentante(rep.id).subscribe(() => {
              this.carregarRepresentantes();
            });
          },
        },
      ],
    });

    await alert.present();
  }
}