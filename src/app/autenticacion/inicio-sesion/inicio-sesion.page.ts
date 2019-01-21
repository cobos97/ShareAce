import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AutenticationService} from '../../services/autentication.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-inicio-sesion',
    templateUrl: './inicio-sesion.page.html',
    styleUrls: ['./inicio-sesion.page.scss'],
})
export class InicioSesionPage implements OnInit {

    inicioForm: FormGroup;
    userdata: any;

    constructor(private formBuilder: FormBuilder,
                private authService: AutenticationService,
                private router: Router) {
    }

    ngOnInit() {
        this.inicioForm = this.formBuilder.group({
            'email': ['', [
                Validators.required,
                Validators.email
            ]
            ],
            'password': ['', [
                Validators.required
            ]
            ]
        });
    }

    onSubmit() {
        this.userdata = this.saveUserdata();
        this.authService.inicioSesionUsuario(this.userdata)
            .then(() => this.router.navigateByUrl('/tabs/tabs/tab1'))
            .catch(e => {
                console.log(e);
            });
    }

    saveUserdata() {
        const saveUserdata = {
            email: this.inicioForm.get('email').value,
            password: this.inicioForm.get('password').value,
        };
        return saveUserdata;
    }

}
