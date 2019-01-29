import {IonicModule} from '@ionic/angular';
import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Tab3Page} from './tab3.page';
import {ModalMapaPage} from '../modals/modal-mapa/modal-mapa.page';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {setTranslateLoader} from '../app.module';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        RouterModule.forChild([{path: '', component: Tab3Page}]),
        HttpClientModule,
        TranslateModule.forChild({
            loader: {
                provide: TranslateLoader,
                useFactory: (setTranslateLoader),
                deps: [HttpClient]
            }
        })
    ],
    declarations: [Tab3Page, ModalMapaPage],
    entryComponents: [ModalMapaPage]
})
export class Tab3PageModule {
}
