import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PedidoCadastroPageRoutingModule } from './pedido-cadastro-routing.module';

import { PedidoCadastroPage } from './pedido-cadastro.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PedidoCadastroPageRoutingModule
  ],
  declarations: [PedidoCadastroPage]
})
export class PedidoCadastroPageModule {}
