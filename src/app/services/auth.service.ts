import { Injectable } from '@angular/core';
export type PerfilUsuario = 'admin' | 'representante' | 'inst';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private isLoggedIn = false;
  private usuario: { nome: string; tipo: PerfilUsuario } | null = null;
  login(email: string, senha: string): boolean {
    if (email === 'admin' && senha === 'admin') {
      this.isLoggedIn = true;
      this.usuario = { nome: 'Admin', tipo: 'admin' };
      return true;
    }
    if (email === 'representante' && senha === 'representante') {
      this.isLoggedIn = true;
      this.usuario = { nome: 'Representante', tipo: 'representante' };
      return true;
    }
     if (email === 'inst' && senha === 'inst') {
      this.isLoggedIn = true;
      this.usuario = { nome: 'Institucional', tipo: 'inst' };
      return true;
    }
    return false;
  }

  logout() {
    this.isLoggedIn = false;
    this.usuario = null;
  }

  isAutenticado(): boolean {
    return !!this.usuario;
  }

  getTipo(): 'admin' | 'representante' | 'inst' | null {
    return this.usuario?.tipo ?? null;
  }
}
