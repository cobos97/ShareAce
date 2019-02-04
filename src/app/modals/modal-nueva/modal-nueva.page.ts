import {Component, OnInit} from '@angular/core';
import {AlertController, LoadingController, ModalController} from '@ionic/angular';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NuevaServiceService} from '../../services/nueva-service.service';

import {AngularFireAuth} from 'angularfire2/auth';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'app-modal-nueva',
    templateUrl: './modal-nueva.page.html',
    styleUrls: ['./modal-nueva.page.scss'],
})
export class ModalNuevaPage implements OnInit {

    private nueva: FormGroup;
    private myLoading: any;

    /**
     * Construye el formulario y pone los campos a obligatorios
     * @param modalController Controlador de la ventana modal
     * @param formBuilder Constructor del formulario
     * @param loadingController Controlador del loading
     * @param nuevaS Servicio propio para interactuar con Firebase
     * @param afa Módulo de autenticación de angular
     * @param alertCtrl Controlador de los alerts
     * @param translate Módulo de traducción
     */
    constructor(private modalController: ModalController,
                private formBuilder: FormBuilder,
                private loadingController: LoadingController,
                private nuevaS: NuevaServiceService,
                private afa: AngularFireAuth,
                private alertCtrl: AlertController,
                private translate: TranslateService) {
        this.nueva = this.formBuilder.group({
            tipo: ['', Validators.required],
            plazas: ['', Validators.required],
            fecha: ['', Validators.required],
            lugar: ['', Validators.required]
        });
        console.log('Constructor');
    }


    /**
     * Primero recupera los datos del formulario y los engloba en data.
     * Segundo llama al servicio para agregar la oferta, en caso de éxito muestra la confirmación
     * y cierra el modal y en caso de error solo cierra el cargando
     */
    logForm() {
        console.log('Entra');
        const data = {
            tipo: this.nueva.get('tipo').value,
            plazas: this.nueva.get('plazas').value,
            fecha: this.nueva.get('fecha').value,
            ofertante: this.afa.auth.currentUser.email,
            lugar: this.nueva.get('lugar').value,
            aceptada: []
        };
        // Muestra el cargando...
        this.myLoading = this.presentLoading();
        this.nuevaS.agregaOferta(data)
            .then((docRef) => {
                console.log('ID insertado (por si lo necesitamos para algo...): ', docRef.id);
                // Ponemos en blanco los campos del formulario
                this.nueva.setValue({
                    tipo: '',
                    plazas: '',
                    fecha: '',
                    lugar: ''
                });
                // Cerramos el cargando...
                this.loadingController.dismiss();
                this.mostarConfirmacion();
                this.modalController.dismiss();

            })
            .catch((error) => {
                console.error('Error insertando documento: ', error);
                // Cerramos el cargando...
                this.loadingController.dismiss();

            });
    }


    /**
     * Método asíncrono que muestra el cargando...
     */
    async presentLoading() {
        this.myLoading = await this.loadingController.create({
            message: this.translate.instant('saving')
        });
        return await this.myLoading.present();
    }

    ngOnInit() {
    }

    /**
     * Cierra el modal
     */
    dismiss() {
        this.modalController.dismiss();
    }

    /**
     * Método asíncrono que muestra un alert de confirmación
     */
    async mostarConfirmacion() {
        const mensaje = await this.alertCtrl.create({
            header: this.translate.instant('success'),
            message: this.translate.instant('success_message'),
            buttons: [
                {
                    text: this.translate.instant('acept'),
                    handler: () => {
                        console.log('Aceptar clicked');
                    }
                }
            ]
        });

        await mensaje.present();

    }


}
