import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VinhoCadastroPageRoutingModule } from './vinho-cadastro-routing.module';

import { VinhoCadastroPage } from './vinho-cadastro.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VinhoCadastroPageRoutingModule,
    VinhoCadastroPage
  ],
  })
export class VinhoCadastroPageModule {}
