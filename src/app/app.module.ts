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
import { VacacionesComponent } from './modulos/reportevaciones/reportevaciones.component';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { TokenExpirationInterceptor } from './enviroment/TokenExpirationInterceptor';
import { HorariosComponent } from './modulos/horarios/horarios.component';
import { ListausuariosComponent } from './modulos/listausuarios/listausuarios.component';
import { ListaprocesosSubprocesosComponent } from './modulos/listaprocesos-subprocesos/listaprocesos-subprocesos.component';
import { DespegablemeneComponent } from './modulos/despegablemene/despegablemene.component';
import { ListainstitucionesComponent } from './modulos/listainstituciones/listainstituciones.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MenuComponent,
    AsistenciaComponent,
    RegistroComponent,
    PermisosComponent,
    GestionComponent,
    HorariosComponent,
    VacacionesComponent,
    ListausuariosComponent,
    ListaprocesosSubprocesosComponent,
    DespegablemeneComponent,
    ListainstitucionesComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenExpirationInterceptor,
    multi: true,
  },],
  bootstrap: [AppComponent]
})
export class AppModule { }
