import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentaMascotaComponent } from './venta-mascota.component';

describe('VentaMascotaComponent', () => {
  let component: VentaMascotaComponent;
  let fixture: ComponentFixture<VentaMascotaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VentaMascotaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VentaMascotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
