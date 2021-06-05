import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cita } from 'src/app/models/citas.modelo';
import { ComponentesIonicService } from 'src/app/services/componentes-ionic.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import * as $ from 'jquery';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-buscar-cita',
  templateUrl: './buscar-cita.page.html',
  styleUrls: ['./buscar-cita.page.scss'],
})
export class BuscarCitaPage implements OnInit {

  constructor(public componenteIonicService: ComponentesIonicService,
    public router: Router,
    public firestore: FirestoreService) { }


  ngOnInit() {
    $('#lista_citas').on('click', 'ion-item', (evt: Event) => {
      this.modificarCita(evt);
    });

  }

  modificarCita(evt: Event) {
    let elemento = (evt.target) as HTMLIonItemElement;
    UsuariosService.fechaCitaActiva = elemento.id;    
    UsuariosService.cita = UsuariosService.usuario.listaCitas.find(cita => cita.fecha == elemento.id);
    this.router.navigate(['modificar-cita']);
  }

  calcularMes() {   
    this.firestore.getCitas().valueChanges().subscribe(lista => {
      let bloque = $("#lista_citas");
      let busqueda = (document.getElementById("textoCita")as HTMLInputElement);
      bloque.empty();
      for (const cita of lista as Cita[]) {
        let fechaCita = new Date(cita.fecha);
        let horaFinal = this.formatoHora(fechaCita);
        let formatoFecha = fechaCita.getDate() + "/" + (fechaCita.getMonth() + 1) + "/" + fechaCita.getFullYear();
        
        if (cita.nombreCliente.toLowerCase().includes(busqueda.value.toLowerCase().trim())) {
          let elemento = $('<ion-item/>', {
            'html': `Nombre: ${cita.nombreCliente},  Precio: ${cita.presupuesto}€,  Hora/Fecha: ${horaFinal}  ${formatoFecha} `,
            'id': cita.fecha,
            'class': 'cita' //Para dar estilos a la cita ir a theme/variables.scss
          });
          UsuariosService.usuario.listaCitas.push(cita);
          bloque.append(elemento);
        }
      }
    });
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
