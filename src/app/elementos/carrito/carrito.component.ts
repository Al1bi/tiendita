import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Pedido } from '../../interfaces/order';
import { DetallePedido } from '../../interfaces/order-detail';
import { Producto } from '../../interfaces/product';
import { DetallesComponent } from '../../pages/detalles/detalles.component';
import { DetallePedidoService } from '../../servicios/order-detail.service';
import { PedidoService } from '../../servicios/order.service';

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
  idPedido: number = 0;

  @Output() newPedidoAdded: EventEmitter<Pedido> = new EventEmitter<Pedido>();
  @Output() newDetalleAdded: EventEmitter<DetallePedido> = new EventEmitter<DetallePedido>();

  constructor(
    private pedidoService: PedidoService,
    private detalleService: DetallePedidoService
  ) {}

  ngOnInit() {
    this.items = DetallesComponent.carrito;
    
    for (let i = 0; i < this.items.length; i++) {
      console.log(this.items[i]);
    }

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
    this.CalcularTotal();
    return; 
  }

  AgregarDetalles(){
    let detalle: DetallePedido = {
      id: 0,
      id_pedido: 0, 
      id_producto: 0, 
      quantity: 0,
      price: 0 
    };

    detalle.id_pedido = this.idPedido;

    for (let i = 0; i < this.items.length; i++) {
      detalle.id_producto = this.items[i].product.id;
      detalle.price = this.items[i].product.price;
      detalle.quantity = this.items[i].quantity; 


      this.detalleService.agregarDetalle(detalle).subscribe(
        response => {
          this.newDetalleAdded.emit(response);
        },
        error => {
          console.error('Error al agregar pedido:', error);
          this.showMessage("Error al registrar pedido");
        }

      );

    }

    console.log(this.idPedido);
  }

  confirmarCompra() {
    alert('Compra confirmada. ¡Gracias por tu compra!');

    let nuevoPedido: Pedido = {
      id: 0,
      customer_name: 'Al1bi',
      customer_address: 'My casa',
      order_date: new Date(),
      total: 0
    };

    
    nuevoPedido.total = this.total;

    this.pedidoService.agregarPedido(nuevoPedido).subscribe(
      response => {
        console.log('Pedido agregado:', response);
        this.idPedido = response.id;
        this.newPedidoAdded.emit(response);
        this.showMessage("Pedido registrado");
        this.AgregarDetalles();
        DetallesComponent.carrito = this.items = [];
        this.CalcularTotal();
      },
      error => {
        console.error('Error al agregar pedido:', error);
        this.showMessage("Error al registrar pedido");
      }
    );

  }
}
