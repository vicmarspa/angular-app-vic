import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {tap} from 'rxjs/operators';

import {Servicio_Camiones} from '../models/servicioCamiones';


import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicioCamionesService {

      // API_URI = 'https://vicmarspa.herokuapp.com';
      API_URI = 'https://vicmarspa.herokuapp.com';

      authSubject = new BehaviorSubject(false);
      private token: string;

  constructor(private http:HttpClient) { }


  insertServicioCamiones(servicioCamiones:Servicio_Camiones) {
      return this.http.post(`${this.API_URI}/servicio_camiones/ingreso`, servicioCamiones)
  }

  getServicioCamiones(){
    return this.http.get(`${this.API_URI}/servicio_camiones/obtenerservicios`)
  }

  deleteServicioCamiones(numero_proceso:string){
    return this.http.delete(`${this.API_URI}/servicio_camiones/delete/${numero_proceso}`)
  }

  putServicioCamiones(numero_proceso: string|number, servicioCamiones:Servicio_Camiones): Observable<Servicio_Camiones>{
    return this.http.put(`${this.API_URI}/servicio_camiones/update/${numero_proceso}`, servicioCamiones)
  }




}
