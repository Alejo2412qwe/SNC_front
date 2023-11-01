import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SessionStorageService } from 'src/app/services/session-storage.service';

@Component({
  selector: 'app-listaperiodos',
  templateUrl: './listaperiodos.component.html',
  styleUrls: ['./listaperiodos.component.css'],
})
export class ListaperiodosComponent implements OnInit {
  constructor(
    private sessionStorage: SessionStorageService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  username = this.sessionStorage.getItem('username');
  rol = this.sessionStorage.getItem('rol');
}
