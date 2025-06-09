import { Client } from './client.model';

export enum PedidoStatus {
  PENDENTE = 'pendente',
  PAGO = 'pago',
  ENVIADO = 'enviado',
  CANCELADO = 'cancelado',
}

export enum MetodoPagamento {
  BOLETO = 'boleto',
  CARTAO_CREDITO = 'cartao_credito',
  PIX = 'pix',
}

export interface Pedido {
  id: string;
  clienteId: string;
  cliente?: Client;
  dataPedido: string | Date;
  status: PedidoStatus;
  valorTotal: number;
  metodoPagamento: MetodoPagamento;
  observacoes?: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}
