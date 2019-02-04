import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ModalController, NavParams} from '@ionic/angular';
import leaflet from 'leaflet';

@Component({
    selector: 'app-modal-mapa',
    templateUrl: './modal-mapa.page.html',
    styleUrls: ['./modal-mapa.page.scss'],
})
export class ModalMapaPage implements OnInit {

    // Contenedor del mapa
    @ViewChild('map') mapContainer: ElementRef;
    map: any;

    mapax: any;
    mapay: any;
    titulo: any;


    /**
     * Recupera del navParams los parámetros del título y las coordenadas de la localización
     * @param modalController Controlador de la ventana modal
     * @param navParams Módulo para recuparar parámetros mandados desde la página padre
     */
    constructor(private modalController: ModalController,
                private navParams: NavParams) {
        this.titulo = this.navParams.get('titulo');
        this.mapax = this.navParams.get('mapax');
        this.mapay = this.navParams.get('mapay');


    }

    // Guardamos el icono que utilizaremos de marcador en el mapa
    icon = leaflet.icon({
        iconUrl: '../../assets/tennis.png',
        iconSize: [40, 40]
    });

    /**
     * Se ejecuta antes de entrar a la página
     */
    ionViewDidEnter() {
        this.loadmap();
    }


    /**
     * Inicializa el mapa con todos los atributos necesarios.
     * Posiciona la vista en las coordenadas de la clase y marca un zoom para que no se quede
     * lejos el mapa.
     * Posiciona el marcador en las mismas coordenadas y le cambia el icono al recogido anteriormente
     */
    loadmap() {
        this.map = leaflet.map('map').fitWorld();
        leaflet.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attributions: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors,' +
                ' <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
            maxZoom: 25
        }).addTo(this.map);
        this.map.setView([this.mapax, this.mapay], 16);
        leaflet.marker([this.mapax, this.mapay], {icon: this.icon}).addTo(this.map).bindPopup(this.titulo);

    }

    /**
     * Cierra el modal
     */
    cerrar() {
        this.modalController.dismiss();
    }

    ngOnInit() {
    }


}
