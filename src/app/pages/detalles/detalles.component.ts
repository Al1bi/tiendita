import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Producto } from '../../interfaces/product';
import { ProductoService } from '../../servicios/producto.service';

@Component({
  selector: 'app-detalles',
  standalone: true,
  imports: [],
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.scss']
})
export class DetallesComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  productoService: ProductoService = inject(ProductoService);
  detalleProducto: Producto | undefined;
  static carrito: Producto[] = []; 
  constructor() {
    const idProducto = Number(this.route.snapshot.paramMap.get('id'));
    this.productoService.obtenerProductoPorId(idProducto).subscribe(
      data => this.detalleProducto = data
    );
  }

  AnadirProducto(product: Producto | undefined) {
    if (product) {
      DetallesComponent.carrito.push(product); 
    } else {
      console.error('Producto no encontrado.');
    }
  }
}
