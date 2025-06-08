import { Module } from '@nestjs/common';
import { PedidoService } from './pedido.service';
import { PedidoController } from './pedido.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Pedido } from './pedido.model';
import { Client } from 'src/client/client.model';

@Module({
  imports: [SequelizeModule.forFeature([Pedido, Client])],
  controllers: [PedidoController],
  providers: [PedidoService],
})
export class PedidoModule {}
