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


insertCompraGeneral(compraGeneralPrincipal:CompraGeneralPrincipal) {
  return this.http.post(`${this.API_URI}/compra-general/ingreso`, compraGeneralPrincipal)
}



}
