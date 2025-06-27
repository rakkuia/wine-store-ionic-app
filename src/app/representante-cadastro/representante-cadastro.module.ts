import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RepresentanteCadastroPageRoutingModule } from './representante-cadastro-routing.module';

import { RepresentanteCadastroPage } from './representante-cadastro.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RepresentanteCadastroPageRoutingModule,
    RepresentanteCadastroPage
  ],
})
export class RepresentanteCadastroPageModule {}
