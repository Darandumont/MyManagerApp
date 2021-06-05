import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cita } from 'src/app/models/citas.modelo';
import { ComponentesIonicService } from 'src/app/services/componentes-ionic.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-modificar-cita',
  templateUrl: './modificar-cita.page.html',
  styleUrls: ['./modificar-cita.page.scss'],
})
export class ModificarCitaPage implements OnInit {
  cita: Cita;
  public opciones;
  public nombre;
  public precio;
  public hora;
  public fecha;
  public duracion;
  public tamaño;

  constructor(public componenteIonicService: ComponentesIonicService,
    public router: Router,
    public firestore: FirestoreService) { }

  ngOnInit() {
    this.cargarDatos();
    this.tamaño = UsuariosService.cita.tamanio;
    this.cambiarValor();
    this.cambiarDuracion();
  }

  cargarDatos() {
    let fechaRecibida = new Date(UsuariosService.cita.fecha);

    this.nombre = (document.getElementById("nombreCita") as HTMLInputElement);
    this.precio = (document.getElementById("precioCita") as HTMLInputElement);
    this.tamaño = (UsuariosService.cita.tamanio);
    this.hora = (document.getElementById("horaCita") as HTMLInputElement);
    this.fecha = (document.getElementById("diaCita") as HTMLLabelElement);

    this.opciones = (document.getElementById("tamañoTatto") as HTMLSelectElement);
    this.opciones.options[0].disabled = true;

    let dia = UsuariosService.fechaCitaActiva;
    let fechaCreada = new Date(dia);
    let formatoFecha = fechaCreada.getDate() + "/" + (fechaCreada.getMonth() + 1) + "/" + fechaCreada.getFullYear();
    this.fecha.innerHTML = formatoFecha;

    this.hora.value = this.formatoHora(fechaRecibida);

    this.cambiarValor();
    this.nombre.value = UsuariosService.cita.nombreCliente;
    this.precio.value = UsuariosService.cita.presupuesto + "";
  }

  validarDatos() {
    return this.nombre.value != "" && this.precio.value != "" && (this.hora.value != undefined && this.hora.value != "") && this.opciones.value != 0;
  }

  cambiarValor() {
    switch (this.tamaño) {
      case "Pequeño":
        this.opciones.value = 1;
        break;
      case "Mediano":
        this.opciones.value = 2;
        break;
      case "Grande":
        this.opciones.value = 3;
        break;
    }
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

  borrar() {
      this.componenteIonicService.presentModalBorrar();
    }

  modificar() {
    
    if (this.validarDatos()) {
      let dia = UsuariosService.fechaCitaActiva;
      let fecha = new Date(dia);
      let horaFinal = this.hora.value.split(":")
      let fechaFinal: Date = new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate(), ((horaFinal[0]) as any) as number, ((horaFinal[1]) as any) as number);
      let nuevaCita: Cita = new Cita(UsuariosService.cita.nombreUsuario, this.nombre.value, this.precio.value, fechaFinal+"", this.tamaño);
      this.firestore.modificarCita(UsuariosService.cita, nuevaCita);
      
      this.mostrarToast("Cita modificada",true);
      this.router.navigate(["acceso-fecha"]);
    } else {
      this.mostrarToast("Rellene todos los campos",false);
    }

  }

  private mostrarToast(mensaje: string, valido: boolean): void {
    this.componenteIonicService.presentToast(mensaje, valido);
    
  }


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
