import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'inicio-sesion', pathMatch: 'full' },
  { path: 'tabs', loadChildren: './tabs/tabs.module#TabsPageModule' },
  // { path: 'modal-nueva', loadChildren: './modals/modal-nueva/modal-nueva.module#ModalNuevaPageModule' },
  { path: 'inicio-sesion', loadChildren: './autenticacion/inicio-sesion/inicio-sesion.module#InicioSesionPageModule' },
  { path: 'registro', loadChildren: './autenticacion/registro/registro.module#RegistroPageModule' },
  { path: 'ayuda', loadChildren: './ayuda/ayuda.module#AyudaPageModule' },
  // { path: 'modal-mapa', loadChildren: './modals/modal-mapa/modal-mapa.module#ModalMapaPageModule' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
