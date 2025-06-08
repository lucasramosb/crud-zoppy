import {
  Column,
  CreatedAt,
  DataType,
  Default,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { Client } from 'src/client/client.model';
import { MetodoPagamento, PedidoStatus } from './enum/pedido.enum';

@Table({
  tableName: 'pedido',
})
export class Pedido extends Model<Pedido> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id: string;

  @ForeignKey(() => Client)
  @Column({
    field: 'cliente_id',
    type: DataType.UUID,
    allowNull: false,
  })
  clienteId: string;

  @Column({
    field: 'data_pedido',
    type: DataType.DATE,
    allowNull: false,
    defaultValue: DataType.NOW,
  })
  dataPedido: Date;

  @Column({
    type: DataType.ENUM(...Object.values(PedidoStatus)),
    allowNull: false,
    defaultValue: PedidoStatus.PENDENTE,
  })
  status: PedidoStatus;

  @Column({
    field: 'valor_total',
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
  })
  valorTotal: number;

  @Column({
    field: 'metodo_pagamento',
    type: DataType.ENUM(...Object.values(MetodoPagamento)),
    allowNull: false,
  })
  metodoPagamento: MetodoPagamento;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  observacoes: string;

  @CreatedAt
  @Column({ field: 'created_at' })
  createdAt: Date;

  @UpdatedAt
  @Column({ field: 'updated_at' })
  updatedAt: Date;
}
