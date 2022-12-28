import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarFacturaUserComponent } from './consultar-factura-user.component';

describe('ConsultarFacturaUserComponent', () => {
  let component: ConsultarFacturaUserComponent;
  let fixture: ComponentFixture<ConsultarFacturaUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultarFacturaUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultarFacturaUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
