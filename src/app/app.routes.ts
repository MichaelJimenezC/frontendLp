import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component'; // Importa el componente Home
import { ProductDetailComponent } from './product-detail/product-detail.component'; // Importa el componente de detalle
import { CarritoComponent } from './carrito/carrito.component'; // Importa el componente Carrito

export const routes: Routes = [
  { path: '', component: HomeComponent }, // Ruta raíz para Home
  { path: 'product/:id', component: ProductDetailComponent }, // Ruta para el detalle del producto
  { path: 'cart', component: CarritoComponent }, // Ruta para el carrito

];
