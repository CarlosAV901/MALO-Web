import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoreContentComponent } from './more-content.component';

describe('MoreContentComponent', () => {
  let component: MoreContentComponent;
  let fixture: ComponentFixture<MoreContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoreContentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoreContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
