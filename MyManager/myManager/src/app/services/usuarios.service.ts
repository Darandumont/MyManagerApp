import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuarios.modelo';
import { Cita } from '../models/citas.modelo';
import { User } from '../compartido/usuario.interface';

//No creo que la usemos
@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  static usuarioAutorizacion: User;
  static fechaCitaActiva: string;
  static usuario: Usuario;
  static listaCitas: Cita[] = [];

  //Atributo q engloba la cita entera 
  static cita:Cita;
  constructor() { }

  //Método para agregar citas.
  static agregarCitas(_citas: Cita[]){
    this.usuario.listaCitas.push(..._citas);
  }

  //Método que crea una cita, la devuelve, y la añade a citas.
  static crearCita(_nombreUsuario: string, _nombreCliente: string, _presupuesto: number, _fecha: string,_tamaño:string): Cita{
    const cita: Cita = new Cita(_nombreUsuario, _nombreCliente, _presupuesto, _fecha,_tamaño);
    this.usuario.listaCitas.push(cita);
    return cita;
  }

  //Método que devuelve una cita por su fecha.
  static getCitaByFecha(_fechaCita: string): Cita{
    return this.usuario.listaCitas.find(cita => cita.fecha === _fechaCita);
  }

  //Método que elimina la cita por la fecha.
  static eliminarCitaByFecha(_fechaCita: string): boolean{
    let eliminada: boolean = false;

    //Buscamos el índice de la cita.
    let indice: number = this.usuario.listaCitas.findIndex(cita => cita.fecha === _fechaCita);
    
    if(indice !== -1){
      this.usuario.listaCitas.splice(indice, 1);
      eliminada = true;
    }
    
    return eliminada;
  }

}
