import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentReporteComponent } from './component-reporte.component';

describe('ComponentReporteComponent', () => {
  let component: ComponentReporteComponent;
  let fixture: ComponentFixture<ComponentReporteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComponentReporteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentReporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
