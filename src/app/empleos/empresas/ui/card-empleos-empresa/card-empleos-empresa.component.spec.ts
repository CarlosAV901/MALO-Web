import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardEmpleosEmpresaComponent } from './card-empleos-empresa.component';

describe('CardEmpleosEmpresaComponent', () => {
  let component: CardEmpleosEmpresaComponent;
  let fixture: ComponentFixture<CardEmpleosEmpresaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardEmpleosEmpresaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardEmpleosEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
