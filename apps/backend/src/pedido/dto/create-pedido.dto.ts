import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  Min,
} from 'class-validator';
import { MetodoPagamento, PedidoStatus } from '../enum/pedido.enum';

export class CreatePedidoDto {
  @IsUUID()
  @IsNotEmpty()
  clienteId: string;

  @IsOptional()
  @IsDateString()
  dataPedido?: Date;

  @IsEnum(PedidoStatus)
  @IsOptional()
  status?: PedidoStatus;

  @IsNumber()
  @Min(0)
  valorTotal: number;

  @IsEnum(MetodoPagamento)
  metodoPagamento: MetodoPagamento;

  @IsOptional()
  @IsString()
  @MaxLength(1000)
  observacoes?: string;
}
