import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PedidoService } from './pedido.service';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { Pedido } from './pedido.model';

@Controller('pedido')
export class PedidoController {
  constructor(private readonly pedidoService: PedidoService) {}

  @Post()
  create(@Body() createPedidoDto: CreatePedidoDto): Promise<Pedido> {
    return this.pedidoService.create(createPedidoDto);
  }

  @Get()
  findAll(): Promise<Pedido[]> {
    return this.pedidoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Pedido> {
    return this.pedidoService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePedidoDto: UpdatePedidoDto,
  ): Promise<Pedido> {
    return this.pedidoService.update(id, updatePedidoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.pedidoService.remove(id);
  }
}
