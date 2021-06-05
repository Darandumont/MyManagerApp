import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Calendar } from '@ionic-native/calendar';
import { ModalController } from '@ionic/angular';
import { CalendarComponent } from 'ionic2-calendar';
import { FirestoreService } from 'src/app/services/firestore.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import * as $ from 'jquery';
import { Cita } from 'src/app/models/citas.modelo';


@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {
  eventSource = [];
  viewTitle: string;

  calendar = {
    mode: 'month',
    currentDate: new Date()
  };

  selectedDate: Date;

  @ViewChild(CalendarComponent) myCal: CalendarComponent;

  constructor(private modalCtrl: ModalController, public router: Router,
    public firestore: FirestoreService) { }

  ngOnInit() {
    this.removeEvents();
    this.cargarCita();
  }

  cargarCita() {
    var events = [];
    this.firestore.getCitas().valueChanges().subscribe(listaCitas => {
      for (const cita of listaCitas as Cita[]) {
        events.push({
          title: cita.nombreCliente + ", " + cita.presupuesto + "€",
          startTime: new Date(cita.fecha),
          endTime: this.calcularHoraFinal(cita)
        });
      }

      this.eventSource = events;
    });

  }

  calcularMes() {
    this.firestore.getCitas().valueChanges().subscribe(listaCitas => {
      let label = (document.getElementById("mesCalculado") as HTMLLabelElement);
      let mes = (document.getElementById("mes") as HTMLElement);
      let presupuesto: number = 0;
      for (const cita of listaCitas as Cita[]) {
        presupuesto = this.compararMes(cita,presupuesto);
      }
      label.style.color ="Green";
      label.innerHTML = "TOTAL: " + presupuesto + "€";
    });
  }

  compararMes(cita:Cita,presupuesto:number):number{
    let mes = (document.getElementById("mes") as HTMLElement);

    if(mes.innerHTML.toLowerCase().includes("enero") && cita.fecha.includes("Jan")){
      presupuesto += Number.parseFloat(cita.presupuesto + "");

    }else if(mes.innerHTML.toLowerCase().includes("febrero") && cita.fecha.includes("Feb")){
      presupuesto += Number.parseFloat(cita.presupuesto + "");

    }else if(mes.innerHTML.toLowerCase().includes("marzo") && cita.fecha.includes("Mar")){
      presupuesto += Number.parseFloat(cita.presupuesto + "");
      
    }else if(mes.innerHTML.toLowerCase().includes("abril") && cita.fecha.includes("Apr")){
      presupuesto += Number.parseFloat(cita.presupuesto + "");
      
    }else if (mes.innerHTML.toLowerCase().includes("mayo") && cita.fecha.includes("May")) {
      presupuesto += Number.parseFloat(cita.presupuesto + "");

    } else if (mes.innerHTML.toLowerCase().includes("junio") && cita.fecha.includes("Jun")) {
      presupuesto += Number.parseFloat(cita.presupuesto + "");

    }else if(mes.innerHTML.toLowerCase().includes("julio") && cita.fecha.includes("Jul")){
      presupuesto += Number.parseFloat(cita.presupuesto + "");
      
    }else if(mes.innerHTML.toLowerCase().includes("agosto") && cita.fecha.includes("Aug")){
      presupuesto += Number.parseFloat(cita.presupuesto + "");
      
    }else if(mes.innerHTML.toLowerCase().includes("septiembre") && cita.fecha.includes("Sep")){
      presupuesto += Number.parseFloat(cita.presupuesto + "");
      
    }else if(mes.innerHTML.toLowerCase().includes("octubre") && cita.fecha.includes("Oct")){
      presupuesto += Number.parseFloat(cita.presupuesto + "");
      
    }else if(mes.innerHTML.toLowerCase().includes("noviembre") && cita.fecha.includes("Nov")){
      presupuesto += Number.parseFloat(cita.presupuesto + "");
      
    }else if(mes.innerHTML.toLowerCase().includes("diciembre") && cita.fecha.includes("Dec")){
      presupuesto += Number.parseFloat(cita.presupuesto + "");
      
    }
    return presupuesto;
  }

  onEventSelected() {
    this.eventSource = [];
    this.router.navigate(["acceso-fecha"]);
  }

  ionViewDidEnter() {
    console.log("ionViewDidEnter");
    
    this.removeEvents();
    this.cargarCita();
  }

  ionViewWillEnter() {
    console.log("ionViewWillEnter");
    
    this.removeEvents();
    this.cargarCita();
  }

  next() {
    let label = (document.getElementById("mesCalculado") as HTMLLabelElement);
    label.innerHTML="";
    this.myCal.slideNext();
  }

  back() {
    let label = (document.getElementById("mesCalculado") as HTMLLabelElement);
    label.innerHTML="";
    this.myCal.slidePrev();
  }

  onViewTitleChanged(title) {
    this.viewTitle = title[0].toUpperCase() + title.substring(1, title.length);
  }

  removeEvents() {
    this.eventSource = [];
  }

  //Metodo para obtener el dia donde se encuentra el cursor.
  onTimeSelected(event) {
    let a = event;
    let fecha = new Date(a.selectedTime);
    UsuariosService.fechaCitaActiva = fecha.toDateString();
  }

  mostrarCita() {
    this.router.navigate(["acceso-fecha"]);
    this.removeEvents();
  }

  crearCita() {
    this.removeEvents();
    this.router.navigate(["crear-cita"]);
  }

  buscarCita(){
    this.removeEvents();
    this.router.navigate(["buscar-cita"]);
  }

  calcularHoraFinal(cita: Cita): Date {
    let fechaFinal: Date;
    if (cita.tamanio === "Pequeño") {
      fechaFinal = new Date(cita.fecha);
      fechaFinal.setHours(fechaFinal.getHours() + 1);
    } else if(cita.tamanio === "Mediano"){
      fechaFinal = new Date(cita.fecha);
      fechaFinal.setHours(fechaFinal.getHours() + 4);
    }else{
      fechaFinal = new Date(cita.fecha);
      fechaFinal.setHours(fechaFinal.getHours() + 6);
    }
    return fechaFinal;
  }
}


