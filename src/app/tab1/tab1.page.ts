import {Component, OnInit, ViewChild} from '@angular/core';
import {IonInfiniteScroll, IonSlides, ModalController} from '@ionic/angular';
import {ModalNuevaPage} from '../modals/modal-nueva/modal-nueva.page';

@Component({
    selector: 'app-tab1',
    templateUrl: 'tab1.page.html',
    styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
    @ViewChild('SwipedTabsSlider') private _SwipedTabsSlider: IonSlides;
    @ViewChild('infiniteScroll') ionInfiniteScroll: IonInfiniteScroll;

    SwipedTabsIndicator: any = null;
    tabs = ['selectTab(0)', 'selectTab(1)'];
    ntabs = 2;
    private SwipedTabsSlider: any;
    private category: any;
    private cloud: any;

    constructor(private modalControler: ModalController) {
    }

    ngOnInit() {
    }

    async nuevaOfertaModal() {
        const modal = await  this.modalControler.create({
            component: ModalNuevaPage
        });
        await modal.present();
    }

    ionViewDidEnter() {
        this.SwipedTabsIndicator = document.getElementById('indicator');
    }

    ionViewWillEnter() {
        this.category = '0';
        this.SwipedTabsSlider.length().then(l => {  // no sería necesario aquí, solo en ngOnInit
            this.ntabs = l;
        });
    }

    /* Actualiza la categoría que esté en ese momento activa*/
    updateCat(cat: Promise<any>) {
        cat.then(dat => {
            this.category = dat;
            this.category = +this.category; // to int;
            if (this.category == 1) {
                if (this.cloud.isInfinityScrollEnabled()) {
                    this.ionInfiniteScroll.disabled = false;
                } else {
                    this.ionInfiniteScroll.disabled = true;
                }
            } else {
                this.ionInfiniteScroll.disabled = false;
            }
        });
    }

    /* El método que permite actualizar el indicado cuando se cambia de slide*/
    updateIndicatorPosition() {
        this._SwipedTabsSlider.getActiveIndex().then(i => {
            if (this.ntabs > i) {  // this condition is to avoid passing to incorrect index
                this.SwipedTabsIndicator.style.webkitTransform = 'translate3d(' + (i * 100) + '%,0,0)';
            }
        });
    }

    /* El método que anima la "rayita" mientras nos estamos deslizando por el slide*/
    animateIndicator(e) {
        // console.log(e.target.swiper.progress);
        if (this.SwipedTabsIndicator) {
            this.SwipedTabsIndicator.style.webkitTransform = 'translate3d(' +
                ((e.target.swiper.progress * (this.ntabs - 1)) * 100) + '%,0,0)';
        }
    }

}
