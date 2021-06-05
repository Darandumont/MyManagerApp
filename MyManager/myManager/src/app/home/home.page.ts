import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ComponentesIonicService } from 'src/app/services/componentes-ionic.service'
import { User } from '../compartido/usuario.interface';
import { Usuario } from '../models/usuarios.modelo';
import { AutorizacionService } from '../services/autorizacion.service';
import { UsuariosService } from '../services/usuarios.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public usuario: string = "";
  public clave: string = "";

  private mensajeError: string = "Datos incorrectos";
  private mensajeCorrecto: string = "Datos validados con éxito";
  private contadorErrores: number;

  constructor(
    //Recibe un objeto ComponentesIonicService que provee los distintos componentes.
    public componenteIonicService: ComponentesIonicService,
    //Objeto Router que permite la navegación entre páginas.
    public router: Router,
    private autoSvc: AutorizacionService,
  ) { }

  ngOnInit() {    
  }

  comprobarContexto(){
    let navegador = navigator.userAgent; //busco el "userAgent" del usuario.
    //lista de palabras del "userAgent" en los móviles
    let moviles = ["Mobile", "iPhone", "iPod", "BlackBerry", "Opera Mini", "Sony", "MOT", "Nokia", "samsung"];
    let detector = 0; //Variable que detectará si se usa un móvil
    for (let i in moviles) { //comprobar en la lista...
      //si el método "indexOf" no devuelve -1, indica que la palabra está en el "userAgent"
      let compruebo = navegador.indexOf(moviles[i]);
      if (compruebo > -1) {
        detector = 1; //Si es un móvil, cambio el valor del detector
      }
    }
    if (detector == 1) { //si es un móvil dehabilito el entrar con google.
      $('#entrarConGoogle').hide();
    }
  }

  ionViewWillEnter() {
    this.comprobarContexto();
    this.autoSvc.cerrarSesion();
    UsuariosService.usuarioAutorizacion = undefined;
    this.contadorErrores = 0;
  }

  async entrar(entrar: boolean, email, password) {

    let emailSinEspacios = email.value.trim();

    let datosToast: [string, boolean] = [this.mensajeCorrecto, true];

    let user: User;
    let camposValidos: boolean = false;
    let toastRelleno = false;

    try {
      if (entrar) {
        camposValidos = this.validarCamposRellenos(emailSinEspacios, password.value);
        if (camposValidos) {
          user = await this.autoSvc.iniciarSesion(emailSinEspacios, password.value);
          if (user == null) {
            ++this.contadorErrores;
            datosToast = [`No tiene contraseña almacenada o esta es incorrecta. Número intentos: ${this.contadorErrores}`, false];
            toastRelleno = true;
            if (this.contadorErrores === 3) {
              this.componenteIonicService.presentModal(emailSinEspacios);
              this.contadorErrores = 0;
            }
          }
        } else {
          datosToast = ["Debe rellenar los campos", false];
          toastRelleno = true;
        }
      } else {
        user = await this.autoSvc.iniciarSesionGoolge();
      }

      if (!toastRelleno && !user) {
        datosToast = [this.mensajeError, false];
        toastRelleno = true;
      }

    } catch (error) {
      if (!toastRelleno) {
        datosToast = [this.mensajeError, false];
      }
    }

    if (user) {

      if (user.emailVerified) {
        UsuariosService.usuarioAutorizacion = user;

        this.avanzarSiguientePagina(email, password);
      } else if (!toastRelleno) {
        datosToast = ["Debe verificar el email", false];
      }
    }
    this.mostrarToast(datosToast[0], datosToast[1]);
  }

  private avanzarSiguientePagina(email, password): void {
    //Si todo correcto vamos a la siguiente página y limpiamos los campos.
    UsuariosService.usuario = new Usuario(UsuariosService.usuarioAutorizacion.email, "");
    this.router.navigate(['principal']);

    email.value = "";
    password.value = "";
  }

  crearUsuario() {
    this.router.navigate(['registrar-usuario']);
  }

  private mostrarToast(mensaje: string, valido: boolean): void {
    this.componenteIonicService.presentToast(mensaje, valido);
  }

  private validarCamposRellenos(email: string, password: string): boolean {
    return email != null && email.trim().length > 0 && password != null && password.trim().length > 0;
  }
}