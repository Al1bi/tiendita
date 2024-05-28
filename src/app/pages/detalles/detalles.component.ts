import { Component, inject } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Producto} from "../../interfaces/product";
import {ProductoService} from "../../servicios/producto.service";


@Component({
selector: 'app-detalles',
standalone: true,
imports: [],
templateUrl: './detalles.component.html',
styleUrl: './detalles.component.scss'
})
export class DetallesComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  productoService: ProductoService = inject(ProductoService);
  detalleProducto: Producto | undefined;
  constructor() {
    const idProducto = Number(this.route.snapshot.params['id']);
    this.productoService.obtenerProductoPorId(idProducto).subscribe(
      data => this.detalleProducto = data
    )
  }
}