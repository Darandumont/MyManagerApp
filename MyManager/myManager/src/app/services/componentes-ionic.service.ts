/*
Este servicio sirve para tener centralizadas todas las llamadas
a los distintos componentes de Ionic desde cualquier página de la app.
*/
import { Injectable } from '@angular/core';
import { ActionSheetController, ModalController, ToastController } from '@ionic/angular';
import { Cita } from '../models/citas.modelo';
import { ConfirmarBorrarPage } from '../pages/modals/confirmar-borrar/confirmar-borrar.page';
import { ReseteoClavePage } from '../pages/modals/reseteo-clave/reseteo-clave.page';

@Injectable({
  providedIn: 'root'
})
export class ComponentesIonicService {

  constructor(
    public actionSheetController: ActionSheetController,
    public toastController: ToastController,
    public modalController: ModalController
  ) { }

  //Método que devuelve una ventana modal.
  async presentModal(email: string) {
    const modal = await this.modalController.create({
      component: ReseteoClavePage,
      cssClass: 'my-custom-class',
      componentProps: {
        'email': email
      }
    });
    return await modal.present();
  }

  //Metodo que devuelve la ventana modal para borrar
  async presentModalBorrar() {
    const modal = await this.modalController.create({
      component: ConfirmarBorrarPage,
      cssClass: 'my-custom-class',
      componentProps: {
          'informacionCita':"Desea borrar la cita?"
      }
    });
    return await modal.present();
  }

  //Método que devuelve un Toast
  async presentToast(mensaje: string, valido: boolean = true) {
    const toast = await this.toastController.create({
      message: mensaje,
      color: valido? "success": "danger",
      duration: 2000
    });
    toast.present();
  }
  
}
