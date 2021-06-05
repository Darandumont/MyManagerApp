import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { Cita } from 'src/app/models/citas.modelo';
import { FirestoreService } from 'src/app/services/firestore.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-acceso-fecha',
  templateUrl: './acceso-fecha.page.html',
  styleUrls: ['./acceso-fecha.page.scss'],
})
export class AccesoFechaPage implements OnInit {

  listaCitas: Cita[];
  fecha: Date;
  dia: string;

  constructor(
    public router: Router,
    public firestore: FirestoreService) { }

  //TO DO
  ngOnInit() {
    //evt: JQuery.Event valor a pasar por parametro en caso de error
    $('#lista_citas').on('click', 'ion-item', (evt: Event) => {
      this.modificarCita(evt);
    });
  }

  ionViewWillEnter() {

    this.recargarPagina();
  }

  recargarPagina() {
    let dia = UsuariosService.fechaCitaActiva;
    this.fecha = new Date(dia);

    this.dia = this.fecha.getDate() + "/" + (this.fecha.getMonth() + 1) + "/" + this.fecha.getFullYear();
    
    this.firestore.getCitas().valueChanges().subscribe(listaCitas => {
      this.cargarCitas(listaCitas as Cita[]);
    })
  }

  //Metodo que accede a la ventana de crear cita
  crearCita(evt: Event) {
    this.router.navigate(['crear-cita']);
  }

  cargarCitas(listaCitas: Cita[]) {
    UsuariosService.usuario.listaCitas = [];

    let dia = UsuariosService.fechaCitaActiva;
    this.fecha = new Date(dia);
    let fechaFinalHoy = this.fecha.getFullYear() + " " + (this.fecha.getMonth() + 1) + " " + this.fecha.getDate();
    let bloque = $("#lista_citas");

    //Comprobamos que el bloque este vacio antes de emepzar la impresion de citas.
    bloque.empty();   
    

    for (const cita of listaCitas) {
      let fechaCita = new Date(cita.fecha);
      let fechaFinalCita = fechaCita.getFullYear() + " " + (fechaCita.getMonth() + 1) + " " + fechaCita.getDate();

      let horaFinal = this.formatoHora(fechaCita);
      let formatoFecha = fechaCita.getDate() + "/" + (fechaCita.getMonth() + 1) + "/" + fechaCita.getFullYear()
      if (fechaFinalHoy === fechaFinalCita) {
        let elemento = $('<ion-item/>', {
          'html': `${cita.nombreCliente}, ${cita.presupuesto}€, ${horaFinal} | ${formatoFecha} `,
          'id': cita.fecha,
          'class': 'cita' //Para dar estilos a la cita ir a theme/variables.scss
        }
        );
        UsuariosService.usuario.listaCitas.push(cita);
        bloque.append(elemento);
      }
    }

  }

  modificarCita(evt: Event) {

    let elemento = (evt.target) as HTMLIonItemElement;
    UsuariosService.fechaCitaActiva = elemento.id;

    UsuariosService.cita = UsuariosService.usuario.listaCitas.find(cita => cita.fecha == elemento.id);

    this.router.navigate(['modificar-cita']);
  }

  //METODO A METER EN UTILS
  formatoHora(fechaCita: Date): string {
    let formatoFecha = "";

    if(fechaCita.getHours()<10){
      formatoFecha+="0"+fechaCita.getHours()+":";
    }else{
      formatoFecha+=fechaCita.getHours()+":";
    }

    if(fechaCita.getMinutes()<10){
      formatoFecha+="0"+fechaCita.getMinutes();
    }else{
      formatoFecha+=fechaCita.getMinutes();
    }
    return formatoFecha;
  }

}
