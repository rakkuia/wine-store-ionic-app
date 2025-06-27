import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RepresentantesPageRoutingModule } from './representantes-routing.module';
import { RepresentantesPage } from './representantes.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RepresentantesPageRoutingModule,
    RepresentantesPage
  ],
})
export class RepresentantesPageModule {}
