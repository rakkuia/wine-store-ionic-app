import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-institucional',
  templateUrl: './institucional.page.html',
  styleUrls: ['./institucional.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class InstitucionalPage implements OnInit {
  constructor() {}

  ngOnInit() {}
}
