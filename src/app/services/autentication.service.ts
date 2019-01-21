import {Injectable} from '@angular/core';
import * as firebase from 'firebase';

@Injectable({
    providedIn: 'root'
})
export class AutenticationService {

    constructor() {
        firebase.initializeApp({
            apiKey: 'AIzaSyDFcO1MSqbn0t-DwDgBcAddabqNFeplbro',
            authDomain: 'shareace-8d72b.firebaseapp.com',
            projectId: 'shareace-8d72b'
        });
    }

    registroUsuario(userdata) {
        return firebase.auth().createUserWithEmailAndPassword(userdata.email, userdata.password);
    }

    inicioSesionUsuario(userdata) {
        return firebase.auth().signInWithEmailAndPassword(userdata.email, userdata.password);
    }

    cerrarSesion() {
        return firebase.auth().signOut();
    }
}
