import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component'; // Importa ProductListComponent
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'frontendLp';
  constructor(private router: Router) {}
  ngOnInit(): void {
  }

  checkUser() {
    console.log("¡Click en el ícono!");

    const userId = localStorage.getItem('userId');
    console.log("checcckkkk")
    console.log(userId);
    if (userId) {
      // Si hay userId, redirige a subir
      this.router.navigate(['/subir']);
    } else {
      // Si no hay userId, redirige a login
      this.router.navigate(['/login']);
    }
  }
  goCarrito(){
    this.router.navigate(['/cart']);

  }
}
