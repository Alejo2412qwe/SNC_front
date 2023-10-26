import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './modulos/menu/menu.component';
import { LoginComponent } from './modulos/login/login.component';
import { AsistenciaComponent } from './modulos/asistencia/asistencia.component';
import { GestionComponent } from './modulos/gestion/gestion.component';
import { ReportevacionesComponent } from './modulos/reportevaciones/reportevaciones.component';
import { RegistroComponent } from './modulos/registro/registro.component';
import { ListausuariosComponent } from './modulos/listausuarios/listausuarios.component';
import { ListaprocesosSubprocesosComponent } from './modulos/listaprocesos-subprocesos/listaprocesos-subprocesos.component';
import { DespegablemeneComponent } from './modulos/despegablemene/despegablemene.component';
import { ListainstitucionesComponent } from './modulos/listainstituciones/listainstituciones.component';
import { HorariosComponent } from './modulos/horarios/horarios.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'asistencia', component: AsistenciaComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'editar-usuario/:id', component: RegistroComponent },
  { path: 'gestion', component: GestionComponent },
  { path: 'listausu', component: ListausuariosComponent },
  { path: 'listasub-procesos', component: ListaprocesosSubprocesosComponent },
  { path: 'listainstituciones', component: ListainstitucionesComponent },
  { path: 'repvacaciones', component: ReportevacionesComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'des', component: DespegablemeneComponent },
  {path: 'Horarios', component: HorariosComponent} ,
  { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
