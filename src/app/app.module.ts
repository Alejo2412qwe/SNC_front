import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './modulos/login/login.component';
import { SidebarComponent } from './modulos/sidebar/sidebar.component';
import { MenuComponent } from './modulos/menu/menu.component';
import { AsistenciaComponent } from './modulos/asistencia/asistencia.component';
import { RegistroComponent } from './modulos/registro/registro.component';
import { PermisosComponent } from './modulos/permisos/permisos.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SidebarComponent,
    MenuComponent,
    AsistenciaComponent,
    RegistroComponent,
    PermisosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
