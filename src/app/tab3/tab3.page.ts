import {Component} from '@angular/core';
import {LoadingController, ModalController} from '@ionic/angular';
import {LugaresService} from '../services/lugares.service';
import {CallNumber} from '@ionic-native/call-number/ngx';
import {ModalMapaPage} from '../modals/modal-mapa/modal-mapa.page';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'app-tab3',
    templateUrl: 'tab3.page.html',
    styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

    lugaresPanel = [];
    lugares = [];

    /**
     * Llama al método que inicializa todos los elementos de la page
     * @param lugaresS Servicio Propio encargado de hacer las operaciones relacionadas a lugares
     * @param loadingController Controlador del loading
     * @param callNumber Plugin nativo para hacer llamadas
     * @param modalController Controlador de las pages modales
     */
    constructor(private lugaresS: LugaresService,
                public loadingController: LoadingController,
                private callNumber: CallNumber,
                private modalController: ModalController,
                private translate: TranslateService) {

        this.initializeItems();
    }

    /**
     * Asigna al lista del panel lo elementos correctos del listado recuperado
     */
    initializeItems() {
        this.lugaresPanel = this.lugares;
    }

    /**
     * Recupera los lugares guardados llamando al servicio
     */
    ionViewDidEnter() {
        this.presentLoading(this.translate.instant('loading'));
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


    /**
     * Se encarga de llamar a la aplicación nativa del telefono
     * @param numero Número al que va a llamar
     */
    hacerLlamada(numero) {
        console.log(numero);

        this.callNumber.callNumber(numero, true)
            .then(() => console.log('Launched dialer!'))
            .catch(() => console.log('Error launching dialer'));

    }

    /**
     * Método asíncrono que presenta el modal del mapa
     * @param mapax Coordenada x del lugar
     * @param mapay Coordenada y del lugar
     * @param titulo Título de la localización
     */
    async mostrarMapa(mapax: any, mapay: any, titulo: any) {
        const modal = await this.modalController.create({
            component: ModalMapaPage,
            componentProps: {mapax: mapax, mapay: mapay, titulo: titulo}
        });
        await modal.present();
    }

    /**
     * Método para filtrar los elementos del listado de lugares
     * @param ev Evento del searchbar (cada vez que escribe)
     */
    getFilteredItem(ev: any) {
        // Reset items back to all of the items
        this.initializeItems();

        // set val to the value of the searchbar
        const val = ev.target.value;

        // if the value is an empty string don't filter the items
        if (val && val.trim() != '') {
            this.lugaresPanel = this.lugaresPanel.filter((item) => {
                return (item.localizacion.toLowerCase().indexOf(val.toLowerCase()) > -1);
            });
        }
    }


    /**
     * Método asíncrono que muestra el loading
     * @param msg Mensaje del loading
     */
    async presentLoading(msg) {
        const myloading = await this.loadingController.create({
            message: msg
        });
        return await myloading.present();
    }

}
