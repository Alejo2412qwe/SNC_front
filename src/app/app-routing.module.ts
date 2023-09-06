import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SidebarComponent } from './modulos/sidebar/sidebar.component';

const routes: Routes = [


  { path: 'sidebar', component: SidebarComponent },
  //publico
  { path: '**', redirectTo: 'sidebar' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
