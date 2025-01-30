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
  shippingCost: number = 0; // dejaremos por defecto envío gratuito
  getTotalItems(): number {
    return this.cartItems.reduce((total, product) => total + product.quantity, 0);
  }
  getSubtotal(): number {
    return this.cartItems.reduce((subtotal, product) => subtotal + (product.price * product.quantity), 0);
  }
  getTax(): number {
    return this.getSubtotal() * 0.15;
  }
  getTotal(): number {
    return this.getSubtotal() + this.getTax() + this.shippingCost;
  }
  setShippingCost(cost: number): void {
    this.shippingCost = cost;
  }
  updateCart(): void {
    console.log('Carrito actualizado:', this.cartItems);
  }


}
