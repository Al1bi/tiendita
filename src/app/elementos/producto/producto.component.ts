import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Producto } from '../../interfaces/product';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-producto',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.scss'
})
export class ProductoComponent {
  @Input() producto!: Producto;
  stars: number[] = [1, 2, 3, 4, 5];
}
