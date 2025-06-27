import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RepresentantesPage } from './representantes.page';

const routes: Routes = [
  {
    path: '',
    component: RepresentantesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RepresentantesPageRoutingModule {}
