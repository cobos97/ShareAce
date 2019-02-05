import {Component, OnInit, ViewChild} from '@angular/core';
import {
    AlertController,
    IonInfiniteScroll,
    IonSlides,
    LoadingController,
    MenuController,
    ModalController,
    ToastController
} from '@ionic/angular';
import {ModalNuevaPage} from '../modals/modal-nueva/modal-nueva.page';
import {NuevaServiceService} from '../services/nueva-service.service';


import {AngularFireAuth} from 'angularfire2/auth';

import {NativeStorage} from '@ionic-native/native-storage/ngx';


import {TranslateService} from '@ngx-translate/core';

import {AppComponent} from '../app.component';


@Component({
    selector: 'app-tab1',
    templateUrl: 'tab1.page.html',
    styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
    @ViewChild('SwipedTabsSlider') private SwipedTabsSlider: IonSlides;
    @ViewChild('infiniteScroll') ionInfiniteScroll: IonInfiniteScroll;
    @ViewChild('dynamicList') dynamicList;

    listado2 = [];
    listadoPanel2 = [];

    aceptadas = [];

    listado = [];
    listadoPanel = [];


    email: any;

    SwipedTabsIndicator: any = null;
    tabs = ['selectTab(0)', 'selectTab(1)'];
    ntabs = 2;
    category: any;

    /**
     * Llama al método encargado de inicializar los elementos de la página
     * @param modalControler Controlador de la ventana modal
     * @param nuevaS Servicio propio para interactuar con Firebase
     * @param loadingController Controlador del cargando...
     * @param controlerAceptar Controlador de la alerta
     * @param alertCtrl Controlador de la alerta
     * @param afa Módulo de autenticación de angular
     * @param nativeStorage Módulo nativo de la base de datos local
     * @param translate Módulo de traducción
     * @param appComponent Componente de la página principal
     * @param toastController Controlador de las toasts
     */
    constructor(private modalControler: ModalController,
                private nuevaS: NuevaServiceService,
                public loadingController: LoadingController,
                private controlerAceptar: AlertController,
                private alertCtrl: AlertController,
                private afa: AngularFireAuth,
                private nativeStorage: NativeStorage,
                private translate: TranslateService,
                private appComponent: AppComponent,
                private toastController: ToastController,
                private menuController: MenuController) {
        this.menuController.enable(true);
        this.initializeItems();
    }

    ngOnInit() {
    }


    /**
     * Situa el indicador de los segments.
     * Llama al método del servicio para leer las ofertas y rellena el array del panel
     * Recupera el email del usuario actual y lo sustituye en el AppComponent
     */
    ionViewDidEnter() {
        this.SwipedTabsIndicator = document.getElementById('indicator');
        this.presentLoading(this.translate.instant('loading'));
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

            }
        );

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

    }

    initializeItems() {
        this.listadoPanel = this.listado;
    }

    /**
     * Método asíncrono que muestra la modal para una nueva oferta.
     * Cuando se cierra vuelve a rellenar el listado
     */
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


    /**
     * Añade a los aceptados de la oferta el usuario actual
     * @param item Oferta que se va a aceptar
     */
    aceptarOferta(item: any) {

        this.presentLoading(this.translate.instant('saving'));
        this.aceptadas = item.aceptada;
        this.aceptadas.push(this.afa.auth.currentUser.email);

        // Guarda los datos del usuario con el nuevo array de aceptadas
        const data = {
            tipo: item.tipo,
            plazas: item.plazas - 1,
            fecha: item.fecha,
            ofertante: item.ofertante,
            lugar: item.lugar,
            aceptada: this.aceptadas
        };

        // Llama al método de actualizarOferta del servicio, y vuelve a poner el array a vacio si tiene exito
        this.nuevaS.actualizaOferta(item.id, data)
            .then(() => {
                console.log('ID insertado (por si lo necesitamos para algo...): ', item.id);
                this.aceptadas = [];
                this.presentToast();
            })
            .catch((error) => {
                console.error('Error insertando documento: ', error);
            });

        // Vuelve a actualizar la lista del panel
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
        this.loadingController.dismiss();
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
            this.category = +this.category;
        });
    }

    /* El método que permite actualizar el indicado cuando se cambia de slide*/
    updateIndicatorPosition() {
        this.SwipedTabsSlider.getActiveIndex().then(i => {
            if (this.ntabs > i) {
                this.SwipedTabsIndicator.style.webkitTransform = 'translate3d(' + (i * 100) + '%,0,0)';
            }
        });
    }

    /* El método que anima la "rayita" mientras nos estamos deslizando por el slide*/
    animateIndicator(e) {
        if (this.SwipedTabsIndicator) {
            this.SwipedTabsIndicator.style.webkitTransform = 'translate3d(' +
                ((e.target.swiper.progress * (this.ntabs - 1)) * 100) + '%,0,0)';
        }
    }

    /**
     * Método asíncrono que presenta el cargando...
     * @param msg Mensaje que va a mostrar
     */
    async presentLoading(msg) {
        const myloading = await this.loadingController.create({
            message: msg
        });
        return await myloading.present();
    }

    /**
     * Rellena la lista de las oferas aceptadas de la misma forma que rellena
     * las del primer segment, pero filtrandolas (solo aparecen las ofrecidas por el
     * usuario actual y las que el usuario actual ha aceptado)
     */
    rellenaAceptadas() {
        this.listadoPanel2 = [];
        this.nuevaS.leeOfertasAceptadas().then(
            querySnapshot3 => {
                this.listado2 = [];
                querySnapshot3.forEach((doc) => {
                    this.listado2.push({id: doc.id, ...doc.data()});
                });
                this.listado2.forEach((elemento) => {
                    if (elemento.ofertante === this.afa.auth.currentUser.email) {
                        this.listadoPanel2.push(elemento);
                    }
                    elemento.aceptada.forEach((emails) => {
                        if (emails === this.afa.auth.currentUser.email) {
                            this.listadoPanel2.push(elemento);
                        }
                    });
                });
                this.loadingController.dismiss();
            }
        );
    }


    /**
     * Método asíncrono que muestra un toast
     */
    async presentToast() {
        const toast = await this.toastController.create({
            message: this.translate.instant('acept_offer'),
            duration: 3000
        });
        toast.present();
    }

}
