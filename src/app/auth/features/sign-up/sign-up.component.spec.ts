import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SignUpComponent } from './sign-up.component';
import { EmailService } from '../../../core/services/email.service';
import { of } from 'rxjs';

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;
  let emailService: jasmine.SpyObj<EmailService>;

  beforeEach(async () => {
    const emailServiceSpy = jasmine.createSpyObj('EmailService', ['generateRandomCode', 'sendEmail']);

    await TestBed.configureTestingModule({
      imports: [SignUpComponent, HttpClientTestingModule, RouterTestingModule],
      providers: [{ provide: EmailService, useValue: emailServiceSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(SignUpComponent);
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
    component.nombre = 'Test User';
    component.correo = 'test@example.com';

    await component.sendEmail();
    
    expect(emailService.sendEmail).toHaveBeenCalledWith('Test User', '123456', 'test@example.com');
    expect(component.emailSent).toBeTrue();
  });
});
