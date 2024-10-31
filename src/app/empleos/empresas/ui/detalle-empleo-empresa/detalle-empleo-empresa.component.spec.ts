import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleEmpleoEmpresaComponent } from './detalle-empleo-empresa.component';

describe('DetalleEmpleoEmpresaComponent', () => {
  let component: DetalleEmpleoEmpresaComponent;
  let fixture: ComponentFixture<DetalleEmpleoEmpresaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalleEmpleoEmpresaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalleEmpleoEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
