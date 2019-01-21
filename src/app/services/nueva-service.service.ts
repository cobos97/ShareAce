import {Injectable} from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';
import {environment} from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class NuevaServiceService {
    myCollection: any;

    constructor(private fireStore: AngularFirestore) {
        this.myCollection =
            fireStore.collection<any>(environment.firebaseConfig.ofertasColeccion);
    }

    agregaOferta(datos) {
        return this.myCollection.add(datos);
    }

    leeOfertas() {
        return this.myCollection.ref.orderBy('fecha').get();
    }

    actualizaOferta(id, data) {
        return this.myCollection.doc(id).set(data);
    }


}
