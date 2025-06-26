import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PedidoCadastroPage } from './pedido-cadastro.page';

describe('PedidoCadastroPage', () => {
  let component: PedidoCadastroPage;
  let fixture: ComponentFixture<PedidoCadastroPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PedidoCadastroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
