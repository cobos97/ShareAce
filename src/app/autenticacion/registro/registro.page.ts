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

    constructor(private formBuilder: FormBuilder,
                private authService: AutenticationService,
                private router: Router,
                private toastController: ToastController,
                private translate: TranslateService) {
    }

    ngOnInit() {
        this.registroForm = this.formBuilder.group({
            'email': ['', [
                Validators.required,
                Validators.email
            ]
            ],
            'password': ['', [
                Validators.required/*,
                Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
                Validators.minLength(6)*/
            ]
            ]
        });
        /*
        this.registroForm.valueChanges.subscribe(data =>
            this.onValueChanged(data));
        this.onValueChanged();
        */
    }

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

    saveUserdata() {
        const saveUserdata = {
            email: this.registroForm.get('email').value,
            password: this.registroForm.get('password').value,
        };
        return saveUserdata;
    }

    async presentToast(mensaje) {
        const toast = await this.toastController.create({
            message: mensaje,
            duration: 3000
        });
        toast.present();
    }


}
