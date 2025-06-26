import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]

})
export class AppComponent {
  constructor(private auth: AuthService) {}

  logout() {
    this.auth.logout();
  }
}
