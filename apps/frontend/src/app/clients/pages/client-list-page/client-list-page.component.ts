import { Component, OnInit } from '@angular/core';
import { Client } from '../../../core/models/client.model';
import { ClientService } from '../../../core/services/client.service';
import { ClientsModalComponent } from '../../components/clients-modal/clients-modal.component';
import { CommonModule } from '@angular/common';
import { ClientsListComponent } from '../../components/clients-list/clients-list.component';
import { ClientViewModalComponent } from '../../components/client-view-modal/client-view-modal.component';
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
    const operation = clientData.id
      ? this.clientService.update(clientData.id, clientData)
      : this.clientService.create(clientData);

    operation.subscribe({
      next: () => {
        this.loadClients();
        this.closeEditModal();
      },
      error: (err) => {
        console.error('Erro ao salvar cliente:', err);
      },
    });
  }

  openViewClientModal(client: Client): void {
    console.log('Abrindo modal de visualização para:', client);
    this.selectedClientForView = client;
    this.isViewModalOpen = true;
    console.log(
      'isViewModalOpen:',
      this.isViewModalOpen,
      'selectedClientForView:',
      this.selectedClientForView
    );
  }

  closeViewModal(): void {
    this.isViewModalOpen = false;
    this.selectedClientForView = null;
  }

  handleClientDeleted(clientId: string): void {
    this.loadClients();
  }
}
