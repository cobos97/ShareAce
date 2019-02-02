import {Component} from '@angular/core';

import {AlertController, MenuController, Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

import {AutenticationService} from './services/autentication.service';
import {Router} from '@angular/router';
import {NativeStorage} from '@ionic-native/native-storage/ngx';

import {AngularFireAuth} from 'angularfire2/auth';

import {HttpClientModule, HttpClient} from '@angular/common/http';
import {TranslateModule, TranslateLoader, TranslateService} from '@ngx-translate/core';
import {setTranslateLoader} from './app.module';

import {environment} from '../environments/environment';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html'
})
export class AppComponent {
    public appPages = [
        {
            title: 'home',
            url: '/tabs/tabs/tab1',
            icon: 'home'
        },
        {
            title: 'help',
            url: '/ayuda',
            icon: 'help'
        }
    ];

    langmenu: any;

    email: any;
    fecha: any;

    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private athService: AutenticationService,
        private router: Router,
        private nativeStorage: NativeStorage,
        private translate: TranslateService,
        private afa: AngularFireAuth,
        private controlerSalir: AlertController,
        private menu: MenuController
    ) {
        this.initializeApp();
        this.langmenu = (environment.defaultLanguage == 'es' ? false : true);
    }

    setEmail(email) {
        this.email = email;
    }


    initializeApp() {
        this.platform.ready().then(() => {
            this.translate.addLangs(environment.currentLanguages);
            if (this.translate.getBrowserLang) {  // if browsers's language is avalaible is set up as default
                if (environment.currentLanguages.includes(this.translate.getBrowserLang())) {
                    this.translate.use(this.translate.getBrowserLang());
                }
            }
            // Here we will check if the user is already logged in
            // because we don't want to ask users to log in each time they open the app
            this.statusBar.styleDefault();

            const d: Date = new Date();
            this.fecha = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();


        });
    }

    async mostrarSalir() {
        const alert = await this.controlerSalir.create({
            header: 'Cerrar sesión',
            message: '¿Esta seguro que desea cerrar la sesión?',
            buttons: [
                {
                    text: 'Cancelar',
                    handler: () => {
                        console.log('Cancelar clicked');
                    }
                },
                {
                    text: 'Aceptar',
                    handler: () => {
                        console.log('Aceptar clicked');
                        this.menu.close();
                        this.cerrarSesion();
                    }
                }
            ]
        });

        await alert.present();

    }

    cerrarSesion() {
        console.log('Cierrate');
        this.athService.cerrarSesion()
            .then(() => {
                this.router.navigateByUrl('/inicio-sesion');
                this.cierraSesion();
            })
            .catch(e => console.log(e));
    }

    cierraSesion() {
        this.nativeStorage.setItem('sesion', 'no')
            .then(
                () => console.log('Stored item!'),
                error => console.error('Error storing item', error)
            );
    }

    changeLang(e) {
        // console.log(e.detail.checked);
        if (e.detail.checked) {
            this.translate.use('en');
        } else {
            this.translate.use('es');
        }
    }

}
