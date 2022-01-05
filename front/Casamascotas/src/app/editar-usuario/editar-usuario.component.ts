import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from '../model/Usuario';
import { UsuarioService } from '../servicios/usuario.service';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css']
})
export class EditarUsuarioComponent implements OnInit {
  patronUsuario = '^[a-zA-Z0-9_-]{6}$'
  patronContrasenia = '^[a-zA-Z0-9_-]{6,12}$'
  patronTelefono = '^[0-9_-]{9}$'
  patronNombre = '^[\\sa-zá-úA-ZÁ-Ú_-]{1,255}$'
  patronApellidos = '^[\\sa-zá-úA-ZÁ-Ú_-]{1,255}$'
  usuarioEditarFormulario!: FormGroup
  id: number | undefined
  params: any
  estaLogado : Boolean | undefined
  usuarioEditar : Usuario | undefined
  
  constructor(
    private usuarioSvc: UsuarioService, 
    private formBuilder: FormBuilder, 
    private router: Router) {
    if (this.router.getCurrentNavigation()?.extras.state) {      
      this.params = this.router.getCurrentNavigation()?.extras.state
      if (this.params !== null && this.params !== undefined) {
        this.id = this.params.id ? this.params.id : 0
        if (this.id !== null && this.id !== undefined && this.id !== 0) {
          this.usuarioSvc.getUsuario(this.id).subscribe(response => {
            if (response != null) {
              this.estaLogado = (response.id !== null && response.id !== undefined && response.id === this.id) 
              if (this.estaLogado) {
                // Debemos recuperar los datos del usuario que se quiere editar
                let idUsuarioEditar = this.params.idEditar ? this.params.idEditar : 0
                this.usuarioSvc.getUsuario(idUsuarioEditar).subscribe(response => {
                  if (response != null) {
                    this.usuarioEditar = response
                  }
                })
              } else {
                this.router.navigate(["/"]);
              }
            } else {
              this.router.navigate(['/'])
            }
          })
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
    this.usuarioEditarFormulario = this.formBuilder.group({
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
    this.usuarioEditarFormulario?.reset()
  }

  editarUsuario () {
    if (this.usuarioEditarFormulario.valid) {
      // Se procede a dar de alta al usuario
      let UsuarioFormulario = this.usuarioEditarFormulario?.value
      let usuarioNuevosDatos = new Usuario()
      usuarioNuevosDatos.id = this.usuarioEditar?.id
      usuarioNuevosDatos.nombre = UsuarioFormulario.nombreUsuario
      usuarioNuevosDatos.apellidos = UsuarioFormulario.apellidos
      usuarioNuevosDatos.telefono = UsuarioFormulario.telefono
      usuarioNuevosDatos.username = UsuarioFormulario.usuario
      usuarioNuevosDatos.password = UsuarioFormulario.contrasenia
      usuarioNuevosDatos.rol = this.usuarioEditar?.rol
      let idUsuarioLogado = this.id ? this.id : 0
      if (this.id !== 0) {
        this.usuarioSvc.actualizarUsuario(+idUsuarioLogado, usuarioNuevosDatos).subscribe(response => {
          if (response === null) {
            alert('Datos incorrectos. Por favor revise los datos introducidos.')
          } else {
            alert('Datos del usuario actualizados.')
            this.usuarioEditar = usuarioNuevosDatos               
            this.usuarioEditarFormulario?.reset()
          }
        })
      } else {
        alert('Acceso no permitido. Por favor, vuelve a logarte.')
        this.router.navigate(['/'])
      }
    } else {
      alert('Debes rellenar todos los campos correctamente.')
    }
  }
}
