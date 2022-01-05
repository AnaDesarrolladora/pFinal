import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Comprador } from '../model/Comprador';

@Injectable({
  providedIn: 'root'
})
export class CompradorService {
  path: string

  constructor(private http: HttpClient) { 
    this.path = '/api/comprador'
  }

  getComprador(dniComprador: string) {    
    return this.http.get<Comprador>(this.path + "/" + dniComprador)
  }

  crearComprador(comprador: Comprador) {
    return this.http.post<Comprador>(this.path, comprador)
  }
}
