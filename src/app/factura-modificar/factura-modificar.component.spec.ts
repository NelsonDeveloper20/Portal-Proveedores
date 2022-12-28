import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacturaModificarComponent } from './factura-modificar.component';

describe('FacturaModificarComponent', () => {
  let component: FacturaModificarComponent;
  let fixture: ComponentFixture<FacturaModificarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacturaModificarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FacturaModificarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
