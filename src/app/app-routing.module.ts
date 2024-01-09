import { NgModule } from '@angular/core';
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
import { ListatipopermisosComponent } from './modulos/listatipopermisos/listatipopermisos.component';
import { ListatipoformularioComponent } from './modulos/listatipoformulario/listatipoformulario.component';
import { ListavalorhoraComponent } from './modulos/listavalorhora/listavalorhora.component';
import { ListamispermisosComponent } from './modulos/listamispermisos/listamispermisos.component';
import { AprobarpermisosComponent } from './modulos/aprobarpermisos/aprobarpermisos.component';
import { ListaarchivosComponent } from './modulos/listaarchivos/listaarchivos.component';
import { ListaasistenciaComponent } from './modulos/listaasistencia/listaasistencia.component';

import { ListazonalesComponent } from './modulos/listazonales/listazonales.component';
import { MiAsistenciaComponent } from './modulos/miAsistencia/miAsistencia.component';
import { AuthGuard } from './guard/auth.guard';
import { SobrenosotrosComponent } from './modulos/sobrenosotros/sobrenosotros.component';
import { ListaferiadosComponent } from './modulos/listaferiados/listaferiados.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'perfil', component: MenuComponent, canActivate: [AuthGuard], data: { expectedRoles: ['Administrador', 'Jefe de Unidad', 'Docente', 'Funcionario', 'Administrativo'] } },
  { path: 'asistencia', component: AsistenciaComponent, canActivate: [AuthGuard], data: { expectedRoles: ['Administrador', 'Jefe de Unidad', 'Docente', 'Funcionario', 'Administrativo'] } },
  { path: 'registro', component: RegistroComponent, canActivate: [AuthGuard], data: { expectedRoles: ['Administrador'] } },
  { path: 'editar-usuario/:id/:mode', component: RegistroComponent, canActivate: [AuthGuard], data: { expectedRoles: ['Administrador', 'Jefe de Unidad', 'Docente', 'Funcionario', 'Administrativo'] } },
  { path: 'gestion', component: GestionComponent },
  { path: 'listausu', component: ListausuariosComponent, canActivate: [AuthGuard], data: { expectedRoles: ['Administrador'] } },
  { path: 'listasub-procesos', component: ListaprocesosSubprocesosComponent, canActivate: [AuthGuard], data: { expectedRoles: ['Administrador'] } },
  { path: 'listainstituciones', component: ListainstitucionesComponent, canActivate: [AuthGuard], data: { expectedRoles: ['Administrador'] } },
  { path: 'repvacaciones', component: VacacionesComponent, canActivate: [AuthGuard], data: { expectedRoles: ['Administrador', 'Jefe de Unidad', 'Docente', 'Funcionario', 'Administrativo'] } },
  { path: 'registro', component: RegistroComponent, canActivate: [AuthGuard], data: { expectedRoles: ['Administrador'] } },
  { path: 'des', component: DespegablemeneComponent, canActivate: [AuthGuard], data: { expectedRoles: ['Administrador'] } },
  { path: 'Horarios', component: HorariosComponent, canActivate: [AuthGuard], data: { expectedRoles: ['Administrador'] } },
  { path: 'listatipopermiso', component: ListatipopermisosComponent, canActivate: [AuthGuard], data: { expectedRoles: ['Administrador'] } },
  { path: 'listatipoformulario', component: ListatipoformularioComponent, canActivate: [AuthGuard], data: { expectedRoles: ['Administrador'] } },
  { path: 'listavalor', component: ListavalorhoraComponent, canActivate: [AuthGuard], data: { expectedRoles: ['Administrador'] } },
  { path: 'listaFun', component: ListaFuncionesComponent, canActivate: [AuthGuard], data: { expectedRoles: ['Administrador'] } },
  { path: 'listamispermisos', component: ListamispermisosComponent, canActivate: [AuthGuard], data: { expectedRoles: ['Administrador', 'Jefe de Unidad', 'Docente', 'Funcionario', 'Administrativo'] } },
  { path: 'aprobarpermisos', component: AprobarpermisosComponent, canActivate: [AuthGuard], data: { expectedRoles: ['Administrador', 'Jefe de Unidad'] } },
  { path: 'listaarchivos', component: ListaarchivosComponent, canActivate: [AuthGuard], data: { expectedRoles: ['Administrador'] } },
  { path: 'listaPeri', component: ListaperiodosComponent, canActivate: [AuthGuard], data: { expectedRoles: ['Administrador'] } },
  { path: 'listaasistencia', component: ListaasistenciaComponent, canActivate: [AuthGuard], data: { expectedRoles: ['Administrador', 'Jefe de Unidad', 'Docente', 'Funcionario', 'Administrativo'] } },
  { path: 'miasistencia', component: MiAsistenciaComponent, canActivate: [AuthGuard], data: { expectedRoles: ['Administrador', 'Jefe de Unidad', 'Docente', 'Funcionario', 'Administrativo'] } },
  { path: 'listazonales', component: ListazonalesComponent, canActivate: [AuthGuard], data: { expectedRoles: ['Administrador'] } },
  { path: 'listaferiados', component: ListaferiadosComponent, canActivate: [AuthGuard], data: { expectedRoles: ['Administrador'] } },
  { path: 'aboutus', component: SobrenosotrosComponent },
  { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
