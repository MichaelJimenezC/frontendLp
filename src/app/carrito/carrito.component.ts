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
  subtotal: number = 0;
  tax: number = 0;
  total: number = 0;
  shippingCost: number = 0;
  product: any;
  constructor() { }

  ngOnInit() {
    this.cartItems = JSON.parse(localStorage.getItem('cart') || '[]');

    this.calculateCart();
  }

  // Método para calcular el total de productos, subtotal, impuesto y total
  calculateCart() {
    let totalItems = 0;
    let subtotal = 0;

    // Calculamos el subtotal y la cantidad total de productos
    this.cartItems.forEach(item => {
      const price = parseFloat(item.price.replace('$', '').replace(',', '')); // Convertir precio de string a número
      totalItems += item.quantity || 1;
      subtotal += price * (item.quantity || 1);
    });

    this.subtotal = subtotal;
    this.tax = subtotal * 0.15; // 15% de IVA
    this.total = subtotal + this.tax + this.shippingCost; // Total = Subtotal + Impuesto + Envío
  }

  // Método para actualizar la cantidad de productos
  updateQuantity(product: any, event: any) {
    const quantity = event.target.value;
    product.quantity = quantity;
    this.calculateCart(); // Recalcular el carrito después de actualizar cantidad
    this.saveCart();
  }

  // Guardar el carrito en localStorage
  saveCart() {
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
  }

  // Método para eliminar un producto
  removeFromCart1(product: any) {
    const index = this.cartItems.indexOf(product);
    if (index > -1) {
      this.cartItems.splice(index, 1);
    }
    this.calculateCart(); // Recalcular el carrito después de eliminar producto
    this.saveCart();
  }

  // Método para obtener el total de artículos
  totalItems() {
    return this.cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0);
  }

  // Método para ajustar el costo de envío
  setShippingCost(cost: number) {
    this.shippingCost = cost;
    this.calculateCart(); // Recalcular el carrito después de cambiar el envío
  }

}
