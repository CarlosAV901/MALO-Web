import { Component, inject, ElementRef, Renderer2, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-company',
  standalone: true,
  templateUrl: './select-register.component.html',
  styleUrls: ['./select-register.component.css']
})
export class SelectRegister implements OnInit {

  router = inject(Router);
  isSignUpActive = false; // Saber si signup está activo
  buttonText = 'Registrar compañía'; // Texto del botón

  goToSignUp() {
    this.router.navigate(['/auth/sign-up']);
  }
  goToRegisterCompany() {
    this.router.navigate(['/auth/register-company']);
  }

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    const overlayWrapper = this.el.nativeElement.querySelector('#overlayWrapper');
    this.renderer.setStyle(overlayWrapper, 'backgroundImage', "url('57-bg.png')");
    this.handleScreenResize();
    window.addEventListener('resize', this.handleScreenResize.bind(this));
  }

  // Detectar el tamaño de pantalla al cargar y redimensionar
  handleScreenResize() {
    const container = this.el.nativeElement.querySelector('#container');
    const screenWidth = window.innerWidth;

    if (screenWidth < 768) {
      // Mostrar automáticamente el formulario de "Sign In"
      this.renderer.removeClass(container, 'right__panel__active');
      this.isSignUpActive = false;
      this.buttonText = '¿o registrar empresa?'; // Cambiar texto a "Registrar compañía"
    }
  }

  // Alternar entre formularios y cambiar el texto del botón
  toggleForms() {
    const container = this.el.nativeElement.querySelector('#container');

    if (this.isSignUpActive) {
      // Si Sign Up está activo, mostrar Sign In y cambiar el texto del botón
      this.renderer.removeClass(container, 'right__panel__active');
      this.buttonText = '¿o registrar empresa?';
    } else {
      // Si Sign In está activo, mostrar Sign Up y cambiar el texto del botón
      this.renderer.addClass(container, 'right__panel__active');
      this.buttonText = '¿o crear usuario?';
    }

    // Cambiar el estado de isSignUpActive
    this.isSignUpActive = !this.isSignUpActive;
  }

  @HostListener('document:mouseup', ['$event'])
  onMouseUp(event: MouseEvent) {
    const screenWidth = window.innerWidth;
    const container = this.el.nativeElement.querySelector('#container');
    const overlayWrapper = this.el.nativeElement.querySelector('#overlayWrapper');

    if (screenWidth >= 768) {
      if (event.clientX > screenWidth / 2) {
        this.renderer.addClass(container, 'right__panel__active');
        this.renderer.setStyle(overlayWrapper, 'backgroundImage', "url('gray.png')");
        this.isSignUpActive = true; // Activar formulario de Sign Up
        this.buttonText = '¿o crear usuario?'; // Cambiar texto del botón
      } else {
        this.renderer.removeClass(container, 'right__panel__active');
        this.renderer.setStyle(overlayWrapper, 'backgroundImage', "url('57-bg.png')");
        this.isSignUpActive = false; // Activar formulario de Sign In
        this.buttonText = '¿o registrar empresa?'; // Cambiar texto del botón
      }
    }
  }
}
