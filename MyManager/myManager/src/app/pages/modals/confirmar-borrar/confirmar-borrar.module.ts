import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConfirmarBorrarPageRoutingModule } from './confirmar-borrar-routing.module';

import { ConfirmarBorrarPage } from './confirmar-borrar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConfirmarBorrarPageRoutingModule
  ],
  declarations: [ConfirmarBorrarPage]
})
export class ConfirmarBorrarPageModule {}
