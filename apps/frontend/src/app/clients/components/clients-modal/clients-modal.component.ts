import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ClientsFormComponent } from '../clients-form/clients-form.component';
import { Client } from '../../../core/models/client.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clients-modal',
  standalone: true,
  templateUrl: './clients-modal.component.html',
  imports: [CommonModule, ClientsFormComponent],
})
export class ClientsModalComponent {
  constructor(private router: Router) {}
  @Input() open: boolean = false;
  @Input() clientToEdit: Client | null = null;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<Client>();

  handleClose(): void {
    this.router.navigate(['/clients']);
  }

  handleFormSubmit(formData: Client): void {
    const dataToSave: Client =
      this.clientToEdit && this.clientToEdit.id
        ? { ...formData, id: this.clientToEdit.id }
        : formData;
    this.save.emit(dataToSave);
  }
}
