import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfirmarBorrarPage } from './confirmar-borrar.page';

const routes: Routes = [
  {
    path: '',
    component: ConfirmarBorrarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfirmarBorrarPageRoutingModule {}
