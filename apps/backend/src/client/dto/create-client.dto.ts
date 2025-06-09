import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsOptional,
  IsDate,
  IsPhoneNumber,
  MinLength,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateClientDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @IsPhoneNumber('BR')
  telephone: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(11, { message: 'Documento inválido' })
  cpf_cnpj: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  birthdate?: Date;
}
