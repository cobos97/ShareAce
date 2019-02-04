import {Component, OnInit, ViewChild} from '@angular/core';
import {AlertController, IonInfiniteScroll, IonSlides, LoadingController, ModalController} from '@ionic/angular';
import {ModalNuevaPage} from '../modals/modal-nueva/modal-nueva.page';
import {NuevaServiceService} from '../services/nueva-service.service';

import * as firebase from 'firebase';
import {AngularFireAuth} from 'angularfire2/auth';
import {element} from 'protractor';
import {NativeStorage} from '@ionic-native/native-storage/ngx';

import {HttpClientModule, HttpClient} from '@angular/common/http';
import {TranslateModule, TranslateLoader, TranslateService} from '@ngx-translate/core';
import {setTranslateLoader} from '../app.module';

import {environment} from '../../environments/environment';
import {AppComponent} from '../app.component';
import {Toast} from '@ionic-native/toast/ngx';


@Component({
    selector: 'app-tab1',
    templateUrl: 'tab1.page.html',
    styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
    @ViewChild('SwipedTabsSlider') private SwipedTabsSlider: IonSlides;
    @ViewChild('infiniteScroll') ionInfiniteScroll: IonInfiniteScroll;
    @ViewChild('dynamicList') dynamicList;

    prueba = [];
    prueba2 = [];

    aceptadas = [];

    listado = [];
    listado2 = [];
    listadoPanel = [];
    listadoPanel2 = [];
    private myLoading: any;

    email: any;

    SwipedTabsIndicator: any = null;
    tabs = ['selectTab(0)', 'selectTab(1)'];
    ntabs = 2;
    category: any;

    constructor(private modalControler: ModalController,
                private nuevaS: NuevaServiceService,
                public loadingController: LoadingController,
                private controlerAceptar: AlertController,
                private alertCtrl: AlertController,
                private afa: AngularFireAuth,
                private nativeStorage: NativeStorage,
                private translate: TranslateService,
                private appComponent: AppComponent,
                private toast: Toast) {
        // translate.setDefaultLang(environment.defaultLanguage);
        this.initializeItems();
    }

    ngOnInit() {
    }

    /* Analizar el ciclo de vida de los componentes: justo cuando se hace activa */
    ionViewDidEnter() {
        this.SwipedTabsIndicator = document.getElementById('indicator');
        this.presentLoading('Cargando');
        this.nuevaS.leeOfertasFiltradas().then(
            querySnapshot => {
                this.listado = [];
                querySnapshot.forEach((doc) => {
                    this.listado.push({id: doc.id, ...doc.data()});
                });
                this.listadoPanel = this.listado;

                this.rellenaAceptadas();

                this.email = this.afa.auth.currentUser.email;
                console.log(this.email);

                this.appComponent.setEmail(this.email);

                /*
                this.nuevaS.leeOfertasPropias(this.afa.auth.currentUser.email).then(
                    querySnapshot2 => {
                        this.listado2 = [];
                        this.delete();
                        querySnapshot2.forEach((doc) => {
                            this.listado2.push({id: doc.id, ...doc.data()});
                        });
                        this.listadoPanel2 = this.listado2;
                        this.loadingController.dismiss();
                    }
                );
                */
            }
        );

        /*
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
            */
    }

    /* Esta función es llamada por el componente Refresher de IONIC v4 */
    doRefresh(refresher) {
        this.nuevaS.leeOfertasFiltradas().then(
            querySnapshot => {
                this.listado = [];
                querySnapshot.forEach((doc) => {
                    this.listado.push({id: doc.id, ...doc.data()});
                });
                this.listadoPanel = this.listado;
                this.rellenaAceptadas();
                refresher.target.complete();
            }
        );
        /*
        this.nuevaS.leeOfertas()
            .subscribe(querySnapshot => {
                this.listado = [];
                this.delete();
                */
        /* Es un hack para solucionar un bug con el refresher y las listas
       dinámicas (ngFor) */
        /*
        querySnapshot.forEach((doc) => {
            this.listado.push({id: doc.id, ...doc.data()});
        });
        this.listadoPanel = this.listado;
        refresher.target.complete();
    });
    */
    }

    initializeItems() {
        this.listadoPanel = this.listado;
    }

    async nuevaOfertaModal() {
        const modal = await this.modalControler.create({
            component: ModalNuevaPage
        });
        await modal.present();

        await modal.onDidDismiss()
            .then(response => {
                this.nuevaS.leeOfertasFiltradas()
                    .then(querySnapshot => {
                        this.listado = [];
                        /* Es un hack para solucionar un bug con el refresher y las listas
                       dinámicas (ngFor) */
                        querySnapshot.forEach((doc) => {
                            this.listado.push({id: doc.id, ...doc.data()});
                            // this.mostarConfirmacion();
                        });
                        this.listadoPanel = this.listado;
                    });

                this.rellenaAceptadas();

            })
            .catch(response => console.log(response));
    }


    aceptarOferta(item: any) {

        this.aceptadas = item.aceptada;
        this.aceptadas.push(this.afa.auth.currentUser.email);

        const data = {
            tipo: item.tipo,
            plazas: item.plazas - 1,
            fecha: item.fecha,
            ofertante: item.ofertante,
            lugar: item.lugar,
            aceptada: this.aceptadas
        };
        this.nuevaS.actualizaOferta(item.id, data)
            .then(() => {
                console.log('ID insertado (por si lo necesitamos para algo...): ', item.id);
                this.aceptadas = [];

            })
            .catch((error) => {
                console.error('Error insertando documento: ', error);
                // this.mostarConfirmacion();
                /* Cerramos el cargando...*/
                /* Mostramos un mensaje de error */
                /* A desarrollar, se aconseja emplear un componente denominado toast */
            });

        this.nuevaS.leeOfertasFiltradas().then(
            querySnapshot => {
                this.listado = [];
                querySnapshot.forEach((doc) => {
                    this.listado.push({id: doc.id, ...doc.data()});
                });
                this.listadoPanel = this.listado;
                // this.rellenaAceptadas();
            }
        );

        this.rellenaAceptadas();
        this.presentToast();
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
            /*
            if (this.category == 1) {
                // if (this.cloud.isInfinityScrollEnabled()) {
                //    this.ionInfiniteScroll.disabled = false;
                // } else {
                this.ionInfiniteScroll.disabled = true;
                // }
            } else {
                this.ionInfiniteScroll.disabled = false;
            }
            */
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

    presentToast() {
        this.toast.show(`Has aceptado la oferta`, '5000', 'center').subscribe(
            toast => {
                console.log(toast);
            }
        );
    }


    async mostarConfirmacion() {
        const mensaje = await this.alertCtrl.create({
            header: 'Exito',
            message: 'Tu oferta ha sido publicada, espera a que alguien se una a ti',
            buttons: [
                {
                    text: 'Aceptar',
                    handler: () => {
                        console.log('Aceptar clicked');
                    }
                }
            ]
        });

        await mensaje.present();

    }

    rellenaAceptadas() {
        this.prueba2 = [];
        this.nuevaS.leeOfertasAceptadas().then(
            querySnapshot3 => {
                this.prueba = [];
                querySnapshot3.forEach((doc) => {
                    this.prueba.push({id: doc.id, ...doc.data()});
                });
                this.prueba.forEach((elemento) => {
                    if (elemento.ofertante === this.afa.auth.currentUser.email) {
                        this.prueba2.push(elemento);
                    }
                    elemento.aceptada.forEach((emails) => {
                        if (emails === this.afa.auth.currentUser.email) {
                            this.prueba2.push(elemento);
                        }
                    });
                });
                this.loadingController.dismiss();
            }
        );
    }


    // PRUEBA DE GUARDAR EN BASE DE DATOS LOCAL
    guardarSesion() {
        this.nativeStorage.setItem('sesion', 'si')
            .then(
                () => console.log('Stored item!'),
                error => console.error('Error storing item', error)
            );
    }

    consultarSesion() {
        this.nativeStorage.getItem('myitem')
            .then(
                data => console.log(data),
                error => console.error(error)
            );
    }

}
