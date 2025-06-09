import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from '../../../core/models/client.model';
import { ClientService } from '../../../core/services/client.service';
import { ClientsFormComponent } from '../../components/clients-form/clients-form.component';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-client-edit-page',
  templateUrl: './client-edit-page.component.html',
  imports: [ClientsFormComponent, CommonModule],
})
export class ClientEditPageComponent implements OnInit {
  client: Client | null = null;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private clientService: ClientService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.clientService.getById(id).subscribe({
      next: (c) => {
        this.client = c;
        this.loading = false;
      },
      error: () => {
        this.router.navigate(['/clients']);
      },
    });
  }

  onFormSubmitted(): void {
    this.router.navigate(['/clientes']);
  }
}
