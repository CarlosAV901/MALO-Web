import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaEmpleosComponent } from './lista-empleos.component';

describe('ListaEmpleosComponent', () => {
  let component: ListaEmpleosComponent;
  let fixture: ComponentFixture<ListaEmpleosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaEmpleosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaEmpleosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
