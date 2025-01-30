import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';  // Importa Router para la navegación programática

@Component({
  selector: 'app-login',
  standalone: true, // ✅ Importante para usar imports en un componente standalone

  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [CommonModule, ReactiveFormsModule,RouterLink] // ✅ Importa los módulos aquí

})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder,private productService: ProductService, private router: Router) {
    this.loginForm = this.fb.group({
      usuario: ['', [Validators.required]],  // Cambia usuario → email
      contraseña: ['', [Validators.required, Validators.minLength(6)]] // Cambia contraseña → password
    });
    
  }

  async onSubmit() {
    if (this.loginForm.valid) {
      const { usuario, contraseña } = this.loginForm.value;

      try {
        // Llamamos al método login del servicio ProductService
        const response = await this.productService.login(usuario, contraseña);
        console.log('Login exitoso', response);
        this.router.navigate(['/home']);

        // Aquí puedes redirigir a otra página o manejar el flujo después del login
        // Ejemplo: this.router.navigate(['/home']);
      } catch (error) {
        console.error('Error en el login', error);
        // Aquí puedes mostrar un mensaje de error al usuario
      }
    }
  }
}
