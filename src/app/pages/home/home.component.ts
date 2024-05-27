import { Component, inject } from '@angular/core';
import { ProductoComponent } from "../../elementos/producto/producto.component";
import { Producto } from "../../interfaces/product";
import { ProductoService } from "../../servicios/producto.service";
import { CommonModule } from '@angular/common';


import { map } from 'rxjs';

@Component({
  selector: 'app-tienda',
  standalone: true,
  imports: [
    ProductoComponent,
    CommonModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomeComponent {
  listaDeProductos: Producto[] = [];
  categorias: string[] = ['All', 'women\'s clothing', 'men\'s clothing', 'jewelery', 'electronics'];
  categoriaSeleccionada: string = 'All';
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

  ngOnInit(): void {
    this.obtenerProductos();
  }

  obtenerProductos(): void {
    this.productoService.obtenerTodosLosProductos().subscribe(
      data => this.listaDeProductos = data
    );
  }

  filtrarProductos(categoria: string): void {
    this.categoriaSeleccionada = categoria;
    if (categoria === 'All') {
      this.obtenerProductos();
    } else {
      this.productoService.obtenerProductosPorCategoria(categoria).subscribe(
        data => this.listaDeProductos = data
      );
    }
  }

}
