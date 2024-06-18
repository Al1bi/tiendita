import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Producto } from "../../interfaces/product";
import { ProductoService } from "../../servicios/producto.service";

@Component({
  selector: 'app-new-product',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-product.component.html',
  styleUrl: './new-product.component.scss'
})
export class NewProductComponent {
  nuevoProducto: Producto = {
    id: 0,
    title: '',
    price: 0,
    description: '',
    image: '',
    category: '',
    rate: 0,
    count: 1
  };

  constructor(private productoService: ProductoService) {}

  @Output() newProductAdded: EventEmitter<Producto> = new EventEmitter<Producto>();
  agregarProducto(): void {
    this.productoService.agregarProducto(this.nuevoProducto).subscribe(
      response => {
        console.log('Producto agregado:', response);
        this.newProductAdded.emit(response);
        this.showMessage("Producto registrado");
        
      },
      error => {
        console.error('Error al agregar producto:', error);
        this.showMessage("Error al registrar producto");
      }
    );
  }

  showMessage(message: string) {
    alert(message); 
  }

}
