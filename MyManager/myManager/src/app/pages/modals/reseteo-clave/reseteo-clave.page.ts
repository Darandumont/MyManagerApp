import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AutorizacionService } from 'src/app/services/autorizacion.service';
import * as $ from 'jquery';
import { ComponentesIonicService } from 'src/app/services/componentes-ionic.service';

@Component({
  selector: 'app-reseteo-clave',
  templateUrl: './reseteo-clave.page.html',
  styleUrls: ['./reseteo-clave.page.scss'],
})
export class ReseteoClavePage implements OnInit {

  @Input() email: string;
  
  constructor(
    public modalController: ModalController,
    public autServ: AutorizacionService,
    public componenteIonicService: ComponentesIonicService) { }

  ngOnInit() {
    $("#email").val(this.email);
  }

  cerrarModal(aceptado: boolean) {

    if(aceptado){
      this.autServ.enviarEmailReseteoPassword(this.email);
    
      this.componenteIonicService.presentToast(`Se ha envíado un email de reseteo de contraseña a: ${this.email}`, true);
    }

    this.modalController.dismiss();
  }

}
