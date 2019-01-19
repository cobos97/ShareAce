import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';
import { AutenticationService } from '../../services/autentication.service';

@Component({
    selector: 'app-registro',
    templateUrl: './registro.page.html',
    styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

    registroForm: FormGroup;
    userdata: any;

    constructor(private formBuilder: FormBuilder,
                private authService: AutenticationService) {
    }

    ngOnInit() {
        this.registroForm = this.formBuilder.group({
            'email': ['', [
                Validators.required,
                Validators.email
            ]
            ],
            'password': ['', [
                Validators.required/*,
                Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
                Validators.minLength(6)*/
            ]
            ]
        });
        /*
        this.registroForm.valueChanges.subscribe(data =>
            this.onValueChanged(data));
        this.onValueChanged();
        */
    }

    onSubmit() {
        this.userdata = this.saveUserdata();
        this.authService.registroUsuario(this.userdata)
            .then()
            .catch( e => { console.log(e); } );
    }

    saveUserdata() {
        const saveUserdata = {
            email: this.registroForm.get('email').value,
            password: this.registroForm.get('password').value,
        };
        return saveUserdata;
    }

}
