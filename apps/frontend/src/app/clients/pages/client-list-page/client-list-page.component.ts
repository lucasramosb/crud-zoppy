import { Component } from '@angular/core';
import { Client } from '../../../core/models/client.model';
import { ClientService } from '../../../core/services/client.service';
import { ClientsModalComponent } from '../../components/clients-modal/clients-modal.component';
import { CommonModule } from '@angular/common';
import { ClientsListComponent } from '../../components/clients-list/clients-list.component';
@Component({
  selector: 'app-client-list-page',
  standalone: true,
  templateUrl: './client-list-page.component.html',
  imports: [ClientsModalComponent, ClientsListComponent, CommonModule],
})
export class ClientListPageComponent {
  clients: Client[] = [];
  modalOpen = false;
  editingClient: Client | null = null;

  constructor(private clientService: ClientService) {
    this.load();
  }

  toggleModal(): void {
    this.modalOpen = !this.modalOpen;
  }

  load() {
    this.clientService.getAll().subscribe((data) => (this.clients = data));
  }

  new() {
    this.editingClient = null;
    this.modalOpen = true;
  }

  edit(client: Client) {
    this.editingClient = client;
    this.modalOpen = true;
  }

  delete(id: string) {
    this.clientService.delete(id).subscribe(() => this.load());
  }

  closeModal() {
    this.modalOpen = false;
  }

  save(client: Client) {
    const op = client.id
      ? this.clientService.update(client.id, client)
      : this.clientService.create(client);
    op.subscribe(() => {
      this.load();
      this.closeModal();
    });
  }
}
