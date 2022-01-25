import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {tap} from 'rxjs/operators';

import {Pagos_servicios} from '../models/pagos_servicios';


import { Observable, BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PagoServiciosService {

  // API_URI = 'http://localhost:3000';
  API_URI = 'http://localhost:3000';

  authSubject = new BehaviorSubject(false);
  private token: string;

  constructor(private http:HttpClient) { }


//PROCESO DE CALIBRADO Y DESVERDIZADO

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

  //PROCESO DE CAMARAS

  getPaysCamaras(){
    return this.http.get(`${this.API_URI}/getpays/camaras`)
  }

  insertPaysCamaras(
    pagos_servicios : Pagos_servicios
    ) {
      return this.http.post(`${this.API_URI}/insertpays/camaras`, pagos_servicios)
  }

  getPayDetailCamaras(numero_proceso: string){
    return this.http.get(`${this.API_URI}/getpaydetail/camaras/${numero_proceso}`)
  }

  deletePagoServicioCamaras(id_pago:string){
    return this.http.delete(`${this.API_URI}/camaras/detail/delete/${id_pago}`)
  }

  //PROCESOS DE GRUAS

  getPaysGruas(){
    return this.http.get(`${this.API_URI}/getpays/gruas`)
  }

  insertPaysGruas(
    pagos_servicios : Pagos_servicios
    ) {
      return this.http.post(`${this.API_URI}/insertpays/gruas`, pagos_servicios)
  }

  getPayDetailGruas(numero_proceso: string){
    return this.http.get(`${this.API_URI}/getpaydetail/gruas/${numero_proceso}`)
  }

  deletePagoServicioGruas(id_pago:string){
    return this.http.delete(`${this.API_URI}/gruas/detail/delete/${id_pago}`)
  }

  //PROCESO DE BINS

  getPaysBins(){
    return this.http.get(`${this.API_URI}/getpays/bins`)
  }

  insertPaysBins(
    pagos_servicios : Pagos_servicios
    ) {
      return this.http.post(`${this.API_URI}/insertpays/bins`, pagos_servicios)
  }

  getPayDetailBins(numero_proceso: string){
    return this.http.get(`${this.API_URI}/getpaydetail/bins/${numero_proceso}`)
  }

  deletePagoServicioBins(id_pago:string){
    return this.http.delete(`${this.API_URI}/bins/detail/delete/${id_pago}`)
  }

  //PROCESO DE CAMIONES

  getPaysCamiones(){
    return this.http.get(`${this.API_URI}/getpays/camiones`)
  }

  insertPaysCamiones(
    pagos_servicios : Pagos_servicios
    ) {
      return this.http.post(`${this.API_URI}/insertpays/camiones`, pagos_servicios)
  }

  getPayDetailCamiones(numero_proceso: string){
    return this.http.get(`${this.API_URI}/getpaydetail/camiones/${numero_proceso}`)
  }

  deletePagoServicioCamiones(id_pago:string){
    return this.http.delete(`${this.API_URI}/camiones/detail/delete/${id_pago}`)
  }
}
