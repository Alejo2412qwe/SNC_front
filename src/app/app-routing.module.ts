import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './modulos/menu/menu.component';
import { LoginComponent } from './modulos/login/login.component';
import { AsistenciaComponent } from './modulos/asistencia/asistencia.component';
import { GestionComponent } from './modulos/gestion/gestion.component';
import { ReportevacionesComponent } from './modulos/reportevaciones/reportevaciones.component';

const routes: Routes = [

  { path: 'login', component: LoginComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'asistencia', component: AsistenciaComponent },
  { path: 'gestion', component: GestionComponent },
  { path: 'repvacaciones', component: ReportevacionesComponent },
  { path: '**', redirectTo: 'gestion' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
