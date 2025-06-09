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
import Swal from 'sweetalert2';

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
    Swal.fire({
      title: 'Você tem certeza?',
      text: 'Esta ação não pode ser desfeita!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, deletar!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.pedidoService.delete(id).subscribe({
          next: () => {
            this.deleted.emit(id);
            Swal.fire(
              'Deletado!',
              'O pedido foi deletado com sucesso.',
              'success'
            );
          },
          error: (err) => {
            console.error('Erro ao excluir pedido:', err);
            Swal.fire('Erro!', 'Ocorreu um erro ao deletar o pedido.', 'error');
          },
        });
      }
    });
  }

  viewDetails(pedido: Pedido): void {
    this.viewDetailsClicked.emit(pedido);
  }
}
