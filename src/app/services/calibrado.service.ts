import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {tap} from 'rxjs/operators';


//Modelos
import {Calibrado} from '../models/calibrado';
import {CalibradoEntrada} from '../models/calibradoEntrada';
import {CalibradoSalida} from '../models/calibradoSalida';
import {Tipo_Fruta} from '../models/tipo_fruta';
import {Tipo_Pago} from '../models/tipo_pago';
import { Calibre } from '../models/calibre';
import { Clientes } from '../models/clientes';
import { Compras } from '../models/compras';
import { Impuestos } from '../models/impuestos';
import { Ventas } from '../models/ventas';
import { Productos } from '../models/productos';
import { ProductoxVenta } from '../models/productoxventa';


import { Observable, BehaviorSubject } from 'rxjs';


//http://localhost:3000//


@Injectable()
export  class CalibradoService {  
  
  // API_URI = 'http://localhost:3000/';
  API_URI = 'http://localhost:3000/';

  authSubject = new BehaviorSubject(false);
  private token: string;

  constructor(private http:HttpClient) { 

  }  
  
  //Obtener último registro al cargar nueva página
  getCalibradoUno() {
    return this.http.get(`${this.API_URI}/ingreso/1/final`); 
  }  
  getCalibrados(){
    return this.http.get(`${this.API_URI}/`)
  }
  getVentas(){
    return this.http.get(`${this.API_URI}/busqueda-ventas`)
  }
  getCalibradosEntrada(){
    return this.http.get(`${this.API_URI}/entrada`)
  }

  GetCountCalibrados(){
    return this.http.get(`${this.API_URI}/calibrados/getcountofcalibrados`)
  }
  getCalibrado(numero_proceso: string) {
    return this.http.get(`${this.API_URI}/busqueda/detalle/${numero_proceso}`);
  }
  getCalibrado1Editar(numero_proceso: string) {
    return this.http.get(`${this.API_URI}/busqueda/editar/${numero_proceso}/calibrado1`);
  }
  getCalibradoEditar(numero_proceso: string) {
    return this.http.get(`${this.API_URI}/busqueda/editar/${numero_proceso}`);
  }
  getFrutaEditarProceso() {
    return this.http.get(`${this.API_URI}/busqueda/editar/proceso/fruta`);
  }
  getPagoEditarProceso() {
    return this.http.get(`${this.API_URI}/busqueda/editar/proceso/pago`);
  }
  getCalibreEditarProceso() {
    return this.http.get(`${this.API_URI}/busqueda/editar/proceso/calibre`);
  }
  getClientesEditarProceso() {
    return this.http.get(`${this.API_URI}/busqueda/editar/proceso/clientes`);
  }
  getEntrada(numero_proceso: string) {
    return this.http.get(`${this.API_URI}/busqueda/detalle/${numero_proceso}/entrada`);
  }
  getSalida(numero_proceso: string) {
    return this.http.get(`${this.API_URI}/busqueda/detalle/${numero_proceso}/salida`);
  }
  getProductosxVenta(idventa: string) {
    return this.http.get(`${this.API_URI}/buscar-ventas/ver-venta/${idventa}`);
  }
  getVenta(idventa: string) {
    return this.http.get(`${this.API_URI}/buscar-ventas/ver-venta/${idventa}/venta`);
  }
  
