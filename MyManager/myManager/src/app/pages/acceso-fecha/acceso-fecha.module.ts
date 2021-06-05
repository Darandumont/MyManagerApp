import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AccesoFechaPageRoutingModule } from './acceso-fecha-routing.module';

import { AccesoFechaPage } from './acceso-fecha.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AccesoFechaPageRoutingModule
  ],
  declarations: [AccesoFechaPage]
})
export class AccesoFechaPageModule {}
