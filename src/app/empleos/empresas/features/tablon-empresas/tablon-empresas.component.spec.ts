import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TablonEmpresasComponent } from './tablon-empresas.component';

describe('TablonEmpresasComponent', () => {
  let component: TablonEmpresasComponent;
  let fixture: ComponentFixture<TablonEmpresasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TablonEmpresasComponent, HttpClientTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TablonEmpresasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
