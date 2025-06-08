import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Client } from './client.model';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Injectable()
export class ClientService {
  constructor(
    @InjectModel(Client)
    private readonly clientModel: typeof Client,
  ) {}
  async create(createClientDto: CreateClientDto): Promise<Client> {
    return this.clientModel.create(createClientDto);
  }

  findAll(): Promise<Client[]> {
    return this.clientModel.findAll();
  }

  async findOne(id: string): Promise<Client> {
    const client = await this.clientModel.findByPk(id);
    if (!client) {
      throw new NotFoundException(`Cliente com ID ${id} não encontrado.`);
    }
    return client;
  }

  async update(id: string, updateClientDto: UpdateClientDto): Promise<Client> {
    const client = await this.findOne(id);
    return client.update(updateClientDto);
  }

  async remove(id: string): Promise<void> {
    const client = await this.findOne(id);
    if (!client) {
      throw new NotFoundException(`Cliente com ID ${id} não encontrado.`);
    }
    await client.destroy();
  }
}
