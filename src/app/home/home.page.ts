import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; 
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule],
})
export class HomePage {
  tipo = '';

  constructor(private auth: AuthService, private router: Router) {
    this.tipo = this.auth.getTipo()!;
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
