import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-carrito',
  imports: [CommonModule],
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css'
})
export class CarritoComponent implements OnInit {
  cartItems: any[] = [];

  product: any;
  ngOnInit(): void {
    this.loadCart(); // Cargar los productos del carrito al inicializar el componente
  }

  loadCart(): void {
    this.cartItems = JSON.parse(localStorage.getItem('cart') || '[]'); // Obtener el carrito del localStorage
  }

  removeFromCart(productId: number): void {
    this.cartItems = this.cartItems.filter(item => item.id !== productId); // Eliminar producto
    localStorage.setItem('cart', JSON.stringify(this.cartItems)); // Guardar el carrito actualizado
  }
}
