import { Component } from '@angular/core';
import { ModalController, NavParams, IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-representante-cadastro',
  templateUrl: 'representante-cadastro.page.html',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class RepresentanteCadastroPage {
  representante: any = {
    id: null,
    nome: '',
    email: '',
    telefone: '',
    comissao: 0
  };

  constructor(private modalCtrl: ModalController, private navParams: NavParams) {
    const recebido = this.navParams.get('representante');
    if (recebido) this.representante = { ...recebido };
  }

  salvar() {
    if (!this.representante.id) this.representante.id = Date.now();
    this.modalCtrl.dismiss(this.representante);
  }

  cancelar() {
    this.modalCtrl.dismiss();
  }
}