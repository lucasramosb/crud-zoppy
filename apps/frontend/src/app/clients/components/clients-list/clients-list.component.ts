import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Client } from '../../../core/models/client.model';
import { ClientService } from '../../../core/services/client.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

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
    Swal.fire({
      title: 'Você tem certeza?',
      text: 'Esta ação não pode ser desfeita!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, deletar!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.clientService.delete(id).subscribe({
          next: () => {
            this.clients = this.clients.filter((client) => client.id !== id);
            this.deleted.emit(id);
            Swal.fire(
              'Deletado!',
              'O cliente foi deletado com sucesso.',
              'success'
            );
          },
          error: (err) => {
            console.error('Erro ao excluir cliente:', err);
            Swal.fire(
              'Erro!',
              'Ocorreu um erro ao deletar o cliente.',
              'error'
            );
          },
        });
      }
    });
  }
}
