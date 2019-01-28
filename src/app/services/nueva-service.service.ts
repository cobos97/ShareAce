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

    leeOfertasFiltradas() {
        const d: Date = new Date();
        const today = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
        console.log(today);
        return this.myCollection.ref.where('plazas', '>', 0).orderBy('plazas').orderBy('fecha').get();
    }

    leeOfertasAceptadas() {
        return this.myCollection.ref.get();
    }

    actualizaOferta(id, data) {
        return this.myCollection.doc(id).set(data);
    }


}
