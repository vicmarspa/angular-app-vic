import { Component, OnInit } from '@angular/core';
import { PaltaChilenaService } from 'src/app/services/palta-chilena.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import{ToastrService} from 'ngx-toastr';
import {VpcDetalle} from '../../models/vpcDetalle';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { CalibradoService } from 'src/app/services/calibrado.service';
import {CpcDetailOutput} from '../../models/cpcDetailOutput';
import {GastosAdicionalesVpc} from '../../models/gastosAdicionalesVpc';
@Component({
  selector: 'app-vpc-ingreso-final',
  templateUrl: './vpc-ingreso-final.component.html',
  styleUrls: ['./vpc-ingreso-final.component.css']
})
export class VpcIngresoFinalComponent implements OnInit {
  constructor(
    private router:Router,
    private activedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private paltaChilenaService: PaltaChilenaService,
    private calibradoService: CalibradoService,
  ) { }
  vpcDetalle:VpcDetalle = {
    id_vpc: 0,
    id_cpc: '0',
    pallet: 0,
    cantidad: 0,
    calibre: 0,
    formato: '',
    precio: 0,
    precio_total: 0,
    cantidad_bins:0, 
  }
  cpcDetailOutput:CpcDetailOutput = {
    id_cpc: '0',
    calibre:0,
    cantidad:0,
    bins:0,
  }
  cpcDetailOutputDelete:CpcDetailOutput = {
    id_cpc: '0',
    calibre:0,
    cantidad:0,
    bins:0,
  }
  gastosAdicionalesVpc:GastosAdicionalesVpc = {
    id_vpc: 0,
    descripcion:'',
    cantidad:0,
    precio:0,
    precio_total:0,
  }
  datosVenta:any = [];
  getcalibre:any = [];
  getLotes:any = [];
  getSellDetail:any = [];
  getStockSell:any = [];
  getStockSellRespaldo:any = [];
  kilogramosEntrada:number=0;
  descuentoEntrada:number=0;
  aditionalCost:any = [];
  switchConditionOne:string='true';
  switchConditionTwo:string='true';
  borrarDetalleVenta:string='';
  borrarGastoAdicionalVenta:string='';
  ngOnInit() {
    //obteniendo datos principales de la venta
    const params = this.activedRoute.snapshot.params;
    console.log(params)
    this.paltaChilenaService.getVenta(params.id_vpc)
      .subscribe(
        res => {
          console.log(res);
          this.datosVenta = res;
        },
        err => console.log(err)
      )
      //obteniendo detalle de venta
      this.paltaChilenaService.getSellDetail(params.id_vpc)
      .subscribe(
        res => {
          console.log(res);
          this.getSellDetail = res;
        },
        err => console.log(err)
      )
      //obteniendo lotes
      this.paltaChilenaService.getLotes()
      .subscribe(
        res => {
          console.log(res);
          this.getLotes = res;
        },
        err => console.log(err)
      )
      //obtener stock disponible
      this.paltaChilenaService.getStockSell()
      .subscribe(
        res => {
          console.log(res);
          this.getStockSell = res;
          this.getStockSellRespaldo = res;
        },
        err => console.log(err)
      )
      //obtener costos adicionales
      this.paltaChilenaService.getSellAditionalCost(params.id_vpc)
      .subscribe(
        res => {
          console.log(res);
          this.aditionalCost = res;
        },
        err => console.log(err)
      )
  }
  InsertCantidadEntrada(_callback){
    this.vpcDetalle.id_vpc = this.datosVenta.id_vpc;
    var localvar1 = this.kilogramosEntrada;
    var localvar2 = this.descuentoEntrada;
    this.vpcDetalle.cantidad = localvar1 - localvar2
    this.vpcDetalle.precio_total = (localvar1 - localvar2) * this.vpcDetalle.precio;
    this.kilogramosFunction();
    _callback();
  }
  updateStock(_callback2){
    this.cpcDetailOutput.calibre = this.vpcDetalle.calibre;
    this.cpcDetailOutput.cantidad = this.vpcDetalle.cantidad;
    this.cpcDetailOutput.id_cpc = this.vpcDetalle.id_cpc;
    this.paltaChilenaService.updateStock(this.cpcDetailOutput)
    .subscribe(
      res => {
        console.log(res);
        this.toastr.success("STOCK ACTUALIZADO");
      },
      err => console.error(err)
    )
    _callback2();
  }
  guardarEntrada(){ 
    this.InsertCantidadEntrada(()=>{
      if(this.vpcDetalle.id_cpc!='0'){
        if(this.vpcDetalle.cantidad!=0){
          if(this.vpcDetalle.calibre !=0){
            if(this.vpcDetalle.precio !=0){
              if(this.vpcDetalle.formato !=''){
                this.updateStock(()=>{
                  this.paltaChilenaService.insertDetalleVentaPaltaChilena(this.vpcDetalle)
                  .subscribe(
                    res => {
                      console.log(res);
                      this.vpcDetalle.cantidad = 0;
                      this.vpcDetalle.calibre = 0;
                      this.vpcDetalle.precio = 0;
                      this.kilogramosEntrada = 0;
                      this.descuentoEntrada = 0;
                      this.toastr.success("ENTRADA INGRESADA");
                      this.ngOnInit();
                    },
                    err => console.error(err)
                  )
                })
              }else{
                this.toastr.warning("DEBE INGRESAR FORMATO");
              }
            }else{
              this.toastr.warning("DEBE INGESAR PRECIO");
            }
          }else{
            this.toastr.warning("DEBE INGRESAR CALIBRE");
          }
        }else{
          this.toastr.warning("DEBE INGRESAR KILOGRAMOS");
        }
      }else{
        this.toastr.warning("DEBE INGRESAR LOTE");
      }
    });
  }
  switchFunction(){
    //condition input bins
    if(this.vpcDetalle.formato == 'Pallet'){
      this.switchConditionOne ='true'
    }else{
      this.switchConditionOne ='false'
    }
    //condition input pallet
    if(this.vpcDetalle.formato == 'Bin'){
      this.switchConditionTwo ='true'
    }else{
      this.switchConditionTwo ='false'
    }
  }
  calibreFunction(){
    this.paltaChilenaService.getStockCalibres(this.vpcDetalle.id_cpc)
    .subscribe(
      res => {
        console.log(res);
        this.getcalibre = res;
      },
      err => console.log(err)
    )
  }
  public preciototalVenta(){
    return this.getSellDetail.map(entrada => entrada.precio_total).reduce((a,b) => a+b, 0);
  }
  public cantidadBinsVenta(){
    return this.getSellDetail.map(entrada => entrada.cantidad_bins).reduce((a,b) => a+b, 0);
  }
  public stockDisponibleTotal(){
    return this.getStockSell.map(entrada => entrada.kilogramos_stock).reduce((a,b) => a+b, 0);
  }
  public precioTotalGastosAdicionales(){
    return this.aditionalCost.map(entrada => entrada.precio_total).reduce((a,b) => a+b, 0);
  }
  public cantidadGastosAdicionales(){
    return this.aditionalCost.map(entrada => entrada.cantidad).reduce((a,b) => a+b, 0);
  }
  datosVenta2:any = []
  kilogramosFunction(){
    this.datosVenta2 = this.getStockSell.find(x => x.calibre == this.vpcDetalle.calibre) ;
    console.log(this.datosVenta2);
  }
  precioTotalGastos:number=0;
  asignacionesGastos(_callBack3){
    this.gastosAdicionalesVpc.id_vpc = this.datosVenta.id_vpc;
    this.gastosAdicionalesVpc.precio_total = this.gastosAdicionalesVpc.cantidad * this.gastosAdicionalesVpc.precio;
    _callBack3();
  }
  insertGastosAdicionales(){ 
    this.asignacionesGastos(()=>{
      this.paltaChilenaService.createGastosAdicionales(this.gastosAdicionalesVpc)
      .subscribe(
        res => {
          console.log(res);
          this.toastr.success("ENTRADA ADICIONAL INGRESADA");
          this.ngOnInit();
        },
        err => console.error(err)
      )
    });
  }
  DeleteDetalleVenta(_callback4){
    this.paltaChilenaService.BorrarDetalleVenta(this.borrarDetalleVenta)
    .subscribe(
      res => {
        console.log(res);
        this.borrarDetalleVenta = '';
        this.toastr.success("DETALLE DE VENTA BORRADO");
      },
      err => console.error(err)
    )
    _callback4();
  }
  BorrarDetalleVenta(id_cpc:string, calibre:number, cantidad:number, id_detalle_salida_vpc:string){
    this.cpcDetailOutputDelete.id_cpc = id_cpc;
    this.cpcDetailOutputDelete.calibre = calibre;
    this.cpcDetailOutputDelete.cantidad = cantidad;
    this.borrarDetalleVenta = id_detalle_salida_vpc;
    this.DeleteDetalleVenta(()=>{
      this.paltaChilenaService.updateStockDeleteDetailSell(this.cpcDetailOutputDelete)
      .subscribe(
        res => {
          console.log(res);
          this.cpcDetailOutputDelete.id_cpc = '0';
          this.cpcDetailOutputDelete.calibre = 0;
          this.cpcDetailOutputDelete.cantidad = 0;
          this.cpcDetailOutputDelete.bins = 0;
          this.toastr.success("STOCK ACTUALIZADO");
          this.ngOnInit();
        },
        err => console.error(err)
      )
    })
  }
  DeleteGastoAdicionalVenta(id_gasto_adicional_cpc:string){
    this.borrarGastoAdicionalVenta =  id_gasto_adicional_cpc;
    this.paltaChilenaService.BorrarGastoAdicional(this.borrarGastoAdicionalVenta)
    .subscribe(
      res => {
        console.log(res);
        this.borrarDetalleVenta = '';
        this.toastr.success("COSTO ADICIONAL BORRADO");
        this.ngOnInit();
      },
      err => console.error(err)
    )
 
  }
  LoteFilte=[];
  onSelectUniversity(id:string)
  {
    //ALMACENAR ESTA VARIABLE
    if(id != '0'){

    console.log("termino de entrada");
    this.getStockSell = this.getStockSellRespaldo;
    var LoteSelectionFunction = this.getStockSell
    .filter(function(lote){
    return lote.id_cpc == id;
    })
    this.LoteFilte = LoteSelectionFunction;
    this.getStockSell = this.LoteFilte;
    console.log(this.LoteFilte)
    }else{
      console.log("ARROJA ESTE TERMINO");
      this.getStockSell = this.getStockSellRespaldo;
    }
  }
}
