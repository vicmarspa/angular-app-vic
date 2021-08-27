import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {tap} from 'rxjs/operators';

import {Pagos_servicios} from '../models/pagos_servicios';


import { Observable, BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PagoServiciosService {

  // API_URI = 'https://vicmarspa.herokuapp.com';
  API_URI = 'https://vicmarspa.herokuapp.com';

  authSubject = new BehaviorSubject(false);
  private token: string;

  constructor(private http:HttpClient) { }



  getPays(){
    return this.http.get(`${this.API_URI}/getpays`)
  }

  insertPays(
    pagos_servicios : Pagos_servicios
    ) {
      return this.http.post(`${this.API_URI}/insertpays`, pagos_servicios)
  }

  getPayDetail(numero_proceso: string){
    return this.http.get(`${this.API_URI}/getpaydetail/${numero_proceso}`)
  }

  deletePagoServicio(id_pago:string){
    return this.http.delete(`${this.API_URI}/camaras/delete/${id_pago}`)
  }
  
}
