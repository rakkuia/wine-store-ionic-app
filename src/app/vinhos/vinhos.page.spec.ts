import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VinhosPage } from './vinhos.page';

describe('VinhosPage', () => {
  let component: VinhosPage;
  let fixture: ComponentFixture<VinhosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(VinhosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
