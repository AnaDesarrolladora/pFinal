import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from '../model/Usuario';
import { UsuarioService } from '../servicios/usuario.service';

@Component({
  selector: 'app-alta-usuario',
  templateUrl: './alta-usuario.component.html',
  styleUrls: ['./alta-usuario.component.css']
})
export class AltaUsuarioComponent implements OnInit {
  patronUsuario = '^[a-zA-Z0-9_-]{6}$'
  patronContrasenia = '^[a-zA-Z0-9_-]{6,12}$'
  patronTelefono = '^[0-9_-]{9}$'
  patronNombre = '^[\\sa-zá-úA-ZÁ-Ú_-]{1,255}$'
  patronApellidos = '^[\\sa-zá-úA-ZÁ-Ú_-]{1,255}$'
  usuarioAltaFormulario!: FormGroup
  params: any
  id: number | undefined
  estaLogado : Boolean | undefined
  usuarioAlta: Usuario | undefined

  constructor(
    private router: Router, 
    private formBuilder: FormBuilder, 
    private usuarioSvc: UsuarioService
  ) { 
    if (this.router.getCurrentNavigation()?.extras.state) {      
      this.params = this.router.getCurrentNavigation()?.extras.state
      if (this.params !== null && this.params !== undefined) {
        this.id = this.params.id ? this.params.id : 0
        if (this.id !== null && this.id !== undefined && this.id !== 0) {
          this.usuarioSvc.getUsuario(this.id).subscribe(response => {
            if (response != null) {
              this.estaLogado = (response.id !== null && response.id !== undefined && response.id === this.id) 
              if (!this.estaLogado) {              
                this.router.navigate(["/"]);
              }
            } else {
              this.router.navigate(['/'])
            }
          }); 
        } else {
          this.router.navigate(['/'])
        }            
      } else {
        this.router.navigate(['/'])
      }
    } else {
      this.router.navigate(['/'])
    }
  }

  ngOnInit(): void {
    // Se configuran las validaciones para el formulario de alta de usuario.
    this.usuarioAltaFormulario = this.formBuilder.group({
      nombreUsuario: ['', [
        Validators.required,
        Validators.pattern(this.patronNombre)
        ]
      ],
      apellidos: ['', [
        Validators.required,
        Validators.pattern(this.patronApellidos)
        ]
      ],
      telefono: ['', [
        Validators.required,
        Validators.pattern(this.patronTelefono)
        ]
      ],
      usuario: ['', [
        Validators.required, 
        Validators.pattern(this.patronUsuario)
        ]
      ],
      contrasenia: ['', [
        Validators.required, 
        Validators.pattern(this.patronContrasenia)
        ]
      ]      
    })
  }

  limpiarFormulario () {
    this.usuarioAltaFormulario?.reset()
  }

  altaUsuario () {
    if (this.usuarioAltaFormulario.valid) {
      // Se procede a dar de alta al usuario
      let UsuarioFormulario = this.usuarioAltaFormulario?.value
      let usuarioGuardar = new Usuario()
      usuarioGuardar.nombre = UsuarioFormulario.nombreUsuario
      usuarioGuardar.apellidos = UsuarioFormulario.apellidos
      usuarioGuardar.telefono = UsuarioFormulario.telefono
      usuarioGuardar.username = UsuarioFormulario.usuario
      usuarioGuardar.password = UsuarioFormulario.contrasenia
      usuarioGuardar.rol = 2
      this.usuarioSvc.crearUsuario(usuarioGuardar).subscribe(response => {
        if (response === null) {
          alert('Datos incorrectos. Por favor revise los datos introducidos.')
        } else {
          alert('Usuario dado de alta con las credenciales siguientes:\nUsuario: ' + response.username + '\nContraseña: ' + response.password)               
          this.usuarioAltaFormulario?.reset()
        }
      })
    } else {
      alert('Debes rellenar todos los campos correctamente.')
    }
  }
}
