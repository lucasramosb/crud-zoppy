import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Client } from '../../../core/models/client.model';
import { ClientService } from '../../../core/services/client.service';
import {
  MetodoPagamento,
  Pedido,
  PedidoStatus,
} from '../../../core/models/pedidos.model';

@Component({
  selector: 'app-pedido-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './pedido-form.component.html',
})
export class PedidoFormComponent implements OnInit {
  @Input() pedido: Pedido | null = null;
  @Output() formSubmitted = new EventEmitter<Partial<Pedido>>();
  @Output() cancelled = new EventEmitter<void>();

  pedidoForm!: FormGroup;
  clients: Client[] = [];
  pedidoStatusOptions = Object.values(PedidoStatus);
  metodoPagamentoOptions = Object.values(MetodoPagamento);

  constructor(private fb: FormBuilder, private clientService: ClientService) {}

  ngOnInit(): void {
    this.loadClients();
    this.pedidoForm = this.fb.group({
      clienteId: [this.pedido?.clienteId || '', Validators.required],
      dataPedido: [
        this.formatDateForInput(this.pedido?.dataPedido),
        Validators.required,
      ],
      status: [
        this.pedido?.status || PedidoStatus.PENDENTE,
        Validators.required,
      ],
      valorTotal: [
        this.pedido?.valorTotal || 0,
        [Validators.required, Validators.min(0.01)],
      ],
      metodoPagamento: [
        this.pedido?.metodoPagamento || '',
        Validators.required,
      ],
      observacoes: [this.pedido?.observacoes || ''],
    });
  }

  loadClients(): void {
    this.clientService.getAll().subscribe((data) => (this.clients = data));
  }

  private formatDateForInput(dateInput?: string | Date): string {
    if (!dateInput) return new Date().toISOString().split('T')[0];
    const date = new Date(dateInput);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }

  onSubmit(): void {
    if (this.pedidoForm.valid) {
      const formValue = this.pedidoForm.value;
      const submissionData: Partial<Pedido> = {
        ...formValue,
        valorTotal: parseFloat(formValue.valorTotal),
      };
      this.formSubmitted.emit(submissionData);
    } else {
      console.error('Formulário inválido:', this.pedidoForm.errors);
      Object.values(this.pedidoForm.controls).forEach((control) => {
        control.markAsTouched();
      });
    }
  }

  onCancel(): void {
    this.cancelled.emit();
  }
}