  getSalidaUna(numero_proceso: string) {
    return this.http.get(`${this.API_URI}/busqueda/detalle/${numero_proceso}/salida/una`);
  }
  getUnaVenta() {
    return this.http.get(`${this.API_URI}/ingreso-venta/1/final`);
  }
  getCompra(idcompra: string) {
    return this.http.get(`${this.API_URI}/busqueda-compras/ver-compra/${idcompra}`);
  }
  getProducto(idcompra: string) {
    return this.http.get(`${this.API_URI}/busqueda-compras/ver-compra/${idcompra}/producto`);
  }
  getFinalEntrada(numero_proceso:string){
    return this.http.get(`${this.API_URI}/ingreso/${numero_proceso}/final/entrada`);
  }
  getContinuarEntrada(numero_proceso:string){
    return this.http.get(`${this.API_URI}/continuar/${numero_proceso}/entrada`);
  }
  getContinuarSalida(numero_proceso:string){
    return this.http.get(`${this.API_URI}/continuar/${numero_proceso}/salida`);
  }
  getContinuarCalibrado(numero_proceso:string){
    return this.http.get(`${this.API_URI}/continuar/${numero_proceso}`);
  }
  getFinalSalida(numero_proceso:string){
    return this.http.get(`${this.API_URI}/ingreso/${numero_proceso}/final/salida`);
  }
  getProductos(idcompra:string){
    return this.http.get(`${this.API_URI}/ingreso-compra-obtener/${idcompra}/final`);
  }
  getProductosGeneral(){
    return this.http.get(`${this.API_URI}/productos`)
  }
  getTipoPago(){
    return this.http.get(`${this.API_URI}/ingreso/tipo_pago`)
  }
  getClientesIngreso(){
    return this.http.get(`${this.API_URI}/ingreso/clientes`)
  }
  getTipoFruta(){
    return this.http.get(`${this.API_URI}/ingreso/tipo_fruta`)
  }
  getCalibre(){
    return this.http.get(`${this.API_URI}/ingreso/calibre`)
  }
  getTipoFrutaBusqueda(){
    return this.http.get(`${this.API_URI}/busqueda-fruta`)
  }
  getTipoPagoBusqueda(){
    return this.http.get(`${this.API_URI}/busqueda-pago`)
  }
  getCalibreBusqueda(){
    return this.http.get(`${this.API_URI}/busqueda-calibre`)
  }  
  getClientesBusqueda(){
    return this.http.get(`${this.API_URI}/busqueda-clientes`)
  } 

  getCompras(){
    return this.http.get(`${this.API_URI}/busqueda-compras`)
  } 

  getCalibreEditar(idcalibre: string) {
    return this.http.get(`${this.API_URI}/editar/calibre/${idcalibre}`);
  }
  getClienteEditar(id_cliente: string) {
    return this.http.get(`${this.API_URI}/editar/clientes/${id_cliente}`);
  }
  getFrutaEditar(idtipo_fruta: string) {
    return this.http.get(`${this.API_URI}/editar/fruta/${idtipo_fruta}`);
  }
  getPagoEditar(idtipo_pago: string) {
    return this.http.get(`${this.API_URI}/editar/pago/${idtipo_pago}`);
  }
  getUnaCompra() {
    return this.http.get(`${this.API_URI}/ingreso-compra/1/final`); 
  } 
  getProdxVenta(idventa:string) {
    return this.http.get(`${this.API_URI}/ingreso-venta/${idventa}/final/prodxventa`); 
  } 
  //Crear nuevo proceso
  saveCalibrado(calibrado : Calibrado){
    return this.http.post(`${this.API_URI}/ingreso`,calibrado); 

  }
  saveVenta(venta : Ventas){
    return this.http.post(`${this.API_URI}/ingreso-venta`,venta); 

  }
  //Crear nuevo registro en tabla proceso_entrada
  saveCalibradoEntrada(numero_proceso: string|number,calibradoEntrada : CalibradoEntrada){
    return this.http.post(`${this.API_URI}/ingreso/${numero_proceso}/final/entrada`,calibradoEntrada);
  }
  saveProducto(idcompra: string|number,productos : Productos){
    return this.http.post(`${this.API_URI}/ingreso-compra/${idcompra}/final`,productos);
  }
  saveProdxVenta(productos : ProductoxVenta){
    return this.http.post(`${this.API_URI}/ingreso-venta/1/final`,productos);
  }

  //Crear nuevo registro en tabla proceso_Salida
  saveCalibradoSalida(numero_proceso: string|number,calibradoSalida : CalibradoSalida){
    return this.http.post(`${this.API_URI}/ingreso/${numero_proceso}/final/salida`,calibradoSalida);
  }
  saveImpuesto(idcompra: string|number,impuestos : Impuestos){
    return this.http.post(`${this.API_URI}/ingreso-compra/${idcompra}/final/impuesto`,impuestos);
  }

  saveContinuarEntrada(numero_proceso: string|number,calibradoEntrada : CalibradoEntrada){
    return this.http.post(`${this.API_URI}/continuar/${numero_proceso}/entrada`,calibradoEntrada);
  }

  saveContinuarSalida(numero_proceso: string|number,calibradoEntrada : CalibradoEntrada){
    return this.http.post(`${this.API_URI}/continuar/${numero_proceso}/salida`,calibradoEntrada);
  }

  saveCompra(compra : Compras){
    return this.http.post(`${this.API_URI}/ingreso-compra`,compra);
  }
  

