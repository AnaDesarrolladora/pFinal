import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Mascota } from '../model/Mascota';
import { Usuario } from '../model/Usuario';
import { MascotaService } from '../servicios/mascota.service';
import { UsuarioService } from '../servicios/usuario.service';

@Component({
  selector: 'app-listado-mascotas',
  templateUrl: './listado-mascotas.component.html',
  styleUrls: ['./listado-mascotas.component.css']
})
export class ListadoMascotasComponent implements OnInit {
  columnasMostradas : string[] = [
    'ID',
    'Tipo',
    'Nombre',
    'Precio',
    'Editar',
    'Baja',
    'Vender'
  ]

  opcionSeleccionada  : string = '0'
  tiposMascotas : string[] | undefined
  mascotas : Mascota[] = []
  id : number | undefined
  params : any
  estaLogado : Boolean | undefined
  usuarioLogado : Usuario | undefined

  constructor(
    private mascotaSvc: MascotaService,
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
                  this.usuarioLogado = response
                  this.getMascotas()
                  this.getTiposMascotas()
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

  editarMascota (idEditar: any) {
    this.router.navigate(["editarMascota"], { 
      state: { 
        id: this.id,
        idEditar: idEditar
      } 
    })
  }

  bajaMascota (id: any) {
    let mascotaReferida = this.devolverMascota(id)
    let idLogado = this.id ? this.id : 0
    if (mascotaReferida && this.estaLogado) {
      let idBorrar = mascotaReferida.id ? mascotaReferida.id : 0
      if (confirm('¿Desea dar de baja a la mascota ' + mascotaReferida.nombre + ' de tipo ' + mascotaReferida.tipo + '?')) {
        this.mascotaSvc.borrarMascota(+idLogado, +idBorrar).subscribe(() => {
          alert('Mascota ' + mascotaReferida?.nombre + ' de tipo ' + mascotaReferida?.tipo + ' dada de baja.')
          this.getMascotas()
        })
      }
    }
  }

  devolverMascota (id: any) {
    let idBuscado = +id
    let mascotaReferida = this.mascotas?.find(mascota => mascota.id === idBuscado)

    return mascotaReferida
  }

  getMascotas () {
    this.mascotaSvc.getMascotasEnVenta().subscribe(response => {
      this.mascotas = response;
    });
  }

  getTiposMascotas () {
    this.mascotaSvc.getTiposMascotasEnVenta().subscribe(response => {
      this.tiposMascotas = response;
    });
  }

  venderMascota (id: any) {
    let mascotaReferida = this.devolverMascota(id)
    let idLogado = this.id ? this.id : 0

    this.router.navigate(["venderMascota"], { 
      state: { 
        idLogado: idLogado,
        idMascota: mascotaReferida?.id
      } 
    })
  }

  cambiarListado (tipo : string) {
    console.warn('tipo -->', tipo)
    if (tipo !== null && tipo !== undefined) {
      this.mascotaSvc.getMascotasEnVentaPorTipo(tipo).subscribe(response => {
        if (response !== null && response !== undefined) {
          this.mascotas = response
        }
      })
    }
    
  }
  
}
