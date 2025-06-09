import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PedidoListPageComponent } from './pages/pedido-list-page/pedido-list-page.component';
import { PedidoEditPageComponent } from './pages/pedido-edit-page/pedido-edit-page.component';

const routes: Routes = [
  { path: '', component: PedidoListPageComponent },
  { path: 'edit/:id', component: PedidoEditPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PedidosRoutingModule {}
