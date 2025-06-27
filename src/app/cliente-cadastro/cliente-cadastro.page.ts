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
    nome: '',
    documento: '',
    endereco: '',
    cidade: '',
    estado: '',
    representante_id: '',
    contato: ''
  };

  constructor(private modalCtrl: ModalController, private navParams: NavParams) {}

  ngOnInit() {
    const recebido = this.navParams.get('cliente');
    if (recebido) this.cliente = { ...recebido };
        if (!this.cliente) {
      this.cliente = {
        nome: '',
        documento: '',
        endereco: '',
        cidade: '',
        estado: '',
        // responsavel: '',
        contato: ''
      };
    }
  }

  salvar() {
    this.modalCtrl.dismiss(this.cliente);
  }

  cancelar() {
    this.modalCtrl.dismiss();
  }
}
