import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Mascota } from '../model/Mascota';
import { MascotaService } from '../servicios/mascota.service';
import { UsuarioService } from '../servicios/usuario.service';

@Component({
  selector: 'app-alta-mascota',
  templateUrl: './alta-mascota.component.html',
  styleUrls: ['./alta-mascota.component.css']
})
export class AltaMascotaComponent implements OnInit {
  patronTipo = '^[\\sa-zá-úA-ZÁ-Ú_-]{1,255}$'
  patronNombre = '^[\\sa-zá-úA-ZÁ-Ú_-]{1,255}$'
  patronPrecio = '^[0-9.]{0,255}$'
  mascotaAltaFormulario!: FormGroup
  params: any
  id: number | undefined
  estaLogado : Boolean | undefined
  mascotaAlta: Mascota | undefined

  constructor(
    private router: Router, 
    private formBuilder: FormBuilder, 
    private mascotaSvc: MascotaService,
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
    this.mascotaAltaFormulario = this.formBuilder.group({
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
    this.mascotaAltaFormulario?.reset()
  }

  altaMascota () {
    if (this.mascotaAltaFormulario.valid) {
      // Se procede a dar de alta al usuario
      let UsuarioFormulario = this.mascotaAltaFormulario?.value
      let mascotaGuardar = new Mascota()
      mascotaGuardar.nombre = UsuarioFormulario.nombre
      mascotaGuardar.tipo = UsuarioFormulario.tipo
      mascotaGuardar.precio = UsuarioFormulario.precio
      this.mascotaSvc.crearMascota(mascotaGuardar).subscribe(response => {
        if (response === null) {
          alert('Datos incorrectos. Por favor revise los datos introducidos.')
        } else {
          alert('Mascota dada de alta correctamente.')               
          this.mascotaAltaFormulario?.reset()
        }
      })
    } else {
      alert('Debes rellenar todos los campos correctamente.')
    }
  }
}
