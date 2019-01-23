import {Component} from '@angular/core';
import {LoadingController} from '@ionic/angular';
import {LugaresService} from '../services/lugares.service';
import {DomSanitizer} from '@angular/platform-browser';
import { CallNumber } from '@ionic-native/call-number';

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
                private sanitizer: DomSanitizer,
                private callNumber: CallNumber) {
        this.initializeItems();
    }

    initializeItems() {
        this.lugaresPanel = this.lugares;
    }

    ionViewDidEnter() {
        this.presentLoading('Cargando');
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

    getImagen(img) {
        return this.sanitizer.bypassSecurityTrustUrl(img);
    }

    hacerLlamada(numero) {
        this.callNumber.callNumber(numero, true)
            .then(() => console.log('Launched dialer!'))
            .catch(() => console.log('Error launching dialer'));
    }

    async presentLoading(msg) {
        const myloading = await this.loadingController.create({
            message: msg
        });
        return await myloading.present();
    }


}
