import { Component, Input, Output, EventEmitter } from '@angular/core';
import {
  CommonModule,
  CurrencyPipe,
  DatePipe,
  TitleCasePipe,
} from '@angular/common';
import { Pedido } from '../../../core/models/pedidos.model';

@Component({
  selector: 'app-pedido-view-modal',
  standalone: true,
  imports: [CommonModule, DatePipe, CurrencyPipe, TitleCasePipe],
  templateUrl: './pedido-view-modal.component.html',
})
export class PedidoViewModalComponent {
  @Input() open: boolean = false;
  @Input() pedido: Pedido | null = null;
  @Output() close = new EventEmitter<void>();

  handleClose(): void {
    this.close.emit();
  }
}
