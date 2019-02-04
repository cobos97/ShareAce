import {Injectable} from '@angular/core';
import * as firebase from 'firebase';

@Injectable({
    providedIn: 'root'
})
export class AutenticationService {

    /**
     * Inicializa los parámetros de firebase
     */
    constructor() {
        firebase.initializeApp({
            apiKey: 'AIzaSyDFcO1MSqbn0t-DwDgBcAddabqNFeplbro',
            authDomain: 'shareace-8d72b.firebaseapp.com',
            projectId: 'shareace-8d72b'
        });
    }

    /**
     * Crea un nuevo usuario y devuelve un promise
     * @param userdata Datos de usuario (email y contraseña)
     */
    registroUsuario(userdata) {
        return firebase.auth().createUserWithEmailAndPassword(userdata.email, userdata.password);
    }

    /**
     * Inicia sesión con un usuario y devuelve un promise
     * @param userdata Datos de usuario (email y contraseña)
     */
    inicioSesionUsuario(userdata) {
        return firebase.auth().signInWithEmailAndPassword(userdata.email, userdata.password);
    }

    /**
     * Cierra la sesion del usuario actual y devuelve un promise
     */
    cerrarSesion() {
        return firebase.auth().signOut();
    }
}
