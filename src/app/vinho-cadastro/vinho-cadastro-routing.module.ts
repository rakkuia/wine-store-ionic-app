import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VinhoCadastroPage } from './vinho-cadastro.page';

const routes: Routes = [
  {
    path: '',
    component: VinhoCadastroPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VinhoCadastroPageRoutingModule {}
