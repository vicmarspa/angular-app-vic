import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {tap} from 'rxjs/operators';

import {Servicio_Gruas} from '../models/servicio_gruas';


import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicioGruasService {

    // API_URI = 'http://localhost:3000/';
    API_URI = 'http://localhost:3000/';

    authSubject = new BehaviorSubject(false);
    private token: string;

  constructor(private http:HttpClient) { }


  insertServicioGruas(
    servicio_Gruas : Servicio_Gruas
    ) {
      return this.http.post(`${this.API_URI}/servicio_gruas/ingreso`, servicio_Gruas)
  }

  getProcesosServicioGruas(){
    return this.http.get(`${this.API_URI}/servicio_gruas/obtenerservicios`)
  }

  deleteProcesoServicioGruas(numero_proceso:string){
    return this.http.delete(`${this.API_URI}/servicio_gruas/delete/${numero_proceso}`)
  }



}
