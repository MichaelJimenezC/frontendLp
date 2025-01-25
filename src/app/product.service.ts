import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor() { }

  // Este método simula una llamada a una API
  getSeasonProducts() {
    return [
      { img: "assets/product1.png", views: "100k", seller: "ALS STORE", price: "MEX $15.00" },
      { img: "assets/product2.png", views: "5.0k", seller: "Carlos Pasa", price: "MEX $18.00" },
      { img: "assets/product3.png", views: "20k", seller: "Tiendas XYZ", price: "MEX $25.00" }
    ];
  }

  getBestSellers() {
    return [
      { img: "assets/product4.png", views: "10k", seller: "Store 123", price: "MEX $12.00" },
      { img: "assets/product5.png", views: "200k", seller: "SuperStore", price: "MEX $30.00" },
      { img: "assets/product6.png", views: "50k", seller: "El Buen Precio", price: "MEX $22.00" }
    ];
  }
}
