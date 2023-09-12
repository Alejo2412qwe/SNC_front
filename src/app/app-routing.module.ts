import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SidebarComponent } from './modulos/sidebar/sidebar.component';
import { MenuComponent } from './modulos/menu/menu.component';
import { LoginComponent } from './modulos/login/login.component';

const routes: Routes = [

  { path: 'login', component: LoginComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'sidebar', component: SidebarComponent },

  { path: '**', redirectTo: 'sidebar' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
