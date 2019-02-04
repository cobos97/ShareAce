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

    /**
     * En el constructor inicializo los valores de la aplicación y el idioma
     * @param platform
     * @param splashScreen
     * @param statusBar
     * @param athService Servicio de autentificación propio de usuarios
     * @param router Módulo para navegar entre las diferentes páginas
     * @param nativeStorage Módulo para acceder a la base de datos local
     * @param translate Módulo de traducción
     * @param afa Servicio de angular para reconocer al usuario actual
     * @param alertController Controlador de lal alertas modales
     * @param menu Controlador del menú
     */
    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private athService: AutenticationService,
        private router: Router,
        private nativeStorage: NativeStorage,
        private translate: TranslateService,
        private afa: AngularFireAuth,
        private alertController: AlertController,
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

            this.statusBar.styleDefault();

        });
    }

    /**
     * Se encarga de mostrar el alert de confirmación al pulsar cerrar ssión en el menú
     * y de llamar al metodo cerrarSesion() en caso de aceptar
     */
    async mostrarSalir() {
        const alert = await this.alertController.create({
            header: this.translate.instant('close_session'),
            message: this.translate.instant('are_you_sure'),
            buttons: [
                {
                    text: this.translate.instant('cancel'),
                    handler: () => {
                        console.log('Cancelar clicked');
                    }
                },
                {
                    text: this.translate.instant('acept'),
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

    /**
     * LLama al servicio de autentificación al metodo de cerrar sesión, en caso de éxito llama al método
     * cierraSesion() y redirige a la página de iniciar sesión.
     */
    cerrarSesion() {
        console.log('Cierrate');
        this.athService.cerrarSesion()
            .then(() => {
                this.router.navigateByUrl('/inicio-sesion');
                this.cierraSesion();
            })
            .catch(e => console.log(e));
    }

    /**
     * Sustituye el valor de la variable sesión en la base de datos local cuando cerramos la sesión
     */
    cierraSesion() {
        this.nativeStorage.setItem('sesion', 'no')
            .then(
                () => console.log('Stored item!'),
                error => console.error('Error storing item', error)
            );
    }

    /**
     * Encargado de cambiar el idioma
     * @param e Evento del cambio de posición del toogle
     */
    changeLang(e) {
        // console.log(e.detail.checked);
        if (e.detail.checked) {
            this.translate.use('en');
        } else {
            this.translate.use('es');
        }
    }

}
