import {Injectable} from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';
import {environment} from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class NuevaServiceService {
    myCollection: any;

    /**
     * Inicializa la coleccion de ofertas de firebase
     * @param fireStore Plugin de firebase
     */
    constructor(private fireStore: AngularFirestore) {
        this.myCollection =
            fireStore.collection<any>(environment.firebaseConfig.ofertasColeccion);
    }

    /**
     * Agraga un documento a la coleccion de ofertas y devuelve un promise
     * @param datos Datos del documento
     */
    agregaOferta(datos) {
        return this.myCollection.add(datos);
    }

    /**
     * Devuelve un promise con todos los datos de la coleccion ofertas filtrados
     * (plazas positivas y ordenados por fecha)
     */
    leeOfertasFiltradas() {
        return this.myCollection.ref.where('plazas', '>', 0).orderBy('plazas').orderBy('fecha').get();
    }

    /**
     * Devuelve un promise con todos los datos de la coleccion ofertas sin filtrar
     */
    leeOfertasAceptadas() {
        return this.myCollection.ref.get();
    }

    /**
     * Actualiza un documento de la colección ofertas
     * @param id Id del documento anterior
     * @param data Datos del nuevo documento
     */
    actualizaOferta(id, data) {
        return this.myCollection.doc(id).set(data);
    }


}
