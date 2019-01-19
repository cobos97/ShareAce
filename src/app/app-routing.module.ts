import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'modal-nueva', loadChildren: './modals/modal-nueva/modal-nueva.module#ModalNuevaPageModule' },
  { path: 'inicio-sesion', loadChildren: './autenticacion/inicio-sesion/inicio-sesion.module#InicioSesionPageModule' },
  { path: 'registro', loadChildren: './autenticacion/registro/registro.module#RegistroPageModule' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
