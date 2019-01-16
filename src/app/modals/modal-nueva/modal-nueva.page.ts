import {Component, OnInit} from '@angular/core';
import {LoadingController, ModalController} from '@ionic/angular';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NuevaServiceService} from '../../services/nueva-service.service';

@Component({
    selector: 'app-modal-nueva',
    templateUrl: './modal-nueva.page.html',
    styleUrls: ['./modal-nueva.page.scss'],
})
export class ModalNuevaPage implements OnInit {

    private nueva: any;

    constructor(private modalController: ModalController,
                private formBuilder: FormBuilder) {
        this.nueva = this.formBuilder.group({
            tipo: [''],
            plazas: ['']
        });
    }

    ngOnInit() {
    }

    dismiss() {
        this.modalController.dismiss();
    }


}
