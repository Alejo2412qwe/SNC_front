import { Component, OnInit } from '@angular/core';
import { SessionStorageService } from 'src/app/services/session-storage.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-despegablemene',
  templateUrl: './despegablemene.component.html',
  styleUrls: ['./despegablemene.component.css'],
})
export class DespegablemeneComponent implements OnInit {
  constructor(
    private sessionStorage: SessionStorageService,
    private toastr: ToastrService
  ) {}

  username = this.sessionStorage.getItem('username');

  cerrarSesion(): void {
    localStorage.removeItem('userData');
    this.toastr.info('Se cerró la sesión');
  }
  ngOnInit(): void {}
}
