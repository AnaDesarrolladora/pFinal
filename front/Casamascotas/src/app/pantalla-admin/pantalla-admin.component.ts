import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from '../servicios/usuario.service';

@Component({
  selector: 'app-pantalla-admin',
  templateUrl: './pantalla-admin.component.html',
  styleUrls: ['./pantalla-admin.component.css']
})
export class PantallaAdminComponent implements OnInit {
  @Input() title = ''
  @Input() logged: Boolean | undefined
  @Input() id: number | undefined

  constructor (
    private router:Router, 
    private route: ActivatedRoute, 
    private usuarioSvc: UsuarioService) {}  

  ngOnInit(): void {
    this.logged = false    
    if (this.id !== null && this.id !== undefined && this.id !== 0) {
      this.usuarioSvc.getUsuario(this.id).subscribe(response => {
        if (response != null) {
          this.logged = (response.id !== null && response.id !== undefined && response.id === this.id) 
        }
      })
    }    
    if (!this.logged) {
      this.router.navigate(["/"]);
    }
  } 
  
  altaUsuario () {
    this.router.navigate(["altaUsuario"], { 
      state: { 
        id: this.id 
      } 
    })
  }

  verListadoUsuarios () {
    this.router.navigate(["listadoUsuarios"], { 
      state: { 
        id: this.id 
      } 
    })
  }

  altaMascota () {
    this.router.navigate(["altaMascota"], { 
      state: { 
        id: this.id 
      } 
    })
  }

  verListadoMascotas () {
    this.router.navigate(["listadoMascotas"], { 
      state: { 
        id: this.id 
      } 
    })
  }
}
