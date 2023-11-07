import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SessionStorageService } from 'src/app/services/session-storage.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  constructor(
    private sessionStorage: SessionStorageService,
    private toastr: ToastrService
  ) { }

  username = this.sessionStorage.getItem('username');
  rol = this.sessionStorage.getItem('rol');
}
