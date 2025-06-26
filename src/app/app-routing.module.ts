// import { NgModule } from '@angular/core';
// import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
// import { AuthGuard } from './guards/auth.guard';

// export const routes: Routes = [
//   {
//     path: 'home',
//     loadChildren: () =>
//       import('./home/home.module').then((m) => m.HomePageModule),
//     canActivate: [AuthGuard],
//   },
//   {
//     path: '',
//     redirectTo: 'login',
//     pathMatch: 'full',
//   },
//   {
//     path: 'login',
//     loadChildren: () =>
//       import('./login/login.module').then((m) => m.LoginPageModule),
//   },
//   {
//     path: 'vinhos',
//     loadChildren: () =>
//       import('./vinhos/vinhos.module').then((m) => m.VinhosPageModule),
//     canActivate: [AuthGuard],
//   },
//   {
//     path: 'clientes',
//     loadChildren: () =>
//       import('./clientes/clientes.module').then((m) => m.ClientesPageModule),
//     canActivate: [AuthGuard],
//   },
//   {
//     path: 'pedidos',
//     loadChildren: () =>
//       import('./pedidos/pedidos.module').then((m) => m.PedidosPageModule),
//     canActivate: [AuthGuard],
//   },
//   {
//     path: 'rotas',
//     loadChildren: () =>
//       import('./rotas/rotas.module').then((m) => m.RotasPageModule),
//     canActivate: [AuthGuard],
//   },
//   {
//     path: 'vinho-cadastro',
//     loadChildren: () =>
//       import('./vinho-cadastro/vinho-cadastro.module').then(
//         (m) => m.VinhoCadastroPageModule
//       ),
//     canActivate: [AuthGuard],
//   },
//   {
//     path: 'cliente-cadastro',
//     loadChildren: () =>
//       import('./cliente-cadastro/cliente-cadastro.module').then(
//         (m) => m.ClienteCadastroPageModule
//       ),

//     canActivate: [AuthGuard],
//   },
// ];

// @NgModule({
//   imports: [
//     RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
//   ],
//   exports: [RouterModule],
// })
// export class AppRoutingModule {}
