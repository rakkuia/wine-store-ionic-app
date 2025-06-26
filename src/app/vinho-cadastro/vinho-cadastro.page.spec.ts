import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VinhoCadastroPage } from './vinho-cadastro.page';

describe('VinhoCadastroPage', () => {
  let component: VinhoCadastroPage;
  let fixture: ComponentFixture<VinhoCadastroPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(VinhoCadastroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
