import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PedidoFormComponent } from '../pedido-form/pedido-form.component';
import { Pedido } from '../../../core/models/pedidos.model';

@Component({
  selector: 'app-pedido-modal',
  standalone: true,
  imports: [CommonModule, PedidoFormComponent],
  templateUrl: './pedido-modal.component.html',
})
export class PedidoModalComponent {
  @Input() open: boolean = false;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<Partial<Pedido>>();

  handleClose(): void {
    this.close.emit();
  }

  handleFormSubmit(formData: Partial<Pedido>): void {
    this.save.emit(formData);
  }
}
