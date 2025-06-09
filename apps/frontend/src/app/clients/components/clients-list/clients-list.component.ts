import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Client } from '../../../core/models/client.model';
import { ClientService } from '../../../core/services/client.service';
@Component({
  selector: 'app-clients-list',
  standalone: true,
  templateUrl: './clients-list.component.html',
})
export class ClientsListComponent implements OnInit {
  clients: Client[] = [];
  @Output() deleted = new EventEmitter<void>();

  constructor(
    private clientService: ClientService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.clientService.getAll().subscribe((data) => (this.clients = data));
  }

  edit(id: string) {
    this.router.navigate(['/clients', id, 'edit']);
  }

  delete(id: string) {
    if (!confirm('Confirma exclusão?')) return;
    this.clientService.delete(id).subscribe(() => {
      this.load();
      this.deleted.emit();
    });
  }
}
