import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-rotas',
  templateUrl: './rotas.page.html',
  styleUrls: ['./rotas.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class RotasPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}