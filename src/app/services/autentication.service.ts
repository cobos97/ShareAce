import {Injectable} from '@angular/core';
import * as firebase from 'firebase';

@Injectable({
    providedIn: 'root'
})
export class AutenticationService {

    constructor() {
        firebase.initializeApp({
            apiKey: 'AIzaSyDFcO1MSqbn0t-DwDgBcAddabqNFeplbro',
            authDomain: 'shareace-8d72b.firebaseapp.com'
        });
    }

    registroUsuario(userdata) {
        return firebase.auth().createUserWithEmailAndPassword(userdata.email, userdata.password);
    }

    inicioSesionUsuario(userdata) {
        return firebase.auth().signInWithEmailAndPassword(userdata.email, userdata.password);
    }
}
