import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RepresentantesPage } from './representantes.page';

describe('RepresentantesPage', () => {
  let component: RepresentantesPage;
  let fixture: ComponentFixture<RepresentantesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RepresentantesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
