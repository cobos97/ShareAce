import {Component, OnInit} from '@angular/core';
import {LoadingController, ModalController} from '@ionic/angular';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NuevaServiceService} from '../../services/nueva-service.service';

@Component({
    selector: 'app-modal-nueva',
    templateUrl: './modal-nueva.page.html',
    styleUrls: ['./modal-nueva.page.scss'],
})
export class ModalNuevaPage implements OnInit {

    private nueva: FormGroup;
    private myLoading: any;

    constructor(private modalController: ModalController,
                private formBuilder: FormBuilder,
                private loadingController: LoadingController,
                private nuevaS: NuevaServiceService) {
        this.nueva = this.formBuilder.group({
            tipo: ['', Validators.required],
            plazas: [''],
            fecha: ['', Validators.required]
        });
        console.log('Constructor');
    }

    /* Se ejecuta al submit el formulario. Crea un objeto proveniente del formulario (sería
    igual que this.todo.value) y llama a la función agregaNota del servicio. Gestiona la
    Promise para sincronizar la interfaz. */
    logForm() {
        console.log('Entra');
        const data = {
            tipo: this.nueva.get('tipo').value,
            plazas: this.nueva.get('plazas').value,
            fecha: this.nueva.get('fecha').value
        };
        console.log('Tipo: ' + data.tipo);
        console.log('Plazas: ' + data.plazas);
        console.log('Fecha: ' + data.fecha);
        /* Mostramos el cargando... */
        this.myLoading = this.presentLoading();
        this.nuevaS.agregaOferta(data)
            .then((docRef) => {
                console.log('ID insertado (por si lo necesitamos para algo...): ', docRef.id);
                /* Ponemos en blanco los campos del formulario*/
                this.nueva.setValue({
                    tipo: '',
                    plazas: '',
                    fecha: ''
                });
                /* Cerramos el cargando...*/
                this.loadingController.dismiss();
                this.modalController.dismiss();
                /*Podríamos ir a la página de listado*/
                // this.router.navigateByUrl('/tabs/(tab1:tab1)');
            })
            .catch((error) => {
                console.error('Error insertando documento: ', error);
                /* Cerramos el cargando...*/
                this.loadingController.dismiss();
                /* Mostramos un mensaje de error */
                /* A desarrollar, se aconseja emplear un componente denominado toast */
            });
    }

    /* Es un componente de la interfaz IONIC v4 */
    async presentLoading() {
        this.myLoading = await this.loadingController.create({
            message: 'Guardando'
        });
        return await this.myLoading.present();
    }

    ngOnInit() {
    }

    dismiss() {
        this.modalController.dismiss();
    }


}
