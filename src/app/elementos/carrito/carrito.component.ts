import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Producto } from '../../interfaces/product'; 
import { DetallesComponent } from '../../pages/detalles/detalles.component';
@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss']
})
export class CarritoComponent implements OnInit {
  items: Producto[] = [];
  total=0;

  ngOnInit() {
    this.items = DetallesComponent.carrito; 
    this.CalcularTotal();
  }
  eliminarProducto(product: Producto) {
    const index = this.items.indexOf(product);
    if (index > -1) {
      this.items.splice(index, 1); 
      DetallesComponent.carrito = this.items; 
    }
    this.CalcularTotal();
  }
  CalcularTotal() {
    this.total = this.items.reduce((acc, item) => acc + item.price, 0); // Calcular el total sumando los precios de los productos
  }
}
