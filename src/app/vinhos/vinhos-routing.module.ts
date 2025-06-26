import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VinhosPage } from './vinhos.page';

const routes: Routes = [
  {
    path: '',
    component: VinhosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VinhosPageRoutingModule {}
