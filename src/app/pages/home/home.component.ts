import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ProductoComponent } from "../../elementos/producto/producto.component";
import { Producto } from "../../interfaces/product";
import { ProductoService } from "../../servicios/producto.service";


import { map } from 'rxjs';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-tienda',
  standalone: true,
  imports: [RouterOutlet, RouterLink,
    ProductoComponent,
    CommonModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomeComponent {
  listaDeProductos: Producto[] = [];
  categorias: string[] = ["All", "Women's", "Men's", "Jewelry", "Electronics"];
  categoriaSeleccionada: string = 'All';
  productoService: ProductoService = inject(ProductoService);

  mp: Map<string, string> = new Map();

  constructor() {

    this.mp.set("Women's", "women\'s clothing");
    this.mp.set("Men's", "men\'s clothing");
    this.mp.set("Jewelry", "jewelery");
    this.mp.set("Electronica", "electronics");

    // this.productoService.obtenerTodosLosProductos().subscribe(
    //   data => this.listaDeProductos = data
    // )
    this.productoService.obtenerTodosLosProductos().pipe(
      map(productos => {
        const totalProductos = productos.length;
        if (totalProductos >= 8) {
          console.log('Total de productos:', totalProductos);
          return [...productos.slice(0, 4), ...productos.slice(-4)];
        } else {
          console.log('Error al obtener productos:');
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
    // this.productoService.obtenerTodosLosProductos().subscribe(
    //   data => this.listaDeProductos = data
    // );
    this.productoService.obtenerTodosLosProductos().pipe(
      map(productos => {
        const totalProductos = productos.length;
        if (totalProductos >= 8) {
          return [...productos.slice(0, 10), ...productos.slice(-4)];
        } else {
          return [];
        }
      })
    ).subscribe(
      data => this.listaDeProductos = data
    );
  }

  filtrarProductos(categoria: string): void {
    this.categoriaSeleccionada = categoria;
    if (categoria === 'All') {
      this.obtenerProductos();
    } else {
      
      let value: string = this.mp.get(categoria) ?? 'All';

      this.productoService.obtenerProductosPorCategoria(value).subscribe(
        data => this.listaDeProductos = data
      );
    }
  }

}
