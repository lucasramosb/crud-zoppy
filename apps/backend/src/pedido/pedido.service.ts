import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Pedido } from './pedido.model';
import { Client } from 'src/client/client.model';

@Injectable()
export class PedidoService {
  constructor(
    @InjectModel(Pedido)
    private readonly pedidoModel: typeof Pedido,

    @InjectModel(Client)
    private readonly clientModel: typeof Client,
  ) {}

  async create(createPedidoDto: CreatePedidoDto): Promise<Pedido> {
    const cliente = await this.clientModel.findByPk(createPedidoDto.clienteId);
    if (!cliente) {
      throw new NotFoundException(
        `Cliente com ID ${createPedidoDto.clienteId} não encontrado.`,
      );
    }

    return this.pedidoModel.create(createPedidoDto);
  }

  async findAll(): Promise<Pedido[]> {
    return this.pedidoModel.findAll({
      include: [Client],
    });
  }

  async findOne(id: string) {
    const pedido = await this.pedidoModel.findByPk(id);
    if (!pedido) {
      throw new Error(`Pedido com ID ${id} não encontrado.`);
    }
    return pedido;
  }

  async update(id: string, updatePedidoDto: UpdatePedidoDto) {
    const pedido = await this.pedidoModel.findByPk(id);
    if (!pedido) {
      throw new Error(`Pedido com ID ${id} não encontrado.`);
    }
    await pedido.update(updatePedidoDto);
    return pedido;
  }

  async remove(id: string): Promise<void> {
    const pedido = await this.pedidoModel.findByPk(id);
    if (!pedido) {
      throw new Error(`Pedido com ID ${id} não encontrado.`);
    }
    await pedido.destroy();
  }
}
