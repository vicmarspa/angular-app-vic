import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {tap} from 'rxjs/operators';
// ##   ##   #####   #####    #######  ####      #####
// ### ###  ##   ##   ## ##    ##   #   ##      ##   ##
// #######  ##   ##   ##  ##   ## #     ##      #
// #######  ##   ##   ##  ##   ####     ##       #####
// ## # ##  ##   ##   ##  ##   ## #     ##   #       ##
// ##   ##  ##   ##   ## ##    ##   #   ##  ##  ##   ##
// ##   ##   #####   #####    #######  #######   #####

import {CpcPrincipal} from '../models/cpcPrincipal';
import {CpcDetailInput} from '../models/cpcDetailInput';
import {CpcDetailOutput} from '../models/cpcDetailOutput';
import {Tipo_Fruta} from '../models/tipo_fruta';
import {Tipo_Pago} from '../models/tipo_pago';
import { Calibre } from '../models/calibre';
import { Clientes } from '../models/clientes';

import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaltaChilenaService {

  API_URI = 'https://vicmarspa.herokuapp.com';

  authSubject = new BehaviorSubject(false);
  private token: string;

  constructor(private http:HttpClient) { 

  }

//   ######   ##   ##  ######     ##      #####
//   ##  ##  ##   ##  # ## #    ####    ##   ##
//   ##  ##  ##   ##    ##     ##  ##   #
//   #####   ##   ##    ##     ##  ##    #####
//   ## ##   ##   ##    ##     ######        ##
//   ##  ##  ##   ##    ##     ##  ##   ##   ##
//  #### ##   #####    ####    ##  ##    #####




//    ####    #####   ##   ##  ######   ######     ##
//   ##  ##  ##   ##  ### ###   ##  ##   ##  ##   ####
//  ##       ##   ##  #######   ##  ##   ##  ##  ##  ##
//  ##       ##   ##  #######   #####    #####   ##  ##
//  ##       ##   ##  ## # ##   ##       ## ##   ######
//   ##  ##  ##   ##  ##   ##   ##       ##  ##  ##  ##
//    ####    #####   ##   ##  ####     #### ##  ##  ##


  insertServicioCamiones(cpcPrincipal:CpcPrincipal) {
    return this.http.post(`${this.API_URI}/compra-palta-chilena/ingreso`, cpcPrincipal)
  }

  getCompra(id_cpc: string) {
    return this.http.get(`${this.API_URI}/compra-palta-chilena/final/${id_cpc}`);
  }

  insertEntradaCompraPaltaChilena(cpcDetailInput:CpcDetailInput) {
    return this.http.post(`${this.API_URI}/compra-palta-chilena/ingreso-detalle-entrada`, cpcDetailInput)
  }

  insertSalidaCompraPaltaChilena(cpcDetailOutput:CpcDetailOutput) {
    return this.http.post(`${this.API_URI}/compra-palta-chilena/ingreso-detalle-salida`, cpcDetailOutput)
  }

  getCompraEntrada(id_cpc: string) {
    return this.http.get(`${this.API_URI}/compra-palta-chilena/obtener-detalle-entrada/${id_cpc}`);
  }

  getCompraSalida(id_cpc: string) {
    return this.http.get(`${this.API_URI}/compra-palta-chilena/obtener-detalle-salida/${id_cpc}`);
  }

  BorrarEntrada(id_cpc: string, id_detalle_cpc:string){
    return this.http.delete(`${this.API_URI}/compra-palta-chilena/borrar-detalle-entrada/${id_cpc}/${id_detalle_cpc}`)
  }

  BorrarSalida(id_cpc: string, id_detalle_salida_cpc:string){
    return this.http.delete(`${this.API_URI}/compra-palta-chilena/borrar-detalle-salida/${id_cpc}/${id_detalle_salida_cpc}`)
  }

  getStock(){
    return this.http.get(`${this.API_URI}/compra-palta-chilena/stock`)
  }

  getCompraStockDetail(id_cpc: string) {
    return this.http.get(`${this.API_URI}/compra-palta-chilena/stockDetail/${id_cpc}`);
  }

  getStockDetailDocument(){
    return this.http.get(`${this.API_URI}/compra-palta-chilena/stockDetailDocument`)
  }

}
