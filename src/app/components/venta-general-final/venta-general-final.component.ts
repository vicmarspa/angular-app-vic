import { Component, OnInit } from '@angular/core';
import { CompraGeneralService } from 'src/app/services/compra-general.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import{ToastrService} from 'ngx-toastr';
import {DetalleVentaGeneral} from '../../models/detalleVentaGeneral';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { CalibradoService } from 'src/app/services/calibrado.service';
import {DetalleSalidaCompraGeneral} from '../../models/detalleSalidaCompraGeneral';
import {GastosAdicionalesVentaGeneral} from '../../models/gastosAdicionalesVentaGeneral';
@Component({
  selector: 'app-venta-general-final',
  templateUrl: './venta-general-final.component.html',
  styleUrls: ['./venta-general-final.component.css']
})
export class VentaGeneralFinalComponent implements OnInit {

  constructor(
    private router:Router,
    private activedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private compraGeneralService: CompraGeneralService,
    private calibradoService: CalibradoService,
  ) { }
  detalleVentaGeneral:DetalleVentaGeneral = {
    id_venta_general: '',
    id_cg: '',
    cantidad: 0,
    tipo_producto: 0,
    calibre: 0,
    cantidad_bins_pallet: '',
    precio: 0,
    precio_total: 0,
    formato:'', 
  }
  DetalleSalidaCompraGeneral:DetalleSalidaCompraGeneral = {
    id_cg: '0',
    calibre:0,
    cantidad:0,
    bins:0,
  }
  DetalleSalidaCompraGeneralDelete:DetalleSalidaCompraGeneral = {
    id_cg: '0',
    calibre:0,
    cantidad:0,
    tipo_fruto:0,
    bins:0,
  }
  gastosAdicionalesVentaGeneral:GastosAdicionalesVentaGeneral = {
    id_venta_general: 0,
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
  fruta:any= [];

  ngOnInit(): void {
    //obteniendo datos principales de la venta
    const params = this.activedRoute.snapshot.params;
    console.log(params)
    this.compraGeneralService.getVenta(params.id_venta_general)
      .subscribe(
        res => {
          console.log(res);
          this.datosVenta = res;
        },
        err => console.log(err)
      )
      //obteniendo detalle de venta
      this.compraGeneralService.getSellDetail(params.id_venta_general)
      .subscribe(
        res => {
          console.log(res);
          this.getSellDetail = res;
        },
        err => console.log(err)
      )
      //obteniendo lotes
      this.compraGeneralService.getLotes()
      .subscribe(
        res => {
          console.log(res);
          this.getLotes = res;
        },
        err => console.log(err)
      )
      //obtener stock disponible
      this.compraGeneralService.getStockSell()
      .subscribe(
        res => {
          console.log(res);
          this.getStockSell = res;
          this.getStockSellRespaldo = res;
        },
        err => console.log(err)
      )
      //obtener costos adicionales
      this.compraGeneralService.getSellAditionalCost(params.id_venta_general)
      .subscribe(
        res => {
          console.log(res);
          this.aditionalCost = res;
        },
        err => console.log(err)
      )
      // this.calibradoService.getTipoFrutaBusqueda()
      // .subscribe(
      //   res => {
      //     this.fruta = res;
      //     console.log(res);
      //   },
      //   err => console.error(err)
      // );
  }









  InsertCantidadEntrada(_callback){
    this.detalleVentaGeneral.id_venta_general = this.datosVenta.id_venta_general;
    var localvar1 = this.kilogramosEntrada;
    var localvar2 = this.descuentoEntrada;
    this.detalleVentaGeneral.cantidad = localvar1 - localvar2
    this.detalleVentaGeneral.precio_total = (localvar1 - localvar2) * this.detalleVentaGeneral.precio;
    this.kilogramosFunction();
    _callback();
  }
  updateStock(_callback2){
    this.DetalleSalidaCompraGeneral.calibre = this.detalleVentaGeneral.calibre;
    this.DetalleSalidaCompraGeneral.cantidad = this.detalleVentaGeneral.cantidad;
    this.DetalleSalidaCompraGeneral.id_cg = this.detalleVentaGeneral.id_cg;
    this.DetalleSalidaCompraGeneral.tipo_fruto = this.detalleVentaGeneral.tipo_producto;

    this.compraGeneralService.updateStock(this.DetalleSalidaCompraGeneral)
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
      if(this.detalleVentaGeneral.id_cg!=''){
        if(this.detalleVentaGeneral.cantidad!=0){
          if(this.detalleVentaGeneral.calibre !=0){
            if(this.detalleVentaGeneral.precio !=0){
              if(this.detalleVentaGeneral.formato !=''){
                this.updateStock(()=>{
                  this.compraGeneralService.insertDetalleVentaPaltaChilena(this.detalleVentaGeneral)
                  .subscribe(
                    res => {
                      console.log(res);
                      this.detalleVentaGeneral.cantidad = 0;
                      this.detalleVentaGeneral.calibre = 0;
                      this.detalleVentaGeneral.precio = 0;
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

  calibreFunction(){
    this.compraGeneralService.getStockCalibres(this.detalleVentaGeneral.id_cg, this.detalleVentaGeneral.tipo_producto)
    .subscribe(
      res => {
        console.log(res);
        this.getcalibre = res;
      },
      err => console.log(err)
    )
  }

  frutaFunction(){
    this.compraGeneralService.getStockTipoFruta(this.detalleVentaGeneral.id_cg)
    .subscribe(
      res => {
        console.log(res);
        this.fruta = res;
      },
      err => console.log(err)
    )
  }


  public preciototalVenta(){
    return this.getSellDetail.map(entrada => entrada.precio_total).reduce((a,b) => a+b, 0);
  }
  public cantidadBinsVenta(){
    return this.getSellDetail.map(entrada => entrada.cantidad_bins_pallet).reduce((a,b) => a+b, 0);
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
    this.datosVenta2 = this.getStockSell.find(x => x.calibre == this.detalleVentaGeneral.calibre) ;
    console.log(this.datosVenta2);
  }
  precioTotalGastos:number=0;
  asignacionesGastos(_callBack3){
    this.gastosAdicionalesVentaGeneral.id_venta_general = this.datosVenta.id_venta_general;
    this.gastosAdicionalesVentaGeneral.precio_total = this.gastosAdicionalesVentaGeneral.cantidad * this.gastosAdicionalesVentaGeneral.precio;
    _callBack3();
  }
  insertGastosAdicionales(){ 
    this.asignacionesGastos(()=>{
      this.compraGeneralService.createGastosAdicionales(this.gastosAdicionalesVentaGeneral)
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
    this.compraGeneralService.BorrarDetalleVenta(this.borrarDetalleVenta)
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
  BorrarDetalleVenta(id_cg:string, calibre:number, cantidad:number, id_detalle_venta_general:string, tipo_fruto:number){
    this.DetalleSalidaCompraGeneralDelete.id_cg = id_cg;
    this.DetalleSalidaCompraGeneralDelete.calibre = calibre;
    this.DetalleSalidaCompraGeneralDelete.cantidad = cantidad;
    this.DetalleSalidaCompraGeneralDelete.tipo_fruto = tipo_fruto;

    console.log(

     "id cg", this.DetalleSalidaCompraGeneralDelete.id_cg,
     "calibre",this.DetalleSalidaCompraGeneralDelete.calibre,
     "cantidad",this.DetalleSalidaCompraGeneralDelete.cantidad,
     "tipo fruto",this.DetalleSalidaCompraGeneralDelete.tipo_fruto,


    )
    this.borrarDetalleVenta = id_detalle_venta_general;
    this.DeleteDetalleVenta(()=>{
      this.compraGeneralService.updateStockDeleteDetailSell(this.DetalleSalidaCompraGeneralDelete)
      .subscribe(
        res => {
          console.log(res);
          this.DetalleSalidaCompraGeneralDelete.id_cg = '0';
          this.DetalleSalidaCompraGeneralDelete.calibre = 0;
          this.DetalleSalidaCompraGeneralDelete.cantidad = 0;
          this.DetalleSalidaCompraGeneralDelete.bins = 0;
          this.toastr.success("STOCK ACTUALIZADO");
          this.ngOnInit();
        },
        err => console.error(err)
      )
    })
  }
  DeleteGastoAdicionalVenta(id_gastos_adicionales_venta_general:string){
    this.borrarGastoAdicionalVenta =  id_gastos_adicionales_venta_general;
    this.compraGeneralService.BorrarGastoAdicional(this.borrarGastoAdicionalVenta)
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
    return lote.id_cg == id;
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
