import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Mascota } from '../model/Mascota';
import { MascotaService } from '../servicios/mascota.service';
import { UsuarioService } from '../servicios/usuario.service';

@Component({
  selector: 'app-editar-mascota',
  templateUrl: './editar-mascota.component.html',
  styleUrls: ['./editar-mascota.component.css']
})
export class EditarMascotaComponent implements OnInit {
  patronTipo = '^[\\sa-zá-úA-ZÁ-Ú_-]{1,255}$'
  patronNombre = '^[\\sa-zá-úA-ZÁ-Ú_-]{1,255}$'
  patronPrecio = '^[0-9.]{0,255}$'
  mascotaEditarFormulario!: FormGroup
  id: number | undefined
  params: any
  estaLogado : Boolean | undefined
  mascotaEditar : Mascota | undefined

  constructor(
    private usuarioSvc: UsuarioService,
    private mascotaSvc: MascotaService, 
    private formBuilder: FormBuilder, 
    private router: Router
  ) {
    if (this.router.getCurrentNavigation()?.extras.state) {      
      this.params = this.router.getCurrentNavigation()?.extras.state
      if (this.params !== null && this.params !== undefined) {
        this.id = this.params.id ? this.params.id : 0
        if (this.id !== null && this.id !== undefined && this.id !== 0) {
          this.usuarioSvc.getUsuario(this.id).subscribe(response => {
            if (response != null) {
              this.estaLogado = (response.id !== null && response.id !== undefined && response.id === this.id) 
              if (this.estaLogado) {
                // Debemos recuperar los datos de la mascota que se quiere editar
                let idmascotaEditar = this.params.idEditar ? this.params.idEditar : 0
                this.mascotaSvc.getMascota(idmascotaEditar).subscribe(response => {
                  if (response != null) {
                    this.mascotaEditar = response
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
    this.mascotaEditarFormulario = this.formBuilder.group({
      tipo: ['', [
        Validators.required,
        Validators.pattern(this.patronTipo)
        ]
      ],
      nombre: ['', [
        Validators.required,
        Validators.pattern(this.patronNombre)
        ]
      ],
      precio: ['', [
        Validators.required,
        Validators.pattern(this.patronPrecio)
        ]
      ]     
    })
  }

  limpiarFormulario () {
    this.mascotaEditarFormulario?.reset()
  }

  editarMascota () {
    if (this.mascotaEditarFormulario.valid) {
      // Se procede a dar de alta al usuario
      let mascotaFormulario = this.mascotaEditarFormulario?.value
      let mascotaNuevosDatos = new Mascota()
      mascotaNuevosDatos.id = this.mascotaEditar?.id
      mascotaNuevosDatos.tipo = mascotaFormulario.tipo
      mascotaNuevosDatos.nombre = mascotaFormulario.nombre
      mascotaNuevosDatos.precio = mascotaFormulario.precio      
      let idUsuarioLogado = this.id ? this.id : 0
      if (this.id !== 0) {
        this.mascotaSvc.actualizarMascota(+idUsuarioLogado, mascotaNuevosDatos).subscribe(response => {
          if (response === null) {
            alert('Datos incorrectos. Por favor revise los datos introducidos.')
          } else {
            alert('Datos de la mascota actualizados.')
            this.mascotaEditar = mascotaNuevosDatos               
            this.mascotaEditarFormulario?.reset()
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
