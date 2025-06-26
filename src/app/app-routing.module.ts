import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

export const routes: Routes = [ // <-- export here
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'vinhos',
    loadChildren: () =>
      import('./vinhos/vinhos.module').then((m) => m.VinhosPageModule),
  },
  {
    path: 'clientes',
    loadChildren: () =>
      import('./clientes/clientes.module').then((m) => m.ClientesPageModule),
  },
  {
    path: 'pedidos',
    loadChildren: () =>
      import('./pedidos/pedidos.module').then((m) => m.PedidosPageModule),
  },
  {
    path: 'rotas',
    loadChildren: () =>
      import('./rotas/rotas.module').then((m) => m.RotasPageModule),
  },
  {
    path: 'vinho-cadastro',
    loadChildren: () => import('./vinho-cadastro/vinho-cadastro.module').then( m => m.VinhoCadastroPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}