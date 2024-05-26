import { Component, Input } from '@angular/core';
import { Producto } from '../../interfaces/product';

@Component({
  selector: 'app-producto',
  standalone: true,
  imports: [],
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.scss'
})
export class ProductoComponent {
  @Input() producto!: Producto;
}
