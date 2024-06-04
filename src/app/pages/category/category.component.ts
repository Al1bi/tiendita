import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { ProductoComponent } from '../../elementos/producto/producto.component';
import { Producto } from '../../interfaces/product';
import { ProductoService } from '../../servicios/producto.service';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [RouterOutlet, RouterLink, ProductoComponent, CommonModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})

export class CategoryComponent implements OnInit{
  listaDeProductos: Producto[] = [];
  category: string = "";
  
  title: string = "";
  productoService: ProductoService = inject(ProductoService);


  mpT = new Map([
    ['women', 'Women\'s'],
    ['men', 'Men\'s'],
    ['electronics', 'Electronics'],
    ['cosmetics', 'Cosmetics'],
    ['jewelry', 'Jewelry']
  ])

  mpC = new Map([
    ['women', "women\'s clothing"],
    ['men', "men\'s clothing"],
    ['electronics', "electronics"],
    ['cosmetics', 'cosmetics'],
    ['jewelry', "jewelery"]
  ])

  constructor(private route: ActivatedRoute){
  }

  ngOnInit(): void {  
    this.route.paramMap.subscribe(params =>{
      this.category = params.get('categoria') || "";
      this.title = this.mpT.get(this.category) || "";
    });
    this.obtenerProductos();
  }

  obtenerProductos(): void{
    let value: string = this.mpC.get(this.category) || "";
    this.productoService.obtenerProductosPorCategoria(value).subscribe(
      data => this.listaDeProductos = data
    );
  }

}
