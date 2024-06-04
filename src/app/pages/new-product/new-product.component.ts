import { Component, Output, EventEmitter } from '@angular/core';
import { ProductoService } from "../../servicios/producto.service";
import { Producto } from "../../interfaces/product";
import { FormsModule } from '@angular/forms';

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
    rating: {
      rate: 5,
      count: 1
    }
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
