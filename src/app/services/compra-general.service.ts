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

@Injectable({
  providedIn: 'root'
})
export class CompraGeneralService {

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


}
