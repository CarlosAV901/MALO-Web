import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardEmpleosComponent } from './card-empleos.component';

describe('CardEmpleosComponent', () => {
  let component: CardEmpleosComponent;
  let fixture: ComponentFixture<CardEmpleosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardEmpleosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardEmpleosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
