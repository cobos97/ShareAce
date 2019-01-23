import {Injectable} from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';
import {environment} from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class LugaresService {

    myCollection: any;

    constructor(private fireStore: AngularFirestore) {
        this.myCollection =
            fireStore.collection<any>(environment.firebaseConfig.lugaresColeccion);
    }

    leeLugares() {
        return this.myCollection.ref.get();
    }

}
