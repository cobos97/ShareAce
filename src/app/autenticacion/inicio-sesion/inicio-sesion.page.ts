import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AutenticationService} from '../../services/autentication.service';
import {Router} from '@angular/router';
import {NativeStorage} from '@ionic-native/native-storage/ngx';
import {ToastController} from '@ionic/angular';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'app-inicio-sesion',
    templateUrl: './inicio-sesion.page.html',
    styleUrls: ['./inicio-sesion.page.scss'],
})
export class InicioSesionPage implements OnInit {

    inicioForm: FormGroup;
    userdata: any;

    sesion: any;

    /**
     *
     * @param formBuilder Constructor del formulario
     * @param authService Servicio propio de autenticación de usuarios
     * @param router Navegación entre páginas
     * @param nativeStorage Módulo para acceder a la base de datos local
     * @param toastController Controlador de los toast
     * @param translate Módulo de traducción
     */
    constructor(private formBuilder: FormBuilder,
                private authService: AutenticationService,
                private router: Router,
                private nativeStorage: NativeStorage,
                private toastController: ToastController,
                private translate: TranslateService) {
    }

    /**
     * Primero consulta el valor de la variable sesión en la base de datos local
     * y si es 'si' redirige a la página de las tabs, pues ya habría iniciado
     * sesión antes.
     * Segundo inicializa el formulario de inicio de sesión y pone como obligatorios ambos campos
     */
    ngOnInit() {
        this.consultarSesion()
            .then(
                data => {
                    if (data == 'si') {
                        this.router.navigateByUrl('/tabs/tabs/tab1');
                    }
                },
                error => console.error(error)
            );

        this.inicioForm = this.formBuilder.group({
            'email': ['', [
                Validators.required,
                Validators.email
            ]
            ],
            'password': ['', [
                Validators.required
            ]
            ]
        });


    }

    /**
     * Se ejecuta cuando se valida el formulario.
     * Rellena los datos del usuario llamando al método saveUserdata().
     * Llama al servicio de autenticación y en caso de éxito llama al método guardarSesión()
     * y redirige a la página principal de las tabs. En caso de error llama al método presentToast()
     */
    onSubmit() {
        this.userdata = this.saveUserdata();
        this.authService.inicioSesionUsuario(this.userdata)
            .then(() => {
                this.guardarSesion();
                this.router.navigateByUrl('/tabs/tabs/tab1');
            })
            .catch(e => {
                console.log(e);
                this.presentToast();
            });
    }

    /**
     * Devuelve los datos del usuario tras recogerlos del formulario.
     */
    saveUserdata() {
        const saveUserdata = {
            email: this.inicioForm.get('email').value,
            password: this.inicioForm.get('password').value,
        };
        return saveUserdata;
    }

    /**
     * Sustituye el valor de la variable sesión en la base de datos local cuando iniciamos sesión
     */
    guardarSesion() {
        this.nativeStorage.setItem('sesion', 'si')
            .then(
                () => console.log('Stored item!'),
                error => console.error('Error storing item', error)
            );
    }

    /**
     * Devuelve el valor de la variable sesión de la base de datos local
     */
    consultarSesion() {
        return this.nativeStorage.getItem('sesion');
    }

    /**
     * Método asíncrono que muestra un toast con un mensaje de error al iniciar sesión
     */
    async presentToast() {
        const toast = await this.toastController.create({
            message: this.translate.instant('error_login'),
            duration: 3000
        });
        toast.present();
    }

}
