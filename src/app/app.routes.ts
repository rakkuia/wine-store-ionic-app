import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./login/login.page').then((m) => m.LoginPage)
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./home/home.page').then((m) => m.HomePage),
//    canActivate: [AuthGuard]
  },
  {
    path: 'vinhos',
    loadComponent: () =>
      import('./vinhos/vinhos.page').then((m) => m.VinhosPage),
//    canActivate: [AuthGuard]
  },
  {
    path: 'clientes',
    loadComponent: () =>
      import('./clientes/clientes.page').then((m) => m.ClientesPage),
//    canActivate: [AuthGuard]
  },
  {
    path: 'pedidos',
    loadComponent: () =>
      import('./pedidos/pedidos.page').then((m) => m.PedidosPage),
//    canActivate: [AuthGuard]
  },
  {
    path: 'rotas',
    loadComponent: () =>
      import('./rotas/rotas.page').then((m) => m.RotasPage),
//    canActivate: [AuthGuard]
  },
  {
    path: 'vinho-cadastro',
    loadComponent: () =>
      import('./vinho-cadastro/vinho-cadastro.page').then((m) => m.VinhoCadastroPage),
//    canActivate: [AuthGuard]
  },
  {
    path: 'cliente-cadastro',
    loadComponent: () =>
      import('./cliente-cadastro/cliente-cadastro.page').then((m) => m.ClienteCadastroPage),
//    canActivate: [AuthGuard]
  }
];