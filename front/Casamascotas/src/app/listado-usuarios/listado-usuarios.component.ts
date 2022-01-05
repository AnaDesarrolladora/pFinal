import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../model/Usuario';
import { UsuarioService } from '../servicios/usuario.service';

@Component({
  selector: 'app-listado-usuarios',
  templateUrl: './listado-usuarios.component.html',
  styleUrls: ['./listado-usuarios.component.css']
})
export class ListadoUsuariosComponent implements OnInit {
  columnasMostradas : string[] = [
    'ID',
    'Nombre',
    'Apellidos',
    'Teléfono',
    'Username',
    'Contraseña',
    'Rol',
    'Editar',
    'Eliminar'
  ]
  usuarios: Usuario[] = []
  id: number | undefined
  params: any
  estaLogado : Boolean | undefined

  constructor(
    private usuarioSvc: UsuarioService, 
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
                this.getUsuarios()
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

  ngOnInit(): void {}

  editarUsuario (idEditar: any) {
    this.router.navigate(["editarUsuario"], { 
      state: { 
        id: this.id,
        idEditar: idEditar
      } 
    })
  }

  bajaUsuario (id: any) {    
    let usuarioReferido = this.devolverUsuario(id)
    let idLogado = this.id ? this.id : 0
    if (usuarioReferido && this.estaLogado) {
      let idBorrar = usuarioReferido.id ? usuarioReferido.id : 0
      if (confirm('¿Desea dar de baja al usuario de ' + usuarioReferido.nombre + ' ' + usuarioReferido.apellidos + '?')) {
        this.usuarioSvc.borrarUsuario(+idLogado, +idBorrar).subscribe(() => {
          alert('Usuario de ' + usuarioReferido?.nombre + ' ' + usuarioReferido?.apellidos + ' dado de baja.')
          this.getUsuarios()
        })
      }
    }    
  }

  devolverUsuario (id: any) {
    let idBuscado = +id
    let usuarioReferido = this.usuarios?.find(usuario => usuario.id === idBuscado)

    return usuarioReferido
  }

  getUsuarios () {
    this.usuarioSvc.getUsuarios().subscribe(response => {
      this.usuarios = response
    })
  }
}
