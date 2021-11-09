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

import {VpcPrincipal} from '../models/vpcPrincipal';
import {GastosAdicionalesVpc} from '../models/gastosAdicionalesVpc';


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

  getAllBuys(){
    return this.http.get(`${this.API_URI}/compra-palta-chilena/getAllBuys`)
  }

  changeBuyStatusDelete(cpcPrincipal:CpcPrincipal){
    return this.http.put(`${this.API_URI}/compra-palta-chilena/changeStatusBuyDelete`, cpcPrincipal)
  }

  getMaxRegisterCompraPaltaChilena(){
    return this.http.get(`${this.API_URI}/compra-palta-chilena/getMaxRegister`)
  }

  deleteCompraPaltaChilena(id_cpc: string){
    return this.http.delete(`${this.API_URI}/compra-palta-chilena/deleteCompraPaltaChilena/${id_cpc}`)
  }

  deleteCompraPaltaChilena2(id_cpc: string, cpcPrincipal:CpcPrincipal) {
    return this.http.post(`${this.API_URI}/compra-palta-chilena/deleteCompraPaltaChilena2/${id_cpc}`,cpcPrincipal)
  }

  changeBuyStatusDelete2(cpcPrincipal:CpcPrincipal){
    return this.http.put(`${this.API_URI}/compra-palta-chilena/changeStatusBuyDelete2`, cpcPrincipal)
  }

//  ##   ##  #######  ##   ##  ######     ##
//  ##   ##   ##   #  ###  ##  # ## #    ####
//   ## ##    ## #    #### ##    ##     ##  ##
//   ## ##    ####    ## ####    ##     ##  ##
//    ###     ## #    ##  ###    ##     ######
//    ###     ##   #  ##   ##    ##     ##  ##
//     #     #######  ##   ##   ####    ##  ##

  insertVentaPaltaChilena(vpcPrincipal:VpcPrincipal) {
    return this.http.post(`${this.API_URI}/venta-palta-chilena/ingreso`, vpcPrincipal)
  }

  getVenta(id_vpc: string) {
    return this.http.get(`${this.API_URI}/venta-palta-chilena/get/${id_vpc}`);
  }

  insertDetalleVentaPaltaChilena(vpcPrincipal:VpcPrincipal) {
    return this.http.post(`${this.API_URI}/venta-palta-chilena/insertDetail`, vpcPrincipal)
  }

  getLotes(){
    return this.http.get(`${this.API_URI}/venta-palta-chilena/getlotes`)
  }
  updateStock(cpcDetailOutput:CpcDetailOutput): Observable<Tipo_Fruta>{
    return this.http.put(`${this.API_URI}/venta-palta-chilena/editStockcpc`, cpcDetailOutput)
  }
  getStockCalibres(id_vpc: string) {
    return this.http.get(`${this.API_URI}/venta-palta-chilena/getStockCalibre/${id_vpc}`);
  }

  getSellDetail(id_vpc: string) {
    return this.http.get(`${this.API_URI}/venta-palta-chilena/sellDetail/${id_vpc}`);
  }
  
  getStockSell(){
    return this.http.get(`${this.API_URI}/venta-palta-chilena/stockDetail`)
  }

  createGastosAdicionales(gastosAdicionalesVpc:GastosAdicionalesVpc){
    return this.http.post(`${this.API_URI}/venta-palta-chilena/insert/gastosAdicionales`, gastosAdicionalesVpc)
  }
  
  getSellAditionalCost(id_vpc: string) {
    return this.http.get(`${this.API_URI}/venta-palta-chilena/getGastosAdicionales/${id_vpc}`);
  }

  updateStockDeleteDetailSell(cpcDetailOutputDelete:CpcDetailOutput){
    return this.http.put(`${this.API_URI}/venta-palta-chilena/eliminar/actualizarStock`, cpcDetailOutputDelete)
  }

  BorrarDetalleVenta(id_detalle_salida_vpc: string){
    return this.http.delete(`${this.API_URI}/venta-palta-chilena/eliminar/detalleVenta/${id_detalle_salida_vpc}`)
  }

  BorrarGastoAdicional(id_gasto_adicional_cpc: string){
    return this.http.delete(`${this.API_URI}/venta-palta-chilena/eliminar/gastoAdicional/${id_gasto_adicional_cpc}`)
  }
  getAllSells(){
    return this.http.get(`${this.API_URI}/venta-palta-chilena/getAllSells`)
  }

  updateVentaTipoPago(vpcPrincipal:VpcPrincipal){
    return this.http.put(`${this.API_URI}/venta-palta-chilena/actualizar/tipoPago`, vpcPrincipal)
  }


}
