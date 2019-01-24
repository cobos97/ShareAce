import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ModalController, NavParams} from '@ionic/angular';
import leaflet from 'leaflet';

@Component({
    selector: 'app-modal-mapa',
    templateUrl: './modal-mapa.page.html',
    styleUrls: ['./modal-mapa.page.scss'],
})
export class ModalMapaPage implements OnInit {

    @ViewChild('map') mapContainer: ElementRef;
    map: any;

    mapa: any;
    titulo: any;

    constructor(private modalController: ModalController,
                private navParams: NavParams) {
        this.titulo = this.navParams.get('titulo');
        this.mapa = this.navParams.get('mapa');
        console.log(this.mapa);


    }

    ionViewDidEnter() {
        this.loadmap();
    }

    loadmap() {
        this.map = leaflet.map('map').fitWorld();
        leaflet.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attributions: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors,' +
                ' <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
            maxZoom: 18
        }).addTo(this.map);
        this.map.locate({
            setView: true,
            maxZoom: 10
        }).on('locationfound', (e) => {
            const markerGroup = leaflet.featureGroup();
            const marker: any = leaflet.marker([e.latitude, e.longitude]).on('click', () => {
                alert('Marker clicked');
            });
            markerGroup.addLayer(marker);
            this.map.addLayer(markerGroup);
        }).on('locationerror', (err) => {
            alert(err.message);
        });

    }

    ngOnInit() {
    }


}
