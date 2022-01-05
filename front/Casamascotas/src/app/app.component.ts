import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from './model/Usuario';
import { UsuarioService } from './servicios/usuario.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UsuarioService]
})

export class AppComponent {
  title = 'Casamascotas'
  userData : Usuario | undefined
  estaLogado = false

  constructor (private router: Router) {}   

  actualizarUser (newUser: Usuario) {
    this.userData = newUser
    if (this.userData?.id !== null && this.userData?.id !== undefined) {
      this.estaLogado = true
    }    
  }
}
