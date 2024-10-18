import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavEmpleosComponent } from './nav-empleos.component';

describe('NavEmpleosComponent', () => {
  let component: NavEmpleosComponent;
  let fixture: ComponentFixture<NavEmpleosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavEmpleosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavEmpleosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
