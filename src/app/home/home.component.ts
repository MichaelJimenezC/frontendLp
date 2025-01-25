import { Component } from '@angular/core';
import { ProductListComponent } from '../product-list/product-list.component'; // Importa ProductListComponent

@Component({
  selector: 'app-home',
  imports: [ProductListComponent],
  standalone: true,  // Definimos HomeComponent como standalone si es necesario

  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
