import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-vinho-cadastro',
  templateUrl: './vinho-cadastro.page.html',
  styleUrls: ['./vinho-cadastro.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class VinhoCadastroPage {
  vinho = {
    nome: '',
    tipo: '',
    safra: '',
    notas: '',
    harmonizacao: '',
    imagemUrl: '',
    preco: 0
  };

  constructor(private modalCtrl: ModalController) {}

  salvar() {
    this.modalCtrl.dismiss(this.vinho);
  }

  cancelar() {
    this.modalCtrl.dismiss();
  }
}