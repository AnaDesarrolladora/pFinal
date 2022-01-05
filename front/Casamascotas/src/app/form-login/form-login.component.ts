import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from '../model/Usuario';
import { UsuarioService } from '../servicios/usuario.service';
import { UserLogin } from './UserLogin';

@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.css']
})
export class FormLoginComponent implements OnInit {
  usuarioRequerido : boolean = false
  contraseniaRequerida : boolean = false
  patronUsuario = "^[a-zA-Z0-9_-]{6}$";
  patronContrasenia = "^[a-zA-Z0-9_-]{6,12}$";
  usuarioFormulario!: FormGroup;
  estaLogado: Boolean | undefined;
  usuarioLogado: Usuario | undefined;
  @Input() titulo = '';
  @Output() userData = new EventEmitter<Usuario>();
    

  constructor(private router: Router, 
    private formBuilder: FormBuilder, 
    private usuarioSvc: UsuarioService) { }

  ngOnInit(): void {
    this.estaLogado = false
    this.usuarioRequerido = false
    this.contraseniaRequerida = false

    // Se configuran las validaciones para el formulario de loggin.
    this.usuarioFormulario = this.formBuilder.group({
      usuario: ['', [
        Validators.required, 
        Validators.pattern(this.patronUsuario)
        ]
      ],
      contrasenia: ['', [
        Validators.required, 
        Validators.pattern(this.patronContrasenia)
        ]
      ],
    });  
  }  

  iniciarSesion () {
    this.estaLogado = false
    if (this.usuarioFormulario.valid) {
      let usuario: UserLogin = this.usuarioFormulario?.value
      this.usuarioSvc.loginUsuario(usuario).subscribe(response => {
        if (response === null) {
          alert('Usuario y/o contraseña incorrectos.')
        } else {
          this.usuarioLogado = response
          this.userData.emit(this.usuarioLogado)
          this.estaLogado = true                
        }
      })
    }    
  }

  cerrarSesion () {
    alert('Hasta pronto ' + this.usuarioLogado?.nombre + ' ' + this.usuarioLogado?.apellidos)
    this.estaLogado = false
    this.usuarioLogado = undefined
    this.userData.emit(this.usuarioLogado)
    this.usuarioFormulario?.reset()
    this.router.navigate(['/'])
  }

  limpiarFormulario () {
    this.usuarioFormulario?.reset()
  }  

  rolUsuario (rol: number | undefined) {    
    let nombreRol = ''

    if (this.usuarioLogado !== undefined && this.usuarioLogado !== null) {
      switch (this.usuarioLogado.rol) {
        case 1: {
          nombreRol = 'administrador'
          break
        }
        default: {
          nombreRol = 'usuario'
          break
        }
      }
    } 
    
    return nombreRol;    
  }
}
