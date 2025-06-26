import { Injectable } from '@angular/core';

export interface Vinho {
  id: number;
  nome: string;
  tipo: string;
  safra: string;
  preco: number;
}

@Injectable({ providedIn: 'root' })
export class VinhoService {
  private vinhos: Vinho[] = [
    { id: 1, nome: 'Cabernet Sauvignon', tipo: 'Tinto', safra: '2021', preco: 89.9 },
    { id: 2, nome: 'Chardonnay Reserva', tipo: 'Branco', safra: '2020', preco: 69.5 },
    { id: 3, nome: 'Rosé da Serra', tipo: 'Rosé', safra: '2022', preco: 55.0 },
  ];

  getVinhos(): Vinho[] {
    return this.vinhos;
  }

  addVinho(vinho: Vinho) {
  const novo = { ...vinho, id: Date.now() };
  this.vinhos.push(novo);
}

atualizarVinho(vinhoEditado: Vinho) {
  const index = this.vinhos.findIndex(v => v.id === vinhoEditado.id);
  if (index > -1) {
    this.vinhos[index] = vinhoEditado;
  }
}

removerVinho(id: number) {
  this.vinhos = this.vinhos.filter(v => v.id !== id);
}
}
