import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { AngularFirestore, AngularFirestoreDocument } from "@angular/fire/firestore";
import { Observable, of } from 'rxjs';
import { switchMap } from "rxjs/operators";

import { User } from '../compartido/usuario.interface';

@Injectable({
  providedIn: 'root'
})
export class AutorizacionService {

  public user$: Observable<User>;

  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap((user) => {
        //Si existe user devolvemos su documento.
        if (user) {
          return this.afs.doc<User>(`usuarios/${user.uid}`).valueChanges();
        }

        //Si no hay devolvemos un Observable null.
        return of(null);
      })
    )
  }

  //Método para cambiar la contraseña.
  async cambiarClave(email: string): Promise<void> {
    try {
      return this.afAuth.sendPasswordResetEmail(email);
    } catch (error) {
      console.log('Error:', error);
    }
  }

  //Método para iniciar sesión con Google.
  async iniciarSesionGoolge(): Promise<User> {
    try {
      const { user } = await this.afAuth.signInWithPopup(new firebase.default.auth.GoogleAuthProvider());
      this.actualizarDatosDUsuario(user);
      return user;
    } catch (error) {
      console.log('Error:', error);
    }
  }

  //Método para registrar usuarios.
  async registrarse(email: string, password: string): Promise<User> {

    //La promesa devuelve un objeto con el user y más información, pero sólo me interesa el user, por eso hago destructuring.
    const { user } = await this.afAuth.createUserWithEmailAndPassword(email, password);

    //Una vez se registre el usuario, le mandaremos un email de verificación.
    await this.enviarEmailVerificacion();

    return user;

  }

  //Método para iniciar sesión que devuelve un usuario.
  async iniciarSesion(email: string, password: string): Promise<User> {
    try {
      const { user } = await this.afAuth.signInWithEmailAndPassword(email, password);
      this.actualizarDatosDUsuario(user);
      return user;
    } catch (error) {
      if ((error as firebase.default.auth.AuthError).code === "auth/wrong-password") {
        return null;
      }
    }
  }

  //Método que envía un correo para verificar el email del usuario.
  async enviarEmailVerificacion(): Promise<void> {
    try {
      return (await this.afAuth.currentUser).sendEmailVerification();
    } catch (error) {
      console.log('Error:', error);
    }
  }

  async isEmailVerificado(user: User) {
    return user.emailVerified;
  }

  //Método para cerrar sesión.
  async cerrarSesion(): Promise<void> {
    try {
      if (this.afAuth.currentUser) {
        await this.afAuth.signOut();
      }
    } catch (error) {
      console.log('Error:', error);
    }
  }

  private actualizarDatosDUsuario(user: User) {
    //Leeremos de la colección usuarios un documento con el uid del usuario que le pasemos por parámetros.
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`usuarios/${user.uid}`);

    const datos: User = {
      uid: user.uid,
      email: user.email,
      emailVerified: user.emailVerified,
      displayName: user.displayName
    };

    //Si ya existe le pediremos a firebase que haga un merge.
    return userRef.set(datos, { merge: true });
  }

  enviarEmailReseteoPassword(email: string) {
    this.afAuth.sendPasswordResetEmail(email);
  }

}
