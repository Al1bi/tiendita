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
  static carrito: { product: Producto, quantity: number }[] = [];
  cantidad: number = 1;

  constructor() {
  
    const idProducto = Number(this.route.snapshot.paramMap.get('id'));
    this.productoService.obtenerProductoPorId(idProducto).subscribe(
      data => this.detalleProducto = data
    );
  }

  AnadirProducto(product: Producto | undefined, cantidad: number) {
    if (product) {
      const existingItem = DetallesComponent.carrito.find(item => item.product.id === product.id);
      if (existingItem) {
        existingItem.quantity += cantidad;
      } else {
        DetallesComponent.carrito.push({ product, quantity: cantidad });
      }
      this.showMessage('Producto agregado');
    } else {
      console.error('Producto no encontrado.');
    }
  }
  onCantidadChange(event: any) {
    this.cantidad = parseInt(event.target.value, 10); 
  }

  showMessage(message: string) {
    alert(message); 
  }
}
