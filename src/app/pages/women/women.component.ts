import { Component,inject } from '@angular/core';
import { ProductoComponent } from "../../elementos/producto/producto.component";
import { Producto } from "../../interfaces/product";
import { ProductoService } from "../../servicios/producto.service";
import { CommonModule } from '@angular/common';
import { map } from 'rxjs';
@Component({
  selector: 'app-women',
  standalone: true,
  imports: [ProductoComponent,
    CommonModule],
  templateUrl: './women.component.html',
  styleUrl: './women.component.scss'
})
export class WomenComponent {
  listaDeProductos: Producto[] = [];
  categoriaSeleccionada: string = 'women\'s clothing';
  productoService: ProductoService = inject(ProductoService);
  constructor() {
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
    this.obtenerMenProductos();
  }

  obtenerMenProductos(): void {
      this.productoService.obtenerProductosPorCategoria('women\'s clothing').subscribe(
        data => this.listaDeProductos = data);
  }

}

