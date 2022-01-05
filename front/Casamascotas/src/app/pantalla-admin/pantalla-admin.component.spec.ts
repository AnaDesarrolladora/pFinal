import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PantallaAdminComponent } from './pantalla-admin.component';

describe('PantallaAdminComponent', () => {
  let component: PantallaAdminComponent;
  let fixture: ComponentFixture<PantallaAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PantallaAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PantallaAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
