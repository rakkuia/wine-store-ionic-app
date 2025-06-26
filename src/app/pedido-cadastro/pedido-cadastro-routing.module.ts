import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PedidoCadastroPage } from './pedido-cadastro.page';

const routes: Routes = [
  {
    path: '',
    component: PedidoCadastroPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PedidoCadastroPageRoutingModule {}
