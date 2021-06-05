import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BuscarCitaPageRoutingModule } from './buscar-cita-routing.module';

import { BuscarCitaPage } from './buscar-cita.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BuscarCitaPageRoutingModule
  ],
  declarations: [BuscarCitaPage]
})
export class BuscarCitaPageModule {}
