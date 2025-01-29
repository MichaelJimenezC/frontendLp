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
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
  
    const goToCart = window.confirm('Producto agregado al carrito. ¿Quieres ir al carrito?');
    if (goToCart) {
      window.location.href = '/cart'; // Redirige al carrito
    }
  }
  
}
