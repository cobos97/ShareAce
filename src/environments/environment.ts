// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    firebaseConfig: {
        apiKey: 'AIzaSyDFcO1MSqbn0t-DwDgBcAddabqNFeplbro',
        authDomain: 'shareace-8d72b.firebaseapp.com',
        databaseURL: 'https://shareace-8d72b.firebaseio.com',
        projectId: 'shareace-8d72b',
        storageBucket: 'shareace-8d72b.appspot.com',
        messagingSenderId: '793910168939',
        ofertasColeccion: 'ofertas',
        lugaresColeccion: 'lugares'
    },
    currentLanguages: ['es', 'en'],
    defaultLanguage: 'en'

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
