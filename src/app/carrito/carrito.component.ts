import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../product.service';

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
  
  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.loadCart();
    this.calculateCart();
  }

  // Cargar carrito desde localStorage
  loadCart() {
    const storedCart = localStorage.getItem('cart');
    this.cartItems = storedCart ? JSON.parse(storedCart) : [];
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

  // Método para agregar o actualizar un producto en el carrito
  addToCart(product: any) {
    const existingProduct = this.cartItems.find(item => item.name === product.name && item.description === product.description);

    if (existingProduct) {
      // Si el producto ya existe, solo incrementamos la cantidad
      existingProduct.quantity += 1;
    } else {
      // Si el producto no existe, lo agregamos al carrito con cantidad 1
      this.cartItems.push({ ...product, quantity: 1 });
    }

    this.calculateCart(); // Recalcular el carrito después de agregar o actualizar el producto
    this.saveCart();
  }

  // Método para actualizar la cantidad de productos
  updateQuantity(product: any, event: any) {
    const quantity = parseInt(event.target.value, 10); // Obtener el valor de la cantidad
    if (quantity > 0) {
      product.quantity = quantity; // Asignar la nueva cantidad
      this.calculateCart(); // Recalcular el carrito después de actualizar cantidad
      this.saveCart();
    }
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
  realizarPago(): void {
    const userId = localStorage.getItem('userId');

    if (!userId) {
      alert('Debes iniciar sesión para realizar el pago.');
      return;
    }

    this.productService.pagar({
      user_id: userId,
      products: this.cartItems, // Corregido (antes estaba `this.carrito`)
      total: this.total // Usamos `this.total` en vez de `this.calcularTotal()`
    })
    .then(response => {
      console.log('Pago exitoso:', response);
      alert('Pago realizado con éxito');
      this.cartItems = []; // Vaciar el carrito tras el pago exitoso
      localStorage.removeItem('cart'); // Limpiar el carrito en localStorage
    })
    .catch(error => {
      console.error('Error en el pago:', error);
      alert('Hubo un error al procesar el pago.');
    });
  }

}
