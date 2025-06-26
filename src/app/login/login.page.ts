import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class LoginPage {
  email = '';
  senha = '';

  constructor(
    private auth: AuthService,
    private router: Router,
    private alertCtrl: AlertController
  ) {}

  async fazerLogin() {
    if (this.auth.login(this.email, this.senha)) {
      this.router.navigate(['/vinhos']);
    } else {
      const alert = await this.alertCtrl.create({
        header: 'Erro',
        message: 'Credenciais inválidas',
        buttons: ['OK'],
      });
      await alert.present();
    }
  }
}
