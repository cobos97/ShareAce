import {IonicModule} from '@ionic/angular';
import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Tab1Page} from './tab1.page';
import {ModalNuevaPage} from '../modals/modal-nueva/modal-nueva.page';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {setTranslateLoader} from '../app.module';
import {HttpClient, HttpClientModule} from '@angular/common/http';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        TranslateModule,
        ReactiveFormsModule,
        RouterModule.forChild([{path: '', component: Tab1Page}]),
        HttpClientModule,
        TranslateModule.forChild({
            loader: {
                provide: TranslateLoader,
                useFactory: (setTranslateLoader),
                deps: [HttpClient]
            }
        })
    ],
    declarations: [Tab1Page, ModalNuevaPage],
    entryComponents: [ModalNuevaPage]
})
export class Tab1PageModule {
}