  //Crear Fruta
  saveFruta(tipo_fruta : Tipo_Fruta){
    return this.http.post(`${this.API_URI}/ingreso-fruta`,tipo_fruta);
  }
  //Crear Pago
  savePago(tipo_pago : Tipo_Pago){
    return this.http.post(`${this.API_URI}/ingreso-pago`,tipo_pago);
  }

  saveCliente(cliente : Clientes){
    return this.http.post(`${this.API_URI}/ingreso-clientes`,cliente);
  }

  //Crear Calibre
  saveCalibre(calibre : Calibre){
    return this.http.post(`${this.API_URI}/ingreso-calibre`,calibre);
  }

  //Actualizar Datos Calibrado
  updateCalibrado(numero_proceso: string|number, updatedCalibrado:Calibrado): Observable<Calibrado>{
    return this.http.put(`${this.API_URI}/busqueda/editar/${numero_proceso}`, updatedCalibrado)
  }
  updateCalibre(idcalibre: string|number, updatedCalibre:Calibre): Observable<Calibre>{
    return this.http.put(`${this.API_URI}/editar/calibre/${idcalibre}`, updatedCalibre)
  }
  updateProducto(idventa: string|number, updatedproducto:Productos): Observable<Productos>{
    return this.http.put(`${this.API_URI}/ingreso-venta/${idventa}/final`, updatedproducto)
  }
  updateCliente(id_cliente: string|number, updatedCliente:Clientes): Observable<Clientes>{
    return this.http.put(`${this.API_URI}/editar/clientes/${id_cliente}`, updatedCliente)
  }
  updateFruta(idtipo_fruta: string|number, updatedFruta:Tipo_Fruta): Observable<Tipo_Fruta>{
    return this.http.put(`${this.API_URI}/editar/fruta/${idtipo_fruta}`, updatedFruta)
  }
  updatePago(idtipo_pago: string|number, updatedPago:Tipo_Pago): Observable<Tipo_Pago>{
    return this.http.put(`${this.API_URI}/editar/pago/${idtipo_pago}`, updatedPago)
  }
  //Borrado-Lógico
  BorrarCalibradoPapelera(numero_proceso: string|number, BorrarCalibrado:Calibrado): Observable<Calibrado>{
    return this.http.put(`${this.API_URI}/busqueda/${numero_proceso}`, BorrarCalibrado)
  }  
  BorrarCalibrePapelera(idcalibre: string|number, BorrarCalibre:Calibre): Observable<Calibre>{
    return this.http.put(`${this.API_URI}/busqueda-calibre/${idcalibre}`, BorrarCalibre)
  }
  BorrarFrutaPapelera(idtipo_fruta: string|number, BorrarFruta:Tipo_Fruta): Observable<Tipo_Fruta>{
    return this.http.put(`${this.API_URI}/busqueda-fruta/${idtipo_fruta}`, BorrarFruta)
  }
  BorrarPagoPapelera(idtipo_pago: string|number, BorrarPago:Tipo_Pago): Observable<Tipo_Pago>{
    return this.http.put(`${this.API_URI}/busqueda-pago/${idtipo_pago}`, BorrarPago)
  }
  BorrarClientePapelera(id_cliente: string|number, BorrarCliente:Clientes): Observable<Clientes>{
    return this.http.put(`${this.API_URI}/busqueda-clientes/${id_cliente}`, BorrarCliente)
  }
  BorrarComprasPapelera(idcompra: string|number, compra:Compras): Observable<Clientes>{
    return this.http.put(`${this.API_URI}/busqueda-compras/${idcompra}`, compra)
  }
  BorrarVentaPapelera(idventa: string|number, venta:Ventas): Observable<Ventas>{
    return this.http.put(`${this.API_URI}/busqueda-ventas/${idventa}`, venta)
  }



  
  //Borrar

