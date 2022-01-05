import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserLogin } from '../form-login/UserLogin';
import { Usuario } from '../model/Usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  path: string
  
  constructor(private http: HttpClient) { 
    this.path = '/api/usuario'
  }

  loginUsuario(datosUsuario: UserLogin) {
    let params = {
      usuario: datosUsuario.usuario,
      contrasenia: datosUsuario.contrasenia
    }
    return this.http.post<Usuario>(this.path + "/login", params)
  }

  getUsuario(id: number) {
    return this.http.get<Usuario>(this.path + "/" + id)
  }

  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.path + "/usuarios")
  }

  crearUsuario(usuario: Usuario) {
    return this.http.post<Usuario>(this.path, usuario)
  }

  borrarUsuario(idLogado: number, idBorrar: number) {
    return this.http.delete<Usuario>(this.path + '/' + idLogado + '/' + idBorrar)
  }
  
  actualizarUsuario(idLogado: number, usuario: Usuario) {
    return this.http.put<Usuario>(this.path + "/" + idLogado, usuario)
  }
}
