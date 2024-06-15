import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Producto} from "../interfaces/product";


@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  url = 'http://localhost:3000/api-tiendita/productos';
  constructor( private http: HttpClient ){
  }


  obtenerTodosLosProductos(): Observable<Producto[]>{
    return this.http.get<Producto[]>(this.url)
  }
  obtenerProductoPorId(id: number): Observable<Producto> { 
   // Debería devolver Observable<Producto>
    return this.http.get<Producto>(this.url+'/'+id)  // Usar template literals para concatenar id
  }

  obtenerProductosPorCategoria(categoria: string): Observable<Producto[]> {
    console.log(this.url+'/categoria/'+categoria)
    return this.http.get<Producto[]>(this.url+'/categoria/'+categoria);
  }

  agregarProducto(producto: Producto): Observable<Producto> {
    return this.http.post<Producto>(this.url, producto);
  }

}
