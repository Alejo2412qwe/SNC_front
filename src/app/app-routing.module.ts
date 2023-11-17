import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './modulos/menu/menu.component';
import { LoginComponent } from './modulos/login/login.component';
import { AsistenciaComponent } from './modulos/asistencia/asistencia.component';
import { GestionComponent } from './modulos/gestion/gestion.component';
import { VacacionesComponent } from './modulos/reportevaciones/reportevaciones.component';
import { RegistroComponent } from './modulos/registro/registro.component';

import { HorariosComponent } from './modulos/horarios/horarios.component';

import { ListausuariosComponent } from './modulos/listausuarios/listausuarios.component';
import { ListaprocesosSubprocesosComponent } from './modulos/listaprocesos-subprocesos/listaprocesos-subprocesos.component';
import { DespegablemeneComponent } from './modulos/despegablemene/despegablemene.component';
import { ListainstitucionesComponent } from './modulos/listainstituciones/listainstituciones.component';
import { ListaFuncionesComponent } from './modulos/listafunciones/lista-funciones.component';
import { ListaperiodosComponent } from './modulos/listaperiodos/listaperiodos.component';
import { ListamotivopermisoComponent } from './modulos/listamotivopermiso/listamotivopermiso.component';
import { ListatipopermisosComponent } from './modulos/listatipopermisos/listatipopermisos.component';
import { ListatipoformularioComponent } from './modulos/listatipoformulario/listatipoformulario.component';
import { ListavalorhoraComponent } from './modulos/listavalorhora/listavalorhora.component';
import { ListamispermisosComponent } from './modulos/listamispermisos/listamispermisos.component'; 
import { AprobarpermisosComponent } from './modulos/aprobarpermisos/aprobarpermisos.component'; 
import { ListaarchivosComponent } from './modulos/listaarchivos/listaarchivos.component';
import { ListamotivopermisoComponent } from './modulos/listamotivopermiso/listamotivopermiso.component';




const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'perfil', component: MenuComponent },
  { path: 'asistencia', component: AsistenciaComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'editar-usuario/:id', component: RegistroComponent },
  { path: 'gestion', component: GestionComponent },
  { path: 'listausu', component: ListausuariosComponent },
  { path: 'listasub-procesos', component: ListaprocesosSubprocesosComponent },
  { path: 'listainstituciones', component: ListainstitucionesComponent },
  { path: 'repvacaciones', component: VacacionesComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'des', component: DespegablemeneComponent },
  {path: 'Horarios', component: HorariosComponent} ,
  { path: 'listamotivo', component: ListamotivopermisoComponent },
  { path: 'listatipopermiso', component: ListatipopermisosComponent },
  { path: 'listatipoformulario', component: ListatipoformularioComponent },
  { path: 'listavalor', component: ListavalorhoraComponent },
  { path: 'listaFun', component: ListaFuncionesComponent },
  { path: 'listamispermisos', component: ListamispermisosComponent },
  { path: 'aprobarpermisos', component: AprobarpermisosComponent },
  { path: 'listaarchivos', component: ListaarchivosComponent },
  { path: 'listaPeri', component: ListaperiodosComponent },

  { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
