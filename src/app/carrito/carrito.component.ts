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
  subtotal: number = 0;
  tax: number = 0;
  total: number = 0;
  totalItems: number = 0;
  constructor() {
    this.updateCart();
  }

  updateCart(): void {
    this.totalItems = this.cartItems.reduce((total, product) => total + product.quantity, 0);
    this.subtotal = this.cartItems.reduce((subtotal, product) => subtotal + (product.price * product.quantity), 0);
    this.tax = this.subtotal * 0.15; // 15% de IVA
    this.total = this.subtotal + this.tax + this.shippingCost;
  }

  updateQuantity(product: any, event: any): void {
    const newQuantity = parseInt(event.target.value, 10);
    product.quantity = newQuantity > 0 ? newQuantity : 1;
    this.updateCart(); // Actualiza los cálculos cuando cambia la cantidad
  }

  setShippingCost(cost: number): void {
    this.shippingCost = cost;
    this.updateCart();
  }

  removeFromCart1(productToRemove: any): void {
    this.cartItems = this.cartItems.filter(product => product !== productToRemove);
    this.updateCart();
  }

}
