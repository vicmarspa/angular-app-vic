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


import {Tipo_Fruta} from '../models/tipo_fruta';
import {Tipo_Pago} from '../models/tipo_pago';
import { Calibre } from '../models/calibre';
import { Clientes } from '../models/clientes';
import {CompraGeneralPrincipal} from '../models/compraGeneralPrincipal';
import {DetalleCompraGeneral} from '../models/detalleCompraGeneral';
import {DetalleSalidaCompraGeneral} from '../models/detalleSalidaCompraGeneral';

import { Observable, BehaviorSubject } from 'rxjs';
import {VentaGeneral} from '../models/ventaGeneralPrincipal';
import {GastosAdicionalesVentaGeneral} from '../models/gastosAdicionalesVentaGeneral';


@Injectable({
  providedIn: 'root'
})
export class CompraGeneralService {

  API_URI = 'http://localhost:3000/';

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

getCompra(id_cg: string) {
  return this.http.get(`${this.API_URI}/compra-general/final/${id_cg}`);
}

insertCompraGeneral(compraGeneralPrincipal:CompraGeneralPrincipal) {
  return this.http.post(`${this.API_URI}/compra-general/ingreso`, compraGeneralPrincipal)
}


insertEntradaCompraPaltaChilena(detalleCompraGeneral:DetalleCompraGeneral) {
  return this.http.post(`${this.API_URI}/compra-general/ingreso-detalle-entrada`, detalleCompraGeneral)
}

getCompraEntrada(id_cg: string) {
  return this.http.get(`${this.API_URI}/compra-general/obtener-detalle-entrada/${id_cg}`);
}

BorrarEntrada(id_cg: string, id_detalle_salida_cg:string){
  return this.http.delete(`${this.API_URI}/compra-general/borrar-detalle-entrada/${id_cg}/${id_detalle_salida_cg}`)
}

insertSalidaCompraPaltaChilena(detalleSalidaCompraGeneral:DetalleSalidaCompraGeneral) {
  return this.http.post(`${this.API_URI}/compra-general/ingreso-detalle-salida`, detalleSalidaCompraGeneral)
}

getCompraSalida(id_cg: string) {
  return this.http.get(`${this.API_URI}/compra-general/obtener-detalle-salida/${id_cg}`);
}

BorrarSalida(id_cg: string, id_detalle_salida_cg:string){
  return this.http.delete(`${this.API_URI}/compra-general/borrar-detalle-salida/${id_cg}/${id_detalle_salida_cg}`)
}

getAllBuys(){
  return this.http.get(`${this.API_URI}/compra-general/getAllBuys`)
}


//  ##   ##  #######  ##   ##  ######     ##
//  ##   ##   ##   #  ###  ##  # ## #    ####
//   ## ##    ## #    #### ##    ##     ##  ##
//   ## ##    ####    ## ####    ##     ##  ##
//    ###     ## #    ##  ###    ##     ######
//    ###     ##   #  ##   ##    ##     ##  ##
//     #     #######  ##   ##   ####    ##  ##


insertVentaGeneralPrincipal(ventaGeneral:VentaGeneral) {
  return this.http.post(`${this.API_URI}/venta-general/ingreso`, ventaGeneral)
}

getVenta(id_venta_general: string) {
  return this.http.get(`${this.API_URI}/venta-general/get/${id_venta_general}`);
}

getSellDetail(id_venta_general: string) {
  return this.http.get(`${this.API_URI}/venta-general/sellDetail/${id_venta_general}`);
}

getLotes(){
  return this.http.get(`${this.API_URI}/venta-general/getlotes`)
}

getStockSell(){
  return this.http.get(`${this.API_URI}/venta-general/stockDetail`)
}

getSellAditionalCost(id_venta_general: string) {
  return this.http.get(`${this.API_URI}/venta-general/getGastosAdicionales/${id_venta_general}`);
}

updateStock(detalleSalidaCompraGeneral:DetalleSalidaCompraGeneral): Observable<Tipo_Fruta>{
  return this.http.put(`${this.API_URI}/venta-general/editStockcpc`, detalleSalidaCompraGeneral)
}

insertDetalleVentaPaltaChilena(ventaGeneral:VentaGeneral) {
  return this.http.post(`${this.API_URI}/venta-general/insertDetail`, ventaGeneral)
}

getStockCalibres(id_venta_general: string, tipo_fruto: any) {
  return this.http.get(`${this.API_URI}/venta-general/getStockCalibre/${id_venta_general}/${tipo_fruto}`);
}

getStockTipoFruta(id_venta_general: string) {
  return this.http.get(`${this.API_URI}/venta-general/getStockTipoFruta/${id_venta_general}`);
}

createGastosAdicionales(gastosAdicionalesVentaGeneral:GastosAdicionalesVentaGeneral){
  return this.http.post(`${this.API_URI}/venta-general/insert/gastosAdicionales`, gastosAdicionalesVentaGeneral)
}

BorrarDetalleVenta(id_detalle_venta_general: string){
  return this.http.delete(`${this.API_URI}/venta-general/eliminar/detalleVenta/${id_detalle_venta_general}`)
}

updateStockDeleteDetailSell(DetalleSalidaCompraGeneralDelete:DetalleSalidaCompraGeneral){
  return this.http.put(`${this.API_URI}/venta-general/eliminar/actualizarStock`, DetalleSalidaCompraGeneralDelete)
}


BorrarGastoAdicional(id_gastos_adicionales_venta_general: string){
  return this.http.delete(`${this.API_URI}/venta-general/eliminar/gastoAdicional/${id_gastos_adicionales_venta_general}`)
}




// RUTAS REFERENTES A SECCION DE BUSQUEDA DE VENTA


getAllSells(){
  return this.http.get(`${this.API_URI}/venta-general/getAllSells`)
}



}
