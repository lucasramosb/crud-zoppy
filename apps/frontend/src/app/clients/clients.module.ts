import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClientsRoutingModule } from './clients-routing.module';
import { RouterModule } from '@angular/router';
import { ClientsModalComponent } from './components/clients-modal/clients-modal.component';
import { ClientsFormComponent } from './components/clients-form/clients-form.component';
import { ClientsListComponent } from './components/clients-list/clients-list.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    ClientsRoutingModule,
    ClientsListComponent,
  ],
})
export class ClientsModule {}
