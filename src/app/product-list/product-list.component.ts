import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { CommonModule } from '@angular/common';  // Importa CommonModule

@Component({
  selector: 'app-product-list',
  standalone: true,  // Definimos HomeComponent como standalone si es necesario
  imports: [CommonModule],  // Importa CommonModule para usar *ngFor

  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  seasonProducts: any[] = [];
  bestSellers: any[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    // Cargar productos al iniciar el componente
    this.seasonProducts = this.productService.getSeasonProducts();
    this.bestSellers = this.productService.getBestSellers();
  }
}
