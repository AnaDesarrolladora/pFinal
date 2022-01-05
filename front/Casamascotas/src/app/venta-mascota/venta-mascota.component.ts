import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Comprador } from '../model/Comprador';
import { Mascota } from '../model/Mascota';
import { Usuario } from '../model/Usuario';
import { Venta } from '../model/Venta';
import { CompradorService } from '../servicios/comprador.service';
import { MascotaService } from '../servicios/mascota.service';
import { UsuarioService } from '../servicios/usuario.service';
import { VentaService } from '../servicios/venta.service';

@Component({
  selector: 'app-venta-mascota',
  templateUrl: './venta-mascota.component.html',
  styleUrls: ['./venta-mascota.component.css']
})
export class VentaMascotaComponent implements OnInit {
  idVendedor : number | undefined
  idMascotaVenta : number | undefined
  params : any
  estaLogado : Boolean | undefined
  comprador: Comprador | undefined
  mascotaVenta : Mascota | undefined
  usuarioLogado : Usuario | undefined  
  dniCompradorFormulario! : FormGroup
  compradorNuevoFormulario! : FormGroup
  
  darAltaComprador : Boolean | undefined
  compradorYaRegistrado : Boolean | undefined

  patronApellidos = '^[\\sa-zá-úA-ZÁ-Ú_-]{1,255}$'
  patronDireccion = '^[\\,\\º\\ª\\sa-zá-úA-ZÁ-Ú0-9_-]{1,255}$'
  // '^[a-zA-Z]+(\\s+[a-zA-Z0-9\\,\\º\\ª]+){0,255}$'
  patronDni = "[0-9]{8}[A-Z]{1}"
  patronLocalidad = '^[\\sa-zá-úA-ZÁ-Ú_-]{1,255}$'
  patronNombre = '^[\\sa-zá-úA-ZÁ-Ú_-]{1,255}$'
  patronEmail = '[a-z0-9]+@[a-z]+\.[a-z]{2,3}'
  patronTelefono = '^[0-9_-]{9}$'

  constructor(
    private mascotaSvc: MascotaService,
    private usuarioSvc: UsuarioService,
    private compradorSvc : CompradorService,
    private ventaSvc : VentaService, 
    private router: Router,
    private formBuilder: FormBuilder) { 
      this.darAltaComprador = false
      this.compradorYaRegistrado = false
      if (this.router.getCurrentNavigation()?.extras.state) {      
        this.params = this.router.getCurrentNavigation()?.extras.state
        if (this.params !== null && this.params !== undefined) {
          this.idVendedor = this.params.idLogado ? this.params.idLogado : 0
          if (this.idVendedor !== null && this.idVendedor !== undefined && this.idVendedor !== 0) {
            this.usuarioSvc.getUsuario(this.idVendedor).subscribe(response => {
              if (response != null) {
                this.estaLogado = (response.id !== null && response.id !== undefined && response.id === this.idVendedor) 
                if (this.estaLogado) {
                  this.usuarioLogado = response
                  // Se obtiene el identificador de la mascota
                  this.idMascotaVenta = this.params.idMascota ? this.params.idMascota : 0
                  if (this.idMascotaVenta !== undefined && this.idMascotaVenta !== 0) {
                    this.mascotaSvc.getMascota(this.idMascotaVenta).subscribe(response => {
                      if (response != null) {
                        this.mascotaVenta = response
                      }
                    })
                  } else {
                    alert('Mascota incorrecta seleccionada. Por favor, inténtelo de nuevo.')
                    this.router.navigate(["listadoMascotas"], { 
                      state: { 
                        id: this.idVendedor
                      } 
                    })
                  }
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
    // Se configuran las validaciones para el formulario de búsqueda de datos de comprador.
    this.dniCompradorFormulario = this.formBuilder.group({
      dni: ['', [
        Validators.required, 
        Validators.pattern(this.patronDni)
        ]
      ]
    })

    // Se configuran las validaciones para el formulario de búsqueda de datos de comprador.
    this.compradorNuevoFormulario = this.formBuilder.group({
      dni: ['', [
        Validators.required, 
        Validators.pattern(this.patronDni)
        ]
      ],
      nombre: ['', [
        Validators.required, 
        Validators.pattern(this.patronNombre)
        ]
      ],
      apellidos: ['', [
        Validators.required, 
        Validators.pattern(this.patronApellidos)
        ]
      ],
      direccion: ['', [
        Validators.required, 
        Validators.pattern(this.patronDireccion)
        ]
      ],
      localidad: ['', [
        Validators.required, 
        Validators.pattern(this.patronLocalidad)
        ]
      ],
      email: ['', [
        Validators.required, 
        Validators.pattern(this.patronEmail)
        ]
      ],
      telefono: ['', [
        Validators.required, 
        Validators.pattern(this.patronTelefono)
        ]
      ],
    }) 
  }

  buscarComprador() {    
    if (this.dniCompradorFormulario.invalid) {
      alert('El DNI debe tener 8 cifras (rellenar con ceros por delante si es necesario) y una letra mayúscula.')
    } else {
      let dniComprador = this.dniCompradorFormulario.value.dni
      this.compradorSvc.getComprador(dniComprador).subscribe(response => {
        if (response == null) {
          alert('Comprador no registrado. Es necesario darlo de alta.')  
          this.darAltaComprador = true
        } else { // El comprador ya está registrado
          alert('Comprador ya registrado. Puede continuar.')
          this.comprador = response
          this.darAltaComprador = false
          this.compradorYaRegistrado = true
        }

      })
    }
  }

  limpiarFormulario () {
    if (this.darAltaComprador) {
      this.compradorNuevoFormulario.reset()
    } else {
      this.dniCompradorFormulario?.reset()
    }
  }

  guardarComprador () {
    if (this.compradorNuevoFormulario.invalid) {
      alert('Debe rellenar todos los campos de manera correcta.')
    } else {
      // Se procede a dar de alta al comprador
      let compradorFormulario = this.compradorNuevoFormulario?.value
      this.compradorSvc.crearComprador(compradorFormulario).subscribe(response => {
        if (response === null) {
          alert('Se ha producido un problema. Por favor, inténtelo de nuevo más tarde.')
        } else {
          this.comprador = response
          this.darAltaComprador = false
          this.compradorYaRegistrado = true
          this.comprador = response
          alert('Comprador dado de alta correctamente.')
        }
      })
    }
  }

  realizarVenta () {
    
    // Se procede a realizar la venta
    let nuevaVenta = new Venta()
    nuevaVenta.idComprador = this.comprador?.id
    nuevaVenta.idMascota = this.mascotaVenta?.id
    nuevaVenta.idVendedor = this.idVendedor
    nuevaVenta.fecha = new Date()
    this.ventaSvc.realizarVenta(nuevaVenta).subscribe(response => {
      if (response !== null) {
        alert('Venta realizada.')
        this.router.navigate(["listadoMascotas"], { 
          state: { 
            id: this.usuarioLogado?.id 
          } 
        })
      } else {
        alert('Ha ocurrido un problema durante la venta. Por favor, inténtelo de nuevo.')
      }
    })

  }
}
