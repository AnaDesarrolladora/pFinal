import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VentaListado } from '../model/VentaListado';
import { UsuarioService } from '../servicios/usuario.service';
import { VentaService } from '../servicios/venta.service';

@Component({
  selector: 'app-listado-ventas',
  templateUrl: './listado-ventas.component.html',
  styleUrls: ['./listado-ventas.component.css']
})
export class ListadoVentasComponent implements OnInit {
  columnasMostradas : string[] = [
    'ID',
    'Comprador',
    'Mascota',
    'Vendedor',
    'Fecha',
    'Precio'
  ]
  totalVentas : number | undefined
  ventas: VentaListado[] = []
  id: number | undefined
  params: any
  estaLogado : Boolean | undefined

  constructor(
    private usuarioSvc : UsuarioService,
    private ventaSvc : VentaService, 
    private router : Router
  ) { 
    this.totalVentas = 0
    if (this.router.getCurrentNavigation()?.extras.state) {      
      this.params = this.router.getCurrentNavigation()?.extras.state
      if (this.params !== null && this.params !== undefined) {
        this.id = this.params.id ? this.params.id : 0
        if (this.id !== null && this.id !== undefined && this.id !== 0) {
          this.usuarioSvc.getUsuario(this.id).subscribe(response => {
            if (response != null) {
              this.estaLogado = (response.id !== null && response.id !== undefined && response.id === this.id) 
              if (this.estaLogado) {
                this.getVentas()
                this.getTotalVentas()
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
  }

  getVentas () {
    this.ventaSvc.getVentas().subscribe(response => {
      this.ventas = response
      if (this.ventas != null && this.ventas !== undefined) {
        for (var pos = 0; pos < this.ventas.length; pos++) {
          this.totalVentas = this.totalVentas
        }      
      }
    })
  }

  getTotalVentas () { 
    this.ventaSvc.getTotalVentas().subscribe(response => {
      if (response != null) {
        this.totalVentas = response
      }
    })
  }
}
