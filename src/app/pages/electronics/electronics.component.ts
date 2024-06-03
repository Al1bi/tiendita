import { Component,inject} from '@angular/core';
import { ProductoComponent } from "../../elementos/producto/producto.component";
import { Producto } from "../../interfaces/product";
import { ProductoService } from "../../servicios/producto.service";
import { CommonModule } from '@angular/common';
import { map } from 'rxjs';
@Component({
  selector: 'app-electronics',
  standalone: true,
  imports: [ProductoComponent,
    CommonModule],
  templateUrl: './electronics.component.html',
  styleUrl: './electronics.component.scss'
})
export class ElectronicsComponent {
  listaDeProductos: Producto[] = [];
  categoriaSeleccionada: string = 'electronics';
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
      this.productoService.obtenerProductosPorCategoria('electronics').subscribe(
        data => this.listaDeProductos = data);
  }

}
