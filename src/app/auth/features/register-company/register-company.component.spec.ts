import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { RegisterCompany } from './register-company.component';
import { EmailService } from '../../../core/services/email.service';
import { of } from 'rxjs';

describe('RegisterCompanyComponent', () => {
  let component: RegisterCompany;
  let fixture: ComponentFixture<RegisterCompany>;
  let emailService: jasmine.SpyObj<EmailService>;

  beforeEach(async () => {
    const emailServiceSpy = jasmine.createSpyObj('EmailService', ['generateRandomCode', 'sendEmail']);

    await TestBed.configureTestingModule({
      imports: [RegisterCompany, HttpClientTestingModule, RouterTestingModule],
      providers: [{ provide: EmailService, useValue: emailServiceSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterCompany);
    component = fixture.componentInstance;
    emailService = TestBed.inject(EmailService) as jasmine.SpyObj<EmailService>;

    // Configura las simulaciones (spies) para devolver valores por defecto
    emailService.generateRandomCode.and.returnValue('123456'); // Código de verificación simulado
    emailService.sendEmail.and.returnValue(Promise.resolve()); // Simula el envío exitoso de un email

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should go to the next step', () => {
    component.currentStep = 1;
    component.nextStep();
    expect(component.currentStep).toBe(2);
  });

  it('should validate email correctly', () => {
    component.correo = 'test@example.com';
    expect(component.isEmailValid(component.correo)).toBeTrue();
    component.correo = 'invalid-email';
    expect(component.isEmailValid(component.correo)).toBeFalse();
  });

  it('should send verification code', async () => {
    component.nombre = 'Test Company';
    component.correo = 'test@example.com';
    
    expect(emailService.sendEmail).toHaveBeenCalledWith('Test Company', '123456', 'test@example.com');
    expect(component.emailSent).toBeTrue();
  });

  it('should validate all forms correctly', () => {
    // Validar el primer formulario
    component.nombre = 'Test Company';
    component.industria = 'Technology';
    component.ubicacion = 'Mexico City';
    expect(component.isForm1Valid()).toBeTrue();

    // Validar el segundo formulario
    component.correo = 'test@example.com';
    component.codigoInp = '123456';
    component.verificationCode = '123456'; // Debe coincidir con el generado
    expect(component.isForm2Valid()).toBeTrue();

    // Validar el tercer formulario
    component.contrasena = 'password';
    component.confirmPass = 'password';
  });

  it('should not proceed to finish registration if forms are invalid', async () => {
    component.nombre = '';
    component.industria = 'Technology';
    component.ubicacion = 'Mexico City';

    component.finishRegister();

    // Debe permanecer en el primer paso si el formulario no es válido
    expect(component.currentStep).toBe(1);
  });
});
