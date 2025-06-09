import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Client } from '../../../core/models/client.model';

@Component({
  selector: 'app-clients-form',
  standalone: true,
  templateUrl: './clients-form.component.html',
})
export class ClientsFormComponent implements OnInit {
  @Input() client: Client | null = null;
  @Output() formSubmitted = new EventEmitter<Client>();

  clientForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.clientForm = this.fb.group({
      name: [this.client?.name || '', Validators.required],
      email: [
        this.client?.email || '',
        [Validators.required, Validators.email],
      ],
      telephone: [this.client?.telephone || '', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.clientForm.valid) {
      this.formSubmitted.emit(this.clientForm.value);
    }
  }
}
