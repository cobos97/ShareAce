'use strict';


customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">ShareAce documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="dependencies.html" data-type="chapter-link">
                                <span class="icon ion-ios-list"></span>Dependencies
                            </a>
                        </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse" ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-6486362c4d1e5aca4ff8da8d48719ee2"' : 'data-target="#xs-components-links-module-AppModule-6486362c4d1e5aca4ff8da8d48719ee2"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-6486362c4d1e5aca4ff8da8d48719ee2"' :
                                            'id="xs-components-links-module-AppModule-6486362c4d1e5aca4ff8da8d48719ee2"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AppModule-6486362c4d1e5aca4ff8da8d48719ee2"' : 'data-target="#xs-injectables-links-module-AppModule-6486362c4d1e5aca4ff8da8d48719ee2"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-6486362c4d1e5aca4ff8da8d48719ee2"' :
                                        'id="xs-injectables-links-module-AppModule-6486362c4d1e5aca4ff8da8d48719ee2"' }>
                                        <li class="link">
                                            <a href="injectables/AutenticationService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>AutenticationService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link">AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AyudaPageModule.html" data-type="entity-link">AyudaPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AyudaPageModule-fcfc1bcfb659df78d57d0df4a1c6d257"' : 'data-target="#xs-components-links-module-AyudaPageModule-fcfc1bcfb659df78d57d0df4a1c6d257"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AyudaPageModule-fcfc1bcfb659df78d57d0df4a1c6d257"' :
                                            'id="xs-components-links-module-AyudaPageModule-fcfc1bcfb659df78d57d0df4a1c6d257"' }>
                                            <li class="link">
                                                <a href="components/AyudaPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AyudaPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/InicioSesionPageModule.html" data-type="entity-link">InicioSesionPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-InicioSesionPageModule-dd2194c2e37a976a6f2dcd7232c40f25"' : 'data-target="#xs-components-links-module-InicioSesionPageModule-dd2194c2e37a976a6f2dcd7232c40f25"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-InicioSesionPageModule-dd2194c2e37a976a6f2dcd7232c40f25"' :
                                            'id="xs-components-links-module-InicioSesionPageModule-dd2194c2e37a976a6f2dcd7232c40f25"' }>
                                            <li class="link">
                                                <a href="components/InicioSesionPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">InicioSesionPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ModalMapaPageModule.html" data-type="entity-link">ModalMapaPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ModalMapaPageModule-58f2a61a3590a58a5a3c99085feb7856"' : 'data-target="#xs-components-links-module-ModalMapaPageModule-58f2a61a3590a58a5a3c99085feb7856"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ModalMapaPageModule-58f2a61a3590a58a5a3c99085feb7856"' :
                                            'id="xs-components-links-module-ModalMapaPageModule-58f2a61a3590a58a5a3c99085feb7856"' }>
                                            <li class="link">
                                                <a href="components/ModalMapaPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ModalMapaPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ModalNuevaPageModule.html" data-type="entity-link">ModalNuevaPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ModalNuevaPageModule-1ca845fb5286a9c35e7aa03b0da6ea20"' : 'data-target="#xs-components-links-module-ModalNuevaPageModule-1ca845fb5286a9c35e7aa03b0da6ea20"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ModalNuevaPageModule-1ca845fb5286a9c35e7aa03b0da6ea20"' :
                                            'id="xs-components-links-module-ModalNuevaPageModule-1ca845fb5286a9c35e7aa03b0da6ea20"' }>
                                            <li class="link">
                                                <a href="components/ModalNuevaPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ModalNuevaPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/RegistroPageModule.html" data-type="entity-link">RegistroPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-RegistroPageModule-252ea10c9e2f7f1f4182f2b1d09bd9ba"' : 'data-target="#xs-components-links-module-RegistroPageModule-252ea10c9e2f7f1f4182f2b1d09bd9ba"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-RegistroPageModule-252ea10c9e2f7f1f4182f2b1d09bd9ba"' :
                                            'id="xs-components-links-module-RegistroPageModule-252ea10c9e2f7f1f4182f2b1d09bd9ba"' }>
                                            <li class="link">
                                                <a href="components/RegistroPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">RegistroPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/Tab1PageModule.html" data-type="entity-link">Tab1PageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-Tab1PageModule-ede127b2ef81ba527f51d92cee9b556d"' : 'data-target="#xs-components-links-module-Tab1PageModule-ede127b2ef81ba527f51d92cee9b556d"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-Tab1PageModule-ede127b2ef81ba527f51d92cee9b556d"' :
                                            'id="xs-components-links-module-Tab1PageModule-ede127b2ef81ba527f51d92cee9b556d"' }>
                                            <li class="link">
                                                <a href="components/ModalNuevaPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ModalNuevaPage</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/Tab1Page.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">Tab1Page</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/Tab2PageModule.html" data-type="entity-link">Tab2PageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-Tab2PageModule-e1224e349bacb7359acd4f6a14d6510d"' : 'data-target="#xs-components-links-module-Tab2PageModule-e1224e349bacb7359acd4f6a14d6510d"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-Tab2PageModule-e1224e349bacb7359acd4f6a14d6510d"' :
                                            'id="xs-components-links-module-Tab2PageModule-e1224e349bacb7359acd4f6a14d6510d"' }>
                                            <li class="link">
                                                <a href="components/Tab2Page.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">Tab2Page</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/Tab3PageModule.html" data-type="entity-link">Tab3PageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-Tab3PageModule-6c7babf5425d5e78e357fa2eb5d6f8f1"' : 'data-target="#xs-components-links-module-Tab3PageModule-6c7babf5425d5e78e357fa2eb5d6f8f1"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-Tab3PageModule-6c7babf5425d5e78e357fa2eb5d6f8f1"' :
                                            'id="xs-components-links-module-Tab3PageModule-6c7babf5425d5e78e357fa2eb5d6f8f1"' }>
                                            <li class="link">
                                                <a href="components/ModalMapaPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ModalMapaPage</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/Tab3Page.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">Tab3Page</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/TabsPageModule.html" data-type="entity-link">TabsPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-TabsPageModule-41cf32f53327efd1d377eb40631e1d1e"' : 'data-target="#xs-components-links-module-TabsPageModule-41cf32f53327efd1d377eb40631e1d1e"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-TabsPageModule-41cf32f53327efd1d377eb40631e1d1e"' :
                                            'id="xs-components-links-module-TabsPageModule-41cf32f53327efd1d377eb40631e1d1e"' }>
                                            <li class="link">
                                                <a href="components/TabsPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TabsPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/TabsPageRoutingModule.html" data-type="entity-link">TabsPageRoutingModule</a>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/AppPage.html" data-type="entity-link">AppPage</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/LugaresService.html" data-type="entity-link">LugaresService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/NuevaServiceService.html" data-type="entity-link">NuevaServiceService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});