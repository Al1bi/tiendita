import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Producto } from "../../interfaces/product";
import { ProductoService } from "../../servicios/producto.service";


@Component({
  selector: 'app-new-product',
  standalone: true,
  imports: [FormsModule, CommonModule],
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
    rate: 5,
    count: 10
  };

  cats = ["All", "Women's", "Men's", "Jewelry", "Electronics", "Cosmetics"];

  mpV = new Map([
    ['All', 'all'],
    ["Women's", "women\'s clothing"],
    ["Men's", "men\'s clothing"],
    ["Electronics", "electronics"],
    ["Cosmetics", 'cosmetics'],
    ["Jewelry", "jewelery"]
  ])

  constructor(private productoService: ProductoService) {
    console.log('Cats:', this.cats);
  }

  @Output() newProductAdded: EventEmitter<Producto> = new EventEmitter<Producto>();
  agregarProducto(): void {
    this.productoService.agregarProducto(this.nuevoProducto).subscribe(
      response => {
        console.log('Producto agregado:', response);
        this.newProductAdded.emit(response);
        this.showMessage("Producto registrado");
        this.nuevoProducto.title = '';
        this.nuevoProducto.price = 0;
        this.nuevoProducto.description = '';
        this.nuevoProducto.image = '';
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
