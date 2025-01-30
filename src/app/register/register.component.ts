import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-register',
  standalone: true, // ✅ Importante para usar imports en un componente standalone

  imports: [CommonModule, ReactiveFormsModule,RouterLink], // ✅ Importa los módulos aquí
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder,private productService: ProductService) {
    this.registerForm = this.fb.group({
      usuario: ['', [Validators.required]],
      contraseña: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  async onSubmit() {
    if (this.registerForm.valid) {
      const { usuario, contraseña } = this.registerForm.value;

    

      try {
        // Llamamos al método de registro del servicio ProductService
        const response = await this.productService.register(usuario, contraseña);
        console.log('Registro exitoso', response);
        // Aquí puedes redirigir a otra página o mostrar un mensaje
        // Ejemplo: this.router.navigate(['/login']);
      } catch (error) {
        console.error('Error en el registro', error);
        // Mostrar un mensaje de error si ocurre algún problema
      }
    }
  }
}
