import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { DetallePedido } from "../interfaces/order-detail";

@Injectable({
  providedIn: 'root'
})
export class DetallePedidoService {
  url = 'http://localhost:3000/api-tiendita/detalles_pedido';
  constructor( private http: HttpClient ){
  }


  agregarDetalle(detail: DetallePedido): Observable<DetallePedido> {
    return this.http.post<DetallePedido>(this.url, detail);
  }

}
