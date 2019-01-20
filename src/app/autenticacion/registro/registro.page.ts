import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';
import {AutenticationService} from '../../services/autentication.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-registro',
    templateUrl: './registro.page.html',
    styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

    registroForm: FormGroup;
    userdata: any;

    constructor(private formBuilder: FormBuilder,
                private authService: AutenticationService,
                private router: Router) {
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
            .then(() => this.router.navigateByUrl('/inicio-sesion'))
            .catch(e => {
                console.log(e);
            });
    }

    saveUserdata() {
        const saveUserdata = {
            email: this.registroForm.get('email').value,
            password: this.registroForm.get('password').value,
        };
        return saveUserdata;
    }

}
