import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from '../model/Usuario';
import { UsuarioService } from '../servicios/usuario.service';

@Component({
  selector: 'app-pantalla-usuario',
  templateUrl: './pantalla-usuario.component.html',
  styleUrls: ['./pantalla-usuario.component.css']
})
export class PantallaUsuarioComponent implements OnInit {
  @Input() title = ''
  @Input() logged: Boolean | undefined
  @Input() id: number | undefined
  usuarioLogado : Usuario | undefined
  
  constructor(
    private router:Router, 
    private route: ActivatedRoute, 
    private usuarioSvc: UsuarioService) {}

  ngOnInit(): void {
    this.logged = false    
    if (this.id !== null && this.id !== undefined && this.id !== 0) {
      this.usuarioSvc.getUsuario(this.id).subscribe(response => {
        if (response != null) {
          this.usuarioLogado = response
          this.logged = (response.id !== null && response.id !== undefined && response.id === this.id) 
        }
      })
    }    
    if (!this.logged) {
      this.router.navigate(["/"]);
    }
  }

  verListadoMascotas () {
    this.router.navigate(["listadoMascotas"], { 
      state: { 
        id: this.id 
      } 
    })
  }

  verHistoricoVentas () {
    this.router.navigate(["listadoVentas"], { 
      state: { 
        id: this.id 
      } 
    })
  }
}
