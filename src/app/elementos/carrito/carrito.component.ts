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
  items: { product: Producto, quantity: number }[] = [];
  total = 0;
  message: string | null = null;

  ngOnInit() {
    this.items = DetallesComponent.carrito;
    this.CalcularTotal();
  }

  eliminarProducto(product: Producto) {
    const index = this.items.findIndex(item => item.product.id === product.id);
    if (index > -1) {
      this.items.splice(index, 1);
      DetallesComponent.carrito = this.items;
    }
    this.CalcularTotal();
  }

  CalcularTotal() {
     this.total = this.items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  }

  showMessage(message: string) {
    this.message = message;
    setTimeout(() => this.message = null, 3000); 
  }
  onCantidadChange(event: any, item: { product: Producto, quantity: number }) {
    item.quantity = parseInt(event.target.value, 10); 
    this.CalcularTotal();return 
  }
  confirmarCompra() {
    alert('Compra confirmada. ¡Gracias por tu compra!');
    this.items = [];
    this.CalcularTotal();
  }
}
