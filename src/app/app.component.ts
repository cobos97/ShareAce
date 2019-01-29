import {Component} from '@angular/core';

import {Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

import {AutenticationService} from './services/autentication.service';
import {Router} from '@angular/router';
import {NativeStorage} from '@ionic-native/native-storage/ngx';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html'
})
export class AppComponent {
    public appPages = [
        {
            title: 'Inicio',
            url: '/tabs/tabs/tab1',
            icon: 'home'
        }
    ];

    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private athService: AutenticationService,
        private router: Router,
        private nativeStorage: NativeStorage
    ) {
        this.initializeApp();
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });
    }

    cerrarSesion() {
        console.log('Cierrate');
        this.athService.cerrarSesion()
            .then(() => {
                this.router.navigateByUrl('/inicio-sesion');
                this.cierraSesion();
            } )
            .catch(e => console.log(e));
    }

    cierraSesion() {
        this.nativeStorage.setItem('sesion', 'no')
            .then(
                () => console.log('Stored item!'),
                error => console.error('Error storing item', error)
            );
    }

}
