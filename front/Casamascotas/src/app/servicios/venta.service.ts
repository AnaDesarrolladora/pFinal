import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Venta } from '../model/Venta';
import { VentaListado } from '../model/VentaListado';

@Injectable({
  providedIn: 'root'
})
export class VentaService {
  path : string

  constructor(private http: HttpClient) { 
    this.path = '/api/venta'
  }

  realizarVenta(venta: Venta) {
    return this.http.post<Venta>(this.path, venta)
  }

  getVentas(): Observable<VentaListado[]> {
    return this.http.get<VentaListado[]>(this.path + "/ventas")
  }

  getTotalVentas(): Observable<number> {
    return this.http.get<number>(this.path + "/importeTotalVentas")
  }
}
