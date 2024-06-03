import { Component,inject} from '@angular/core';
import { ProductoComponent } from "../../elementos/producto/producto.component";
import { Producto } from "../../interfaces/product";
import { ProductoService } from "../../servicios/producto.service";
import { CommonModule } from '@angular/common';
import { map } from 'rxjs';
@Component({
  selector: 'app-jewelwry',
  standalone: true,
  imports: [ProductoComponent,
    CommonModule],
  templateUrl: './jewelwry.component.html',
  styleUrl: './jewelwry.component.scss'
})
export class JewelwryComponent {
  listaDeProductos: Producto[] = [];
  categoriaSeleccionada: string = 'jewelery ';
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
      this.productoService.obtenerProductosPorCategoria('jewelery').subscribe(
        data => this.listaDeProductos = data);
  }

}
