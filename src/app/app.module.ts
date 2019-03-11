import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';

import {AngularFireModule} from 'angularfire2';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {environment} from '../environments/environment';
import {AngularFireAuth} from 'angularfire2/auth';

import {AutenticationService} from './services/autentication.service';
import {CallNumber} from '@ionic-native/call-number/ngx';

import {Geolocation} from '@ionic-native/geolocation/ngx';
import {NativeStorage} from '@ionic-native/native-storage/ngx';

import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {TranslateLoader, TranslateModule, TranslateService, TranslateStore} from '@ngx-translate/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {Toast} from '@ionic-native/toast/ngx';
import { ServiceWorkerModule } from '@angular/service-worker';

export function setTranslateLoader(http: any) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

// @ts-ignore
@NgModule({
    declarations: [AppComponent],
    entryComponents: [],
    imports: [BrowserModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        HttpClientModule,
        TranslateModule.forRoot({  // Módulo de traducción
            loader: {
                provide: TranslateLoader,
                useFactory: (setTranslateLoader),
                deps: [HttpClient]
            }
        }),
        AngularFirestoreModule,
        ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })],
    providers: [
        StatusBar,
        SplashScreen,
        AutenticationService,
        AngularFireAuth,
        CallNumber,
        NativeStorage,
        Geolocation,
        Toast,
        TranslateService,
        TranslateStore,
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
