import {Component} from '@angular/core';

import {Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

import { AutenticationService } from './services/autentication.service';
import {Router} from '@angular/router';

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
        private router: Router
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
            .then(() => this.router.navigateByUrl('/inicio-sesion'))
            .catch( e => console.log(e));
    }

}
