import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';
import {AutenticationService} from '../../services/autentication.service';
import {Router} from '@angular/router';
import {ToastController} from '@ionic/angular';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'app-registro',
    templateUrl: './registro.page.html',
    styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

    registroForm: FormGroup;
    userdata: any;

    mensaje: any;

    /**
     *
     * @param formBuilder Constructor del formulario
     * @param authService Servicio propio de autenticación de usuarios
     * @param router Navegación entre páginas
     * @param toastController Controlador de los toast
     * @param translate Módulo de traducción
     */
    constructor(private formBuilder: FormBuilder,
                private authService: AutenticationService,
                private router: Router,
                private toastController: ToastController,
                private translate: TranslateService) {
    }

    /**
     * Inicializa el formulario de registro y pone los campos como obligatorios
     */
    ngOnInit() {
        this.registroForm = this.formBuilder.group({
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
     * Llama al servicio de autenticación y en caso de éxito llama al método presentToast() con un
     * mensaje de éxito y redirige a la página de inicio de sesión.
     * En caso de error llama al método presentToast() con mensaje de error dependiendo del error devuelto
     * del servicio.
     */
    onSubmit() {
        this.userdata = this.saveUserdata();
        this.authService.registroUsuario(this.userdata)
            .then(() => {
                this.presentToast(this.translate.instant('createuser'));
                this.router.navigateByUrl('/inicio-sesion');
            })
            .catch(e => {
                console.log(e.message);
                if (e.message == 'The email address is badly formatted.') {
                    this.presentToast(this.translate.instant('badly'));
                }
                if (e.message == 'Password should be at least 6 characters') {
                    this.presentToast(this.translate.instant('password_err'));
                }
                if (e.message == 'The email address is already in use by another account.') {
                    this.presentToast(this.translate.instant('in_use'));
                }
            });
    }

    /**
     * Devuelve los datos del usuario tras recogerlos del formulario.
     */
    saveUserdata() {
        const saveUserdata = {
            email: this.registroForm.get('email').value,
            password: this.registroForm.get('password').value,
        };
        return saveUserdata;
    }

    /**
     * Método asíncrono que muestra un toast
     * @param mensaje Mensaje que aparecerá en el toast
     */
    async presentToast(mensaje) {
        const toast = await this.toastController.create({
            message: mensaje,
            duration: 3000
        });
        toast.present();
    }


}
