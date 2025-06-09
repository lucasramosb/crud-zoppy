import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PedidoFormComponent } from '../../components/pedido-form/pedido-form.component';
import { Pedido } from '../../../core/models/pedidos.model';
import { PedidoService } from '../../../core/services/pedidos.service';

@Component({
  selector: 'app-pedido-edit-page',
  standalone: true,
  imports: [CommonModule, PedidoFormComponent],
  templateUrl: './pedido-edit-page.component.html',
})
export class PedidoEditPageComponent implements OnInit {
  pedido: Pedido | null = null;
  isLoading = true;
  pedidoId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pedidoService: PedidoService
  ) {}

  ngOnInit(): void {
    this.pedidoId = this.route.snapshot.paramMap.get('id');
    if (!this.pedidoId) {
      console.error('ID do pedido não encontrado na rota');
      this.router.navigate(['/pedidos']);
      return;
    }
    this.loadPedido(this.pedidoId);
  }

  loadPedido(id: string): void {
    this.isLoading = true;
    this.pedidoService.getById(id).subscribe({
      next: (data: Pedido) => {
        this.pedido = data;
        this.isLoading = false;
      },
      error: (err: any) => {
        console.error('Erro ao carregar pedido:', err);
        this.isLoading = false;
        this.router.navigate(['/pedidos']);
      },
    });
  }

  handleFormSubmit(pedidoData: Partial<Pedido>): void {
    if (!this.pedidoId) {
      console.error('ID do pedido é nulo, não é possível atualizar.');
      return;
    }
    this.pedidoService.update(this.pedidoId, pedidoData).subscribe({
      next: () => {
        this.router.navigate(['/pedidos']);
      },
      error: (err: any) => {
        console.error('Erro ao atualizar pedido:', err);
      },
    });
  }

  goBackToList(): void {
    this.router.navigate(['/pedidos']);
  }
}
