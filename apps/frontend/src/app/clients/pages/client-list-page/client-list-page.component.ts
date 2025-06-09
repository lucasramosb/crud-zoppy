import { Component, OnInit } from '@angular/core';
import { Client } from '../../../core/models/client.model';
import { ClientService } from '../../../core/services/client.service';
import { ClientsModalComponent } from '../../components/clients-modal/clients-modal.component';
import { CommonModule } from '@angular/common';
import { ClientsListComponent } from '../../components/clients-list/clients-list.component';
import { ClientViewModalComponent } from '../../components/client-view-modal/client-view-modal.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-client-list-page',
  standalone: true,
  templateUrl: './client-list-page.component.html',
  imports: [
    ClientsModalComponent,
    ClientsListComponent,
    CommonModule,
    ClientViewModalComponent,
  ],
})
export class ClientListPageComponent implements OnInit {
  clients: Client[] = [];
  isLoading = true;
  isEditModalOpen = false;
  editingClient: Client | null = null;
  modalOpen = false;
  isViewModalOpen = false;
  selectedClientForView: Client | null = null;

  constructor(private clientService: ClientService) {}

  ngOnInit(): void {
    this.loadClients();
  }

  loadClients(): void {
    this.isLoading = true;
    this.clientService.getAll().subscribe({
      next: (data) => {
        this.clients = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erro ao carregar clientes', err);
        Swal.fire('Erro!', 'Ocorreu um erro ao carregar os clientes.', 'error');
        this.isLoading = false;
      },
    });
  }

  openNewClientModal(): void {
    this.editingClient = null;
    this.isEditModalOpen = true;
  }

  openEditClientModal(client: Client): void {
    this.editingClient = { ...client };
    this.isEditModalOpen = true;
  }

  closeEditModal(): void {
    this.isEditModalOpen = false;
    this.editingClient = null;
  }

  handleSaveClient(clientData: Client): void {
    const isUpdate = !!clientData.id;
    const operation = isUpdate
      ? this.clientService.update(clientData.id!, clientData)
      : this.clientService.create(clientData);

    operation.subscribe({
      next: () => {
        this.loadClients();
        this.closeEditModal();
        Swal.fire(
          'Sucesso!',
          `Cliente ${isUpdate ? 'atualizado' : 'criado'} com sucesso.`,
          'success',
        );
      },
      error: (err) => {
        console.error('Erro ao salvar cliente:', err);
        Swal.fire('Erro!', 'Ocorreu um erro ao salvar o cliente.', 'error');
      },
    });
  }

  openViewClientModal(client: Client): void {
    this.selectedClientForView = client;
    this.isViewModalOpen = true;
  }

  closeViewModal(): void {
    this.isViewModalOpen = false;
    this.selectedClientForView = null;
  }

  handleClientDeleted(): void {
    this.loadClients();
  }
}
