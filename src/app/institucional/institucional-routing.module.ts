import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InstitucionalPage } from './institucional.page';

const routes: Routes = [
  {
    path: '',
    component: InstitucionalPage
  },  {
    path: 'institucional',
    loadChildren: () => import('./institucional/institucional.module').then( m => m.InstitucionalPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InstitucionalPageRoutingModule {}
