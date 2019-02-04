import {Injectable} from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';
import {environment} from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class LugaresService {

    myCollection: any;

    /**
     * Inicializa la coleccion de lugares de firebase
     * @param fireStore Plugin de firebase
     */
    constructor(private fireStore: AngularFirestore) {
        this.myCollection =
            fireStore.collection<any>(environment.firebaseConfig.lugaresColeccion);
    }

    /**
     * Devuelve un promise con todos los datos de la colección de lugares
     */
    leeLugares() {
        return this.myCollection.ref.get();
    }

}
