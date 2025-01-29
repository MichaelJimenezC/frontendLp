import { Component } from '@angular/core';

@Component({
  selector: 'app-product-detail',
  imports: [],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent {
  product:any;
  ngOnInit(): void {
    this.product = history.state.product;
    console.log(this.product)
  }
  addToCart(product: any): void {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
  
    const goToCart = window.confirm('Producto agregado al carrito. ¿Quieres ir al carrito?');
    if (goToCart) {
      window.location.href = '/cart'; // Redirige al carrito
    }
  }
}
