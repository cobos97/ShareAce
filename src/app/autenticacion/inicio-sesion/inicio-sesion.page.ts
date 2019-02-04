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

    constructor(private formBuilder: FormBuilder,
                private authService: AutenticationService,
                private router: Router,
                private nativeStorage: NativeStorage,
                private toastController: ToastController,
                private translate: TranslateService) {
    }

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

    saveUserdata() {
        const saveUserdata = {
            email: this.inicioForm.get('email').value,
            password: this.inicioForm.get('password').value,
        };
        return saveUserdata;
    }

    guardarSesion() {
        this.nativeStorage.setItem('sesion', 'si')
            .then(
                () => console.log('Stored item!'),
                error => console.error('Error storing item', error)
            );
    }

    consultarSesion() {
        return this.nativeStorage.getItem('sesion');
        /*
        .then(
            data => {
                this.sesion = data;
                console.log(data);
            },
            error => console.error(error)
        );
    */
    }

    async presentToast() {
        const toast = await this.toastController.create({
            message: this.translate.instant('error_login'),
            duration: 3000
        });
        toast.present();
    }

}
