import { Component, inject } from '@angular/core';
import { ProductoComponent } from "../../elementos/producto/producto.component";
import { Producto } from "../../interfaces/product";
import { ProductoService } from "../../servicios/producto.service";


import { map } from 'rxjs';

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
    // this.productoService.obtenerTodosLosProductos().subscribe(
    //   data => this.listaDeProductos = data
    // )
    this.productoService.obtenerTodosLosProductos().pipe(
      map(productos => {
        const totalProductos = productos.length;
        if (totalProductos >= 8) {
          return [...productos.slice(0, 4), ...productos.slice(-4)];
        } else {
          return [];
        }
      })
    ).subscribe(
      data => this.listaDeProductos = data
    );
  }
}
