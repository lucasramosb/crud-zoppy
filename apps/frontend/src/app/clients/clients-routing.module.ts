import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientListPageComponent } from './pages/client-list-page/client-list-page.component';
import { ClientEditPageComponent } from './pages/client-edit-page/client-edit-page.component';

const routes: Routes = [
  { path: '', component: ClientListPageComponent },
  { path: 'edit/:id', component: ClientEditPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientsRoutingModule {}
