import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Client } from '../../../core/models/client.model';

@Component({
  selector: 'app-client-view-modal',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './client-view-modal.component.html',
})
export class ClientViewModalComponent {
  @Input() open: boolean = false;
  @Input() client: Client | null = null;
  @Output() close = new EventEmitter<void>();

  handleClose(): void {
    this.close.emit();
  }
}
