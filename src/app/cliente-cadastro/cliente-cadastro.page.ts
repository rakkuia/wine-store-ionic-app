import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-cliente-cadastro',
  templateUrl: './cliente-cadastro.page.html',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class ClienteCadastroPage implements OnInit {
  cliente: any = {
    id: null,
    nome: '',
    documento: '',
    endereco: '',
    cidade: '',
    estado: '',
    responsavel: '',
    contato: ''
  };

  constructor(private modalCtrl: ModalController, private navParams: NavParams) {}

  ngOnInit() {
    const recebido = this.navParams.get('cliente');
    if (recebido) this.cliente = { ...recebido };
  }

  salvar() {
    if (!this.cliente.id) this.cliente.id = Date.now();
    this.modalCtrl.dismiss(this.cliente);
  }

  cancelar() {
    this.modalCtrl.dismiss();
  }
}
