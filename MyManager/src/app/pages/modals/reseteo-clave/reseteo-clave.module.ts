import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReseteoClavePageRoutingModule } from './reseteo-clave-routing.module';

import { ReseteoClavePage } from './reseteo-clave.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReseteoClavePageRoutingModule
  ],
  declarations: [ReseteoClavePage]
})
export class ReseteoClavePageModule {}
