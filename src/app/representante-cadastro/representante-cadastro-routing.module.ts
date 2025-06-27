import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RepresentanteCadastroPage } from './representante-cadastro.page';

const routes: Routes = [
  {
    path: '',
    component: RepresentanteCadastroPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RepresentanteCadastroPageRoutingModule {}
