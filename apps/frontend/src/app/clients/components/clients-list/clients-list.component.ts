import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Client } from '../../../core/models/client.model';
import { ClientService } from '../../../core/services/client.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-clients-list',
  standalone: true,
  templateUrl: './clients-list.component.html',
  imports: [CommonModule],
})
export class ClientsListComponent implements OnInit {
  @Input() clients: Client[] = [];
  @Output() deleted = new EventEmitter<string>();
  @Output() editClicked = new EventEmitter<Client>();
  @Output() viewDetailsClicked = new EventEmitter<Client>();

  constructor(private clientService: ClientService, private router: Router) {}

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.clientService.getAll().subscribe((data) => (this.clients = data));
  }

  viewDetails(client: Client): void {
    this.viewDetailsClicked.emit(client);
  }

  edit(client: Client): void {
    this.router.navigate(['/clients/edit', client.id]);
  }

  delete(id: string): void {
    this.clientService.delete(id).subscribe({
      next: () => {
        this.clients = this.clients.filter((client) => client.id !== id);
        this.deleted.emit(id);
      },
      error: (err) => {
        console.error('Erro ao excluir cliente:', err);
      },
    });
  }
}
