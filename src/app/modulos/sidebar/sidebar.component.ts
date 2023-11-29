import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SessionStorageService } from 'src/app/services/session-storage.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  constructor(
    private sessionStorage: SessionStorageService
  ) { }

  cerrarSesion(): void {
    localStorage.removeItem('userData');
  }

  ngOnInit(): void {
  }

  username = this.sessionStorage.getItem('username');
  rol: string = this.sessionStorage.getItem('rol') || '';


}

