import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Producto } from '../../interfaces/product';
import { ProductoService } from '../../servicios/producto.service';

@Component({
  selector: 'app-detalles',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.scss']
})
export class DetallesComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  productoService: ProductoService = inject(ProductoService);
  
  // detalleProducto: Producto | undefined;
 
  detalleProducto: Producto = {
    id: 0,
    title: '',
    price: 0,
    description: '',
    category: '',
    image: '',
    rate: 0, // valor predeterminado
    count: 0
  };

  static carrito: { product: Producto, quantity: number }[] = [];
  cantidad: number = 1;
  stars: number[] = [1, 2, 3, 4, 5];
  constructor() {
  
    const idProducto = Number(this.route.snapshot.paramMap.get('id'));
    console.log(idProducto);
    this.productoService.obtenerProductoPorId(idProducto).subscribe(
      data => {
        this.detalleProducto = data;
        console.log(this.detalleProducto); 
      }
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
