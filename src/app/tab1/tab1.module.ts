import {IonicModule} from '@ionic/angular';
import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Tab1Page} from './tab1.page';
import {ModalNuevaPage} from '../modals/modal-nueva/modal-nueva.page';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild([{path: '', component: Tab1Page}])
    ],
    declarations: [Tab1Page, ModalNuevaPage],
    entryComponents: [ModalNuevaPage]
})
export class Tab1PageModule {
}
