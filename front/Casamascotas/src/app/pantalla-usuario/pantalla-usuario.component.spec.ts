import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PantallaUsuarioComponent } from './pantalla-usuario.component';

describe('PantallaUsuarioComponent', () => {
  let component: PantallaUsuarioComponent;
  let fixture: ComponentFixture<PantallaUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PantallaUsuarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PantallaUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
