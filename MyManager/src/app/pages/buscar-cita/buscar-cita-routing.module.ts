import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BuscarCitaPage } from './buscar-cita.page';

const routes: Routes = [
  {
    path: '',
    component: BuscarCitaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BuscarCitaPageRoutingModule {}
