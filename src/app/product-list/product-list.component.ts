import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { CommonModule } from '@angular/common';  // Importa CommonModule
import { RouterLink } from '@angular/router'; // Importa RouterLink

@Component({
  selector: 'app-product-list',
  standalone: true,  // Definimos HomeComponent como standalone si es necesario
  imports: [CommonModule,RouterLink],  // Importa CommonModule para usar *ngFor

  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  seasonProducts: any[] = [];
  bestSellers: any[] = [];

  constructor(private productService: ProductService) {}

  async ngOnInit(): Promise<void> {
    // Cargar productos al iniciar el componente
    this.seasonProducts =await  this.productService.getSeasonProducts();
    console.log(this.seasonProducts);
    this.bestSellers = await this.productService.getBestSellers();
  }

  addToCart(product: any): void {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
  
    // Buscamos si el producto ya está en el carrito
    const existingProduct = cart.find((item: any) => item.name === product.name && item.description === product.description);
  
    if (existingProduct) {
      // Si el producto ya existe, solo incrementamos la cantidad
      existingProduct.quantity += 1;
    } else {
      // Si el producto no existe, lo agregamos con cantidad 1
      product.quantity = 1;
      cart.push(product);
    }
  
    // Guardamos el carrito actualizado
    localStorage.setItem('cart', JSON.stringify(cart));
  
    const goToCart = window.confirm('Producto agregado al carrito. ¿Quieres ir al carrito?');
    if (goToCart) {
      window.location.href = '/cart'; // Redirige al carrito
    }
  }
  
  
}
