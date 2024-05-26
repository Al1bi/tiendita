import { Component, inject } from '@angular/core';
import {ProductoComponent} from "../../elementos/producto/producto.component";
import {Producto} from "../../interfaces/product";
import {ProductoService} from "../../servicios/producto.service";


  @Component({
  selector: 'app-tienda',
  standalone: true,
  imports: [
    ProductoComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  listaDeProductos: Producto[] = [];
  productoService: ProductoService = inject(ProductoService);
  constructor() {
    this.productoService.obtenerTodosLosProductos().subscribe(
      data => this.listaDeProductos = data
    )
  }
}
