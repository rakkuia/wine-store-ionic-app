import { Injectable } from '@angular/core';

export interface Representante {
  id: number;
  nome: string;
  email: string;
  telefone: string;
}

@Injectable({ providedIn: 'root' })
export class RepresentanteService {
  private representantes: Representante[] = [
    { id: 1, nome: 'João Silva', email: 'joao@email.com', telefone: '(11) 99999-9999'}
  ];

  getRepresentantes(): Representante[] {
    return this.representantes;
  }

  addRepresentante(rep: Representante) {
    rep.id = Date.now();
    this.representantes.push(rep);
  }

  updateRepresentante(rep: Representante) {
    const idx = this.representantes.findIndex(r => r.id === rep.id);
    if (idx > -1) this.representantes[idx] = rep;
  }

  removeRepresentante(id: number) {
    this.representantes = this.representantes.filter(r => r.id !== id);
  }
}