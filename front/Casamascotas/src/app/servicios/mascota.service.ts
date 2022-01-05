import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Mascota } from '../model/Mascota';

@Injectable({
  providedIn: 'root'
})
export class MascotaService {
  path: string

  constructor(private http:HttpClient) { 
    this.path = '/api/mascota'
  }

  getMascota(id:number) {
    return this.http.get<Mascota>(this.path + "/" + id);
  }

  getMascotas(): Observable<Mascota[]> {
    return this.http.get<Mascota[]>(this.path + "/mascotas");
  }

  getMascotasEnVenta(): Observable<Mascota[]> {
    return this.http.get<Mascota[]>(this.path + "/mascotasVenta");
  }

  getMascotasEnVentaPorTipo(tipo : string): Observable<Mascota[]> {
    return this.http.post<Mascota[]>(this.path + "/mascotasVentaTipo", tipo);
  }

  getTiposMascotasEnVenta(): Observable<string[]> {
    return this.http.get<string[]>(this.path + "/tipoMascotasVenta");
  }

  crearMascota(mascota: Mascota) {
    return this.http.post<Mascota>(this.path, mascota);
  }

  borrarMascota(idLogado: number, idBorrar: number) {
    return this.http.delete<Mascota>(this.path + '/' + idLogado + '/' + idBorrar)
  }
  
  actualizarMascota(idLogado: number, mascota: Mascota) {
    return this.http.put<Mascota>(this.path + "/" + idLogado, mascota)
  }
}
