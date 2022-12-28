import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacturaAprobacionComponent } from './factura-aprobacion.component';

describe('FacturaAprobacionComponent', () => {
  let component: FacturaAprobacionComponent;
  let fixture: ComponentFixture<FacturaAprobacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacturaAprobacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FacturaAprobacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
