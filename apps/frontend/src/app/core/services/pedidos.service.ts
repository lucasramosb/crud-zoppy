import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pedido } from '../models/pedidos.model';

@Injectable({ providedIn: 'root' })
export class PedidoService {
  private baseUrl = 'http://localhost:3000/pedido';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(this.baseUrl);
  }

  getById(id: string): Observable<Pedido> {
    return this.http.get<Pedido>(`${this.baseUrl}/${id}`);
  }

  create(pedido: Partial<Pedido>): Observable<Pedido> {
    return this.http.post<Pedido>(this.baseUrl, pedido);
  }

  update(id: string, pedido: Partial<Pedido>): Observable<Pedido> {
    return this.http.patch<Pedido>(`${this.baseUrl}/${id}`, pedido);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
