import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Client } from '../../../core/models/client.model';
import { CommonModule } from '@angular/common';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

@Component({
  selector: 'app-clients-form',
  standalone: true,
  templateUrl: './clients-form.component.html',
  imports: [CommonModule, ReactiveFormsModule, NgxMaskDirective],
  providers: [provideNgxMask()],
})
export class ClientsFormComponent implements OnInit {
  @Input() client: Client | null = null;
  @Output() formSubmitted = new EventEmitter<Client>();
  @Output() cancelled = new EventEmitter<void>(); // Novo evento

  clientForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  private formatDateForInput(dateInput: string | Date): string {
    if (!dateInput) return '';
    const date = new Date(dateInput);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }

  ngOnInit(): void {
    this.clientForm = this.fb.group({
      name: [this.client?.name || '', Validators.required],
      email: [
        this.client?.email || '',
        [Validators.required, Validators.email],
      ],
      telephone: [this.client?.telephone || '', Validators.required],
      cpf_cnpj: [this.client?.cpf_cnpj || '', Validators.required],
      address: [this.client?.address || ''],
      birthdate: [
        this.client?.birthdate
          ? this.formatDateForInput(this.client.birthdate)
          : '',
      ],
    });
  }

  onSubmit(): void {
    if (this.clientForm.valid) {
      this.formSubmitted.emit(this.clientForm.value);
    }
  }

  onCancel(): void {
    this.cancelled.emit();
  }
}
