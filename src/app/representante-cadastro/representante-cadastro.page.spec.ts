import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RepresentanteCadastroPage } from './representante-cadastro.page';

describe('RepresentanteCadastroPage', () => {
  let component: RepresentanteCadastroPage;
  let fixture: ComponentFixture<RepresentanteCadastroPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RepresentanteCadastroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
