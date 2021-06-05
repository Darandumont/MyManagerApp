import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReseteoClavePage } from './reseteo-clave.page';

const routes: Routes = [
  {
    path: '',
    component: ReseteoClavePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReseteoClavePageRoutingModule {}
