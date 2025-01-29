import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  baseUrl: string = 'http://localhost/backend/public/';

  constructor() { }

  // Este método simula una llamada a una API
  async getSeasonProducts(): Promise<any[]> {
    const response = await fetch(this.baseUrl+'products');
    const products: any[] = await response.json();  // Obtener los productos en formato JSON y asegurarnos que sea un arreglo
    console.log(products)
    // Transformamos los productos a la estructura requerida
    const formattedProducts = products.map((product: any) => ({
      img: `assets/product${product.id}.png`,  // Aquí debes ajustar la lógica para obtener las imágenes
      views: '100k',  // Este dato no está en la API, puedes reemplazarlo con algo real si lo necesitas
      seller: product.user?.name || 'ALS STORE',  // Aquí tomamos el nombre del vendedor desde la API (si está disponible)
      price: `$${product.price}`,  // Utilizamos el precio de la API
      name:product.name,
      description:product.description,
      user:product.user.name,
      fecha:product.created_at
    }));
  
    return formattedProducts;
  }
  

  async getBestSellers(): Promise<any[]> {
    const response = await fetch(this.baseUrl+'products');
    const products: any[] = await response.json();  // Obtener los productos en formato JSON y asegurarnos que sea un arreglo
  
    // Transformamos los productos a la estructura requerida
    const formattedProducts = products.map((product: any) => ({
      img: `assets/product${product.id}.png`,  // Aquí debes ajustar la lógica para obtener las imágenes
      views: '100k',  // Este dato no está en la API, puedes reemplazarlo con algo real si lo necesitas
      seller: product.user?.name || 'ALS STORE',  // Aquí tomamos el nombre del vendedor desde la API (si está disponible)
      price: `MEX $${product.price}`  // Utilizamos el precio de la API
    }));
  
    return formattedProducts;
  }
}
