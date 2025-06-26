import { Injectable } from '@angular/core';
export type PerfilUsuario = 'admin' | 'representante';

@Injectable({ providedIn: 'root' })
export class AuthService {
private isLoggedIn = false;
  private perfil: PerfilUsuario = 'representante'; 

  login(email: string, senha: string): boolean {
    if (email === 'admin' && senha === 'admin') {
      this.isLoggedIn = true;
      this.perfil = 'admin';
      return true;
    }
    if (email === 'representante' && senha === 'representante') {
      this.isLoggedIn = true;
      this.perfil = 'representante';
      return true;
    }
    return false;
  }

  logout() {
    this.isLoggedIn = false;
    this.perfil = 'representante';
  }

  checkAuth(): boolean {
    return this.isLoggedIn;
  }

  getPerfil(): PerfilUsuario {
    return this.perfil;
  }
}
