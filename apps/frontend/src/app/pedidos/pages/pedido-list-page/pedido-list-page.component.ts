import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PedidoListComponent } from '../../components/pedido-list/pedido-list.component';
import { PedidoModalComponent } from '../../components/pedido-modal/pedido-modal.component';
import { PedidoViewModalComponent } from '../../components/pedido-view-modal/pedido-view-modal.component';
import { Pedido } from '../../../core/models/pedidos.model';
import { PedidoService } from '../../../core/services/pedidos.service';

@Component({
  selector: 'app-pedido-list-page',
  standalone: true,
  imports: [
    CommonModule,
    PedidoListComponent,
    PedidoModalComponent,
    PedidoViewModalComponent,
  ],
  templateUrl: './pedido-list-page.component.html',
})
export class PedidoListPageComponent implements OnInit {
  pedidos: Pedido[] = [];
  isLoading = true;

  isNewPedidoModalOpen = false;

  isViewPedidoModalOpen = false;
  selectedPedidoForView: Pedido | null = null;

  constructor(private pedidoService: PedidoService) {}

  ngOnInit(): void {
    this.loadPedidos();
  }

  loadPedidos(): void {
    this.isLoading = true;
    this.pedidoService.getAll().subscribe({
      next: (data) => {
        this.pedidos = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erro ao carregar pedidos', err);
        this.isLoading = false;
      },
    });
  }

  openNewPedidoModal(): void {
    this.isNewPedidoModalOpen = true;
  }

  closeNewPedidoModal(): void {
    this.isNewPedidoModalOpen = false;
  }

  handleSaveNewPedido(pedidoData: Partial<Pedido>): void {
    this.pedidoService.create(pedidoData).subscribe({
      next: () => {
        this.loadPedidos();
        this.closeNewPedidoModal();
      },
      error: (err) => {
        console.error('Erro ao criar pedido:', err);
      },
    });
  }

  openViewPedidoModal(pedido: Pedido): void {
    this.selectedPedidoForView = pedido;
    this.isViewPedidoModalOpen = true;
  }

  closeViewPedidoModal(): void {
    this.isViewPedidoModalOpen = false;
    this.selectedPedidoForView = null;
  }

  handlePedidoDeleted(): void {
    this.loadPedidos();
  }
}
