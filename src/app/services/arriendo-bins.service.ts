import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {tap} from 'rxjs/operators';

import {Arriendo_Bins} from '../models/arriendoBins';

import { Observable, BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ArriendoBinsService {

      // API_URI = 'https://angular-app-vic.herokuapp.com';
      API_URI = 'https://angular-app-vic.herokuapp.com';

      authSubject = new BehaviorSubject(false);
      private token: string;

  constructor(private http:HttpClient) { }



  insertArriendoBins(
    arriendo_Bins : Arriendo_Bins
    ) {
      return this.http.post(`${this.API_URI}/arriendo_bins/ingreso`, arriendo_Bins)
  }

  getProcesosArriendoBins(){
    return this.http.get(`${this.API_URI}/arriendo_bins/obtenerservicios`)
  }

  deleteProcesoArriendoBins(numero_proceso:string){
    return this.http.delete(`${this.API_URI}/arriendo_bins/delete/${numero_proceso}`)
  }





}
