import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './modulos/login/login.component';
import { MenuComponent } from './modulos/menu/menu.component';
import { AsistenciaComponent } from './modulos/asistencia/asistencia.component';
import { RegistroComponent } from './modulos/registro/registro.component';
import { PermisosComponent } from './modulos/permisos/permisos.component';
import { GestionComponent } from './modulos/gestion/gestion.component';
import { ReportevacionesComponent } from './modulos/reportevaciones/reportevaciones.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MenuComponent,
    AsistenciaComponent,
    RegistroComponent,
    PermisosComponent,
    GestionComponent,
    ReportevacionesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
