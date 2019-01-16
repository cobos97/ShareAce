import {Component, OnInit, ViewChild} from '@angular/core';
import {AlertController, IonInfiniteScroll, IonSlides, LoadingController, ModalController} from '@ionic/angular';
import {ModalNuevaPage} from '../modals/modal-nueva/modal-nueva.page';
import {NuevaServiceService} from '../services/nueva-service.service';

@Component({
    selector: 'app-tab1',
    templateUrl: 'tab1.page.html',
    styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
    @ViewChild('SwipedTabsSlider') private SwipedTabsSlider: IonSlides;
    @ViewChild('infiniteScroll') ionInfiniteScroll: IonInfiniteScroll;
    @ViewChild('dynamicList') dynamicList;

    listado = [];
    listadoPanel = [];

    SwipedTabsIndicator: any = null;
    tabs = ['selectTab(0)', 'selectTab(1)'];
    ntabs = 2;
    private category: any;

    constructor(private modalControler: ModalController,
                private nuevaS: NuevaServiceService,
                public loadingController: LoadingController,
                private controlerAceptar: AlertController,
                private alertCtrl: AlertController) {
        this.initializeItems();
    }

    ngOnInit() {
    }

    /* Analizar el ciclo de vida de los componentes: justo cuando se hace activa */
    ionViewDidEnter() {
        this.SwipedTabsIndicator = document.getElementById('indicator');
        this.presentLoading('Cargando');
        this.nuevaS.leeOfertas()
            .subscribe((querySnapshot) => {
                this.listado = [];
                this.delete();
                querySnapshot.forEach((doc) => {
// doc.data() is never undefined for query doc snapshots
// console.log(doc.id, " => ", doc.data());
                    this.listado.push({id: doc.id, ...doc.data()});
                });
// console.log(this.listado);
                this.listadoPanel = this.listado;
                this.loadingController.dismiss();
            });
    }
    /* Esta función es llamada por el componente Refresher de IONIC v4 */
    doRefresh(refresher) {
        this.nuevaS.leeOfertas()
            .subscribe(querySnapshot => {
                this.listado = [];
                this.delete();
                /* Es un hack para solucionar un bug con el refresher y las listas
               dinámicas (ngFor) */
                querySnapshot.forEach((doc) => {
                    this.listado.push({id: doc.id, ...doc.data()});
                });
                this.listadoPanel = this.listado;
                refresher.target.complete();
            });
    }

    async delete() { // para solucionar el tema de list-items-sliding con ngfor
        await this.dynamicList.closeSlidingItems();
    }

    initializeItems() {
        this.listadoPanel = this.listado;
    }

    async nuevaOfertaModal() {
        const modal = await this.modalControler.create({
            component: ModalNuevaPage
        });
        await modal.present();
    }


    ionViewWillEnter() {
        this.category = '0';
        this.SwipedTabsSlider.length().then(l => {  // no sería necesario aquí, solo en ngOnInit
            this.ntabs = l;
        });
    }

    /* Actualiza la categoría que esté en ese momento activa*/
    updateCat(cat: Promise<any>) {
        cat.then(dat => {
            this.category = dat;
            this.category = +this.category; // to int;
            if (this.category == 1) {
                // if (this.cloud.isInfinityScrollEnabled()) {
                //    this.ionInfiniteScroll.disabled = false;
                // } else {
                    this.ionInfiniteScroll.disabled = true;
                // }
            } else {
                this.ionInfiniteScroll.disabled = false;
            }
        });
    }

    /* El método que permite actualizar el indicado cuando se cambia de slide*/
    updateIndicatorPosition() {
        this.SwipedTabsSlider.getActiveIndex().then(i => {
            if (this.ntabs > i) {  // this condition is to avoid passing to incorrect index
                this.SwipedTabsIndicator.style.webkitTransform = 'translate3d(' + (i * 100) + '%,0,0)';
            }
        });
    }

    /* El método que anima la "rayita" mientras nos estamos deslizando por el slide*/
    animateIndicator(e) {
        // console.log(e.target.swiper.progress);
        if (this.SwipedTabsIndicator) {
            this.SwipedTabsIndicator.style.webkitTransform = 'translate3d(' +
                ((e.target.swiper.progress * (this.ntabs - 1)) * 100) + '%,0,0)';
        }
    }

    async presentLoading(msg) {
        const myloading = await this.loadingController.create({
            message: msg
        });
        return await myloading.present();
    }

}
