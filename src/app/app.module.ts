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
import { ListausuariosComponent } from './modulos/listausuarios/listausuarios.component';
import { ListaprocesosSubprocesosComponent } from './modulos/listaprocesos-subprocesos/listaprocesos-subprocesos.component';
import { DespegablemeneComponent } from './modulos/despegablemene/despegablemene.component';
import { ListainstitucionesComponent } from './modulos/listainstituciones/listainstituciones.component';
import { HorariosComponent } from './modulos/horarios/horarios.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ListaFuncionesComponent } from './modulos/listafunciones/lista-funciones.component';
import { ListaperiodosComponent } from './modulos/listaperiodos/listaperiodos.component';
import { SidebarComponent } from './modulos/sidebar/sidebar.component';
import { ListamotivopermisoComponent } from './modulos/listamotivopermiso/listamotivopermiso.component';
import { ListatipopermisosComponent } from './modulos/listatipopermisos/listatipopermisos.component';
import { ListatipoformularioComponent } from './modulos/listatipoformulario/listatipoformulario.component';
import { ListavalorhoraComponent } from './modulos/listavalorhora/listavalorhora.component';
import { FileUploadModule } from 'primeng/fileupload';
import { ListamispermisosComponent } from './modulos/listamispermisos/listamispermisos.component';
import { AprobarpermisosComponent } from './modulos/aprobarpermisos/aprobarpermisos.component';
import { ListaarchivosComponent } from './modulos/listaarchivos/listaarchivos.component';
import { DatePipe, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { ListaasistenciaComponent } from './modulos/listaasistencia/listaasistencia.component';
import { ListazonalesComponent } from './modulos/listazonales/listazonales.component';
import { MiAsistenciaComponent } from './modulos/miAsistencia/miAsistencia.component';
import { SobrenosotrosComponent } from './modulos/sobrenosotros/sobrenosotros.component';
import { ListaferiadosComponent } from './modulos/listaferiados/listaferiados.component';



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
    ListainstitucionesComponent,
    HeaderComponent,
    FooterComponent,
    ListaFuncionesComponent,
    ListaperiodosComponent,
    SidebarComponent,
    ListamotivopermisoComponent,
    ListatipopermisosComponent,
    ListatipoformularioComponent,
    ListavalorhoraComponent,
    ListamispermisosComponent,
    AprobarpermisosComponent,
    ListaarchivosComponent,
    ListaasistenciaComponent,
    ListazonalesComponent,
    MiAsistenciaComponent,
    SobrenosotrosComponent,
    ListaferiadosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    FileUploadModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenExpirationInterceptor,
      multi: true,
    }, 
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
    DatePipe,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
