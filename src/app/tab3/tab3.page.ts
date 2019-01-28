import {Component} from '@angular/core';
import {LoadingController, ModalController} from '@ionic/angular';
import {LugaresService} from '../services/lugares.service';
import {CallNumber} from '@ionic-native/call-number/ngx';
import {ModalMapaPage} from '../modals/modal-mapa/modal-mapa.page';

@Component({
    selector: 'app-tab3',
    templateUrl: 'tab3.page.html',
    styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

    lugaresPanel = [];
    lugares = [];

    constructor(private lugaresS: LugaresService,
                public loadingController: LoadingController,
                private callNumber: CallNumber,
                private modalController: ModalController
    ) {
        this.initializeItems();
    }

    initializeItems() {
        this.lugaresPanel = this.lugares;

        this.lugaresS.leeLugares().then(
            querySnapshot => {
                this.lugares = [];
                querySnapshot.forEach((doc) => {
                    this.lugares.push({id: doc.id, ...doc.data()});
                });
                this.lugaresPanel = this.lugares;
                this.loadingController.dismiss();
            }
        );
    }

    ionViewDidEnter() {
        // this.presentLoading('Cargando');
        /*
        this.lugaresS.leeLugares().then(
            querySnapshot => {
                this.lugares = [];
                querySnapshot.forEach((doc) => {
                    this.lugares.push({id: doc.id, ...doc.data()});
                });
                this.lugaresPanel = this.lugares;
                this.loadingController.dismiss();
            }
        );
        */
    }


    hacerLlamada(numero) {
        console.log(numero);

        this.callNumber.callNumber(numero, true)
            .then(() => console.log('Launched dialer!'))
            .catch(() => console.log('Error launching dialer'));

    }

    async mostrarMapa(mapax: any, mapay: any, titulo: any) {
        const modal = await this.modalController.create({
            component: ModalMapaPage,
            componentProps: {mapax: mapax, mapay: mapay, titulo: titulo}
        });
        await modal.present();
    }


    async presentLoading(msg) {
        const myloading = await this.loadingController.create({
            message: msg
        });
        return await myloading.present();
    }

}
