import { Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { Cita } from 'src/app/models/citas.modelo';
import { Usuario } from 'src/app/models/usuarios.modelo';
import { ComponentesIonicService } from 'src/app/services/componentes-ionic.service'
import { FirestoreService } from 'src/app/services/firestore.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-crear-cita',
  templateUrl: './crear-cita.page.html',
  styleUrls: ['./crear-cita.page.scss'],
})
export class CrearCitaPage implements OnInit {
  private mensajeError: string = "Rellene todos los datos";
  private mensajeCorrecto: string = "Cita creada";
  private dia: string = (new Date()).toString();
  public duracion: number = 0;
  public hora;
  public opciones;
  public tamaño;

  constructor(
    public componenteIonicService: ComponentesIonicService,
    public router: Router,
    public firestore: FirestoreService) { }

  ngOnInit() {

    this.dia = UsuariosService.fechaCitaActiva;
    let fecha = new Date(this.dia);
    let formatoFecha = fecha.getDate() + "/" + (fecha.getMonth() + 1) + "/" + fecha.getFullYear();
    $("#diaCita").text(formatoFecha);
    this.opciones = (document.getElementById("tamañoTatto") as HTMLSelectElement);
    this.opciones.options[0].disabled = true;

  }

  cambiarDuracion() {
    switch (this.opciones.value) {
      case "1":
        this.duracion = 1;
        this.tamaño = "Pequeño";
        break;
      case "2":
        this.duracion = 4;
        this.tamaño = "Mediano";
        break;
      case "3":
        this.duracion = 6;
        this.tamaño = "Grande";
        break;
    }
  }

  crear() {
    let nombre: JQuery<HTMLElement> = $("#nombreCita");
    let precio: JQuery<HTMLElement> = $("#precioCita");
    var valido: boolean = true;
    this.hora = (document.getElementById("horaCita") as HTMLInputElement);
    let horaFinal:string[] = this.hora.value.split(":");    

    if (nombre.val() != "" && precio.val() != "" && this.hora.value != "" && this.opciones.value != 0) {
      this.mostrarToast(this.mensajeCorrecto, valido);

      this.dia = UsuariosService.fechaCitaActiva;
      let fecha = new Date(this.dia);
      let fechaFinal: Date = new Date(fecha.getFullYear(),fecha.getMonth(),fecha.getDate(),((horaFinal[0])as any)as number,((horaFinal[1])as any)as number);
      let precioFinal = precio.val() as number;
      let citaNueva = new Cita(UsuariosService.usuario.emailUsuario, nombre.val().toString(), precioFinal, fechaFinal+"", this.tamaño);
      UsuariosService.usuario.listaCitas.push(citaNueva);
      //SE AÑADE LA CITA A LA BASE DE DATOS Y SE LE AÑADE AL USUARIO
      this.firestore.agregarCita(citaNueva)
        .then(() => {
          console.log("Cita añadida");
        })
        .catch((err) => {
          console.log("Error al añadir la cita", err);
        });

      //Volvemos a la pantalla anterior.
      this.retrocederPaginaAnterior(nombre, precio);
      
    } else {
      valido = false;
      this.mostrarToast(this.mensajeError, valido);
    }
  }

  private mostrarToast(mensaje: string, valido: boolean): void {
    this.componenteIonicService.presentToast(mensaje, valido);
  }

  private retrocederPaginaAnterior(nombre: JQuery<HTMLElement>, password: JQuery<HTMLElement>): void {
    //Si todo correcto vamos a la siguiente página y limpiamos los campos.
    this.router.navigate(['principal']);

    nombre.val("");
    password.val("");
  }

}
