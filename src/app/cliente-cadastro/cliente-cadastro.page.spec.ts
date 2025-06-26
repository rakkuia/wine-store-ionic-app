import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClienteCadastroPage } from './cliente-cadastro.page';

describe('ClienteCadastroPage', () => {
  let component: ClienteCadastroPage;
  let fixture: ComponentFixture<ClienteCadastroPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ClienteCadastroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
