import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Router } from '@angular/router';
import {
  CommonModule,
  CurrencyPipe,
  DatePipe,
  TitleCasePipe,
} from '@angular/common';
import { Pedido } from '../../../core/models/pedidos.model';
import { PedidoService } from '../../../core/services/pedidos.service';

@Component({
  selector: 'app-pedido-list',
  standalone: true,
  imports: [CommonModule, DatePipe, CurrencyPipe, TitleCasePipe],
  templateUrl: './pedido-list.component.html',
})
export class PedidoListComponent implements OnInit {
  @Input() pedidos: Pedido[] = [];
  @Output() deleted = new EventEmitter<string>();
  @Output() viewDetailsClicked = new EventEmitter<Pedido>();

  constructor(private router: Router, private pedidoService: PedidoService) {}

  ngOnInit(): void {}

  editPedido(pedido: Pedido): void {
    this.router.navigate(['/pedidos/edit', pedido.id]);
  }

  deletePedido(id: string): void {
    this.pedidoService.delete(id).subscribe(() => {
      this.deleted.emit(id);
    });
  }

  viewDetails(pedido: Pedido): void {
    this.viewDetailsClicked.emit(pedido);
  }
}