  deleteCalibradoEntrada(numero_proceso:string,id_entrada:string){
    return this.http.delete(`${this.API_URI}/ingreso/${numero_proceso}/final/${id_entrada}/entrada`)
  }
  deleteCalibradoSalida(numero_proceso:string,id_salida:string){
    return this.http.delete(`${this.API_URI}/ingreso/${numero_proceso}/final/${id_salida}/salida-final`)
  }
  deleteCalibrado(numero_proceso:string){
    return this.http.delete(`${this.API_URI}/eliminados/${numero_proceso}`)
  }
  deleteVenta(idventa:string){
    return this.http.delete(`${this.API_URI}/eliminados/${idventa}/venta`)
  }
  deleteCompra(idcompra:string){
    return this.http.delete(`${this.API_URI}/eliminados/${idcompra}/compra`)
  }
  deleteFruta(idtipo_fruta:string){
    return this.http.delete(`${this.API_URI}/busqueda-fruta/${idtipo_fruta}`)
  }
  deleteContinuarEntrada(numero_proceso:string,id_entrada:string){
    return this.http.delete(`${this.API_URI}/continuar/${numero_proceso}/entrada/${id_entrada}`)
  }
  deleteContinuarSalida(numero_proceso:string,id_salida:string){
    return this.http.delete(`${this.API_URI}/continuar/${numero_proceso}/salida/${id_salida}`)
  }
  deleteProducto(idcompra:string,idproducto:string){
    return this.http.delete(`${this.API_URI}/ingreso-compra/${idcompra}/final/${idproducto}/producto`)
  }
  deleteProductosVenta(idventa:string,productoBorrar:Productos): Observable<Productos>{
    return this.http.put(`${this.API_URI}/ingreso-venta/${idventa}/final/borrarproductos`,productoBorrar)
  }
  CancelarVenta(idventa:string, idproductosxventa:string,idproducto:string, ventaCancelada:Productos){
    return this.http.put(`${this.API_URI}/ingreso-venta/${idventa}/final/${idproductosxventa}/${idproducto}`,ventaCancelada)
  }
  deleteProductoxVenta(idventa:string,idproductosxventa:string){
    return this.http.delete(`${this.API_URI}/ingreso-venta/${idventa}/final/${idproductosxventa}/borrar`)
  }
  
  

  //Eliminados
  getCalibradosEliminados(){
    return this.http.get(`${this.API_URI}/eliminados/calibrado`)
  }
  getCalibreEliminados(){
    return this.http.get(`${this.API_URI}/eliminados/calibre`)
  }
  getFrutaEliminados(){
    return this.http.get(`${this.API_URI}/eliminados/fruta`)
  }
  getPagoEliminados(){
    return this.http.get(`${this.API_URI}/eliminados/pago`)
  }
  getClientesEliminados(){
    return this.http.get(`${this.API_URI}/eliminados/clientes`)
  }
  getComprasEliminadas(){
    return this.http.get(`${this.API_URI}/eliminados/compras`)
  }
  getVentasEliminadas(){
    return this.http.get(`${this.API_URI}/eliminados/ventas`)
  }
  getproductosEliminados(){
    return this.http.get(`${this.API_URI}/eliminados/productos`)
  }
  getCompraPaltaChilenaEliminados(){
    return this.http.get(`${this.API_URI}/compra-palta-chilena/getAllBuysDelete`)
  }

  getVentaPaltaChilenaEliminados(){
    return this.http.get(`${this.API_URI}/venta-palta-chilena/getAllSellDelete`)
  }

  //Eliminados - Restaurar
  RestaurarCalibradoPapelera(numero_proceso: string|number, BorrarCalibrado:Calibrado): Observable<Calibrado>{
    return this.http.put(`${this.API_URI}/eliminados/${numero_proceso}/calibrado`, BorrarCalibrado)
  }
  RestaurarCalibrePapelera(idcalibre: string|number, BorrarCalibre:Calibre): Observable<Calibre>{
    return this.http.put(`${this.API_URI}/eliminados/${idcalibre}/calibre`, BorrarCalibre)
  }
  RestaurarFrutaPapelera(idtipo_fruta: string|number, BorrarFruta:Tipo_Fruta): Observable<Tipo_Fruta>{
    return this.http.put(`${this.API_URI}/eliminados/${idtipo_fruta}/fruta`, BorrarFruta)
  }
  RestaurarPagoPapelera(idtipo_pago: string|number, BorrarPago:Tipo_Pago): Observable<Tipo_Pago>{
    return this.http.put(`${this.API_URI}/eliminados/${idtipo_pago}/pago`, BorrarPago)
  }

  RestaurarClientePapelera(id_cliente: string|number, BorrarCliente:Clientes): Observable<Clientes>{
    return this.http.put(`${this.API_URI}/eliminados/${id_cliente}/clientes`, BorrarCliente)
  }
  RestaurarComprasPapelera(idcompra: string|number, BorrarCompra:Compras): Observable<Calibrado>{
    return this.http.put(`${this.API_URI}/eliminados/${idcompra}/compras`, BorrarCompra)
  }
  RestaurarVentasPapelera(idventa: string|number, BorrarVenta:Ventas): Observable<Ventas>{
    return this.http.put(`${this.API_URI}/eliminados/${idventa}/ventas`, BorrarVenta)
  }

}

