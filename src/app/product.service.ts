import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  baseUrl: string = 'http://localhost/backend/public/';

  constructor() { }

  // Este método simula una llamada a una API
  async getSeasonProducts(): Promise<any[]> {
    const response = await fetch(this.baseUrl + 'products');
    const products: any[] = await response.json();  // Obtener los productos en formato JSON y asegurarnos que sea un arreglo
    console.log(products)
    // Transformamos los productos a la estructura requerida
    const formattedProducts = products.map((product: any) => ({
      img: `assets/product${product.id}.png`,  // Aquí debes ajustar la lógica para obtener las imágenes
      views: '100k',  // Este dato no está en la API, puedes reemplazarlo con algo real si lo necesitas
      seller: product.user?.name || 'ALS STORE',  // Aquí tomamos el nombre del vendedor desde la API (si está disponible)
      price: `$${product.price}`,  // Utilizamos el precio de la API
      name: product.name,
      description: product.description,
      user: product.user.name,
      fecha: product.created_at,
      category: product.category.name
    }));

    return formattedProducts;
  }


  async getBestSellers(): Promise<any[]> {
    const response = await fetch(this.baseUrl + 'products');
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

  // Método para hacer login
  async login(username: string, password: string): Promise<any> {
    // Simulación del usuario registrado
    const fakeUser = {
      id: 2,
      email: 'jeampierejimenez@gmail.com',
      password: 'Micha12el'
    };
  
    // Validamos las credenciales
    if (username === fakeUser.email && password === fakeUser.password) {
      // Guardamos el ID en localStorage
      localStorage.setItem('userId', fakeUser.id.toString());
      console.log('Login exitoso, ID guardado en localStorage:', fakeUser.id);
      return { message: 'Login exitoso', userId: fakeUser.id };
    } else {
      throw new Error('Credenciales incorrectas');
    }
  }
  
  
  // Método para hacer registro
  async register(username: string, password: string): Promise<any> {
    const response = await fetch(this.baseUrl + 'register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    });

    // Verifica si la respuesta es correcta (status 200)
    if (!response.ok) {
      throw new Error('Error al registrarse');
    }

    const data = await response.json();
    return data; // Retorna la respuesta que te dé el backend (usuario creado, mensaje de éxito, etc.)
  }
  async pagar(order: any): Promise<any> {
    const response = await fetch(this.baseUrl + 'pagar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(order),
    });
  
    if (!response.ok) {
      throw new Error('Error al procesar el pago');
    }
  
    const data = await response.json();
    return data; // Respuesta del backend
  }
  
}
