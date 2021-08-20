import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {tap} from 'rxjs/operators';


import {Proceso_Camaras} from '../models/proceso_camaras';

import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IngresoCamarasService {

  // API_URI = 'https://vicmarspa.herokuapp.com';
  API_URI = 'http://localhost:3000';


  authSubject = new BehaviorSubject(false);
  private token: string;

  constructor(private http:HttpClient) { }


  insertProcesoCamaras(
    proceso_Camaras : Proceso_Camaras
    ) {
      return this.http.post(`${this.API_URI}/camaras/ingreso`, proceso_Camaras)
  }

  getProcesosCamaras(){
    return this.http.get(`${this.API_URI}/camaras/obtenerservicios`)
  }



}
