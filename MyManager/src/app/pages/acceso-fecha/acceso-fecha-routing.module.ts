import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccesoFechaPage } from './acceso-fecha.page';

const routes: Routes = [
  {
    path: '',
    component: AccesoFechaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccesoFechaPageRoutingModule {}
