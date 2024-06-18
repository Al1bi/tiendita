import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { Pedido } from '../interfaces/order';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  url = 'http://localhost:3000/api-tiendita/pedidos';
  constructor( private http: HttpClient ){
  }


  obtenerTodosLosPedidos(): Observable<Pedido[]>{
    return this.http.get<Pedido[]>(this.url)
  }


  agregarPedido(order: Pedido): Observable<Pedido> {
    return this.http.post<Pedido>(this.url, order);
  }

}
