import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-clients-modal',
  standalone: true,
  templateUrl: './clients-modal.component.html',
})
export class ClientsModalComponent {
  @Input() open: boolean = false;
  @Output() close = new EventEmitter<void>();

  handleClose(): void {
    this.close.emit();
  }
}
